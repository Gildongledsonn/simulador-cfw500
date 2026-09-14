import React, { useEffect, useRef, useState } from 'react';
import { useInverter } from '../context/InverterContext';
import { addresses, ANALOG_TAGS, Comparator, defaultComparator, defaultHmi, defaultRtc, Hmi, Operand, Rtc, CONTACTS, Counter, defaultCounter, defaultTimer, freshRuntime, initialProgram, INPUTS, OUTPUTS, Program, Rung, scan, Timer, WRITABLE } from '../utils/clic02Engine';
import './Clic02RealisticPLC.css';

const timerModes = ['Marcador', '1 · Retardo na energização', '2 · Retardo retentivo', '3 · Retardo na desenergização', '4 · Pulso na desenergização', '5 · Cíclico com habilitação', '6 · Cíclico com retenção'];
const manual = 'https://static.weg.net/medias/downloadcenter/h86/hcf/WEG-CLIC-02-user-manual-10009280784-pt-en-es.pdf';
const integer = (value: string, max: number) => Math.min(max, Math.max(0, Math.round(Number(value) || 0)));
const selectTags = (tags: string[]) => tags.map(tag => <option key={tag}>{tag}</option>);

export const Clic02RealisticPLC: React.FC<{ activePlant: string }> = ({ activePlant }) => {
  const { dispatch } = useInverter();
  const [program, setProgram] = useState<Program>(initialProgram);
  const [runtime, setRuntime] = useState(freshRuntime);
  const [running, setRunning] = useState(false);
  const [inputs, setInputs] = useState<Record<string, boolean>>({ I02: true });
  const [analog, setAnalog] = useState([0, 0, 0, 0]);
  const [analogMode, setAnalogMode] = useState([false, false, false, false]);
  const [gains, setGains] = useState([10, 10, 10, 10]);
  const [offsets, setOffsets] = useState([0, 0, 0, 0]);
  const [registers, setRegisters] = useState<Record<string, number>>({});
  const [register, setRegister] = useState('DR01');
  const [signed, setSigned] = useState(false);
  const [hmiIndex, setHmiIndex] = useState(0);
  const [zEnabled, setZEnabled] = useState(false);
  const [zKeys, setZKeys] = useState<Record<string, boolean>>({});
  const [retainCounters, setRetainCounters] = useState(false);
  const [screen, setScreen] = useState('STATUS');
  const [menuIndex, setMenuIndex] = useState(0);
  const [confirmYes, setConfirmYes] = useState(false);
  const [selected, setSelected] = useState(0);
  const [panel, setPanel] = useState('LADDER');
  const [block, setBlock] = useState('T01');
  const [clock, setClock] = useState(Date.now());
  const [clockOffset, setClockOffset] = useState(0);
  const [relayWired, setRelayWired] = useState(false);
  const [memory, setMemory] = useState<Program | null>(null);
  const [notice, setNotice] = useState('Programa de exemplo: selo Q01 e atraso T01 → Q02. CLP em STOP.');
  const analogValues = { ...registers, ...Object.fromEntries(analog.flatMap((v, i) => [[addresses('A', 4)[i], analogMode[i] ? v : 0], [addresses('V', 4)[i], (analogMode[i] ? v : 0) * gains[i] + offsets[i]]])) };
  const physicalInputs = { ...inputs, ...Object.fromEntries(INPUTS.slice(8).map((t, i) => [t, !analogMode[i] && !!inputs[t]])) };
  const config = useRef({ program, inputs: physicalInputs, zKeys, zEnabled, analogValues, clockOffset });
  config.current = { program, inputs: physicalInputs, zKeys, zEnabled, analogValues, clockOffset };
  useEffect(() => {
    const id = window.setInterval(() => setClock(Date.now()), 500);
    return () => window.clearInterval(id);
  }, []);
  useEffect(() => {
    if (!running) return;
    let previous = performance.now();
    const id = window.setInterval(() => {
      const now = performance.now();
      const dt = (now - previous) / 1000; previous = now;
      const c = config.current;
      const keys = Object.fromEntries(addresses('Z', 4).map(t => [t, c.zEnabled && !!c.zKeys[t]]));
      setRuntime(s => scan(c.program, s, { ...c.inputs, ...keys }, dt, c.analogValues, new Date(Date.now() + c.clockOffset)));
    }, 25);
    return () => window.clearInterval(id);
  }, [running]);
  const q1 = running && !!runtime.bits.Q01;
  useEffect(() => {
    if (relayWired) dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: 'di1', value: q1 } });
  }, [q1, relayWired, dispatch]);
  useEffect(() => () => { if (relayWired) dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: 'di1', value: false } }); }, [relayWired, dispatch]);
  const menu = ['LADDER', 'BLOCO FUN.', 'PARÂMETRO', 'DATA REGISTER', running ? 'STOP' : 'RUN', ...(!running ? ['LIMPAR PROG.', 'ESCREVER', 'LER', 'CONFIG.', 'CONFIG. ANALÓG'] : []), 'CONFIG. RTC'];
  const changeRun = () => {
    if (!running) setRuntime(s => ({ ...freshRuntime(), ...(retainCounters ? { counts: s.counts, bits: Object.fromEntries(Object.entries(s.bits).filter(([k]) => k.startsWith('C'))) } : {}) }));
    else setRuntime(s => ({ ...s, bits: Object.fromEntries(Object.entries(s.bits).map(([k, v]) => [k, k.startsWith('Q') ? false : v])) }));
    setRunning(v => !v); setScreen('STATUS'); setZKeys({});
  };
  const key = (name: string) => {
    if (name === 'ESC') { setScreen(screen === 'STATUS' ? 'MENU' : 'STATUS'); setMenuIndex(0); return; }
    if (screen === 'CONFIRM') {
      if (['▲', '▼', '◀', '▶'].includes(name)) setConfirmYes(v => !v);
      if (name === 'OK') { if (confirmYes) changeRun(); else setScreen('MENU'); }
      return;
    }
    if (screen === 'MENU') {
      if (name === '▲' || name === '▼') setMenuIndex(i => (i + (name === '▲' ? menu.length - 1 : 1)) % menu.length);
      if (name === 'OK') {
        const item = menu[menuIndex];
        if (item === 'RUN' || item === 'STOP') { setScreen('CONFIRM'); setConfirmYes(false); }
        else if (item === 'LIMPAR PROG.') { setPanel('MEMÓRIA'); setScreen('DETAIL'); }
        else if (item === 'ESCREVER') { setMemory(structuredClone(program)); setNotice('Programa copiado para a memória PM05 simulada desta sessão.'); setScreen('STATUS'); }
        else if (item === 'LER') { if (memory) { setProgram(structuredClone(memory)); setSelected(0); } setNotice(memory ? 'Programa lido da memória simulada.' : 'Memória simulada vazia.'); setScreen('STATUS'); }
        else { setPanel(item === 'BLOCO FUN.' || item === 'PARÂMETRO' ? 'PARÂMETRO' : item); setScreen(item === 'LADDER' ? 'LADDER' : 'DETAIL'); }
      }
      return;
    }
    if (screen === 'HMI' && (name === '▲' || name === '▼')) setHmiIndex(i => Math.max(0, i + (name === '▲' ? -1 : 1)));
    if (screen === 'LADDER') {
      if (name === '▲' || name === '▼') setSelected(i => Math.max(0, Math.min(program.rungs.length - 1, i + (name === '▲' ? -1 : 1))));
      if (name === 'OK') { const r = program.rungs[selected]; if (r && ['TIMER', 'COUNTER', 'COMPARE', 'RTC', 'HMI'].includes(r.kind)) { setBlock(r.tag); setPanel('PARÂMETRO'); setScreen('DETAIL'); } }
    }
    if (name === 'SEL' && screen === 'STATUS') { setHmiIndex(0); setScreen('HMI'); }
    if (name === 'DEL') setNotice('Selecione a linha no editor ampliado e use Excluir linha em STOP.');
  };
  const date = new Date(clock + clockOffset);
  const rung = program.rungs[selected];
  const activeMessages = addresses('H', 31).filter(t => running && runtime.bits[t]);
  const message = activeMessages.length ? program.hmi?.[activeMessages[hmiIndex % activeMessages.length]] ?? defaultHmi() : null;
  const lines = screen === 'HMI' ? message?.lines ?? ['SEM TELAS ATIVAS', '', '', 'ESC: RETORNAR'] : screen === 'MENU' ? menu.slice(Math.max(0, menuIndex - 3), Math.max(0, menuIndex - 3) + 4).map((s, i) => (Math.max(0, menuIndex - 3) + i === menuIndex ? '>' : ' ') + s)
    : screen === 'CONFIRM' ? [running ? 'STOP PROGRAMA?' : 'RUN PROGRAMA?', '', (confirmYes ? '>' : ' ') + 'SIM', (!confirmYes ? '>' : ' ') + 'NAO']
    : screen === 'LADDER' ? [`${running ? 'MONITOR' : 'LADDER'} ${String(selected + 1).padStart(3, '0')}`, rung?.cells.map(c => c.type === 'WIRE' ? '----' : `${c.type === 'NC' ? '/' : '['}${c.tag}`).join(' ') ?? 'VAZIO', rung ? `${rung.kind} ${rung.tag}` : '', 'ESC  ↑↓  OK']
    : screen === 'DETAIL' ? [panel, block, 'EDITOR AMPLIADO', 'ESC: RETORNAR']
    : ['I:' + INPUTS.map(t => physicalInputs[t] ? t.slice(-1) : '-').join(''), 'Q:' + OUTPUTS.map(t => running && runtime.bits[t] ? t.slice(-1) : '-').join('') + (zEnabled ? ' Z' : ''), date.toLocaleDateString('pt-BR', { weekday: 'short' }).toUpperCase().slice(0, 3) + ' ' + date.toLocaleTimeString('pt-BR'), running ? 'RUN' : 'STOP'];
  const updateRung = (patch: Partial<Rung>) => setProgram(p => ({ ...p, rungs: p.rungs.map((r, i) => i === selected ? { ...r, ...patch } : r) }));
  const timer = program.timers[block] ?? defaultTimer();
  const counter = program.counters[block] ?? defaultCounter();
  const updateTimer = (patch: Partial<Timer>) => setProgram(p => ({ ...p, timers: { ...p.timers, [block]: { ...timer, ...patch } } }));
  const updateCounter = (patch: Partial<Counter>) => setProgram(p => ({ ...p, counters: { ...p.counters, [block]: { ...counter, ...patch } } }));
  const comparator = program.comparators?.[block] ?? defaultComparator();
  const rtc = program.rtc?.[block] ?? defaultRtc();
  const hmi = program.hmi?.[block] ?? defaultHmi();
  const updateComparator = (patch: Partial<Comparator>) => setProgram(p => ({ ...p, comparators: { ...p.comparators, [block]: { ...comparator, ...patch } } }));
  const updateRtc = (patch: Partial<Rtc>) => setProgram(p => ({ ...p, rtc: { ...p.rtc, [block]: { ...rtc, ...patch } } }));
  const updateHmi = (patch: Partial<Hmi>) => setProgram(p => ({ ...p, hmi: { ...p.hmi, [block]: { ...hmi, ...patch } } }));
  const operandEditor = (label: string, operand: Operand, field: 'x' | 'y' | 'reference') => <label>{label}<select value={operand.tag} onChange={e => updateComparator({ [field]: { ...operand, tag: e.target.value } })}><option value="">Constante</option>{selectTags(ANALOG_TAGS)}</select>{!operand.tag && <input type="number" step="0.01" value={operand.value} onChange={e => updateComparator({ [field]: { ...operand, value: Number(e.target.value) || 0 } })} />}</label>;
  return <section className="clic-workbench" aria-label="CLP WEG CLIC02 20HR-D">
    <div className="clic-device">
      <div className="clic-terminal-row">{['+', '−', ...INPUTS.map((_, i) => i < 8 ? String(i + 1) : `A${i - 7}`)].map(t => <div className="clic-terminal" key={t}><i />{t}</div>)}</div>
      <div className="clic-print">DC 24V <span>INPUT 12×DC (A1–A4 0–10V)</span></div>
      <div className="clic-face">
        <div className="clic-display" role="status" aria-label="Display LCD 4 linhas de 16 caracteres">{Array.from({ length: 4 }, (_, i) => <div key={i}>{(lines[i] ?? '').slice(0, 16).padEnd(16, ' ')}</div>)}</div>
        <div className="clic-keypad">{['DEL', '▲', 'SEL', '◀', '', '▶', 'ESC', '▼', 'OK'].map((name, i) => name ? <button key={name} className={`clic-key key-${i}`} aria-label={`Tecla ${name}`} onClick={() => key(name)} onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); const z = ({ '▲': 'Z01', '◀': 'Z02', '▼': 'Z03', '▶': 'Z04' } as Record<string, string>)[name]; if (z && zEnabled && running && screen === 'STATUS') setZKeys(v => ({ ...v, [z]: true })); }} onPointerUp={() => setZKeys({})} onPointerCancel={() => setZKeys({})} onLostPointerCapture={() => setZKeys({})}>{name}</button> : <span key="center" />)}</div>
      </div>
      <div className="clic-brand"><strong>WEG</strong><b>CLIC02</b></div>
      <div className="clic-print">CLW-02/20HR-D <span>OUTPUT 8×RELAY / 8A</span></div>
      <div className="clic-terminal-row outputs">{OUTPUTS.map(t => <div className={'clic-output ' + (running && runtime.bits[t] ? 'on' : '')} key={t}><span>{t}</span><div><i /><i /></div></div>)}</div>
    </div>
    <p className="clic-help">24 Vcc · 12 entradas (I09–I0C compartilham A1–A4) · 8 saídas a relé. ESC abre o menu; ↑/↓ selecionam; OK confirma RUN/STOP.</p>
    <div className="clic-notice" aria-live="polite">{notice}</div>
    <details open><summary>Entradas de teste e monitor · {activePlant.replace(/_/g, ' ')}</summary><div className="clic-inputs">{INPUTS.map(t => <button key={t} className={inputs[t] ? 'active' : ''} disabled={INPUTS.indexOf(t) >= 8 && analogMode[INPUTS.indexOf(t) - 8]} aria-pressed={!!physicalInputs[t]} onClick={() => setInputs(v => ({ ...v, [t]: !v[t] }))}>{t}<small>{INPUTS.indexOf(t) >= 8 && analogMode[INPUTS.indexOf(t) - 8] ? 'ANALÓG' : inputs[t] ? '24 V' : '0 V'}</small></button>)}</div><p>I01: liga; I02: parada física NF, energizada em repouso. O exemplo usa contato lógico NA de I02.</p><div className="clic-inputs">{OUTPUTS.map(t => <span key={t} className={running && runtime.bits[t] ? 'active' : ''}>{t}: {running && runtime.bits[t] ? '1' : '0'}</span>)}</div><label><input type="checkbox" checked={relayWired} onChange={e => setRelayWired(e.target.checked)} /> Ligar contato Q01 à DI1 do inversor</label><p>O inversor deve estar configurado para comando por borne. O CLP não altera os parâmetros do inversor.</p></details>
    <nav className="clic-tabs">{['LADDER', 'PARÂMETRO', 'CONFIG.', 'CONFIG. ANALÓG', 'CONFIG. RTC', 'DATA REGISTER', 'MEMÓRIA'].map(t => <button key={t} aria-pressed={panel === t} onClick={() => setPanel(t)}>{t}</button>)}</nav>
    {panel === 'LADDER' && <div className="clic-editor"><p>{running ? 'RUN · Monitoramento. Pare o programa para editar as linhas.' : 'STOP · Editor ampliado: três contatos em série e uma bobina por linha.'} {program.rungs.length}/300 linhas</p><div className="clic-rungs">{program.rungs.map((r, i) => <button key={i} className={selected === i ? 'selected' : ''} onClick={() => setSelected(i)}><code>{String(i + 1).padStart(3, '0')} {r.cells.map((c, j) => c.type === 'WIRE' ? '────' : `${c.type === 'NC' ? '[/ ' : '[ '}${c.tag}${j === 0 && r.seal ? ' ∥ ' + r.seal : ''} ]`).join('─')}─({r.kind} {r.tag})</code><b>{running && runtime.bits[r.tag] ? ' ●' : ' ○'}</b></button>)}</div>
      {rung && <fieldset disabled={running}><legend>Linha {selected + 1}</legend>{rung.cells.map((c, i) => <div className="clic-fields" key={i}><label>Contato {i + 1}<select value={c.type} onChange={e => updateRung({ cells: rung.cells.map((v, j) => j === i ? { ...v, type: e.target.value as typeof c.type } : v) })}><option value="NO">NA</option><option value="NC">NF</option><option value="WIRE">Ligação</option></select></label><label>Endereço<select disabled={c.type === 'WIRE'} value={c.tag} onChange={e => updateRung({ cells: rung.cells.map((v, j) => j === i ? { ...v, tag: e.target.value } : v) })}>{selectTags(CONTACTS)}</select></label></div>)}<label>Contato NA em paralelo ao primeiro contato<select value={rung.seal} onChange={e => updateRung({ seal: e.target.value })}><option value="">Sem paralelo</option>{selectTags(CONTACTS)}</select></label><div className="clic-fields"><label>Bobina<select value={rung.kind} onChange={e => { const kind = e.target.value as Rung['kind']; updateRung({ kind, tag: kind === 'TIMER' ? 'T01' : kind === 'COUNTER' ? 'C01' : kind === 'COMPARE' ? 'G01' : kind === 'RTC' ? 'R01' : kind === 'HMI' ? 'H01' : 'Q01' }); }}><option value="OUT">Saída normal</option><option value="SET">SET</option><option value="RST">RESET</option><option value="PULSE_FF">Relé de impulso</option><option value="TIMER">Temporizador</option><option value="COUNTER">Contador</option><option value="COMPARE">Comparador analógico</option><option value="RTC">Relógio semanal/calendário</option><option value="HMI">Tela IHM</option></select></label><label>Endereço<select value={rung.tag} onChange={e => updateRung({ tag: e.target.value })}>{selectTags(rung.kind === 'TIMER' ? addresses('T', 31) : rung.kind === 'COUNTER' ? addresses('C', 31) : rung.kind === 'COMPARE' ? addresses('G', 31) : rung.kind === 'RTC' ? addresses('R', 31) : rung.kind === 'HMI' ? addresses('H', 31) : WRITABLE)}</select></label></div><button onClick={() => { setProgram(p => ({ ...p, rungs: p.rungs.filter((_, i) => i !== selected) })); setSelected(i => Math.max(0, i - 1)); }}>Excluir linha</button></fieldset>}
      <button disabled={running || program.rungs.length >= 300} onClick={() => { setProgram(p => ({ ...p, rungs: [...p.rungs, { cells: [{ type: 'NO', tag: 'I01' }, { type: 'WIRE', tag: 'I01' }, { type: 'WIRE', tag: 'I01' }], seal: '', kind: 'OUT', tag: 'Q01' }] })); setSelected(program.rungs.length); }}>Adicionar linha</button></div>}
    {panel === 'PARÂMETRO' && <div className="clic-editor"><label>Bloco<select value={block} onChange={e => setBlock(e.target.value)}>{selectTags([...addresses('T', 31), ...addresses('C', 31), ...addresses('G', 31), ...addresses('R', 31), ...addresses('H', 31)])}</select></label>{block.startsWith('T') ? <><label>Modo<select value={timer.mode} onChange={e => updateTimer({ mode: Number(e.target.value) })}>{timerModes.slice(1).map((m, i) => <option key={m} value={i + 1}>{m}</option>)}</select></label><label>Base de tempo<select value={timer.base} onChange={e => updateTimer({ base: Number(e.target.value) })}><option value="0.01">0,01 s · máximo 99,99 s</option><option value="0.1">0,1 s · máximo 999,9 s</option><option value="1">1 s · máximo 9999 s</option><option value="60">1 min · máximo 9999 min</option></select></label><label>Preset (0–9999 unidades da base)<input type="number" min="0" max="9999" step="1" value={timer.preset} onChange={e => updateTimer({ preset: integer(e.target.value, 9999) })} /></label><p>Preset: {timer.preset * timer.base} s · Atual: {(runtime.elapsed[block] || 0).toFixed(2)} s · Contato: {runtime.bits[block] ? '1' : '0'}</p></> : block.startsWith('C') ? <><label>Modo<select value={counter.continuous ? '2' : '1'} onChange={e => updateCounter({ continuous: e.target.value === '2' })}><option value="1">1 · Contagem limitada, não retentivo</option><option value="2">2 · Contagem contínua, não retentivo</option></select></label><label>Preset (0–999999)<input type="number" min="0" max="999999" step="1" value={counter.preset} onChange={e => updateCounter({ preset: integer(e.target.value, 999999) })} /></label><label>Direção (0 crescente / 1 decrescente)<select value={counter.direction} onChange={e => updateCounter({ direction: e.target.value })}><option value="">Sempre crescente</option>{selectTags(CONTACTS)}</select></label><p>Contagem: {runtime.counts[block] ?? 0} · Contato: {runtime.bits[block] ? '1' : '0'}</p></> : block.startsWith('G') ? <><label>Modo<select value={comparator.mode} onChange={e => updateComparator({ mode: Number(e.target.value) })}>{['0 · Marcador', '1 · Ay − Ref ≤ Ax ≤ Ay + Ref', '2 · Ax ≤ Ay', '3 · Ax ≥ Ay', '4 · Ref ≥ Ax', '5 · Ref ≤ Ax', '6 · Ref = Ax', '7 · Ref ≠ Ax'].map((v, i) => <option value={i} key={v}>{v}</option>)}</select></label>{operandEditor('Ax', comparator.x, 'x')}{operandEditor('Ay', comparator.y, 'y')}{operandEditor('Ref', comparator.reference, 'reference')}<p>Contato {block}: {runtime.bits[block] ? '1' : '0'}</p></> : block.startsWith('R') ? <><label>Modo<select value={rtc.mode} onChange={e => updateRtc({ mode: Number(e.target.value) })}>{['0 · Marcador', '1 · Diário', '2 · Intervalo semanal', '3 · Ano/mês/dia', '4 · Precisão em segundos'].map((v, i) => <option key={v} value={i}>{v}</option>)}</select></label>{rtc.mode === 3 ? <><label>Data para ligar<input type="date" value={rtc.startDate} onChange={e => updateRtc({ startDate: e.target.value })} /></label><label>Data para desligar (00:00)<input type="date" value={rtc.endDate} onChange={e => updateRtc({ endDate: e.target.value })} /></label></> : <>{(['startDay', 'endDay'] as const).filter(f => rtc.mode !== 4 || f === 'startDay').map(f => <label key={f}>{f === 'startDay' ? 'Dia inicial' : 'Dia final'}<select value={rtc[f]} onChange={e => updateRtc({ [f]: Number(e.target.value) })}>{['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((v, i) => <option key={v} value={i}>{v}</option>)}</select></label>)}<label>Hora de ligar<input type="time" value={rtc.on} onChange={e => updateRtc({ on: e.target.value })} /></label>{rtc.mode === 4 ? <label>Segundos (0–30: duração; 31–59: pulso de um scan)<input type="number" min="0" max="59" value={rtc.second} onChange={e => updateRtc({ second: integer(e.target.value, 59) })} /></label> : <label>Hora de desligar<input type="time" value={rtc.off} onChange={e => updateRtc({ off: e.target.value })} /></label>}<p>Dias iguais nos modos 1 e 2: todos os dias. Horário invertido atravessa a meia-noite.</p></>}</> : <><label>Modo IHM<select value={hmi.mode} onChange={e => updateHmi({ mode: Number(e.target.value) })}><option value="1">1 · Exibir</option><option value="2">2 · Não exibir</option></select></label>{hmi.lines.map((line, i) => <label key={i}>Linha {i + 1} (16 caracteres)<input maxLength={16} value={line} onChange={e => updateHmi({ lines: hmi.lines.map((v, j) => i === j ? e.target.value : v) })} /></label>)}<p>A bobina H habilita a tela. Pressione SEL na tela de estado e use ↑/↓ para alternar mensagens.</p></>}{(block.startsWith('T') || block.startsWith('C')) && <label>Reset prioritário<select value={block.startsWith('T') ? timer.reset : counter.reset} onChange={e => block.startsWith('T') ? updateTimer({ reset: e.target.value }) : updateCounter({ reset: e.target.value })}><option value="">Sem reset externo</option>{selectTags(CONTACTS)}</select></label>}</div>}
    {panel === 'CONFIG.' && <fieldset disabled={running}><legend>Configuração em STOP</legend><label><input type="checkbox" checked={zEnabled} onChange={e => { setZEnabled(e.target.checked); setZKeys({}); }} /> Habilitar Z01 ↑ · Z02 ← · Z03 ↓ · Z04 →</label><label><input type="checkbox" checked={retainCounters} onChange={e => setRetainCounters(e.target.checked)} /> Reter contadores na transição STOP/RUN</label><p>M31: primeiro scan · M32: pulso de 1 s. M31–M3F são reservados e não podem ser bobinas.</p></fieldset>}
    {panel === 'CONFIG. ANALÓG' && <div className="clic-editor"><p>A1–A4 compartilham os bornes I09–I0C. Selecione a fonte de teste de cada borne. V = A × ganho + offset.</p>{analog.map((value, i) => <fieldset key={i}><legend>A0{i + 1} / {INPUTS[i + 8]}</legend><label><input type="checkbox" checked={analogMode[i]} onChange={e => setAnalogMode(v => v.map((x, j) => j === i ? e.target.checked : x))} /> Fonte analógica de 0–10 V</label><label>Tensão<input type="range" min="0" max="10" step="0.01" disabled={!analogMode[i]} value={value} onChange={e => setAnalog(v => v.map((x, j) => j === i ? Number(e.target.value) : x))} />{value.toFixed(2)} V</label><label>Ganho (0–999)<input type="number" disabled={running} min="0" max="999" value={gains[i]} onChange={e => setGains(v => v.map((x, j) => j === i ? integer(e.target.value, 999) : x))} /></label><label>Offset (−50 a +50)<input type="number" disabled={running} min="-50" max="50" value={offsets[i]} onChange={e => setOffsets(v => v.map((x, j) => j === i ? Math.max(-50, Math.min(50, Math.round(Number(e.target.value) || 0))) : x))} /></label><p>V0{i + 1} = {analogValues[addresses('V', 4)[i]].toFixed(2)}</p></fieldset>)}</div>}
    {panel === 'DATA REGISTER' && <div className="clic-editor"><label>Registrador<select value={register} onChange={e => setRegister(e.target.value)}>{selectTags(addresses('DR', 240))}</select></label><label><input type="checkbox" disabled={running} checked={signed} onChange={e => { setSigned(e.target.checked); setRegisters(v => Object.fromEntries(Object.entries(v).map(([k, n]) => [k, e.target.checked && n > 32767 ? n - 65536 : !e.target.checked && n < 0 ? n + 65536 : n]))); }} /> Inteiro com sinal (S)</label><label>Valor {signed ? '−32768…32767' : '0…65535'}<input type="number" min={signed ? -32768 : 0} max={signed ? 32767 : 65535} value={registers[register] ?? 0} onChange={e => setRegisters(v => ({ ...v, [register]: Math.max(signed ? -32768 : 0, Math.min(signed ? 32767 : 65535, Math.round(Number(e.target.value) || 0))) }))} /></label></div>}
    {panel === 'CONFIG. RTC' && <label>Relógio do CLP<input type="datetime-local" onChange={e => { const value = new Date(e.target.value).getTime(); if (Number.isFinite(value)) setClockOffset(value - Date.now()); }} /><small>Relógio independente do computador, mantido nesta sessão.</small></label>}
    {panel === 'MEMÓRIA' && <fieldset disabled={running}><legend>Memória de programa simulada · sessão atual</legend><button onClick={() => { setMemory(structuredClone(program)); setNotice('Programa salvo na memória simulada desta sessão.'); }}>Escrever programa</button><button disabled={!memory} onClick={() => { if (memory) { setProgram(structuredClone(memory)); setSelected(0); } }}>Ler programa</button><button onClick={() => { setProgram({ rungs: [], timers: {}, counters: {} }); setRuntime(freshRuntime()); setSelected(0); }}>Limpar programa</button><button onClick={() => { setProgram(initialProgram()); setRuntime(freshRuntime()); setSelected(0); }}>Carregar exemplo de selo</button></fieldset>}
    <details><summary>Referência e recursos desta simulação</summary><p>Base: WEG CLIC02 CLW-02/20HR-D, LCD 4×16, teclado DEL/SEL/ESC/OK e quatro setas. Este modelo não possui RS-485 integrado.</p><p>Executados: Ladder, selo, saídas, SET/RESET, relé de impulso por borda, temporizadores modos 1–6, contadores modos 1–2, comparadores G, escalas analógicas V, RTC modos 0–4, registradores DR e telas de texto HMI. O scan usa tempo decorrido do navegador.</p><p>Ainda não executados: FBD, temporizador modo 7, contador rápido e modos 3–8, blocos PID/aritméticos, campos dinâmicos da HMI, expansões e edição de instruções pelo teclado frontal. O editor ampliado e a memória de sessão são recursos didáticos.</p><a href={manual} target="_blank" rel="noreferrer">Manual oficial WEG CLIC02</a></details>
  </section>;
};
