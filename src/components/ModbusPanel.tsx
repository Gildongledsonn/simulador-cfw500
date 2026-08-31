import React, { useState } from 'react';
import { Clic02RealisticPLC } from './Clic02RealisticPLC';
import { IHM } from './IHM';
import { ElevatorTractionVisualizer } from './ElevatorTractionVisualizer';
import { MotorVisualizer } from './MotorVisualizer';
import { COURSE_MODULES_CLIC02 } from '../constants/courseModulesClic02';

type PlantType = 'esteira' | 'elevador' | 'ponte_rolante' | 'maquina_industrial';

interface ModbusLog {
  id: number;
  time: string;
  frame: string;
  description: string;
}

export const ModbusPanel: React.FC = () => {
  const [activePlant, setActivePlant] = useState<PlantType>('esteira');
  const [selectedLessonIdx, setSelectedLessonIdx] = useState<number>(0);
  const [modbusLogs, setModbusLogs] = useState<ModbusLog[]>([
    {
      id: 1,
      time: new Date().toLocaleTimeString(),
      frame: '01 03 00 00 00 04 44 09',
      description: 'Master Polling: Read Inverter Holding Registers (40001 - 40004)',
    },
  ]);

  const handleModbusTx = (frame: string, description: string) => {
    setModbusLogs((prev) => [
      { id: Date.now(), time: new Date().toLocaleTimeString(), frame, description },
      ...prev.slice(0, 9),
    ]);
  };

  const currentCourse = COURSE_MODULES_CLIC02[0];
  const currentLesson = currentCourse?.lessons[selectedLessonIdx] || currentCourse?.lessons[0];

  return (
    <div style={containerStyle}>
      {/* 1. SELETOR DE PLANTAS INDUSTRIAIS (NO TOPO) */}
      <div style={plantSelectorBarStyle}>
        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#90a4ae' }}>
          Planta Mecânica Conectada em Rede RS-485:
        </span>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActivePlant('esteira')}
            style={{
              ...btnPlantStyle,
              background: activePlant === 'esteira' ? '#0288d1' : '#1a1d21',
              borderColor: activePlant === 'esteira' ? '#29b6f6' : '#30363d',
              color: activePlant === 'esteira' ? '#fff' : '#90a4ae',
            }}
          >
            📦 Esteira Seletora
          </button>
          <button
            onClick={() => setActivePlant('elevador')}
            style={{
              ...btnPlantStyle,
              background: activePlant === 'elevador' ? '#0288d1' : '#1a1d21',
              borderColor: activePlant === 'elevador' ? '#29b6f6' : '#30363d',
              color: activePlant === 'elevador' ? '#fff' : '#90a4ae',
            }}
          >
            🛗 Elevador de Passageiros
          </button>
          <button
            onClick={() => setActivePlant('ponte_rolante')}
            style={{
              ...btnPlantStyle,
              background: activePlant === 'ponte_rolante' ? '#0288d1' : '#1a1d21',
              borderColor: activePlant === 'ponte_rolante' ? '#29b6f6' : '#30363d',
              color: activePlant === 'ponte_rolante' ? '#fff' : '#90a4ae',
            }}
          >
            🏗️ Ponte Rolante
          </button>
          <button
            onClick={() => setActivePlant('maquina_industrial')}
            style={{
              ...btnPlantStyle,
              background: activePlant === 'maquina_industrial' ? '#0288d1' : '#1a1d21',
              borderColor: activePlant === 'maquina_industrial' ? '#29b6f6' : '#30363d',
              color: activePlant === 'maquina_industrial' ? '#fff' : '#90a4ae',
            }}
          >
            ⚙️ Máquina Especial
          </button>
        </div>
      </div>

      {/* 2. TRILHA DE LIÇÕES E TEORIA CONTEXTUAIS */}
      <div style={lessonsContainerCard}>
        <div style={lessonsHeaderStyle}>
          <strong style={{ fontSize: '13px', color: '#00e676' }}>
            🎓 AULAS DE AUTOMAÇÃO & PROGRAMAÇÃO DO CLIC-02 (IEC 61131-3)
          </strong>
          <span style={{ fontSize: '11px', color: '#90a4ae' }}>
            Planta Ativa: <strong>{activePlant.toUpperCase()}</strong>
          </span>
        </div>

        <div style={lessonContentGrid}>
          <div style={lessonSidebarStyle}>
            <strong style={{ fontSize: '11px', color: '#81d4fa', marginBottom: '6px', display: 'block' }}>
              Lições do Curso:
            </strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {currentCourse?.lessons.map((les, idx) => (
                <button
                  key={les.id}
                  onClick={() => setSelectedLessonIdx(idx)}
                  style={{
                    ...btnLessonItemStyle,
                    background: selectedLessonIdx === idx ? '#0288d1' : '#161b22',
                    borderColor: selectedLessonIdx === idx ? '#29b6f6' : '#30363d',
                    color: selectedLessonIdx === idx ? '#fff' : '#cfd8dc',
                  }}
                >
                  {idx + 1}. {les.title}
                </button>
              ))}
            </div>
          </div>

          {currentLesson && (
            <div style={lessonDetailCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={badgeTypeStyle}>{currentLesson.type === 'THEORY' ? '📖 TEORIA & CONCEITO' : '🛠️ PRÁTICA'}</span>
                <span style={{ fontSize: '10px', color: '#90a4ae' }}>⏱️ {currentLesson.durationMin} minutos</span>
              </div>
              <h3 style={{ fontSize: '14px', color: '#fff', margin: '0 0 6px 0' }}>{currentLesson.title}</h3>
              <p style={{ fontSize: '11px', color: '#b0bec5', margin: '0 0 10px 0', lineHeight: '1.5' }}>
                {currentLesson.description}
              </p>

              {currentLesson.theoryData && (
                <div style={theoryBoxStyle}>
                  <strong style={{ fontSize: '11px', color: '#81d4fa', display: 'block', marginBottom: '4px' }}>
                    {currentLesson.theoryData.title}
                  </strong>
                  {currentLesson.theoryData.content.map((par, i) => (
                    <p key={i} style={{ fontSize: '11px', color: '#cfd8dc', margin: '0 0 6px 0', lineHeight: '1.5' }}>
                      {par}
                    </p>
                  ))}
                  {currentLesson.theoryData.diagramInfo && (
                    <div style={diagramBoxStyle}>
                      <span style={{ fontSize: '10px', color: '#00e676', fontWeight: 'bold' }}>Fluxo / Diagrama:</span>
                      <pre style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#fff', fontFamily: 'monospace' }}>
                        {currentLesson.theoryData.diagramInfo}
                      </pre>
                    </div>
                  )}
                  <div style={takeawayBoxStyle}>
                    <strong>💡 Dica do Especialista:</strong> {currentLesson.theoryData.keyTakeaway}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. BANCADA OPERACIONAL: CLP CLIC-02 + IHM + VISUALIZADOR 3D */}
      <div style={workbenchLayoutGrid}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', width: '380px' }}>
          <Clic02RealisticPLC onModbusTx={handleModbusTx} activePlant={activePlant} />
          <IHM />
        </div>

        <div style={{ flex: 1, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {activePlant === 'elevador' ? (
            <ElevatorTractionVisualizer loadTorquePercent={20} />
          ) : (
            <MotorVisualizer loadTorquePercent={activePlant === 'esteira' ? 35 : 15} />
          )}

          {/* TELEMETRIA SERIAL MODBUS */}
          <div style={snifferCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #263238', paddingBottom: '4px', marginBottom: '6px' }}>
              <strong style={{ fontSize: '11px', color: '#00e676' }}>📡 Monitor de Tráfego Serial RS-485 (Modbus RTU)</strong>
              <span style={{ fontSize: '10px', color: '#81d4fa' }}>19200 bps • 8-E-1</span>
            </div>
            <div style={terminalLogArea}>
              {modbusLogs.map((log) => (
                <div key={log.id} style={{ display: 'flex', gap: '8px', fontSize: '10px', fontFamily: 'monospace' }}>
                  <span style={{ color: '#78909c' }}>[{log.time}]</span>
                  <span style={{ color: '#00e676', fontWeight: 'bold' }}>TX/RX:</span>
                  <span style={{ color: '#fff' }}>{log.frame}</span>
                  <span style={{ color: '#90a4ae' }}>— {log.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  width: '100%',
};

const plantSelectorBarStyle: React.CSSProperties = {
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

const btnPlantStyle: React.CSSProperties = {
  border: '1px solid',
  borderRadius: '6px',
  padding: '6px 12px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const lessonsContainerCard: React.CSSProperties = {
  background: '#11151a',
  border: '1px solid #252e3b',
  borderRadius: '12px',
  padding: '14px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const lessonsHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #21262d',
  paddingBottom: '8px',
};

const lessonContentGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '240px 1fr',
  gap: '12px',
};

const lessonSidebarStyle: React.CSSProperties = {
  background: '#0d1117',
  border: '1px solid #21262d',
  borderRadius: '8px',
  padding: '8px',
};

const btnLessonItemStyle: React.CSSProperties = {
  border: '1px solid',
  borderRadius: '4px',
  padding: '6px 8px',
  fontSize: '10px',
  fontWeight: 'bold',
  textAlign: 'left',
  cursor: 'pointer',
};

const lessonDetailCard: React.CSSProperties = {
  background: '#161b22',
  border: '1px solid #30363d',
  borderRadius: '8px',
  padding: '12px',
};

const badgeTypeStyle: React.CSSProperties = {
  background: '#0288d1',
  color: '#fff',
  padding: '2px 6px',
  borderRadius: '4px',
  fontSize: '9px',
  fontWeight: 'bold',
};

const theoryBoxStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const diagramBoxStyle: React.CSSProperties = {
  background: '#0d1117',
  border: '1px dashed #30363d',
  borderRadius: '6px',
  padding: '6px 8px',
  margin: '4px 0',
};

const takeawayBoxStyle: React.CSSProperties = {
  background: '#1f2937',
  borderLeft: '3px solid #00e676',
  padding: '6px 8px',
  borderRadius: '0 4px 4px 0',
  fontSize: '11px',
  color: '#eceff1',
};

const workbenchLayoutGrid: React.CSSProperties = {
  display: 'flex',
  gap: '14px',
  flexWrap: 'wrap',
};

const snifferCardStyle: React.CSSProperties = {
  background: '#0a0d11',
  border: '1px solid #21262d',
  borderRadius: '8px',
  padding: '10px',
  boxSizing: 'border-box',
};

const terminalLogArea: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  maxHeight: '120px',
  overflowY: 'auto',
};