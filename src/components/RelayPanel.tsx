import React from 'react';
import { useInverter } from '../context/InverterContext';
import { evaluateRelayState } from '../utils/relayEvaluator';

export const RelayPanel: React.FC = () => {
  const { state } = useInverter();
  const isRL1 = evaluateRelayState(state.parameters.P0275.currentValue, state);
  const isRL2 = evaluateRelayState(state.parameters.P0277.currentValue, state);

  return (
    <div style={{ background: '#1a1d21', border: '1px solid #323842', borderRadius: '12px', padding: '14px', flex: 1, minWidth: '280px' }}>
      <div style={{ fontSize: '13px', fontWeight: 'bold', borderBottom: '1px solid #2a2f38', paddingBottom: '6px', marginBottom: '10px' }}>
        SAÍDAS A RELÉ (RL1 / RL2)
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div style={{ background: '#141619', padding: '10px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: isRL1 ? '#00e676' : '#1b5e20', boxShadow: isRL1 ? '0 0 12px #00e676' : 'none' }} />
          <div>
            <strong style={{ fontSize: '12px' }}>RL1 (RUN)</strong>
            <div style={{ fontSize: '10px', color: '#888' }}>{isRL1 ? 'FECHADO' : 'ABERTO'}</div>
          </div>
        </div>

        <div style={{ background: '#141619', padding: '10px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: isRL2 ? '#ff1744' : '#b71c1c', boxShadow: isRL2 ? '0 0 12px #ff1744' : 'none' }} />
          <div>
            <strong style={{ fontSize: '12px' }}>RL2 (FALHA)</strong>
            <div style={{ fontSize: '10px', color: '#888' }}>{isRL2 ? 'FECHADO' : 'ABERTO'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};