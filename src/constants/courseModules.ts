import { CourseModule } from '../types/tutorial';

// Helper seguro de leitura compatível com qualquer estrutura interna do state
const getParam = (state: any, code: string): number => {
  if (!state || !state.parameters) return 0;
  const item = state.parameters[code];
  if (item === undefined || item === null) return 0;
  if (typeof item === 'object' && 'currentValue' in item) {
    return Number(item.currentValue ?? 0);
  }
  return Number(item ?? 0);
};

// Helper seguro para ler entradas digitais (DI1 a DI4)
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

export const COURSE_MODULES: CourseModule[] = [
  // =========================================================================
  // MÓDULO 1: FUNDAMENTOS, IHM E PRIMEIRO ACIONAMENTO
  // =========================================================================
  {
    id: 'mod-1',
    moduleNumber: 1,
    title: 'Fundamentos da IHM e Primeiro Acionamento',
    icon: '⚡',
    description: 'Navegação pelas teclas da IHM, liberação de acesso aos parâmetros e partida local.',
    lessons: [
      {
        id: 'l1-1',
        title: 'Estrutura da IHM e Senha de Acesso (P0000)',
        durationMin: 5,
        type: 'THEORY',
        description: 'Aprenda como a IHM WEG opera e como desbloquear a edição de parâmetros.',
        theoryData: {
          title: 'Proteção por Senha e Modos da IHM',
          content: [
            'A IHM do WEG CFW500 possui 3 modos de operação no display: Modo Monitor (leitura de Hz, A, V), Modo Seleção de Parâmetro (Pxxxx) e Modo Edição (valor piscando).',
            'Por segurança de fábrica, para alterar qualquer parâmetro de controle é necessário inserir a senha mestra no parâmetro P0000 (valor padrão: 5).',
            'Pressione PROG para entrar no modo de edição, ajuste com as setas ▲ e ▼ e confirme com PROG.'
          ],
          diagramInfo: '[DISPLAY MONIT: 0.0Hz] ➔ (PROG) ➔ [P0000] ➔ (PROG) ➔ [EDITAR: 5] ➔ (PROG) ➔ [ACESSO LIBERADO]',
          keyTakeaway: 'Sempre defina P0000 = 5 antes de tentar alterar qualquer parâmetro operacional.'
        }
      },
      {
        id: 'l1-2',
        title: 'Prática: Desbloqueio e Partida em Modo Local',
        durationMin: 8,
        type: 'PRACTICE',
        description: 'Desbloqueie o inversor no P0000, garanta o modo Local e acione o motor.',
        steps: [
          {
            id: 's1-1',
            title: 'Desbloquear Acesso no P0000 (Definir como 5)',
            instruction: 'Na IHM, aperte PROG em P0000, ajuste o valor para 5 com a seta ▲ e aperte PROG para salvar.',
            tip: 'O inversor precisa estar com a senha 5 para liberar a parametrização.',
            isCompleted: (state: any) => getParam(state, 'P0000') === 5 || state.isUnlocked === true
          },
          {
            id: 's1-2',
            title: 'Garantir Modo Local (LOC)',
            instruction: 'Pressione a tecla LOC/REM se necessário até o LED verde LOC acender no topo da IHM.',
            tip: 'O inversor só aceita o comando RUN do teclado se estiver em modo LOC.',
            isCompleted: (state: any) => state.controlSource === 'LOC' || state.isLocal === true
          },
          {
            id: 's1-3',
            title: 'Ligar o Motor e Elevar Frequência',
            instruction: 'Aperte a tecla verde I (RUN) e use a seta ▲ para acelerar o motor acima de 15.0 Hz.',
            tip: 'Observe o visualizador do motor girando e a frequência de saída subir.',
            isCompleted: (state: any) => {
              const freq = state.outputFrequency ?? 0;
              const target = state.targetFrequency ?? 0;
              const p121 = getParam(state, 'P0121');
              const isRunning = state.motorStatus === 'RUNNING' || freq > 0.1 || target > 0.1;
              return isRunning && (freq >= 15.0 || target >= 15.0 || p121 >= 15.0);
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 2: DADOS DE PLACA DO MOTOR E RAMPAS
  // =========================================================================
  {
    id: 'mod-2',
    moduleNumber: 2,
    title: 'Dados do Motor e Rampas de Aceleração/Desaceleração',
    icon: '⚙️',
    description: 'Configuração da curva V/F, corrente nominal e tempos de rampa (P0100 e P0101).',
    lessons: [
      {
        id: 'l2-1',
        title: 'Rampas Lineares de Aceleração e Parada',
        durationMin: 6,
        type: 'THEORY',
        description: 'Compreenda a relação entre inércia da carga, tempo de rampa e corrente de pico.',
        theoryData: {
          title: 'Ajuste de Rampas: P0100 (Aceleração) e P0101 (Desaceleração)',
          content: [
            'O parâmetro P0100 define o tempo em segundos que o inversor leva para acelerar da frequência zero até 60Hz.',
            'O parâmetro P0101 define o tempo para desacelerar de 60Hz até a parada completa.',
            'Rampas muito curtas em cargas pesadas causam sobrecorrente (F070) na aceleração ou sobretensão (F022) na desaceleração.'
          ],
          diagramInfo: 'P0100 (0 a 60Hz em T seg) | P0101 (60Hz a 0 em T seg)',
          keyTakeaway: 'Ajuste P0100 e P0101 de acordo com o peso da carga para evitar disparos térmicos.'
        }
      },
      {
        id: 'l2-2',
        title: 'Prática: Parametrizar Rampa Rápida e Rampa Suave',
        durationMin: 10,
        type: 'PRACTICE',
        description: 'Configure P0100 para 3.0s e P0101 para 2.0s e teste o comportamento dinâmico.',
        steps: [
          {
            id: 's2-1',
            title: 'Ajustar Rampa de Aceleração (P0100 = 3.0s)',
            instruction: 'Acesse o parâmetro P0100 na IHM, pressione PROG, ajuste para 3.0 segundos e pressione PROG.',
            tip: 'Pressione PROG em P0100, ajuste para 3.0 com as setas e salve com PROG.',
            isCompleted: (state: any) => {
              const val = getParam(state, 'P0100');
              return val >= 2.8 && val <= 3.2;
            }
          },
          {
            id: 's2-2',
            title: 'Ajustar Rampa de Desaceleração (P0101 = 2.0s)',
            instruction: 'Acesse o parâmetro P0101 na IHM, pressione PROG, configure para 2.0 segundos e pressione PROG.',
            tip: 'Isso garantirá uma frenagem controlada rápida de 2 segundos.',
            isCompleted: (state: any) => {
              const val = getParam(state, 'P0101');
              return val >= 1.8 && val <= 2.2;
            }
          },
          {
            id: 's2-3',
            title: 'Testar Resposta Dinâmica (Ligar e Parar)',
            instruction: 'Ligue o motor pela tecla I (RUN), aguarde acelerar e em seguida pressione a tecla O (STOP) para validar a frenagem.',
            tip: 'O inversor desacelerará até 0 Hz em 2 segundos.',
            isCompleted: (state: any) => (state.motorStatus === 'READY' || state.motorStatus === 'STOPPED') && state.outputFrequency <= 0.5
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 3: ENTRADAS DIGITAIS E MODO REMOTO
  // =========================================================================
  {
    id: 'mod-3',
    moduleNumber: 3,
    title: 'Entradas Digitais (DI1 a DI4) e Modo Remoto',
    icon: '🔌',
    description: 'Comando por chaves externas de borne com controle de partida e reversão de rotação.',
    lessons: [
      {
        id: 'l3-1',
        title: 'Comando a 2 Fios (Gira/Para) e Sentido de Giro',
        durationMin: 6,
        type: 'THEORY',
        description: 'Como configurar as funções das entradas digitais P0263 a P0266 e a comutação REMOTO.',
        theoryData: {
          title: 'Configuração dos Bornes da Régua de Controle',
          content: [
            'O WEG CFW500 possui entradas digitais DI1 a DI4 configuráveis para comandos externos.',
            'O parâmetro P0263 define a função da entrada digital DI1 (Padrão: 1 = Gira/Para a 2 fios). Quando DI1 recebe 24V (chave fechada), o motor parte; quando abre, o motor desacelera até parar.',
            'O parâmetro P0264 define a função da entrada digital DI2 (Padrão: 1 = Sentido de Giro Horário/Anti-horário). Com DI2 fechada o motor inverte para REV.',
            'Para que o inversor responda às chaves DI1 e DI2, o modo de controle deve estar comutado para REMOTO (LED REM aceso).'
          ],
          diagramInfo: '[P0000=5] ➔ [LED REM ACESO] ➔ [DI1: ON = PARTIDA] ➔ [DI2: ON = SENTIDO REV]',
          keyTakeaway: 'Em modo Remoto, os botões I (RUN) e ▲/▼ da IHM ficam inativos para comando, transferindo o controle total para os bornes DI1 e DI2.'
        }
      },
      {
        id: 'l3-2',
        title: 'Prática: Ligar e Inverter Rotação pelos Bornes Externos',
        durationMin: 10,
        type: 'PRACTICE',
        description: 'Comute para modo Remoto, acione a partida pela chave DI1 e execute a inversão de giro pela chave DI2.',
        steps: [
          {
            id: 's3-1',
            title: 'Comutar para Modo Remoto (LED REM Aceso)',
            instruction: 'Pressione o botão LOC/REM na IHM até o LED verde REM acender no topo da IHM.',
            tip: 'Isso habilita o circuito a aceitar os comandos vindos das chaves de borne DI1 a DI4.',
            isCompleted: (state: any) => state.controlSource === 'REM' || state.isLocal === false
          },
          {
            id: 's3-2',
            title: 'Ligar o Motor pela Chave Externa DI1',
            instruction: 'Com o inversor em REM, clique na chave DI1 no painel de bornes para fechar o contato (posição ON).',
            tip: 'Observe o motor acelerar em sentido horário (FWD) até a velocidade de referência.',
            isCompleted: (state: any) => (state.controlSource === 'REM' || state.isLocal === false) && getDI(state, 1)
          },
          {
            id: 's3-3',
            title: 'Inverter Sentido de Giro pela Chave Externa DI2',
            instruction: 'Com a chave DI1 ligada, clique na chave DI2 para fechar o contato e acionar a reversão.',
            tip: 'O inversor desacelerará até 0 Hz e reacelerará em sentido anti-horário (REV).',
            isCompleted: (state: any) => (state.controlSource === 'REM' || state.isLocal === false) && getDI(state, 1) && getDI(state, 2)
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 4: VELOCIDADES PRÉ-PROGRAMADAS (MULTISPEED VIA DI3)
  // =========================================================================
  {
    id: 'mod-4',
    moduleNumber: 4,
    title: 'Velocidades Fixas Pré-Programadas (Multispeed)',
    icon: '📊',
    description: 'Seleção digital de frequências pré-programadas através da comutação da entrada digital DI3.',
    lessons: [
      {
        id: 'l4-1',
        title: 'Tabela Lógica de Multispeed no CFW500',
        durationMin: 7,
        type: 'THEORY',
        description: 'Entenda como os parâmetros P0124 e P0125 trabalham na seleção de velocidades.',
        theoryData: {
          title: 'Controle de Velocidade em Etapas',
          content: [
            'A função Multispeed permite selecionar velocidades fixas sem precisar de potenciômetro analógico.',
            '• DI3 = OFF ➔ Frequência P0124 (Velocidade 1 / Padrão: 15.0 Hz)',
            '• DI3 = ON  ➔ Frequência P0125 (Velocidade 2 / Rápida: 35.0 Hz)',
            'Ao comutar a chave DI3, o inversor aplica a rampa suavemente até a nova frequência alvo.'
          ],
          diagramInfo: '[DI3: OFF] = P0124 (15.0 Hz) ➔ [DI3: ON] = P0125 (35.0 Hz)',
          keyTakeaway: 'Ideal para esteiras industriais com velocidade lenta para carregamento e rápida para transporte.'
        }
      },
      {
        id: 'l4-2',
        title: 'Prática: Programar e Selecionar Velocidades por DI3',
        durationMin: 12,
        type: 'PRACTICE',
        description: 'Configure P0124=15Hz, P0125=35Hz e alterne a velocidade pela chave digital DI3.',
        steps: [
          {
            id: 's4-1',
            title: 'Ajustar Frequência Multispeed 1 (P0124 = 15Hz)',
            instruction: 'Acesse o parâmetro P0124 na IHM e configure o valor para 15.0 Hz.',
            tip: 'Esta será a primeira velocidade padrão do motor.',
            isCompleted: (state: any) => {
              const val = getParam(state, 'P0124');
              return val >= 14.0 && val <= 16.0;
            }
          },
          {
            id: 's4-2',
            title: 'Ajustar Frequência Multispeed 2 (P0125 = 35Hz)',
            instruction: 'Acesse o parâmetro P0125 na IHM e configure o valor para 35.0 Hz.',
            tip: 'Esta será a segunda velocidade (mais rápida).',
            isCompleted: (state: any) => {
              const val = getParam(state, 'P0125');
              return val >= 34.0 && val <= 36.0;
            }
          },
          {
            id: 's4-3',
            title: 'Ligar em Modo Remoto e Acionar DI3',
            instruction: 'Comute para REM, ligue a chave DI1 para partir e acione a chave DI3 para comutar a rotação para 35.0 Hz.',
            tip: 'Observe no display e no motor a velocidade subir suavemente pela rampa.',
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
  // MÓDULO 5: ENTRADA ANALÓGICA E RAMPAS EM S
  // =========================================================================
  {
    id: 'mod-5',
    moduleNumber: 5,
    title: 'Entrada Analógica (0-10V) e Rampa em "S"',
    icon: '🎛️',
    description: 'Controle contínuo de rotação via sinal analógico e curvas suaves de aceleração sem trancos.',
    lessons: [
      {
        id: 'l5-1',
        title: 'Entrada Analógica AI1 e Rampa em S',
        durationMin: 6,
        type: 'THEORY',
        description: 'Dimensionamento do sinal analógico e suavização de esforços mecânicos.',
        theoryData: {
          title: 'Potenciômetro e Suavização de Cargas Críticas',
          content: [
            'A entrada analógica AI1 lê um sinal de 0 a 10V (ou 4 a 20mA).',
            '0V corresponde a 0.0 Hz e 10V corresponde à frequência máxima programada (P0134).',
            'A rampa em "S" insere uma curvatura suave no início e fim das acelerações, evitando trancos em esteiras com garrafas e elevadores de carga.'
          ],
          diagramInfo: '0V (0 Hz) ➔ 5V (30 Hz) ➔ 10V (60 Hz) com curva amortecida em "S"',
          keyTakeaway: 'A rampa em S protege correntes, correias e caixas redutoras contra choque mecânico.'
        }
      },
      {
        id: 'l5-2',
        title: 'Prática: Variar Velocidade pelo Potenciômetro Analógico',
        durationMin: 8,
        type: 'PRACTICE',
        description: 'Defina a referência remota para analógica (P0222 = 1) e acelere o motor via potenciômetro.',
        steps: [
          {
            id: 's5-1',
            title: 'Configurar Referência Remota via AI1 (P0222 = 1)',
            instruction: 'Acesse o parâmetro P0222 e ajuste para 1 (Referência Remota via Entrada Analógica AI1).',
            tip: 'Padrão WEG para controle por potenciômetro externo.',
            isCompleted: (state: any) => getParam(state, 'P0222') === 1 || getParam(state, 'P0222') === 0
          },
          {
            id: 's5-2',
            title: 'Ligar em Modo Remoto (DI1=ON)',
            instruction: 'Comute para REM e feche a chave DI1 para habilitar o acionamento do motor.',
            tip: 'O motor começará a responder proporcionalmente ao potenciômetro.',
            isCompleted: (state: any) => getDI(state, 1) && (state.motorStatus === 'RUNNING' || state.outputFrequency > 0.5)
          },
          {
            id: 's5-3',
            title: 'Ajustar Potenciômetro para mais de 40 Hz',
            instruction: 'Mova o cursor analógico para cima até atingir mais de 40.0 Hz de rotação.',
            tip: 'Veja o tacômetro e a rotação do motor aumentarem em tempo real.',
            isCompleted: (state: any) => state.outputFrequency >= 40.0
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 6: FUNÇÃO SLEEP (MODO DORMIR)
  // =========================================================================
  {
    id: 'mod-6',
    moduleNumber: 6,
    title: 'Função Sleep / Modo Dormir (P0217 e P0218)',
    icon: '💤',
    description: 'Desligamento automático inteligente para sistemas de bombeamento e economia de energia.',
    lessons: [
      {
        id: 'l6-1',
        title: 'Princípio do Modo Sleep para Economia de Energia',
        durationMin: 6,
        type: 'THEORY',
        description: 'Entenda como o inversor suspende o motor quando a demanda cai abaixo do limite.',
        theoryData: {
          title: 'Automação de Bombas de Pressurização',
          content: [
            'Em sistemas de bombeamento predial ou industrial com válvulas fechadas, o motor não precisa continuar girando em velocidade mínima.',
            'O parâmetro P0217 define a frequência de dormir (Sleep Threshold). Se a rotação cair abaixo de P0217 por um tempo maior que P0218 (Sleep Delay), o inversor suspende o motor.',
            'Assim que a demanda volta a subir, o inversor acorda automaticamente (Wake-up).'
          ],
          diagramInfo: 'Referência < P0217 durante P0218 seg ➔ Desliga Motor (0Hz) ➔ Demanda sobe ➔ Religa',
          keyTakeaway: 'Economiza eletricidade e evita o superaquecimento do fluido no interior da bomba.'
        }
      },
      {
        id: 'l6-2',
        title: 'Prática: Parametrizar Limiar de Dormir (P0217 = 20Hz)',
        durationMin: 8,
        type: 'PRACTICE',
        description: 'Configure P0217 para 20 Hz e o atraso P0218 para 5 segundos na IHM.',
        steps: [
          {
            id: 's6-1',
            title: 'Ajustar Frequência de Sleep (P0217 = 20Hz)',
            instruction: 'Acesse o parâmetro P0217 na IHM e configure o valor para 20.0 Hz.',
            tip: 'Abaixo de 20 Hz, o inversor iniciará a contagem regressiva para repouso.',
            isCompleted: (state: any) => {
              const val = getParam(state, 'P0217');
              return val >= 18.0 && val <= 22.0;
            }
          },
          {
            id: 's6-2',
            title: 'Definir Tempo de Atraso de Sleep (P0218 = 5.0s)',
            instruction: 'Acesse o parâmetro P0218 e configure para 5.0 segundos.',
            tip: 'Tempo de filtro para evitar desligamentos falsos por oscilações rápidas de pressão.',
            isCompleted: (state: any) => {
              const val = getParam(state, 'P0218');
              return val >= 4.0 && val <= 6.0;
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 7: FRENAGEM E PARADA
  // =========================================================================
  {
    id: 'mod-7',
    moduleNumber: 7,
    title: 'Frenagem por Injeção de Corrente Contínua (CC)',
    icon: '🛑',
    description: 'Parada ultrarrápida e travamento de eixo magnético em máquinas de alta inércia.',
    lessons: [
      {
        id: 'l7-1',
        title: 'Teoria da Frenagem CC (P0150 e P0151)',
        durationMin: 5,
        type: 'THEORY',
        description: 'Como a corrente contínua cria um torque de travamento no estator.',
        theoryData: {
          title: 'Frenagem Elétrica sem Resistores Externos',
          content: [
            'O inversor injeta corrente contínua nas bobinas do estator para criar um campo magnético estático que trava o rotor.',
            'O parâmetro P0150 define o tempo de duração da injeção CC na parada.',
            'O parâmetro P0151 define a frequência na qual a frenagem CC começa a atuar (normalmente abaixo de 5 Hz).'
          ],
          diagramInfo: 'Desacelera normal ➔ Atinge P0151 (5Hz) ➔ Injeta CC por P0150 seg ➔ Eixo Travado',
          keyTakeaway: 'Ideal para serras, exaustores e centrífugas industriais que precisam parar sem rodar soltas.'
        }
      },
      {
        id: 'l7-2',
        title: 'Prática: Programar Injeção CC na Parada',
        durationMin: 8,
        type: 'PRACTICE',
        description: 'Configure P0150 para 2.0s e P0151 para 5.0Hz na IHM.',
        steps: [
          {
            id: 's7-1',
            title: 'Ajustar Duração da Frenagem CC (P0150 = 2.0s)',
            instruction: 'Acesse o parâmetro P0150 e defina o tempo em 2.0 segundos.',
            tip: 'Tempo em que o campo magnético de parada atuará.',
            isCompleted: (state: any) => {
              const val = getParam(state, 'P0150');
              return val >= 1.5 && val <= 2.5;
            }
          },
          {
            id: 's7-2',
            title: 'Ajustar Frequência de Início CC (P0151 = 5.0Hz)',
            instruction: 'Acesse o parâmetro P0151 e configure para 5.0 Hz.',
            tip: 'Abaixo de 5 Hz, a rampa cessa e o freio CC atua.',
            isCompleted: (state: any) => {
              const val = getParam(state, 'P0151');
              return val >= 4.0 && val <= 6.0;
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 8: DIAGNÓSTICO DE FALHAS E RESET
  // =========================================================================
  {
    id: 'mod-8',
    moduleNumber: 8,
    title: 'Diagnóstico de Falhas (F070) e Reset Operacional',
    icon: '🚨',
    description: 'Identificação de falha de sobrecorrente e procedimento seguro de rearme.',
    lessons: [
      {
        id: 'l8-1',
        title: 'Principais Códigos de Falha do CFW500',
        durationMin: 7,
        type: 'THEORY',
        description: 'Tabela de códigos de alarme e falhas do inversor.',
        theoryData: {
          title: 'Guia de Diagnóstico de Campo',
          content: [
            '• F006: Subtensão no Link CC (tensão da rede caiu).',
            '• F070: Sobrecorrente / Curto-circuito na saída do inversor.',
            '• F072: Sobrecarga térmica no motor (Ixt).',
            '• F021: Sobretensão no barramento CC.',
            'O parâmetro P0050 armazena o histórico da última falha ocorrida.'
          ],
          diagramInfo: 'FALHA ATIVA ➔ Display pisca [F0xx] ➔ Inspecionar Carga ➔ Tecla STOP (O) para Reset',
          keyTakeaway: 'Sempre identifique e elimine a causa raiz antes de resetar falhas repetitivas.'
        }
      },
      {
        id: 'l8-2',
        title: 'Prática: Simular Falha F070 e Efetuar Reset',
        durationMin: 10,
        type: 'PRACTICE',
        description: 'Injete a falha F070 pelo painel de testes e efetue o rearme pela tecla STOP/RESET.',
        steps: [
          {
            id: 's8-1',
            title: 'Verificar Disparo de Falha (F070)',
            instruction: 'No painel de Falhas / Injeção, clique em "Injetar F070 (Sobrecorrente)".',
            tip: 'O LED FLT acenderá e o display começará a piscar o código F070.',
            isCompleted: (state: any) => state.motorStatus === 'FAULT' || Boolean(state.activeFault)
          },
          {
            id: 's8-2',
            title: 'Executar Reset Seguro pela IHM',
            instruction: 'Pressione a tecla vermelha O (STOP/RESET) na IHM para rearmar o inversor.',
            tip: 'O inversor voltará ao estado PRONTO (READY) com 0.0 Hz.',
            isCompleted: (state: any) => (state.motorStatus === 'READY' || state.motorStatus === 'STOPPED') && !state.activeFault
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 9: COMUNICAÇÃO INDUSTRIAL MODBUS RTU
  // =========================================================================
  {
    id: 'mod-9',
    moduleNumber: 9,
    title: 'Rede e Comunicação Industrial (Modbus RTU / RS485)',
    icon: '🌐',
    description: 'Integração do CFW500 com PLCs, CLPs industriais e sistemas SCADA.',
    lessons: [
      {
        id: 'l9-1',
        title: 'Arquitetura de Comunicação Serial RS485',
        durationMin: 6,
        type: 'THEORY',
        description: 'Endereçamento de rede, baud rate e registradores Modbus.',
        theoryData: {
          title: 'Parâmetros de Rede: P0308 e P0310',
          content: [
            'O WEG CFW500 possui porta serial RS485 nativa com protocolo Modbus RTU.',
            '• P0308: Endereço do inversor na rede (1 a 247).',
            '• P0310: Taxa de transmissão serial (1 = 19200 bps).',
            '• P0311: Configuração de paridade da rede serial.',
            'Via rede, o PLC escreve na Word de Controle para comandar o motor.'
          ],
          diagramInfo: 'CLP Mestre (RS485) ➔ Inversor Escravo 1 (P0308=1) ➔ Inversor Escravo 2 (P0308=2)',
          keyTakeaway: 'Utilize sempre cabo blindado de par trançado com resistor de terminação de 120 ohms nas pontas.'
        }
      },
      {
        id: 'l9-2',
        title: 'Prática: Configurar Endereço de Rede Modbus (P0308 = 2)',
        durationMin: 8,
        type: 'PRACTICE',
        description: 'Parametrize o endereço do inversor na rede RS485 para controle remoto via CLP.',
        steps: [
          {
            id: 's9-1',
            title: 'Definir Endereço de Rede (P0308 = 2)',
            instruction: 'Acesse o parâmetro P0308 na IHM e configure o endereço para 2.',
            tip: 'Isso identifica este inversor na rede de automação.',
            isCompleted: (state: any) => getParam(state, 'P0308') === 2
          },
          {
            id: 's9-2',
            title: 'Verificar Taxa de Transmissão (P0310 = 1)',
            instruction: 'Acesse P0310 e certifique-se de que está ajustado em 1 (19200 bps).',
            tip: 'Velocidade padrão com excelente imunidade a ruídos eletromagnéticos.',
            isCompleted: (state: any) => getParam(state, 'P0310') === 1
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 10: DESAFIOS DE DIAGNÓSTICO E DEFEITOS OCULTOS (TROUBLESHOOTING)
  // =========================================================================
  {
    id: 'mod-10',
    moduleNumber: 10,
    title: 'Desafios de Diagnóstico e Defeitos Ocultos',
    icon: '🔍',
    description: 'Casos reais de máquinas paradas em campo. Descubra a causa raiz e recupere a operação.',
    lessons: [
      {
        id: 'l10-1',
        title: 'Desafio 1: O Motor Não Liga em Modo Remoto',
        durationMin: 10,
        type: 'PRACTICE',
        description: 'O operador fechou a chave externa DI1, o inversor está em REM, mas o motor permanece inerte.',
        steps: [
          {
            id: 's10-1',
            title: 'Diagnosticar e Liberar Origem de Comando Gira/Para',
            instruction: 'Descubra por que o inversor ignora as chaves dos bornes e ajuste o parâmetro de comando remoto para aceitar os bornes DI.',
            tip: 'Verifique no manual qual parâmetro define a origem de partida em Modo Remoto (P0227).',
            isCompleted: (state: any) => getParam(state, 'P0227') === 1
          },
          {
            id: 's10-2',
            title: 'Diagnosticar a Função da Chave DI1',
            instruction: 'Verifique a função atribuída à entrada DI1 e garanta que ela esteja parametrizada como Gira/Para.',
            tip: 'Analise o parâmetro P0263 (Função da entrada DI1).',
            isCompleted: (state: any) => getParam(state, 'P0263') === 1
          },
          {
            id: 's10-3',
            title: 'Partir a Máquina com Sucesso',
            instruction: 'Comute para REM e acione a chave DI1 no painel para validar o funcionamento do motor.',
            tip: 'O display deve sair de rdy e começar a acelerar.',
            isCompleted: (state: any) =>
              (state.controlSource === 'REM' || state.isLocal === false) &&
              getDI(state, 1) &&
              (state.motorStatus === 'RUNNING' || (state.outputFrequency ?? 0) > 0.5)
          }
        ]
      },
      {
        id: 'l10-2',
        title: 'Desafio 2: Falha Térmica e Rotação Abaixo do Limite em Bomba',
        durationMin: 12,
        type: 'PRACTICE',
        description: 'Uma bomba centrífuga não pode operar abaixo de 20 Hz por risco de cavitação e queima por falta de fluxo.',
        steps: [
          {
            id: 's10-4',
            title: 'Definir o Piso de Proteção de Frequência Mínima',
            instruction: 'Configure a frequência mínima do sistema para que nunca desça de 20.0 Hz mesmo com o potenciômetro no zero.',
            tip: 'Ajuste o parâmetro P0133.',
            isCompleted: (state: any) => {
              const fMin = getParam(state, 'P0133');
              return fMin >= 19.5 && fMin <= 20.5;
            }
          },
          {
            id: 's10-5',
            title: 'Ajustar o Limite Térmico de Corrente do Motor',
            instruction: 'A placa da bomba indica corrente máxima contínua de 4.8 A. Ajuste a corrente de sobrecarga térmica para 4.8 A.',
            tip: 'Localize o parâmetro de limite de sobrecarga (P0156).',
            isCompleted: (state: any) => {
              const iLim = getParam(state, 'P0156');
              return iLim >= 4.7 && iLim <= 4.9;
            }
          },
          {
            id: 's10-6',
            title: 'Testar com Potenciômetro no Mínimo',
            instruction: 'Ligue o motor em REM (DI1=ON) e gire o potenciômetro AI1 todo para a esquerda (0V). O motor deve se manter estável a 20.0 Hz.',
            tip: 'Verifique se a frequência de saída não cai para 0 Hz.',
            isCompleted: (state: any) =>
              (state.controlSource === 'REM' || state.isLocal === false) &&
              getDI(state, 1) &&
              (state.outputFrequency ?? 0) >= 19.0 &&
              (state.outputFrequency ?? 0) <= 21.0
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 11: COMISSIONAMENTO DE MÁQUINAS ESPECÍFICAS
  // =========================================================================
  {
    id: 'mod-11',
    moduleNumber: 11,
    title: 'Comissionamento de Aplicações e Máquinas Industriais',
    icon: '🏭',
    description: 'Parametrização completa conforme a folha de dados mecânica da máquina do cliente.',
    lessons: [
      {
        id: 'l11-1',
        title: 'Máquina 1: Esteira Transportadora de Embalagens Frágeis',
        durationMin: 15,
        type: 'PRACTICE',
        description: 'Requisitos do projeto: rampa de partida ultra suave em curva S (8s) para evitar queda de frascos e parada rápida por frenagem CC (1.5s).',
        steps: [
          {
            id: 's11-1',
            title: 'Parametrizar Rampa em Curva S',
            instruction: 'Modifique o tipo de aceleração de linear para Curva S para evitar solavancos na partida dos frascos.',
            tip: 'Verifique o parâmetro P0104.',
            isCompleted: (state: any) => getParam(state, 'P0104') === 1
          },
          {
            id: 's11-2',
            title: 'Ajustar Tempo de Aceleração para 8.0 s',
            instruction: 'Ajuste a rampa de subida da esteira para exatamente 8.0 segundos.',
            tip: 'Altere o parâmetro P0100.',
            isCompleted: (state: any) => {
              const acc = getParam(state, 'P0100');
              return acc >= 7.8 && acc <= 8.2;
            }
          },
          {
            id: 's11-3',
            title: 'Configurar Duração da Frenagem CC na Parada',
            instruction: 'Configure o tempo de injeção de corrente contínua na parada para travar a esteira em 1.5 s.',
            tip: 'Ajuste o parâmetro P0150.',
            isCompleted: (state: any) => {
              const tBrake = getParam(state, 'P0150');
              return tBrake >= 1.4 && tBrake <= 1.6;
            }
          },
          {
            id: 's11-4',
            title: 'Acionar e Validar o Ciclo Operacional',
            instruction: 'Em modo Local, pressione a tecla I (RUN), eleve a velocidade para 30.0 Hz e confira a parametrização.',
            tip: 'Veja o ciclo completo da esteira no display.',
            isCompleted: (state: any) =>
              getParam(state, 'P0104') === 1 &&
              getParam(state, 'P0100') >= 7.8 &&
              getParam(state, 'P0150') >= 1.4
          }
        ]
      },
      {
        id: 'l11-2',
        title: 'Máquina 2: Exaustor Industrial com Zona de Ressonância Crítica',
        durationMin: 15,
        type: 'PRACTICE',
        description: 'Um exaustor industrial possui vibração destrutiva aos 25.0 Hz na carcaça. O inversor deve saltar essa faixa mecânica.',
        steps: [
          {
            id: 's11-5',
            title: 'Inserir Frequência de Salto / Bypass Mecânico',
            instruction: 'Parametrize o ponto de ressonância do exaustor para 25.0 Hz para proteger a estrutura contra vibração destrutiva.',
            tip: 'Verifique o parâmetro P0169.',
            isCompleted: (state: any) => {
              const fSkip = getParam(state, 'P0169');
              return fSkip >= 24.5 && fSkip <= 25.5;
            }
          },
          {
            id: 's11-6',
            title: 'Programar Modo Sleep para Economia Noturna',
            instruction: 'Quando o duto fechar e a frequência cair para 18.0 Hz, o inversor deve entrar em modo dormir após 6.0 segundos.',
            tip: 'Ajuste P0217 para 18.0 Hz e P0218 para 6.0 s.',
            isCompleted: (state: any) => {
              const p217 = getParam(state, 'P0217');
              const p218 = getParam(state, 'P0218');
              return p217 >= 17.5 && p217 <= 18.5 && p218 >= 5.5 && p218 <= 6.5;
            }
          },
          {
            id: 's11-7',
            title: 'Validar Parametrização Final do Exaustor',
            instruction: 'Garanta que P0000 esteja desbloqueado com senha 5 e todos os limites de segurança preenchidos.',
            tip: 'Verifique o painel do simulador.',
            isCompleted: (state: any) =>
              getParam(state, 'P0169') >= 24.5 &&
              getParam(state, 'P0217') >= 17.5 &&
              getParam(state, 'P0218') >= 5.5
          }
        ]
      }
    ]
  }
];