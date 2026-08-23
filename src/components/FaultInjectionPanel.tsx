import React from 'react';
import { useInverter } from '../context/InverterContext';
import { FaultData } from '../types/cfw500';

const AVAILABLE_FAULTS: FaultData[] = [
  { code: 'F006', name: 'Sobrecorrente / Curto-Circuito', description: 'Corrente de saída ultrapassou o limite máximo dos IGBTs.', autoResetable: false },
  { code: 'F021', name: 'Subtensão no Barramento CC', description: 'Tensão do link CC caiu abaixo do limite operacional.', autoResetable: true },
  { code: 'F022', name: 'Sobretensão no Barramento CC', description: 'Regeneração excessiva de energia pelo motor.', autoResetable: false },
  { code: 'F070', name: 'Sobretemperatura no Dissipador', description: 'Temperatura dos módulos de potência excedeu o limite seguro.', autoResetable: true },
];

export const FaultInjectionPanel: React.FC = () => {
  const { state, dispatch } = useInverter();

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2a2f38', paddingBottom: '6px' }}>
        <strong style={{ fontSize: '13px', color: '#ff5252' }}>⚠️ INJEÇÃO DE FALHAS & DIAGNÓSTICO</strong>
        {state.activeFault ? (
          <span style={{ fontSize: '11px', color: '#ff5252', fontWeight: 'bold' }}>
            FALHA ATIVA: {state.activeFault.code}
          </span>
        ) : (
          <span style={{ fontSize: '11px', color: '#00e676', fontWeight: 'bold' }}>SISTEMA SAUDÁVEL (NORMAL)</span>
        )}
      </div>

      <div style={gridStyle}>
        {AVAILABLE_FAULTS.map((fault) => {
          const isActive = state.activeFault?.code === fault.code;
          return (
            <button
              key={fault.code}
              onClick={() => dispatch({ type: 'TRIGGER_FAULT', payload: fault })}
              style={{
                ...btnFaultStyle,
                background: isActive ? '#b71c1c' : '#21262d',
                borderColor: isActive ? '#ff1744' : '#30363d',
                color: isActive ? '#fff' : '#c9d1d9',
              }}
              title={fault.description}
            >
              <strong>{fault.code}</strong>
              <span style={{ fontSize: '10px' }}>{fault.name}</span>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
        <small style={{ color: '#8b949e', fontSize: '10px' }}>
          Para limpar falhas: use o botão abaixo ou pressione a tecla "O" na IHM.
        </small>
        <button
          onClick={() => dispatch({ type: 'RESET_FAULT' })}
          disabled={!state.activeFault}
          style={{
            ...btnResetStyle,
            background: state.activeFault ? '#0277bd' : '#1c2128',
            opacity: state.activeFault ? 1 : 0.4,
            cursor: state.activeFault ? 'pointer' : 'not-allowed',
          }}
        >
          🔄 Resetar Falhas
        </button>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  background: '#161b22',
  border: '1px solid #30363d',
  borderRadius: '12px',
  padding: '14px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  boxSizing: 'border-box',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '8px',
};

const btnFaultStyle: React.CSSProperties = {
  padding: '8px 10px',
  borderRadius: '6px',
  border: '1px solid',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  cursor: 'pointer',
  textAlign: 'left',
};

const btnResetStyle: React.CSSProperties = {
  padding: '6px 14px',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  fontSize: '11px',
};