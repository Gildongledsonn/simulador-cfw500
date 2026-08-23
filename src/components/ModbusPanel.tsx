import React, { useState, useEffect } from 'react';
import { useInverter } from '../context/InverterContext';

interface ModbusLog {
  id: number;
  time: string;
  type: 'TX' | 'RX';
  frame: string;
  description: string;
}

type ModbusMode = 'standard' | 'ladder' | 'cpp';

// TIPOS DO EDITOR LADDER ESTILO CLIC-02
type ContactType = 'NONE' | 'WIRE' | 'NO' | 'NC';
type CoilType = 'NONE' | 'OUT' | 'SET' | 'RST' | 'MB_SPEED';

interface LadderCell {
  type: ContactType;
  tag: string; // Ex: I1, I2, M1, Q1
}

interface LadderRung {
  id: string;
  cells: [LadderCell, LadderCell, LadderCell]; // 3 colunas de contatos
  coil: {
    type: CoilType;
    tag: string; // Ex: Q1 (RUN Inversor), Q2 (Sentido), M1, MB_SPEED
    speedValue?: number; // Valor em Hz caso seja MB_SPEED
  };
}

export const ModbusPanel: React.FC = () => {
  const { state, dispatch } = useInverter();

  const [activeSubMode, setActiveSubMode] = useState<ModbusMode>('ladder');
  const [slaveAddress, setSlaveAddress] = useState(1);
  const [modbusSpeedHz, setModbusSpeedHz] = useState(45.0);

  // ESTADO DO PLC CLIC-02
  const [isPlcRun, setIsPlcRun] = useState(true);
  const [inputsState, setInputsState] = useState<{ [key: string]: boolean }>({
    I1: false, // Start
    I2: true,  // Stop (NF)
    I3: false, // Sentido
    I4: false,
  });
  const [flagsState, setFlagsState] = useState<{ [key: string]: boolean }>({
    M1: false,
    M2: false,
  });

  // PROGRAMA LADDER PADRÃO EDITÁVEL
  const [rungs, setRungs] = useState<LadderRung[]>([
    {
      id: 'rung_1',
      cells: [
        { type: 'NO', tag: 'I1' },
        { type: 'NC', tag: 'I2' },
        { type: 'WIRE', tag: '' },
      ],
      coil: { type: 'OUT', tag: 'Q1' }, // Q1 = Partida CFW500
    },
    {
      id: 'rung_2',
      cells: [
        { type: 'NO', tag: 'I3' },
        { type: 'WIRE', tag: '' },
        { type: 'WIRE', tag: '' },
      ],
      coil: { type: 'MB_SPEED', tag: 'P0681', speedValue: 50.0 }, // Escreve 50Hz
    },
  ]);

  // C++ CODE STATES
  const [cppConsole, setCppConsole] = useState<string[]>([]);
  const [isCppRunning, setIsCppRunning] = useState(false);
  const [cppCustomSpeed, setCppCustomSpeed] = useState(35);

  const [logs, setLogs] = useState<ModbusLog[]>([
    {
      id: 1,
      time: new Date().toLocaleTimeString(),
      type: 'RX',
      frame: '01 03 00 00 00 04 44 09',
      description: 'CLIC-02 Modbus Master Polling (Registradores 40001 a 40004)',
    },
  ]);

  const addLog = (type: 'TX' | 'RX', frame: string, description: string) => {
    setLogs((prev) => [
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        type,
        frame,
        description,
      },
      ...prev.slice(0, 19),
    ]);
  };

  // EVALUADOR DO FLUXO LADDER EM TEMPO REAL (PLC SCAN ENGINE)
  const evalCellPower = (cell: LadderCell): boolean => {
    if (cell.type === 'NONE') return false;
    if (cell.type === 'WIRE') return true;

    const isInput = cell.tag.startsWith('I');
    const isFlag = cell.tag.startsWith('M');
    const val = isInput ? !!inputsState[cell.tag] : isFlag ? !!flagsState[cell.tag] : false;

    if (cell.type === 'NO') return val;
    if (cell.type === 'NC') return !val;
    return false;
  };

  const evalRungConductivity = (rung: LadderRung): boolean => {
    let power = true;
    for (const cell of rung.cells) {
      if (cell.type === 'NONE') return false;
      if (!evalCellPower(cell)) {
        power = false;
        break;
      }
    }
    return power;
  };

  // CICLO DE VARREDURA DO PLC (SCAN CYCLE 100ms)
  useEffect(() => {
    if (!isPlcRun || activeSubMode !== 'ladder') return;

    let shouldRunMotor = false;

    rungs.forEach((rung) => {
      const isEnergized = evalRungConductivity(rung);

      if (rung.coil.type === 'OUT') {
        if (rung.coil.tag === 'Q1') {
          shouldRunMotor = isEnergized;
        } else if (rung.coil.tag.startsWith('M')) {
          setFlagsState((prev) => ({ ...prev, [rung.coil.tag]: isEnergized }));
        }
      } else if (rung.coil.type === 'SET' && isEnergized) {
        if (rung.coil.tag === 'Q1') shouldRunMotor = true;
      } else if (rung.coil.type === 'RST' && isEnergized) {
        if (rung.coil.tag === 'Q1') shouldRunMotor = false;
      } else if (rung.coil.type === 'MB_SPEED' && isEnergized) {
        const targetHz = rung.coil.speedValue || 50;
        const raw = Math.round((targetHz / 60) * 8192);
        const hex = raw.toString(16).toUpperCase().padStart(4, '0');
        if (Math.abs(state.parameters.P0121.currentValue - targetHz) > 0.5) {
          addLog('TX', `01 06 00 01 ${hex.slice(0, 2)} ${hex.slice(2)}`, `[CLIC-02 LADDER] MB_WRITE_SPEED: P0681 = ${targetHz} Hz`);
          dispatch({ type: 'SELECT_PARAM_DIRECT', payload: 'P0121' });
          dispatch({ type: 'SET_ANALOG_INPUT_1', payload: (targetHz / 60) * 10 });
        }
      }
    });

    if (shouldRunMotor && state.motorStatus !== 'RUNNING') {
      addLog('TX', '01 06 00 00 00 01 48 0A', '[CLIC-02] Coil Q1 energizada -> MB_WRITE(40001, 1) RUN');
      dispatch({ type: 'PRESS_RUN' });
    } else if (!shouldRunMotor && state.motorStatus === 'RUNNING') {
      addLog('TX', '01 06 00 00 00 00 89 CA', '[CLIC-02] Coil Q1 desenergizada -> MB_WRITE(40001, 0) STOP');
      dispatch({ type: 'PRESS_STOP' });
    }
  }, [isPlcRun, inputsState, flagsState, rungs, activeSubMode, state.motorStatus, state.parameters.P0121.currentValue, dispatch]);

  // FUNÇÕES DE EDIÇÃO LADDER
  const handleCellClick = (rungIndex: number, cellIndex: number) => {
    if (isPlcRun) return; // Trava edição em RUN como no Edit-CLIC

    const nextRungs = [...rungs];
    const currentCell = nextRungs[rungIndex].cells[cellIndex];

    const cycleTypes: ContactType[] = ['NO', 'NC', 'WIRE', 'NONE'];
    const nextTypeIdx = (cycleTypes.indexOf(currentCell.type) + 1) % cycleTypes.length;
    const nextType = cycleTypes[nextTypeIdx];

    nextRungs[rungIndex].cells[cellIndex] = {
      type: nextType,
      tag: nextType === 'WIRE' || nextType === 'NONE' ? '' : currentCell.tag || 'I1',
    };
    setRungs(nextRungs);
  };

  const handleChangeTag = (rungIndex: number, cellIndex: number, newTag: string) => {
    const nextRungs = [...rungs];
    nextRungs[rungIndex].cells[cellIndex].tag = newTag;
    setRungs(nextRungs);
  };

  const handleCoilClick = (rungIndex: number) => {
    if (isPlcRun) return;
    const nextRungs = [...rungs];
    const currentCoil = nextRungs[rungIndex].coil;

    const coilTypes: CoilType[] = ['OUT', 'SET', 'RST', 'MB_SPEED'];
    const nextIdx = (coilTypes.indexOf(currentCoil.type) + 1) % coilTypes.length;
    const nextType = coilTypes[nextIdx];

    nextRungs[rungIndex].coil = {
      type: nextType,
      tag: nextType === 'MB_SPEED' ? 'P0681' : 'Q1',
      speedValue: currentCoil.speedValue || 50,
    };
    setRungs(nextRungs);
  };

  const handleAddRung = () => {
    if (rungs.length >= 8) return;
    setRungs([
      ...rungs,
      {
        id: `rung_${Date.now()}`,
        cells: [
          { type: 'NO', tag: 'I1' },
          { type: 'WIRE', tag: '' },
          { type: 'WIRE', tag: '' },
        ],
        coil: { type: 'OUT', tag: 'Q1' },
      },
    ]);
  };

  const handleDeleteRung = (index: number) => {
    if (rungs.length <= 1) return;
    setRungs(rungs.filter((_, i) => i !== index));
  };

  // C++ ROUTINE
  const handleRunCppRoutine = () => {
    setIsCppRunning(true);
    setCppConsole([
      `[INIT] Serial2.begin(19200, SERIAL_8N1);`,
      `[MODBUS] node.begin(1, Serial2);`,
      `[TX] node.writeSingleRegister(0x0001, ${Math.round((cppCustomSpeed / 60) * 8192)}); // Speed ${cppCustomSpeed}Hz`,
    ]);

    const rawSpeed = Math.round((cppCustomSpeed / 60) * 8192);
    const hexSpeed = rawSpeed.toString(16).toUpperCase().padStart(4, '0');
    addLog('TX', `01 06 00 01 ${hexSpeed.slice(0, 2)} ${hexSpeed.slice(2)}`, `C++ ModbusMaster::writeSingleRegister(0x0001, ${rawSpeed})`);
    dispatch({ type: 'SELECT_PARAM_DIRECT', payload: 'P0121' });
    dispatch({ type: 'SET_ANALOG_INPUT_1', payload: (cppCustomSpeed / 60) * 10 });

    setTimeout(() => {
      setCppConsole((prev) => [
        ...prev,
        `[TX] node.writeSingleRegister(0x0000, 0x0001); // CMD: START`,
      ]);
      addLog('TX', '01 06 00 00 00 01 48 0A', 'C++ CMD START INVERTER');
      dispatch({ type: 'PRESS_RUN' });

      setTimeout(() => {
        setCppConsole((prev) => [
          ...prev,
          `[RX] uint8_t res = node.readHoldingRegisters(0x0003, 3);`,
          `[DATA] Freq: ${cppCustomSpeed.toFixed(1)}Hz | I: ${state.outputCurrent.toFixed(1)}A | RPM: ${state.motorRPM}`,
        ]);
        setIsCppRunning(false);
      }, 500);
    }, 400);
  };

  return (
    <div style={panelContainerStyle}>
      {/* CABEÇALHO */}
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>📡</span>
          <div>
            <strong style={{ color: '#fff', fontSize: '14px' }}>AUTOMAÇÃO & MODBUS RTU RS-485 (WEG CLIC-02 / C++)</strong>
            <div style={{ fontSize: '10px', color: '#90a4ae' }}>Simulador SoftPLC IEC 61131-3 & Arduino Embedded</div>
          </div>
        </div>

        {/* SELETOR DE MODOS */}
        <div style={modeTabsStyle}>
          <button
            onClick={() => setActiveSubMode('ladder')}
            style={{
              ...subTabBtnStyle,
              background: activeSubMode === 'ladder' ? '#00897b' : '#1e2229',
              color: activeSubMode === 'ladder' ? '#fff' : '#90a4ae',
            }}
          >
            🪜 Editor Ladder CLIC-02
          </button>
          <button
            onClick={() => setActiveSubMode('standard')}
            style={{
              ...subTabBtnStyle,
              background: activeSubMode === 'standard' ? '#0288d1' : '#1e2229',
              color: activeSubMode === 'standard' ? '#fff' : '#90a4ae',
            }}
          >
            🎛️ Painel SCADA
          </button>
          <button
            onClick={() => setActiveSubMode('cpp')}
            style={{
              ...subTabBtnStyle,
              background: activeSubMode === 'cpp' ? '#7b1fa2' : '#1e2229',
              color: activeSubMode === 'cpp' ? '#fff' : '#90a4ae',
            }}
          >
            💻 Código C++ (Arduino/ESP)
          </button>
        </div>
      </div>

      {/* 1. MODO EDITOR LADDER DINÂMICO (ESTILO CLIC-02) */}
      {activeSubMode === 'ladder' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* BARRA DE FERRAMENTAS DO CLIC-02 */}
          <div style={toolbarStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setIsPlcRun(!isPlcRun)}
                style={{
                  ...btnStyle,
                  background: isPlcRun ? '#2e7d32' : '#c62828',
                  padding: '6px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{isPlcRun ? '🟢 MODO: RUN' : '🔴 MODO: STOP / EDIT'}</span>
              </button>
              <span style={{ fontSize: '11px', color: '#80cbc4' }}>
                {isPlcRun ? '⚡ Programa em execução contínua' : '✏️ Clique nos contatos ou bobinas para editar'}
              </span>
            </div>

            <button
              onClick={handleAddRung}
              disabled={isPlcRun || rungs.length >= 8}
              style={{
                ...btnStyle,
                background: isPlcRun ? '#37474f' : '#00796b',
                padding: '6px 12px',
                opacity: isPlcRun ? 0.6 : 1,
                cursor: isPlcRun ? 'not-allowed' : 'pointer',
              }}
            >
              ➕ Adicionar Rung (Linha)
            </button>
          </div>

          {/* MATRIZ DE RUNGS LADDER */}
          <div style={matrixContainerStyle}>
            {rungs.map((rung, rIdx) => {
              const rungEnergized = isPlcRun && evalRungConductivity(rung);

              return (
                <div key={rung.id} style={rungRowStyle}>
                  {/* BARRAMENTO POSITIVO */}
                  <div style={{ ...powerRailStyle, background: isPlcRun ? '#00e676' : '#546e7a' }} />

                  {/* CÉLULAS DE CONTATOS (3 COLUNAS) */}
                  {rung.cells.map((cell, cIdx) => {
                    const isCellActive = isPlcRun && evalCellPower(cell);

                    return (
                      <React.Fragment key={cIdx}>
                        <div
                          onClick={() => handleCellClick(rIdx, cIdx)}
                          style={{
                            ...cellBlockStyle,
                            borderColor: isCellActive ? '#00e676' : isPlcRun ? '#37474f' : '#0288d1',
                            background: isCellActive ? 'rgba(0, 230, 118, 0.08)' : '#12161b',
                            cursor: isPlcRun ? 'default' : 'pointer',
                          }}
                          title={isPlcRun ? '' : 'Clique para alternar: NA -> NF -> FIO -> VAZIO'}
                        >
                          {cell.type === 'NONE' && <span style={{ color: '#455a64' }}>— Vazio —</span>}
                          {cell.type === 'WIRE' && (
                            <div style={{ width: '100%', height: '2px', background: isCellActive ? '#00e676' : '#546e7a' }} />
                          )}
                          {(cell.type === 'NO' || cell.type === 'NC') && (
                            <>
                              {!isPlcRun ? (
                                <select
                                  value={cell.tag}
                                  onChange={(e) => handleChangeTag(rIdx, cIdx, e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                  style={tagSelectStyle}
                                >
                                  <option value="I1">I1 (Start)</option>
                                  <option value="I2">I2 (Stop NF)</option>
                                  <option value="I3">I3 (Sentido)</option>
                                  <option value="I4">I4</option>
                                  <option value="M1">M1 (Flag)</option>
                                  <option value="M2">M2 (Flag)</option>
                                </select>
                              ) : (
                                <span style={{ fontSize: '10px', color: '#90a4ae' }}>{cell.tag}</span>
                              )}
                              <strong style={{ fontSize: '14px', color: isCellActive ? '#00e676' : '#fff' }}>
                                {cell.type === 'NO' ? '[   ]' : '[ / ]'}
                              </strong>
                              <small style={{ fontSize: '9px', color: isCellActive ? '#00e676' : '#78909c' }}>
                                {cell.type === 'NO' ? 'NA' : 'NF'}
                              </small>
                            </>
                          )}
                        </div>

                        {/* FIO INTERMEDIÁRIO */}
                        <div style={{ ...wireHStyle, background: isCellActive ? '#00e676' : '#37474f' }} />
                      </React.Fragment>
                    );
                  })}

                  {/* BOBINA / BLOCO DE SAÍDA */}
                  <div
                    onClick={() => handleCoilClick(rIdx)}
                    style={{
                      ...coilBlockStyle,
                      borderColor: rungEnergized ? '#00e676' : isPlcRun ? '#37474f' : '#ab47bc',
                      background: rungEnergized ? 'rgba(0, 230, 118, 0.12)' : '#12161b',
                      cursor: isPlcRun ? 'default' : 'pointer',
                    }}
                    title={isPlcRun ? '' : 'Clique para alternar tipo de bobina (OUT, SET, RST, MB_SPEED)'}
                  >
                    {rung.coil.type === 'MB_SPEED' ? (
                      <div style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '9px', color: '#ce93d8', fontWeight: 'bold' }}>MB_SPEED (P0681)</span>
                        {!isPlcRun ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                            <input
                              type="number"
                              min="0"
                              max="60"
                              value={rung.coil.speedValue || 50}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => {
                                const nextRungs = [...rungs];
                                nextRungs[rIdx].coil.speedValue = Number(e.target.value);
                                setRungs(nextRungs);
                              }}
                              style={{ width: '45px', background: '#1c2128', color: '#fff', border: '1px solid #444', textAlign: 'center', fontSize: '10px' }}
                            />
                            <span style={{ fontSize: '9px', color: '#aaa' }}>Hz</span>
                          </div>
                        ) : (
                          <div style={{ fontSize: '11px', color: rungEnergized ? '#00e676' : '#fff', fontWeight: 'bold' }}>
                            {rung.coil.speedValue} Hz
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <span style={{ fontSize: '10px', color: '#90a4ae' }}>
                          {rung.coil.type} {rung.coil.tag}
                        </span>
                        <strong style={{ fontSize: '14px', color: rungEnergized ? '#00e676' : '#fff' }}>
                          ( {rung.coil.tag === 'Q1' ? 'CFW_RUN' : rung.coil.tag} )
                        </strong>
                        <small style={{ fontSize: '9px', color: rungEnergized ? '#00e676' : '#78909c' }}>
                          {rungEnergized ? 'ON' : 'OFF'}
                        </small>
                      </>
                    )}
                  </div>

                  {/* BARRAMENTO NEGATIVO */}
                  <div style={{ ...powerRailStyle, background: '#37474f' }} />

                  {/* BOTÃO EXCLUIR RUNG */}
                  {!isPlcRun && (
                    <button
                      onClick={() => handleDeleteRung(rIdx)}
                      style={{ background: '#c62828', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer', padding: '4px 8px', fontSize: '10px' }}
                    >
                      ✖
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* PAINEL DE ENTRADAS DIGITAIS FÍSICAS (CLIC-02 FRONT PANEL) */}
          <div style={subBoxStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', color: '#90caf9', fontWeight: 'bold' }}>
                Bancada de Chaves do CLP (Entradas I1 a I4):
              </span>
              <span style={{ fontSize: '10px', color: '#90a4ae' }}>Acione as chaves para simular botões e sensores</span>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {Object.keys(inputsState).map((key) => {
                const isPressed = inputsState[key];
                return (
                  <button
                    key={key}
                    onClick={() => setInputsState((prev) => ({ ...prev, [key]: !prev[key] }))}
                    style={{
                      ...btnStyle,
                      background: isPressed ? '#00e676' : '#263238',
                      color: isPressed ? '#0f2410' : '#eceff1',
                      border: isPressed ? '1px solid #69f0ae' : '1px solid #455a64',
                      minWidth: '100px',
                      padding: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px',
                    }}
                  >
                    <strong>{key} {key === 'I1' ? '(Start)' : key === 'I2' ? '(Stop NF)' : ''}</strong>
                    <span style={{ fontSize: '10px' }}>{isPressed ? 'FECHADO (1)' : 'ABERTO (0)'}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. MODO PAINEL SCADA */}
      {activeSubMode === 'standard' && (
        <div style={gridColumnsStyle}>
          <div style={subBoxStyle}>
            <h4 style={sectionTitleStyle}>Comandos Manuais Modbus (Holding Registers)</h4>
            <div style={controlRowStyle}>
              <label style={labelStyle}>Slave Address (P0313):</label>
              <input
                type="number"
                min="1"
                max="247"
                value={slaveAddress}
                onChange={(e) => setSlaveAddress(Number(e.target.value))}
                style={inputNumberStyle}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <button
                style={{ ...btnStyle, background: '#2e7d32' }}
                onClick={() => {
                  addLog('TX', '01 06 00 00 00 01 48 0A', 'Write 40001 = 0x0001 (RUN)');
                  dispatch({ type: 'PRESS_RUN' });
                }}
              >
                ▶ LIGAR (RUN)
              </button>
              <button
                style={{ ...btnStyle, background: '#c62828' }}
                onClick={() => {
                  addLog('TX', '01 06 00 00 00 00 89 CA', 'Write 40001 = 0x0000 (STOP)');
                  dispatch({ type: 'PRESS_STOP' });
                }}
              >
                ⏹ PARAR (STOP)
              </button>
              <button
                style={{ ...btnStyle, background: '#0277bd' }}
                onClick={() => {
                  addLog('TX', '01 06 00 00 00 04 88 09', 'Write 40001 = 0x0004 (Inverte Sentido)');
                  dispatch({ type: 'PRESS_DIRECTION' });
                }}
              >
                ↻/↺ SENTIDO
              </button>
            </div>

            <div style={{ marginTop: '14px' }}>
              <label style={{ ...labelStyle, display: 'flex', justifyContent: 'space-between' }}>
                <span>Frequência P0681 (0 - 8192):</span>
                <strong style={{ color: '#64b5f6' }}>{modbusSpeedHz.toFixed(1)} Hz</strong>
              </label>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="0.5"
                  value={modbusSpeedHz}
                  onChange={(e) => setModbusSpeedHz(Number(e.target.value))}
                  style={{ flex: 1 }}
                />
                <button
                  style={{ ...btnStyle, background: '#37474f', padding: '6px 12px' }}
                  onClick={() => {
                    const raw = Math.round((modbusSpeedHz / 60) * 8192);
                    const hex = raw.toString(16).toUpperCase().padStart(4, '0');
                    addLog('TX', `01 06 00 01 ${hex.slice(0, 2)} ${hex.slice(2)}`, `Write P0681 = ${modbusSpeedHz}Hz`);
                    dispatch({ type: 'SELECT_PARAM_DIRECT', payload: 'P0121' });
                    dispatch({ type: 'SET_ANALOG_INPUT_1', payload: (modbusSpeedHz / 60) * 10 });
                  }}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>

          <div style={subBoxStyle}>
            <h4 style={sectionTitleStyle}>Mapeamento de Registradores WEG CFW500</h4>
            <table style={tableStyle}>
              <thead>
                <tr style={{ color: '#90a4ae', borderBottom: '1px solid #2a2f38', textAlign: 'left', fontSize: '10px' }}>
                  <th style={{ padding: '4px' }}>REG</th>
                  <th style={{ padding: '4px' }}>PARÂMETRO</th>
                  <th style={{ padding: '4px' }}>HEX BRUTO</th>
                  <th style={{ padding: '4px' }}>ENGENHARIA</th>
                </tr>
              </thead>
              <tbody>
                <tr style={tableRowStyle}>
                  <td style={tdStyle}>40001</td>
                  <td style={tdStyle}>P0680 (Controle)</td>
                  <td style={tdHexStyle}>0x{state.motorStatus === 'RUNNING' ? '0001' : '0000'}</td>
                  <td style={tdStyle}>{state.motorStatus}</td>
                </tr>
                <tr style={tableRowStyle}>
                  <td style={tdStyle}>40002</td>
                  <td style={tdStyle}>P0681 (Velocidade)</td>
                  <td style={tdHexStyle}>0x{Math.round((state.outputFrequency / 60) * 8192).toString(16).toUpperCase()}</td>
                  <td style={tdStyle}>{state.outputFrequency.toFixed(1)} Hz</td>
                </tr>
                <tr style={tableRowStyle}>
                  <td style={tdStyle}>40004</td>
                  <td style={tdStyle}>P0002 (Freq. Saída)</td>
                  <td style={tdHexStyle}>0x{Math.round(state.outputFrequency * 10).toString(16).toUpperCase()}</td>
                  <td style={{ ...tdStyle, color: '#00e676', fontWeight: 'bold' }}>{state.outputFrequency.toFixed(1)} Hz</td>
                </tr>
                <tr style={tableRowStyle}>
                  <td style={tdStyle}>40005</td>
                  <td style={tdStyle}>P0003 (Corrente)</td>
                  <td style={tdHexStyle}>0x{Math.round(state.outputCurrent * 10).toString(16).toUpperCase()}</td>
                  <td style={{ ...tdStyle, color: '#ffb300' }}>{state.outputCurrent.toFixed(1)} A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. MODO C++ / ARDUINO EMBEDDED */}
      {activeSubMode === 'cpp' && (
        <div style={gridColumnsStyle}>
          <div style={subBoxStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <h4 style={{ ...sectionTitleStyle, color: '#ba68c8' }}>📄 firmware_modbus_cfw500.cpp</h4>
              <span style={{ fontSize: '10px', color: '#ce93d8' }}>C++17 • ModbusMaster.h</span>
            </div>
            <pre style={codeBlockStyle}>
{`#include <Arduino.h>
#include <ModbusMaster.h>

#define CFW500_SLAVE_ID 1
#define REG_CONTROL      0x0000 // P0680 (40001)
#define REG_SPEED_REF    0x0001 // P0681 (40002)
#define REG_OUT_FREQ     0x0003 // P0002 (40004)

ModbusMaster node;

void setup() {
  Serial2.begin(19200, SERIAL_8N1);
  node.begin(CFW500_SLAVE_ID, Serial2);
}

void loop() {
  // 1. Escreve frequencia de ${cppCustomSpeed}Hz
  node.writeSingleRegister(REG_SPEED_REF, ${Math.round((cppCustomSpeed / 60) * 8192)});
  
  // 2. Envia comando de partida (RUN)
  node.writeSingleRegister(REG_CONTROL, 0x0001);
  
  // 3. Telemetria: Leitura da Frequencia
  uint8_t res = node.readHoldingRegisters(REG_OUT_FREQ, 1);
  if (res == node.ku8MBSuccess) {
    float freqHz = node.getResponseBuffer(0) / 10.0;
  }
  delay(100);
}`}
            </pre>

            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', alignItems: 'center' }}>
              <label style={{ fontSize: '11px', color: '#cfd8dc' }}>Freq: {cppCustomSpeed}Hz</label>
              <input
                type="range"
                min="5"
                max="60"
                value={cppCustomSpeed}
                onChange={(e) => setCppCustomSpeed(Number(e.target.value))}
                style={{ flex: 1 }}
              />
              <button
                style={{ ...btnStyle, background: isCppRunning ? '#6a1b9a' : '#8e24aa' }}
                onClick={handleRunCppRoutine}
                disabled={isCppRunning}
              >
                {isCppRunning ? '⏳ Compilando...' : '▶ Compilar & Executar'}
              </button>
            </div>
          </div>

          <div style={subBoxStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <h4 style={{ ...sectionTitleStyle, color: '#ba68c8' }}>🖥️ Monitor Serial (Output RS-485)</h4>
              <span style={{ fontSize: '10px', color: '#90a4ae' }}>19200 baud</span>
            </div>
            <div style={cppConsoleWindowStyle}>
              {cppConsole.length === 0 ? (
                <span style={{ color: '#546e7a' }}>// Pressione "Compilar & Executar" para carregar a rotina C++...</span>
              ) : (
                cppConsole.map((line, idx) => (
                  <div key={idx} style={{ marginBottom: '4px' }}>
                    <span style={{ color: line.startsWith('[TX]') ? '#ba68c8' : line.startsWith('[RX]') ? '#00e676' : '#90caf9' }}>
                      {line}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* SNIFFER MODBUS GERAL */}
      <div style={{ marginTop: '12px' }}>
        <h4 style={{ ...sectionTitleStyle, marginBottom: '6px' }}>Sniffer de Rede RS-485 (Transmissão de Pacotes RTU):</h4>
        <div style={terminalWindowStyle}>
          {logs.map((log) => (
            <div key={log.id} style={{ display: 'flex', gap: '8px', fontSize: '11px', fontFamily: 'monospace', marginBottom: '3px' }}>
              <span style={{ color: '#546e7a' }}>[{log.time}]</span>
              <span style={{ color: log.type === 'TX' ? '#00e676' : '#64b5f6', fontWeight: 'bold' }}>{log.type}:</span>
              <span style={{ color: '#eceff1', letterSpacing: '1px' }}>{log.frame}</span>
              <span style={{ color: '#90a4ae' }}>— {log.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ESTILOS VISUAIS
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
  marginBottom: '12px',
};

const modeTabsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '6px',
  flexWrap: 'wrap',
};

const subTabBtnStyle: React.CSSProperties = {
  padding: '6px 12px',
  borderRadius: '6px',
  border: '1px solid #323842',
  fontSize: '11px',
  fontWeight: 700,
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
  flexWrap: 'wrap',
  gap: '8px',
};

const matrixContainerStyle: React.CSSProperties = {
  background: '#0a0c0e',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #1c222b',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  overflowX: 'auto',
};

const rungRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  minWidth: '580px',
};

const powerRailStyle: React.CSSProperties = {
  width: '6px',
  height: '52px',
  borderRadius: '2px',
  flexShrink: 0,
};

const wireHStyle: React.CSSProperties = {
  flex: 1,
  height: '2px',
  minWidth: '12px',
};

const cellBlockStyle: React.CSSProperties = {
  width: '100px',
  height: '52px',
  border: '1px solid #37474f',
  borderRadius: '6px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  flexShrink: 0,
};

const coilBlockStyle: React.CSSProperties = {
  width: '120px',
  height: '52px',
  border: '1px solid #37474f',
  borderRadius: '6px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  flexShrink: 0,
};

const tagSelectStyle: React.CSSProperties = {
  background: '#1a1f26',
  color: '#80cbc4',
  border: '1px solid #37474f',
  borderRadius: '3px',
  fontSize: '9px',
  padding: '1px 2px',
};

const gridColumnsStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '12px',
};

const subBoxStyle: React.CSSProperties = {
  background: '#101215',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #202630',
  display: 'flex',
  flexDirection: 'column',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#90caf9',
  marginBottom: '10px',
  fontWeight: 700,
};

const controlRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px',
};

const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  color: '#b0bec5',
};

const inputNumberStyle: React.CSSProperties = {
  background: '#1e2229',
  border: '1px solid #3e4756',
  color: '#fff',
  borderRadius: '4px',
  padding: '4px 8px',
  width: '60px',
  textAlign: 'center',
};

const btnStyle: React.CSSProperties = {
  padding: '8px 10px',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  fontSize: '11px',
  cursor: 'pointer',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '11px',
};

const tableRowStyle: React.CSSProperties = {
  borderBottom: '1px solid #1a1e24',
};

const tdStyle: React.CSSProperties = {
  padding: '5px 4px',
  color: '#cfd8dc',
};

const tdHexStyle: React.CSSProperties = {
  padding: '5px 4px',
  color: '#ffb74d',
  fontFamily: 'monospace',
};

const codeBlockStyle: React.CSSProperties = {
  background: '#0a0c0e',
  border: '1px solid #23272e',
  borderRadius: '6px',
  padding: '10px',
  fontFamily: 'monospace',
  fontSize: '11px',
  color: '#e0e0e0',
  maxHeight: '220px',
  overflowY: 'auto',
};

const cppConsoleWindowStyle: React.CSSProperties = {
  background: '#0a0c0e',
  border: '1px solid #23272e',
  borderRadius: '6px',
  padding: '10px',
  fontFamily: 'monospace',
  fontSize: '11px',
  minHeight: '220px',
  maxHeight: '220px',
  overflowY: 'auto',
};

const terminalWindowStyle: React.CSSProperties = {
  background: '#0a0c0e',
  border: '1px solid #1e232b',
  borderRadius: '6px',
  padding: '8px 10px',
  maxHeight: '130px',
  overflowY: 'auto',
};