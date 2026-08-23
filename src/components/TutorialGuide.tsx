import React, { useState } from 'react';
import { useInverter } from '../context/InverterContext';
import { COURSE_MODULES } from '../constants/courseModules';
import { Lesson, CourseModule } from '../types/tutorial';

interface TutorialGuideProps {
  onSelectLesson?: (lesson: Lesson) => void;
  selectedLesson: Lesson;
  setSelectedLesson: (lesson: Lesson) => void;
}

export const TutorialGuide: React.FC<TutorialGuideProps> = ({ selectedLesson, setSelectedLesson }) => {
  const { state } = useInverter();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const handleLessonChange = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const markLessonAsComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  // Calcula o progresso do aluno no curso
  const totalLessonsCount = COURSE_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const progressPercent = Math.round((completedLessons.length / totalLessonsCount) * 100);

  return (
    <div style={containerStyle}>
      {/* CABEÇALHO DO CURSO E PROGRESSO */}
      <div style={courseHeaderStyle}>
        <div>
          <h2 style={{ fontSize: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🎓</span> Trilha de Capacitação: Inversor WEG CFW500
          </h2>
          <p style={{ fontSize: '11px', color: '#90a4ae', marginTop: '2px' }}>
            Siga os módulos sequencialmente. As aulas teóricas contêm o embasamento e as aulas práticas abrem a bancada de testes.
          </p>
        </div>

        <div style={progressBoxStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
            <span style={{ color: '#b0bec5' }}>Progresso da Trilha:</span>
            <strong style={{ color: '#00e676' }}>{progressPercent}%</strong>
          </div>
          <div style={progressBarTrackStyle}>
            <div style={{ ...progressBarFillStyle, width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* SELEÇÃO DE MÓDULOS E AULAS (MENU EM GRADE) */}
      <div style={modulesListContainerStyle}>
        {COURSE_MODULES.map((module: CourseModule) => (
          <div key={module.id} style={moduleCardStyle}>
            <div style={moduleCardHeaderStyle}>
              <span style={{ fontSize: '16px' }}>{module.icon}</span>
              <div>
                <strong style={{ fontSize: '12px', color: '#eceff1' }}>
                  Módulo {module.moduleNumber}: {module.title}
                </strong>
                <div style={{ fontSize: '10px', color: '#78909c' }}>{module.description}</div>
              </div>
            </div>

            <div style={lessonsListStyle}>
              {module.lessons.map((lesson: Lesson) => {
                const isSelected = selectedLesson.id === lesson.id;
                const isDone = completedLessons.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonChange(lesson)}
                    style={{
                      ...lessonBtnStyle,
                      background: isSelected ? 'rgba(2, 136, 209, 0.25)' : '#101317',
                      borderColor: isSelected ? '#0288d1' : isDone ? '#2e7d32' : '#222832',
                      color: isSelected ? '#fff' : '#b0bec5',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '12px' }}>
                        {isDone ? '✅' : lesson.type === 'PRACTICE' ? '🛠️' : '📖'}
                      </span>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '11px', fontWeight: isSelected ? 700 : 500 }}>{lesson.title}</div>
                        <div style={{ fontSize: '9px', color: '#78909c' }}>
                          {lesson.type === 'PRACTICE' ? 'Aula Prática na Bancada' : 'Aula Teórica'} • {lesson.durationMin} min
                        </div>
                      </div>
                    </div>
                    <span
                      style={{
                        ...typeBadgeStyle,
                        background: lesson.type === 'PRACTICE' ? '#004d40' : '#1a237e',
                        color: lesson.type === 'PRACTICE' ? '#80cbc4' : '#9fa8da',
                      }}
                    >
                      {lesson.type === 'PRACTICE' ? 'PRÁTICA' : 'TEORIA'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ÁREA DE EXIBIÇÃO DA AULA SELECIONADA */}
      <div style={activeLessonContainerStyle}>
        <div style={activeLessonHeaderStyle}>
          <div>
            <span style={{ fontSize: '10px', color: '#0091ea', fontWeight: 'bold', textTransform: 'uppercase' }}>
              {selectedLesson.type === 'PRACTICE' ? '🛠️ Laboratório Prático' : '📖 Conteúdo Teórico'}
            </span>
            <h3 style={{ fontSize: '15px', color: '#fff', marginTop: '2px' }}>{selectedLesson.title}</h3>
            <p style={{ fontSize: '11px', color: '#b0bec5' }}>{selectedLesson.description}</p>
          </div>

          <button
            onClick={() => markLessonAsComplete(selectedLesson.id)}
            style={{
              ...completeBtnStyle,
              background: completedLessons.includes(selectedLesson.id) ? '#2e7d32' : '#0277bd',
            }}
          >
            {completedLessons.includes(selectedLesson.id) ? '✓ Concluído' : 'Marcar como Concluído'}
          </button>
        </div>

        {/* SE FOR AULA TEÓRICA: MOSTRA O MATERIAL DE ESTUDO */}
        {selectedLesson.type === 'THEORY' && selectedLesson.theoryData && (
          <div style={theoryViewContainerStyle}>
            <div style={theoryContentBoxStyle}>
              <h4 style={{ fontSize: '13px', color: '#64b5f6', marginBottom: '8px' }}>
                {selectedLesson.theoryData.title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedLesson.theoryData.content.map((paragraph, idx) => (
                  <p key={idx} style={{ fontSize: '12px', color: '#cfd8dc', lineHeight: '1.5' }}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {selectedLesson.theoryData.diagramInfo && (
                <div style={diagramBoxStyle}>
                  <strong style={{ fontSize: '11px', color: '#ffb74d' }}>📊 Fluxo do Sinal Elétrico:</strong>
                  <div style={{ fontSize: '12px', color: '#ffe082', fontFamily: 'monospace', marginTop: '4px' }}>
                    {selectedLesson.theoryData.diagramInfo}
                  </div>
                </div>
              )}

              <div style={keyTakeawayBoxStyle}>
                <span style={{ fontSize: '14px' }}>💡</span>
                <span style={{ fontSize: '11px', color: '#80cbc4' }}>
                  <strong>Ponto-Chave:</strong> {selectedLesson.theoryData.keyTakeaway}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SE FOR AULA PRÁTICA: MOSTRA OS PASSOS A SEREM EXECUTADOS NA BANCADA */}
        {selectedLesson.type === 'PRACTICE' && selectedLesson.steps && (
          <div style={practiceStepsContainerStyle}>
            <div style={{ fontSize: '11px', color: '#ffca28', fontWeight: 'bold', marginBottom: '6px' }}>
              🎯 Objetivos Práticos a Realizar na Bancada Abaixo:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedLesson.steps.map((step, sIdx) => {
                const stepDone = step.isCompleted(state);

                return (
                  <div
                    key={step.id}
                    style={{
                      ...stepCardStyle,
                      borderColor: stepDone ? '#00e676' : '#37474f',
                      background: stepDone ? 'rgba(0, 230, 118, 0.08)' : '#121519',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          ...stepNumberBadgeStyle,
                          background: stepDone ? '#00e676' : '#263238',
                          color: stepDone ? '#0f2410' : '#fff',
                        }}
                      >
                        {stepDone ? '✓' : sIdx + 1}
                      </div>
                      <div>
                        <strong style={{ fontSize: '12px', color: stepDone ? '#00e676' : '#eceff1' }}>
                          {step.title}
                        </strong>
                        <div style={{ fontSize: '11px', color: '#b0bec5', marginTop: '2px' }}>{step.instruction}</div>
                        {step.tip && <div style={{ fontSize: '10px', color: '#90caf9', marginTop: '2px' }}>💡 Dica: {step.tip}</div>}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: stepDone ? '#00e676' : '#ff9800',
                        flexShrink: 0,
                      }}
                    >
                      {stepDone ? '✅ OK' : 'PENDENTE'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ESTILOS VISUAIS
const containerStyle: React.CSSProperties = {
  background: '#16191d',
  borderRadius: '12px',
  padding: '14px',
  border: '1px solid #282f3a',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  width: '100%',
  boxSizing: 'border-box',
};

const courseHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '12px',
  borderBottom: '1px solid #232a35',
  paddingBottom: '10px',
};

const progressBoxStyle: React.CSSProperties = {
  minWidth: '160px',
  background: '#101215',
  padding: '8px 12px',
  borderRadius: '8px',
  border: '1px solid #202630',
};

const progressBarTrackStyle: React.CSSProperties = {
  width: '100%',
  height: '6px',
  background: '#202630',
  borderRadius: '3px',
  overflow: 'hidden',
};

const progressBarFillStyle: React.CSSProperties = {
  height: '100%',
  background: 'linear-gradient(90deg, #0288d1 0%, #00e676 100%)',
  transition: 'width 0.3s ease',
};

const modulesListContainerStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '10px',
};

const moduleCardStyle: React.CSSProperties = {
  background: '#101317',
  borderRadius: '8px',
  padding: '10px',
  border: '1px solid #222832',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const moduleCardHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  borderBottom: '1px solid #1a1f26',
  paddingBottom: '6px',
};

const lessonsListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const lessonBtnStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '6px 8px',
  borderRadius: '6px',
  border: '1px solid',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
};

const typeBadgeStyle: React.CSSProperties = {
  fontSize: '8px',
  fontWeight: 'bold',
  padding: '2px 5px',
  borderRadius: '3px',
  letterSpacing: '0.5px',
};

const activeLessonContainerStyle: React.CSSProperties = {
  background: '#0e1013',
  borderRadius: '10px',
  padding: '14px',
  border: '1px solid #232a35',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const activeLessonHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  gap: '10px',
  borderBottom: '1px solid #1e242e',
  paddingBottom: '10px',
};

const completeBtnStyle: React.CSSProperties = {
  padding: '6px 14px',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const theoryViewContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const theoryContentBoxStyle: React.CSSProperties = {
  background: '#13171d',
  borderRadius: '8px',
  padding: '14px',
  border: '1px solid #202632',
};

const diagramBoxStyle: React.CSSProperties = {
  background: '#1a1811',
  border: '1px dashed #ffb74d',
  padding: '10px',
  borderRadius: '6px',
  margin: '12px 0',
};

const keyTakeawayBoxStyle: React.CSSProperties = {
  background: '#0d1e1c',
  border: '1px solid #00897b',
  borderRadius: '6px',
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginTop: '10px',
};

const practiceStepsContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const stepCardStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 12px',
  borderRadius: '6px',
  border: '1px solid',
  gap: '10px',
};

const stepNumberBadgeStyle: React.CSSProperties = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '11px',
  fontWeight: 'bold',
  flexShrink: 0,
};