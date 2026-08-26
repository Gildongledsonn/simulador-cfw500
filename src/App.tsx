import React, { useState, useEffect } from 'react';
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
import { LoginScreen } from './components/LoginScreen';
import { AdminPanel } from './components/AdminPanel';
import { CFW300Workbench } from './components/CFW300Workbench';
import { COURSE_MODULES } from './constants/courseModules';
import { Lesson } from './types/tutorial';

type ActiveTab = 'workbench' | 'modbus' | 'tutorial' | 'admin';
type InverterModel = 'CFW500' | 'CFW300';

interface AuthUser {
  name: string;
  role: string;
  username: string;
}

const SimulatorWorkbench: React.FC<{ user: AuthUser; onLogout: () => void }> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('workbench');
  const [inverterModel, setInverterModel] = useState<InverterModel>('CFW500');
  const [loadTorque, setLoadTorque] = useState(20);
  const [currentLesson, setCurrentLesson] = useState<Lesson>(COURSE_MODULES[0].lessons[0]);

  usePhysicsLoop({ loadTorquePercent: loadTorque, enableNoise: true });
  useKeyboardControls();

  // Detecta se a lição ativa no TutorialGuide pertence ao CFW300 para sincronizar a bancada prática
  const isLessonCFW300 = currentLesson.id.startsWith('c300-');

  return (
    <div style={mainContainerStyle}>
      {/* BARRA SUPERIOR DE USUÁRIO */}
      <div style={userHeaderBarStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>👤</span>
          <div>
            <strong style={{ fontSize: '12px', color: '#fff' }}>{user.name}</strong>
            <span style={{ fontSize: '10px', color: '#90a4ae', marginLeft: '6px' }}>
              ({user.role === 'ADMIN' ? 'Instrutor / Admin' : 'Aluno'}) • @{user.username}
            </span>
          </div>
        </div>

        <button onClick={onLogout} style={btnLogoutStyle} title="Encerrar sessão">
          🚪 Sair
        </button>
      </div>

      {/* BARRA DE NAVEGAÇÃO ENTRE ABAS */}
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

          {/* ABA EXCLUSIVA DO INSTRUTOR/ADMIN */}
          {user.role === 'ADMIN' && (
            <button
              onClick={() => setActiveTab('admin')}
              style={{
                ...tabButtonStyle,
                background: activeTab === 'admin' ? '#f57c00' : '#1a1d21',
                color: activeTab === 'admin' ? '#fff' : '#ffb74d',
                borderColor: activeTab === 'admin' ? '#ffa726' : '#323842',
              }}
            >
              🛡️ Painel Admin (Aprovações)
            </button>
          )}
        </div>

        <AudioControls />
      </div>

      {/* ABA 1: BANCADA LIVRE */}
      {activeTab === 'workbench' && (
        <div style={tabContentStyle}>
          {/* SELETOR DE MODELO DE BANCADA LIVRE */}
          <div style={modelSelectorBarStyle}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#90a4ae' }}>
              Modelo de Inversor Ativo na Bancada:
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setInverterModel('CFW500')}
                style={{
                  ...modelTabBtnStyle,
                  background: inverterModel === 'CFW500' ? '#0288d1' : '#161b22',
                  borderColor: inverterModel === 'CFW500' ? '#29b6f6' : '#30363d',
                  color: inverterModel === 'CFW500' ? '#fff' : '#90a4ae',
                }}
              >
                ⚡ WEG CFW500 (Padrão Industrial)
              </button>
              <button
                onClick={() => setInverterModel('CFW300')}
                style={{
                  ...modelTabBtnStyle,
                  background: inverterModel === 'CFW300' ? '#0288d1' : '#161b22',
                  borderColor: inverterModel === 'CFW300' ? '#29b6f6' : '#30363d',
                  color: inverterModel === 'CFW300' ? '#fff' : '#90a4ae',
                }}
              >
                ⚙️ WEG CFW300 (Micro Drive Compacto)
              </button>
            </div>
          </div>

          {/* EXIBIÇÃO DA BANCADA ESCOLHIDA */}
          {inverterModel === 'CFW500' ? (
            <>
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
            </>
          ) : (
            <>
              <div style={rowStyle}>
                <CFW300Workbench />
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
              <FaultInjectionPanel />
            </>
          )}
        </div>
      )}

      {/* ABA 2: MODBUS RTU */}
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

      {/* ABA 3: MODO AULA & TRILHA */}
      {activeTab === 'tutorial' && (
        <div style={tabContentStyle}>
          <TutorialGuide
            selectedLesson={currentLesson}
            setSelectedLesson={setCurrentLesson}
            userRole={user.role}
          />

          {currentLesson.type === 'PRACTICE' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '6px' }}>
              <div style={{ fontSize: '12px', color: '#64b5f6', fontWeight: 'bold' }}>
                🎛️ Bancada Ativa para a Lição ({isLessonCFW300 ? 'WEG CFW300' : 'WEG CFW500'}):
              </div>
              
              {isLessonCFW300 ? (
                <div style={rowStyle}>
                  <CFW300Workbench />
                  <div style={motorColumnStyle}>
                    <MotorVisualizer loadTorquePercent={loadTorque} />
                  </div>
                </div>
              ) : (
                <div style={rowStyle}>
                  <IHM />
                  <div style={motorColumnStyle}>
                    <MotorVisualizer loadTorquePercent={loadTorque} />
                    <TerminalBlock />
                  </div>
                </div>
              )}
              
              <FaultInjectionPanel />
            </div>
          )}
        </div>
      )}

      {/* ABA 4: PAINEL DO ADMINISTRADOR */}
      {activeTab === 'admin' && user.role === 'ADMIN' && (
        <div style={tabContentStyle}>
          <AdminPanel />
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const savedLocal = localStorage.getItem('cfw500_auth_user');
    if (savedLocal) {
      try {
        setCurrentUser(JSON.parse(savedLocal));
      } catch {
        localStorage.removeItem('cfw500_auth_user');
      }
    }
    setIsInitializing(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('cfw500_auth_user');
    setCurrentUser(null);
  };

  if (isInitializing) {
    return <div style={{ background: '#0a0d11', minHeight: '100vh' }} />;
  }

  if (!currentUser) {
    return <LoginScreen onLoginSuccess={setCurrentUser} />;
  }

  return (
    <InverterProvider>
      <SimulatorWorkbench user={currentUser} onLogout={handleLogout} />
    </InverterProvider>
  );
}

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

const userHeaderBarStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#13171d',
  border: '1px solid #232b36',
  borderRadius: '8px',
  padding: '8px 14px',
};

const btnLogoutStyle: React.CSSProperties = {
  background: '#b71c1c',
  border: 'none',
  borderRadius: '6px',
  color: '#fff',
  padding: '5px 12px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
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

const modelSelectorBarStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#13171d',
  border: '1px solid #232b36',
  borderRadius: '8px',
  padding: '8px 12px',
  flexWrap: 'wrap',
  gap: '8px',
};

const modelTabBtnStyle: React.CSSProperties = {
  border: '1px solid',
  borderRadius: '6px',
  padding: '6px 12px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
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