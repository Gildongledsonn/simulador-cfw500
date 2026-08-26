import { CourseModule } from '../types/tutorial';

// Helper de leitura de parâmetros
const getParam = (state: any, code: string): number => {
  if (!state || !state.parameters) return 0;
  const item = state.parameters[code];
  if (item === undefined || item === null) return 0;
  if (typeof item === 'object' && 'currentValue' in item) {
    return Number(item.currentValue ?? 0);
  }
  return Number(item ?? 0);
};

// Helper de leitura das entradas digitais (DI1 a DI4)
const getDI = (state: any, index: number): boolean => {
  if (!state) return false;
  if (Array.isArray(state.digitalInputs)) {
    return Boolean(state.digitalInputs[index - 1]);
  }
  if (state.digitalInputs && typeof state.digitalInputs === 'object') {
    return Boolean(
      state.digitalInputs[`DI${index}`] ??
      state.digitalInputs[`di${index}`] ??
      state.digitalInputs[String(index)]
    );
  }
  return false;
};

export const COURSE_MODULES_CFW300: CourseModule[] = [
  // =========================================================================
  // MÓDULO 1 (CFW300): IHM COMPACTA E LIBERAÇÃO DE PARÂMETROS
  // =========================================================================
  {
    id: 'cfw300-mod-1',
    moduleNumber: 1,
    title: 'IHM do CFW300 e Desbloqueio P0000',
    icon: '⚡',
    description: 'Navegação pela IHM compacta do inversor CFW300, liberação de escrita no P0000 e acionamento local.',
    lessons: [
      {
        id: 'c300-l1-1',
        title: 'Operação da IHM Compacta e Senha Mestra',
        durationMin: 5,
        type: 'THEORY',
        description: 'Conheça o display LED de 4 dígitos e a lógica de parametrização do inversor micro CFW300.',
        theoryData: {
          title: 'Estrutura da IHM e Parâmetro P0000',
          content: [
            'O WEG CFW300 é um microinversor compacto voltado para máquinas e esteiras de pequeno porte.',
            'Por padrão de fábrica da WEG, para alterar parâmetros de ajuste o usuário deve inserir o valor 5 no parâmetro P0000.',
            'A tecla PROG seleciona o parâmetro e confirma o novo valor programado.'
          ],
          diagramInfo: '[DISPLAY: 0.0] ➔ (PROG) ➔ [P0000] ➔ (PROG) ➔ [VALOR: 5] ➔ (PROG) ➔ [LIBERADO]',
          keyTakeaway: 'Sempre insira P0000 = 5 antes de iniciar a parametrização do inversor CFW300.'
        }
      },
      {
        id: 'c300-l1-2',
        title: 'Prática: Desbloqueio e Partida Local no CFW300',
        durationMin: 8,
        type: 'PRACTICE',
        description: 'Insira a senha mestra 5 no P0000, verifique o modo Local e dê a primeira partida.',
        steps: [
          {
            id: 'c300-s1-1',
            title: 'Desbloquear o Acesso no P0000',
            instruction: 'Acesse o parâmetro P0000, pressione PROG, insira o valor 5 e pressione PROG para confirmar.',
            tip: 'O parâmetro P0000 deve ficar com o valor 5.',
            isCompleted: (state: any) => getParam(state, 'P0000') === 5 || state.isUnlocked === true
          },
          {
            id: 'c300-s1-2',
            title: 'Verificar Modo Local',
            instruction: 'Certifique-se de que o inversor está em modo Local (LED LOC aceso).',
            tip: 'Use a tecla LOC/REM se necessário.',
            isCompleted: (state: any) => state.controlSource === 'LOC' || state.isLocal === true
          },
          {
            id: 'c300-s1-3',
            title: 'Ligar e Acelerar o Motor',
            instruction: 'Pressione a tecla I (RUN) e eleve a frequência acima de 20.0 Hz usando as setas ▲.',
            tip: 'A frequência de saída deve subir no display.',
            isCompleted: (state: any) =>
              (state.motorStatus === 'RUNNING' || (state.outputFrequency ?? 0) > 0.1) &&
              ((state.outputFrequency ?? 0) >= 20.0 || (state.targetFrequency ?? 0) >= 20.0)
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 2 (CFW300): DADOS DE PLACA E CURVA V/F ESCALAR
  // =========================================================================
  {
    id: 'cfw300-mod-2',
    moduleNumber: 2,
    title: 'Dados do Motor e Parametrização Escalar V/F',
    icon: '⚙️',
    description: 'Inserção dos dados de catálogo do motor e configuração dos limites de frequência P0133 e P0134.',
    lessons: [
      {
        id: 'c300-l2-1',
        title: 'Configuração da Faixa Operacional e Placa',
        durationMin: 6,
        type: 'THEORY',
        description: 'Como o CFW300 calcula a curva V/F e protege contra rotação excessiva.',
        theoryData: {
          title: 'Limites de Frequência no CFW300',
          content: [
            '• P0133: Frequência mínima do motor (padrão 0.0 Hz).',
            '• P0134: Frequência máxima de saída permitida (padrão 60.0 Hz ou até 400.0 Hz em retíficas).',
            '• P0156: Corrente de sobrecarga térmica para proteção do motor.'
          ],
          diagramInfo: 'P0133 (Frequência Mínima) ➔ Faixa Linear V/F ➔ P0134 (Frequência Máxima)',
          keyTakeaway: 'Sempre configure P0133 e P0134 antes de liberar o inversor para produção.'
        }
      },
      {
        id: 'c300-l2-2',
        title: 'Prática: Programar Frequência Máxima e Rampas',
        durationMin: 10,
        type: 'PRACTICE',
        description: 'Ajuste a frequência máxima P0134 para 65.0 Hz e a aceleração P0100 para 2.5s.',
        steps: [
          {
            id: 'c300-s2-1',
            title: 'Ajustar Frequência Máxima (P0134 = 65.0 Hz)',
            instruction: 'Acesse o parâmetro P0134 na IHM e configure o valor para 65.0 Hz.',
            tip: 'Defina P0134 em 65.0.',
            isCompleted: (state: any) => {
              const fMax = getParam(state, 'P0134');
              return fMax >= 64.0 && fMax <= 66.0;
            }
          },
          {
            id: 'c300-s2-2',
            title: 'Programar Tempo de Aceleração Rápida (P0100 = 2.5s)',
            instruction: 'Acesse P0100 e ajuste o tempo de subida para 2.5 segundos.',
            tip: 'Ajuste P0100 = 2.5.',
            isCompleted: (state: any) => {
              const acc = getParam(state, 'P0100');
              return acc >= 2.3 && acc <= 2.7;
            }
          },
          {
            id: 'c300-s2-3',
            title: 'Testar e Validar Resposta',
            instruction: 'Ligue o motor em modo Local e comprove a aceleração até a velocidade máxima.',
            tip: 'Acelere o motor com a tecla ▲ até atingir a nova velocidade.',
            isCompleted: (state: any) =>
              (state.motorStatus === 'RUNNING' || (state.outputFrequency ?? 0) > 0.5) &&
              (state.outputFrequency ?? 0) >= 60.0
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 3 (CFW300): ENTRADAS DIGITAIS E MÓDULOS PLUG-IN
  // =========================================================================
  {
    id: 'cfw300-mod-3',
    moduleNumber: 3,
    title: 'Entradas Digitais e Bornes Remotos do CFW300',
    icon: '🔌',
    description: 'Comando por chaves a 2 fios (Gira/Para e Sentido de Giro) nas entradas digitais integradas.',
    lessons: [
      {
        id: 'c300-l3-1',
        title: 'Régua de Controle e Funções P0263 a P0266',
        durationMin: 7,
        type: 'THEORY',
        description: 'Atribuição de funções das entradas DI1 a DI4 no inversor compacto.',
        theoryData: {
          title: 'Configuração de Bornes no CFW300',
          content: [
            'O CFW300 possui entradas digitais configuráveis na régua de controle.',
            '• P0263: Função da entrada digital DI1 (1 = Gira/Para).',
            '• P0264: Função da entrada digital DI2 (1 = Sentido de Giro Horário/Anti-horário).',
            '• P0220: Seleção da fonte Local/Remoto.'
          ],
          diagramInfo: '[DI1: ON = RUN] | [DI2: ON = SENTIDO REV] em Modo Remoto (LED REM)',
          keyTakeaway: 'Em modo REM, o CFW300 obedece diretamente às chaves da régua de bornes.'
        }
      },
      {
        id: 'c300-l3-2',
        title: 'Prática: Partida e Reversão Remota no CFW300',
        durationMin: 10,
        type: 'PRACTICE',
        description: 'Comute para REM, ligue DI1 e realize a reversão de giro acionando DI2.',
        steps: [
          {
            id: 'c300-s3-1',
            title: 'Comutar para Modo Remoto',
            instruction: 'Pressione a tecla LOC/REM para acender o LED verde REM no inversor.',
            tip: 'Transfere o controle para os bornes.',
            isCompleted: (state: any) => state.controlSource === 'REM' || state.isLocal === false
          },
          {
            id: 'c300-s3-2',
            title: 'Ligar o Motor pela Chave DI1',
            instruction: 'Feche a chave digital DI1 para acionar o motor em sentido direto.',
            tip: 'O motor deve acelerar em FWD.',
            isCompleted: (state: any) =>
              (state.controlSource === 'REM' || state.isLocal === false) && getDI(state, 1)
          },
          {
            id: 'c300-s3-3',
            title: 'Comutar Sentido de Giro pela Chave DI2',
            instruction: 'Com DI1 ligada, acione a chave DI2 para inverter o giro para sentido anti-horário (REV).',
            tip: 'O inversor desacelera até 0 e reacelera em rotação invertida.',
            isCompleted: (state: any) =>
              (state.controlSource === 'REM' || state.isLocal === false) &&
              getDI(state, 1) &&
              getDI(state, 2)
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 4 (CFW300): DESAFIO - MICRO-ESTEIRA COM VELOCIDADES DIGITAIS
  // =========================================================================
  {
    id: 'cfw300-mod-4',
    moduleNumber: 4,
    title: 'Desafio CFW300 1: Parametrização de Micro-Esteira Seletora',
    icon: '🔍',
    description: 'Uma micro-esteira de bancada requer 2 velocidades digitais: 12.0 Hz para inspeção visual e 40.0 Hz para descarte rápido sem uso de potenciômetro.',
    lessons: [
      {
        id: 'c300-l4-1',
        title: 'Cenário: Programação de Velocidades Fixas no CFW300',
        durationMin: 12,
        type: 'PRACTICE',
        description: 'Analise os parâmetros de velocidade pré-programada (Multispeed) do CFW300 e calibre os dois estágios solicitados.',
        steps: [
          {
            id: 'c300-s4-1',
            title: 'Programar Frequência do Estágio 1 (Inspeção Lenta)',
            instruction: 'Localize na memória do inversor a primeira frequência da tabela de velocidades pré-programadas e ajuste para 12.0 Hz.',
            tip: 'Acesse o primeiro estágio de multispeed do CFW300.',
            isCompleted: (state: any) => {
              const v = getParam(state, 'P0124');
              return v >= 11.5 && v <= 12.5;
            }
          },
          {
            id: 'c300-s4-2',
            title: 'Programar Frequência do Estágio 2 (Descarte Rápido)',
            instruction: 'Localize a segunda frequência da tabela de velocidades pré-programadas e ajuste para 40.0 Hz.',
            tip: 'Acesse o segundo estágio de multispeed do CFW300.',
            isCompleted: (state: any) => {
              const v = getParam(state, 'P0125');
              return v >= 39.0 && v <= 41.0;
            }
          },
          {
            id: 'c300-s4-3',
            title: 'Validar Seleção em Modo Remoto',
            instruction: 'Em modo REM, ligue a chave de partida DI1 e acione a chave seletora DI3 para comutar para a velocidade rápida.',
            tip: 'A rotação deve atingir a velocidade correspondente ao estágio 2.',
            isCompleted: (state: any) =>
              (state.controlSource === 'REM' || state.isLocal === false) &&
              getDI(state, 1) &&
              getDI(state, 3)
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 5 (CFW300): DESAFIO - PROTEÇÃO DE VENTILADOR COMPACTO
  // =========================================================================
  {
    id: 'cfw300-mod-5',
    moduleNumber: 5,
    title: 'Desafio CFW300 2: Diagnóstico e Proteção Térmica em Ventilador',
    icon: '🌪️',
    description: 'Um micro-ventilador de painel está sofrendo sobreaquecimento por operação em rampa excessivamente curta. Reajuste a dinâmica e a corrente térmica.',
    lessons: [
      {
        id: 'c300-l5-1',
        title: 'Cenário: Sobrecarga na Partida e Parametrização Segura',
        durationMin: 12,
        type: 'PRACTICE',
        description: 'Suavize a partida ajustando a rampa para 6.0s e limite a corrente térmica em 2.2 A.',
        steps: [
          {
            id: 'c300-s5-1',
            title: 'Suavizar Tempo de Aceleração da Hélice',
            instruction: 'Aumente o tempo de aceleração do ventilador para 6.0 segundos para evitar picos de partida no motor monofásico/trifásico.',
            tip: 'Ajuste o tempo da rampa de subida principal.',
            isCompleted: (state: any) => {
              const acc = getParam(state, 'P0100');
              return acc >= 5.8 && acc <= 6.2;
            }
          },
          {
            id: 'c300-s5-2',
            title: 'Ajustar Proteção de Corrente Térmica',
            instruction: 'Ajuste o parâmetro de sobrecarga térmica do CFW300 para 2.2 A conforme a placa do ventilador.',
            tip: 'Localize a proteção de corrente de sobrecarga térmica.',
            isCompleted: (state: any) => {
              const iLim = getParam(state, 'P0156');
              return iLim >= 2.1 && iLim <= 2.3;
            }
          },
          {
            id: 'c300-s5-3',
            title: 'Testar e Validar Operação Normal',
            instruction: 'Acione o motor em modo Local e comprove a partida suave até atingir a velocidade de regime.',
            tip: 'O motor deve partir suavemente e permanecer operando sem disparos.',
            isCompleted: (state: any) =>
              (state.motorStatus === 'RUNNING' || (state.outputFrequency ?? 0) > 0.5) &&
              getParam(state, 'P0100') >= 5.8
          }
        ]
      }
    ]
  }
];