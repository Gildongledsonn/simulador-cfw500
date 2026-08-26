import React from 'react';
import { useInverter } from '../context/InverterContext';

export const CFW300Workbench: React.FC = () => {
  const { state, dispatch } = useInverter();

  const faultCode = state.activeFault ? (typeof state.activeFault === 'object' ? state.activeFault.code : String(state.activeFault)) : 'F070';

  const handleKeyClick = (key: string) => {
    dispatch({ type: 'KEY_PRESS', payload: key } as any);
  };

  const handleToggleDI = (inputIndex: number) => {
    const key = `di${inputIndex}` as keyof typeof state.digitalInputs;
    const currentVal = Boolean(state.digitalInputs[key]);
    dispatch({
      type: 'SET_DIGITAL_INPUT',
      payload: { input: `DI${inputIndex}`, value: !currentVal },
    } as any);
  };

  const handlePotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    dispatch({ type: 'SET_ANALOG_INPUT', payload: { input: 'AI1', value: val } } as any);
  };

  return (
    <div style={workbenchContainerStyle}>
      {/* CABEÇALHO DA BANCADA CFW300 */}
      <div style={headerStyle}>
        <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#00e676' }}>
          WEG CFW300 • MICRO DRIVE COMPACTO
        </span>
        <span style={{ fontSize: '10px', color: '#90a4ae' }}>Plug-in I/O • Bornes Rápidos</span>
      </div>

      <div style={mainLayoutRowStyle}>
        {/* CARCAÇA DO INVERSOR CFW300 */}
        <div style={inverterBodyStyle}>
          <div style={inverterTopBrandStyle}>
            <strong style={{ color: '#0288d1', fontSize: '12px' }}>WEG</strong>
            <span style={{ fontSize: '10px', color: '#fff', fontWeight: 'bold' }}>CFW300</span>
          </div>

          {/* DISPLAY LED 4 DÍGITOS */}
          <div style={displayBoxStyle}>
            <div style={ledStatusRowStyle}>
              <span style={{ color: state.controlSource === 'LOC' ? '#00e676' : '#374151', fontSize: '9px', fontWeight: 'bold' }}>● LOC</span>
              <span style={{ color: state.controlSource === 'REM' ? '#00e676' : '#374151', fontSize: '9px', fontWeight: 'bold' }}>● REM</span>
              <span style={{ color: state.motorStatus === 'RUNNING' ? '#00e676' : '#374151', fontSize: '9px', fontWeight: 'bold' }}>● RUN</span>
              <span style={{ color: state.motorStatus === 'FAULT' ? '#ff1744' : '#374151', fontSize: '9px', fontWeight: 'bold' }}>● FLT</span>
            </div>
            <div style={sevenSegmentTextStyle}>
              {state.motorStatus === 'FAULT'
                ? faultCode
                : (state.outputFrequency ?? 0).toFixed(1)}
            </div>
          </div>

          {/* TECLADO COMPACTO CFW300 */}
          <div style={keypadGridStyle}>
            <button onClick={() => handleKeyClick('UP')} style={btnKeyStyle}>▲</button>
            <button onClick={() => handleKeyClick('PROG')} style={{ ...btnKeyStyle, background: '#0288d1', color: '#fff' }}>PROG</button>
            <button onClick={() => handleKeyClick('DOWN')} style={btnKeyStyle}>▼</button>
            <button onClick={() => handleKeyClick('RUN')} style={{ ...btnKeyStyle, background: '#2e7d32', color: '#fff' }}>I (RUN)</button>
            <button onClick={() => handleKeyClick('LOC_REM')} style={btnKeyStyle}>LOC/REM</button>
            <button onClick={() => handleKeyClick('STOP')} style={{ ...btnKeyStyle, background: '#c62828', color: '#fff' }}>O (STOP)</button>
          </div>
        </div>

        {/* PAINEL DE BORNES & POTENCIÔMETRO (PLUG-IN CFW300) */}
        <div style={ioPanelStyle}>
          <strong style={{ fontSize: '11px', color: '#81d4fa', marginBottom: '8px', display: 'block' }}>
            Bornes de Comando (CFW300-IOAR):
          </strong>

          {/* CHAVES DIGITAIS DI1 A DI4 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {[1, 2, 3, 4].map((i) => {
              const active = Boolean(state.digitalInputs?.[`di${i}` as keyof typeof state.digitalInputs]);
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

          {/* POTENCIÔMETRO ANALÓGICO (0-10V) */}
          <div style={{ marginTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#b0bec5', marginBottom: '4px' }}>
              <span>Entrada Analógica AI1 (0-10V):</span>
              <strong style={{ color: '#00e676' }}>{((state.ai1Voltage ?? 0) * 10).toFixed(1)} V</strong>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={state.ai1Voltage ?? 0}
              onChange={handlePotChange}
              style={{ width: '100%', accentColor: '#0288d1' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ESTILOS DA BANCADA CFW300
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
  fontFamily: 'monospace',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#ff3d00',
  letterSpacing: '2px',
  textShadow: '0 0 8px rgba(255, 61, 0, 0.6)',
};

const keypadGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '4px',
};

const btnKeyStyle: React.CSSProperties = {
  background: '#21262d',
  border: '1px solid #30363d',
  borderRadius: '4px',
  color: '#e0e0e0',
  padding: '6px 2px',
  fontSize: '9px',
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