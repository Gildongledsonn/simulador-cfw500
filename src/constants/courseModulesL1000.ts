import { CourseModule } from '../types/tutorial';

export const COURSE_MODULES_L1000: CourseModule[] = [
  // =========================================================================================
  // BLOCO 1: FUNDAMENTOS, HARDWARE & SEGURANÇA (MÓDULOS 1 A 5)
  // =========================================================================================
  {
    id: 'l1000-mod1',
    moduleNumber: 1,
    title: 'Apresentação do L1000 & Normas NM 207 / EN 81',
    description: 'Arquitetura de inversores dedicados a elevadores, segurança e normas técnicas.',
    icon: '🛗',
    lessons: [
      {
        id: 'l1000-m1-l1',
        title: 'Lição 1: Anatomia de um Inversor de Elevadores',
        description: 'Diferenças construtivas entre inversores industriais e inversores dedicados a elevação.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Arquitetura do Yaskawa L1000',
          content: [
            'O inversor L1000 foi projetado especificamente para acionamento de elevadores de passageiros e carga.',
            'Diferente dos inversores comuns, ele possui controle de torque em velocidade zero, curvas em S avançadas (Jerk) e sequenciamento de freio mecânico integrado.',
            'Opera com motores assíncronos convencionais (com engrenagem) e motores de ímãs permanentes síncronos (Gearless).',
          ],
          keyTakeaway: 'Inversores de elevador priorizam conforto acústico, precisão de parada e segurança contra recuo (rollback).',
        },
      },
      {
        id: 'l1000-m1-l2',
        title: 'Lição 2: Requisitos das Normas NM 207 e EN 81-20/50',
        description: 'Exigências de contatores de linha, freio duplo e monitoramento de falhas.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Segurança Normativa em Elevadores',
          content: [
            'A norma exige corte de potência redundante entre o inversor e o motor através de contatores com contatos guiados (EDM).',
            'O freio eletromecânico deve possuir duas sapatas/discos independentes para garantir a retenção da cabine.',
            'O inversor deve monitorar o estado dos contatores antes de liberar novas viagens.',
          ],
          keyTakeaway: 'Falhas na linha de segurança provocam o desligamento imediato e desarme do freio mecânico.',
        },
      },
      {
        id: 'l1000-m1-l3',
        title: 'Lição 3: Conceito de Equilíbrio de Cabine e Contrapeso',
        description: 'Entenda o fator de balanceamento (40% a 50%) e viagens regenerativas.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Dinâmica de Carga em Tração Vertical',
          content: [
            'O contrapeso equilibra o peso morto da cabine mais 40% a 50% da carga nominal.',
            'Cabine cheia subindo: Motor consome energia da rede elétrica (modo motor).',
            'Cabine cheia descendo ou vazia subindo: Gravidade puxa a cabine, o motor vira gerador e devolve energia ao barramento CC (modo regenerativo).',
          ],
          keyTakeaway: 'A frenagem dinâmica por resistor é vital para queimar a energia gerada em viagens regenerativas.',
        },
      },
    ],
  },
  {
    id: 'l1000-mod2',
    moduleNumber: 2,
    title: 'Circuito de Potência, Bornes e Aterramento',
    description: 'Ligações de força R/S/T, U/V/W, barramento CC, resistor e filtros EMC.',
    icon: '⚡',
    lessons: [
      {
        id: 'l1000-m2-l1',
        title: 'Lição 1: Entrada de Rede e Barramento CC (+1, +2, -)',
        description: 'Dimensionamento de disjuntores, fusíveis ultrarrápidos e reatores de linha.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Conexão de Entrada e Retificação',
          content: [
            'Entrada de rede trifásica nos bornes R/L1, S/L2 e T/L3.',
            'O barramento de corrente contínua mantém a tensão estável em ~310V (rede 220V) ou ~540V (rede 380V).',
            'Reatores de linha reduzem harmônicas e protegem a ponte retificadora contra surtos.',
          ],
          keyTakeaway: 'Nunca ligue a rede de alimentação nos bornes de saída U/V/W.',
        },
      },
      {
        id: 'l1000-m2-l2',
        title: 'Lição 2: Conexão do Motor e Resistor de Frenagem (B1/B2)',
        description: 'Esquema de ligação do resistor térmico e cabo blindado de motor.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Instalação do Resistor e Saída U/V/W',
          content: [
            'O resistor de frenagem deve ser ligado diretamente aos bornes B1 e B2.',
            'O cabo do motor deve ser blindado com a malha aterrada em 360° para conter o ruído de alta frequência do PWM.',
          ],
          keyTakeaway: 'Mantenha o resistor em local ventilado devido à alta dissipação de calor.',
        },
      },
      {
        id: 'l1000-m2-l3',
        title: 'Lição 3: Blindagem e Aterramento em Casa de Máquinas',
        description: 'Técnicas de isolamento e equalização de potencial contra ruídos no encoder.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Eliminação de Interferência Eletromagnética (EMC)',
          content: [
            'Cabos de controle e encoder devem correr em eletrocalhas separadas dos cabos de força.',
            'O aterramento do painel, motor e inversor deve ser unificado na mesma barra equipotencial.',
          ],
          keyTakeaway: 'Ruídos no cabo do encoder geram falsas falhas de desvio de velocidade (dEv).',
        },
      },
      {
        id: 'l1000-m2-l4',
        title: 'Lição 4: Inspeção Visual e Teste de Isolamento (Megômetro)',
        description: 'Cuidados essenciais antes de energizar o painel pela primeira vez.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Procedimento Pré-Energização',
          content: [
            'Desconecte o inversor antes de aplicar megômetro na fiação do motor.',
            'Confira o torque dos parafusos de potência para evitar pontos quentes.',
          ],
          keyTakeaway: 'A tensão do megômetro pode destruir os módulos semicondutores IGBT do inversor.',
        },
      },
      {
        id: 'l1000-m2-l5',
        title: 'Lição 5: Prática de Checklist de Conexões Elétricas',
        description: 'Validação interativa dos bornes de força e medição de tensões.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m2-s1',
            title: 'Verificar Tensão no Barramento CC',
            instruction: 'Acesse o display e verifique se a tensão CC está acima de 300V.',
            isCompleted: (s) => (s.dcBusVoltage ?? 310) >= 300,
          },
          {
            id: 'l1000-m2-s2',
            title: 'Confirmar Estado Pronto (RDY)',
            instruction: 'Certifique-se de que o inversor não possui falhas ativas na inicialização.',
            isCompleted: (s) => s.motorStatus !== 'FAULT' && s.activeFault === null,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod3',
    moduleNumber: 3,
    title: 'IHM Digital & Navegação nos Menus do L1000',
    description: 'Navegação nos modos Operation, Program, Auto-Tuning e Modified Parameters.',
    icon: '📟',
    lessons: [
      {
        id: 'l1000-m3-l1',
        title: 'Lição 1: Teclado LCD e LEDs de Status',
        description: 'Funções das teclas ESC, JOG, RESET, ENTER, RUN e STOP.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'IHM do L1000',
          content: [
            'Display de 5 dígitos/LCD retroiluminado com monitoramento simultâneo de velocidade, corrente e frequência.',
            'Teclas direcionais para navegação rápida entre grupos A, b, C, d, E, F e U.',
          ],
          keyTakeaway: 'A tecla ESC retorna ao nível anterior e cancela alterações não confirmadas.',
        },
      },
      {
        id: 'l1000-m3-l2',
        title: 'Lição 2: Estrutura de Grupos de Parâmetros',
        description: 'Entenda a divisão funcional: A1 (Inicialização), b1 (Comandos), C1 (Rampas), d1 (Velocidades).',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Organização de Menus',
          content: [
            'Grupo A: Nível de acesso (A1-01) e Método de Controle (A1-02).',
            'Grupo b: Sequenciamento de freio e pré-torque.',
            'Grupo C: Aceleração, desaceleração e curvas Jerk.',
            'Grupo d: Velocidades pré-programadas do elevador.',
          ],
          keyTakeaway: 'A1-03 permite resetar o inversor para o padrão de fábrica de 2 ou 3 fios.',
        },
      },
      {
        id: 'l1000-m3-l3',
        title: 'Lição 3: Modo de Monitoramento (Grupo U)',
        description: 'Leitura em tempo real de velocidade de cabine, corrente, torque e tensão.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Variáveis de Monitor do Grupo U',
          content: [
            'U1-01: Frequência de saída (Hz).',
            'U1-02: Velocidade do motor em RPM ou m/s.',
            'U1-03: Corrente de saída eficaz (A).',
            'U1-05: Velocidade lida pelo encoder PG.',
          ],
          keyTakeaway: 'Comparar U1-02 com U1-05 permite diagnosticar escorregamento ou perda de pulsos no encoder.',
        },
      },
      {
        id: 'l1000-m3-l4',
        title: 'Lição 4: Prática de Navegação e Leitura de Parâmetros',
        description: 'Navegue pelos parâmetros utilizando as teclas da IHM.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m3-s1',
            title: 'Entrar no Modo de Programação',
            instruction: 'Pressione a tecla PROG na IHM para acessar a lista de parâmetros.',
            isCompleted: (s) => s.ihmMode === 'PARAM_SELECT' || s.ihmMode === 'PARAM_EDIT',
          },
          {
            id: 'l1000-m3-s2',
            title: 'Consultar Parâmetro de Frequência',
            instruction: 'Selecione o parâmetro P0002 ou P0005 para confirmar a referência.',
            isCompleted: (s) => s.selectedParamIndex !== undefined,
          },
        ],
      },
      {
        id: 'l1000-m3-l5',
        title: 'Lição 5: Prática de Reset para Padrão de Fábrica',
        description: 'Restaure os valores originais do inversor com segurança.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m3-s3',
            title: 'Resetar Inversor',
            instruction: 'Utilize o comando de restauração de fábrica para limpar ajustes anteriores.',
            isCompleted: (s) => s.motorStatus === 'READY' || (s.outputFrequency ?? 0) === 0,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod4',
    moduleNumber: 4,
    title: 'Motores de Tração: Indução vs. PMSM Gearless',
    description: 'Análise de máquinas com redutor vs. máquinas síncronas sem engrenagem.',
    icon: '⚙️',
    lessons: [
      {
        id: 'l1000-m4-l1',
        title: 'Lição 1: Motores de Indução com Redutor (Geared)',
        description: 'Características, relação de polia, rendimento e escorregamento.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Máquinas de Tração Geared',
          content: [
            'Utilizam caixa de redução com coroa e sem-fim para converter alta rotação em torque na polia.',
            'Operam tipicamente com controle vetorial de malha fechada (FOC) com encoder incremental.',
          ],
          keyTakeaway: 'Requerem manutenção periódica de óleo na caixa de engrenagens.',
        },
      },
      {
        id: 'l1000-m4-l2',
        title: 'Lição 2: Motores Síncronos de Ímãs Permanentes (Gearless PMSM)',
        description: 'Alta eficiência, múltiplos polos e eliminação total da caixa de redução.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Máquinas de Tração Gearless PMSM',
          content: [
            'O rotor possui ímãs de Neodímio de alta densidade magnética.',
            'Acoplamento direto da polia ao eixo, operando em rotações baixas (ex: 90 a 250 RPM) com torque extremo.',
          ],
          keyTakeaway: 'Exigem encoder absoluto (EnDat/SinCos) com sintonia rigorosa do ângulo inicial do ímã.',
        },
      },
      {
        id: 'l1000-m4-l3',
        title: 'Lição 3: Seleção do Método de Controle em A1-02',
        description: 'V/f, Vetorial Malha Aberta (OLV), Vetorial Malha Fechada (CLV) e Vetorial PM.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Métodos de Controle do L1000',
          content: [
            'A1-02 = 3: Vetorial de Malha Fechada para motor de indução (CLV).',
            'A1-02 = 7: Vetorial de Malha Fechada para motor PMSM de ímãs permanentes (CLV-PM).',
          ],
          keyTakeaway: 'A seleção errada impede a movimentação do motor e gera sobrecorrente imediata.',
        },
      },
    ],
  },
  {
    id: 'l1000-mod5',
    moduleNumber: 5,
    title: 'Cartões PG & Configuração de Encoders',
    description: 'Instalação de placas PG-X3, PG-F3, resolução de pulsos e canais A/B/Z.',
    icon: '🔄',
    lessons: [
      {
        id: 'l1000-m5-l1',
        title: 'Lição 1: Encoders Incrementais (Line Driver / Push-Pull)',
        description: 'Sinais A, /A, B, /B, Z, /Z e número de pulsos (PPR).',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Funcionamento de Encoders Incrementais',
          content: [
            'Enviam pulsos elétricos defasados em 90° para determinação de velocidade e sentido de rotação.',
            'Padrão industrial de 1024 a 4096 PPR.',
          ],
          keyTakeaway: 'Sinais diferenciais (/A e /B) cancelam ruídos eletromagnéticos induzidos no cabo.',
        },
      },
      {
        id: 'l1000-m5-l2',
        title: 'Lição 2: Encoders Absolutos (EnDat 2.1/2.2 e SinCos)',
        description: 'Comunicação serial de alta velocidade e detecção de posição absoluta.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Encoders de Alta Resolução para PMSM',
          content: [
            'Fornecem a posição angular exata do rotor no momento em que o inversor é ligado.',
            'Indispensáveis para máquinas Gearless para evitar solavanco na liberação do freio.',
          ],
          keyTakeaway: 'Protocolo EnDat transmite a posição absoluta via barramento digital síncrono.',
        },
      },
      {
        id: 'l1000-m5-l3',
        title: 'Lição 3: Parâmetros F1-01 (PPR) e F1-02 (Sentido)',
        description: 'Configuração da placa de encoder e sincronismo de contagem.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Parametrização do Encoder no L1000',
          content: [
            'F1-01: Insere o número de pulsos gravado na placa de identificação do encoder.',
            'F1-02: Seleciona se a fase A avança a fase B no sentido horário (CW).',
          ],
          keyTakeaway: 'Se o sentido estiver invertido, o inversor desarmará por sobrevelocidade (oS).',
        },
      },
      {
        id: 'l1000-m5-l4',
        title: 'Lição 4: Prática de Leitura de Velocidade no Encoder',
        description: 'Verifique a rotação lida pelo encoder na telemetria.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m5-s1',
            title: 'Ligar Inversor em Velocidade de Teste',
            instruction: 'Pressione a tecla RUN para girar o motor e ler os pulsos do encoder.',
            isCompleted: (s) => (s.outputFrequency ?? 0) > 5,
          },
          {
            id: 'l1000-m5-s2',
            title: 'Verificar Consistência de RPM',
            instruction: 'Confirme se o RPM estimado no painel é proporcional à frequência de saída.',
            isCompleted: (s) => (s.motorRPM ?? 0) > 100 || (s.outputFrequency ?? 0) > 5,
          },
        ],
      },
    ],
  },

  // =========================================================================================
  // BLOCO 2: AUTO-TUNING, PARÂMETROS DE MOTOR & CURVAS JERK (MÓDULOS 6 A 10)
  // =========================================================================================
  {
    id: 'l1000-mod6',
    moduleNumber: 6,
    title: 'Auto-Tuning de Motores de Indução (Menu T1)',
    description: 'Medição estática e rotativa de resistência estatórica e corrente de magnetização.',
    icon: '🛠️',
    lessons: [
      {
        id: 'l1000-m6-l1',
        title: 'Lição 1: Dados de Placa Necessários para o Tuning',
        description: 'Potência (kW), Tensão (V), Corrente (A), Frequência (Hz), RPM e Polos.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Coleta de Dados de Placa',
          content: [
            'A precisão do controle vetorial depende 100% da exatidão dos dados inseridos no menu T1.',
            'Dados incorretos geram aquecimento excessivo e perda de torque na partida.',
          ],
          keyTakeaway: 'Consulte a placa de identificação metálica fixada na carcaça da máquina de tração.',
        },
      },
      {
        id: 'l1000-m6-l2',
        title: 'Lição 2: Auto-Tuning Estático vs. Rotativo',
        description: 'Quando usar cada método em campo com cabos de tração passados.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Tipos de Auto-Tuning',
          content: [
            'Tuning Rotativo: O motor gira livre sem cabos. Proporciona a máxima precisão de magnetização.',
            'Tuning Estático: Injeta corrente CC com motor travado e cabos de aço passados na polia.',
          ],
          keyTakeaway: 'O tuning estático é o mais utilizado em modernizações onde não é viável retirar os cabos.',
        },
      },
      {
        id: 'l1000-m6-l3',
        title: 'Lição 3: Procedimento de Execução do Tuning T1',
        description: 'Passo a passo na IHM até a mensagem de sucesso (END).',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Executando o Menu T1',
          content: [
            '1. Selecione T1-01 = 0 (Rotativo) ou 1 (Estático).',
            '2. Insira potência, tensão, corrente, frequência e polos.',
            '3. Pressione a tecla RUN e aguarde o inversor medir a resistência (Rs).',
          ],
          keyTakeaway: 'Nunca interrompa a alimentação enquanto a IHM exibir Tuning in Progress.',
        },
      },
      {
        id: 'l1000-m6-l4',
        title: 'Lição 4: Prática de Configuração dos Dados Nominais',
        description: 'Insira os dados nominais da máquina de tração na memória.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m6-s1',
            title: 'Programar Tensão Nominal do Motor (P0400)',
            instruction: 'Ajuste a tensão nominal do motor para 220V ou 380V conforme a placa.',
            isCompleted: (s) => (s.parameters?.P0400?.currentValue ?? 0) >= 200,
          },
          {
            id: 'l1000-m6-s2',
            title: 'Programar Corrente Nominal do Motor (P0403)',
            instruction: 'Ajuste a corrente nominal de placa da máquina de tração.',
            isCompleted: (s) => (s.parameters?.P0403?.currentValue ?? 0) > 2.0,
          },
        ],
      },
      {
        id: 'l1000-m6-l5',
        title: 'Lição 5: Prática de Partida e Teste de Corrente em Vazio',
        description: 'Acione o motor e confira a corrente estabilizada.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m6-s3',
            title: 'Partir Motor em Velocidade Nominal',
            instruction: 'Pressione RUN e acelere o motor até 60 Hz.',
            isCompleted: (s) => (s.outputFrequency ?? 0) >= 50,
          },
          {
            id: 'l1000-m6-s4',
            title: 'Verificar Corrente Estável',
            instruction: 'Certifique-se de que a corrente do motor não excedeu o limite térmico.',
            isCompleted: (s) => Number(s.outputCurrent ?? 0) < 15,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod7',
    moduleNumber: 7,
    title: 'Auto-Tuning de Motores Síncronos PMSM (Menu T2)',
    description: 'Medição de indutâncias Ld/Lq e constante de contra-eletromotriz (Ke).',
    icon: '🧲',
    lessons: [
      {
        id: 'l1000-m7-l1',
        title: 'Lição 1: Grandezas Específicas de Máquinas Gearless PMSM',
        description: 'Indutância de eixo direto (Ld), quadratura (Lq) e tensão induzida (Ke).',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Modelagem de Motores de Ímãs Permanentes',
          content: [
            'Motores PMSM não possuem corrente de magnetização (o fluxo vem dos ímãs).',
            'O inversor mede as indutâncias Ld e Lq para controlar com precisão o vetor de corrente.',
          ],
          keyTakeaway: 'A perfeita sintonia de Ld/Lq garante alto torque em velocidade zero sem oscilação.',
        },
      },
      {
        id: 'l1000-m7-l2',
        title: 'Lição 2: Procedimento do Menu T2 para PMSM',
        description: 'Passo a passo para auto-ajuste estático de máquina de tração síncrona.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Auto-Tuning Estático T2',
          content: [
            'T2-01 seleciona o tipo de motor PM (Surface Mounted ou Interior PM).',
            'O inversor emite pulsos sonoros de alta frequência para calcular a indutância sem girar o rotor.',
          ],
          keyTakeaway: 'O freio mecânico deve permanecer totalmente fechado durante este teste.',
        },
      },
      {
        id: 'l1000-m7-l3',
        title: 'Lição 3: Validação de Parâmetros de Motor E5',
        description: 'Conferência dos valores salvos nos parâmetros E5-01 a E5-24.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Parâmetros E5 de Motor PM',
          content: [
            'E5-02: Potência nominal do motor PM (kW).',
            'E5-03: Tensão nominal (V).',
            'E5-04: Corrente nominal (A).',
            'E5-06: Número de polos do motor PMSM (ex: 16, 20, 24 ou 32 polos).',
          ],
          keyTakeaway: 'O número de polos em máquinas Gearless é muito superior ao de motores convencionais.',
        },
      },
      {
        id: 'l1000-m7-l4',
        title: 'Lição 4: Prática de Ajuste de Polos e Frequência Base',
        description: 'Configure os parâmetros nominais de máquina de tração síncrona.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m7-s1',
            title: 'Ajustar Frequência Nominal (P0401)',
            instruction: 'Defina a frequência nominal de operação para 60.0 Hz.',
            isCompleted: (s) => (s.parameters?.P0401?.currentValue ?? 0) === 60.0,
          },
          {
            id: 'l1000-m7-s2',
            title: 'Ajustar Rotação Nominal (P0402)',
            instruction: 'Defina o RPM nominal da máquina de tração.',
            isCompleted: (s) => (s.parameters?.P0402?.currentValue ?? 0) >= 1000,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod8',
    moduleNumber: 8,
    title: 'Calibração do Offset de Polo do Encoder',
    description: 'Procedimento para medição e ajuste do ângulo inicial do polo magnético (T2-04).',
    icon: '🎯',
    lessons: [
      {
        id: 'l1000-m8-l1',
        title: 'Lição 1: Por que o Offset de Polo é Vital?',
        description: 'Entenda a relação geométrica entre o campo magnético do estator e os ímãs do rotor.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Ângulo de Polo Magnético',
          content: [
            'Para que o inversor gere torque útil, o campo do estator precisa estar a exatamente 90° elétricos dos ímãs.',
            'O encoder absoluto lê a posição mecânica, e o inversor calcula o offset para saber onde os ímãs estão.',
          ],
          keyTakeaway: 'Sem o offset calibrado, o motor vibra violentamente e dispara por sobrecorrente (oC).',
        },
      },
      {
        id: 'l1000-m8-l2',
        title: 'Lição 2: Método de Alinhamento com Freio Fechado (T2-04 = 2)',
        description: 'Injeção de corrente CC para busca de alinhamento com a cabine sustentada.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Sintonia de Offset Estático',
          content: [
            'O inversor aplica pulsos de corrente controlada nas fases U-V-W.',
            'Calcula a saturação magnética e armazena o ângulo no parâmetro E5-11.',
          ],
          keyTakeaway: 'Evita a necessidade de retirar o contrapeso ou abrir o freio durante a calibração.',
        },
      },
      {
        id: 'l1000-m8-l3',
        title: 'Lição 3: Diagnóstico de Erro de Offset (Falha dEv / PGo)',
        description: 'Como identificar se o ângulo salvo foi corrompido ou descalibrado.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Sintomas de Offset Incorreto',
          content: [
            'O elevador tenta partir, consome corrente máxima e não sai do lugar.',
            'O motor se move alguns milímetros no sentido errado antes do freio travar.',
          ],
          keyTakeaway: 'Ao trocar ou soltar o acoplamento do encoder, o tuning de offset deve ser refeito obrigatoriamente.',
        },
      },
      {
        id: 'l1000-m8-l4',
        title: 'Lição 4: Prática de Verificação do Sentido de Rotação',
        description: 'Teste o sentido horário e anti-horário após o alinhamento.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m8-s1',
            title: 'Acionar Motor em Sentido Avanço (FWD)',
            instruction: 'Parta o motor no sentido direto e observe o giro do rotor.',
            isCompleted: (s) => (s.outputFrequency ?? 0) > 5 && s.isForwardDirection === true,
          },
          {
            id: 'l1000-m8-s2',
            title: 'Inverter para Sentido Retorno (REV)',
            instruction: 'Pressione a tecla de reversão e confirme a mudança de sentido do motor 3D.',
            isCompleted: (s) => (s.outputFrequency ?? 0) > 5 && s.isForwardDirection === false,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod9',
    moduleNumber: 9,
    title: 'Ajuste de Velocidades: Nominal, Nivelamento e Inspeção',
    description: 'Parametrização das referências multivelocidade nos parâmetros d1-01 a d1-08.',
    icon: '📊',
    lessons: [
      {
        id: 'l1000-m9-l1',
        title: 'Lição 1: Tabela Padrão de Velocidades de Elevador',
        description: 'Alta velocidade (Viagem), Média (Aproximação curta), Baixa (Nivelamento) e Inspeção.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Escala de Velocidades',
          content: [
            'd1-01: Velocidade Nominal de Viagem (ex: 1.00 m/s a 2.50 m/s).',
            'd1-02: Velocidade de Nivelamento (ex: 0.08 m/s a 0.12 m/s).',
            'd1-03: Velocidade de Inspeção / Manutenção (ex: 0.30 m/s).',
            'd1-04: Velocidade Intermediária para andares curtos (ex: 0.60 m/s).',
          ],
          keyTakeaway: 'A velocidade de inspeção é estritamente limitada por norma a no máximo 0.30 m/s.',
        },
      },
      {
        id: 'l1000-m9-l2',
        title: 'Lição 2: Combinação Binária de Entradas Digitais para Velocidade',
        description: 'Mapeamento das entradas S4, S5 e S6 comandadas pelo CLP de manobra.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Seleção de Velocidades por Entradas Digitais',
          content: [
            'O CLP fecha combinações de relés para selecionar qual parâmetro d1 o inversor deve seguir.',
            'Entrada DI1 ativa: Comando de Marcha.',
            'Entradas de Velocidade: 00 = d1-01, 01 = d1-02, 10 = d1-03, 11 = d1-04.',
          ],
          keyTakeaway: 'Permite ao CLP gerenciar paradas entre andares adjacentes sem atingir velocidade excessiva.',
        },
      },
      {
        id: 'l1000-m9-l3',
        title: 'Lição 3: Conversão de Hz para Metros por Segundo (m/s)',
        description: 'Cálculo da relação entre RPM do motor, diâmetro da polia e velocidade de cabine.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Fórmula de Velocidade Linear de Cabine',
          content: [
            'V (m/s) = (π * Diâmetro da Polia * RPM do Eixo) / (60 * Relação de Suspensão 1:1 ou 2:1).',
            'O parâmetro o1-03 permite que a IHM do L1000 exiba diretamente a velocidade em m/s ou FPM.',
          ],
          keyTakeaway: 'A precisão do cálculo evita que o elevador ultrapasse a velocidade contratada no projeto.',
        },
      },
      {
        id: 'l1000-m9-l4',
        title: 'Lição 4: Prática de Programação da Referência de Velocidade',
        description: 'Ajuste as velocidades de aproximação e viagem no inversor.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m9-s1',
            title: 'Configurar Velocidade Nominal (P0120/P0121)',
            instruction: 'Ajuste a referência de frequência máxima de viagem para 60 Hz.',
            isCompleted: (s) => (s.parameters?.P0121?.currentValue ?? 0) === 60,
          },
          {
            id: 'l1000-m9-s2',
            title: 'Configurar Velocidade Mínima de Nivelamento (P0133)',
            instruction: 'Ajuste a velocidade de aproximação para 3.0 Hz.',
            isCompleted: (s) => (s.parameters?.P0133?.currentValue ?? 0) <= 3.0,
          },
        ],
      },
      {
        id: 'l1000-m9-l5',
        title: 'Lição 5: Prática de Teste de Comutação de Velocidades',
        description: 'Execute a transição entre alta e baixa velocidade.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m9-s3',
            title: 'Acelerar até a Velocidade Nominal',
            instruction: 'Ligue o inversor e aguarde a velocidade atingir 60 Hz.',
            isCompleted: (s) => (s.outputFrequency ?? 0) >= 55,
          },
          {
            id: 'l1000-m9-s4',
            title: 'Desacelerar e Parar Suavemente',
            instruction: 'Pressione STOP e observe a desaceleração controlada.',
            isCompleted: (s) => (s.outputFrequency ?? 0) < 5,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod10',
    moduleNumber: 10,
    title: 'Curvas em S & Conforto de Viagem (Jerk Tuning)',
    description: 'Ajuste de derivadas de aceleração e desaceleração nos parâmetros C1 e C2.',
    icon: '📈',
    lessons: [
      {
        id: 'l1000-m10-l1',
        title: 'Lição 1: O que é Jerk (Variação da Aceleração)?',
        description: 'A física do conforto humano: aceleração constante vs. tranco súbito.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Conceito de Jerk',
          content: [
            'O corpo humano não sente a velocidade constante, mas é altamente sensível à variação rápida da aceleração (Jerk).',
            'Uma rampa linear causa trancos no início e no fim da aceleração.',
            'As curvas em S arredondam os 4 cantos da curva de velocidade, eliminando a sensação de peso súbito nos joelhos.',
          ],
          keyTakeaway: 'O Jerk ideal equilibra suavidade de viagem com tempo total de percurso.',
        },
      },
      {
        id: 'l1000-m10-l2',
        title: 'Lição 2: Parâmetros C2-01 a C2-05 (Jerks de Partida e Parada)',
        description: 'C2-01 (Início aceleração), C2-02 (Fim aceleração), C2-03 (Início desaceleração), C2-04 (Fim desaceleração).',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Ajuste das Curvas C2',
          content: [
            'C2-01: Arredondamento do início de partida (evita solavanco na saída do andar).',
            'C2-02: Transição para a velocidade de cruzeiro.',
            'C2-03: Início da frenagem suave.',
            'C2-04: Transição para a velocidade de nivelamento.',
            'C2-05: Parada final suave no nível do pavimento.',
          ],
          keyTakeaway: 'Tempos de Jerk entre 0.8s e 1.5s proporcionam padrão executivo de conforto.',
        },
      },
      {
        id: 'l1000-m10-l3',
        title: 'Lição 3: Rampas de Aceleração (C1-01) e Desaceleração (C1-02)',
        description: 'Tempos nominais de aceleração para elevadores de 1.0 m/s a 2.5 m/s.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Rampas do Grupo C1',
          content: [
            'C1-01: Tempo de aceleração nominal (tipicamente 2.5s a 4.0s).',
            'C1-02: Tempo de desaceleração nominal (tipicamente 2.5s a 4.0s).',
            'C1-09: Rampa de parada de emergência rápida em caso de abertura de segurança.',
          ],
          keyTakeaway: 'Rampas curtas demais podem causar escorregamento dos cabos de aço na polia.',
        },
      },
      {
        id: 'l1000-m10-l4',
        title: 'Lição 4: Prática de Programação das Rampas C1',
        description: 'Ajuste os tempos de aceleração e desaceleração do elevador.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m10-s1',
            title: 'Programar Tempo de Aceleração (P0100)',
            instruction: 'Ajuste o tempo de aceleração para 5.0 segundos.',
            isCompleted: (s) => (s.parameters?.P0100?.currentValue ?? 0) === 5.0,
          },
          {
            id: 'l1000-m10-s2',
            title: 'Programar Tempo de Desaceleração (P0101)',
            instruction: 'Ajuste o tempo de desaceleração para 5.0 segundos.',
            isCompleted: (s) => (s.parameters?.P0101?.currentValue ?? 0) === 5.0,
          },
        ],
      },
      {
        id: 'l1000-m10-l5',
        title: 'Lição 5: Prática de Teste de Conforto e Rampa Suave',
        description: 'Execute uma partida completa e valide o comportamento da rampa.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m10-s3',
            title: 'Executar Partida e Monitorar Subida Suave',
            instruction: 'Pressione RUN e confirme que a aceleração ocorre sem picos bruscos de corrente.',
            isCompleted: (s) => (s.outputFrequency ?? 0) > 30 && Number(s.outputCurrent ?? 0) < 15,
          },
        ],
      },
    ],
  },

  // =========================================================================================
  // BLOCO 3: CONTROLE DE FREIO, ANTI-ROLLBACK & CARGA (MÓDULOS 11 A 15)
  // =========================================================================================
  {
    id: 'l1000-mod11',
    moduleNumber: 11,
    title: 'Sequência de Controle do Freio Eletromecânico',
    description: 'Temporizações de sustentação de torque antes da abertura e após o fechamento do freio.',
    icon: '🛑',
    lessons: [
      {
        id: 'l1000-m11-l1',
        title: 'Lição 1: A Lógica de Abertura do Freio (Brake Release)',
        description: 'Estabelecimento de fluxo magnético e verificação de torque antes de energizar a bobina.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Sequência de Abertura do Freio',
          content: [
            '1. Comando de marcha recebido do CLP.',
            '2. Inversor magnetiza o motor em velocidade 0 Hz.',
            '3. Inversor aciona o relé de liberação do freio.',
            '4. Aguarda o tempo de atraso mecânico da sapata antes de iniciar a aceleração.',
          ],
          keyTakeaway: 'Acelerar com o freio ainda encostado desgasta a lona e queima o motor.',
        },
      },
      {
        id: 'l1000-m11-l2',
        title: 'Lição 2: A Lógica de Fechamento do Freio (Brake Apply)',
        description: 'Frequência de parada, tempo de retenção em 0 Hz e desmagnetização.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Sequência de Fechamento do Freio',
          content: [
            '1. Cabine atinge a velocidade de nivelamento e desacelera até 0 Hz.',
            '2. O inversor corta a alimentação da bobina do freio.',
            '3. O inversor mantém o torque elétrico em 0 Hz até que a sapata trave a polia.',
            '4. Desmagnetiza o motor com segurança.',
          ],
          keyTakeaway: 'Cortar a corrente antes do freio assentar causa tranco e desnível no piso.',
        },
      },
      {
        id: 'l1000-m11-l3',
        title: 'Lição 3: Parâmetros b1-03 e b1-04 (Temporizadores de Freio)',
        description: 'Ajuste de atraso de liberação (Brake Release Delay) e atraso de corte (Brake Set Delay).',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Ajuste de Temporizações de Freio',
          content: [
            'b1-03: Tempo de atraso para abrir o freio (tipicamente 0.20s a 0.50s).',
            'b1-04: Tempo de atraso para fechar o freio na parada (tipicamente 0.30s a 0.60s).',
          ],
          keyTakeaway: 'Freios mecânicos grandes exigem tempos b1-03 maiores devido à inércia do êmbolo.',
        },
      },
      {
        id: 'l1000-m11-l4',
        title: 'Lição 4: Prática de Configuração do Relé de Freio',
        description: 'Programe a saída a relé para comandar o contator de freio.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m11-s1',
            title: 'Programar Função do Relé RL1 (P0275)',
            instruction: 'Configure o relé RL1 para sinalizar status de RUN / Marcha ativa.',
            isCompleted: (s) => (s.parameters?.P0275?.currentValue ?? 0) === 15,
          },
        ],
      },
      {
        id: 'l1000-m11-l5',
        title: 'Lição 5: Prática de Teste de Parada e Aplicação do Freio',
        description: 'Execute a parada e verifique o desligamento do relé de comando.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m11-s2',
            title: 'Parar o Inversor',
            instruction: 'Comande a parada do inversor e confira o retorno ao estado READY.',
            isCompleted: (s) => s.motorStatus === 'READY' || (s.outputFrequency ?? 0) === 0,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod12',
    moduleNumber: 12,
    title: 'Compensação de Partida Sem Rollback (Anti-Rollback)',
    description: 'Controle de posição zero em malha fechada sem necessidade de célula de carga.',
    icon: '⚖️',
    lessons: [
      {
        id: 'l1000-m12-l1',
        title: 'Lição 1: A Causa do Rollback na Partida',
        description: 'Desequilíbrio de massa entre cabine e contrapeso no milissegundo de abertura do freio.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Mecânica do Rollback',
          content: [
            'Quando o freio abre, se o motor não estiver exercendo torque exatamente igual ao peso resultante, a cabine cai ou sobe bruscamente alguns milímetros.',
            'Esse recuo gera desconforto e assusta os passageiros.',
          ],
          keyTakeaway: 'O controle Anti-Rollback atua como uma mola magnética digital segurando o eixo.',
        },
      },
      {
        id: 'l1000-m12-l2',
        title: 'Lição 2: O Algoritmo de Malha de Posição Zero (Zero-Speed Control)',
        description: 'Como o L1000 lê o encoder para criar um ganho de retenção estática.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Malha de Posição no L1000',
          content: [
            'O inversor trava a contagem de pulsos do encoder no exato instante em que comanda a abertura do freio.',
            'Qualquer movimento de 1 pulso gera uma resposta instantânea de contra-torque.',
          ],
          keyTakeaway: 'Elimina o rollback mesmo com cabine 100% lotada ou 100% vazia.',
        },
      },
      {
        id: 'l1000-m12-l3',
        title: 'Lição 3: Parâmetros S3-01 a S3-05 (Ganhos de Anti-Rollback)',
        description: 'Ajuste de ganho proporcional de posição e tempo de sustentação.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Sintonia dos Ganhos S3',
          content: [
            'S3-01: Ganho de controle de velocidade zero.',
            'S3-02: Tempo integral de velocidade zero.',
            'S3-03: Tempo de retenção da posição inicial.',
          ],
          keyTakeaway: 'Ganho S3 excessivo provoca zumbido e vibração de alta frequência no motor.',
        },
      },
      {
        id: 'l1000-m12-l4',
        title: 'Lição 4: Prática de Simulação de Carga no Eixo',
        description: 'Aplique carga mecânica no eixo e teste a retenção de velocidade zero.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m12-s1',
            title: 'Verificar Carga Mecânica no Eixo',
            instruction: 'Certifique-se de que a carga mecânica no motor está ajustada.',
            isCompleted: (s) => (s.parameters?.P0135?.currentValue ?? 0) >= 5.0,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod13',
    moduleNumber: 13,
    title: 'Integração com Célula de Carga (Load Weighing Device)',
    description: 'Entrada analógica de pesagem para cálculo de pré-torque instantâneo.',
    icon: '🏋️',
    lessons: [
      {
        id: 'l1000-m13-l1',
        title: 'Lição 1: Sensores de Carga: Cabos, Longarinas e Sob o Piso',
        description: 'Tipos de transdutores de peso e sinais elétricos (0-10V / 4-20mA).',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Transdutores de Pesagem de Elevadores',
          content: [
            'Sensores de cabo: Medem a deformação mecânica de cada cabo de tração.',
            'Sensores de longarina/piso: Medem a deflexão estrutural da cabine.',
            'Enviam sinal analógico proporcional ao número de passageiros.',
          ],
          keyTakeaway: 'Permite ao inversor saber o peso antes de abrir o freio mecânico.',
        },
      },
      {
        id: 'l1000-m13-l2',
        title: 'Lição 2: Mapeamento da Entrada Analógica A2 para Pré-Torque',
        description: 'Configuração do parâmetro H3-09 = 26 (Feed Forward de Torque).',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Alimentação Direta de Torque (Feed-Forward)',
          content: [
            'O inversor soma o sinal da célula de carga diretamente à saída da malha de corrente.',
            'Ao abrir o freio, o torque elétrico já é idêntico ao torque de carga.',
          ],
          keyTakeaway: 'Proporciona a partida mais silenciosa e imperceptível do mercado.',
        },
      },
      {
        id: 'l1000-m13-l3',
        title: 'Lição 3: Calibração de Zero e Ganho da Célula de Carga',
        description: 'Ajuste de offset com cabine vazia e ganho com cabine carregada (100%).',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Procedimento de Calibração',
          content: [
            '1. Cabine vazia: Ajusta o zero da entrada analógica.',
            '2. Cabine com 50% de carga: Verifica ponto de equilíbrio.',
            '3. Cabine com 100% de carga: Ajusta o ganho máximo da entrada analógica.',
          ],
          keyTakeaway: 'A calibração correta é indispensável para evitar sobretorque na partida.',
        },
      },
      {
        id: 'l1000-m13-l4',
        title: 'Lição 4: Prática de Ajuste do Sinal Analógico de Carga',
        description: 'Simule o sinal da célula de carga ajustando a entrada AI1.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m13-s1',
            title: 'Ajustar Entrada Analógica AI1',
            instruction: 'Ajuste o potenciômetro analógico AI1 para simular o sinal de pesagem.',
            isCompleted: (s) => (s.ai1Voltage ?? 0) > 0,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod14',
    moduleNumber: 14,
    title: 'Ajuste de Ganhos da Malha de Velocidade (ASR Tuning)',
    description: 'Sintonia dos ganhos proporcional (P) e integral (I) nos parâmetros C5-01 a C5-04.',
    icon: '🎛️',
    lessons: [
      {
        id: 'l1000-m14-l1',
        title: 'Lição 1: O Regulador Automático de Velocidade (ASR)',
        description: 'Como a malha PI compensa variações dinâmicas de carga durante o percurso.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Fundamentos do ASR',
          content: [
            'O ASR compara a velocidade real do encoder com a rampa de comando.',
            'Calcula a referência de torque necessária para manter a velocidade rigorosamente estável.',
          ],
          keyTakeaway: 'A resposta da malha ASR dita a rigidez do controle do elevador.',
        },
      },
      {
        id: 'l1000-m14-l2',
        title: 'Lição 2: Ganhos de Baixa Velocidade (C5-01 / C5-02)',
        description: 'Estabilização de partida, parada e nivelamento preciso.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Ganhos de Baixa Velocidade',
          content: [
            'C5-01: Ganho Proporcional (P) em baixa velocidade.',
            'C5-02: Tempo Integral (I) em baixa velocidade.',
          ],
          keyTakeaway: 'Ganhos P mais altos em baixa velocidade garantem que o elevador pare perfeitamente alinhado ao piso.',
        },
      },
      {
        id: 'l1000-m14-l3',
        title: 'Lição 3: Ganhos de Alta Velocidade (C5-03 / C5-04) e Filtros',
        description: 'Eliminação de oscilações na frequência de ressonância dos cabos de aço.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Ganhos de Alta Velocidade',
          content: [
            'C5-03: Ganho Proporcional em alta velocidade.',
            'C5-04: Tempo Integral em alta velocidade.',
            'C5-07: Filtro passa-baixa de realimentação de velocidade.',
          ],
          keyTakeaway: 'Ganhos excessivos em alta velocidade causam ressonância mecânica e vibração na cabine.',
        },
      },
      {
        id: 'l1000-m14-l4',
        title: 'Lição 4: Prática de Teste de Resposta da Malha de Velocidade',
        description: 'Acione o motor e observe a estabilidade da frequência de saída.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m14-s1',
            title: 'Atingir Velocidade de Cruzeiro Estável',
            instruction: 'Parta o motor e verifique se a velocidade se mantém estável em 60 Hz.',
            isCompleted: (s) => (s.outputFrequency ?? 0) >= 58,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod15',
    moduleNumber: 15,
    title: 'Frenagem Dinâmica & Dimensionamento de Resistor',
    description: 'Controle de sobretensão no barramento CC em descidas carregadas e subidas vazias.',
    icon: '🔥',
    lessons: [
      {
        id: 'l1000-m15-l1',
        title: 'Lição 1: Comportamento Regenerativo em Elevadores',
        description: 'Como a energia potencial gravitacional se converte em tensão no barramento CC.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Regeneração de Energia',
          content: [
            'Quando a cabine desce mais pesada que o contrapeso, a gravidade empurra o motor.',
            'O inversor retifica a tensão gerada e eleva o barramento CC acima de 700V/800V.',
          ],
          keyTakeaway: 'O transistor de frenagem (chopper) aciona para desviar a corrente para o resistor externo.',
        },
      },
      {
        id: 'l1000-m15-l2',
        title: 'Lição 2: Dimensionamento de Ôhmica (Ω) e Potência Térmica (kW)',
        description: 'Cálculo de valor ôhmico mínimo e regime de trabalho cíclico (ED%).',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Cálculo de Resistor de Frenagem',
          content: [
            'O valor em Ohms não pode ser inferior ao limite mínimo suportado pelo transistor do inversor.',
            'A potência em Watts é calculada com base no tráfego do edifício (ex: ED 40% para prédios residenciais).',
          ],
          keyTakeaway: 'Resistores com valor em Ohms abaixo do especificado causam queima imediata do módulo de frenagem.',
        },
      },
      {
        id: 'l1000-m15-l3',
        title: 'Lição 3: Proteção Térmica do Resistor (L3-04 / Contato Klixon)',
        description: 'Uso de termostato bimetálico para corte de segurança em caso de sobreaquecimento.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Segurança contra Incêndio no Resistor',
          content: [
            'O contato térmico (Klixon) do resistor deve estar em série com a linha de segurança ou entrada de falha externa.',
            'Se o transistor entrar em curto, o resistor aquece até abrir o circuito antes de queimar.',
          ],
          keyTakeaway: 'Protege a casa de máquinas contra superaquecimento em horários de pico.',
        },
      },
      {
        id: 'l1000-m15-l4',
        title: 'Lição 4: Prática de Monitoramento do Barramento CC',
        description: 'Verifique a estabilidade da tensão CC em regime contínuo.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m15-s1',
            title: 'Verificar Tensão do Barramento (P0004)',
            instruction: 'Consulte o parâmetro P0004 e confirme que a tensão CC está em ~310V.',
            isCompleted: (s) => (s.parameters?.P0004?.currentValue ?? 310) >= 300,
          },
        ],
      },
    ],
  },

  // =========================================================================================
  // BLOCO 4: AUTOMAÇÃO COM CLP DE MANOBRA & PORTAS (MÓDULOS 16 A 20)
  // =========================================================================================
  {
    id: 'l1000-mod16',
    moduleNumber: 16,
    title: 'Integração do CLP de Manobra via Entradas Digitais',
    description: 'Mapeamento de comandos de subida, descida e velocidades de pavimento.',
    icon: '🔌',
    lessons: [
      {
        id: 'l1000-m16-l1',
        title: 'Lição 1: Arquitetura do Painel de Comando com CLP',
        description: 'Divisão de tarefas: CLP gerencia chamadas e despacho; L1000 gerencia tração e motor.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Comando de Manobra x Inversor',
          content: [
            'O CLP recebe chamadas de cabine e pavimento, verifica trincos de porta e decide o sentido de viagem.',
            'Envia os sinais de Subir (S1), Descer (S2) e seleção de velocidade para as entradas digitais do L1000.',
          ],
          keyTakeaway: 'O inversor não decide para onde ir; ele executa a viagem com a velocidade solicitada pelo CLP.',
        },
      },
      {
        id: 'l1000-m16-l2',
        title: 'Lição 2: Mapeamento de Entradas Digitais no Grupo H1',
        description: 'H1-01 a H1-08: Configuração de funções para as entradas bornes S1 a S8.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Configuração de Entradas S1-S8',
          content: [
            'H1-01 = 40: Comando Subir (Up Run).',
            'H1-02 = 41: Comando Descer (Down Run).',
            'H1-03 = 03: Referência Multivelocidade 1.',
            'H1-04 = 04: Referência Multivelocidade 2.',
          ],
          keyTakeaway: 'O intertravamento elétrico impede o acionamento simultâneo de subida e descida.',
        },
      },
      {
        id: 'l1000-m16-l3',
        title: 'Lição 3: Saídas Digitais para Realimentação do CLP (Grupo H2)',
        description: 'Sinalização de inversor pronto, velocidade zero e falha para o CLP.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Feedback do Inversor para o CLP',
          content: [
            'H2-01: Relé de Falha (Informa ao CLP para cancelar chamadas).',
            'H2-02: Saída de Velocidade Zero (Informa ao CLP que a cabine parou).',
            'H2-03: Saída de Abertura de Freio Confirmada.',
          ],
          keyTakeaway: 'O CLP monitora essas saídas para garantir a sincronia perfeita do sistema.',
        },
      },
      {
        id: 'l1000-m16-l4',
        title: 'Lição 4: Prática de Acionamento via Bornes Digitais (DI1 e DI2)',
        description: 'Teste o comando de partida e sentido por bornes remotos.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m16-s1',
            title: 'Comutar para Modo Remoto (REM)',
            instruction: 'Alterne o inversor para o modo REM para aceitar comandos de bornes.',
            isCompleted: (s) => s.controlSource === 'REM',
          },
          {
            id: 'l1000-m16-s2',
            title: 'Acionar Borne DI1 (Gira/Para Remoto)',
            instruction: 'Ative a entrada digital DI1 para iniciar a marcha pelo comando do CLP.',
            isCompleted: (s) => Boolean(s.digitalInputs?.di1) || (s.outputFrequency ?? 0) > 0,
          },
        ],
      },
      {
        id: 'l1000-m16-l5',
        title: 'Lição 5: Prática de Reversão de Sentido via Borne DI2',
        description: 'Acione a entrada DI2 para inverter o sentido de viagem.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m16-s3',
            title: 'Ativar Entrada DI2 (Sentido de Giro)',
            instruction: 'Ligue o borne DI2 e verifique a reversão da máquina 3D para rotação anti-horária.',
            isCompleted: (s) => Boolean(s.digitalInputs?.di2) && s.isForwardDirection === false,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod17',
    moduleNumber: 17,
    title: 'Linha de Segurança & Monitoramento EDM',
    description: 'Intertravamento dos contatores de saída, limites de poço e parada segura.',
    icon: '🛡️',
    lessons: [
      {
        id: 'l1000-m17-l1',
        title: 'Lição 1: O Circuito da Linha de Segurança do Elevador',
        description: 'Contatos de emergência, chave de limite final, amortecedores e trincos de porta.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Linha de Segurança em Série',
          content: [
            'Todos os dispositivos mecânicos de segurança são ligados em série com bobinas de alta confiabilidade.',
            'Abertura de qualquer contato desenergiza instantaneamente os contatores principais.',
          ],
          keyTakeaway: 'A linha de segurança tem prioridade absoluta sobre qualquer comando eletrônico.',
        },
      },
      {
        id: 'l1000-m17-l2',
        title: 'Lição 2: Monitoramento de Contatos Guiados (EDM / Safe Torque Off)',
        description: 'Como o inversor valida se os contatores abriram antes de permitir nova viagem.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'External Device Monitoring (EDM)',
          content: [
            'Contatos auxiliares NF guiados dos contatores de potência são conectados à entrada de segurança do inversor.',
            'Se um contator colar, o inversor bloqueia a próxima partida e gera falha.',
          ],
          keyTakeaway: 'Evita partidas perigosas com contatores danificados.',
        },
      },
      {
        id: 'l1000-m17-l3',
        title: 'Lição 3: Diferença entre Parada de Emergência e Parada Normal',
        description: 'Corte por inércia x frenagem controlada com abertura de arco.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Tipos de Parada',
          content: [
            'Parada Normal: Desacelera na curva em S, atinge 0 Hz e aplica o freio suavemente.',
            'Parada de Emergência: Freio mecânico cai imediatamente com cabine em movimento.',
          ],
          keyTakeaway: 'Paradas de emergência frequentes desgastam a lona do freio e os cabos de tração.',
        },
      },
      {
        id: 'l1000-m17-l4',
        title: 'Lição 4: Prática de Teste de Reset de Falhas',
        description: 'Simule o rearme seguro do sistema após uma interrupção.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m17-s1',
            title: 'Verificar Sistema sem Falhas',
            instruction: 'Certifique-se de que o inversor está pronto para operação.',
            isCompleted: (s) => s.activeFault === null && s.motorStatus !== 'FAULT',
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod18',
    moduleNumber: 18,
    title: 'Comunicação Serial CANopen / Modbus com CLP',
    description: 'Protocolo CANopen Lift (CiA 417), telemetria digital e redução de fiação.',
    icon: '📡',
    lessons: [
      {
        id: 'l1000-m18-l1',
        title: 'Lição 1: O Padrão CANopen Lift (CiA 417)',
        description: 'Arquitetura de rede em elevadores inteligentes.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Rede CANopen Lift',
          content: [
            'Padroniza objetos de comunicação para velocidade, posição de cabine e diagnósticos.',
            'Substitui chicotes de cabos pesados por um único cabo de par trançado de alta velocidade.',
          ],
          keyTakeaway: 'Reduz o tempo de instalação do painel de comando em até 60%.',
        },
      },
      {
        id: 'l1000-m18-l2',
        title: 'Lição 2: Mapeamento de Registradores Modbus RTU (RS-485)',
        description: 'Leitura de corrente, frequência e falhas pelo supervisório do edifício.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Comunicação Modbus no L1000',
          content: [
            'Parâmetro H5-01: Endereço do inversor na rede Modbus (1 a 247).',
            'Parâmetro H5-02: Taxa de comunicação (Baud Rate: 9600 a 38400 bps).',
            'Parâmetro H5-03: Paridade.',
          ],
          keyTakeaway: 'Permite monitorar remotamente o elevador através da portaria ou central de manutenção.',
        },
      },
      {
        id: 'l1000-m18-l3',
        title: 'Lição 3: Tratamento de Timeout de Comunicação (H5-04 / H5-05)',
        description: 'Segurança contra perda de sinal serial com parada controlada da cabine.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Proteção de Timeout Serial',
          content: [
            'Se o CLP parar de enviar telegramas por mais de 1.0s, o inversor assume falha CE (Communication Error).',
            'Executa a parada segura no andar mais próximo.',
          ],
          keyTakeaway: 'Evita que o elevador continue viajando indefinidamente sem supervisão do CLP.',
        },
      },
      {
        id: 'l1000-m18-l4',
        title: 'Lição 4: Prática de Parametrização Modbus RTU',
        description: 'Ajuste o endereço e baud rate na memória do inversor.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m18-s1',
            title: 'Configurar Endereço Modbus (P0308)',
            instruction: 'Defina o endereço Modbus para 1.',
            isCompleted: (s) => (s.parameters?.P0308?.currentValue ?? 0) === 1,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod19',
    moduleNumber: 19,
    title: 'Nivelamento Direto no Pavimento (Direct-to-Floor)',
    description: 'Cálculo de desaceleração direta sem tempo rastejante em baixa velocidade.',
    icon: '🎯',
    lessons: [
      {
        id: 'l1000-m19-l1',
        title: 'Lição 1: O que é Direct Landing (Nivelamento Direto)?',
        description: 'Comparativo entre o método tradicional com rastejo vs. desaceleração contínua.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Conceito de Nivelamento Direto',
          content: [
            'Método Antigo: O elevador desacelera e rasteja em baixa velocidade por 2 a 5 segundos antes de parar.',
            'Método Direto: O inversor calcula a rampa de forma que a velocidade zero coincida exatamente com o piso.',
          ],
          keyTakeaway: 'Elimina o tempo morto e aumenta o conforto dos passageiros.',
        },
      },
      {
        id: 'l1000-m19-l2',
        title: 'Lição 2: Cálculo de Distância de Desaceleração',
        description: 'Equação de espaço de frenagem em função da velocidade nominal e aceleração.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Cálculo de Ponto de Corte',
          content: [
            'Distância = (V² / 2a) + Distância de Jerk.',
            'O sensor de poço informa a posição exata para início da curva de parada.',
          ],
          keyTakeaway: 'A precisão do cálculo garante parada perfeita mesmo com variações de carga na cabine.',
        },
      },
      {
        id: 'l1000-m19-l3',
        title: 'Lição 3: Ajuste Fino de Nivelamento por Andar',
        description: 'Compensação de dilatação de cabos e tolerância milimétrica de soleira (±3mm).',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Tolerância de Soleira',
          content: [
            'A norma exige desnível máximo de ±5mm para evitar tropeços de passageiros.',
            'O inversor ajusta o ganho de posição final para assegurar o nivelamento ideal.',
          ],
          keyTakeaway: 'Degrau na soleira é uma das maiores causas de processos e acidentes em edifícios.',
        },
      },
      {
        id: 'l1000-m19-l4',
        title: 'Lição 4: Prática de Parada Precisa no Nível',
        description: 'Execute o ciclo de parada e monitore a transição até 0 Hz.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m19-s1',
            title: 'Executar Desaceleração Completa',
            instruction: 'Comande a parada e aguarde o retorno da frequência a 0.0 Hz.',
            isCompleted: (s) => (s.outputFrequency ?? 0) === 0,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod20',
    moduleNumber: 20,
    title: 'Controle de Operador de Portas de Cabine (VVVF)',
    description: 'Integração do operador de porta micro-inversor com a máquina de tração principal.',
    icon: '🚪',
    lessons: [
      {
        id: 'l1000-m20-l1',
        title: 'Lição 1: O Inversor de Porta de Cabine (Frequência Variável)',
        description: 'Curvas de abertura e fechamento suave com controle de força de impacto.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Operador de Porta VVVF',
          content: [
            'Controla um motor independente montado no topo da cabine.',
            'Abre e fecha as folhas de porta em rampas suaves, reduzindo o ruído nos andares.',
          ],
          keyTakeaway: 'A força de fechamento é limitada por norma a no máximo 150N para evitar acidentes.',
        },
      },
      {
        id: 'l1000-m20-l2',
        title: 'Lição 2: Cortina de Luz Infravermelha e Reversão Imediata',
        description: 'Feixe de sensores ópticos e intertravamento de segurança.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Cortina de Luz',
          content: [
            'Se um passageiro obstruir a entrada, a cortina envia sinal imediato para o operador inverter a porta.',
            'O inversor de tração só libera a viagem após a confirmação do contato mecânico de trinco fechado.',
          ],
          keyTakeaway: 'A viagem da cabine é 100% bloqueada enquanto a porta estiver aberta.',
        },
      },
      {
        id: 'l1000-m20-l3',
        title: 'Lição 3: Diagnóstico de Falhas de Trinco e Limite de Porta',
        description: 'Como identificar falhas de contato e desregulagem de trincos de pavimento.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Falhas de Trinco de Porta',
          content: [
            'Contatos oxidados ou poeira nos trincos impedem o fechamento elétrico da linha de segurança.',
            'O elevador não parte mesmo com a porta mecanicamente fechada.',
          ],
          keyTakeaway: 'Manutenção e limpeza dos contatos de porta evitam mais de 70% dos chamados técnicos.',
        },
      },
      {
        id: 'l1000-m20-l4',
        title: 'Lição 4: Prática de Confirmação de Segurança de Porta',
        description: 'Valide o status de segurança antes de permitir a partida.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m20-s1',
            title: 'Verificar Inversor Habilitado',
            instruction: 'Confirme que o sistema está em estado pronto (READY) para iniciar viagem.',
            isCompleted: (s) => s.motorStatus === 'READY' || s.motorStatus === 'RUNNING',
          },
        ],
      },
    ],
  },

  // =========================================================================================
  // BLOCO 5: OPERAÇÕES ESPECIAIS & RESGATE (MÓDULOS 21 A 25 - FASE DESAFIO)
  // =========================================================================================
  {
    id: 'l1000-mod21',
    moduleNumber: 21,
    title: 'Resgate de Emergência por Baterias (Desafio)',
    description: 'Resolução prática de resgate sem parâmetros explícitos.',
    icon: '🔋',
    lessons: [
      {
        id: 'l1000-m21-l1',
        title: 'Lição 1: Arquitetura de Alimentação ARD',
        description: 'Operação em corrente contínua com banco de baterias em emergência.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Alimentação em Queda de Rede',
          content: [
            'Na falta de energia, o sistema de baterias alimenta o L1000 diretamente no barramento CC.',
            'O inversor deve operar com frequência e tensão estritamente controladas para não descarregar o banco prematuramente.',
          ],
          keyTakeaway: 'O resgate automático prioriza a parada segura no andar mais próximo.',
        },
      },
      {
        id: 'l1000-m21-l2',
        title: 'Lição 2: Busca de Sentido Favorável de Menor Carga',
        description: 'Medição de torque comparativo em subida e descida.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Algoritmo de Direção Leve',
          content: [
            'O L1000 injeta micro-corrente em ambos os sentidos e verifica onde a gravidade auxilia a rotação.',
            'Executa a viagem no sentido do menor esforço.',
          ],
          keyTakeaway: 'Economiza até 80% da carga das baterias de resgate.',
        },
      },
      {
        id: 'l1000-m21-l3',
        title: 'Lição Prática: Configuração da Velocidade de Resgate',
        description: 'Configure o inversor para mover a cabine em velocidade ultra lenta de resgate.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m21-s1',
            title: 'Configurar a Velocidade Mínima de Manobra',
            instruction: 'Acesse o menu de parâmetros de limites de frequência e programe a velocidade mínima segura (abaixo de 5 Hz).',
            isCompleted: (s) => (s.parameters?.P0133?.currentValue ?? 0) <= 5.0,
          },
          {
            id: 'l1000-m21-s2',
            title: 'Testar Movimento de Resgate',
            instruction: 'Ligue o inversor e verifique se a velocidade se mantém estável em regime de emergência.',
            isCompleted: (s) => (s.outputFrequency ?? 0) > 0 && (s.outputFrequency ?? 0) <= 15,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod22',
    moduleNumber: 22,
    title: 'Operação de Inspeção e Manutenção de Poço (Desafio)',
    description: 'Ajuste de velocidade restrita para técnicos no topo de cabine.',
    icon: '👷',
    lessons: [
      {
        id: 'l1000-m22-l1',
        title: 'Lição 1: Segurança em Modo de Manutenção',
        description: 'Exigências de parada instantânea e bloqueio de chamadas externas.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Norma de Inspeção',
          content: [
            'A velocidade em manutenção jamais pode ultrapassar 0.30 m/s.',
            'O comando exige contato mantido em botão duplo.',
          ],
          keyTakeaway: 'Soltar os botões provoca o corte imediato da tração.',
        },
      },
      {
        id: 'l1000-m22-l2',
        title: 'Lição 2: Curvas Curtas de Parada de Manutenção',
        description: 'Resposta rápida ao comando do operador.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Rampas de Manutenção',
          content: [
            'Em inspeção, o tempo de parada é reduzido para evitar que a cabine continue se movendo por inércia após a ordem de parada.',
          ],
          keyTakeaway: 'A precisão de parada evita prensamento em vigas e suportes de guia.',
        },
      },
      {
        id: 'l1000-m22-l3',
        title: 'Lição Prática: Limitação da Frequência de Inspeção',
        description: 'Programe o inversor para limitar a velocidade de inspeção dentro da faixa normativa.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m22-s1',
            title: 'Limitar Frequência de Trabalho em Inspeção',
            instruction: 'Ajuste a frequência de trabalho para que o motor opere estritamente entre 10 e 20 Hz durante o teste.',
            isCompleted: (s) => (s.outputFrequency ?? 0) >= 10 && (s.outputFrequency ?? 0) <= 25,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod23',
    moduleNumber: 23,
    title: 'Operação de Emergência de Bombeiros (Desafio)',
    description: 'Retorno expresso prioritário ao piso de evacuação.',
    icon: '🚒',
    lessons: [
      {
        id: 'l1000-m23-l1',
        title: 'Lição 1: Fase 1 e Fase 2 de Incêndio',
        description: 'Cancelamento de chamadas e controle manual exclusivo da brigada.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Serviço de Bombeiros',
          content: [
            'Na fase 1, o elevador se desloca sem paradas até o piso de saída de emergência.',
            'Na fase 2, a cabine opera apenas por comando interno com chave especial.',
          ],
          keyTakeaway: 'Garante o controle do poço pelos bombeiros durante o resgate estrutural.',
        },
      },
      {
        id: 'l1000-m23-l2',
        title: 'Lição 2: Rampa Expressa de Esvaziamento',
        description: 'Condução em velocidade máxima com desaceleração firme no térreo.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Viagem Expressa',
          content: [
            'O inversor executa aceleração nominal direta sem transições intermediárias.',
          ],
          keyTakeaway: 'Agilidade máxima no esvaziamento dos andares superiores.',
        },
      },
      {
        id: 'l1000-m23-l3',
        title: 'Lição Prática: Ensaio de Marcha Expressa',
        description: 'Acione a viagem contínua em velocidade plena de 60 Hz.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m23-s1',
            title: 'Acelerar em Velocidade Plena de Viagem',
            instruction: 'Parta o motor e alcance a velocidade máxima de 60 Hz em regime estável.',
            isCompleted: (s) => (s.outputFrequency ?? 0) >= 55,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod24',
    moduleNumber: 24,
    title: 'Parada Rápida e Frenagem Controlada (Desafio)',
    description: 'Atuação da rampa de emergência combinada com retenção magnética.',
    icon: '⛔',
    lessons: [
      {
        id: 'l1000-m24-l1',
        title: 'Lição 1: Parada Rápida Elétrica vs. Desarme Mecânico',
        description: 'Preservação de sapatas e eliminação de derrapagem de cabos.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Desaceleração Rápida Controlada',
          content: [
            'O inversor freia ativamente a máquina com dissipação no resistor, permitindo que o freio mecânico trave em baixa velocidade.',
          ],
          keyTakeaway: 'Evita choques mecânicos nos passageiros e na estrutura.',
        },
      },
      {
        id: 'l1000-m24-l2',
        title: 'Lição 2: Injeção de Corrente em Parada',
        description: 'Eliminação de ruído de arraste e sustentação de velocidade zero.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Magnetização Final',
          content: [
            'Mantém o eixo imobilizado magneticamente até o assentamento total do freio mecânico.',
          ],
          keyTakeaway: 'Parada silenciosa e imperceptível.',
        },
      },
      {
        id: 'l1000-m24-l3',
        title: 'Lição Prática: Ensaio de Desaceleração Firme',
        description: 'Comande a desaceleração completa e monitore o retorno a 0 Hz.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m24-s1',
            title: 'Executar Desaceleração Controlada',
            instruction: 'Pressione STOP e valide a estabilização do motor em 0 Hz.',
            isCompleted: (s) => (s.outputFrequency ?? 0) <= 5,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod25',
    moduleNumber: 25,
    title: 'Proteção Térmica e Limite de Corrente (Desafio)',
    description: 'Ajuste os limites de sobrecorrente do motor de tração.',
    icon: '📏',
    lessons: [
      {
        id: 'l1000-m25-l1',
        title: 'Lição 1: Curva Térmica I²t e Proteção do Motor',
        description: 'Prevenção de queima de bobinas em ciclos contínuos de pico de tráfego.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Sobrecarga Térmica',
          content: [
            'O inversor calcula a integral do quadrado da corrente ao longo do tempo.',
            'Desarma preventivamente antes que o verniz isolante do motor seja danificado.',
          ],
          keyTakeaway: 'Protege a máquina de tração contra bloqueios mecânicos nas corrediças.',
        },
      },
      {
        id: 'l1000-m25-l2',
        title: 'Lição 2: Limites de Torque e Cabo Frouxo',
        description: 'Detecção de assentamento de cabine em para-choques ou engaiolamento.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Monitoramento de Esforço',
          content: [
            'Variações anormais de corrente indicam atrito excessivo nas guias ou cabos desalinhados.',
          ],
          keyTakeaway: 'O inversor atua como sensor de diagnóstico mecânico preventivo.',
        },
      },
      {
        id: 'l1000-m25-l3',
        title: 'Lição Prática: Limitação de Corrente Máxima',
        description: 'Localize o parâmetro de limite de corrente e ajuste para 10.0 A.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m25-s1',
            title: 'Programar Limite de Corrente do Inversor',
            instruction: 'Localize no grupo de limites a corrente máxima permitida para o acionamento e ajuste para 10.0 A.',
            isCompleted: (s) => (s.parameters?.P0135?.currentValue ?? 0) === 10.0,
          },
        ],
      },
    ],
  },

  // =========================================================================================
  // BLOCO 6: DIAGNÓSTICO DE FALHAS & COMPATIBILIDADE ELETROMAGNÉTICA (MÓDULOS 26 A 29 - DESAFIO)
  // =========================================================================================
  {
    id: 'l1000-mod26',
    moduleNumber: 26,
    title: 'Diagnóstico de Falhas de Encoder (Desafio)',
    description: 'Resolução de desvios de velocidade e perda de sinal de pulso.',
    icon: '🔍',
    lessons: [
      {
        id: 'l1000-m26-l1',
        title: 'Lição 1: Sintomas de Ruído na Linha de Encoder',
        description: 'Interferência de aterramento e desvio de velocidade (dEv).',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Ruído em Sinais de Encoder',
          content: [
            'Pulsos espúrios causam erro no cálculo de velocidade e instabilidade de torque.',
            'Exige blindagem aterrada em ponto único.',
          ],
          keyTakeaway: 'A blindagem do cabo de encoder não deve ser aterrada em ambas as extremidades para evitar laços de terra.',
        },
      },
      {
        id: 'l1000-m26-l2',
        title: 'Lição 2: Diagnóstico de Perda de Fase de Encoder',
        description: 'Canal A ou B aberto e desarme PGo.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Perda de Sinais A/B',
          content: [
            'O inversor monitora a quadratura dos sinais; a ausência de um canal gera falha imediata.',
          ],
          keyTakeaway: 'Verifique conectores e alimentação da placa PG.',
        },
      },
      {
        id: 'l1000-m26-l3',
        title: 'Lição Prática: Limpeza e Rearme de Falha de Encoder',
        description: 'Execute o reset de alarme e valide o restabelecimento do inversor.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m26-s1',
            title: 'Limpar Alarmes e Verificar Estado Pronto',
            instruction: 'Pressione a tecla STOP/RESET e confirme que o inversor retorna ao estado READY.',
            isCompleted: (s) => s.activeFault === null && s.motorStatus !== 'FAULT',
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod27',
    moduleNumber: 27,
    title: 'Diagnóstico de Sobrecarga e Potência (Desafio)',
    description: 'Análise de falhas térmicas e sobretensão em campo.',
    icon: '⚠️',
    lessons: [
      {
        id: 'l1000-m27-l1',
        title: 'Lição 1: Análise de Desarme por Sobretensão (ov)',
        description: 'Verificação de circuito de frenagem e continuidade de resistor.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Sobretensão no Barramento',
          content: [
            'Em descidas regenerativas com cabine cheia, o excesso de energia precisa ser absorvido pelo resistor.',
            'Se o resistor romper, o barramento sobe e o inversor desarma por ov.',
          ],
          keyTakeaway: 'A integridade do resistor é essencial para a operação segura.',
        },
      },
      {
        id: 'l1000-m27-l2',
        title: 'Lição 2: Análise de Sobrecorrente (oC)',
        description: 'Curto-circuito e teste de isolamento com megômetro.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Sobrecorrente Instantânea',
          content: [
            'Causada por fechamento incorreto de motor, curto nas fases ou rampa muito agressiva.',
          ],
          keyTakeaway: 'Isole o motor do inversor antes de testar.',
        },
      },
      {
        id: 'l1000-m27-l3',
        title: 'Lição Prática: Consulta ao Registro de Falhas',
        description: 'Acesse o parâmetro de histórico de falhas.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m27-s1',
            title: 'Consultar Histórico no Menu de Monitoramento',
            instruction: 'Acesse o parâmetro de monitor de falhas e confirme o registro na memória.',
            isCompleted: (s) => (s.parameters?.P0050?.currentValue ?? 0) >= 0,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod28',
    moduleNumber: 28,
    title: 'Filtro PWM e Silenciamento Acústico (Desafio)',
    description: 'Elimine o ruído elétrico na casa de máquinas ajustando a comutação.',
    icon: '🧲',
    lessons: [
      {
        id: 'l1000-m28-l1',
        title: 'Lição 1: Harmônicas e Conforto Acústico',
        description: 'Impacto do ruído de comutação no poço do elevador.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Ruído de Chaveamento PWM',
          content: [
            'A frequência de chaveamento dos IGBTs dita o nível de ruído audível gerado no enrolamento do estator.',
            'Elevar o chaveamento silencia a máquina de tração.',
          ],
          keyTakeaway: 'Ajuste ideal para condomínios residenciais e hospitais.',
        },
      },
      {
        id: 'l1000-m28-l2',
        title: 'Lição 2: Aquecimento Térmico em Altas Frequências',
        description: 'Compromisso entre dissipação térmica no inversor e silêncio.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Efeito Joule nos Semicondutores',
          content: [
            'Chaveamentos mais altos aumentam as perdas por comutação nos IGBTs.',
            'O inversor exige boa ventilação na casa de máquinas.',
          ],
          keyTakeaway: 'Mantenha os filtros de ar do painel sempre limpos.',
        },
      },
      {
        id: 'l1000-m28-l3',
        title: 'Lição Prática: Ajuste de Frequência de Chaveamento',
        description: 'Localize o parâmetro de frequência PWM e eleve para 5.0 kHz.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m28-s1',
            title: 'Ajustar Frequência de Chaveamento dos IGBTs',
            instruction: 'Acesse o menu de controle do inversor, encontre a frequência de chaveamento e ajuste para 5.0 kHz.',
            isCompleted: (s) => (s.parameters?.P0139?.currentValue ?? 0) === 5.0,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod29',
    moduleNumber: 29,
    title: 'Histórico de Falhas e Rastro de Variáveis (Desafio)',
    description: 'Análise de telemetria e fotografia elétrica no instante do desarme.',
    icon: '📋',
    lessons: [
      {
        id: 'l1000-m29-l1',
        title: 'Lição 1: O Que é a Fotografia Elétrica (Trace Data)?',
        description: 'Gravação instantânea de corrente, tensão, frequência e bornes na falha.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Dados Congelados',
          content: [
            'No milissegundo do desarme, o L1000 congela as grandezas elétricas.',
            'Permite ao técnico saber a causa raiz exata do problema sem adivinhações.',
          ],
          keyTakeaway: 'Fundamental para solucionar defeitos intermitentes.',
        },
      },
      {
        id: 'l1000-m29-l2',
        title: 'Lição 2: Interpretação de Logs de Operação',
        description: 'Horímetro de trabalho e número de acionamentos.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Manutenção Preditiva',
          content: [
            'Permite programar a troca de rolamentos, capacitores do barramento e contatores com base nas horas de uso.',
          ],
          keyTakeaway: 'Evita paradas não planejadas do elevador.',
        },
      },
      {
        id: 'l1000-m29-l3',
        title: 'Lição Prática: Monitoramento de Telemetria Contínua',
        description: 'Parta o motor e verifique a estabilidade de corrente e frequência.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m29-s1',
            title: 'Ligar Motor e Monitorar Operação Estável',
            instruction: 'Acione o motor e confirme que a máquina opera normalmente em regime contínuo.',
            isCompleted: (s) => (s.outputFrequency ?? 0) > 0 && s.motorStatus === 'RUNNING',
          },
        ],
      },
    ],
  },

  // =========================================================================================
  // BLOCO 7: COMISSIONAMENTO FINAL & ENTREGA TÉCNICA (MÓDULO 30 - DESAFIO FINAL)
  // =========================================================================================
  {
    id: 'l1000-mod30',
    moduleNumber: 30,
    title: 'Comissionamento Completo e Entrega Técnica (Desafio Final)',
    description: 'Validação final de segurança, balanceamento e liberação do elevador.',
    icon: '🏆',
    lessons: [
      {
        id: 'l1000-m30-l1',
        title: 'Lição 1: Checklist de Entrega Técnica Oficial',
        description: 'Inspeção final de freios, linha de segurança, aterramento e limites de percurso.',
        type: 'THEORY',
        durationMin: 20,
        theoryData: {
          title: 'Procedimento de Entrega',
          content: [
            '1. Teste de isolamento e conexões de potência.',
            '2. Teste dinâmico de frenagem com sobrecarga.',
            '3. Nivelamento milimétrico em todas as paradas.',
            '4. Backup final dos parâmetros gravados.',
          ],
          keyTakeaway: 'O elevador só pode ser liberado ao uso público após a aprovação de todos os itens.',
        },
      },
      {
        id: 'l1000-m30-l2',
        title: 'Lição 2: Teste de Carga e Frenagem com 125%',
        description: 'Validação da capacidade de retenção do freio mecânico em descida nominal.',
        type: 'THEORY',
        durationMin: 20,
        theoryData: {
          title: 'Ensaio de Sobrecarga',
          content: [
            'Comprova a integridade estrutural e a capacidade de frenagem de emergência em caso de falha.',
          ],
          keyTakeaway: 'Ensaio obrigatório por norma de segurança de elevadores.',
        },
      },
      {
        id: 'l1000-m30-l3',
        title: 'Lição Prática Final: Execução de Ciclo de Viagem Completo',
        description: 'Realize o teste operacional completo de partida, aceleração suave, cruzeiro e parada perfeita.',
        type: 'PRACTICE',
        durationMin: 25,
        steps: [
          {
            id: 'l1000-m30-s1',
            title: 'Verificar Parâmetros de Rampa Configurados',
            instruction: 'Confirme que os tempos de aceleração estão ativos e configurados.',
            isCompleted: (s) => (s.parameters?.P0100?.currentValue ?? 0) > 0,
          },
          {
            id: 'l1000-m30-s2',
            title: 'Executar Ciclo Operacional Pleno',
            instruction: 'Parta o motor até a frequência nominal de 60 Hz e conclua com desaceleração suave.',
            isCompleted: (s) => (s.outputFrequency ?? 0) >= 50 || s.motorStatus === 'RUNNING',
          },
        ],
      },
    ],
  },
];