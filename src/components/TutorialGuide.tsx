import React, { useState, useEffect } from 'react';
import { useInverter } from '../context/InverterContext';
import { COURSE_MODULES } from '../constants/courseModules';
import { Lesson, CourseModule } from '../types/tutorial';
import {
  getUserProgress,
  markLessonCompleted,
  markStepCompleted,
  isModuleUnlocked,
  isLessonUnlocked,
  isModuleCompleted,
  getModuleCompletionPercent,
  UserProgressData,
} from '../services/courseProgressService';

interface TutorialGuideProps {
  selectedLesson: Lesson;
  setSelectedLesson: (lesson: Lesson) => void;
}

export const TutorialGuide: React.FC<TutorialGuideProps> = ({
  selectedLesson,
  setSelectedLesson,
}) => {
  const { state } = useInverter();
  const [progress, setProgress] = useState<UserProgressData>(getUserProgress());

  // Atualiza progresso sempre que houver evento ou mudança
  useEffect(() => {
    const handleProgressUpdate = () => {
      setProgress(getUserProgress());
    };
    window.addEventListener('course_progress_updated', handleProgressUpdate);
    return () => window.removeEventListener('course_progress_updated', handleProgressUpdate);
  }, []);

  // Monitora passos das lições práticas automaticamente em tempo real
  useEffect(() => {
    if (selectedLesson.type === 'PRACTICE' && selectedLesson.steps) {
      let allStepsDone = true;

      selectedLesson.steps.forEach((step) => {
        const isDone = step.isCompleted(state);
        if (isDone) {
          markStepCompleted(selectedLesson.id, step.id);
        } else {
          allStepsDone = false;
        }
      });

      if (allStepsDone && !progress.completedLessons.includes(selectedLesson.id)) {
        markLessonCompleted(selectedLesson.id);
      }
    }
  }, [state, selectedLesson, progress.completedLessons]);

  const handleCompleteTheory = () => {
    markLessonCompleted(selectedLesson.id);
  };

  // Encontra a próxima lição liberada
  const handleNextLesson = () => {
    let foundCurrent = false;
    for (let mIdx = 0; mIdx < COURSE_MODULES.length; mIdx++) {
      const mod = COURSE_MODULES[mIdx];
      for (let lIdx = 0; lIdx < mod.lessons.length; lIdx++) {
        const les = mod.lessons[lIdx];
        if (foundCurrent) {
          if (isLessonUnlocked(mIdx, lIdx, progress)) {
            setSelectedLesson(les);
            return;
          }
        }
        if (les.id === selectedLesson.id) {
          foundCurrent = true;
        }
      }
    }
  };

  const isCurrentLessonCompleted = progress.completedLessons.includes(selectedLesson.id);

  return (
    <div style={containerStyle}>
      {/* SELETOR DE MÓDULOS COM TRAVA PEDAGÓGICA */}
      <div style={moduleListHeaderStyle}>
        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#90a4ae' }}>
          Trilha de Capacitação Técnica:
        </span>
        <div style={modulesTabsRowStyle}>
          {COURSE_MODULES.map((mod, mIdx) => {
            const unlocked = isModuleUnlocked(mIdx, progress);
            const completed = isModuleCompleted(mod, progress);
            const percent = getModuleCompletionPercent(mod, progress);
            const isSelectedModule = mod.lessons.some((l) => l.id === selectedLesson.id);

            return (
              <div
                key={mod.id}
                style={{
                  ...moduleCardStyle,
                  borderColor: isSelectedModule ? '#0288d1' : unlocked ? '#374151' : '#1f242c',
                  background: isSelectedModule ? '#132337' : unlocked ? '#161b22' : '#0d1117',
                  opacity: unlocked ? 1 : 0.5,
                  cursor: unlocked ? 'pointer' : 'not-allowed',
                }}
                onClick={() => {
                  if (unlocked) {
                    // Seleciona a primeira lição disponível do módulo
                    const firstUnlocked = mod.lessons.find((_, lIdx) =>
                      isLessonUnlocked(mIdx, lIdx, progress)
                    ) || mod.lessons[0];
                    setSelectedLesson(firstUnlocked);
                  }
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px' }}>{unlocked ? mod.icon : '🔒'}</span>
                  <span style={{ fontSize: '10px', color: completed ? '#00e676' : '#81d4fa', fontWeight: 'bold' }}>
                    {completed ? '✅ 100%' : `${percent}%`}
                  </span>
                </div>
                <strong style={{ fontSize: '11px', color: unlocked ? '#fff' : '#6b7280', marginTop: '4px', display: 'block' }}>
                  Módulo {mod.moduleNumber}
                </strong>
                <span style={{ fontSize: '9px', color: '#90a4ae', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {mod.title}
                </span>

                {/* Mini barra de progresso do módulo */}
                <div style={progressTrackStyle}>
                  <div
                    style={{
                      ...progressBarFillStyle,
                      width: `${percent}%`,
                      background: completed ? '#00e676' : '#0288d1',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* GRADE INTERNA: LISTA DE LIÇÕES & ÁREA DE CONTEÚDO */}
      <div style={contentGridStyle}>
        {/* MENU LATERAL DE LIÇÕES DO MÓDULO ATIVO */}
        <div style={lessonSidebarStyle}>
          <strong style={{ fontSize: '11px', color: '#81d4fa', marginBottom: '8px', display: 'block' }}>
            Lições do Módulo:
          </strong>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {COURSE_MODULES.map((mod, mIdx) => {
              const isModuleActive = mod.lessons.some((l) => l.id === selectedLesson.id);
              if (!isModuleActive) return null;

              return mod.lessons.map((lesson, lIdx) => {
                const isUnlocked = isLessonUnlocked(mIdx, lIdx, progress);
                const isCompleted = progress.completedLessons.includes(lesson.id);
                const isCurrent = lesson.id === selectedLesson.id;

                return (
                  <button
                    key={lesson.id}
                    disabled={!isUnlocked}
                    onClick={() => setSelectedLesson(lesson)}
                    style={{
                      ...lessonItemBtnStyle,
                      background: isCurrent ? '#0288d1' : isUnlocked ? '#1f2937' : '#111418',
                      color: isCurrent ? '#fff' : isUnlocked ? '#e0e0e0' : '#4b5563',
                      borderColor: isCurrent ? '#29b6f6' : '#374151',
                      cursor: isUnlocked ? 'pointer' : 'not-allowed',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>{isCompleted ? '✅' : isUnlocked ? (lesson.type === 'THEORY' ? '📖' : '🛠️') : '🔒'}</span>
                      <span style={{ fontSize: '11px', textAlign: 'left', flex: 1 }}>{lesson.title}</span>
                    </div>
                  </button>
                );
              });
            })}
          </div>
        </div>

        {/* ÁREA PRINCIPAL DA LIÇÃO SELECIONADA */}
        <div style={lessonMainAreaStyle}>
          <div style={lessonHeaderStyle}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={typeBadgeStyle}>
                  {selectedLesson.type === 'THEORY' ? '📖 TEORIA & CONCEITO' : '🛠️ PRÁTICA INTERATIVA'}
                </span>
                <span style={{ fontSize: '10px', color: '#90a4ae' }}>⏱️ {selectedLesson.durationMin} min</span>
              </div>
              <h2 style={{ fontSize: '16px', color: '#fff', margin: '6px 0 2px 0' }}>{selectedLesson.title}</h2>
              <p style={{ fontSize: '11px', color: '#b0bec5', margin: 0 }}>{selectedLesson.description}</p>
            </div>

            {isCurrentLessonCompleted ? (
              <span style={completedBadgeStyle}>✓ LIÇÃO CONCLUÍDA</span>
            ) : (
              <span style={inProgressBadgeStyle}>EM ANDAMENTO</span>
            )}
          </div>

          {/* CONTEÚDO TEÓRICO */}
          {selectedLesson.type === 'THEORY' && selectedLesson.theoryData && (
            <div style={theoryContainerStyle}>
              <h3 style={{ fontSize: '13px', color: '#81d4fa', marginBottom: '8px' }}>
                {selectedLesson.theoryData.title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedLesson.theoryData.content.map((par, i) => (
                  <p key={i} style={{ fontSize: '12px', color: '#cfd8dc', lineHeight: '1.5', margin: 0 }}>
                    {par}
                  </p>
                ))}
              </div>

              {selectedLesson.theoryData.diagramInfo && (
                <div style={diagramBoxStyle}>
                  <strong style={{ fontSize: '10px', color: '#00e676' }}>Fluxo / Diagrama:</strong>
                  <div style={{ fontSize: '11px', color: '#fff', marginTop: '2px', fontFamily: 'monospace' }}>
                    {selectedLesson.theoryData.diagramInfo}
                  </div>
                </div>
              )}

              <div style={keyTakeawayBoxStyle}>
                <strong>💡 Ponto-Chave para o Eletricista:</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#eceff1' }}>
                  {selectedLesson.theoryData.keyTakeaway}
                </p>
              </div>

              {/* BOTÃO DE CONFIRMAÇÃO DA LEITURA */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px', gap: '8px' }}>
                {!isCurrentLessonCompleted ? (
                  <button onClick={handleCompleteTheory} style={btnOkTheoryStyle}>
                    ✓ Concluir Leitura & Validar Teoria (OK)
                  </button>
                ) : (
                  <button onClick={handleNextLesson} style={btnNextLessonStyle}>
                    Avançar para Próxima Lição ➔
                  </button>
                )}
              </div>
            </div>
          )}

          {/* CONTEÚDO PRÁTICO (CHECKLIST INTERATIVO) */}
          {selectedLesson.type === 'PRACTICE' && selectedLesson.steps && (
            <div style={practiceContainerStyle}>
              <strong style={{ fontSize: '12px', color: '#81d4fa', display: 'block', marginBottom: '8px' }}>
                Checklist Prático no Painel e IHM:
              </strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedLesson.steps.map((step, idx) => {
                  const stepDone = step.isCompleted(state);

                  return (
                    <div
                      key={step.id}
                      style={{
                        ...stepItemStyle,
                        borderColor: stepDone ? '#00e676' : '#374151',
                        background: stepDone ? 'rgba(0, 230, 118, 0.08)' : '#161b22',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '14px' }}>{stepDone ? '✅' : '⭕'}</span>
                          <strong style={{ fontSize: '12px', color: stepDone ? '#00e676' : '#fff' }}>
                            {idx + 1}. {step.title}
                          </strong>
                        </div>
                        <span style={{ fontSize: '10px', color: stepDone ? '#00e676' : '#ffb74d', fontWeight: 'bold' }}>
                          {stepDone ? 'OK (Validado)' : 'Pendente'}
                        </span>
                      </div>
                      <p style={{ fontSize: '11px', color: '#b0bec5', margin: '4px 0 0 24px' }}>
                        {step.instruction}
                      </p>
                      {step.tip && (
                        <div style={{ fontSize: '10px', color: '#81d4fa', margin: '4px 0 0 24px' }}>
                          💡 <em>Dica: {step.tip}</em>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {isCurrentLessonCompleted && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                  <button onClick={handleNextLesson} style={btnNextLessonStyle}>
                    🎉 Tarefa 100% Concluída! Próxima Lição ➔
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ESTILOS VISUAIS
const containerStyle: React.CSSProperties = {
  background: '#11151a',
  border: '1px solid #252e3b',
  borderRadius: '12px',
  padding: '14px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
  boxSizing: 'border-box',
};

const moduleListHeaderStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const modulesTabsRowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '8px',
};

const moduleCardStyle: React.CSSProperties = {
  borderRadius: '8px',
  padding: '8px 10px',
  border: '1px solid',
  transition: 'all 0.2s ease',
};

const progressTrackStyle: React.CSSProperties = {
  height: '4px',
  background: '#252d38',
  borderRadius: '2px',
  marginTop: '6px',
  overflow: 'hidden',
};

const progressBarFillStyle: React.CSSProperties = {
  height: '100%',
  transition: 'width 0.3s ease',
};

const contentGridStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
};

const lessonSidebarStyle: React.CSSProperties = {
  flex: '1 1 220px',
  background: '#0d1117',
  border: '1px solid #21262d',
  borderRadius: '8px',
  padding: '10px',
  boxSizing: 'border-box',
};

const lessonItemBtnStyle: React.CSSProperties = {
  padding: '8px 10px',
  borderRadius: '6px',
  border: '1px solid',
  fontSize: '11px',
  fontWeight: 'bold',
  transition: 'all 0.2s ease',
  boxSizing: 'border-box',
};

const lessonMainAreaStyle: React.CSSProperties = {
  flex: '3 1 380px',
  background: '#161b22',
  border: '1px solid #30363d',
  borderRadius: '8px',
  padding: '14px',
  boxSizing: 'border-box',
};

const lessonHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  borderBottom: '1px solid #21262d',
  paddingBottom: '10px',
  marginBottom: '10px',
};

const typeBadgeStyle: React.CSSProperties = {
  background: '#0288d1',
  color: '#fff',
  padding: '2px 6px',
  borderRadius: '4px',
  fontSize: '9px',
  fontWeight: 'bold',
};

const completedBadgeStyle: React.CSSProperties = {
  background: 'rgba(0, 230, 118, 0.15)',
  border: '1px solid #00e676',
  color: '#00e676',
  padding: '4px 8px',
  borderRadius: '6px',
  fontSize: '10px',
  fontWeight: 'bold',
};

const inProgressBadgeStyle: React.CSSProperties = {
  background: 'rgba(255, 179, 0, 0.15)',
  border: '1px solid #ffb300',
  color: '#ffb300',
  padding: '4px 8px',
  borderRadius: '6px',
  fontSize: '10px',
  fontWeight: 'bold',
};

const theoryContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const diagramBoxStyle: React.CSSProperties = {
  background: '#0d1117',
  border: '1px dashed #30363d',
  borderRadius: '6px',
  padding: '8px 10px',
  marginTop: '4px',
};

const keyTakeawayBoxStyle: React.CSSProperties = {
  background: '#1f2937',
  borderLeft: '4px solid #00e676',
  padding: '8px 10px',
  borderRadius: '0 6px 6px 0',
  marginTop: '6px',
};

const practiceContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const stepItemStyle: React.CSSProperties = {
  padding: '8px 10px',
  borderRadius: '6px',
  border: '1px solid',
  transition: 'all 0.2s ease',
};

const btnOkTheoryStyle: React.CSSProperties = {
  background: '#00e676',
  color: '#000',
  border: 'none',
  borderRadius: '6px',
  padding: '8px 14px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const btnNextLessonStyle: React.CSSProperties = {
  background: '#0288d1',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '8px 14px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
};