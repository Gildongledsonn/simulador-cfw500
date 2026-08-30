import React, { useState, useEffect } from 'react';
import { useInverter } from '../context/InverterContext';

interface ModbusLog {
  id: number;
  time: string;
  type: 'TX' | 'RX';
  frame: string;
  description: string;
}

type ModbusMode = 'ladder' | 'standard' | 'cpp';
type ContactType = 'NONE' | 'WIRE' | 'NO' | 'NC';
type CoilType = 'OUT' | 'SET' | 'RST' | 'TON' | 'MB_SPEED';

interface LadderCell {
  type: ContactType;
  tag: string;
}

interface LadderRung {
  id: string;
  cells: [LadderCell, LadderCell, LadderCell];
  coil: {
    type: CoilType;
    tag: string;
    value?: number;
  };
}

export const ModbusPanel: React.FC = () => {
  const { state, dispatch } = useInverter();

  const [activeSubMode, setActiveSubMode] = useState<ModbusMode>('ladder');
  const [slaveAddress, setSlaveAddress] = useState(1);
  const [modbusSpeedHz, setModbusSpeedHz] = useState(50.0);

  const [isPlcRun, setIsPlcRun] = useState(true);
  const [inputsState, setInputsState] = useState<{ [key: string]: boolean }>({
    I1: false,
    I2: true,
    I3: false,
    I4: false,
  });

  const [flagsState, setFlagsState] = useState<{ [key: string]: boolean }>({
    M1: false,
    M2: false,
  });

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
        { type: 'NO', tag: 'I3' },
        { type: 'WIRE', tag: '' },
        { type: 'WIRE', tag: '' },
      ],
      coil: { type: 'MB_SPEED', tag: 'P0681', value: 60.0 },
    },
    {
      id: 'rung_3',
      cells: [
        { type: 'NO', tag: 'Q1' },
        { type: 'WIRE', tag: '' },
        { type: 'WIRE', tag: '' },
      ],
      coil: { type: 'TON', tag: 'T1', value: 3.0 },
    },
  ]);

  const [logs, setLogs] = useState<ModbusLog[]>([
    {
      id: 1,
      time: new Date().toLocaleTimeString(),
      type: 'RX',
      frame: '01 03 00 00 00 04 44 09',
      description: 'CLIC-02 Modbus Master Polling (40001 - 40004)',
    },
  ]);

  const addLog = (type: 'TX' | 'RX', frame: string, description: string) => {
    setLogs((prev) => [
      { id: Date.now(), time: new Date().toLocaleTimeString(), type, frame, description },
      ...prev.slice(0, 19),
    ]);
  };

  const evalCell = (cell: LadderCell, q1Active: boolean): boolean => {
    if (cell.type === 'NONE') return false;
    if (cell.type === 'WIRE') return true;

    let val = false;
    if (cell.tag.startsWith('I')) val = !!inputsState[cell.tag];
    else if (cell.tag.startsWith('M')) val = !!flagsState[cell.tag];
    else if (cell.tag === 'Q1') val = q1Active;

    return cell.type === 'NO' ? val : !val;
  };

  const evalRung = (rung: LadderRung, q1Active: boolean): boolean => {
    for (const cell of rung.cells) {
      if (cell.type === 'NONE') return false;
      if (!evalCell(cell, q1Active)) return false;
    }
    return true;
  };

  useEffect(() => {
    if (!isPlcRun || activeSubMode !== 'ladder') return;

    let shouldRun = false;
    let nextFlags = { ...flagsState };

    rungs.forEach((rung) => {
      const energized = evalRung(rung, state.motorStatus === 'RUNNING');

      if (rung.coil.type === 'OUT') {
        if (rung.coil.tag === 'Q1') shouldRun = energized;
        else if (rung.coil.tag.startsWith('M')) nextFlags[rung.coil.tag] = energized;
      } else if (rung.coil.type === 'SET' && energized) {
        if (rung.coil.tag === 'Q1') shouldRun = true;
      } else if (rung.coil.type === 'RST' && energized) {
        if (rung.coil.tag === 'Q1') shouldRun = false;
      } else if (rung.coil.type === 'MB_SPEED' && energized) {
        const targetHz = rung.coil.value || 50;
        if (Math.abs(state.parameters.P0121.currentValue - targetHz) > 0.5) {
          const raw = Math.round((targetHz / 60) * 8192);
          const hex = raw.toString(16).toUpperCase().padStart(4, '0');
          addLog('TX', `01 06 00 01 ${hex.slice(0, 2)} ${hex.slice(2)}`, `MB_WRITE(40002, ${targetHz}Hz)`);
          dispatch({ type: 'SELECT_PARAM_DIRECT', payload: 'P0121' });
          dispatch({ type: 'SET_ANALOG_INPUT_1', payload: (targetHz / 60) * 10 });
        }
      }
    });

    setFlagsState(nextFlags);

    if (shouldRun && state.motorStatus !== 'RUNNING') {
      addLog('TX', '01 06 00 00 00 01 48 0A', 'CLIC-02 -> Modbus RUN (40001 = 1)');
      dispatch({ type: 'PRESS_RUN' });
    } else if (!shouldRun && state.motorStatus === 'RUNNING') {
      addLog('TX', '01 06 00 00 00 00 89 CA', 'CLIC-02 -> Modbus STOP (40001 = 0)');
      dispatch({ type: 'PRESS_STOP' });
    }
  }, [isPlcRun, inputsState, rungs, activeSubMode, state.motorStatus, dispatch]);

  const handleCellClick = (rIdx: number, cIdx: number) => {
    if (isPlcRun) return;
    const next = [...rungs];
    const types: ContactType[] = ['NO', 'NC', 'WIRE', 'NONE'];
    const curIdx = types.indexOf(next[rIdx].cells[cIdx].type);
    const nType = types[(curIdx + 1) % types.length];

    next[rIdx].cells[cIdx] = {
      type: nType,
      tag: nType === 'WIRE' || nType === 'NONE' ? '' : next[rIdx].cells[cIdx].tag || 'I1',
    };
    setRungs(next);
  };

  const handleCoilClick = (rIdx: number) => {
    if (isPlcRun) return;
    const next = [...rungs];
    const types: CoilType[] = ['OUT', 'SET', 'RST', 'MB_SPEED', 'TON'];
    const curIdx = types.indexOf(next[rIdx].coil.type);
    const nType = types[(curIdx + 1) % types.length];

    next[rIdx].coil = {
      type: nType,
      tag: nType === 'MB_SPEED' ? 'P0681' : nType === 'TON' ? 'T1' : 'Q1',
      value: nType === 'MB_SPEED' ? 60 : nType === 'TON' ? 3.0 : undefined,
    };
    setRungs(next);
  };

  return (
    <div style={panelContainerStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>📟</span>
          <div>
            <strong style={{ color: '#00e676', fontSize: '13px' }}>
              RELÉ PROGRAMÁVEL WEG CLIC-02 • SIMULADOR SOFTPLC IEC 61131-3
            </strong>
            <span style={{ fontSize: '10px', color: '#90a4ae', display: 'block' }}>
              Comunicação Serial RS-485 Modbus RTU Mestre • Controle Digital e Analógico
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setActiveSubMode('ladder')}
            style={{ ...tabBtnStyle, background: activeSubMode === 'ladder' ? '#00897b' : '#1e2229', color: '#fff' }}
          >
            🪜 Editor Ladder CLIC-02
          </button>
          <button
            onClick={() => setActiveSubMode('standard')}
            style={{ ...tabBtnStyle, background: activeSubMode === 'standard' ? '#0288d1' : '#1e2229', color: '#fff' }}
          >
            🎛️ SCADA / Registradores
          </button>
        </div>
      </div>

      {activeSubMode === 'ladder' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={toolbarStyle}>
            <button
              onClick={() => setIsPlcRun(!isPlcRun)}
              style={{
                ...btnStyle,
                background: isPlcRun ? '#2e7d32' : '#c62828',
                padding: '6px 14px',
              }}
            >
              {isPlcRun ? '🟢 CLP EM MODO RUN' : '🔴 CLP EM STOP (EDIT)'}
            </button>
            <span style={{ fontSize: '11px', color: '#80cbc4' }}>
              {isPlcRun ? '⚡ Varredura cíclica ativa (10ms)' : '✏️ Modo de edição habilitado'}
            </span>
          </div>

          <div style={matrixContainerStyle}>
            {rungs.map((rung, rIdx) => {
              const rungEnergized = isPlcRun && evalRung(rung, state.motorStatus === 'RUNNING');

              return (
                <div key={rung.id} style={rungRowStyle}>
                  <div style={{ ...powerRailStyle, background: isPlcRun ? '#00e676' : '#546e7a' }} />

                  {rung.cells.map((cell, cIdx) => {
                    const isCellOn = isPlcRun && evalCell(cell, state.motorStatus === 'RUNNING');

                    return (
                      <React.Fragment key={cIdx}>
                        <div
                          onClick={() => handleCellClick(rIdx, cIdx)}
                          style={{
                            ...cellBlockStyle,
                            borderColor: isCellOn ? '#00e676' : '#374151',
                            background: isCellOn ? 'rgba(0, 230, 118, 0.1)' : '#12161b',
                            cursor: isPlcRun ? 'default' : 'pointer',
                          }}
                        >
                          {cell.type === 'NONE' && <span style={{ color: '#546e7a' }}>— Vazio —</span>}
                          {cell.type === 'WIRE' && <div style={{ width: '100%', height: '2px', background: isCellOn ? '#00e676' : '#546e7a' }} />}
                          {(cell.type === 'NO' || cell.type === 'NC') && (
                            <>
                              <span style={{ fontSize: '10px', color: '#90a4ae' }}>{cell.tag}</span>
                              <strong style={{ fontSize: '14px', color: isCellOn ? '#00e676' : '#fff' }}>
                                {cell.type === 'NO' ? '[   ]' : '[ / ]'}
                              </strong>
                            </>
                          )}
                        </div>
                        <div style={{ ...wireHStyle, background: isCellOn ? '#00e676' : '#37474f' }} />
                      </React.Fragment>
                    );
                  })}

                  <div
                    onClick={() => handleCoilClick(rIdx)}
                    style={{
                      ...coilBlockStyle,
                      borderColor: rungEnergized ? '#00e676' : '#ab47bc',
                      background: rungEnergized ? 'rgba(0, 230, 118, 0.15)' : '#12161b',
                      cursor: isPlcRun ? 'default' : 'pointer',
                    }}
                  >
                    <span style={{ fontSize: '9px', color: '#ce93d8' }}>{rung.coil.type}</span>
                    <strong style={{ fontSize: '13px', color: rungEnergized ? '#00e676' : '#fff' }}>
                      ( {rung.coil.tag} {rung.coil.value ? `${rung.coil.value}` : ''} )
                    </strong>
                  </div>

                  <div style={{ ...powerRailStyle, background: '#37474f' }} />
                </div>
              );
            })}
          </div>

          <div style={subBoxStyle}>
            <strong style={{ fontSize: '11px', color: '#90caf9', marginBottom: '6px', display: 'block' }}>
              Bornes de Entrada Física do CLIC-02 (I1 a I4):
            </strong>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {Object.keys(inputsState).map((key) => {
                const pressed = inputsState[key];
                return (
                  <button
                    key={key}
                    onClick={() => setInputsState((prev) => ({ ...prev, [key]: !prev[key] }))}
                    style={{
                      ...btnStyle,
                      background: pressed ? '#00e676' : '#263238',
                      color: pressed ? '#000' : '#fff',
                      minWidth: '80px',
                    }}
                  >
                    {key}: {pressed ? 'ON (24V)' : 'OFF (0V)'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: '10px' }}>
        <strong style={{ fontSize: '11px', color: '#81d4fa', display: 'block', marginBottom: '4px' }}>
          Barramento RS-485 Modbus RTU:
        </strong>
        <div style={terminalWindowStyle}>
          {logs.map((l) => (
            <div key={l.id} style={{ display: 'flex', gap: '6px', fontSize: '10px', fontFamily: 'monospace' }}>
              <span style={{ color: '#546e7a' }}>[{l.time}]</span>
              <span style={{ color: l.type === 'TX' ? '#00e676' : '#64b5f6', fontWeight: 'bold' }}>{l.type}:</span>
              <span style={{ color: '#fff' }}>{l.frame}</span>
              <span style={{ color: '#90a4ae' }}>— {l.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const panelContainerStyle: React.CSSProperties = {
  background: '#16191d',
  borderRadius: '12px',
  padding: '14px',
  border: '1px solid #282f3a',
  width: '100%',
  boxSizing: 'border-box',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '8px',
  borderBottom: '1px solid #232a35',
  paddingBottom: '10px',
  marginBottom: '10px',
};

const tabBtnStyle: React.CSSProperties = {
  padding: '6px 12px',
  borderRadius: '6px',
  border: '1px solid #323842',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const toolbarStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#0f1216',
  padding: '8px 12px',
  borderRadius: '8px',
  border: '1px solid #252e38',
};

const matrixContainerStyle: React.CSSProperties = {
  background: '#0a0c0e',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #1c222b',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const rungRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};

const powerRailStyle: React.CSSProperties = {
  width: '6px',
  height: '48px',
  borderRadius: '2px',
};

const wireHStyle: React.CSSProperties = {
  flex: 1,
  height: '2px',
};

const cellBlockStyle: React.CSSProperties = {
  width: '90px',
  height: '48px',
  border: '1px solid',
  borderRadius: '6px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const coilBlockStyle: React.CSSProperties = {
  width: '120px',
  height: '48px',
  border: '1px solid',
  borderRadius: '6px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const subBoxStyle: React.CSSProperties = {
  background: '#101215',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #202630',
};

const btnStyle: React.CSSProperties = {
  padding: '6px 10px',
  border: 'none',
  borderRadius: '6px',
  fontSize: '10px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const terminalWindowStyle: React.CSSProperties = {
  background: '#0a0c0e',
  border: '1px solid #1e232b',
  borderRadius: '6px',
  padding: '8px',
  maxHeight: '110px',
  overflowY: 'auto',
};