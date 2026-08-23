import React, { useState } from 'react';
import { InverterProvider } from './context/InverterContext';
import { usePhysicsLoop } from './hooks/usePhysicsLoop';
import { useKeyboardControls } from './hooks/useKeyboardControls';
import { IHM } from './components/IHM';
import { MotorVisualizer } from './components/MotorVisualizer';
import { TerminalBlock } from './components/TerminalBlock';
import { RelayPanel } from './components/RelayPanel';
import { FaultInjectionPanel } from './components/FaultInjectionPanel';
import { AudioControls } from './components/AudioControls';
import { TutorialGuide } from './components/TutorialGuide';

const SimulatorWorkbench: React.FC = () => {
  const [loadTorque, setLoadTorque] = useState(20);

  // Executa o cálculo contínuo de aceleração e física
  usePhysicsLoop({ loadTorquePercent: loadTorque, enableNoise: true });

  // Habilita atalhos físicos do PC
  useKeyboardControls();

  return (
    <div style={mainContainerStyle}>
      {/* BARRA DE ÁUDIO E VOLUME */}
      <AudioControls />

      {/* MODO TUTORIAL / AULA */}
      <TutorialGuide />

      {/* BANNER DE ATALHOS (visível confortavelmente em tablets e desktops) */}
      <div style={shortcutsBannerStyle}>
        <span>⌨️ <strong>Atalhos de Teclado (PC):</strong></span>
        <span><kbd style={kbdStyle}>P</kbd> / <kbd style={kbdStyle}>Enter</kbd> = PROG</span>
        <span><kbd style={kbdStyle}>▲</kbd> / <kbd style={kbdStyle}>▼</kbd> = Navegar</span>
        <span><kbd style={kbdStyle}>I</kbd> = Ligar (Run)</span>
        <span><kbd style={kbdStyle}>O</kbd> / <kbd style={kbdStyle}>Espaço</kbd> = Parar/Reset</span>
        <span><kbd style={kbdStyle}>L</kbd> = LOC/REM</span>
      </div>

      {/* LINHA 1: IHM + MOTOR & CARGA */}
      <div style={rowStyle}>
        <IHM />
        <div style={motorColumnStyle}>
          <MotorVisualizer loadTorquePercent={loadTorque} />
          <div style={loadBoxStyle}>
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
              style={{ width: '100%', marginTop: '8px', cursor: 'pointer', height: '28px' }}
            />
          </div>
        </div>
      </div>

      {/* LINHA 2: BORNES I/O + RELÉS */}
      <div style={rowStyle}>
        <TerminalBlock />
        <RelayPanel />
      </div>

      {/* LINHA 3: INJEÇÃO DE FALHAS */}
      <FaultInjectionPanel />
    </div>
  );
};

// ESTILOS DE LAYOUT RESPONSIVO
const mainContainerStyle: React.CSSProperties = {
  maxWidth: '1100px',
  width: '100%',
  margin: '0 auto',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  boxSizing: 'border-box',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '14px',
  width: '100%',
};

const motorColumnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  flex: '1 1 280px',
};

const loadBoxStyle: React.CSSProperties = {
  background: '#1a1d21',
  border: '1px solid #323842',
  borderRadius: '12px',
  padding: '12px 14px',
};

const shortcutsBannerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  alignItems: 'center',
  background: '#141619',
  padding: '8px 12px',
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