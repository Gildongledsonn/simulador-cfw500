import React, { useState, useEffect, useRef } from 'react';
import { useInverter } from '../context/InverterContext';

export type ContactType = 'NONE' | 'WIRE' | 'NO' | 'NC' | 'PULSE_RISING';
export type CoilType = 'OUT' | 'SET' | 'RST' | 'PULSE_FF' | 'TON' | 'COUNTER' | 'RTC' | 'COMP' | 'HMI' | 'MB_SPEED';

export interface LadderCell {
  type: ContactType;
  tag: string;
}

export interface LadderRung {
  id: string;
  cells: [LadderCell, LadderCell, LadderCell];
  coil: {
    type: CoilType;
    tag: string;
    value?: number;
    subParam?: number; // Para modos de temporizador (1 a 7) ou comparador
  };
}

interface Clic02Props {
  onModbusTx?: (frame: string, description: string) => void;
  activePlant: string;
}

const AVAILABLE_CONTACT_TAGS = [
  'I01', 'I02', 'I03', 'I04', 'I05', 'I06', 'I07', 'I08',
  'Z01', 'Z02', 'Z03', 'Z04',
  'M01', 'M02', 'M03', 'M31', 'M32',
  'Q01', 'Q02', 'Q03', 'Q04',
  'T01', 'T02',
  'C01', 'C02',
  'R01',
  'G01'
];

const AVAILABLE_COIL_TAGS = [
  'Q01', 'Q02', 'Q03', 'Q04',
  'M01', 'M02', 'M03',
  'T01', 'T02',
  'C01', 'C02',
  'R01',
  'G01',
  'H01',
  'P0681'
];

export const Clic02RealisticPLC: React.FC<Clic02Props> = ({ onModbusTx, activePlant }) => {
  const { state, dispatch } = useInverter();

  const [isRun, setIsRun] = useState<boolean>(true);
  const [selectedRung, setSelectedRung] = useState<number>(0);
  const [selectedCol, setSelectedCol] = useState<number>(0);
  const [activeScreenMode, setActiveScreenMode] = useState<'MAIN' | 'LADDER' | 'HMI' | 'MENU'>('LADDER');

  // Entradas Físicas I01 a I08
  const [inputs, setInputs] = useState<{ [key: string]: boolean }>({
    I01: false,
    I02: true, // NF de Parada/Emergência
    I03: false,
    I04: false,
    I05: false,
    I06: false,
    I07: false,
    I08: false,
  });

  // Teclas Z01 a Z04 (direcionais como entradas lógicas)
  const [zKeys, setZKeys] = useState<{ [key: string]: boolean }>({
    Z01: false,
    Z02: false,
    Z03: false,
    Z04: false,
  });

  // Saídas Físicas Q01 a Q04
  const [outputs, setOutputs] = useState<{ [key: string]: boolean }>({
    Q01: false,
    Q02: false,
    Q03: false,
    Q04: false,
  });

  // Marcadores Auxiliares M e Especiais
  const [flags, setFlags] = useState<{ [key: string]: boolean }>({
    M01: false,
    M02: false,
    M03: false,
    M31: false, // Pulso inicial de primeiro scan
    M32: false, // Oscilador 1s (0.5s ON / 0.5s OFF)
  });

  // Temporizadores T01 a T1F
  const [timers, setTimers] = useState<{ [key: string]: { currentSec: number; targetSec: number; done: boolean } }>({
    T01: { currentSec: 0, targetSec: 3.0, done: false },
    T02: { currentSec: 0, targetSec: 5.0, done: false },
  });

  // Contadores C01 a C1F
  const [counters, setCounters] = useState<{ [key: string]: { current: number; target: number; done: boolean } }>({
    C01: { current: 0, target: 5, done: false },
    C02: { current: 0, target: 10, done: false },
  });

  // Lógica Ladder de Exemplo
  const [rungs, setRungs] = useState<LadderRung[]>([
    {
      id: 'rung_1',
      cells: [
        { type: 'NO', tag: 'I01' },
        { type: 'NC', tag: 'I02' },
        { type: 'WIRE', tag: '' },
      ],
      coil: { type: 'OUT', tag: 'Q01' },
    },
    {
      id: 'rung_2',
      cells: [
        { type: 'NO', tag: 'Q01' },
        { type: 'WIRE', tag: '' },
        { type: 'WIRE', tag: '' },
      ],
      coil: { type: 'TON', tag: 'T01', value: 3.0 },
    },
    {
      id: 'rung_3',
      cells: [
        { type: 'NO', tag: 'T01' },
        { type: 'WIRE', tag: '' },
        { type: 'WIRE', tag: '' },
      ],
      coil: { type: 'MB_SPEED', tag: 'P0681', value: 60.0 },
    },
  ]);

  const lastScanTimeRef = useRef<number>(performance.now());
  const prevInputsRef = useRef<{ [key: string]: boolean }>({ ...inputs });
  const isFirstScanRef = useRef<boolean>(true);

  // Avaliação de continuidade de um contato
  const evalCell = (cell: LadderCell): boolean => {
    if (cell.type === 'NONE') return false;
    if (cell.type === 'WIRE') return true;

    let val = false;
    const tag = cell.tag;

    if (tag.startsWith('I')) val = !!inputs[tag];
    else if (tag.startsWith('Z')) val = !!zKeys[tag];
    else if (tag.startsWith('Q')) val = !!outputs[tag];
    else if (tag.startsWith('M')) val = !!flags[tag];
    else if (tag.startsWith('T')) val = !!timers[tag]?.done;
    else if (tag.startsWith('C')) val = !!counters[tag]?.done;

    if (cell.type === 'PULSE_RISING') {
      const prevVal = !!prevInputsRef.current[tag];
      return val && !prevVal;
    }

    return cell.type === 'NO' ? val : !val;
  };

  // Avaliação da linha (Rung)
  const evalRung = (r: LadderRung): boolean => {
    for (const cell of r.cells) {
      if (cell.type === 'NONE') return false;
      if (!evalCell(cell)) return false;
    }
    return true;
  };

  // Ciclo de Varredura Scan (IEC 61131-3 / CLIC-02 Scan Engine)
  useEffect(() => {
    if (!isRun) {
      lastScanTimeRef.current = performance.now();
      return;
    }

    const interval = setInterval(() => {
      const now = performance.now();
      const dt = (now - lastScanTimeRef.current) / 1000;
      lastScanTimeRef.current = now;

      const nextFlags = { ...flags };
      const nextOutputs = { ...outputs };
      const nextTimers = { ...timers };
      const nextCounters = { ...counters };

      // Marcadores especiais M31 (First Scan) e M32 (1s Clock)
      if (isFirstScanRef.current) {
        nextFlags.M31 = true;
        isFirstScanRef.current = false;
      } else {
        nextFlags.M31 = false;
      }
      nextFlags.M32 = Math.floor(now / 500) % 2 === 0;

      rungs.forEach((r) => {
        const energized = evalRung(r);
        const coilTag = r.coil.tag;

        if (r.coil.type === 'OUT') {
          if (coilTag.startsWith('Q')) nextOutputs[coilTag] = energized;
          else if (coilTag.startsWith('M')) nextFlags[coilTag] = energized;
        } else if (r.coil.type === 'SET' && energized) {
          if (coilTag.startsWith('Q')) nextOutputs[coilTag] = true;
          else if (coilTag.startsWith('M')) nextFlags[coilTag] = true;
        } else if (r.coil.type === 'RST' && energized) {
          if (coilTag.startsWith('Q')) nextOutputs[coilTag] = false;
          else if (coilTag.startsWith('M')) nextFlags[coilTag] = false;
          else if (coilTag.startsWith('T')) nextTimers[coilTag] = { currentSec: 0, targetSec: nextTimers[coilTag]?.targetSec || 3.0, done: false };
          else if (coilTag.startsWith('C')) nextCounters[coilTag] = { current: 0, target: nextCounters[coilTag]?.target || 5, done: false };
        } else if (r.coil.type === 'PULSE_FF' && energized) {
          if (coilTag.startsWith('Q')) nextOutputs[coilTag] = !nextOutputs[coilTag];
          else if (coilTag.startsWith('M')) nextFlags[coilTag] = !nextFlags[coilTag];
        } else if (r.coil.type === 'TON') {
          const tName = coilTag || 'T01';
          const target = r.coil.value ?? 3.0;
          const current = nextTimers[tName]?.currentSec || 0;

          if (energized) {
            const nextSec = Math.min(target, current + dt);
            nextTimers[tName] = { currentSec: nextSec, targetSec: target, done: nextSec >= target };
          } else {
            nextTimers[tName] = { currentSec: 0, targetSec: target, done: false };
          }
        } else if (r.coil.type === 'MB_SPEED' && energized) {
          const targetHz = r.coil.value ?? 60.0;
          const curParamVal = state.parameters?.P0121?.currentValue ?? 0;
          if (Math.abs(curParamVal - targetHz) > 0.5) {
            const rawVal = Math.round((targetHz / 60) * 8192);
            const rawHex = rawVal.toString(16).toUpperCase().padStart(4, '0');
            if (onModbusTx) {
              onModbusTx(`01 06 00 01 ${rawHex.slice(0, 2)} ${rawHex.slice(2)}`, `CLIC-02 -> Write Register 40002 (${targetHz} Hz)`);
            }
            dispatch({ type: 'SELECT_PARAM_DIRECT', payload: 'P0121' });
            dispatch({ type: 'SET_ANALOG_INPUT_1', payload: (targetHz / 60) * 10 });
          }
        }
      });

      setFlags(nextFlags);
      setOutputs(nextOutputs);
      setTimers(nextTimers);
      setCounters(nextCounters);
      prevInputsRef.current = { ...inputs };

      // Sincronização da saída Q01 com o Inversor via Modbus
      if (state.controlSource !== 'REM') {
        dispatch({ type: 'PRESS_LOCREM' });
      }

      if (nextOutputs.Q01 && state.motorStatus !== 'RUNNING') {
        if (onModbusTx) onModbusTx('01 06 00 00 00 01 48 0A', 'CLIC-02 -> Modbus RUN (Reg 40001 = 1)');
        dispatch({ type: 'PRESS_RUN' });
      } else if (!nextOutputs.Q01 && state.motorStatus === 'RUNNING') {
        if (onModbusTx) onModbusTx('01 06 00 00 00 00 89 CA', 'CLIC-02 -> Modbus STOP (Reg 40001 = 0)');
        dispatch({ type: 'PRESS_STOP' });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isRun, inputs, zKeys, flags, outputs, timers, counters, rungs, state.motorStatus, state.controlSource, state.parameters?.P0121?.currentValue, dispatch, onModbusTx]);

  // Edição de células da matriz Ladder
  const handleCellClick = (rIdx: number, cIdx: number) => {
    if (isRun) return;
    const next = [...rungs];
    const types: ContactType[] = ['NO', 'NC', 'PULSE_RISING', 'WIRE', 'NONE'];
    const curIdx = types.indexOf(next[rIdx].cells[cIdx].type);
    const nextType = types[(curIdx + 1) % types.length];

    next[rIdx].cells[cIdx] = {
      type: nextType,
      tag: nextType === 'WIRE' || nextType === 'NONE' ? '' : next[rIdx].cells[cIdx].tag || 'I01',
    };
    setRungs(next);
  };

  const handleTagRotate = (rIdx: number, cIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRun) return;
    const next = [...rungs];
    const curTag = next[rIdx].cells[cIdx].tag;
    const tagIdx = AVAILABLE_CONTACT_TAGS.indexOf(curTag);
    const nextTag = AVAILABLE_CONTACT_TAGS[(tagIdx + 1) % AVAILABLE_CONTACT_TAGS.length];
    next[rIdx].cells[cIdx].tag = nextTag;
    setRungs(next);
  };

  // Edição de bobinas
  const handleCoilClick = (rIdx: number) => {
    if (isRun) return;
    const next = [...rungs];
    const types: CoilType[] = ['OUT', 'SET', 'RST', 'PULSE_FF', 'TON', 'MB_SPEED'];
    const curIdx = types.indexOf(next[rIdx].coil.type);
    const nextType = types[(curIdx + 1) % types.length];

    next[rIdx].coil = {
      type: nextType,
      tag: nextType === 'TON' ? 'T01' : nextType === 'MB_SPEED' ? 'P0681' : next[rIdx].coil.tag || 'Q01',
      value: nextType === 'TON' ? 3.0 : nextType === 'MB_SPEED' ? 60.0 : undefined,
    };
    setRungs(next);
  };

  const handleCoilTagRotate = (rIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRun) return;
    const next = [...rungs];
    const curTag = next[rIdx].coil.tag;
    const tagIdx = AVAILABLE_COIL_TAGS.indexOf(curTag);
    const nextTag = AVAILABLE_COIL_TAGS[(tagIdx + 1) % AVAILABLE_COIL_TAGS.length];
    next[rIdx].coil.tag = nextTag;
    setRungs(next);
  };

  const handleAddRung = () => {
    if (isRun || rungs.length >= 8) return;
    const newRung: LadderRung = {
      id: `rung_${Date.now()}`,
      cells: [
        { type: 'NO', tag: 'I01' },
        { type: 'WIRE', tag: '' },
        { type: 'WIRE', tag: '' },
      ],
      coil: { type: 'OUT', tag: `M0${rungs.length}` },
    };
    setRungs([...rungs, newRung]);
  };

  const handleRemoveRung = () => {
    if (isRun || rungs.length <= 1) return;
    setRungs(rungs.slice(0, -1));
  };

  // Formatação de linhas da tela inicial oficial
  const renderStatusScreen = () => {
    const activeInputsStr = ['I01', 'I02', 'I03', 'I04', 'I05', 'I06', 'I07', 'I08']
      .map((k, i) => (inputs[k] ? String(i + 1) : '.'))
      .join('');

    const activeOutputsStr = ['Q01', 'Q02', 'Q03', 'Q04']
      .map((k, i) => (outputs[k] ? String(i + 1) : '.'))
      .join('');

    const activeZStr = ['Z01', 'Z02', 'Z03', 'Z04']
      .map((k, i) => (zKeys[k] ? String(i + 1) : '.'))
      .join('');

    return (
      <div style={lcdScreenStyle}>
        <div style={lcdTextRowStyle}>
          <span>I:{activeInputsStr}</span>
          <span>PLANTA:{activePlant.toUpperCase().slice(0, 4)}</span>
        </div>
        <div style={lcdTextRowStyle}>
          <span>Z:{activeZStr}</span>
          <span>Q:{activeOutputsStr}</span>
        </div>
        <div style={lcdTextRowStyle}>
          <span style={{ color: isRun ? '#004d40' : '#b71c1c', fontWeight: 'bold' }}>
            {isRun ? 'MODE: RUN' : 'MODE: STOP'}
          </span>
          <span>RTC: 10:38</span>
        </div>
        <div style={lcdTextRowStyle}>
          <span>T01:{timers.T01?.currentSec.toFixed(1)}s</span>
          <span>F:{(state.outputFrequency ?? 0).toFixed(1)}Hz</span>
        </div>
      </div>
    );
  };

  return (
    <div style={chassisStyle}>
      {/* 1. BORNES SUPERIORES DE ENTRADA (I01 - I08 + ALIMENTAÇÃO) */}
      <div style={terminalRowStyle}>
        <div style={powerTerminalStyle}>L (+)</div>
        <div style={powerTerminalStyle}>N (-)</div>
        {['I01', 'I02', 'I03', 'I04', 'I05', 'I06', 'I07', 'I08'].map((inName) => (
          <button
            key={inName}
            onClick={() => setInputs((prev) => ({ ...prev, [inName]: !prev[inName] }))}
            style={{
              ...inputScrewBtnStyle,
              background: inputs[inName] ? '#00e676' : '#263238',
              color: inputs[inName] ? '#000' : '#cfd8dc',
              borderColor: inputs[inName] ? '#69f0ae' : '#37474f',
            }}
            title={`Alternar ${inName} (24V CC)`}
          >
            {inName}: {inputs[inName] ? 'ON' : 'OFF'}
          </button>
        ))}
      </div>

      {/* 2. PAINEL FRONTAL OFICIAL WEG CLIC-02 */}
      <div style={frontFaceStyle}>
        <div style={headerBrandRow}>
          <div>
            <strong style={{ fontSize: '18px', color: '#005ea6', letterSpacing: '1px' }}>WEG</strong>
            <span style={{ fontSize: '11px', color: '#37474f', fontWeight: 'bold', marginLeft: '6px' }}>CLIC02 20HR-D</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '9px', fontWeight: 'bold', color: isRun ? '#00e676' : '#78909c' }}>● RUN</span>
            <span style={{ fontSize: '9px', fontWeight: 'bold', color: !isRun ? '#ff1744' : '#78909c' }}>● STOP</span>
            <span style={{ fontSize: '9px', color: '#00e676', fontWeight: 'bold' }}>RS-485 [ONLINE]</span>
          </div>
        </div>

        {/* DISPLAY LCD (LADDER OU TELA INICIAL DE STATUS) */}
        {activeScreenMode === 'MAIN' ? (
          renderStatusScreen()
        ) : (
          <div style={lcdScreenStyle}>
            <div style={lcdHeaderLineStyle}>
              <span>{isRun ? 'PLC: [RUNNING]' : 'PLC: [STOP/EDIT]'}</span>
              <span>LADDER VIEW</span>
            </div>

            <div style={ladderMatrixStyle}>
              {rungs.map((r, rIdx) => {
                const rungOn = isRun && evalRung(r);
                return (
                  <div key={r.id} style={ladderRowStyle}>
                    <span style={{ color: '#1b5e20', fontWeight: 'bold', marginRight: '2px' }}>|</span>
                    {r.cells.map((c, cIdx) => (
                      <div
                        key={cIdx}
                        onClick={() => handleCellClick(rIdx, cIdx)}
                        style={{
                          cursor: isRun ? 'default' : 'pointer',
                          padding: '1px 3px',
                          background: selectedRung === rIdx && selectedCol === cIdx && !isRun ? '#a5d6a7' : 'transparent',
                          borderRadius: '2px',
                          fontWeight: 'bold',
                          color: isRun && evalCell(c) ? '#004d40' : '#2e7d32',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '2px',
                        }}
                      >
                        {c.type === 'NONE' && '----'}
                        {c.type === 'WIRE' && '————'}
                        {c.type === 'NO' && (
                          <span>
                            [{' '}
                            <span
                              onClick={(e) => handleTagRotate(rIdx, cIdx, e)}
                              style={{ textDecoration: !isRun ? 'underline' : 'none', color: '#004d40' }}
                            >
                              {c.tag}
                            </span>{' '}
                            ]
                          </span>
                        )}
                        {c.type === 'NC' && (
                          <span>
                            [/{' '}
                            <span
                              onClick={(e) => handleTagRotate(rIdx, cIdx, e)}
                              style={{ textDecoration: !isRun ? 'underline' : 'none', color: '#004d40' }}
                            >
                              {c.tag}
                            </span>{' '}
                            ]
                          </span>
                        )}
                        {c.type === 'PULSE_RISING' && (
                          <span>
                            [D{' '}
                            <span
                              onClick={(e) => handleTagRotate(rIdx, cIdx, e)}
                              style={{ textDecoration: !isRun ? 'underline' : 'none', color: '#004d40' }}
                            >
                              {c.tag}
                            </span>{' '}
                            ]
                          </span>
                        )}
                      </div>
                    ))}
                    <div
                      onClick={() => handleCoilClick(rIdx)}
                      style={{
                        cursor: isRun ? 'default' : 'pointer',
                        fontWeight: 'bold',
                        color: rungOn ? '#b71c1c' : '#1b5e20',
                        marginLeft: 'auto',
                        padding: '1px 3px',
                      }}
                    >
                      (
                      <span onClick={(e) => handleCoilTagRotate(rIdx, e)} style={{ textDecoration: !isRun ? 'underline' : 'none' }}>
                        {r.coil.type === 'TON'
                          ? `${r.coil.tag} ${r.coil.value}s`
                          : r.coil.type === 'SET'
                          ? `↑ ${r.coil.tag}`
                          : r.coil.type === 'RST'
                          ? `↓ ${r.coil.tag}`
                          : r.coil.type === 'PULSE_FF'
                          ? `P ${r.coil.tag}`
                          : r.coil.type === 'MB_SPEED'
                          ? `MB:${r.coil.value}Hz`
                          : `${r.coil.tag}`}
                      </span>
                      )
                    </div>
                    <span style={{ color: '#1b5e20', fontWeight: 'bold', marginLeft: '2px' }}>|</span>
                  </div>
                );
              })}
            </div>

            <div style={lcdFooterLineStyle}>
              <span>Q01:{outputs.Q01 ? 'ON' : 'OFF'}</span>
              <span>T01:{timers.T01?.currentSec.toFixed(1)}s</span>
              <span>M32:{flags.M32 ? '1' : '0'}</span>
            </div>
          </div>
        )}

        {/* FERRAMENTAS DE EDIÇÃO EM MODO STOP */}
        {!isRun && (
          <div style={editToolbarStyle}>
            <button onClick={handleAddRung} style={btnEditStyle}>
              ➕ Inserir Linha
            </button>
            <button onClick={handleRemoveRung} style={{ ...btnEditStyle, background: '#c62828' }}>
              ➖ Excluir Linha
            </button>
            <span style={{ fontSize: '9px', color: '#37474f' }}>Clique nas portas para alternar (I, Z, M, Q, T)</span>
          </div>
        )}

        {/* TECLADO DE MEMBRANA DO CLIC-02 */}
        <div style={keypadChassisStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
              onClick={() => setIsRun(!isRun)}
              style={{
                ...btnKeypadStyle,
                background: isRun ? '#2e7d32' : '#c62828',
                color: '#fff',
                width: '74px',
              }}
            >
              {isRun ? 'RUN' : 'STOP'}
            </button>
            <button
              onClick={() => setActiveScreenMode(activeScreenMode === 'LADDER' ? 'MAIN' : 'LADDER')}
              style={{ ...btnKeypadStyle, width: '74px', background: '#455a64' }}
            >
              SEL/ESC
            </button>
          </div>

          {/* TECLADO DE NAVEGAÇÃO E TECLAS Z01 A Z04 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
            <div />
            <button
              onMouseDown={() => setZKeys((prev) => ({ ...prev, Z01: true }))}
              onMouseUp={() => setZKeys((prev) => ({ ...prev, Z01: false }))}
              onClick={() => setSelectedRung(Math.max(0, selectedRung - 1))}
              style={btnKeypadStyle}
              title="Cima / Tecla Z01"
            >
              ▲
            </button>
            <div />

            <button
              onMouseDown={() => setZKeys((prev) => ({ ...prev, Z02: true }))}
              onMouseUp={() => setZKeys((prev) => ({ ...prev, Z02: false }))}
              onClick={() => setSelectedCol(Math.max(0, selectedCol - 1))}
              style={btnKeypadStyle}
              title="Esquerda / Tecla Z02"
            >
              ◀
            </button>
            <button
              onClick={() => handleCellClick(selectedRung, selectedCol)}
              style={{ ...btnKeypadStyle, background: '#0288d1', color: '#fff' }}
              title="Confirmação OK"
            >
              OK
            </button>
            <button
              onMouseDown={() => setZKeys((prev) => ({ ...prev, Z04: true }))}
              onMouseUp={() => setZKeys((prev) => ({ ...prev, Z04: false }))}
              onClick={() => setSelectedCol(Math.min(2, selectedCol + 1))}
              style={btnKeypadStyle}
              title="Direita / Tecla Z04"
            >
              ▶
            </button>

            <div />
            <button
              onMouseDown={() => setZKeys((prev) => ({ ...prev, Z03: true }))}
              onMouseUp={() => setZKeys((prev) => ({ ...prev, Z03: false }))}
              onClick={() => setSelectedRung(Math.min(rungs.length - 1, selectedRung + 1))}
              style={btnKeypadStyle}
              title="Baixo / Tecla Z03"
            >
              ▼
            </button>
            <div />
          </div>
        </div>
      </div>

      {/* 3. BORNES INFERIORES DE SAÍDA A RELÉ (Q01 - Q04) */}
      <div style={terminalRowStyle}>
        {['Q01', 'Q02', 'Q03', 'Q04'].map((qName) => {
          const isActive = !!outputs[qName];
          return (
            <div key={qName} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div
                style={{
                  ...outputLedStyle,
                  background: isActive ? '#00e676' : '#263238',
                  boxShadow: isActive ? '0 0 8px #00e676' : 'none',
                }}
              />
              <span style={{ fontSize: '10px', color: '#cfd8dc', fontWeight: 'bold' }}>{qName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const chassisStyle: React.CSSProperties = {
  background: '#cfd8dc',
  border: '3px solid #78909c',
  borderRadius: '12px',
  padding: '10px',
  boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  maxWidth: '460px',
  width: '100%',
  boxSizing: 'border-box',
};

const terminalRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  background: '#263238',
  padding: '6px 10px',
  borderRadius: '6px',
  flexWrap: 'wrap',
  gap: '4px',
};

const powerTerminalStyle: React.CSSProperties = {
  background: '#37474f',
  color: '#eceff1',
  fontSize: '9px',
  fontWeight: 'bold',
  padding: '4px 6px',
  borderRadius: '4px',
};

const inputScrewBtnStyle: React.CSSProperties = {
  border: '1px solid',
  borderRadius: '4px',
  padding: '3px 6px',
  fontSize: '10px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
};

const frontFaceStyle: React.CSSProperties = {
  background: '#eceff1',
  border: '2px solid #b0bec5',
  borderRadius: '8px',
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const headerBrandRow: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '2px solid #b0bec5',
  paddingBottom: '4px',
};

const lcdScreenStyle: React.CSSProperties = {
  background: '#c8e6c9',
  border: '3px inset #81c784',
  borderRadius: '6px',
  padding: '6px',
  fontFamily: '"Courier New", monospace',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.15)',
};

const lcdHeaderLineStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '10px',
  fontWeight: 'bold',
  color: '#1b5e20',
  borderBottom: '1px dashed #81c784',
  paddingBottom: '2px',
};

const lcdTextRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '11px',
  fontWeight: 'bold',
  color: '#1b5e20',
};

const ladderMatrixStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  margin: '4px 0',
  minHeight: '60px',
};

const ladderRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  fontSize: '11px',
};

const lcdFooterLineStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '9px',
  fontWeight: 'bold',
  color: '#2e7d32',
  borderTop: '1px dashed #81c784',
  paddingTop: '2px',
};

const editToolbarStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  background: '#b0bec5',
  padding: '4px 6px',
  borderRadius: '4px',
};

const btnEditStyle: React.CSSProperties = {
  background: '#0288d1',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  padding: '3px 6px',
  fontSize: '9px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const keypadChassisStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#b0bec5',
  padding: '6px',
  borderRadius: '6px',
};

const btnKeypadStyle: React.CSSProperties = {
  background: '#37474f',
  color: '#eceff1',
  border: '1px solid #263238',
  borderRadius: '4px',
  padding: '4px 8px',
  fontSize: '10px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const outputLedStyle: React.CSSProperties = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  border: '1px solid #37474f',
};