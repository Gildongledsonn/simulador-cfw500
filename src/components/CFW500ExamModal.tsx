import React, { useState } from 'react';
import { saveStudentCertificate } from '../services/certificateService';

interface CFW500ExamModalProps {
  studentName: string;
  studentCpf?: string;
  onClose: () => void;
  onCertificateIssued: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

const EXAM_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Qual parâmetro do WEG CFW500 é utilizado para definir o tempo de aceleração principal (Rampa 1)?',
    options: ['P0100', 'P0202', 'P0308', 'P0403'],
    correctIndex: 0,
  },
  {
    id: 2,
    question: 'O que significa a indicação "LOC" no display da IHM do inversor?',
    options: ['Inversor em Falta grave', 'Comando ativo via Bornes (Remoto)', 'Comando ativo localmente pelo teclado da IHM', 'Frequência bloqueada'],
    correctIndex: 2,
  },
  {
    id: 3,
    question: 'Qual a principal função do parâmetro P0401 no comissionamento do motor?',
    options: ['Definir a corrente máxima', 'Definir a frequência nominal do motor', 'Ajustar o endereço Modbus', 'Selecionar a entrada analógica'],
    correctIndex: 1,
  },
  {
    id: 4,
    question: 'Como proceder para resetar uma falha ativa (ex: F006 - Sobrecorrente) no CFW500?',
    options: ['Desligar a rede de média tensão', 'Pressionar a tecla STOP/RESET (O) na IHM ou via borne digital configurado', 'Alterar o baud rate serial', 'Girar o potenciômetro para zero'],
    correctIndex: 1,
  },
  {
    id: 5,
    question: 'Qual o tipo de controle vetorial ou escalar comumente selecionado no parâmetro P0202 para uso geral?',
    options: ['Controle V/F (Escalar) ou VVW', 'Controle hidráulico de pressão', 'Controle por rádio frequência', 'Controle de nível por boia'],
    correctIndex: 0,
  },
];

export const CFW500ExamModal: React.FC<CFW500ExamModalProps> = ({
  studentName,
  studentCpf = '046.405.824-47',
  onClose,
  onCertificateIssued,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [examResult, setExamResult] = useState<{ score: number; passed: boolean } | null>(null);

  const handleSelectOption = (qId: number, optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleNext = () => {
    if (currentStep < EXAM_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    let correctCount = 0;
    EXAM_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const finalScore = (correctCount / EXAM_QUESTIONS.length) * 10;
    const passed = finalScore >= 7.0;

    setExamResult({ score: finalScore, passed });

    if (passed) {
      saveStudentCertificate({
        studentName,
        studentCpf,
        courseTitle: 'INVERSOR DE FREQÜÊNCIA WEG – CFW500',
        workloadHours: 20,
        score: finalScore,
      });
      onCertificateIssued();
    }
  };

  const q = EXAM_QUESTIONS[currentStep];

  return (
    <div style={modalOverlayStyle}>
      <div style={modalCardStyle}>
        <div style={modalHeaderStyle}>
          <div>
            <strong style={{ fontSize: '15px', color: '#fff' }}>📝 Avaliação Final • Inversor WEG CFW500</strong>
            <span style={{ fontSize: '11px', color: '#90a4ae', display: 'block' }}>
              Aluno: <strong>{studentName}</strong> • Nota mínima para aprovação: <strong>7.0</strong>
            </span>
          </div>
          <button onClick={onClose} style={btnCloseStyle}>✕</button>
        </div>

        {!examResult ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#81d4fa' }}>
              <span>Questão {currentStep + 1} de {EXAM_QUESTIONS.length}</span>
              <span>Progresso: {Math.round(((currentStep + 1) / EXAM_QUESTIONS.length) * 100)}%</span>
            </div>

            <div style={questionBoxStyle}>
              <p style={{ fontSize: '13px', color: '#fff', fontWeight: 'bold', margin: '0 0 12px 0', lineHeight: '1.5' }}>
                {q.question}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {q.options.map((opt, idx) => {
                  const isSelected = answers[q.id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(q.id, idx)}
                      style={{
                        ...optionBtnStyle,
                        background: isSelected ? '#0288d1' : '#1a202c',
                        borderColor: isSelected ? '#29b6f6' : '#2d3748',
                        color: isSelected ? '#fff' : '#cbd5e1',
                      }}
                    >
                      <span style={{ fontWeight: 'bold', marginRight: '8px' }}>{String.fromCharCode(65 + idx)})</span> {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                onClick={handleNext}
                disabled={answers[q.id] === undefined}
                style={{
                  ...btnNextStyle,
                  opacity: answers[q.id] === undefined ? 0.5 : 1,
                  cursor: answers[q.id] === undefined ? 'not-allowed' : 'pointer',
                }}
              >
                {currentStep === EXAM_QUESTIONS.length - 1 ? 'Finalizar e Enviar Prova ➔' : 'Próxima Questão ➔'}
              </button>
            </div>
          </div>
        ) : (
          <div style={resultContainerStyle}>
            <span style={{ fontSize: '42px' }}>{examResult.passed ? '🏆' : '❌'}</span>
            <h3 style={{ fontSize: '18px', color: examResult.passed ? '#00e676' : '#ff5252', margin: '6px 0' }}>
              {examResult.passed ? 'Parabéns! Você foi Aprovado!' : 'Não foi desta vez. Tente novamente!'}
            </h3>
            <p style={{ fontSize: '12px', color: '#cfd8dc', textAlign: 'center', maxWidth: '360px', margin: '0 0 14px 0' }}>
              Sua nota final foi <strong style={{ color: '#fff', fontSize: '15px' }}>{examResult.score.toFixed(1)}</strong>.
              {examResult.passed
                ? ' Seu certificado oficial GAF Treinamentos foi gerado e já está disponível na aba "Meus Certificados".'
                : ' Revise os módulos teóricos e refaça a avaliação para atingir a nota mínima de 7.0.'}
            </p>
            <button onClick={onClose} style={btnFinishStyle}>
              {examResult.passed ? 'Ver Certificado Emitido' : 'Tentar Novamente'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.85)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  padding: '16px',
};

const modalCardStyle: React.CSSProperties = {
  background: '#14181f',
  border: '1px solid #30363d',
  borderRadius: '14px',
  padding: '20px',
  maxWidth: '520px',
  width: '100%',
  boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
};

const modalHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #232b36',
  paddingBottom: '10px',
  marginBottom: '14px',
};

const btnCloseStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#90a4ae',
  fontSize: '18px',
  cursor: 'pointer',
};

const questionBoxStyle: React.CSSProperties = {
  background: '#0d1117',
  border: '1px solid #21262d',
  borderRadius: '8px',
  padding: '14px',
};

const optionBtnStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '6px',
  border: '1px solid',
  fontSize: '11px',
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
};

const btnNextStyle: React.CSSProperties = {
  background: '#00e676',
  color: '#000',
  border: 'none',
  borderRadius: '6px',
  padding: '8px 16px',
  fontSize: '12px',
  fontWeight: 'bold',
};

const resultContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '20px 0',
};

const btnFinishStyle: React.CSSProperties = {
  background: '#0288d1',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '9px 18px',
  fontSize: '12px',
  fontWeight: 'bold',
  cursor: 'pointer',
};