import React, { useState } from 'react';
import { InverterProvider } from './context/InverterContext';
import { usePhysicsLoop } from './hooks/usePhysicsLoop';
import { IHM } from './components/IHM';
import { MotorVisualizer } from './components/MotorVisualizer';
import { TerminalBlock } from './components/TerminalBlock';
import { RelayPanel } from './components/RelayPanel';
import { FaultInjectionPanel } from './components/FaultInjectionPanel';
import { AudioControls } from './components/AudioControls';

const SimulatorWorkbench: React.FC = () => {
  const [loadTorque, setLoadTorque] = useState(20);

  // Executa o cálculo de aceleração e física em tempo real
  usePhysicsLoop({ loadTorquePercent: loadTorque, enableNoise: true });

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <AudioControls />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        <IHM />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <MotorVisualizer loadTorquePercent={loadTorque} />
          <div style={{ background: '#1a1d21', border: '1px solid #323842', borderRadius: '12px', padding: '12px' }}>
            <label style={{ fontSize: '11px', color: '#90a4ae', display: 'flex', justifyContent: 'space-between' }}>
              <span>Carga Mecânica no Eixo (Freio)</span>
              <strong>{loadTorque}%</strong>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={loadTorque}
              onChange={(e) => setLoadTorque(Number(e.target.value))}
              style={{ width: '100%', marginTop: '6px', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        <TerminalBlock />
        <RelayPanel />
      </div>

      <FaultInjectionPanel />
    </div>
  );
};

export default function App() {
  return (
    <InverterProvider>
      <SimulatorWorkbench />
    </InverterProvider>
  );
}