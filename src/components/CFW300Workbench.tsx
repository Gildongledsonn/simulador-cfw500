import React from 'react';
import { useInverter } from '../context/InverterContext';

export const CFW300Workbench: React.FC = () => {
  const { state, dispatch, currentDisplayValue } = useInverter();

  const isLoc = state.controlSource === 'LOC' || (state as any).isLocal === true;
  const isRunning = state.motorStatus === 'RUNNING' || Math.abs(Number(state.outputFrequency ?? 0)) > 0.05;
  const currentVolt = typeof state.ai1Voltage === 'number' ? state.ai1Voltage : 0;

  const handleKeyClick = (key: string) => {
    if (!dispatch) return;

    switch (key) {
      case 'RUN':
        if (!isLoc) {
          alert('BLOQUEIO: O inversor está em modo REMOTO. O acionamento é via Bornes DI1-DI4.');
          return;
        }
        dispatch({ type: 'PRESS_RUN' });
        break;
      case 'STOP':
        dispatch({ type: 'PRESS_STOP' });
        break;
      case 'LOC_REM':
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
      default:
        break;
    }
  };

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

  const handleToggleDI = (inputIndex: number) => {
    if (!dispatch) return;

    if (isLoc) {
      alert('BLOQUEIO: O inversor está em modo LOCAL (IHM). Pressione LOC/REM no teclado para habilitar o comando por bornes.');
      return;
    }

    const diKey = `di${inputIndex}`;
    const diKeyUpper = `DI${inputIndex}`;
    const nextVal = !isDIActive(inputIndex);

    dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: diKey, value: nextVal } } as any);
    dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: diKeyUpper, value: nextVal } } as any);

    if (inputIndex === 1) {
      if (nextVal) {
        if (!state.isForwardDirection) dispatch({ type: 'PRESS_DIRECTION' });
        dispatch({ type: 'PRESS_RUN' });
      } else {
        dispatch({ type: 'PRESS_STOP' });
      }
    } else if (inputIndex === 2) {
      if (nextVal) {
        if (state.isForwardDirection) dispatch({ type: 'PRESS_DIRECTION' });
        dispatch({ type: 'PRESS_RUN' });
      } else {
        dispatch({ type: 'PRESS_STOP' });
      }
    }
  };

  const handlePotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const voltage = val * 10;
    dispatch({ type: 'SET_AI1_VOLTAGE', payload: voltage } as any);
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
    <div style={workbenchContainerStyle}>
      <div style={headerStyle}>
        <div>
          <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#00e676' }}>
            WEG CFW300 • MICRO DRIVE COMPACTO
          </span>
          <span style={{ fontSize: '10px', color: '#90a4ae', display: 'block', marginTop: '2px' }}>
            Modo: <strong style={{ color: !isLoc ? '#00e676' : '#ffa726' }}>{!isLoc ? 'REMOTO (Bornes Ativos)' : 'LOCAL (Teclado IHM)'}</strong>
          </span>
        </div>

        {isLoc && (
          <button
            onClick={() => handleKeyClick('LOC_REM')}
            style={btnSwitchToRemStyle}
            title="Mudar para Modo Remoto para liberar os botões DI1-DI4"
          >
            Mudar para REMOTO ➔
          </button>
        )}
      </div>

      <div style={mainLayoutRowStyle}>
        <div style={inverterBodyStyle}>
          <div style={inverterTopBrandStyle}>
            <strong style={{ color: '#0288d1', fontSize: '12px' }}>WEG</strong>
            <span style={{ fontSize: '10px', color: '#fff', fontWeight: 'bold' }}>CFW300</span>
          </div>

          <div style={displayBoxStyle}>
            <div style={ledStatusRowStyle}>
              <span style={{ color: isLoc ? '#00e676' : '#374151', fontSize: '9px', fontWeight: 'bold' }}>● LOC</span>
              <span style={{ color: !isLoc ? '#00e676' : '#374151', fontSize: '9px', fontWeight: 'bold' }}>● REM</span>
              <span style={{ color: isRunning ? '#00e676' : '#374151', fontSize: '9px', fontWeight: 'bold' }}>● RUN</span>
              <span style={{ color: state.activeFault ? '#ff1744' : '#374151', fontSize: '9px', fontWeight: 'bold' }}>● FLT</span>
            </div>
            <div style={sevenSegmentTextStyle}>
              {state.activeFault ? getFaultCode() : currentDisplayValue}
            </div>
          </div>

          <div style={keypadGridStyle}>
            <button onClick={() => handleKeyClick('UP')} style={btnKeyStyle} title="▲">▲</button>
            <button onClick={() => handleKeyClick('PROG')} style={{ ...btnKeyStyle, background: '#0288d1', color: '#fff' }} title="PROG">PROG</button>
            <button onClick={() => handleKeyClick('DOWN')} style={btnKeyStyle} title="▼">▼</button>
            <button onClick={() => handleKeyClick('RUN')} style={{ ...btnKeyStyle, background: isLoc ? '#2e7d32' : '#1e293b', color: isLoc ? '#fff' : '#64748b' }} title="RUN (I)">I</button>
            <button onClick={() => handleKeyClick('LOC_REM')} style={btnKeyStyle} title="LOC/REM">LOC/REM</button>
            <button onClick={() => handleKeyClick('STOP')} style={{ ...btnKeyStyle, background: '#c62828', color: '#fff' }} title="STOP (O)">O</button>
          </div>
        </div>

        <div style={ioPanelStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <strong style={{ fontSize: '11px', color: '#81d4fa' }}>
              Bornes de Comando (CFW300-IOAR):
            </strong>
            {isLoc && (
              <span style={{ fontSize: '9px', color: '#ff9800', fontWeight: 'bold' }}>
                ⚠️ Pressione LOC/REM para acionar via Bornes
              </span>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {[1, 2, 3, 4].map((i) => {
              const active = isDIActive(i);
              return (
                <button
                  key={i}
                  onClick={() => handleToggleDI(i)}
                  style={{
                    ...switchBtnStyle,
                    borderColor: active ? '#00e676' : '#374151',
                    background: active ? '#1b5e20' : '#161b22',
                    color: active ? '#fff' : '#90a4ae',
                    opacity: !isLoc ? 1 : 0.6,
                  }}
                >
                  DI{i}: {active ? 'ON (24V)' : 'OFF (0V)'}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#b0bec5', marginBottom: '4px' }}>
              <span>Entrada Analógica AI1 (0-10V):</span>
              <strong style={{ color: '#00e676' }}>{currentVolt.toFixed(1)} V</strong>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={currentVolt / 10}
              onChange={handlePotChange}
              style={{ width: '100%', accentColor: '#0288d1', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const workbenchContainerStyle: React.CSSProperties = {
  background: '#0d1117',
  border: '1px solid #30363d',
  borderRadius: '12px',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  boxSizing: 'border-box',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #21262d',
  paddingBottom: '6px',
};

const btnSwitchToRemStyle: React.CSSProperties = {
  background: '#e65100',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  padding: '4px 8px',
  fontSize: '10px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const mainLayoutRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
};

const inverterBodyStyle: React.CSSProperties = {
  background: '#161b22',
  border: '2px solid #21262d',
  borderRadius: '10px',
  padding: '10px',
  width: '190px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
};

const inverterTopBrandStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '6px',
};

const displayBoxStyle: React.CSSProperties = {
  background: '#05070a',
  border: '2px solid #1f242c',
  borderRadius: '6px',
  padding: '6px',
  textAlign: 'center',
  marginBottom: '8px',
};

const ledStatusRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  marginBottom: '4px',
};

const sevenSegmentTextStyle: React.CSSProperties = {
  fontFamily: '"Courier New", Courier, monospace',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#ff3d00',
  letterSpacing: '2px',
  textShadow: '0 0 8px rgba(255, 61, 0, 0.6)',
};

const keypadGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '6px',
};

const btnKeyStyle: React.CSSProperties = {
  background: '#21262d',
  border: '1px solid #30363d',
  borderRadius: '4px',
  color: '#e0e0e0',
  padding: '8px 2px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const ioPanelStyle: React.CSSProperties = {
  flex: 1,
  minWidth: '220px',
  background: '#161b22',
  border: '1px solid #21262d',
  borderRadius: '10px',
  padding: '10px',
};

const switchBtnStyle: React.CSSProperties = {
  border: '1px solid',
  borderRadius: '6px',
  padding: '6px',
  fontSize: '10px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};