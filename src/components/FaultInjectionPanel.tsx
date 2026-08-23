import React from 'react';
import { useInverter } from '../context/InverterContext';
import { FaultData } from '../types/cfw500';

const FAULTS: FaultData[] = [
  { code: 'F006', description: 'Sobrecorrente na Saída', active: true },
  { code: 'F021', description: 'Subtensão Link CC', active: true },
  { code: 'F022', description: 'Sobretensão Link CC', active: true },
  { code: 'F070', description: 'Sobretemperatura IGBTs', active: true },
];

export const FaultInjectionPanel: React.FC = () => {
  const { state, dispatch } = useInverter();

  return (
    <div style={{ background: '#1a1d21', border: '1px solid #323842', borderRadius: '12px', padding: '14px', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: '1px solid #2a2f38', paddingBottom: '6px', marginBottom: '10px' }}>
        <strong>INJEÇÃO DE DEFEITOS & PROTEÇÕES</strong>
        <span style={{ fontSize: '11px', color: state.activeFault ? '#ef5350' : '#81c784' }}>
          {state.activeFault ? `FALHA ATIVA: ${state.activeFault.code}` : 'SISTEMA NORMAL'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
        {FAULTS.map((f) => (
          <button
            key={f.code}
            onClick={() => dispatch({ type: 'TRIGGER_FAULT', payload: f })}
            style={{
              background: '#2b1b1f',
              border: '1px solid #8e0000',
              borderRadius: '6px',
              padding: '8px',
              color: '#fff',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <strong style={{ color: '#ef5350' }}>{f.code}</strong> - {f.description}
          </button>
        ))}
      </div>
    </div>
  );
};