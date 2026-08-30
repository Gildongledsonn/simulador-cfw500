import { CourseModule } from '../types/tutorial';

export const COURSE_MODULES_L1000: CourseModule[] = [
  {
    id: 'mod_l1000_1',
    moduleNumber: 1,
    title: 'Comissionamento do Yaskawa L1000 & Máquinas PMSM',
    description: 'Controle de elevadores em malha fechada, segurança EN 81-20 e acionamento de freio eletromecânico.',
    icon: '🛗',
    lessons: [
      {
        id: 'l1000_l1_teoria_seguranca',
        title: 'Cadeia de Segurança e Liberação do Freio',
        type: 'THEORY',
        durationMin: 12,
        description: 'Requisitos de portas de pavimento, contato de trinco e curva Jerk de conforto.',
        theoryData: {
          title: 'Arquitetura de Controle do Yaskawa L1000',
          content: [
            'O inversor Yaskawa L1000 opera em controle vetorial de fluxo orientado (FOC) com feedback de encoder absoluto PG-X3.',
            'A partida só é autorizada se a linha de segurança estiver 100% íntegra.',
            'O inversor sincroniza a rampa de torque com a bobina do freio mecânico para eliminar recuos na partida.'
          ],
          diagramInfo: '[Linha Seg. OK] -> [S1/S2 Ativo] -> [Pré-Torque Célula Carga] -> [Abre Freio] -> [Curva S]',
          keyTakeaway: 'O comando S1 realiza a subida e S2 realiza a descida de forma totalmente independente.'
        }
      },
      {
        id: 'l1000_l2_reversao_bornes',
        title: 'Partida Independente de Subida (S1) e Descida (S2)',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Teste o comando independente de reversão por bornes no inversor L1000.',
        steps: [
          {
            id: 'l1000_s1_remoto',
            title: 'Habilitar Modo Remoto na IHM',
            instruction: 'Pressione LOC/REM no teclado do L1000 para habilitar os bornes de manobra S1 a S4.',
            isCompleted: (s) => String(s.controlSource || '').toUpperCase() === 'REM' || (s as any).isLocal === false
          },
          {
            id: 'l1000_s2_subir',
            title: 'Acionar Borne S1 (Subida)',
            instruction: 'Ligue o borne S1 e verifique se o rotor gira em sentido horário (▲ SUBINDO).',
            isCompleted: (s) => {
              const di1 = Boolean((s.digitalInputs as any)?.di1 || (s.digitalInputs as any)?.DI1 || (s.digitalInputs as any)?.[0] || (s.digitalInputs as any)?.['1']);
              const isFwd = s.isForwardDirection !== false;
              const isRun = s.motorStatus === 'RUNNING' || Math.abs(Number(s.outputFrequency ?? 0)) > 0.1;
              return isRun && isFwd && di1;
            }
          },
          {
            id: 'l1000_s3_descer_direto',
            title: 'Desligar S1 e Acionar Borne S2 (Descida)',
            instruction: 'Desligue S1 e acione o borne S2 para descer a cabine (▼ DESCENDO).',
            isCompleted: (s) => {
              const di1 = Boolean((s.digitalInputs as any)?.di1 || (s.digitalInputs as any)?.DI1);
              const di2 = Boolean((s.digitalInputs as any)?.di2 || (s.digitalInputs as any)?.DI2 || (s.digitalInputs as any)?.[1] || (s.digitalInputs as any)?.['2']);
              const isRev = s.isForwardDirection === false || di2;
              const isRun = s.motorStatus === 'RUNNING' || Math.abs(Number(s.outputFrequency ?? 0)) > 0.1;
              return isRun && isRev && di2 && !di1;
            }
          }
        ]
      }
    ]
  }
];