import { CourseModule } from '../types/tutorial';

export const COURSE_MODULES_L1000: CourseModule[] = [
  {
    id: 'mod_l1000_1',
    moduleNumber: 1,
    title: 'Módulo 1: Norma EN 81-20, Cadeia de Segurança & Freio Mecânico',
    description: 'Intertravamento de portas, duplo freio eletromecânico e comando de marcha.',
    icon: '🛗',
    lessons: [
      {
        id: 'l1000_l1_teoria_seguranca',
        title: 'Lição 1: Diretrizes de Segurança em Elevadores (EN 81-20 / NBR 16858)',
        type: 'THEORY',
        durationMin: 12,
        description: 'Requisitos normativos para transporte vertical, duplo freio mecânico e parada segura.',
        theoryData: {
          title: 'Segurança em Transporte Vertical',
          content: [
            'O Yaskawa L1000 foi desenvolvido especificamente para atender normas mundiais de elevação de passageiros.',
            'A Linha de Segurança engloba contatos de portas de pavimento, trincos, botão de emergência e fim de curso.',
            'O inversor só libera a modulação vetorial se a linha de segurança estiver 100% íntegra e fechada.',
            'A interrupção da segurança desenergiza os IGBTs e as molas fecham as duas sapatas de freio instantaneamente.'
          ],
          diagramInfo: '[Linha de Segurança Fechada] -> [Comando de Marcha S1/S2] -> [Pré-Magnetização PMSM] -> [Abertura do Freio]',
          keyTakeaway: 'O freio de elevador é do tipo "Normalmente Travado por Mola" e só abre quando alimentado eletricamente.'
        }
      },
      {
        id: 'l1000_l2_pratica_subida_s1',
        title: 'Lição 2: Comando de Subida pelo Borne S1',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Comute para modo REMOTO e comande a subida da cabine acionando o borne de marcha S1.',
        steps: [
          {
            id: 'l1000_s1_ativar_remoto',
            title: 'Ativar Modo Remoto na IHM',
            instruction: 'Pressione a tecla LOC/REM no teclado do L1000 para habilitar os bornes de manobra S1 a S4.',
            isCompleted: (s) => String(s.controlSource || '').toUpperCase() === 'REM'
          },
          {
            id: 'l1000_s2_subir_s1',
            title: 'Acionar Borne S1 (Subida)',
            instruction: 'Ligue o borne S1 e observe a liberação do freio com o rotor girando no sentido horário (▲ SUBINDO).',
            isCompleted: (s) => {
              const di1 = Boolean((s.digitalInputs as any)?.di1 || (s.digitalInputs as any)?.DI1);
              const isRun = s.motorStatus === 'RUNNING' || Math.abs(Number(s.outputFrequency ?? 0)) > 0.1;
              return isRun && s.isForwardDirection !== false && di1;
            }
          }
        ]
      }
    ]
  },
  {
    id: 'mod_l1000_2',
    moduleNumber: 2,
    title: 'Módulo 2: Reversão Direta & Comando de Descida Independente',
    description: 'Manobra independente de subida (S1) e descida (S2) sem chaves auxiliares.',
    icon: '🔄',
    lessons: [
      {
        id: 'l1000_l3_teoria_reversao_independente',
        title: 'Lição 3: Lógica de Comando a 2 Fios para Elevadores',
        type: 'THEORY',
        durationMin: 10,
        description: 'Controle direto de direção exigido por quadros de comando de manobra.',
        theoryData: {
          title: 'Comando Independente de Sentido',
          content: [
            'Sinal S1 ativo = Sentido Subida (Up).',
            'Sinal S2 ativo = Sentido Descida (Down).',
            'O inversor executa a reversão direta suave controlando o fluxo e torque em 0 RPM.',
            'Se ambos os sinais forem ativados juntos, o drive bloqueia a partida por segurança.'
          ],
          diagramInfo: '[CLP de Manobra] -> [Sinal S1: Subir] | [Sinal S2: Descer] -> [L1000 Lift Drive]',
          keyTakeaway: 'S1 e S2 são mutuamente exclusivos para garantir a integridade da manobra.'
        }
      },
      {
        id: 'l1000_l4_pratica_descida_s2',
        title: 'Lição 4: Transição de Subida para Descida pelo Borne S2',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Desative S1 e acione diretamente o borne S2 para descer a cabine no sentido reverso.',
        steps: [
          {
            id: 'l1000_s3_desligar_s1',
            title: 'Desligar Borne S1',
            instruction: 'Desative a chave S1 para confirmar a desaceleração e travamento do freio.',
            isCompleted: (s) => !Boolean((s.digitalInputs as any)?.di1 || (s.digitalInputs as any)?.DI1)
          },
          {
            id: 'l1000_s4_ligar_s2',
            title: 'Acionar Borne S2 (Descida Direta)',
            instruction: 'Ligue o borne S2 e comprove a descida da cabine em sentido anti-horário (▼ DESCENDO).',
            isCompleted: (s) => {
              const di1 = Boolean((s.digitalInputs as any)?.di1 || (s.digitalInputs as any)?.DI1);
              const di2 = Boolean((s.digitalInputs as any)?.di2 || (s.digitalInputs as any)?.DI2);
              const isRun = s.motorStatus === 'RUNNING' || Math.abs(Number(s.outputFrequency ?? 0)) > 0.1;
              return isRun && (s.isForwardDirection === false || di2) && di2 && !di1;
            }
          }
        ]
      }
    ]
  },
  {
    id: 'mod_l1000_3',
    moduleNumber: 3,
    title: 'Módulo 3: Pré-Torque com Célula de Carga & Anti Roll-Back',
    description: 'Compensação de desbalanceamento de cabine e partida com zero tranco mecânico.',
    icon: '⚖️',
    lessons: [
      {
        id: 'l1000_l5_teoria_pretorque',
        title: 'Lição 5: Física do Desbalanceamento Cabine / Contrapeso',
        type: 'THEORY',
        durationMin: 12,
        description: 'Como o pesador de carga na entrada A2 equilibra o rotor antes da abertura do freio mecânico.',
        theoryData: {
          title: 'Eliminação de Tranco de Partida (Anti Roll-Back)',
          content: [
            'O contrapeso de um elevador é calculado para equilibrar o peso da cabine vazia mais 40% a 50% da lotação máxima.',
            'Com cabine cheia, ela tende a cair ao abrir o freio; com cabine vazia, o contrapeso tende a puxá-la para cima.',
            'A célula de carga instalada sob a cabine envia um sinal analógico proporcional à entrada A2 do L1000.',
            'O inversor magnetiza o motor com o torque exato em 0 RPM para neutralizar a gravidade antes de recolher as sapatas do freio.'
          ],
          diagramInfo: '[Pesador de Carga 0..10V] -> [Entrada A2] -> [Torque Aplicado em 0 RPM] -> [Freio Abre Suavemente]',
          keyTakeaway: 'O pré-torque perfeito garante que os passageiros não sintam qualquer movimento no instante da partida.'
        }
      },
      {
        id: 'l1000_l6_pratica_pretorque_alta_carga',
        title: 'Lição 6: Partida com 90% de Lotação na Cabine',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Ajuste o pesador de carga para 90% de lotação e comande a subida com compensação ativa.',
        steps: [
          {
            id: 'l1000_s5_ajustar_pesador',
            title: 'Ajustar Célula de Carga >= 90%',
            instruction: 'Deslize o controle do pesador de carga (Entrada A2) até atingir pelo menos 90% de lotação.',
            isCompleted: (s) => ((typeof s.ai1Voltage === 'number' ? s.ai1Voltage : 0) * 10) >= 89
          },
          {
            id: 'l1000_s6_partida_pesada',
            title: 'Subir com Cabine Lotada (S1)',
            instruction: 'Acione o borne S1 e observe a corrente elevada sustentando o peso da cabine sem recuo.',
            isCompleted: (s) => s.motorStatus === 'RUNNING' && Boolean((s.digitalInputs as any)?.di1 || (s.digitalInputs as any)?.DI1)
          }
        ]
      }
    ]
  },
  {
    id: 'mod_l1000_4',
    moduleNumber: 4,
    title: 'Módulo 4: Curvas de Conforto Jerk em Curva S',
    description: 'Sintonia da taxa de variação da aceleração ($m/s^3$) para viagens suaves.',
    icon: '🎢',
    lessons: [
      {
        id: 'l1000_l7_teoria_jerk',
        title: 'Lição 7: Cinemática de Curvas S e o Conceito de Jerk',
        type: 'THEORY',
        durationMin: 12,
        description: 'Como o arredondamento das transições de velocidade elimina a sensação de náusea nos passageiros.',
        theoryData: {
          title: 'Sintonia de Curvas Jerk em Elevadores',
          content: [
            'Acelerações lineares bruscas causam sensação de compressão ou perda de gravidade desagradável aos passageiros.',
            'O Jerk é definido como a taxa de variação da aceleração no tempo ($J = \\frac{da}{dt}$, em $m/s^3$).',
            'O Yaskawa L1000 divide a viagem em 4 estágios em S: Jerk Inicial (C1-01), Aceleração, Jerk Final (C1-03) e Nivelamento (C1-07).'
          ],
          diagramInfo: '[Jerk Inicial C1] -> [Velocidade de Cruzeiro] -> [Jerk Desaceleração C3] -> [Nivelamento C7]',
          keyTakeaway: 'Valores de Jerk bem ajustados proporcionam viagens rápidas com a sensação de estar imóvel.'
        }
      },
      {
        id: 'l1000_l8_pratica_despacho_4andar',
        title: 'Lição 8: Despacho do 1º para o 4º Andar pelo CLP de Manobra',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Chame o 4º Andar no painel do CLP de Manobra e observe a execução completa da curva S.',
        steps: [
          {
            id: 'l1000_s7_chamar_4andar',
            title: 'Chamar o 4º Andar no CLP',
            instruction: 'Clique no botão "4º ANDAR" no painel do CLP de Manobra e observe a aceleração suave.',
            isCompleted: (s) => s.motorStatus === 'RUNNING' || Math.abs(Number(s.outputFrequency ?? 0)) > 0.1
          },
          {
            id: 'l1000_s8_aguardar_parada',
            title: 'Aguardar Nivelamento no 4º Pavimento',
            instruction: 'Acompanhe a desaceleração até a parada suave e abertura de portas no 4º Andar.',
            isCompleted: (s) => s.motorStatus === 'READY' || s.outputFrequency === 0
          }
        ]
      }
    ]
  },
  {
    id: 'mod_l1000_5',
    moduleNumber: 5,
    title: 'Módulo 5: Operação de Inspeção & Segurança em Manutenção',
    description: 'Comando lento manual sobre o teto da cabine e bloqueio de emergência.',
    icon: '👷',
    lessons: [
      {
        id: 'l1000_l9_teoria_inspecao',
        title: 'Lição 9: Protocolos de Manutenção e Velocidade de Inspeção',
        type: 'THEORY',
        durationMin: 12,
        description: 'Operação manual sobre o teto da cabine com velocidade restrita por norma.',
        theoryData: {
          title: 'Modo de Inspeção em Elevadores',
          content: [
            'Para manutenção em guias, cabos e fita de poço, o técnico assume o comando manual sobre a cabine.',
            'A velocidade é limitada pelo parâmetro d1-08 para no máximo 0.3 m/s (10.0 Hz).',
            'O acionamento exige botão de comando constante (homem-morto) e cancela qualquer chamada de passageiros.'
          ],
          diagramInfo: '[Chave Inspeção Ativa] -> [Chamadas Externas Bloqueadas] -> [Velocidade Limitada em 10 Hz]',
          keyTakeaway: 'O modo inspeção prioriza a vida do técnico bloqueando a aceleração automática.'
        }
      },
      {
        id: 'l1000_l10_pratica_inspecao_acao',
        title: 'Lição 10: Acionamento Manual em Modo Inspeção',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Ative o modo Inspeção no painel do CLP e movimente o elevador em velocidade lenta.',
        steps: [
          {
            id: 'l1000_s9_ativar_inspecao',
            title: 'Comutar para MODO INSPEÇÃO',
            instruction: 'Clique no botão "MODO INSPEÇÃO" no painel do CLP de Manobra.',
            isCompleted: () => true
          },
          {
            id: 'l1000_s10_subir_inspecao',
            title: 'Comandar Subida Lenta por S1',
            instruction: 'Acione o borne S1 e comprove a movimentação suave em baixa velocidade de inspeção.',
            isCompleted: (s) => s.motorStatus === 'RUNNING' && Boolean((s.digitalInputs as any)?.di1 || (s.digitalInputs as any)?.DI1)
          }
        ]
      }
    ]
  },
  {
    id: 'mod_l1000_6',
    moduleNumber: 6,
    title: 'Módulo 6: Placa PG-X3 & Feedback de Encoder Absoluto',
    description: 'Controle vetorial em malha fechada FOC com encoder EnDat / SinCos.',
    icon: '🎯',
    lessons: [
      {
        id: 'l1000_l11_teoria_encoder',
        title: 'Lição 11: Realimentação de Ângulo de Polo e Pulsos PG',
        type: 'THEORY',
        durationMin: 12,
        description: 'Como o encoder absoluto de 2048 PPR orienta o campo magnético do motor PMSM.',
        theoryData: {
          title: 'Malha Fechada de Alta Resolução',
          content: [
            'Motores síncronos de ímãs permanentes exigem o conhecimento exato da posição dos polos magnéticos.',
            'A placa PG-X3 lê os pulsos em quadratura para controle de velocidade e trilha absoluta para ângulo inicial.',
            'Caso o cabo de sinal seja rompido, o drive gera a falha imediata PGO (Pulse Generator Open).'
          ],
          diagramInfo: '[Encoder PG-X3] -> [Cabo Blindado Par Trançado] -> [Regulador PI de Velocidade ASR]',
          keyTakeaway: 'O encoder absoluto garante torque total em velocidade zero sem oscilação.'
        }
      },
      {
        id: 'l1000_l12_pratica_teste_emergencia',
        title: 'Lição 12: Simulação de Abertura de Linha de Emergência',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Em movimento, abra a linha de segurança e valide o travamento mecânico imediato.',
        steps: [
          {
            id: 'l1000_s11_partir_movimento',
            title: 'Colocar Elevador em Movimento',
            instruction: 'Acione o borne S1 para acelerar a máquina de tração.',
            isCompleted: (s) => s.motorStatus === 'RUNNING'
          },
          {
            id: 'l1000_s12_abrir_seguranca',
            title: 'Abrir Linha de Segurança',
            instruction: 'Clique no botão "LINHA SEG." para simular abertura de porta e confirmar o travamento mecânico.',
            isCompleted: (s) => s.motorStatus === 'READY' || s.outputFrequency === 0
          }
        ]
      }
    ]
  },
  {
    id: 'mod_l1000_7',
    moduleNumber: 7,
    title: 'Módulo 7: Resgate Automático por Baterias (ARD)',
    description: 'Operação de desencarceramento por No-Break/UPS em falta de energia pública.',
    icon: '🔋',
    lessons: [
      {
        id: 'l1000_l13_teoria_resgate',
        title: 'Lição 13: Busca da Direção Gravitacional Mais Leve',
        type: 'THEORY',
        durationMin: 12,
        description: 'Como o L1000 utiliza o desbalanceamento natural para economizar energia da bateria.',
        theoryData: {
          title: 'Resgate de Emergência em Falta de Energia',
          content: [
            'Em falta de luz, o sistema ativa a alimentação por banco de baterias ou no-break.',
            'O inversor executa a rotina de busca de sentido leve (Light Load Direction Search).',
            'O elevador se desloca em velocidade reduzida até o pavimento mais próximo e abre as portas.'
          ],
          diagramInfo: '[Falta de Luz] -> [Alimentação Bateria 48V] -> [Sentido Gravitacional Leve] -> [Desembarque Seguro]',
          keyTakeaway: 'O resgate por direção leve consome uma fração da energia de uma partida normal.'
        }
      },
      {
        id: 'l1000_l14_pratica_resgate',
        title: 'Lição 14: Procedimento Completo de Resgate de Passageiros',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Cenário: O elevador está bloqueado no 2º Andar com a linha de segurança aberta. Feche a segurança, comute para Remoto e realize o resgate de descida até o 1º Andar.',
        steps: [
          {
            id: 'l1000_s13_fechar_seg',
            title: 'Passo 1: Restabelecer Linha de Segurança',
            instruction: 'A linha de segurança está desarmada. Clique no botão "LINHA SEG." para normalizar o circuito (indicador verde OK).',
            isCompleted: () => true
          },
          {
            id: 'l1000_s14_garantir_remoto',
            title: 'Passo 2: Habilitar Modo Remoto',
            instruction: 'Certifique-se de que a IHM do L1000 está em modo REMOTO (se estiver em LOCAL, pressione o botão LOC/REM).',
            isCompleted: (s) => String(s.controlSource || '').toUpperCase() === 'REM'
          },
          {
            id: 'l1000_s15_despachar_resgate',
            title: 'Passo 3: Chamar o 1º Andar para Desembarque',
            instruction: 'Clique no botão "1º ANDAR" no painel do CLP de Manobra para descer a cabine do 2º para o 1º pavimento e liberar os passageiros.',
            isCompleted: (s) => s.motorStatus === 'RUNNING' || Math.abs(Number(s.outputFrequency ?? 0)) > 0.1
          },
          {
            id: 'l1000_s16_concluir_resgate',
            title: 'Passo 4: Confirmar Abertura de Portas no Nível',
            instruction: 'Aguarde o elevador desacelerar e parar suavemente com as portas abertas no 1º Andar.',
            isCompleted: (s) => s.motorStatus === 'READY' || s.outputFrequency === 0
          }
        ]
      }
    ]
  },
  {
    id: 'mod_l1000_8',
    moduleNumber: 8,
    title: 'Módulo 8: Frenagem Reostática & Regeneração de Energia',
    description: 'Comportamento do chopper de frenagem em descidas pesadas ou subidas vazias.',
    icon: '⚡',
    lessons: [
      {
        id: 'l1000_l15_teoria_regeneracao',
        title: 'Lição 15: Regeneração de Potência em Máquinas Gearless',
        type: 'THEORY',
        durationMin: 12,
        description: 'Dissipação em resistores de frenagem térmica e barramento CC em alta tensão.',
        theoryData: {
          title: 'Regeneração em Transporte Vertical',
          content: [
            'Cabine cheia descendo ou cabine vazia subindo faz a gravidade puxar o motor, gerando energia elétrica.',
            'Essa energia eleva a tensão do barramento CC interno.',
            'O transistor chopper chaveia a energia excedente para o resistor de frenagem dissipar em calor.'
          ],
          diagramInfo: '[Carga a favor da gravidade] -> [Motor Vira Gerador] -> [Tensão CC > 700V] -> [Chopper no Resistor]',
          keyTakeaway: 'O resistor de frenagem deve possuir termostato de proteção térmica contra incêndio.'
        }
      },
      {
        id: 'l1000_l16_pratica_teste_descida_pesada',
        title: 'Lição 16: Teste de Descida em Regime Regenerativo',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Comande a descida direta por S2 e monitore a estabilidade do Link CC.',
        steps: [
          {
            id: 'l1000_s17_descer_s2_regen',
            title: 'Acionar Descida por S2',
            instruction: 'Ligue o borne S2 e observe a corrente e tensão durante a viagem.',
            isCompleted: (s) => s.motorStatus === 'RUNNING' && Boolean((s.digitalInputs as any)?.di2 || (s.digitalInputs as any)?.DI2)
          },
          {
            id: 'l1000_s18_parar_regen',
            title: 'Parar e Travar Freio',
            instruction: 'Desative S2 para confirmar o travamento mecânico.',
            isCompleted: (s) => s.motorStatus === 'READY' || s.outputFrequency === 0
          }
        ]
      }
    ]
  },
  {
    id: 'mod_l1000_9',
    moduleNumber: 9,
    title: 'Módulo 9: Nivelamento de Piso & Rastejo (Creep Speed)',
    description: 'Parada milimétrica no pavimento sem degraus para acessibilidade.',
    icon: '📏',
    lessons: [
      {
        id: 'l1000_l17_teoria_nivelamento',
        title: 'Lição 17: Zona de Nivelamento Conforme Norma de Acessibilidade',
        type: 'THEORY',
        durationMin: 10,
        description: 'Desaceleração para velocidade lenta antes do corte exato no sensor de piso.',
        theoryData: {
          title: 'Nivelamento de Alta Precisão',
          content: [
            'A norma exige desnível máximo de 10 mm entre o piso da cabine e o pavimento.',
            'O L1000 desacelera para uma velocidade de rastejo de 2.0 Hz antes da parada final.',
            'O sensor de fita de poço aciona o comando de parada no momento do alinhamento.'
          ],
          diagramInfo: '[Velocidade 60Hz] -> [Desaceleração em Curva S] -> [Rastejo 2Hz] -> [Parada Milimétrica]',
          keyTakeaway: 'O nivelamento preciso evita tropeços de passageiros e desgastes mecânicos.'
        }
      },
      {
        id: 'l1000_l18_pratica_nivelamento_3andar',
        title: 'Lição 18: Nivelamento Intermediário no 3º Pavimento',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Despache a cabine para o 3º Andar e avalie a desaceleração de aproximação.',
        steps: [
          {
            id: 'l1000_s19_chamar_piso3',
            title: 'Despachar para 3º Andar',
            instruction: 'Clique no botão "3º ANDAR" no CLP de Manobra.',
            isCompleted: (s) => s.motorStatus === 'RUNNING' || Math.abs(Number(s.outputFrequency ?? 0)) > 0.1
          },
          {
            id: 'l1000_s20_checar_nivelamento',
            title: 'Aguardar Parada no Nível',
            instruction: 'Aguarde a parada completa com abertura de portas no 3º Andar.',
            isCompleted: (s) => s.motorStatus === 'READY' || s.outputFrequency === 0
          }
        ]
      }
    ]
  },
  {
    id: 'mod_l1000_10',
    moduleNumber: 10,
    title: 'Módulo 10: Auto-Tuning Estático de Motor PMSM',
    description: 'Cálculo de indutâncias e ângulo de polo magnético sem desacoplar cabos de aço.',
    icon: '🧭',
    lessons: [
      {
        id: 'l1000_l19_teoria_autotuning',
        title: 'Lição 19: Princípio do Stationary Auto-Tuning',
        type: 'THEORY',
        durationMin: 12,
        description: 'Determinação do offset do encoder em máquinas de tração com cabos passados.',
        theoryData: {
          title: 'Auto-Ajuste Estático de Motores de Ímãs',
          content: [
            'Em elevadores instalados, não é viável retirar os cabos de aço da polia para rodar o motor livremente.',
            'O L1000 injeta pulsos de alta frequência no estator para medir a saliência magnética sem girar o rotor.',
            'O ângulo inicial de polo magnético é calculado e gravado na memória EEPROM.'
          ],
          diagramInfo: '[Pulsos de Tensão Injetados] -> [Medição de Corrente $I_d / I_q$] -> [Offset Gravado no Drive]',
          keyTakeaway: 'O ângulo de offset correto garante o rendimento máximo e torque pleno do motor.'
        }
      },
      {
        id: 'l1000_l20_pratica_autotuning_run',
        title: 'Lição 20: Validação de Rotação Pós Auto-Tuning',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Parta o motor e verifique a suavidade e silêncio do acionamento PMSM.',
        steps: [
          {
            id: 'l1000_s21_partida_pos_tune',
            title: 'Partir Motor em Subida',
            instruction: 'Acione o borne S1 e observe a suavidade de aceleração.',
            isCompleted: (s) => s.motorStatus === 'RUNNING' && Boolean((s.digitalInputs as any)?.di1 || (s.digitalInputs as any)?.DI1)
          },
          {
            id: 'l1000_s22_checar_estabilidade',
            title: 'Confirmar Estabilidade de Marcha',
            instruction: 'Verifique a rotação estável no cartão de telemetria.',
            isCompleted: (s) => Math.abs(Number(s.outputFrequency ?? 0)) > 20.0
          }
        ]
      }
    ]
  },
  {
    id: 'mod_l1000_11',
    moduleNumber: 11,
    title: 'Módulo 11: Regulador de Velocidade ASR (Ganhos P e I)',
    description: 'Sintonia do laço PI de rotação para eliminação de oscilações e overshoot.',
    icon: '🎯',
    lessons: [
      {
        id: 'l1000_l21_teoria_asr',
        title: 'Lição 21: Malha de Velocidade Proporcional-Integral',
        type: 'THEORY',
        durationMin: 12,
        description: 'Como os ganhos C5-01 e C5-02 corrigem desvios de carga em milissegundos.',
        theoryData: {
          title: 'Sintonia do ASR no L1000',
          content: [
            'O ganho proporcional (P) aumenta a rapidez de resposta a variações de torque.',
            'O ganho integral (I) elimina o erro de velocidade em regime permanente.',
            'Ganhos excessivamente altos provocam vibração acústica no cabo de aço e na cabine.'
          ],
          diagramInfo: '[Erro de Velocidade] -> [Ganho P + Ganho I] -> [Comando de Torque Vetorial]',
          keyTakeaway: 'Sintonize o ASR para obter resposta firme sem gerar zumbido na máquina.'
        }
      },
      {
        id: 'l1000_l22_pratica_teste_carga_asr',
        title: 'Lição 22: Teste de Carga com Malha ASR Estável',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Aplique torque resistente e comprove a manutenção exata da velocidade.',
        steps: [
          {
            id: 'l1000_s23_partir_asr',
            title: 'Partir Máquina de Tração',
            instruction: 'Acione o borne S1 para atingir velocidade de cruzeiro.',
            isCompleted: (s) => s.motorStatus === 'RUNNING'
          },
          {
            id: 'l1000_s24_checar_rpm',
            title: 'Conferir Rotação Nominal',
            instruction: 'Verifique se o RPM do motor se mantém cravado na rotação nominal.',
            isCompleted: (s) => Math.abs(Number(s.outputFrequency ?? 0)) > 30.0
          }
        ]
      }
    ]
  },
  {
    id: 'mod_l1000_12',
    moduleNumber: 12,
    title: 'Módulo 12: Função Serviço de Bombeiro (Fire Service Fase 1)',
    description: 'Protocolo de evacuação de emergência sem paradas intermediárias.',
    icon: '🔥',
    lessons: [
      {
        id: 'l1000_l23_teoria_bombeiro',
        title: 'Lição 23: Manobra de Evacuação de Incêndio',
        type: 'THEORY',
        durationMin: 10,
        description: 'Cancelamento de chamadas e direcionamento expresso ao pavimento térreo.',
        theoryData: {
          title: 'Modo de Serviço de Incêndio',
          content: [
            'Em alarme de incêndio, o inversor cancela todas as chamadas registradas nos andares.',
            'O elevador viaja em velocidade direta até o pavimento principal de fuga de bombeiros.',
            'As portas abrem para evacuação e o elevador permanece bloqueado.'
          ],
          diagramInfo: '[Alarme Incêndio Ativo] -> [Cancela Chamadas] -> [Viagem Direta ao Térreo] -> [Abre Portas e Bloqueia]',
          keyTakeaway: 'A segurança humana é a prioridade absoluta em manobras de emergência prediais.'
        }
      },
      {
        id: 'l1000_l24_pratica_bombeiro',
        title: 'Lição 24: Simulação de Viagem de Evacuação ao Térreo',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Despache a cabine para o 1º Andar simulando a manobra de bombeiros.',
        steps: [
          {
            id: 'l1000_s25_despacho_terreo',
            title: 'Chamar 1º Andar (Evacuação)',
            instruction: 'Clique no botão "1º ANDAR" no painel do CLP de Manobra.',
            isCompleted: (s) => s.motorStatus === 'RUNNING' || Math.abs(Number(s.outputFrequency ?? 0)) > 0.1
          },
          {
            id: 'l1000_s26_chegada_terreo',
            title: 'Confirmar Chegada e Portas Abertas',
            instruction: 'Aguarde o elevador nivelar e abrir as portas no pavimento térreo.',
            isCompleted: (s) => s.motorStatus === 'READY' || s.outputFrequency === 0
          }
        ]
      }
    ]
  },
  {
    id: 'mod_l1000_13',
    moduleNumber: 13,
    title: 'Módulo 13: Proteção Térmica do Freio Eletromecânico',
    description: 'Tensão de abertura plena versus tensão de manutenção (Holding Voltage).',
    icon: '🛡️',
    lessons: [
      {
        id: 'l1000_l25_teoria_protecao_freio',
        title: 'Lição 25: Economia de Energia e Proteção de Bobinas de Freio',
        type: 'THEORY',
        durationMin: 12,
        description: 'Como a redução de tensão evita a queima das bobinas do freio mecânico.',
        theoryData: {
          title: 'Controle de Excitação do Freio',
          content: [
            'Abre-se o freio aplicando 100% da tensão nominal (ex: 110V CC) por 0.5 segundos.',
            'Após a abertura mecânica, reduz-se a tensão para cerca de 50% (Tensão de Manutenção).',
            'Isso reduz o aquecimento das bobinas em 75% e economiza energia.'
          ],
          diagramInfo: '[100% Tensão: Abertura Rápida] -> [0.5s depois] -> [50% Tensão: Manutenção Fria]',
          keyTakeaway: 'A tensão de retenção reduzida prolonga em anos a vida útil das bobinas de freio.'
        }
      },
      {
        id: 'l1000_l26_pratica_teste_freio',
        title: 'Lição 26: Teste de Abertura e Retenção do Freio em Marcha',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Execute uma partida e observe o status de liberação do freio no visor.',
        steps: [
          {
            id: 'l1000_s27_subir_freio_ok',
            title: 'Partir Motor por S1',
            instruction: 'Acione o borne S1 e observe a indicação BRK_RLS ativa no visor do L1000.',
            isCompleted: (s) => s.motorStatus === 'RUNNING' && Boolean((s.digitalInputs as any)?.di1 || (s.digitalInputs as any)?.DI1)
          },
          {
            id: 'l1000_s28_parar_freio_travado',
            title: 'Parar e Confirmar Travamento',
            instruction: 'Desative S1 e confirme o fechamento seguro do freio.',
            isCompleted: (s) => s.motorStatus === 'READY' || s.outputFrequency === 0
          }
        ]
      }
    ]
  },
  {
    id: 'mod_l1000_14',
    moduleNumber: 14,
    title: 'Módulo 14: Diagnóstico de Falhas de Elevadores (dEv, PGO, OS)',
    description: 'Análise de desvio de velocidade, sobrevelocidade e perda de pulsos de encoder.',
    icon: '⚠️',
    lessons: [
      {
        id: 'l1000_l27_teoria_falhas_elevador',
        title: 'Lição 27: Códigos de Alarme Críticos no Yaskawa L1000',
        type: 'THEORY',
        durationMin: 12,
        description: 'Identificação de dEv (Speed Deviation), PGO (Encoder Open) e OS (Over Speed).',
        theoryData: {
          title: 'Proteções Especiais de Elevadores',
          content: [
            'dEv: A velocidade real divergiu da referência programada por mais de 10% (ex: freio arrastando).',
            'PGO: O inversor perdeu a leitura dos pulsos do encoder com comando de marcha ativo.',
            'OS: A cabine ultrapassou a velocidade máxima de segurança em descida ou subida.'
          ],
          diagramInfo: '[Detecção de Desvio dEv / PGO / OS] -> [Corte Imediato de Torque] -> [Freio Mecânico Fecha Instantaneamente]',
          keyTakeaway: 'Falhas de encoder exigem inspeção imediata do acoplamento mecânico e cabeamento.'
        }
      },
      {
        id: 'l1000_l28_pratica_falha_reset_l1000',
        title: 'Lição 28: Injeção de Falha e Procedimento de Reset',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Injete uma falha de sobretemperatura e execute o desbloqueio seguro pela tecla RESET.',
        steps: [
          {
            id: 'l1000_s29_injetar_falha_l1000',
            title: 'Injetar Falha F070',
            instruction: 'No painel de injeção de falhas, clique em F070.',
            isCompleted: (s) => s.activeFault !== null
          },
          {
            id: 'l1000_s30_reset_l1000',
            title: 'Pressionar RESET no Teclado',
            instruction: 'Pressione o botão RESET no teclado da IHM para restabelecer a prontidão.',
            isCompleted: (s) => s.activeFault === null
          }
        ]
      }
    ]
  },
  {
    id: 'mod_l1000_15',
    moduleNumber: 15,
    title: 'Módulo 15: Comissionamento Final & Telemetria 3D Completa',
    description: 'Checklist completo de entrega, medição de velocidade linear em m/s e RPM do eixo.',
    icon: '🏆',
    lessons: [
      {
        id: 'l1000_l29_teoria_entrega_elevador',
        title: 'Lição 29: Protocolo de Entrega Técnica e Vistoria Final',
        type: 'THEORY',
        durationMin: 12,
        description: 'Verificação de pesador de carga, nivelamento milimétrico e curvas de conforto.',
        theoryData: {
          title: 'Entrega Técnica de Elevadores de Alta Performance',
          content: [
            'Conferência da corrente em carga plena e carga vazia em ambos os sentidos.',
            'Inspeção da temperatura do motor PMSM e dissipador do inversor após viagens consecutivas.',
            'Validação da parada suave e nivelamento em todos os pavimentos do edifício.'
          ],
          diagramInfo: '[Vistoria Mecânica] -> [Aferição de Corrente] -> [Teste de Jerk] -> [Laudo de Aprovação]',
          keyTakeaway: 'A entrega comissionada garante conforto aos usuários e confiabilidade aos condomínios.'
        }
      },
      {
        id: 'l1000_l30_pratica_comissionamento_final',
        title: 'Lição 30: Viagem de Aprovação Final e Telemetria',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Despache a cabine para o 4º Andar inspecionando todos os cartões de telemetria em tempo real.',
        steps: [
          {
            id: 'l1000_s31_viagem_aprovacao',
            title: 'Despachar Viagem de Aprovação',
            instruction: 'Clique no botão "4º ANDAR" no CLP de Manobra e acompanhe a telemetria em tempo real.',
            isCompleted: (s) => s.motorStatus === 'RUNNING' || Math.abs(Number(s.outputFrequency ?? 0)) > 0.1
          },
          {
            id: 'l1000_s32_conclusao_sucesso',
            title: 'Concluir Certificação do Elevador',
            instruction: 'Aguarde a parada no 4º Andar com status 100% aprovado.',
            isCompleted: (s) => s.motorStatus === 'READY' || s.outputFrequency === 0
          }
        ]
      }
    ]
  }
];