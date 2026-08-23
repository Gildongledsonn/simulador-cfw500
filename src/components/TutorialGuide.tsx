import React, { useState } from 'react';
import { useInverter } from '../context/InverterContext';
import { TUTORIAL_LESSONS } from '../constants/tutorialLessons';

export const TutorialGuide: React.FC = () => {
  const { state } = useInverter();
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const currentLesson = TUTORIAL_LESSONS[selectedLessonIndex];
  const currentStep = currentLesson.steps[currentStepIndex];

  // Validação em tempo real do passo atual
  const isStepDone = currentStep ? currentStep.isCompleted(state) : false;

  const handleNextStep = () => {
    if (currentStepIndex < currentLesson.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleSelectLesson = (idx: number) => {
    setSelectedLessonIndex(idx);
    setCurrentStepIndex(0);
  };

  const progressPercent = Math.round(((currentStepIndex + (isStepDone ? 1 : 0)) / currentLesson.steps.length) * 100);

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} style={floatingToggleStyle}>
        🎓 Abrir Modo Aula / Tutoriais
      </button>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>🎓</span>
          <strong style={{ fontSize: '14px', letterSpacing: '0.5px' }}>LABORATÓRIO GUIADO (MODO AULA)</strong>
        </div>
        <button onClick={() => setIsOpen(false)} style={minimizeButtonStyle}>✕ Minimizar</button>
      </div>

      {/* SELETOR DE LIÇÕES */}
      <div style={lessonSelectorStyle}>
        {TUTORIAL_LESSONS.map((lesson, idx) => (
          <button
            key={lesson.id}
            onClick={() => handleSelectLesson(idx)}
            style={{
              ...lessonTabStyle,
              background: selectedLessonIndex === idx ? '#0288d1' : '#141619',
              color: selectedLessonIndex === idx ? '#fff' : '#90a4ae',
              border: selectedLessonIndex === idx ? '1px solid #29b6f6' : '1px solid #23272f',
            }}
          >
            {lesson.title}
          </button>
        ))}
      </div>

      {/* CARD DA TAREFA ATUAL */}
      <div style={taskCardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={stepBadgeStyle}>
            Passo {currentStepIndex + 1} de {currentLesson.steps.length}
          </span>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: isStepDone ? '#00e676' : '#ffa726' }}>
            {isStepDone ? '✅ OBJETIVO CUMPRIDO!' : '⏳ AGUARDANDO AÇÃO'}
          </span>
        </div>

        <h4 style={{ fontSize: '14px', color: '#eceff1', marginBottom: '4px' }}>{currentStep.title}</h4>
        <p style={{ fontSize: '13px', color: '#b0bec5', lineHeight: '1.4', marginBottom: '8px' }}>
          {currentStep.instruction}
        </p>

        {currentStep.tip && (
          <div style={tipBoxStyle}>
            💡 <strong>Dica prática:</strong> {currentStep.tip}
          </div>
        )}

        {/* BARRA DE PROGRESSO */}
        <div style={progressBarContainerStyle}>
          <div style={{ ...progressBarFillStyle, width: `${Math.min(100, progressPercent)}%` }} />
        </div>

        {/* NAVEGAÇÃO ENTRE PASSOS */}
        <div style={footerNavigationStyle}>
          <button onClick={handlePrevStep} disabled={currentStepIndex === 0} style={navBtnStyle}>
            ◀ Anterior
          </button>
          <span style={{ fontSize: '12px', color: '#90a4ae' }}>{progressPercent}% Concluído</span>
          <button
            onClick={handleNextStep}
            disabled={currentStepIndex === currentLesson.steps.length - 1}
            style={{
              ...navBtnStyle,
              background: isStepDone ? '#2e7d32' : '#374151',
              color: '#fff',
            }}
          >
            Próximo Passo ▶
          </button>
        </div>
      </div>
    </div>
  );
};

// ESTILOS VISUAIS
const containerStyle: React.CSSProperties = {
  background: '#1a1d21',
  border: '1px solid #0288d1',
  borderRadius: '12px',
  padding: '14px',
  width: '100%',
  maxWidth: '1100px',
  boxShadow: '0 8px 32px rgba(2, 136, 209, 0.2)',
  color: '#eee',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #2a2f38',
  paddingBottom: '8px',
  marginBottom: '10px',
};

const minimizeButtonStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: '#90a4ae',
  fontSize: '11px',
  cursor: 'pointer',
};

const floatingToggleStyle: React.CSSProperties = {
  background: '#0288d1',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  padding: '10px 16px',
  fontSize: '13px',
  fontWeight: 'bold',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
};

const lessonSelectorStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  overflowX: 'auto',
  paddingBottom: '6px',
  marginBottom: '10px',
};

const lessonTabStyle: React.CSSProperties = {
  padding: '6px 12px',
  borderRadius: '6px',
  fontSize: '11px',
  fontWeight: 600,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: '0.15s ease',
};

const taskCardStyle: React.CSSProperties = {
  background: '#121417',
  border: '1px solid #282e38',
  borderRadius: '8px',
  padding: '12px',
};

const stepBadgeStyle: React.CSSProperties = {
  background: '#252a33',
  color: '#64b5f6',
  padding: '2px 8px',
  borderRadius: '4px',
  fontSize: '11px',
  fontWeight: 'bold',
};

const tipBoxStyle: React.CSSProperties = {
  background: '#1c2630',
  borderLeft: '3px solid #0288d1',
  padding: '6px 10px',
  borderRadius: '4px',
  fontSize: '12px',
  color: '#b0bec5',
  marginBottom: '10px',
};

const progressBarContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '6px',
  background: '#252a33',
  borderRadius: '3px',
  overflow: 'hidden',
  marginBottom: '10px',
};

const progressBarFillStyle: React.CSSProperties = {
  height: '100%',
  background: '#00e676',
  transition: 'width 0.3s ease',
};

const footerNavigationStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const navBtnStyle: React.CSSProperties = {
  background: '#252a33',
  border: '1px solid #374151',
  color: '#b0bec5',
  padding: '6px 12px',
  borderRadius: '4px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
};