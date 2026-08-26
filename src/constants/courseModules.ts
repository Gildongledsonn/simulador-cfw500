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
  // MÓDULO 0: MANUAL DE PROGRAMAÇÃO OFICIAL DO WEG CFW500
  // =========================================================================
  {
    id: 'mod-0',
    moduleNumber: 0,
    title: 'Manual de Programação CFW500',
    icon: '📑',
    description: 'Acesse e baixe o manual oficial completo de programação do WEG CFW500 para consulta técnica.',
    lessons: [
      {
        id: 'l0-1',
        title: 'Download do Manual Oficial de Programação',
        durationMin: 2,
        type: 'THEORY',
        description: 'Material de apoio indispensável para consulta de parâmetros, tabelas de falhas e diagramas de ligação.',
        theoryData: {
          title: 'Documentação Técnica Oficial WEG',
          content: [
            'O manual de programação do WEG CFW500 reúne toda a tabela detalhada de parâmetros, diagramas dos cartões plug-in, curvas de torque e guias de resolução de falhas.',
            'Clique no botão abaixo para baixar o PDF e utilize-o como fonte de consulta durante os desafios e comissionamentos das próximas etapas.'
          ],
          diagramInfo: 'DOCUMENTAÇÃO TÉCNICA OFICIAL ➔ WEG CFW500 (CÓD. 10001469555)',
          keyTakeaway: 'Baixe o manual no seu computador ou celular para consultar os parâmetros e grupos de controle durante o treinamento.'
        }
      }
    ]
  },
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
            'A IHM do WEG CFW500 possui 3 modos de operação: Monitor (leitura), Seleção de Parâmetros (Pxxxx) e Edição (valor piscando).',
            'Para liberar a alteração de parâmetros de controle, insira a senha mestra no parâmetro P0000 (valor padrão: 5).',
            'Pressione PROG para entrar no modo de edição, ajuste com as setas ▲ e ▼ e confirme com PROG.'
          ],
          diagramInfo: '[MONIT: 0.0Hz] ➔ (PROG) ➔ [P0000] ➔ (PROG) ➔ [EDITAR: 5] ➔ (PROG) ➔ [LIBERADO]',
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
            tip: 'Observe o motor girando e a frequência de saída subir.',
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
            'O parâmetro P0100 define o tempo em segundos para acelerar de 0 até 60Hz.',
            'O parâmetro P0101 define o tempo para desacelerar de 60Hz até a parada completa.',
            'Rampas muito curtas em cargas pesadas causam sobrecorrente (F070) ou sobretensão (F021).'
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
            tip: 'Ajuste para 3.0 com as setas e salve.',
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
            instruction: 'Ligue o motor pela tecla I (RUN), aguarde acelerar e em seguida pressione a tecla O (STOP).',
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
            'O parâmetro P0263 define a função da entrada digital DI1 (Padrão: 1 = Gira/Para a 2 fios).',
            'O parâmetro P0264 define a função da entrada digital DI2 (Padrão: 1 = Sentido de Giro Horário/Anti-horário).',
            'Para que o inversor responda às chaves DI1 e DI2, o modo de controle deve estar em REMOTO.'
          ],
          diagramInfo: '[P0000=5] ➔ [LED REM ACESO] ➔ [DI1: ON = PARTIDA] ➔ [DI2: ON = SENTIDO REV]',
          keyTakeaway: 'Em modo Remoto, os botões I (RUN) e ▲/▼ da IHM transferem o controle para os bornes.'
        }
      },
      {
        id: 'l3-2',
        title: 'Prática: Ligar e Inverter Rotação pelos Bornes Externos',
        durationMin: 10,
        type: 'PRACTICE',
        description: 'Comute para modo Remoto, acione a partida pela chave DI1 e execute a reversão pela chave DI2.',
        steps: [
          {
            id: 's3-1',
            title: 'Comutar para Modo Remoto (LED REM Aceso)',
            instruction: 'Pressione o botão LOC/REM na IHM até o LED verde REM acender.',
            tip: 'Isso habilita os comandos vindos das chaves de borne.',
            isCompleted: (state: any) => state.controlSource === 'REM' || state.isLocal === false
          },
          {
            id: 's3-2',
            title: 'Ligar o Motor pela Chave Externa DI1',
            instruction: 'Com o inversor em REM, clique na chave DI1 no painel de bornes (posição ON).',
            tip: 'Observe o motor acelerar em sentido horário (FWD).',
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
            'A função Multispeed permite selecionar velocidades fixas sem potenciômetro.',
            '• DI3 = OFF ➔ Frequência P0124 (Velocidade 1: 15.0 Hz)',
            '• DI3 = ON  ➔ Frequência P0125 (Velocidade 2: 35.0 Hz)',
            'Ao comutar a chave DI3, o inversor aplica a rampa suavemente até a nova velocidade.'
          ],
          diagramInfo: '[DI3: OFF] = P0124 (15.0 Hz) ➔ [DI3: ON] = P0125 (35.0 Hz)',
          keyTakeaway: 'Ideal para esteiras industriais com velocidade lenta de carga e rápida de transporte.'
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
            tip: 'Observe a velocidade subir suavemente pela rampa.',
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
            'A entrada analógica AI1 lê um sinal de 0 a 10V.',
            '0V corresponde a 0.0 Hz e 10V corresponde à frequência máxima programada (P0134).',
            'A rampa em "S" insere uma curvatura suave evitando trancos mecânicos.'
          ],
          diagramInfo: '0V (0 Hz) ➔ 5V (30 Hz) ➔ 10V (60 Hz) com curva amortecida em "S"',
          keyTakeaway: 'A rampa em S protege engrenagens e caixas redutoras contra choque mecânico.'
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
            tip: 'Padrão WEG para controle por potenciômetro.',
            isCompleted: (state: any) => getParam(state, 'P0222') === 1 || getParam(state, 'P0222') === 0
          },
          {
            id: 's5-2',
            title: 'Ligar em Modo Remoto (DI1=ON)',
            instruction: 'Comute para REM e feche a chave DI1 para habilitar o acionamento do motor.',
            tip: 'O motor responderá proporcionalmente ao potenciômetro.',
            isCompleted: (state: any) => getDI(state, 1) && (state.motorStatus === 'RUNNING' || state.outputFrequency > 0.5)
          },
          {
            id: 's5-3',
            title: 'Ajustar Potenciômetro para mais de 40 Hz',
            instruction: 'Mova o cursor analógico para cima até atingir mais de 40.0 Hz de rotação.',
            tip: 'Veja a rotação do motor aumentar em tempo real.',
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
            'Em sistemas de bombeamento com válvulas fechadas, o motor não precisa continuar girando.',
            'O parâmetro P0217 define a frequência de dormir e P0218 define o tempo de atraso para desligamento.',
            'Assim que a demanda sobe, o inversor acorda automaticamente.'
          ],
          diagramInfo: 'Referência < P0217 por P0218 seg ➔ Desliga Motor (0Hz)',
          keyTakeaway: 'Economiza eletricidade e evita o superaquecimento do fluido na bomba.'
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
            tip: 'Tempo de filtro para evitar desligamentos falsos por oscilação de pressão.',
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
            'O inversor injeta CC no estator gerando um campo estático que trava o rotor.',
            'O parâmetro P0150 define o tempo de duração e P0151 define a frequência de início da injeção.',
            'Ideal para serras, exaustores e centrífugas industriais.'
          ],
          diagramInfo: 'Desacelera normal ➔ Atinge P0151 (5Hz) ➔ Injeta CC por P0150 seg ➔ Eixo Travado',
          keyTakeaway: 'Garante a parada do eixo mecânico sem rotação residual perigosa.'
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
            '• F006: Subtensão no Link CC (rede caiu).',
            '• F070: Sobrecorrente / Curto-circuito na saída.',
            '• F072: Sobrecarga térmica no motor (Ixt).',
            '• F021: Sobretensão no barramento CC.'
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
            tip: 'O display começará a piscar o código F070.',
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
            '• P0308: Endereço do escravo na rede (1 a 247).',
            '• P0310: Taxa de transmissão serial (1 = 19200 bps).'
          ],
          diagramInfo: 'CLP Mestre (RS485) ➔ Inversor Escravo (P0308=2)',
          keyTakeaway: 'Utilize cabo blindado com par trançado e resistor de terminação de 120 ohms.'
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
            tip: 'Identifica o escravo na rede RS485.',
            isCompleted: (state: any) => getParam(state, 'P0308') === 2
          },
          {
            id: 's9-2',
            title: 'Verificar Taxa de Transmissão (P0310 = 1)',
            instruction: 'Acesse P0310 e certifique-se de que está ajustado em 1 (19200 bps).',
            tip: 'Velocidade padrão de 19200 bps.',
            isCompleted: (state: any) => getParam(state, 'P0310') === 1
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 10: DESAFIO 1 - FALHA DE COMANDO EM MODO REMOTO
  // =========================================================================
  {
    id: 'mod-10',
    moduleNumber: 10,
    title: 'Desafio 1: Diagnóstico de Falha de Partida em Modo Remoto',
    icon: '🔍',
    description: 'O operador fechou a chave externa de comando, o display acusa REM, mas o inversor ignora o sinal de partida. Descubra a causa raiz e repare o acionamento.',
    lessons: [
      {
        id: 'l10-1',
        title: 'Cenário: Chave de Partida Acionada sem Resposta do Motor',
        durationMin: 10,
        type: 'PRACTICE',
        description: 'Analise os grupos de parametrização de origem de comando remoto e as funções dos bornes digitais para restabelecer a operação.',
        steps: [
          {
            id: 's10-1',
            title: 'Corrigir Origem de Partida em Modo Remoto',
            instruction: 'Identifique na memória do inversor qual registro define a fonte do comando Gira/Para quando em controle remoto e configure-o para aceitar os bornes físicos.',
            tip: 'Investigue o grupo de seleção de comandos remotos.',
            isCompleted: (state: any) => getParam(state, 'P0227') === 1
          },
          {
            id: 's10-2',
            title: 'Validar Função da Entrada Digital de Partida',
            instruction: 'Acesse a configuração da primeira entrada digital da régua de bornes e assegure que sua função esteja programada como comando de Partida/Parada (Gira/Para).',
            tip: 'Consulte a lista de funções das entradas digitais.',
            isCompleted: (state: any) => getParam(state, 'P0263') === 1
          },
          {
            id: 's10-3',
            title: 'Testar e Validar Acionamento em Campo',
            instruction: 'Comute a IHM para modo Remoto e feche a chave de partida no painel para confirmar que o motor acelera normalmente.',
            tip: 'A frequência de saída deve se elevar e o status mudar para operação.',
            isCompleted: (state: any) =>
              (state.controlSource === 'REM' || state.isLocal === false) &&
              getDI(state, 1) &&
              (state.motorStatus === 'RUNNING' || state.outputFrequency > 0.5)
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 11: DESAFIO 2 - PROTEÇÃO DE BOMBA CENTRÍFUGA
  // =========================================================================
  {
    id: 'mod-11',
    moduleNumber: 11,
    title: 'Desafio 2: Proteção Térmica e Subfrequência em Bomba Centrífuga',
    icon: '💧',
    description: 'Uma bomba de recalque industrial está sofrendo aquecimento e cavitação quando o operador reduz a rotação. Aplique as proteções necessárias.',
    lessons: [
      {
        id: 'l11-1',
        title: 'Cenário: Proteção Hidráulica e Limite Térmico de Corrente',
        durationMin: 12,
        type: 'PRACTICE',
        description: 'Imponha um piso de segurança para a rotação mínima do rotor e calibre a corrente nominal exata de proteção térmica do enrolamento.',
        steps: [
          {
            id: 's11-1',
            title: 'Parametrizar Piso de Velocidade Mínima de Segurança',
            instruction: 'Localize a configuração de limite inferior de frequência e ajuste-a para 20.0 Hz, impedindo que a bomba trabalhe sem fluxo de refrigeração.',
            tip: 'Procure o parâmetro de frequência mínima no grupo de limites.',
            isCompleted: (state: any) => {
              const fMin = getParam(state, 'P0133');
              return fMin >= 19.5 && fMin <= 20.5;
            }
          },
          {
            id: 's11-2',
            title: 'Calibrar Proteção de Sobrecarga Térmica do Motor',
            instruction: 'A placa de identificação da bomba especifica corrente de serviço contínua de 4.8 A. Ajuste o limite térmico de sobrecarga para exatamente 4.8 A.',
            tip: 'Ajuste a corrente de sobrecarga térmica do motor.',
            isCompleted: (state: any) => {
              const iLim = getParam(state, 'P0156');
              return iLim >= 4.7 && iLim <= 4.9;
            }
          },
          {
            id: 's11-3',
            title: 'Validar Estabilidade com Referência no Mínimo',
            instruction: 'Ligue o comando de partida em modo remoto e posicione o sinal analógico no zero. A rotação deve se manter perfeitamente travada no piso de segurança.',
            tip: 'Verifique se a frequência de saída não desce abaixo do limite estabelecido.',
            isCompleted: (state: any) =>
              (state.controlSource === 'REM' || state.isLocal === false) &&
              getDI(state, 1) &&
              state.outputFrequency >= 19.0 &&
              state.outputFrequency <= 21.0
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 12: COMISSIONAMENTO - ESTEIRA DE FRASCOS FRÁGEIS
  // =========================================================================
  {
    id: 'mod-12',
    moduleNumber: 12,
    title: 'Comissionamento: Esteira Transportadora de Embalagens',
    icon: '🍾',
    description: 'Linha de envase de produtos de vidro. Exige partida progressiva para não tombar frascos e parada controlada por frenagem elétrica.',
    lessons: [
      {
        id: 'l12-1',
        title: 'Adequação da Dinâmica Mecânica da Esteira',
        durationMin: 12,
        type: 'PRACTICE',
        description: 'Configure o formato da aceleração para curva amortecida, defina o tempo de subida em 8.0s e programe a frenagem estática na parada em 1.5s.',
        steps: [
          {
            id: 's12-1',
            title: 'Ativar Perfil de Aceleração com Curvatura Suave',
            instruction: 'Modifique o formato padrão da rampa de linear para Curva S para eliminar solavancos mecânicos no instante da partida.',
            tip: 'Ajuste o parâmetro que altera o formato da rampa.',
            isCompleted: (state: any) => getParam(state, 'P0104') === 1
          },
          {
            id: 's12-2',
            title: 'Programar Tempo de Rampa de Subida',
            instruction: 'Ajuste o tempo da primeira rampa de aceleração da máquina para 8.0 segundos.',
            tip: 'Configure o parâmetro principal de tempo de aceleração.',
            isCompleted: (state: any) => {
              const acc = getParam(state, 'P0100');
              return acc >= 7.8 && acc <= 8.2;
            }
          },
          {
            id: 's12-3',
            title: 'Configurar Duração da Frenagem por Injeção CC',
            instruction: 'Ajuste o tempo de aplicação do campo estático de frenagem CC na parada para 1.5 segundos, garantindo imobilização rápida.',
            tip: 'Localize o tempo de duração da frenagem CC.',
            isCompleted: (state: any) => {
              const tBrake = getParam(state, 'P0150');
              return tBrake >= 1.4 && tBrake <= 1.6;
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 13: COMISSIONAMENTO - EXAUSTOR INDUSTRIAL
  // =========================================================================
  {
    id: 'mod-13',
    moduleNumber: 13,
    title: 'Comissionamento: Exaustor com Salto de Ressonância (Bypass)',
    icon: '🌪️',
    description: 'Um sistema de ventilação entra em ressonância mecânica destrutiva aos 25.0 Hz e precisa desligar automaticamente quando a pressão estabilizar.',
    lessons: [
      {
        id: 'l13-1',
        title: 'Proteção contra Vibração Estrutural e Repouso Automático',
        durationMin: 12,
        type: 'PRACTICE',
        description: 'Parametrize o salto da faixa crítica de vibração e ative a lógica de repouso automático com atraso.',
        steps: [
          {
            id: 's13-1',
            title: 'Definir Ponto Crítico de Salto Mecânico',
            instruction: 'Insira a frequência de ressonância mecânica em 25.0 Hz para que o inversor transite por ela sem permanecer estacionado.',
            tip: 'Ajuste a frequência de rejeição / bypass mecânico.',
            isCompleted: (state: any) => {
              const fSkip = getParam(state, 'P0169');
              return fSkip >= 24.5 && fSkip <= 25.5;
            }
          },
          {
            id: 's13-2',
            title: 'Ajustar Limiar de Frequência para Repouso Automático',
            instruction: 'Configure a frequência de acionamento do modo dormir para 18.0 Hz.',
            tip: 'Ajuste o valor do limiar de sleep.',
            isCompleted: (state: any) => {
              const p217 = getParam(state, 'P0217');
              return p217 >= 17.5 && p217 <= 18.5;
            }
          },
          {
            id: 's13-3',
            title: 'Definir Tempo de Atraso para Entrada em Repouso',
            instruction: 'Programe o temporizador de confirmação de inatividade em 6.0 segundos antes de suspender a modulação.',
            tip: 'Ajuste o atraso do modo dormir.',
            isCompleted: (state: any) => {
              const p218 = getParam(state, 'P0218');
              return p218 >= 5.5 && p218 <= 6.5;
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 14: DESAFIO 3 - SOBRETENSÃO NO LINK CC (F021)
  // =========================================================================
  {
    id: 'mod-14',
    moduleNumber: 14,
    title: 'Desafio 3: Solução de Sobretensão no Barramento CC (F021)',
    icon: '⚡',
    description: 'Uma centrífuga industrial desarma por sobretensão interna no barramento contínuo toda vez que recebe ordem de parada rápida. Solucione o problema.',
    lessons: [
      {
        id: 'l14-1',
        title: 'Cenário: Regeneração Excessiva em Carga de Alta Inércia',
        durationMin: 14,
        type: 'PRACTICE',
        description: 'Readeque a rampa de desaceleração para 12.0s e regule a tensão de frenagem CC para 15.0%.',
        steps: [
          {
            id: 's14-1',
            title: 'Alongar o Tempo de Desaceleração Controlada',
            instruction: 'Aumente o tempo da rampa de descida para 12.0 segundos, reduzindo a taxa de regeneração de energia para o barramento CC.',
            tip: 'Ajuste o tempo da primeira rampa de desaceleração.',
            isCompleted: (state: any) => {
              const dec = getParam(state, 'P0101');
              return dec >= 11.5 && dec <= 12.5;
            }
          },
          {
            id: 's14-2',
            title: 'Calibrar Tensão de Injeção de Frenagem CC',
            instruction: 'Ajuste o nível percentual de tensão de frenagem CC para 15.0% para garantir frenagem magnética suave.',
            tip: 'Localize a configuração de nível de tensão de frenagem CC.',
            isCompleted: (state: any) => {
              const vBrake = getParam(state, 'P0142');
              return vBrake >= 14.0 && vBrake <= 16.0;
            }
          },
          {
            id: 's14-3',
            title: 'Validar Ciclo Operacional Completo',
            instruction: 'Em modo Local, acelere o motor até a velocidade máxima e pressione STOP. O motor deve desacelerar sem apresentar código de falha.',
            tip: 'Aguarde a parada completa em 0.0 Hz.',
            isCompleted: (state: any) =>
              (state.motorStatus === 'READY' || state.motorStatus === 'STOPPED') &&
              !state.activeFault &&
              getParam(state, 'P0101') >= 11.5
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 15: COMISSIONAMENTO - PONTE ROLANTE (MULTISPEED)
  // =========================================================================
  {
    id: 'mod-15',
    moduleNumber: 15,
    title: 'Comissionamento: Içamento de Cargas em Ponte Rolante',
    icon: '🏗️',
    description: 'Sistema de elevação de carga que necessita de velocidades fixas pré-programadas para aproximação milimétrica, média, transporte e velocidade máxima.',
    lessons: [
      {
        id: 'l15-1',
        title: 'Programação dos Estágios de Velocidade Fixa',
        durationMin: 15,
        type: 'PRACTICE',
        description: 'Programe os 4 primeiros estágios de velocidades digitais conforme os requisitos de projeto: 10.0 Hz, 25.0 Hz, 45.0 Hz e 60.0 Hz.',
        steps: [
          {
            id: 's15-1',
            title: 'Programar Velocidade de Posicionamento Lento',
            instruction: 'Defina a primeira frequência da tabela de velocidades fixas em 10.0 Hz.',
            tip: 'Ajuste o primeiro estágio da tabela de multispeed.',
            isCompleted: (state: any) => {
              const v = getParam(state, 'P0124');
              return v >= 9.5 && v <= 10.5;
            }
          },
          {
            id: 's15-2',
            title: 'Programar Velocidade Intermediária',
            instruction: 'Defina a segunda frequência da tabela de velocidades fixas em 25.0 Hz.',
            tip: 'Ajuste o segundo estágio da tabela de multispeed.',
            isCompleted: (state: any) => {
              const v = getParam(state, 'P0125');
              return v >= 24.5 && v <= 25.5;
            }
          },
          {
            id: 's15-3',
            title: 'Programar Velocidade de Transporte Rápido',
            instruction: 'Defina a terceira frequência da tabela de velocidades fixas em 45.0 Hz.',
            tip: 'Ajuste o terceiro estágio da tabela de multispeed.',
            isCompleted: (state: any) => {
              const v = getParam(state, 'P0126');
              return v >= 44.5 && v <= 45.5;
            }
          },
          {
            id: 's15-4',
            title: 'Programar Velocidade Máxima de Içamento',
            instruction: 'Defina a quarta frequência da tabela de velocidades fixas em 60.0 Hz.',
            tip: 'Ajuste o quarto estágio da tabela de multispeed.',
            isCompleted: (state: any) => {
              const v = getParam(state, 'P0127');
              return v >= 59.0 && v <= 61.0;
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 16: DESAFIO 4 - TORQUE DE PARTIDA EM CARGA PESADA
  // =========================================================================
  {
    id: 'mod-16',
    moduleNumber: 16,
    title: 'Desafio 4: Motor Travado na Partida por Falta de Torque Inicial',
    icon: '🔩',
    description: 'Um moinho triturador com material acumulado na câmara não consegue quebrar a inércia estática e trava na partida. Aumente a força inicial.',
    lessons: [
      {
        id: 'l16-1',
        title: 'Cenário: Carga com Alto Conjugado Resistente Estático',
        durationMin: 14,
        type: 'PRACTICE',
        description: 'Aplique reforço de magnetização em baixas rotações, amplie o teto de corrente momentânea e ative a correção de escorregamento.',
        steps: [
          {
            id: 's16-1',
            title: 'Elevar o Reforço de Torque Manual na Partida',
            instruction: 'Aumente a compensação de torque manual da curva V/F para 12.0%, elevando a tensão aplicada nas frequências de 0 a 10 Hz.',
            tip: 'Localize o parâmetro de Boost de Torque Manual.',
            isCompleted: (state: any) => {
              const b = getParam(state, 'P0136');
              return b >= 11.5 && b <= 12.5;
            }
          },
          {
            id: 's16-2',
            title: 'Ajustar o Teto de Corrente Máxima de Partida',
            instruction: 'Permita que o inversor forneça até 15.0 A de corrente instantânea para vencer o travamento mecânico.',
            tip: 'Ajuste o limite de corrente máxima de saída.',
            isCompleted: (state: any) => {
              const iMax = getParam(state, 'P0135');
              return iMax >= 14.5 && iMax <= 15.5;
            }
          },
          {
            id: 's16-3',
            title: 'Ativar Compensação de Queda de Rotação por Carga',
            instruction: 'Ajuste a compensação de escorregamento do rotor em 3.0% para manter a velocidade constante sob esforço.',
            tip: 'Ajuste o parâmetro de compensação de escorregamento.',
            isCompleted: (state: any) => {
              const slip = getParam(state, 'P0138');
              return slip >= 2.8 && slip <= 3.2;
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 17: COMISSIONAMENTO - COMPRESSOR DE PARAFUSO
  // =========================================================================
  {
    id: 'mod-17',
    moduleNumber: 17,
    title: 'Comissionamento: Compressor de Parafuso e Pressurização',
    icon: '💨',
    description: 'Compressor rotativo de ar comprimido. Exige dinâmica de alívio rápido, velocidade mínima para circulação de óleo e ruído eletromagnético reduzido.',
    lessons: [
      {
        id: 'l17-1',
        title: 'Parametrização Específica para Compressores Industriais',
        durationMin: 15,
        type: 'PRACTICE',
        description: 'Ajuste as rampas para 4.0s de subida e 3.0s de descida, fixe o piso de lubrificação em 25.0 Hz e eleve a portadora PWM para 10.0 kHz.',
        steps: [
          {
            id: 's17-1',
            title: 'Ajustar Rampa de Carga',
            instruction: 'Defina o tempo de aceleração em 4.0 segundos.',
            tip: 'Ajuste o tempo de aceleração.',
            isCompleted: (state: any) => {
              const v = getParam(state, 'P0100');
              return v >= 3.8 && v <= 4.2;
            }
          },
          {
            id: 's17-2',
            title: 'Ajustar Rampa de Alívio Rápido',
            instruction: 'Defina o tempo de desaceleração em 3.0 segundos para fechamento rápido de válvula.',
            tip: 'Ajuste o tempo de desaceleração.',
            isCompleted: (state: any) => {
              const v = getParam(state, 'P0101');
              return v >= 2.8 && v <= 3.2;
            }
          },
          {
            id: 's17-3',
            title: 'Fixar Piso de Rotação para Bombeamento de Óleo',
            instruction: 'Configure a frequência mínima em 25.0 Hz para assegurar a película de lubrificação no elemento compressor.',
            tip: 'Ajuste o limite de frequência mínima.',
            isCompleted: (state: any) => {
              const v = getParam(state, 'P0133');
              return v >= 24.5 && v <= 25.5;
            }
          },
          {
            id: 's17-4',
            title: 'Ajustar Frequência de Chaveamento Silenciosa',
            instruction: 'Eleve a frequência de chaveamento PWM para 10.0 kHz para eliminar o ruído audível na casa de máquinas.',
            tip: 'Ajuste a frequência de chaveamento PWM dos IGBTs.',
            isCompleted: (state: any) => {
              const v = getParam(state, 'P0139');
              return v >= 9.5 && v <= 10.5;
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 18: DESAFIO 5 - SUPERAQUECIMENTO DE IGBTs
  // =========================================================================
  {
    id: 'mod-18',
    moduleNumber: 18,
    title: 'Desafio 5: Otimização Térmica dos IGBTs e Redução de Ruído',
    icon: '🔥',
    description: 'Um técnico elevou a frequência PWM ao máximo e o inversor agora desarma por sobreaquecimento nos transistores de potência. Recalibre o sistema.',
    lessons: [
      {
        id: 'l18-1',
        title: 'Cenário: Perdas Excessivas por Comutação no Módulo IGBT',
        durationMin: 12,
        type: 'PRACTICE',
        description: 'Reduza a taxa de chaveamento para 5.0 kHz e habilite o algoritmo de rebaixamento térmico automático.',
        steps: [
          {
            id: 's18-1',
            title: 'Recalibrar Frequência de Chaveamento PWM',
            instruction: 'Ajuste a frequência PWM para 5.0 kHz para diminuir as perdas térmicas por comutação nos semicondutores.',
            tip: 'Ajuste a frequência de chaveamento PWM.',
            isCompleted: (state: any) => {
              const pwm = getParam(state, 'P0139');
              return pwm >= 4.8 && pwm <= 5.2;
            }
          },
          {
            id: 's18-2',
            title: 'Habilitar Redução Automática de PWM por Temperatura',
            instruction: 'Ative a proteção inteligente que diminui o PWM automaticamente se o dissipador atingir temperatura crítica.',
            tip: 'Habilite o parâmetro de redução de PWM automática.',
            isCompleted: (state: any) => getParam(state, 'P0297') === 1
          },
          {
            id: 's18-3',
            title: 'Validar Estabilidade de Temperatura do Dissipador',
            instruction: 'Acesse o parâmetro de leitura da temperatura interna dos IGBTs na IHM para validar a estabilidade.',
            tip: 'Consulte o parâmetro de leitura de temperatura.',
            isCompleted: (state: any) => getParam(state, 'P0139') <= 5.2 && getParam(state, 'P0297') === 1
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MÓDULO 19: COMISSIONAMENTO - MISTURADOR COM REVERSÃO CÍCLICA
  // =========================================================================
  {
    id: 'mod-19',
    moduleNumber: 19,
    title: 'Comissionamento: Misturador Químico com Reversão Cíclica',
    icon: '🧪',
    description: 'Tanque de homogeneização que realiza bateladas alternando o sentido de rotação das pás através de sinal digital de CLP.',
    lessons: [
      {
        id: 'l19-1',
        title: 'Parametrização de Transições Suaves de Inversão',
        durationMin: 15,
        type: 'PRACTICE',
        description: 'Configure a entrada DI2 para inversão de giro, estabeleça rampas simétricas de 4.0s e teste a reversão em modo remoto.',
        steps: [
          {
            id: 's19-1',
            title: 'Configurar Entrada Digital para Sentido de Giro',
            instruction: 'Programe a segunda entrada digital da régua de bornes com a função de comando de Sentido de Giro.',
            tip: 'Ajuste a função da entrada DI2.',
            isCompleted: (state: any) => getParam(state, 'P0264') === 1
          },
          {
            id: 's19-2',
            title: 'Equalizar Tempos de Aceleração e Desaceleração',
            instruction: 'Ajuste tanto o tempo de aceleração quanto o de desaceleração para exatamente 4.0 segundos.',
            tip: 'Configure os tempos das rampas de subida e descida.',
            isCompleted: (state: any) => {
              const a = getParam(state, 'P0100');
              const d = getParam(state, 'P0101');
              return a >= 3.8 && a <= 4.2 && d >= 3.8 && d <= 4.2;
            }
          },
          {
            id: 's19-3',
            title: 'Executar Ciclo de Reversão em Modo Remoto',
            instruction: 'Em modo REM, acione a partida pela chave DI1 e, em seguida, feche a chave DI2 para testar a rampa de inversão completa.',
            tip: 'Observe a passagem por 0.0 Hz e a rotação no sentido inverso.',
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
  // MÓDULO 20: DESAFIO MESTRE - RETIFICADORA CNC
  // =========================================================================
  {
    id: 'mod-20',
    moduleNumber: 20,
    title: 'Desafio Mestre: Comissionamento Completo de Retificadora CNC',
    icon: '🏆',
    description: 'O teste definitivo: parametrização integral a partir da placa do motor, seleção de controle vetorial sensorless e integração na rede RS485 da máquina.',
    lessons: [
      {
        id: 'l20-1',
        title: 'Parametrização Integral de Todos os Grupos Funcionais',
        durationMin: 20,
        type: 'PRACTICE',
        description: 'Insira os dados elétricos de placa, ative o controle vetorial VVW e configure os parâmetros de comunicação serial.',
        steps: [
          {
            id: 's20-1',
            title: 'Inserir Dados de Tensão, Frequência e Rotação Nominal',
            instruction: 'Acesse o grupo de dados do motor e programe: Tensão Nominal = 220 V, Frequência Nominal = 60.0 Hz e Rotação Nominal = 1750 RPM.',
            tip: 'Localize os parâmetros de placa do motor.',
            isCompleted: (state: any) =>
              getParam(state, 'P0400') === 220 &&
              getParam(state, 'P0401') >= 59.0 &&
              getParam(state, 'P0402') >= 1700
          },
          {
            id: 's20-2',
            title: 'Ajustar Corrente e Potência Nominal do Motor',
            instruction: 'Programe a Corrente Nominal em 4.5 A e a Potência Nominal em 1.5 cv nos parâmetros correspondentes.',
            tip: 'Ajuste corrente e potência de placa.',
            isCompleted: (state: any) => {
              const i = getParam(state, 'P0403');
              const p = getParam(state, 'P0404');
              return i >= 4.4 && i <= 4.6 && p >= 1.4 && p <= 1.6;
            }
          },
          {
            id: 's20-3',
            title: 'Selecionar Modo de Controle Vetorial Sensorless (VVW)',
            instruction: 'Altere o algoritmo de controle do inversor de Escalar (V/F) para Controle Vetorial VVW para assegurar alto torque e rigidez em baixas rotações.',
            tip: 'Altere o método de controle.',
            isCompleted: (state: any) => getParam(state, 'P0202') === 2
          },
          {
            id: 's20-4',
            title: 'Configurar Endereço e Taxa de Rede Serial do CNC',
            instruction: 'Defina o endereço escravo da rede Modbus RS485 para 5 e certifique-se de que a taxa de comunicação esteja em 19200 bps.',
            tip: 'Ajuste os parâmetros de comunicação serial.',
            isCompleted: (state: any) => getParam(state, 'P0308') === 5 && getParam(state, 'P0310') === 1
          },
          {
            id: 's20-5',
            title: 'Concluir Comissionamento Geral da Máquina',
            instruction: 'Certifique-se de que todos os parâmetros foram gravados na memória e que o acesso mestre permaneça validado com senha.',
            tip: 'Validação final de comissionamento.',
            isCompleted: (state: any) =>
              getParam(state, 'P0202') === 2 &&
              getParam(state, 'P0308') === 5 &&
              getParam(state, 'P0400') === 220
          }
        ]
      }
    ]
  }
];