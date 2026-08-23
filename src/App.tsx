import React, { useState } from 'react';
import { InverterProvider } from './context/InverterContext';
import { usePhysicsLoop } from './hooks/usePhysicsLoop';
import { useKeyboardControls } from './hooks/useKeyboardControls'; // <-- 1. Importar o hook
import { IHM } from './components/IHM';
import { MotorVisualizer } from './components/MotorVisualizer';
import { TerminalBlock } from './components/TerminalBlock';
import { RelayPanel } from './components/RelayPanel';
import { FaultInjectionPanel } from './components/FaultInjectionPanel';
import { AudioControls } from './components/AudioControls';
import { TutorialGuide } from './components/TutorialGuide';

const SimulatorWorkbench: React.FC = () => {
  const [loadTorque, setLoadTorque] = useState(20);

  // Executa o cálculo contínuo de aceleração
  usePhysicsLoop({ loadTorquePercent: loadTorque, enableNoise: true });

  // 2. Habilita o teclado físico do PC
  useKeyboardControls();

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <AudioControls />
      <TutorialGuide />

      {/* DICA DE ATALHOS DE TECLADO */}
      <div style={shortcutsBannerStyle}>
        <span>⌨️ <strong>Atalhos do Teclado:</strong></span>
        <span><kbd style={kbdStyle}>P</kbd> ou <kbd style={kbdStyle}>Enter</kbd> = PROG</span>
        <span><kbd style={kbdStyle}>▲</kbd> / <kbd style={kbdStyle}>▼</kbd> = Navegar</span>
        <span><kbd style={kbdStyle}>I</kbd> = Ligar (Run)</span>
        <span><kbd style={kbdStyle}>O</kbd> ou <kbd style={kbdStyle}>Espaço</kbd> = Parar/Reset</span>
        <span><kbd style={kbdStyle}>L</kbd> = LOC/REM</span>
      </div>

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

// ESTILOS
const shortcutsBannerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  alignItems: 'center',
  background: '#141619',
  padding: '8px 14px',
  borderRadius: '8px',
  border: '1px solid #282e38',
  fontSize: '11px',
  color: '#90a4ae',
};

const kbdStyle: React.CSSProperties = {
  background: '#252a33',
  border: '1px solid #3e4756',
  borderRadius: '3px',
  padding: '2px 5px',
  color: '#eceff1',
  fontWeight: 'bold',
  fontFamily: 'monospace',
};

export default function App() {
  return (
    <InverterProvider>
      <SimulatorWorkbench />
    </InverterProvider>
  );
}