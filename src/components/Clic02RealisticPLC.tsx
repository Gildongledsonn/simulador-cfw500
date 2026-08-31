import React, { useState, useEffect, useRef } from 'react';
import { useInverter } from '../context/InverterContext';

export type ContactType = 'NONE' | 'WIRE' | 'NO' | 'NC';
export type CoilType = 'OUT' | 'SET' | 'RST' | 'TON' | 'MB_SPEED';

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
  };
}

interface Clic02Props {
  onModbusTx?: (frame: string, description: string) => void;
  activePlant: string;
}

const AVAILABLE_TAGS = ['I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'M1', 'M2', 'M3', 'M4', 'Q1', 'T1', 'T2'];
const AVAILABLE_COIL_TAGS = ['Q1', 'Q2', 'Q3', 'Q4', 'M1', 'M2', 'T1', 'T2', 'P0681'];

export const Clic02RealisticPLC: React.FC<Clic02Props> = ({ onModbusTx, activePlant }) => {
  const { state, dispatch } = useInverter();

  const [isRun, setIsRun] = useState<boolean>(true);
  const [selectedRung, setSelectedRung] = useState<number>(0);
  const [selectedCol, setSelectedCol] = useState<number>(0);

  // Estados das Entradas Digitais Físicas (I1 - I8)
  const [inputs, setInputs] = useState<{ [key: string]: boolean }>({
    I1: false,
    I2: true, // NF de Emergência / Parada
    I3: false,
    I4: false,
    I5: false,
    I6: false,
    I7: false,
    I8: false,
  });

  // Memórias Booleanas Internas (M1 - M4)
  const [flags, setFlags] = useState<{ [key: string]: boolean }>({
    M1: false,
    M2: false,
    M3: false,
    M4: false,
  });

  // Estados dos Temporizadores TON (T1 - T4)
  const [timers, setTimers] = useState<{ [key: string]: { currentSec: number; targetSec: number; done: boolean } }>({
    T1: { currentSec: 0, targetSec: 3.0, done: false },
    T2: { currentSec: 0, targetSec: 5.0, done: false },
  });

  // Linhas de Lógica Ladder Editáveis
  const [rungs, setRungs] = useState<LadderRung[]>([
    {
      id: 'rung_1',
      cells: [
        { type: 'NO', tag: 'I1' },
        { type: 'NC', tag: 'I2' },
        { type: 'WIRE', tag: '' },
      ],
      coil: { type: 'OUT', tag: 'Q1' },
    },
    {
      id: 'rung_2',
      cells: [
        { type: 'NO', tag: 'Q1' },
        { type: 'WIRE', tag: '' },
        { type: 'WIRE', tag: '' },
      ],
      coil: { type: 'TON', tag: 'T1', value: 3.0 },
    },
    {
      id: 'rung_3',
      cells: [
        { type: 'NO', tag: 'T1' },
        { type: 'WIRE', tag: '' },
        { type: 'WIRE', tag: '' },
      ],
      coil: { type: 'MB_SPEED', tag: 'P0681', value: 60.0 },
    },
  ]);

  const lastScanTimeRef = useRef<number>(performance.now());

  const evalCell = (cell: LadderCell, q1On: boolean): boolean => {
    if (cell.type === 'NONE') return false;
    if (cell.type === 'WIRE') return true;

    let val = false;
    if (cell.tag.startsWith('I')) val = !!inputs[cell.tag];
    else if (cell.tag.startsWith('M')) val = !!flags[cell.tag];
    else if (cell.tag === 'Q1') val = q1On;
    else if (cell.tag.startsWith('T')) val = !!timers[cell.tag]?.done;

    return cell.type === 'NO' ? val : !val;
  };

  const evalRung = (r: LadderRung, q1On: boolean): boolean => {
    for (const cell of r.cells) {
      if (cell.type === 'NONE') return false;
      if (!evalCell(cell, q1On)) return false;
    }
    return true;
  };

  // Motor de Execução Ladder, Temporizadores e Modbus RTU
  useEffect(() => {
    if (!isRun) {
      lastScanTimeRef.current = performance.now();
      return;
    }

    const interval = setInterval(() => {
      const now = performance.now();
      const dt = (now - lastScanTimeRef.current) / 1000;
      lastScanTimeRef.current = now;

      let shouldRunMotor = false;
      const nextFlags = { ...flags };
      const nextTimers = { ...timers };
      const isCurrentlyRunning = state.motorStatus === 'RUNNING';

      rungs.forEach((r) => {
        const energized = evalRung(r, isCurrentlyRunning);

        if (r.coil.type === 'OUT') {
          if (r.coil.tag === 'Q1') shouldRunMotor = energized;
          else if (r.coil.tag.startsWith('M')) nextFlags[r.coil.tag] = energized;
        } else if (r.coil.type === 'SET' && energized) {
          if (r.coil.tag === 'Q1') shouldRunMotor = true;
          else if (r.coil.tag.startsWith('M')) nextFlags[r.coil.tag] = true;
        } else if (r.coil.type === 'RST' && energized) {
          if (r.coil.tag === 'Q1') shouldRunMotor = false;
          else if (r.coil.tag.startsWith('M')) nextFlags[r.coil.tag] = false;
        } else if (r.coil.type === 'TON') {
          const tName = r.coil.tag || 'T1';
          const target = r.coil.value ?? 3.0;
          const current = nextTimers[tName]?.currentSec || 0;

          if (energized) {
            const nextSec = Math.min(target, current + dt);
            const isDone = nextSec >= target;
            nextTimers[tName] = { currentSec: nextSec, targetSec: target, done: isDone };
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
      setTimers(nextTimers);

      if (state.controlSource !== 'REM') {
        dispatch({ type: 'PRESS_LOCREM' });
      }

      if (shouldRunMotor && !isCurrentlyRunning) {
        if (onModbusTx) onModbusTx('01 06 00 00 00 01 48 0A', 'CLIC-02 -> Modbus RUN (Reg 40001 = 1)');
        dispatch({ type: 'PRESS_RUN' });
      } else if (!shouldRunMotor && isCurrentlyRunning) {
        if (onModbusTx) onModbusTx('01 06 00 00 00 00 89 CA', 'CLIC-02 -> Modbus STOP (Reg 40001 = 0)');
        dispatch({ type: 'PRESS_STOP' });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isRun, inputs, flags, timers, rungs, state.motorStatus, state.controlSource, state.parameters?.P0121?.currentValue, dispatch, onModbusTx]);

  // Edição dos Contatos da Matriz
  const handleCellClick = (rIdx: number, cIdx: number) => {
    if (isRun) return;
    const next = [...rungs];
    const types: ContactType[] = ['NO', 'NC', 'WIRE', 'NONE'];
    const curTypeIdx = types.indexOf(next[rIdx].cells[cIdx].type);
    const nextType = types[(curTypeIdx + 1) % types.length];

    next[rIdx].cells[cIdx] = {
      type: nextType,
      tag: nextType === 'WIRE' || nextType === 'NONE' ? '' : next[rIdx].cells[cIdx].tag || 'I1',
    };
    setRungs(next);
  };

  // Alternar a Porta/Tag associada ao contato selecionado
  const handleTagRotate = (rIdx: number, cIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRun) return;
    const next = [...rungs];
    const curTag = next[rIdx].cells[cIdx].tag;
    const tagIdx = AVAILABLE_TAGS.indexOf(curTag);
    const nextTag = AVAILABLE_TAGS[(tagIdx + 1) % AVAILABLE_TAGS.length];
    next[rIdx].cells[cIdx].tag = nextTag;
    setRungs(next);
  };

  // Edição das Bobinas e Temporizadores
  const handleCoilClick = (rIdx: number) => {
    if (isRun) return;
    const next = [...rungs];
    const types: CoilType[] = ['OUT', 'SET', 'RST', 'TON', 'MB_SPEED'];
    const curTypeIdx = types.indexOf(next[rIdx].coil.type);
    const nextType = types[(curTypeIdx + 1) % types.length];

    next[rIdx].coil = {
      type: nextType,
      tag: nextType === 'TON' ? 'T1' : nextType === 'MB_SPEED' ? 'P0681' : next[rIdx].coil.tag || 'Q1',
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

  // Adicionar e Remover Linhas Ladder
  const handleAddRung = () => {
    if (isRun || rungs.length >= 6) return;
    const newRung: LadderRung = {
      id: `rung_${Date.now()}`,
      cells: [
        { type: 'NO', tag: 'I1' },
        { type: 'WIRE', tag: '' },
        { type: 'WIRE', tag: '' },
      ],
      coil: { type: 'OUT', tag: `M${rungs.length}` },
    };
    setRungs([...rungs, newRung]);
  };

  const handleRemoveRung = () => {
    if (isRun || rungs.length <= 1) return;
    setRungs(rungs.slice(0, -1));
  };

  return (
    <div style={chassisStyle}>
      {/* RÉGUA SUPERIOR DE BORNES DE ENTRADA (I1 - I8) */}
      <div style={terminalRowStyle}>
        <div style={powerTerminalStyle}>L (+)</div>
        <div style={powerTerminalStyle}>N (-)</div>
        {['I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8'].map((inName) => (
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

      {/* PAINEL FRONTAL CLIC-02 */}
      <div style={frontFaceStyle}>
        <div style={headerBrandRow}>
          <div>
            <strong style={{ fontSize: '18px', color: '#005ea6', letterSpacing: '1px' }}>WEG</strong>
            <span style={{ fontSize: '11px', color: '#37474f', fontWeight: 'bold', marginLeft: '6px' }}>CLIC02 20HR-D</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '9px', fontWeight: 'bold', color: isRun ? '#00e676' : '#78909c' }}>● RUN</span>
            <span style={{ fontSize: '9px', fontWeight: 'bold', color: !isRun ? '#ff1744' : '#78909c' }}>● STOP</span>
            <span style={{ fontSize: '9px', color: '#00e676', fontWeight: 'bold' }}>RS-485 [MODBUS]</span>
          </div>
        </div>

        {/* DISPLAY LCD COM LADDER E MONITOR DE TEMPO TON */}
        <div style={lcdScreenStyle}>
          <div style={lcdHeaderLineStyle}>
            <span>{isRun ? 'PLC: [RUNNING]' : 'PLC: [STOP/EDIT]'}</span>
            <span>PLANTA: {activePlant.toUpperCase()}</span>
          </div>

          <div style={ladderMatrixStyle}>
            {rungs.map((r, rIdx) => {
              const rungOn = isRun && evalRung(r, state.motorStatus === 'RUNNING');
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
                        color: isRun && evalCell(c, state.motorStatus === 'RUNNING') ? '#004d40' : '#2e7d32',
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
                        : r.coil.type === 'MB_SPEED'
                        ? `MB:${r.coil.value}Hz`
                        : `${r.coil.type} ${r.coil.tag}`}
                    </span>
                    )
                  </div>
                  <span style={{ color: '#1b5e20', fontWeight: 'bold', marginLeft: '2px' }}>|</span>
                </div>
              );
            })}
          </div>

          <div style={lcdFooterLineStyle}>
            <span>Q1: {state.motorStatus === 'RUNNING' ? 'ON' : 'OFF'}</span>
            <span>
              T1: {timers.T1 ? `${timers.T1.currentSec.toFixed(1)}/${timers.T1.targetSec}s ${timers.T1.done ? '✓' : ''}` : 'OFF'}
            </span>
            <span>FREQ: {Math.abs(Number(state.outputFrequency ?? 0)).toFixed(1)}Hz</span>
          </div>
        </div>

        {/* BARRA DE FERRAMENTAS PARA EDIÇÃO DE LÓGICAS */}
        {!isRun && (
          <div style={editToolbarStyle}>
            <button onClick={handleAddRung} style={btnEditStyle}>
              ➕ Adicionar Linha
            </button>
            <button onClick={handleRemoveRung} style={{ ...btnEditStyle, background: '#c62828' }}>
              ➖ Remover Linha
            </button>
            <span style={{ fontSize: '9px', color: '#37474f' }}>Clique nos nomes das portas para alternar tags</span>
          </div>
        )}

        {/* TECLADO DE MEMBRANA */}
        <div style={keypadChassisStyle}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setIsRun(!isRun)}
              style={{
                ...btnKeypadStyle,
                background: isRun ? '#2e7d32' : '#c62828',
                color: '#fff',
                width: '70px',
              }}
            >
              {isRun ? 'RUN' : 'STOP'}
            </button>
            <button onClick={() => {}} style={btnKeypadStyle}>
              SEL/ESC
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
            <div />
            <button onClick={() => setSelectedRung(Math.max(0, selectedRung - 1))} style={btnKeypadStyle}>▲</button>
            <div />
            <button onClick={() => setSelectedCol(Math.max(0, selectedCol - 1))} style={btnKeypadStyle}>◀</button>
            <button onClick={() => handleCellClick(selectedRung, selectedCol)} style={{ ...btnKeypadStyle, background: '#0288d1', color: '#fff' }}>OK</button>
            <button onClick={() => setSelectedCol(Math.min(2, selectedCol + 1))} style={btnKeypadStyle}>▶</button>
            <div />
            <button onClick={() => setSelectedRung(Math.min(rungs.length - 1, selectedRung + 1))} style={btnKeypadStyle}>▼</button>
            <div />
          </div>
        </div>
      </div>

      {/* RÉGUA INFERIOR DE SAÍDAS (Q1 - Q4) */}
      <div style={terminalRowStyle}>
        {['Q1', 'Q2', 'Q3', 'Q4'].map((qName, idx) => {
          const isActive = idx === 0 ? state.motorStatus === 'RUNNING' : false;
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