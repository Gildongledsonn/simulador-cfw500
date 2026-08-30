import { CourseModule } from '../types/tutorial';

export const COURSE_MODULES_CFW300: CourseModule[] = [
  {
    id: 'mod_c300_1',
    moduleNumber: 1,
    title: 'Módulo 1: Topologia, IHM & Operação Local',
    description: 'Interface de 7 segmentos, mapa de parâmetros EEPROM e partida local via teclado.',
    icon: '⚙️',
    lessons: [
      {
        id: 'c300_l1_teoria_arquitetura',
        title: 'Lição 1: Arquitetura do Micro Drive WEG CFW300',
        type: 'THEORY',
        durationMin: 10,
        description: 'Ponte retificadora, barramento CC de 310V e síntese PWM por IGBTs.',
        theoryData: {
          title: 'Estrutura Interna do CFW300',
          content: [
            'O CFW300 converte 220V CA monofásico em um barramento estável de 310V CC.',
            'A ponte inversora modula a saída senoidal por largura de pulso (PWM) de 2.5 a 15 kHz.',
            'A tecla PROG alterna entre a tela de monitoramento e a navegação no mapa de parâmetros.',
            'As teclas verdes [I] e vermelhas [O] realizam a partida e parada em modo Local.'
          ],
          diagramInfo: '[Rede 220V CA] -> [Retificador 310V CC] -> [Inversor IGBT PWM] -> [Motor 3~]',
          keyTakeaway: 'Em modo Local, a referência de rotação é ajustada no parâmetro P0121.'
        }
      },
      {
        id: 'c300_l2_pratica_partida_local',
        title: 'Lição 2: Parametrização de P0121 e Partida na IHM',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Ajuste a frequência local para 50.0 Hz e dê a partida pela tecla [I].',
        steps: [
          {
            id: 'c300_s1_loc',
            title: 'Verificar Modo Local',
            instruction: 'Certifique-se de que o display indica modo Local (LED LOC aceso).',
            isCompleted: (s) => String(s.controlSource || '').toUpperCase() === 'LOC'
          },
          {
            id: 'c300_s2_p121',
            title: 'Configurar P0121 em 50.0 Hz',
            instruction: 'Acesse P0121 e defina a frequência para 50.0 Hz.',
            isCompleted: (s) => Math.abs((s.parameters?.P0121?.currentValue ?? 0) - 50.0) < 0.2
          },
          {
            id: 'c300_s3_run_ihm',
            title: 'Partir Motor na Tecla [I]',
            instruction: 'Pressione a tecla [I] para acelerar o motor até 50.0 Hz.',
            isCompleted: (s) => s.motorStatus === 'RUNNING' && Math.abs(Number(s.outputFrequency ?? 0)) >= 49.5
          }
        ]
      }
    ]
  },
  {
    id: 'mod_c300_2',
    moduleNumber: 2,
    title: 'Módulo 2: Comandos Remotos por Bornes Plug-In (IOAR)',
    description: 'Instalação do módulo de expansão, controle por chaves secas e intertravamentos.',
    icon: '🔌',
    lessons: [
      {
        id: 'c300_l3_teoria_ioar',
        title: 'Lição 3: Bornes Digitais e Fonte 24V CC',
        type: 'THEORY',
        durationMin: 12,
        description: 'Mapeamento de DI1 (Gira/Para) e DI2 (Sentido de Giro) com fonte interna.',
        theoryData: {
          title: 'Configuração do Módulo CFW300-IOAR',
          content: [
            'O módulo plug-in adiciona 4 entradas digitais isoladas de 24V CC.',
            'O borne DI1 vem parametrizado de fábrica como Gira/Para (P0263 = 1).',
            'O borne DI2 comuta o sentido de giro Horário/Anti-horário (P0264 = 1).',
            'No modo REMOTO, as entradas digitais assumem o controle prioritário do acionamento.'
          ],
          diagramInfo: '[+24V CC] -> [Botoeira S1] -> [Borne DI1 (Gira/Para)] -> [Inversor]',
          keyTakeaway: 'A comutação para REMOTO bloqueia a partida pelas teclas da IHM por segurança.'
        }
      },
      {
        id: 'c300_l4_pratica_remoto_di1',
        title: 'Lição 4: Partida Remota por DI1 e Reversão por DI2',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Comute para REMOTO, acione DI1 e teste a reversão acionando DI2.',
        steps: [
          {
            id: 'c300_s4_comutar_rem',
            title: 'Ativar Modo Remoto',
            instruction: 'Pressione LOC/REM para liberar os bornes de comando externos.',
            isCompleted: (s) => String(s.controlSource || '').toUpperCase() === 'REM'
          },
          {
            id: 'c300_s5_partida_di1',
            title: 'Acionar DI1 (24V)',
            instruction: 'Feche o contato DI1 para partir o motor remotamente.',
            isCompleted: (s) => s.motorStatus === 'RUNNING' && Boolean((s.digitalInputs as any)?.di1 || (s.digitalInputs as any)?.DI1)
          },
          {
            id: 'c300_s6_reversao_di2',
            title: 'Acionar DI2 (Reversão)',
            instruction: 'Ligue a chave DI2 e observe a desaceleração seguida de giro anti-horário (REV).',
            isCompleted: (s) => s.motorStatus === 'RUNNING' && Boolean((s.digitalInputs as any)?.di2 || (s.digitalInputs as any)?.DI2)
          }
        ]
      }
    ]
  },
  {
    id: 'mod_c300_3',
    moduleNumber: 3,
    title: 'Módulo 3: Entrada Analógica AI1 (0-10V) & Potenciômetro',
    description: 'Calibração de velocidade linear contínua via sinal analógico de tensão.',
    icon: '🎛️',
    lessons: [
      {
        id: 'c300_l5_teoria_analogica',
        title: 'Lição 5: Conversão A/D e Escala de Frequência',
        type: 'THEORY',
        durationMin: 12,
        description: 'Resolução do conversor interno e linearidade de 0V (P0133) a 10V (P0134).',
        theoryData: {
          title: 'Referência Analógica AI1',
          content: [
            'O conversor A/D de 10 bits mapeia 0 a 10V em 1024 níveis de resolução.',
            '0 Volts corresponde à Frequência Mínima (P0133, padrão 3.0 Hz).',
            '10 Volts corresponde à Frequência Máxima (P0134, padrão 60.0 Hz).',
            'O filtro digital P0235 amortece variações de ruído no cabo do potenciômetro.'
          ],
          diagramInfo: '[Potenciômetro 10kΩ] -> [0..10V no Borne AI1] -> [0..60.0 Hz]',
          keyTakeaway: 'Utilize cabos blindados aterrados na carcaça para sinais analógicos longos.'
        }
      },
      {
        id: 'c300_l6_pratica_potenciometro',
        title: 'Lição 6: Sintonia de Rotação por Tensão Analógica',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Ajuste AI1 para 7.0V e comprove a rotação estabilizada em 42.0 Hz.',
        steps: [
          {
            id: 'c300_s7_pot_7v',
            title: 'Ajustar AI1 em 7.0V',
            instruction: 'Deslize o controle de AI1 até atingir 7.0 Volts.',
            isCompleted: (s) => Math.abs((s.ai1Voltage ?? 0) - 7.0) < 0.3
          },
          {
            id: 'c300_s8_partida_analogica',
            title: 'Ligar DI1 e Checar Rotação',
            instruction: 'Acione DI1 e verifique se a frequência atinge 42.0 Hz.',
            isCompleted: (s) => s.motorStatus === 'RUNNING' && Math.abs(Number(s.outputFrequency ?? 0)) >= 41.0
          }
        ]
      }
    ]
  },
  {
    id: 'mod_c300_4',
    moduleNumber: 4,
    title: 'Módulo 4: Cinemática de Rampas Lineares (P0100 / P0101)',
    description: 'Sintonia de aceleração e desaceleração para proteção mecânica e elétrica.',
    icon: '📈',
    lessons: [
      {
        id: 'c300_l7_teoria_rampas',
        title: 'Lição 7: Relação entre Inércia e Sobrecarga de Rampa',
        type: 'THEORY',
        durationMin: 10,
        description: 'Como rampas muito curtas geram sobrecorrente (F006) ou sobretensão (F022).',
        theoryData: {
          title: 'Dimensionamento de Rampas',
          content: [
            'P0100 define o tempo de aceleração de 0 Hz até a frequência máxima.',
            'P0101 define o tempo de desaceleração da frequência máxima até a parada.',
            'Cargas de alta inércia devolvem energia ao barramento CC durante paradas rápidas.'
          ],
          diagramInfo: 'P0100 curto = Pico de Corrente (F006) | P0101 curto = Regeneração CC (F022)',
          keyTakeaway: 'Ajuste os tempos de rampa conforme o torque resistente e a inércia do mecanismo.'
        }
      },
      {
        id: 'c300_l8_pratica_rampa_rapida',
        title: 'Lição 8: Parametrização de Rampa Dinâmica (2.0s)',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Ajuste P0100 e P0101 em 2.0s e teste a resposta do conjunto.',
        steps: [
          {
            id: 'c300_s9_p100_2s',
            title: 'Configurar P0100 = 2.0s',
            instruction: 'Grave o valor de 2.0s no parâmetro P0100.',
            isCompleted: (s) => Math.abs((s.parameters?.P0100?.currentValue ?? 0) - 2.0) < 0.2
          },
          {
            id: 'c300_s10_p101_2s',
            title: 'Configurar P0101 = 2.0s',
            instruction: 'Grave o valor de 2.0s no parâmetro P0101.',
            isCompleted: (s) => Math.abs((s.parameters?.P0101?.currentValue ?? 0) - 2.0) < 0.2
          },
          {
            id: 'c300_s11_teste_rampa',
            title: 'Validar Resposta Dinâmica',
            instruction: 'Dê a partida no motor e comprove a aceleração em 2.0s.',
            isCompleted: (s) => s.motorStatus === 'RUNNING' && Math.abs(Number(s.outputFrequency ?? 0)) > 30.0
          }
        ]
      }
    ]
  },
  {
    id: 'mod_c300_5',
    moduleNumber: 5,
    title: 'Módulo 5: Curva Escalar V/F & Boost de Torque (P0136)',
    description: 'Compensação da resistência estatórica ($R_s$) para partida com carga pesada.',
    icon: '⚡',
    lessons: [
      {
        id: 'c300_l9_teoria_boost',
        title: 'Lição 9: Queda Ôhmica em Baixas Rotações',
        type: 'THEORY',
        durationMin: 12,
        description: 'Por que o motor perde torque abaixo de 10 Hz no modo V/F linear.',
        theoryData: {
          title: 'Boost de Torque Manual',
          content: [
            'Em frequências baixas, a resistência dos fios do estator consome a maior parte da tensão.',
            'O Boost de Torque (P0136) injeta uma tensão de compensação inicial na curva V/F.',
            'Essa elevação garante torque de descolamento sem travar o rotor na partida.'
          ],
          diagramInfo: '[Curva V/F Padrão] vs [Curva com Boost P0136: Tensão Elevada na Partida]',
          keyTakeaway: 'Valores excessivos de P0136 aquecem o motor desnecessariamente em vazio.'
        }
      },
      {
        id: 'c300_l10_pratica_boost',
        title: 'Lição 10: Parametrização do Boost de Torque',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Grave P0136 em 7.0% e comprove a firmeza da partida.',
        steps: [
          {
            id: 'c300_s12_set_p136',
            title: 'Configurar P0136 = 7.0%',
            instruction: 'Ajuste o parâmetro P0136 para 7.0%.',
            isCompleted: (s) => Math.abs((s.parameters?.P0136?.currentValue ?? 0) - 7.0) < 0.3
          },
          {
            id: 'c300_s13_test_boost',
            title: 'Partir Motor com Carga',
            instruction: 'Acione o motor e observe a estabilidade de corrente na rampa inicial.',
            isCompleted: (s) => s.motorStatus === 'RUNNING'
          }
        ]
      }
    ]
  },
  {
    id: 'mod_c300_6',
    moduleNumber: 6,
    title: 'Módulo 6: Função JOG (Avanço Manual em Velocidade Lenta)',
    description: 'Movimentação pulsada para alinhamento mecânico e manutenção de esteiras.',
    icon: '🕹️',
    lessons: [
      {
        id: 'c300_l11_teoria_jog',
        title: 'Lição 11: Princípio da Função JOG (P0122)',
        type: 'THEORY',
        durationMin: 10,
        description: 'Frequência de avanço manual e rampa dedicada de posicionamento.',
        theoryData: {
          title: 'Operação em Modo JOG',
          content: [
            'O JOG permite movimentar o maquinário em velocidade lenta enquanto o botão for mantido pressionado.',
            'A frequência de JOG é definida pelo parâmetro P0122 (padrão 5.0 Hz).',
            'O tempo de aceleração específico de JOG é ajustado em P0123.'
          ],
          diagramInfo: '[Pulso no Borne JOG] -> [Aceleração em P0123] -> [Giro a 5.0 Hz] -> [Soltura: Parada Imediata]',
          keyTakeaway: 'A função JOG ignora o potenciômetro analógico e segue a referência fixa de P0122.'
        }
      },
      {
        id: 'c300_l12_pratica_jog',
        title: 'Lição 12: Parametrização de Frequência de JOG em 10.0 Hz',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Ajuste P0122 para 10.0 Hz e execute o teste de avanço manual.',
        steps: [
          {
            id: 'c300_s14_p122_set',
            title: 'Ajustar P0122 = 10.0 Hz',
            instruction: 'Acesse o parâmetro P0122 e defina a velocidade de JOG em 10.0 Hz.',
            isCompleted: (s) => Math.abs((s.parameters?.P0122?.currentValue ?? 0) - 10.0) < 0.2
          },
          {
            id: 'c300_s15_test_jog',
            title: 'Comandar Partida em JOG',
            instruction: 'Parta o inversor e comprove a rotação controlada em 10.0 Hz.',
            isCompleted: (s) => s.motorStatus === 'RUNNING'
          }
        ]
      }
    ]
  },
  {
    id: 'mod_c300_7',
    moduleNumber: 7,
    title: 'Módulo 7: Multispeed (Velocidades Pré-Programadas)',
    description: 'Seleção digital de até 8 velocidades fixas através da combinação de bornes.',
    icon: '🔢',
    lessons: [
      {
        id: 'c300_l13_teoria_multispeed',
        title: 'Lição 13: Tabela Lógica de Multispeed (P0124 a P0131)',
        type: 'THEORY',
        durationMin: 12,
        description: 'Como entradas digitais selecionam receitas de velocidade pré-gravadas.',
        theoryData: {
          title: 'Controle de Velocidades Pré-Programadas',
          content: [
            'O Multispeed elimina potenciômetros usando combinações lógicas binárias de entradas digitais.',
            'P0124 (Velocidade 1), P0125 (Velocidade 2) até P0131 (Velocidade 8).',
            'Muito aplicado em pontes rolantes, esteiras seletoras e misturadores industriais.'
          ],
          diagramInfo: '[DI3=0, DI4=0 -> 10Hz] | [DI3=1, DI4=0 -> 25Hz] | [DI3=1, DI4=1 -> 60Hz]',
          keyTakeaway: 'O Multispeed garante que os operadores usem exatamente as velocidades aprovadas pelo processo.'
        }
      },
      {
        id: 'c300_l14_pratica_multispeed',
        title: 'Lição 14: Programação da Referência Multispeed 1 (P0124)',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Configure P0124 em 20.0 Hz e valide o acionamento em bancada.',
        steps: [
          {
            id: 'c300_s16_set_p124',
            title: 'Configurar P0124 = 20.0 Hz',
            instruction: 'Acesse o parâmetro P0124 e grave a velocidade de 20.0 Hz.',
            isCompleted: (s) => Math.abs((s.parameters?.P0124?.currentValue ?? 0) - 20.0) < 0.2
          },
          {
            id: 'c300_s17_exec_multi',
            title: 'Partir Motor em Multispeed',
            instruction: 'Acione o comando de marcha e verifique a operação em regime.',
            isCompleted: (s) => s.motorStatus === 'RUNNING'
          }
        ]
      }
    ]
  },
  {
    id: 'mod_c300_8',
    moduleNumber: 8,
    title: 'Módulo 8: Frenagem CC (Injeção de Corrente Contínua)',
    description: 'Travamento estático do rotor na parada sem uso de freio mecânico.',
    icon: '🛑',
    lessons: [
      {
        id: 'c300_l15_teoria_frenagem_cc',
        title: 'Lição 15: Princípio da Frenagem por Injeção CC',
        type: 'THEORY',
        durationMin: 12,
        description: 'Criação de campo magnético estático estacionário para frenagem terminal.',
        theoryData: {
          title: 'Frenagem CC no CFW300',
          content: [
            'Ao atingir a frequência de início (P0151), o inversor injeta corrente contínua no estator.',
            'O campo magnético fixo induz correntes parasitas no rotor que travam o eixo magneticamente.',
            'P0150 define o tempo de duração da injeção CC em segundos e P0152 a intensidade de corrente.'
          ],
          diagramInfo: '[Frequência cai até P0151] -> [Injeção CC ativa por P0150 segundos] -> [Parada Firme]',
          keyTakeaway: 'A frenagem CC dissipa energia em calor no rotor; não deve ser mantida por tempo excessivo.'
        }
      },
      {
        id: 'c300_l16_pratica_frenagem_cc',
        title: 'Lição 16: Parametrização do Tempo de Frenagem CC (P0150)',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Configure P0150 em 2.0 segundos e teste a rigidez de parada do eixo.',
        steps: [
          {
            id: 'c300_s18_set_p150',
            title: 'Configurar P0150 = 2.0s',
            instruction: 'Acesse P0150 e defina a duração da frenagem CC para 2.0 segundos.',
            isCompleted: (s) => Math.abs((s.parameters?.P0150?.currentValue ?? 0) - 2.0) < 0.2
          },
          {
            id: 'c300_s19_teste_parada_cc',
            title: 'Comandar Parada com Frenagem CC',
            instruction: 'Parta o motor e em seguida comande a parada para validar o travamento magnético.',
            isCompleted: (s) => s.motorStatus === 'READY' || s.outputFrequency === 0
          }
        ]
      }
    ]
  },
  {
    id: 'mod_c300_9',
    moduleNumber: 9,
    title: 'Módulo 9: Saída a Relé RL1 e Sinalização de Status',
    description: 'Configuração do contato seco para alarme de falha ou sinalização de motor rodando.',
    icon: '💡',
    lessons: [
      {
        id: 'c300_l17_teoria_rele',
        title: 'Lição 17: Funções da Saída a Relé (P0275)',
        type: 'THEORY',
        durationMin: 10,
        description: 'Uso de RL1 para acionamento de contatores de freio, lâmpadas piloto e sinalização para CLP.',
        theoryData: {
          title: 'Configuração do Relé RL1',
          content: [
            'O parâmetro P0275 define a condição de comutação dos contatos NA/NF do relé interno.',
            'P0275 = 14: Atua como indicação de Falha Ativa (abre contato para desarmar disjuntor).',
            'P0275 = 15: Atua como indicação de Run / Motor Girando (alimenta lâmpada de painel).'
          ],
          diagramInfo: '[Status do Drive] -> [Lógica P0275] -> [Bobina do Relé RL1 comuta C-NA]',
          keyTakeaway: 'O contato de relé isola galvanicamente o circuito de comando de 220V do inversor.'
        }
      },
      {
        id: 'c300_l18_pratica_rele_run',
        title: 'Lição 18: Parametrização do Relé RL1 para Função RUN (P0275 = 15)',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Configure P0275 em 15 e verifique o fechamento do relé durante o acionamento.',
        steps: [
          {
            id: 'c300_s20_set_p275',
            title: 'Configurar P0275 = 15 (RUN)',
            instruction: 'Acesse o parâmetro P0275 e grave o valor 15.',
            isCompleted: (s) => (s.parameters?.P0275?.currentValue ?? 0) === 15
          },
          {
            id: 'c300_s21_partir_checar_rele',
            title: 'Partir Motor e Checar Relé',
            instruction: 'Dê a partida no motor e comprove a sinalização de RL1 ativo.',
            isCompleted: (s) => s.motorStatus === 'RUNNING'
          }
        ]
      }
    ]
  },
  {
    id: 'mod_c300_10',
    moduleNumber: 10,
    title: 'Módulo 10: Frequência de Chaveamento PWM (P0139) & Ruído Acústico',
    description: 'Ajuste de 2.5 kHz a 15.0 kHz para redução de ruído no estator do motor.',
    icon: '🔊',
    lessons: [
      {
        id: 'c300_l19_teoria_pwm',
        title: 'Lição 19: Efeito da Frequência PWM no Motor e no Inversor',
        type: 'THEORY',
        durationMin: 12,
        description: 'Equilíbrio entre silêncio acústico e perdas térmicas por comutação nos IGBTs.',
        theoryData: {
          title: 'Frequência de Chaveamento PWM',
          content: [
            'Frequências PWM baixas (2.5 kHz) geram zumbido audível nas lâminas de aço do motor, mas aquecem pouco o inversor.',
            'Frequências PWM altas (10 a 15 kHz) tornam o motor inaudível ao ouvido humano, mas aumentam as perdas térmicas no inversor.',
            'P0139 ajusta a frequência básica de comutação dos transistores de potência.'
          ],
          diagramInfo: '[PWM 2.5 kHz: Frio / Ruído Alto] vs [PWM 10 kHz: Silencioso / Aquecimento Maior]',
          keyTakeaway: 'Em ambientes silenciosos (laboratórios, hospitais), eleve P0139 para eliminar o zumbido.'
        }
      },
      {
        id: 'c300_l20_pratica_pwm_silencioso',
        title: 'Lição 20: Ajuste de PWM Silencioso para 10.0 kHz',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Configure P0139 em 10.0 kHz e comprove a operação em regime.',
        steps: [
          {
            id: 'c300_s22_set_p139',
            title: 'Configurar P0139 = 10.0 kHz',
            instruction: 'Acesse P0139 e defina a frequência de chaveamento para 10.0 kHz.',
            isCompleted: (s) => Math.abs((s.parameters?.P0139?.currentValue ?? 0) - 10.0) < 0.5
          },
          {
            id: 'c300_s23_validar_pwm',
            title: 'Partir Motor em Alta Frequência PWM',
            instruction: 'Acione o motor e observe o funcionamento suave.',
            isCompleted: (s) => s.motorStatus === 'RUNNING'
          }
        ]
      }
    ]
  },
  {
    id: 'mod_c300_11',
    moduleNumber: 11,
    title: 'Módulo 11: Função Dormir / Despertar (Sleep Mode P0217 / P0219)',
    description: 'Economia de energia para controle automático de bombas e pressurizadores.',
    icon: '💤',
    lessons: [
      {
        id: 'c300_l21_teoria_sleep',
        title: 'Lição 21: Economia Energética em Sistemas Hidráulicos',
        type: 'THEORY',
        durationMin: 12,
        description: 'Desligamento automático do motor em vazão zero e religamento na queda de pressão.',
        theoryData: {
          title: 'Função Sleep Mode do CFW300',
          content: [
            'Quando a demanda cessa, a bomba desacelera até a frequência de dormir (P0217).',
            'Se permanecer nessa frequência pelo tempo P0218, o inversor desliga a saída e entra em repouso.',
            'Assim que o sinal de pressão cair e exigir velocidade acima de P0219, o drive desperta automaticamente.'
          ],
          diagramInfo: '[Freq < P0217 por P0218 seg] -> [Sleep Mode (Pausa)] -> [Pressão Cai] -> [Desperta em P0219]',
          keyTakeaway: 'O Sleep Mode evita que bombas trabalhem contra válvula fechada superaquecendo a água.'
        }
      },
      {
        id: 'c300_l22_pratica_sleep_config',
        title: 'Lição 22: Parametrização da Frequência de Dormir (P0217)',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Ajuste P0217 para 20.0 Hz e teste o comportamento do sistema.',
        steps: [
          {
            id: 'c300_s24_set_p217',
            title: 'Configurar P0217 = 20.0 Hz',
            instruction: 'Acesse o parâmetro P0217 e grave o valor de 20.0 Hz.',
            isCompleted: (s) => Math.abs((s.parameters?.P0217?.currentValue ?? 0) - 20.0) < 0.5
          },
          {
            id: 'c300_s25_test_sleep_run',
            title: 'Partir Motor para Validação',
            instruction: 'Dê a partida no inversor e confira a prontidão de controle.',
            isCompleted: (s) => s.motorStatus === 'RUNNING'
          }
        ]
      }
    ]
  },
  {
    id: 'mod_c300_12',
    moduleNumber: 12,
    title: 'Módulo 12: Dados de Placa do Motor & Proteção de Sobrecarga',
    description: 'Parametrização precisa de tensão, corrente e classe de isolamento.',
    icon: '🏷️',
    lessons: [
      {
        id: 'c300_l23_teoria_dados_motor',
        title: 'Lição 23: Importância dos Parâmetros P0400 a P0407',
        type: 'THEORY',
        durationMin: 12,
        description: 'Como o microprocessador usa a corrente nominal para calcular o relé térmico virtual.',
        theoryData: {
          title: 'Calibração dos Dados de Placa',
          content: [
            'P0401: Frequência nominal do motor (ex: 60.0 Hz).',
            'P0402: Rotação nominal sob carga plena (ex: 1750 RPM).',
            'P0403: Corrente nominal de placa em Amperes.',
            'P0407: Fator de serviço (FS) para dimensionamento térmico.'
          ],
          diagramInfo: '[Placa do Motor] ---> [Entrada P0400..P0407] ---> [Modelo Matemático de Proteção]',
          keyTakeaway: 'Nunca ligue o inversor sem conferir a corrente nominal de placa em P0403.'
        }
      },
      {
        id: 'c300_l24_pratica_dados_motor',
        title: 'Lição 24: Configuração da Corrente Nominal em P0403',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Grave a corrente nominal do motor em 4.5 A no parâmetro P0403.',
        steps: [
          {
            id: 'c300_s26_set_p403',
            title: 'Configurar P0403 = 4.5 A',
            instruction: 'Acesse o parâmetro P0403 e defina a corrente nominal em 4.5 Amperes.',
            isCompleted: (s) => Math.abs((s.parameters?.P0403?.currentValue ?? 0) - 4.5) < 0.2
          },
          {
            id: 'c300_s27_check_motor_run',
            title: 'Executar Partida com Modelo Calibrado',
            instruction: 'Parta o motor e verifique a estabilidade da leitura de corrente.',
            isCompleted: (s) => s.motorStatus === 'RUNNING'
          }
        ]
      }
    ]
  },
  {
    id: 'mod_c300_13',
    moduleNumber: 13,
    title: 'Módulo 13: Rede Serial RS-485 Modbus RTU no CFW300',
    description: 'Controle de partida, parada e frequência através de 2 fios de comunicação serial.',
    icon: '📡',
    lessons: [
      {
        id: 'c300_l25_teoria_modbus_c300',
        title: 'Lição 25: Mapeamento de Registradores Serial',
        type: 'THEORY',
        durationMin: 12,
        description: 'Endereçamento de rede (P0308), taxa de transmissão (P0310) e registradores 40001/40002.',
        theoryData: {
          title: 'Comunicação Modbus no CFW300',
          content: [
            'O módulo plug-in RS-485 permite conectar o CFW300 a CLPs e sistemas SCADA.',
            'Registrador 40001 (P0680): Palavra de Controle (Bit 0 = 1 para RUN, 0 para STOP).',
            'Registrador 40002 (P0681): Referência de Velocidade (0 a 8192 correspondendo a 0 a 60 Hz).',
            'A rede elimina feixes de cabos de comando e fornece diagnósticos completos em tempo real.'
          ],
          diagramInfo: '[CLP Master RS-485] ---> [Cabo Par Trançado A/B] ---> [CFW300 Slave ID 1]',
          keyTakeaway: 'A comunicação serial permite ler corrente, tensão e falhas em um único par de fios.'
        }
      },
      {
        id: 'c300_l26_pratica_modbus_c300',
        title: 'Lição 26: Configuração de Endereço de Rede em P0308',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Configure o endereço Modbus Slave ID como 1 em P0308.',
        steps: [
          {
            id: 'c300_s28_set_p308',
            title: 'Configurar P0308 = 1',
            instruction: 'Acesse o parâmetro P0308 e defina o endereço de escravo como 1.',
            isCompleted: (s) => (s.parameters?.P0308?.currentValue ?? 0) === 1
          },
          {
            id: 'c300_s29_test_run_serial',
            title: 'Confirmar Prontidão de Rede',
            instruction: 'Dê a partida no motor para validar a operação do drive.',
            isCompleted: (s) => s.motorStatus === 'RUNNING'
          }
        ]
      }
    ]
  },
  {
    id: 'mod_c300_14',
    moduleNumber: 14,
    title: 'Módulo 14: Diagnóstico de Falhas & Proteção Térmica Ativa',
    description: 'Análise de alarmes F006, F021, F022, F070 e procedimento de rearme seguro.',
    icon: '🛡️',
    lessons: [
      {
        id: 'c300_l27_teoria_falhas_criticas',
        title: 'Lição 27: Investigação de Falhas e Proteções de Hardware',
        type: 'THEORY',
        durationMin: 12,
        description: 'Identificação de sobrecorrente, falta de fase, sobretensão e sobretemperatura.',
        theoryData: {
          title: 'Diagnóstico de Alarmes do CFW300',
          content: [
            'F006 (Sobrecorrente): Curto-circuito na fiação ou travamento mecânico.',
            'F021 (Subtensão CC): Queda de energia ou afundamento brusco na rede elétrica.',
            'F022 (Sobretensão CC): Regeneração de energia por rampa de descida muito curta.',
            'F070 (Sobretemperatura): Obstrução do fluxo de ar no dissipador de alumínio.'
          ],
          diagramInfo: '[Detecção de Falha] -> [Bloqueio Instantâneo IGBTs] -> [Exibição do Código Fxxx]',
          keyTakeaway: 'Nunca reaponte um inversor em falha F006 sem antes testar a isolação dos cabos com megômetro.'
        }
      },
      {
        id: 'c300_l28_pratica_falha_rearme',
        title: 'Lição 28: Injeção de Falha F070 e Rearme na Tecla [O]',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Simule sobretemperatura no dissipador e execute o rearme pela tecla [O].',
        steps: [
          {
            id: 'c300_s30_trigger_f70',
            title: 'Injetar Falha F070',
            instruction: 'No painel inferior de injeção de falhas, clique em F070.',
            isCompleted: (s) => s.activeFault !== null
          },
          {
            id: 'c300_s31_reset_f70',
            title: 'Executar Reset Seguro',
            instruction: 'Pressione o botão Reset ou a tecla [O] na IHM para normalizar o inversor.',
            isCompleted: (s) => s.activeFault === null
          }
        ]
      }
    ]
  },
  {
    id: 'mod_c300_15',
    moduleNumber: 15,
    title: 'Módulo 15: Comissionamento Final & Reset de Fábrica',
    description: 'Checklist geral de entrega de máquina e restauração completa da memória EEPROM.',
    icon: '🏆',
    lessons: [
      {
        id: 'c300_l29_teoria_comissionamento',
        title: 'Lição 29: Procedimentos de Entrega Técnica de Máquinas',
        type: 'THEORY',
        durationMin: 12,
        description: 'Protocolos de teste em vazio, verificação de rotação e carregamento de padrão de fábrica.',
        theoryData: {
          title: 'Entrega Técnica e Manutenção',
          content: [
            'Conferência do aperto dos bornes de potência para evitar pontos quentes.',
            'Validação do sentido de giro antes de acoplar a carga mecânica.',
            'O parâmetro P0204 = 5 restaura 100% dos parâmetros de fábrica para novas aplicações.'
          ],
          diagramInfo: '[Inspeção Mecânica] -> [Aperto dos Bornes] -> [Teste em Vazio] -> [P0204 = 5]',
          keyTakeaway: 'O comissionamento rigoroso evita paradas não planejadas e aumenta a vida útil do inversor.'
        }
      },
      {
        id: 'c300_l30_pratica_reset_geral',
        title: 'Lição 30: Reset Geral de Fábrica (P0204 = 5)',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Execute o reset de fábrica e confirme o retorno do inversor ao estado pronto (RDY).',
        steps: [
          {
            id: 'c300_s32_set_p204_5',
            title: 'Grave P0204 = 5',
            instruction: 'Acesse o parâmetro P0204 e configure o valor 5.',
            isCompleted: () => true
          },
          {
            id: 'c300_s33_check_rdy_final',
            title: 'Confirmar Status RDY',
            instruction: 'Verifique se o display retornou ao estado padrão pronto para uso.',
            isCompleted: (s) => s.motorStatus === 'READY' && !s.activeFault
          }
        ]
      }
    ]
  }
];