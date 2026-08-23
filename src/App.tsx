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
import { ModbusPanel } from './components/ModbusPanel';
import { COURSE_MODULES } from './constants/courseModules';
import { Lesson } from './types/tutorial';

type ActiveTab = 'workbench' | 'modbus' | 'tutorial';

const SimulatorWorkbench: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('workbench');
  const [loadTorque, setLoadTorque] = useState(20);

  // Guarda a lição atualmente selecionada no Modo Aula
  const [currentLesson, setCurrentLesson] = useState<Lesson>(COURSE_MODULES[0].lessons[0]);

  usePhysicsLoop({ loadTorquePercent: loadTorque, enableNoise: true });
  useKeyboardControls();

  return (
    <div style={mainContainerStyle}>
      {/* BARRA SUPERIOR COM 3 ABAS E CONTROLE DE SOM */}
      <div style={headerNavContainerStyle}>
        <div style={tabsButtonGroupStyle}>
          <button
            onClick={() => setActiveTab('workbench')}
            style={{
              ...tabButtonStyle,
              background: activeTab === 'workbench' ? '#0288d1' : '#1a1d21',
              color: activeTab === 'workbench' ? '#fff' : '#90a4ae',
              borderColor: activeTab === 'workbench' ? '#29b6f6' : '#323842',
            }}
          >
            🎛️ Bancada de Operação
          </button>

          <button
            onClick={() => setActiveTab('modbus')}
            style={{
              ...tabButtonStyle,
              background: activeTab === 'modbus' ? '#0288d1' : '#1a1d21',
              color: activeTab === 'modbus' ? '#fff' : '#90a4ae',
              borderColor: activeTab === 'modbus' ? '#29b6f6' : '#323842',
            }}
          >
            📡 Modbus RTU (RS-485)
          </button>

          <button
            onClick={() => setActiveTab('tutorial')}
            style={{
              ...tabButtonStyle,
              background: activeTab === 'tutorial' ? '#0288d1' : '#1a1d21',
              color: activeTab === 'tutorial' ? '#fff' : '#90a4ae',
              borderColor: activeTab === 'tutorial' ? '#29b6f6' : '#323842',
            }}
          >
            🎓 Modo Aula & Trilha
          </button>
        </div>

        <AudioControls />
      </div>

      {/* BANNER DE ATALHOS */}
      <div style={shortcutsBannerStyle}>
        <span>⌨️ <strong>Atalhos (PC):</strong></span>
        <span><kbd style={kbdStyle}>P</kbd> / <kbd style={kbdStyle}>Enter</kbd> = PROG</span>
        <span><kbd style={kbdStyle}>▲</kbd> / <kbd style={kbdStyle}>▼</kbd> = Navegar</span>
        <span><kbd style={kbdStyle}>I</kbd> = Ligar (Run)</span>
        <span><kbd style={kbdStyle}>O</kbd> / <kbd style={kbdStyle}>Espaço</kbd> = Parar/Reset</span>
        <span><kbd style={kbdStyle}>L</kbd> = LOC/REM</span>
      </div>

      {/* ABA 1: BANCADA DE OPERAÇÃO LIVRE */}
      {activeTab === 'workbench' && (
        <div style={tabContentStyle}>
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
          <div style={rowStyle}>
            <TerminalBlock />
            <RelayPanel />
          </div>
          <FaultInjectionPanel />
        </div>
      )}

      {/* ABA 2: MÓDULO SERIAL / MODBUS RTU */}
      {activeTab === 'modbus' && (
        <div style={tabContentStyle}>
          <ModbusPanel />
          <div style={rowStyle}>
            <IHM />
            <div style={motorColumnStyle}>
              <MotorVisualizer loadTorquePercent={loadTorque} />
            </div>
          </div>
        </div>
      )}

      {/* ABA 3: MODO AULA & TRILHA PEDAGÓGICA */}
      {activeTab === 'tutorial' && (
        <div style={tabContentStyle}>
          <TutorialGuide
            selectedLesson={currentLesson}
            setSelectedLesson={setCurrentLesson}
          />

          {/* SÓ MOSTRA A BANCADA SE FOR UMA AULA PRÁTICA */}
          {currentLesson.type === 'PRACTICE' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '6px' }}>
              <div style={{ fontSize: '12px', color: '#64b5f6', fontWeight: 'bold' }}>
                🎛️ Bancada de Testes Ativa para a Prática:
              </div>
              <div style={rowStyle}>
                <IHM />
                <div style={motorColumnStyle}>
                  <MotorVisualizer loadTorquePercent={loadTorque} />
                  <TerminalBlock />
                </div>
              </div>
              <FaultInjectionPanel />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ESTILOS VISUAIS
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

const headerNavContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '10px',
};

const tabsButtonGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
};

const tabButtonStyle: React.CSSProperties = {
  padding: '10px 18px',
  borderRadius: '8px',
  border: '1px solid',
  fontSize: '13px',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
};

const tabContentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  width: '100%',
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