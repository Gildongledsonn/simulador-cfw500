import React, { useState, useEffect, useRef } from 'react';
import { useInverter } from '../context/InverterContext';
import { COURSE_MODULES } from '../constants/courseModules';
import { COURSE_MODULES_CFW300 } from '../constants/courseModulesCFW300';
import { Lesson } from '../types/tutorial';
import {
  getUserProgress,
  markLessonCompleted,
  markStepCompleted,
  isModuleUnlocked,
  isLessonUnlocked,
  isModuleCompleted,
  getModuleCompletionPercent,
  isAdminUnlockAllActive,
  setAdminUnlockAll,
  resetStudentProgress,
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
  const { state, dispatch } = useInverter();
  const [activeInverterType, setActiveInverterType] = useState<'CFW500' | 'CFW300'>('CFW500');
  const [progress, setProgress] = useState<UserProgressData>(() => getUserProgress());
  const [adminMode, setAdminMode] = useState<boolean>(() => isAdminUnlockAllActive());

  const activeCourseModules = activeInverterType === 'CFW500' ? COURSE_MODULES : COURSE_MODULES_CFW300;
  const previousLessonIdRef = useRef<string>(selectedLesson.id);

  const triggerFactoryReset = () => {
    if (!dispatch) return;
    try {
      dispatch({ type: 'RESET_FACTORY_DEFAULTS' } as any);
    } catch {
      try {
        dispatch({ type: 'RESET_DEFAULTS' } as any);
      } catch {}
    }
  };

  useEffect(() => {
    if (previousLessonIdRef.current !== selectedLesson.id) {
      triggerFactoryReset();
      previousLessonIdRef.current = selectedLesson.id;
    }
  }, [selectedLesson.id]);

  useEffect(() => {
    const handleProgressUpdate = () => {
      setProgress(getUserProgress());
      setAdminMode(isAdminUnlockAllActive());
    };
    window.addEventListener('course_progress_updated', handleProgressUpdate);
    return () => window.removeEventListener('course_progress_updated', handleProgressUpdate);
  }, []);

  useEffect(() => {
    if (selectedLesson.type === 'PRACTICE' && selectedLesson.steps) {
      const currentSavedSteps = progress.completedSteps[selectedLesson.id] || [];

      selectedLesson.steps.forEach((step) => {
        if (!currentSavedSteps.includes(step.id)) {
          if (step.isCompleted(state)) {
            markStepCompleted(selectedLesson.id, step.id);
          }
        }
      });

      const updatedProgress = getUserProgress();
      const updatedSteps = updatedProgress.completedSteps[selectedLesson.id] || [];
      const allDone = selectedLesson.steps.every((s) => updatedSteps.includes(s.id));

      if (allDone && !updatedProgress.completedLessons.includes(selectedLesson.id)) {
        markLessonCompleted(selectedLesson.id);

        const currentMod = activeCourseModules.find((m) =>
          m.lessons.some((l) => l.id === selectedLesson.id)
        );
        if (currentMod) {
          const isNowModCompleted = currentMod.lessons.every((l) =>
            l.id === selectedLesson.id || updatedProgress.completedLessons.includes(l.id)
          );
          if (isNowModCompleted) {
            triggerFactoryReset();
          }
        }
      }
    }
  }, [state, selectedLesson, progress.completedSteps, progress.completedLessons, activeCourseModules]);

  const handleSelectInverterType = (type: 'CFW500' | 'CFW300') => {
    if (type === activeInverterType) return;
    setActiveInverterType(type);
    triggerFactoryReset();
    const targetModules = type === 'CFW500' ? COURSE_MODULES : COURSE_MODULES_CFW300;
    if (targetModules[0]?.lessons[0]) {
      setSelectedLesson(targetModules[0].lessons[0]);
    }
  };

  const handleToggleAdminMode = () => {
    const next = !adminMode;
    setAdminUnlockAll(next);
    setAdminMode(next);
  };

  const handleFullReset = () => {
    if (window.confirm('Deseja resetar todo o progresso do aluno para reiniciar os testes da lição 1?')) {
      resetStudentProgress();
      triggerFactoryReset();
      if (activeCourseModules[0]?.lessons[0]) {
        setSelectedLesson(activeCourseModules[0].lessons[0]);
      }
    }
  };

  const handleCompleteTheory = () => {
    markLessonCompleted(selectedLesson.id);
    triggerFactoryReset();
  };

  // Avança dinamicamente para a próxima lição da lista ativa
  const handleNextLesson = () => {
    triggerFactoryReset();

    let foundCurrent = false;
    for (let mIdx = 0; mIdx < activeCourseModules.length; mIdx++) {
      const mod = activeCourseModules[mIdx];
      for (let lIdx = 0; lIdx < mod.lessons.length; lIdx++) {
        const les = mod.lessons[lIdx];
        if (foundCurrent) {
          if (isLessonUnlocked(mIdx, lIdx, progress, activeCourseModules)) {
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
  const currentSavedSteps = progress.completedSteps[selectedLesson.id] || [];

  return (
    <div style={containerStyle}>
      {/* BARRA DE CONTROLE ADMINISTRATIVO */}
      <div style={adminControlBarStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#ffb74d' }}>⚙️ Painel ADM:</span>
          <button
            onClick={handleToggleAdminMode}
            style={{
              ...adminBtnStyle,
              background: adminMode ? '#00e676' : '#374151',
              color: adminMode ? '#000' : '#fff',
            }}
            title="Libera o acesso imediato a todos os módulos"
          >
            {adminMode ? '🔓 Todos Módulos Liberados' : '🔒 Trava Sequencial Ativa'}
          </button>
        </div>

        <button
          onClick={handleFullReset}
          style={{ ...adminBtnStyle, background: '#d32f2f', color: '#fff' }}
          title="Zera o progresso do aluno para testar o fluxo desde o início"
        >
          🗑️ Resetar Progresso
        </button>
      </div>

      {/* SELEÇÃO DO MODELO DE INVERSOR */}
      <div style={moduleListHeaderStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <button
            onClick={() => handleSelectInverterType('CFW500')}
            style={{
              ...inverterTabBtnStyle,
              background: activeInverterType === 'CFW500' ? '#0288d1' : '#161b22',
              borderColor: activeInverterType === 'CFW500' ? '#29b6f6' : '#30363d',
              color: activeInverterType === 'CFW500' ? '#fff' : '#90a4ae',
            }}
          >
            ⚡ Inversor CFW500 (20 Módulos)
          </button>
          <button
            onClick={() => handleSelectInverterType('CFW300')}
            style={{
              ...inverterTabBtnStyle,
              background: activeInverterType === 'CFW300' ? '#0288d1' : '#161b22',
              borderColor: activeInverterType === 'CFW300' ? '#29b6f6' : '#30363d',
              color: activeInverterType === 'CFW300' ? '#fff' : '#90a4ae',
            }}
          >
            ⚙️ Inversor CFW300 (Aulas e Desafios)
          </button>
        </div>

        {/* GRADE DE MÓDULOS */}
        <div style={modulesTabsRowStyle}>
          {activeCourseModules.map((mod, mIdx) => {
            const unlocked = isModuleUnlocked(mIdx, progress, activeCourseModules);
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
                    triggerFactoryReset();
                    const firstUnlocked =
                      mod.lessons.find((_, lIdx) => isLessonUnlocked(mIdx, lIdx, progress, activeCourseModules)) ||
                      mod.lessons[0];
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

      <div style={contentGridStyle}>
        {/* LISTA DE LIÇÕES DO MÓDULO ATIVO */}
        <div style={lessonSidebarStyle}>
          <strong style={{ fontSize: '11px', color: '#81d4fa', marginBottom: '8px', display: 'block' }}>
            Lições do Módulo ({activeInverterType}):
          </strong>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {activeCourseModules.map((mod, mIdx) => {
              const isModuleActive = mod.lessons.some((l) => l.id === selectedLesson.id);
              if (!isModuleActive) return null;

              return mod.lessons.map((lesson, lIdx) => {
                const isUnlocked = isLessonUnlocked(mIdx, lIdx, progress, activeCourseModules);
                const isCompleted = progress.completedLessons.includes(lesson.id);
                const isCurrent = lesson.id === selectedLesson.id;

                return (
                  <button
                    key={lesson.id}
                    disabled={!isUnlocked}
                    onClick={() => {
                      triggerFactoryReset();
                      setSelectedLesson(lesson);
                    }}
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

        {/* ÁREA PRINCIPAL DA LIÇÃO */}
        <div style={lessonMainAreaStyle}>
          <div style={lessonHeaderStyle}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={typeBadgeStyle}>
                  {selectedLesson.type === 'THEORY' ? '📖 TEORIA & CONCEITO' : '🛠️ PRÁTICA INTERATIVA'}
                </span>
                <span style={{ fontSize: '10px', color: '#90a4ae' }}>⏱️ {selectedLesson.durationMin} min</span>
              </div>
              <h2 style={{ fontSize: '15px', color: '#fff', margin: '6px 0 2px 0' }}>{selectedLesson.title}</h2>
              <p style={{ fontSize: '11px', color: '#b0bec5', margin: 0 }}>{selectedLesson.description}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {selectedLesson.type === 'PRACTICE' && (
                <button
                  onClick={triggerFactoryReset}
                  style={btnResetFactoryStyle}
                  title="Restaura os parâmetros do inversor para o padrão de fábrica da bancada"
                >
                  🔄 Resetar Inversor
                </button>
              )}

              {isCurrentLessonCompleted ? (
                <span style={completedBadgeStyle}>✓ CONCLUÍDA</span>
              ) : (
                <span style={inProgressBadgeStyle}>EM ANDAMENTO</span>
              )}
            </div>
          </div>

          {/* CONTEÚDO TEÓRICO */}
          {selectedLesson.type === 'THEORY' && selectedLesson.theoryData && (
            <div style={theoryContainerStyle}>
              <h3 style={{ fontSize: '13px', color: '#81d4fa', marginBottom: '8px' }}>
                {selectedLesson.theoryData.title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedLesson.theoryData.content.map((par, i) => (
                  <p key={i} style={{ fontSize: '11px', color: '#cfd8dc', lineHeight: '1.5', margin: 0 }}>
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

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px', gap: '8px' }}>
                {!isCurrentLessonCompleted ? (
                  <button onClick={handleCompleteTheory} style={btnOkTheoryStyle}>
                    ✓ Concluir Leitura (OK)
                  </button>
                ) : (
                  <button onClick={handleNextLesson} style={btnNextLessonStyle}>
                    Próxima Lição ➔
                  </button>
                )}
              </div>
            </div>
          )}

          {/* CONTEÚDO PRÁTICO */}
          {selectedLesson.type === 'PRACTICE' && selectedLesson.steps && (
            <div style={practiceContainerStyle}>
              <strong style={{ fontSize: '11px', color: '#81d4fa', display: 'block', marginBottom: '6px' }}>
                Checklist Prático no Painel e IHM ao lado:
              </strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedLesson.steps.map((step, idx) => {
                  const stepDone = currentSavedSteps.includes(step.id) || step.isCompleted(state);

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
                          <span style={{ fontSize: '13px' }}>{stepDone ? '✅' : '⭕'}</span>
                          <strong style={{ fontSize: '11px', color: stepDone ? '#00e676' : '#fff' }}>
                            {idx + 1}. {step.title}
                          </strong>
                        </div>
                        <span style={{ fontSize: '9px', color: stepDone ? '#00e676' : '#ffb74d', fontWeight: 'bold' }}>
                          {stepDone ? 'OK' : 'Pendente'}
                        </span>
                      </div>
                      <p style={{ fontSize: '10px', color: '#b0bec5', margin: '3px 0 0 22px' }}>
                        {step.instruction}
                      </p>
                    </div>
                  );
                })}
              </div>

              {isCurrentLessonCompleted && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button onClick={handleNextLesson} style={btnNextLessonStyle}>
                    🎉 Tarefa Concluída! Próxima Lição ➔
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

const containerStyle: React.CSSProperties = {
  background: '#11151a',
  border: '1px solid #252e3b',
  borderRadius: '12px',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  boxSizing: 'border-box',
};

const adminControlBarStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#1b222c',
  border: '1px solid #374151',
  borderRadius: '8px',
  padding: '6px 10px',
  boxSizing: 'border-box',
};

const adminBtnStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '4px',
  padding: '4px 8px',
  fontSize: '10px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const inverterTabBtnStyle: React.CSSProperties = {
  border: '1px solid',
  borderRadius: '6px',
  padding: '5px 12px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const moduleListHeaderStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const modulesTabsRowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
  gap: '6px',
};

const moduleCardStyle: React.CSSProperties = {
  borderRadius: '8px',
  padding: '6px 8px',
  border: '1px solid',
  transition: 'all 0.2s ease',
};

const progressTrackStyle: React.CSSProperties = {
  height: '3px',
  background: '#252d38',
  borderRadius: '2px',
  marginTop: '4px',
  overflow: 'hidden',
};

const progressBarFillStyle: React.CSSProperties = {
  height: '100%',
  transition: 'width 0.3s ease',
};

const contentGridStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const lessonSidebarStyle: React.CSSProperties = {
  background: '#0d1117',
  border: '1px solid #21262d',
  borderRadius: '8px',
  padding: '8px',
  boxSizing: 'border-box',
};

const lessonItemBtnStyle: React.CSSProperties = {
  padding: '6px 8px',
  borderRadius: '6px',
  border: '1px solid',
  fontSize: '11px',
  fontWeight: 'bold',
  transition: 'all 0.2s ease',
  boxSizing: 'border-box',
  width: '100%',
  textAlign: 'left',
};

const lessonMainAreaStyle: React.CSSProperties = {
  background: '#161b22',
  border: '1px solid #30363d',
  borderRadius: '8px',
  padding: '12px',
  boxSizing: 'border-box',
};

const lessonHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  borderBottom: '1px solid #21262d',
  paddingBottom: '8px',
  marginBottom: '8px',
};

const typeBadgeStyle: React.CSSProperties = {
  background: '#0288d1',
  color: '#fff',
  padding: '2px 6px',
  borderRadius: '4px',
  fontSize: '9px',
  fontWeight: 'bold',
};

const btnResetFactoryStyle: React.CSSProperties = {
  background: '#263238',
  border: '1px solid #455a64',
  color: '#81d4fa',
  borderRadius: '6px',
  padding: '3px 8px',
  fontSize: '10px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const completedBadgeStyle: React.CSSProperties = {
  background: 'rgba(0, 230, 118, 0.15)',
  border: '1px solid #00e676',
  color: '#00e676',
  padding: '3px 6px',
  borderRadius: '4px',
  fontSize: '9px',
  fontWeight: 'bold',
};

const inProgressBadgeStyle: React.CSSProperties = {
  background: 'rgba(255, 179, 0, 0.15)',
  border: '1px solid #ffb300',
  color: '#ffb300',
  padding: '3px 6px',
  borderRadius: '4px',
  fontSize: '9px',
  fontWeight: 'bold',
};

const theoryContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const diagramBoxStyle: React.CSSProperties = {
  background: '#0d1117',
  border: '1px dashed #30363d',
  borderRadius: '6px',
  padding: '6px 8px',
  marginTop: '4px',
};

const keyTakeawayBoxStyle: React.CSSProperties = {
  background: '#1f2937',
  borderLeft: '3px solid #00e676',
  padding: '6px 8px',
  borderRadius: '0 4px 4px 0',
  marginTop: '4px',
};

const practiceContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const stepItemStyle: React.CSSProperties = {
  padding: '6px 8px',
  borderRadius: '6px',
  border: '1px solid',
  transition: 'all 0.2s ease',
};

const btnOkTheoryStyle: React.CSSProperties = {
  background: '#00e676',
  color: '#000',
  border: 'none',
  borderRadius: '6px',
  padding: '6px 12px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const btnNextLessonStyle: React.CSSProperties = {
  background: '#0288d1',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '6px 12px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
};