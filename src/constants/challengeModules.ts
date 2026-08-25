import { CourseModule } from '../types/tutorial';
import { InverterState, ParameterKey } from '../types/cfw500';

// Helpers de validação de estado e parâmetros
const getParam = (state: InverterState, key: ParameterKey): number => {
  return state.parameters[key]?.currentValue ?? 0;
};

const getDI = (state: InverterState, inputNum: 1 | 2 | 3 | 4): boolean => {
  const key = `di${inputNum}` as keyof typeof state.digitalInputs;
  return Boolean(state.digitalInputs[key]);
};

export const CHALLENGE_MODULES: CourseModule[] = [
  // =========================================================================
  // MÓDULO 10: DIAGNÓSTICO DE FALHAS E DEFEITOS EM CAMPO (TROUBLESHOOTING)
  // =========================================================================
  {
    id: 'mod-challenge-1',
    moduleNumber: 10,
    title: 'Desafios de Diagnóstico e Defeitos Ocultos',
    icon: '🔍',
    description: 'Casos reais de máquinas paradas em campo. Descubra a causa raiz e recupere a operação.',
    lessons: [
      {
        id: 'c1-1',
        title: 'Desafio 1: O Motor Não Liga em Modo Remoto',
        durationMin: 10,
        type: 'PRACTICE',
        description: 'O operador fechou a chave externa DI1, o inversor está em REM, mas o motor permanece inerte.',
        steps: [
          {
            id: 'cs1-1',
            title: 'Diagnosticar e Liberar Origem de Comando Gira/Para',
            instruction: 'Descubra por que o inversor ignora as chaves dos bornes e ajuste o parâmetro de comando remoto para aceitar os bornes DI.',
            tip: 'Verifique no manual qual parâmetro define a origem de partida em Modo Remoto (P0227).',
            isCompleted: (state: InverterState) => getParam(state, 'P0227') === 1
          },
          {
            id: 'cs1-2',
            title: 'Diagnosticar a Função da Chave DI1',
            instruction: 'Verifique a função atribuída à entrada DI1 e garanta que ela esteja parametrizada como Gira/Para.',
            tip: 'Analise o parâmetro P0263 (Função da entrada DI1).',
            isCompleted: (state: InverterState) => getParam(state, 'P0263') === 1
          },
          {
            id: 'cs1-3',
            title: 'Partir a Máquina com Sucesso',
            instruction: 'Comute para REM e acione a chave DI1 no painel para validar o funcionamento do motor.',
            tip: 'O display deve sair de rdy e começar a acelerar.',
            isCompleted: (state: InverterState) =>
              (state.controlSource === 'REM' || (state as any).isLocal === false) &&
              getDI(state, 1) &&
              (state.motorStatus === 'RUNNING' || state.outputFrequency > 0.5)
          }
        ]
      },
      {
        id: 'c1-2',
        title: 'Desafio 2: Falha Térmica e Rotação Abaixo do Limite em Bomba',
        durationMin: 12,
        type: 'PRACTICE',
        description: 'Uma bomba centrífuga não pode operar abaixo de 20 Hz por risco de cavitação e queima por falta de fluxo.',
        steps: [
          {
            id: 'cs2-1',
            title: 'Definir o Piso de Proteção de Frequência Mínima',
            instruction: 'Configure a frequência mínima do sistema para que nunca desça de 20.0 Hz mesmo com o potenciômetro no zero.',
            tip: 'Ajuste o parâmetro P0133.',
            isCompleted: (state: InverterState) => {
              const fMin = getParam(state, 'P0133');
              return fMin >= 19.5 && fMin <= 20.5;
            }
          },
          {
            id: 'cs2-2',
            title: 'Ajustar o Limite Térmico de Corrente do Motor',
            instruction: 'A placa da bomba indica corrente máxima contínua de 4.8 A. Ajuste a corrente de sobrecarga térmica para 4.8 A.',
            tip: 'Localize o parâmetro de limite de sobrecarga (P0156).',
            isCompleted: (state: InverterState) => {
              const iLim = getParam(state, 'P0156');
              return iLim >= 4.7 && iLim <= 4.9;
            }
          },
          {
            id: 'cs2-3',
            title: 'Testar com Potenciômetro no Mínimo',
            instruction: 'Ligue o motor em REM (DI1=ON) e gire o potenciômetro AI1 todo para a esquerda (0V). O motor deve se manter estável a 20.0 Hz.',
            tip: 'Verifique se a frequência de saída não cai para 0 Hz.',
            isCompleted: (state: InverterState) =>
              (state.controlSource === 'REM' || (state as any).isLocal === false) &&
              getDI(state, 1) &&
              state.outputFrequency >= 19.0 &&
              state.outputFrequency <= 21.0
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 11: COMISSIONAMENTO DE MÁQUINAS ESPECÍFICAS
  // =========================================================================
  {
    id: 'mod-challenge-2',
    moduleNumber: 11,
    title: 'Comissionamento de Aplicações e Máquinas Industriais',
    icon: '🏭',
    description: 'Parametrização completa conforme a folha de dados mecânica da máquina do cliente.',
    lessons: [
      {
        id: 'c2-1',
        title: 'Máquina 1: Esteira Transportadora de Embalagens Frágeis',
        durationMin: 15,
        type: 'PRACTICE',
        description: 'Requisitos do projeto: rampa de partida ultra suave em curva S (8s) para evitar queda de frascos e parada rápida por frenagem CC (1.5s).',
        steps: [
          {
            id: 'cs3-1',
            title: 'Parametrizar Rampa em Curva S',
            instruction: 'Modifique o tipo de aceleração de linear para Curva S para evitar solavancos na partida dos frascos.',
            tip: 'Verifique o parâmetro P0104.',
            isCompleted: (state: InverterState) => getParam(state, 'P0104') === 1
          },
          {
            id: 'cs3-2',
            title: 'Ajustar Tempo de Aceleração para 8.0 s',
            instruction: 'Ajuste a rampa de subida da esteira para exatamente 8.0 segundos.',
            tip: 'Altere o parâmetro P0100.',
            isCompleted: (state: InverterState) => {
              const acc = getParam(state, 'P0100');
              return acc >= 7.8 && acc <= 8.2;
            }
          },
          {
            id: 'cs3-3',
            title: 'Configurar Duração da Frenagem CC na Parada',
            instruction: 'Configure o tempo de injeção de corrente contínua na parada para travar a esteira em 1.5 s.',
            tip: 'Ajuste o parâmetro P0150.',
            isCompleted: (state: InverterState) => {
              const tBrake = getParam(state, 'P0150');
              return tBrake >= 1.4 && tBrake <= 1.6;
            }
          },
          {
            id: 'cs3-4',
            title: 'Acionar e Validar o Ciclo Operacional',
            instruction: 'Em modo Local, pressione a tecla I (RUN), eleve a velocidade para 30.0 Hz e confira a parametrização.',
            tip: 'Veja o ciclo completo da esteira no display.',
            isCompleted: (state: InverterState) =>
              getParam(state, 'P0104') === 1 &&
              getParam(state, 'P0100') >= 7.8 &&
              getParam(state, 'P0150') >= 1.4
          }
        ]
      },
      {
        id: 'c2-2',
        title: 'Máquina 2: Exaustor Industrial com Zona de Ressonância Crítica',
        durationMin: 15,
        type: 'PRACTICE',
        description: 'Um exaustor industrial possui vibração destrutiva aos 25.0 Hz na carcaça. O inversor deve saltar essa faixa mecânica.',
        steps: [
          {
            id: 'cs4-1',
            title: 'Inserir Frequência de Salto / Bypass Mecânico',
            instruction: 'Parametrize o ponto de ressonância do exaustor para 25.0 Hz para proteger a estrutura contra vibração destrutiva.',
            tip: 'Verifique o parâmetro P0169.',
            isCompleted: (state: InverterState) => {
              const fSkip = getParam(state, 'P0169');
              return fSkip >= 24.5 && fSkip <= 25.5;
            }
          },
          {
            id: 'cs4-2',
            title: 'Programar Modo Sleep para Economia Noturna',
            instruction: 'Quando o duto fechar e a frequência cair para 18.0 Hz, o inversor deve entrar em modo dormir após 6.0 segundos.',
            tip: 'Ajuste P0217 para 18.0 Hz e P0218 para 6.0 s.',
            isCompleted: (state: InverterState) => {
              const p217 = getParam(state, 'P0217');
              const p218 = getParam(state, 'P0218');
              return p217 >= 17.5 && p217 <= 18.5 && p218 >= 5.5 && p218 <= 6.5;
            }
          },
          {
            id: 'cs4-3',
            title: 'Validar Parametrização Final do Exaustor',
            instruction: 'Garanta que P0000 esteja desbloqueado com senha 5 e todos os limites de segurança preenchidos.',
            tip: 'Verifique o painel do simulador.',
            isCompleted: (state: InverterState) =>
              getParam(state, 'P0169') >= 24.5 &&
              getParam(state, 'P0217') >= 17.5 &&
              getParam(state, 'P0218') >= 5.5
          }
        ]
      }
    ]
  }
];