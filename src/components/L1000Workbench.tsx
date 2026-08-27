import React, { useState } from 'react';
import { useInverter } from '../context/InverterContext';

export const L1000Workbench: React.FC = () => {
  const { state, dispatch, currentDisplayValue } = useInverter();

  // Estados locais do CLP de Manobra do Elevador
  const [currentFloor, setCurrentFloor] = useState<number>(1);
  const [targetFloor, setTargetFloor] = useState<number>(1);
  const [doorStatus, setDoorStatus] = useState<'FECHADA' | 'ABRINDO' | 'ABERTA' | 'FECHANDO'>('FECHADA');
  const [safetyChain, setSafetyChain] = useState<boolean>(true);
  const [inspectionMode, setInspectionMode] = useState<boolean>(false);
  const [brakeEngaged, setBrakeEngaged] = useState<boolean>(true);

  const freq = Math.abs(Number(state.outputFrequency ?? 0));
  const isRunning = (state.motorStatus === 'RUNNING' || freq > 0.1) && state.motorStatus !== 'FAULT';
  const isLoc = state.controlSource === 'LOC' || (state as any).isLocal === true;
  const currentVolt = typeof state.ai1Voltage === 'number' ? state.ai1Voltage : 0;

  // Teclado da IHM Digital Yaskawa L1000
  const handleKeyClick = (key: string) => {
    if (!dispatch) return;
    switch (key) {
      case 'RUN':
        if (!safetyChain) {
          alert('BLOQUEIO: Linha de segurança do elevador aberta! Feche a linha para partir.');
          return;
        }
        setBrakeEngaged(false);
        dispatch({ type: 'PRESS_RUN' });
        break;
      case 'STOP':
        setBrakeEngaged(true);
        dispatch({ type: 'PRESS_STOP' });
        break;
      case 'LOC_REM':
        dispatch({ type: 'PRESS_LOCREM' });
        break;
      case 'UP':
        dispatch({ type: 'PRESS_UP' });
        break;
      case 'DOWN':
        dispatch({ type: 'PRESS_DOWN' });
        break;
      case 'PROG':
        dispatch({ type: 'PRESS_PROG' });
        break;
      case 'RESET':
        dispatch({ type: 'PRESS_STOP' });
        break;
      default:
        break;
    }
  };

  // Acionamento de Entradas Digitais do CLP de Manobra (S1 a S4)
  const handleToggleDI = (inputIndex: number) => {
    if (!dispatch) return;
    dispatch({ type: 'TOGGLE_DI', payload: inputIndex } as any);
  };

  // Chamada de Pavimento no CLP
  const handleCallFloor = (floor: number) => {
    if (!safetyChain) return;
    setTargetFloor(floor);
    setDoorStatus('FECHANDO');

    setTimeout(() => {
      setDoorStatus('FECHADA');
      setBrakeEngaged(false);

      if (floor > currentFloor) {
        dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: 'DI1', value: true } } as any);
        dispatch({ type: 'PRESS_RUN' });
      } else if (floor < currentFloor) {
        dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: 'DI2', value: true } } as any);
        if (state.isForwardDirection) {
          dispatch({ type: 'PRESS_DIRECTION' });
        }
        dispatch({ type: 'PRESS_RUN' });
      }

      setTimeout(() => {
        setCurrentFloor(floor);
        setBrakeEngaged(true);
        dispatch({ type: 'PRESS_STOP' });
        setDoorStatus('ABRINDO');
        setTimeout(() => setDoorStatus('ABERTA'), 1000);
      }, 3500);
    }, 1000);
  };

  const getFaultCode = (): string => {
    if (!state.activeFault) return 'F070';
    if (typeof state.activeFault === 'string') return state.activeFault;
    if (typeof state.activeFault === 'object') {
      return (state.activeFault as any).code || (state.activeFault as any).id || 'F070';
    }
    return 'F070';
  };

  return (
    <div style={containerStyle}>
      {/* CABEÇALHO DA BANCADA INDUSTRIAL DE ELEVADORES */}
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>🛗</span>
          <div>
            <strong style={{ fontSize: '13px', color: '#00e676' }}>
              BANCADA ESPECIAL YASKAWA L1000 • MÁQUINA GEARLESS PMSM
            </strong>
            <span style={{ fontSize: '10px', color: '#90a4ae', display: 'block' }}>
              Controle Vetorial de Elevadores • Encoder PG Absoluto • CLP de Manobra
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ ...badgeStatusStyle, background: safetyChain ? '#1b5e20' : '#b71c1c' }}>
            {safetyChain ? '🛡️ LINHA SEGURANÇA: OK' : '⚠️ SEGURANÇA ABERTA'}
          </span>
          <span style={{ ...badgeStatusStyle, background: brakeEngaged ? '#d32f2f' : '#0288d1' }}>
            {brakeEngaged ? '🛑 FREIO MECÂNICO TRAVADO' : '🟢 FREIO LIBERADO'}
          </span>
        </div>
      </div>

      <div style={mainGridStyle}>
        {/* COLUNA 1: GABINETE REALISTA YASKAWA L1000 */}
        <div style={yaskawaChassisStyle}>
          <div style={yaskawaTopBannerStyle}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '14px', fontWeight: 900, color: '#fff', letterSpacing: '1px' }}>YASKAWA</span>
              <span style={{ fontSize: '9px', color: '#81d4fa', fontWeight: 'bold' }}>L1000 Lift Drive</span>
            </div>
            <span style={{ fontSize: '10px', color: '#ffb74d', fontWeight: 'bold' }}>EN 81-20 Compliant</span>
          </div>

          {/* DISPLAY LCD */}
          <div style={yaskawaLcdStyle}>
            <div style={lcdTopIndicatorsStyle}>
              <span style={{ color: isLoc ? '#00e676' : '#546e7a', fontWeight: 'bold', fontSize: '9px' }}>[LOC]</span>
              <span style={{ color: !isLoc ? '#00e676' : '#546e7a', fontWeight: 'bold', fontSize: '9px' }}>[REM]</span>
              <span style={{ color: isRunning ? '#00e676' : '#546e7a', fontWeight: 'bold', fontSize: '9px' }}>[RUN]</span>
              <span style={{ color: !brakeEngaged ? '#00e676' : '#546e7a', fontWeight: 'bold', fontSize: '9px' }}>[BRK_RLS]</span>
              <span style={{ color: state.isForwardDirection ? '#81d4fa' : '#ffb74d', fontWeight: 'bold', fontSize: '9px' }}>
                {state.isForwardDirection ? '▲ SUBIDA' : '▼ DESCIDA'}
              </span>
            </div>

            <div style={lcdDigitalReadoutStyle}>
              <span style={{ fontSize: '32px', fontFamily: '"Courier New", monospace', fontWeight: 900, color: '#00e676' }}>
                {state.activeFault ? getFaultCode() : currentDisplayValue}
              </span>
              <span style={{ fontSize: '12px', color: '#81d4fa', fontWeight: 'bold', marginLeft: '4px' }}>
                {state.ihmMode === 'PARAM_EDIT' ? 'VAL' : 'Hz'}
              </span>
            </div>

            <div style={lcdBottomInfoStyle}>
              <span>ASR: MALHA FECHADA</span>
              <span>ENC: PG-X3 (2048 PPR)</span>
            </div>
          </div>

          {/* TECLADO INTEGRADO YASKAWA */}
          <div style={keypadGridStyle}>
            <button onClick={() => handleKeyClick('UP')} style={btnYaskawaKeyStyle} title="Incrementar (▲)">▲</button>
            <button onClick={() => handleKeyClick('PROG')} style={{ ...btnYaskawaKeyStyle, background: '#0288d1', color: '#fff' }} title="Menu / Programação">PROG</button>
            <button onClick={() => handleKeyClick('RESET')} style={{ ...btnYaskawaKeyStyle, background: '#ff9800', color: '#000' }} title="Reset de Falhas">RESET</button>

            <button onClick={() => handleKeyClick('DOWN')} style={btnYaskawaKeyStyle} title="Decrementar (▼)">▼</button>
            <button onClick={() => handleKeyClick('LOC_REM')} style={btnYaskawaKeyStyle} title="Comutar Local/Remoto">LOC/REM</button>
            <button onClick={() => handleKeyClick('RUN')} style={{ ...btnYaskawaKeyStyle, background: '#2e7d32', color: '#fff' }} title="Partida (RUN)">RUN</button>

            <button onClick={() => handleKeyClick('STOP')} style={{ ...btnYaskawaKeyStyle, gridColumn: 'span 3', background: '#c62828', color: '#fff' }} title="Parada Segura (STOP)">
              STOP / PARADA DE EMERGÊNCIA
            </button>
          </div>
        </div>

        {/* COLUNA 2: CLP DE MANOBRA & PAVIMENTOS */}
        <div style={plcCardStyle}>
          <div style={plcHeaderStyle}>
            <strong style={{ fontSize: '12px', color: '#81d4fa' }}>📟 CLP DE MANOBRA & DESPACHO DE CHAMADAS</strong>
            <span style={{ fontSize: '10px', color: '#00e676', fontWeight: 'bold' }}>MODO: {inspectionMode ? 'INSPEÇÃO' : 'AUTOMÁTICO'}</span>
          </div>

          {/* PAVIMENTOS */}
          <div style={elevatorShaftRowStyle}>
            <div style={floorsButtonGroupStyle}>
              <span style={{ fontSize: '10px', color: '#90a4ae', fontWeight: 'bold' }}>Chamar Andar:</span>
              <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                {[1, 2, 3, 4].map((fl) => (
                  <button
                    key={fl}
                    onClick={() => handleCallFloor(fl)}
                    style={{
                      ...btnFloorStyle,
                      background: currentFloor === fl ? '#00e676' : targetFloor === fl ? '#ffb74d' : '#1f2937',
                      color: currentFloor === fl ? '#000' : '#fff',
                      borderColor: currentFloor === fl ? '#00e676' : '#374151',
                    }}
                  >
                    {fl}º ANDAR
                  </button>
                ))}
              </div>
            </div>

            {/* STATUS DA CABINE */}
            <div style={cabineStatusBoxStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span>Pavimento Atual:</span>
                <strong style={{ color: '#00e676' }}>{currentFloor}º ANDAR</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span>Porta da Cabine:</span>
                <strong style={{ color: doorStatus === 'ABERTA' ? '#ffb74d' : '#81d4fa' }}>{doorStatus}</strong>
              </div>
            </div>
          </div>

          {/* CHAVES DE COMANDO MANUAL / BORNES */}
          <div style={{ marginTop: '10px' }}>
            <span style={{ fontSize: '10px', color: '#90a4ae', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>
              Bornes de Comando do L1000 (S1 a S4):
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '6px' }}>
              <button
                onClick={() => handleToggleDI(1)}
                style={{
                  ...switchBtnStyle,
                  borderColor: state.digitalInputs?.di1 ? '#00e676' : '#374151',
                  background: state.digitalInputs?.di1 ? '#1b5e20' : '#161b22',
                  color: state.digitalInputs?.di1 ? '#fff' : '#90a4ae',
                }}
              >
                S1: {state.digitalInputs?.di1 ? '▲ SUBIR (ON)' : 'SUBIR (OFF)'}
              </button>

              <button
                onClick={() => handleToggleDI(2)}
                style={{
                  ...switchBtnStyle,
                  borderColor: state.digitalInputs?.di2 ? '#00e676' : '#374151',
                  background: state.digitalInputs?.di2 ? '#1b5e20' : '#161b22',
                  color: state.digitalInputs?.di2 ? '#fff' : '#90a4ae',
                }}
              >
                S2: {state.digitalInputs?.di2 ? '▼ DESCER (ON)' : 'DESCER (OFF)'}
              </button>

              <button
                onClick={() => setSafetyChain(!safetyChain)}
                style={{
                  ...switchBtnStyle,
                  borderColor: safetyChain ? '#00e676' : '#d32f2f',
                  background: safetyChain ? '#161b22' : '#b71c1c',
                  color: '#fff',
                }}
              >
                {safetyChain ? '🔒 LINHA SEG. (OK)' : '⚠️ SEGURANÇA ABERTA'}
              </button>

              <button
                onClick={() => setInspectionMode(!inspectionMode)}
                style={{
                  ...switchBtnStyle,
                  borderColor: inspectionMode ? '#ff9800' : '#374151',
                  background: inspectionMode ? '#e65100' : '#161b22',
                  color: '#fff',
                }}
              >
                {inspectionMode ? '👷 MODO INSPEÇÃO' : '🏢 MODO AUTOMÁTICO'}
              </button>
            </div>
          </div>

          {/* SENSOR ANALÓGICO DA CÉLULA DE CARGA */}
          <div style={{ marginTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#b0bec5', marginBottom: '4px' }}>
              <span>Célula de Carga / Pesador (Entrada A2 Pré-Torque):</span>
              <strong style={{ color: '#00e676' }}>{(currentVolt * 10).toFixed(0)}% de Lotação</strong>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={currentVolt / 10}
              onChange={(e) => dispatch({ type: 'SET_AI1_VOLTAGE', payload: parseFloat(e.target.value) * 10 } as any)}
              style={{ width: '100%', accentColor: '#00e676', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  background: '#0d1117',
  border: '1px solid #30363d',
  borderRadius: '12px',
  padding: '14px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
  boxSizing: 'border-box',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #21262d',
  paddingBottom: '8px',
  flexWrap: 'wrap',
  gap: '8px',
};

const badgeStatusStyle: React.CSSProperties = {
  padding: '3px 8px',
  borderRadius: '4px',
  fontSize: '9px',
  fontWeight: 'bold',
  color: '#fff',
};

const mainGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '14px',
};

const yaskawaChassisStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg, #1c232d 0%, #11151a 100%)',
  border: '2px solid #0288d1',
  borderRadius: '10px',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
};

const yaskawaTopBannerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #263238',
  paddingBottom: '6px',
};

const yaskawaLcdStyle: React.CSSProperties = {
  background: '#041508',
  border: '2px solid #1b5e20',
  borderRadius: '6px',
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const lcdTopIndicatorsStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px dashed #1b5e20',
  paddingBottom: '2px',
};

const lcdDigitalReadoutStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'baseline',
  margin: '6px 0',
};

const lcdBottomInfoStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '8px',
  color: '#81d4fa',
  fontWeight: 'bold',
};

const keypadGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '6px',
};

const btnYaskawaKeyStyle: React.CSSProperties = {
  background: '#263238',
  border: '1px solid #37474f',
  borderRadius: '4px',
  color: '#eceff1',
  padding: '8px 2px',
  fontSize: '10px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
};

const plcCardStyle: React.CSSProperties = {
  background: '#161b22',
  border: '1px solid #30363d',
  borderRadius: '10px',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const plcHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #21262d',
  paddingBottom: '6px',
};

const elevatorShaftRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#0d1117',
  border: '1px solid #21262d',
  borderRadius: '8px',
  padding: '8px 10px',
  flexWrap: 'wrap',
  gap: '8px',
};

const floorsButtonGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const btnFloorStyle: React.CSSProperties = {
  padding: '6px 10px',
  borderRadius: '4px',
  border: '1px solid',
  fontSize: '10px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const cabineStatusBoxStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
  minWidth: '150px',
};

const switchBtnStyle: React.CSSProperties = {
  border: '1px solid',
  borderRadius: '6px',
  padding: '6px 8px',
  fontSize: '9px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
};