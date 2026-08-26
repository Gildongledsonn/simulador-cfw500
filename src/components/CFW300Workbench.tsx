import React from 'react';
import { useInverter } from '../context/InverterContext';

export const CFW300Workbench: React.FC = () => {
  const { state, dispatch, currentDisplayValue } = useInverter();

  // Tratamento idêntico ao IHM.tsx para acionamento das teclas
  const handleKeyClick = (key: string) => {
    if (!dispatch) return;

    switch (key) {
      case 'RUN':
        dispatch({ type: 'PRESS_RUN' });
        break;
      case 'STOP':
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
      case 'DIRECTION':
        dispatch({ type: 'PRESS_DIRECTION' });
        break;
      default:
        break;
    }
  };

  // Alterna as entradas digitais DI1 a DI4
  const handleToggleDI = (inputIndex: number) => {
    if (!dispatch) return;
    dispatch({ type: 'TOGGLE_DI', payload: inputIndex } as any);
  };

  // Potenciômetro Analógico AI1 (0 a 10V)
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

  const freq = Math.abs(Number(state.outputFrequency ?? 0));
  const isRunning = state.motorStatus === 'RUNNING' || freq > 0.1;
  const isLoc = state.controlSource === 'LOC' || (state as any).isLocal === true;
  const currentVolt = typeof state.ai1Voltage === 'number' ? state.ai1Voltage : 0;

  return (
    <div style={workbenchContainerStyle}>
      {/* CABEÇALHO */}
      <div style={headerStyle}>
        <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#00e676' }}>
          WEG CFW300 • MICRO DRIVE COMPACTO
        </span>
        <span style={{ fontSize: '10px', color: '#90a4ae' }}>Plug-in I/O • Bornes Rápidos</span>
      </div>

      <div style={mainLayoutRowStyle}>
        {/* GABINETE DO MICRO INVERSOR CFW300 */}
        <div style={inverterBodyStyle}>
          <div style={inverterTopBrandStyle}>
            <strong style={{ color: '#0288d1', fontSize: '12px' }}>WEG</strong>
            <span style={{ fontSize: '10px', color: '#fff', fontWeight: 'bold' }}>CFW300</span>
          </div>

          {/* DISPLAY LED VERMELHO */}
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

          {/* TECLADO DE MEMBRANA DO CFW300 */}
          <div style={keypadGridStyle}>
            <button
              onClick={() => handleKeyClick('UP')}
              style={btnKeyStyle}
              title="Incrementar (▲)"
            >
              ▲
            </button>

            <button
              onClick={() => handleKeyClick('PROG')}
              style={{ ...btnKeyStyle, background: '#0288d1', color: '#fff' }}
              title="Menu / Programação (PROG)"
            >
              PROG
            </button>

            <button
              onClick={() => handleKeyClick('DOWN')}
              style={btnKeyStyle}
              title="Decrementar (▼)"
            >
              ▼
            </button>

            <button
              onClick={() => handleKeyClick('RUN')}
              style={{ ...btnKeyStyle, background: '#2e7d32', color: '#fff' }}
              title="Ligar Motor (I)"
            >
              I
            </button>

            <button
              onClick={() => handleKeyClick('LOC_REM')}
              style={btnKeyStyle}
              title="Alternar Local / Remoto"
            >
              LOC/REM
            </button>

            <button
              onClick={() => handleKeyClick('STOP')}
              style={{ ...btnKeyStyle, background: '#c62828', color: '#fff' }}
              title="Parar / Reset Motor (O)"
            >
              O
            </button>
          </div>
        </div>

        {/* PAINEL DE BORNES PLUG-IN CFW300 */}
        <div style={ioPanelStyle}>
          <strong style={{ fontSize: '11px', color: '#81d4fa', marginBottom: '8px', display: 'block' }}>
            Bornes de Comando (CFW300-IOAR):
          </strong>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {[1, 2, 3, 4].map((i) => {
              const active = Boolean(
                state.digitalInputs?.[`di${i}` as keyof typeof state.digitalInputs]
              );
              return (
                <button
                  key={i}
                  onClick={() => handleToggleDI(i)}
                  style={{
                    ...switchBtnStyle,
                    borderColor: active ? '#00e676' : '#374151',
                    background: active ? '#1b5e20' : '#161b22',
                    color: active ? '#fff' : '#90a4ae',
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