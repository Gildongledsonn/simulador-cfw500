import React, { useState } from 'react';
import { useInverter } from '../context/InverterContext';

export const L1000Workbench: React.FC = () => {
  const { state, dispatch, currentDisplayValue } = useInverter();

  const [currentFloor, setCurrentFloor] = useState<number>(1);
  const [targetFloor, setTargetFloor] = useState<number>(1);
  const [doorStatus, setDoorStatus] = useState<'FECHADA' | 'ABRINDO' | 'ABERTA' | 'FECHANDO'>('FECHADA');
  const [safetyChain, setSafetyChain] = useState<boolean>(true);
  const [inspectionMode, setInspectionMode] = useState<boolean>(false);
  const [brakeEngaged, setBrakeEngaged] = useState<boolean>(true);

  const isLoc = String(state.controlSource || '').toUpperCase() === 'LOC';
  const isRem = !isLoc;

  const freq = Math.abs(Number(state.outputFrequency ?? 0));
  const isRunning = (state.motorStatus === 'RUNNING' || freq > 0.05) && state.motorStatus !== 'FAULT';
  const currentVolt = typeof state.ai1Voltage === 'number' ? state.ai1Voltage : 0;

  // Checagem robusta de estado dos bornes
  const isDIActive = (i: number): boolean => {
    const diObj = state.digitalInputs as any;
    if (!diObj) return false;
    if (Array.isArray(diObj)) return Boolean(diObj[i - 1]);
    return Boolean(
      diObj[`di${i}`] ??
      diObj[`DI${i}`] ??
      diObj[String(i - 1)] ??
      diObj[String(i)]
    );
  };

  const isS1Active = isDIActive(1);
  const isS2Active = isDIActive(2);

  // Determinação garantida do sentido para o LCD do L1000
  const isGoingDown = isS2Active || state.isForwardDirection === false;

  const handleKeyClick = (key: string) => {
    if (!dispatch) return;

    switch (key) {
      case 'RUN':
        if (!isLoc) {
          alert('BLOQUEIO: Inversor em modo REMOTO. O acionamento é via Bornes S1/S2 ou CLP de Manobra.');
          return;
        }
        if (!safetyChain) {
          alert('BLOQUEIO: Linha de segurança aberta!');
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
      case 'LOCREM':
        setBrakeEngaged(true);
        dispatch({ type: 'PRESS_STOP' });
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
        setBrakeEngaged(true);
        dispatch({ type: 'PRESS_STOP' });
        break;

      default:
        break;
    }
  };

  const handleToggleDI = (inputIndex: number) => {
    if (!dispatch) return;

    if (isLoc) {
      alert('BLOQUEIO: O inversor está em modo LOCAL (IHM). Pressione LOC/REM no teclado para habilitar o comando por bornes.');
      return;
    }

    if (!safetyChain && (inputIndex === 1 || inputIndex === 2)) {
      alert('BLOQUEIO: Linha de segurança do elevador aberta!');
      return;
    }

    const currentlyActive = isDIActive(inputIndex);
    const nextVal = !currentlyActive;

    if (inputIndex === 1 || inputIndex === 2) {
      if (nextVal) {
        const oppositeIndex = inputIndex === 1 ? 2 : 1;
        
        // 1. Limpa o borne oposto
        dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: `di${oppositeIndex}`, value: false } } as any);
        dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: `DI${oppositeIndex}`, value: false } } as any);

        // 2. Aciona o borne selecionado
        dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: `di${inputIndex}`, value: true } } as any);
        dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: `DI${inputIndex}`, value: true } } as any);

        // 3. Força a direção correta sem dependência de estado assíncrono
        if (inputIndex === 1) {
          if (!state.isForwardDirection) {
            dispatch({ type: 'PRESS_DIRECTION' });
          }
        } else if (inputIndex === 2) {
          if (state.isForwardDirection) {
            dispatch({ type: 'PRESS_DIRECTION' });
          }
        }

        setBrakeEngaged(false);
        dispatch({ type: 'PRESS_RUN' });
      } else {
        dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: `di${inputIndex}`, value: false } } as any);
        dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: `DI${inputIndex}`, value: false } } as any);
        setBrakeEngaged(true);
        dispatch({ type: 'PRESS_STOP' });
      }
    } else {
      dispatch({ type: 'TOGGLE_DIGITAL_INPUT', payload: `di${inputIndex}` } as any);
    }
  };

  const handleCallFloor = (floor: number) => {
    if (!safetyChain || floor === currentFloor) return;

    if (isLoc) {
      alert('BLOQUEIO: Comute para modo REMOTO (botão LOC/REM) para despacho automático de pavimento.');
      return;
    }

    setTargetFloor(floor);
    setDoorStatus('FECHANDO');

    setTimeout(() => {
      setDoorStatus('FECHADA');
      setBrakeEngaged(false);

      const isGoingUp = floor > currentFloor;

      if (isGoingUp) {
        if (!state.isForwardDirection) dispatch({ type: 'PRESS_DIRECTION' });
        dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: 'di1', value: true } } as any);
        dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: 'DI1', value: true } } as any);
        dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: 'di2', value: false } } as any);
        dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: 'DI2', value: false } } as any);
      } else {
        if (state.isForwardDirection) dispatch({ type: 'PRESS_DIRECTION' });
        dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: 'di2', value: true } } as any);
        dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: 'DI2', value: true } } as any);
        dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: 'di1', value: false } } as any);
        dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: 'DI1', value: false } } as any);
      }

      dispatch({ type: 'PRESS_RUN' });

      setTimeout(() => {
        setCurrentFloor(floor);
        setBrakeEngaged(true);
        dispatch({ type: 'PRESS_STOP' });
        dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: 'di1', value: false } } as any);
        dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: 'DI1', value: false } } as any);
        dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: 'di2', value: false } } as any);
        dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: 'DI2', value: false } } as any);
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
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>🛗</span>
          <div>
            <strong style={{ fontSize: '13px', color: '#00e676' }}>
              BANCADA ESPECIAL YASKAWA L1000 • MÁQUINA GEARLESS PMSM
            </strong>
            <span style={{ fontSize: '10px', color: '#90a4ae', display: 'block' }}>
              Modo Atual: <strong style={{ color: isRem ? '#00e676' : '#ffa726' }}>{isRem ? 'REMOTO (Bornes S1-S4 / CLP)' : 'LOCAL (Teclado IHM)'}</strong>
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
        {/* CHASSIS DO L1000 */}
        <div style={yaskawaChassisStyle}>
          <div style={yaskawaTopBannerStyle}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '14px', fontWeight: 900, color: '#fff', letterSpacing: '1px' }}>YASKAWA</span>
              <span style={{ fontSize: '9px', color: '#81d4fa', fontWeight: 'bold' }}>L1000 Lift Drive</span>
            </div>
            <span style={{ fontSize: '10px', color: '#ffb74d', fontWeight: 'bold' }}>EN 81-20</span>
          </div>

          <div style={yaskawaLcdStyle}>
            <div style={lcdTopIndicatorsStyle}>
              <span style={{ color: isLoc ? '#00e676' : '#263238', fontWeight: 'bold', fontSize: '10px' }}>● LOC</span>
              <span style={{ color: isRem ? '#00e676' : '#263238', fontWeight: 'bold', fontSize: '10px' }}>● REM</span>
              <span style={{ color: isRunning ? '#00e676' : '#263238', fontWeight: 'bold', fontSize: '10px' }}>● RUN</span>
              <span style={{ color: !brakeEngaged ? '#00e676' : '#263238', fontWeight: 'bold', fontSize: '10px' }}>● BRK_RLS</span>
              <span style={{ color: isGoingDown ? '#ff9800' : '#81d4fa', fontWeight: 'bold', fontSize: '10px' }}>
                {isGoingDown ? '▼ DESCENDO' : '▲ SUBINDO'}
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

          <div style={keypadGridStyle}>
            <button onClick={() => handleKeyClick('UP')} style={btnYaskawaKeyStyle} title="▲">▲</button>
            <button onClick={() => handleKeyClick('PROG')} style={{ ...btnYaskawaKeyStyle, background: '#0288d1', color: '#fff' }}>PROG</button>
            <button onClick={() => handleKeyClick('RESET')} style={{ ...btnYaskawaKeyStyle, background: '#ff9800', color: '#000' }}>RESET</button>
            <button onClick={() => handleKeyClick('DOWN')} style={btnYaskawaKeyStyle} title="▼">▼</button>
            
            <button
              onClick={() => handleKeyClick('LOC_REM')}
              style={{
                ...btnYaskawaKeyStyle,
                background: isRem ? '#00897b' : '#37474f',
                borderColor: isRem ? '#00e676' : '#546e7a',
                color: '#fff',
                fontWeight: 'bold',
              }}
              title="Alternar Modo Local / Remoto"
            >
              LOC/REM
            </button>

            <button
              onClick={() => handleKeyClick('RUN')}
              style={{
                ...btnYaskawaKeyStyle,
                background: isLoc ? '#2e7d32' : '#1e293b',
                color: isLoc ? '#fff' : '#64748b',
                cursor: isLoc ? 'pointer' : 'not-allowed',
              }}
              title={isLoc ? 'Partida Local' : 'Desabilitado no Modo REMOTO'}
            >
              RUN
            </button>

            <button onClick={() => handleKeyClick('STOP')} style={{ ...btnYaskawaKeyStyle, gridColumn: 'span 3', background: '#c62828', color: '#fff' }}>
              STOP / PARADA DE EMERGÊNCIA
            </button>
          </div>
        </div>

        {/* CLP DE MANOBRA */}
        <div style={plcCardStyle}>
          <div style={plcHeaderStyle}>
            <strong style={{ fontSize: '12px', color: '#81d4fa' }}>📟 CLP DE MANOBRA & DESPACHO DE CHAMADAS</strong>
            <span style={{ fontSize: '10px', color: '#00e676', fontWeight: 'bold' }}>MODO: {inspectionMode ? 'INSPEÇÃO' : 'AUTOMÁTICO'}</span>
          </div>

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
                      opacity: isRem ? 1 : 0.6,
                      cursor: isRem ? 'pointer' : 'not-allowed',
                    }}
                    title={isRem ? `Despachar para ${fl}º Andar` : 'Requer Modo REMOTO'}
                  >
                    {fl}º ANDAR
                  </button>
                ))}
              </div>
            </div>

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

          {/* BORNES S1 E S2 */}
          <div style={{ marginTop: '10px' }}>
            <span style={{ fontSize: '10px', color: '#90a4ae', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>
              Bornes de Comando do L1000 (S1 a S4): {isLoc && <span style={{ color: '#ff9800' }}>(Habilite o modo REMOTO na IHM)</span>}
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '6px' }}>
              <button
                onClick={() => handleToggleDI(1)}
                style={{
                  ...switchBtnStyle,
                  borderColor: isS1Active ? '#00e676' : '#374151',
                  background: isS1Active ? '#1b5e20' : '#161b22',
                  color: isS1Active ? '#fff' : '#90a4ae',
                  opacity: isRem ? 1 : 0.6,
                }}
              >
                S1: {isS1Active ? '▲ SUBIR (ON)' : 'SUBIR (OFF)'}
              </button>

              <button
                onClick={() => handleToggleDI(2)}
                style={{
                  ...switchBtnStyle,
                  borderColor: isS2Active ? '#ff9800' : '#374151',
                  background: isS2Active ? '#e65100' : '#161b22',
                  color: isS2Active ? '#fff' : '#90a4ae',
                  opacity: isRem ? 1 : 0.6,
                }}
              >
                S2: {isS2Active ? '▼ DESCER (ON)' : 'DESCER (OFF)'}
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
};