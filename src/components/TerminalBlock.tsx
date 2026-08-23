import React, { useState } from 'react';
import { useInverter } from '../context/InverterContext';

export const TerminalBlock: React.FC = () => {
  const { state, dispatch } = useInverter();
  const [analogVolts, setAnalogVolts] = useState<number>(0);

  const handleToggleDI = (diKey: 'di1' | 'di2' | 'di3' | 'di4') => {
    const nextVal = !state.digitalInputs[diKey];
    dispatch({ type: 'SET_DIGITAL_INPUT', payload: { input: diKey, value: nextVal } });
  };

  const isRemote = state.controlSource === 'REM';

  return (
    <div style={cardStyle}>
      <div style={cardHeaderStyle}>
        <strong>RÉGUA DE BORNES I/O</strong>
        <span style={{ fontSize: '11px', color: isRemote ? '#00e676' : '#ffa726' }}>
          {isRemote ? 'REMOTO ATIVO' : 'LOCAL ATIVO'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '4px', background: '#121417', padding: '6px', borderRadius: '6px', marginBottom: '10px' }}>
        {['+10V', 'AI1', 'GND', '+24V', 'DI1', 'DI2', 'DI3', 'DI4'].map((name, i) => (
          <div key={name} style={{ textAlign: 'center', background: '#252a33', padding: '4px 0', borderRadius: '4px', fontSize: '10px' }}>
            <span style={{ color: '#64b5f6', fontWeight: 'bold' }}>{i + 1}</span><br />{name}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '10px' }}>
        {(['di1', 'di2', 'di3', 'di4'] as const).map((di) => (
          <button
            key={di}
            onClick={() => handleToggleDI(di)}
            style={{
              padding: '6px 4px',
              borderRadius: '4px',
              border: 'none',
              fontSize: '11px',
              fontWeight: 'bold',
              color: '#fff',
              background: state.digitalInputs[di] ? '#2e7d32' : '#374151',
              cursor: 'pointer',
            }}
          >
            {di.toUpperCase()}: {state.digitalInputs[di] ? 'ON' : 'OFF'}
          </button>
        ))}
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
          <span>Entrada Analógica AI1 (0 a 10V):</span>
          <strong style={{ color: '#64b5f6' }}>{analogVolts.toFixed(2)} V</strong>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={analogVolts}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            setAnalogVolts(v);
            dispatch({ type: 'SET_ANALOG_INPUT_1', payload: v });
          }}
          style={{ width: '100%', cursor: 'pointer', accentColor: '#0288d1' }}
        />
      </div>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  background: '#1a1d21',
  border: '1px solid #323842',
  borderRadius: '12px',
  padding: '14px',
  flex: 1,
  minWidth: '280px',
};

const cardHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '13px',
  borderBottom: '1px solid #2a2f38',
  paddingBottom: '6px',
  marginBottom: '10px',
};