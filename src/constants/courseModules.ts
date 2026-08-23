import { CourseModule } from '../types/tutorial';

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'module_1',
    moduleNumber: 1,
    title: 'Fundamentos & Parametrização Básica',
    description: 'Princípios do chaveamento PWM, dados de placa do motor e parametrização inicial pela IHM.',
    icon: '⚡',
    lessons: [
      {
        id: 'lesson_1_1',
        title: '1.1 O que é um Inversor de Frequência?',
        type: 'THEORY',
        durationMin: 5,
        description: 'Entenda os 3 estágios internos do CFW500: Retificador, Barramento CC e Ponte Inversora IGBT.',
        theoryData: {
          title: 'Arquitetura Interna do WEG CFW500',
          content: [
            '1. Ponte Retificadora: Converte a tensão alternada da rede (AC 220V/380V) em corrente contínua pulsante.',
            '2. Link CC (Barramento DC): Capacitores de alta capacidade filtram e estabilizam a tensão contínua em torno de 310Vcc (monofásico 220V) ou 540Vcc (trifásico 380V). Monitorado no parâmetro P0004.',
            '3. Ponte Inversora IGBT: Seis transistores IGBT chaveiam em alta frequência (modulação PWM) para recriar ondas senoidais com frequência (Hz) e amplitude de tensão (V) controladas.',
          ],
          keyTakeaway: 'A rotação síncrona do motor é dada por: Ns = (120 x f) / P. Variando a frequência (f), controlamos diretamente a velocidade do rotor.',
          diagramInfo: 'Rede AC ➔ [Ponte Retificadora] ➔ [Link CC / P0004] ➔ [Ponte IGBT PWM] ➔ Motor Trifásico',
        },
      },
      {
        id: 'lesson_1_2',
        title: '1.2 Dados de Catálogo do Motor (P0400 a P0403)',
        type: 'THEORY',
        durationMin: 7,
        description: 'A importância de inserir os dados corretos da placa do motor para a proteção térmica e controle V/F.',
        theoryData: {
          title: 'Parametrização do Motor no Inversor',
          content: [
            'Para que o inversor proteja o motor contra queima e aplique a curva de torque adequada, é obrigatório preencher o grupo de parâmetros do motor:',
            '• P0400: Tensão Nominal (Ex: 220 V)',
            '• P0401: Frequência Nominal (Padrão Brasil: 60.0 Hz)',
            '• P0402: Rotação Nominal (Ex: 1750 RPM para 4 polos)',
            '• P0403: Corrente Nominal de Placa (Ex: 4.5 A) - Base para a proteção de sobrecarga Ixt.',
          ],
          keyTakeaway: 'Nunca ligue um motor em carga sem antes conferir se P0403 corresponde exatamente à corrente de placa para a ligação realizada (Estrela/Triângulo).',
        },
      },
      {
        id: 'lesson_1_3',
        title: '1.3 Prática: Senha, Rampas e Partida Local',
        type: 'PRACTICE',
        durationMin: 10,
        description: 'Desbloqueie o acesso a parâmetros (P0000=5), reduza a rampa de aceleração (P0100=2.0s) e dê partida na IHM.',
        steps: [
          {
            id: 'p1_unlock',
            title: 'Desbloquear Acesso (P0000 = 5)',
            instruction: 'Acesse o parâmetro P0000 na IHM e altere o valor para 5 para permitir edição.',
            tip: 'Pressione PROG, confirme em P0000, coloque 5 com a tecla ▲ e pressione PROG para salvar.',
            isCompleted: (state) => state.parameters.P0000?.currentValue === 5,
          },
          {
            id: 'p1_accel',
            title: 'Configurar Rampa de Aceleração (P0100 = 2.0 s)',
            instruction: 'Navegue até o parâmetro P0100 e ajuste o tempo de aceleração para 2.0 s.',
            tip: 'Com ▲ vá até P0100, pressione PROG, ajuste para 2.0 com ▼ e salve com PROG.',
            isCompleted: (state) => {
              const val = state.parameters.P0100?.currentValue;
              return val !== undefined && val <= 2.1 && val >= 0.1;
            },
          },
          {
            id: 'p1_run',
            title: 'Partida em Modo Local pela IHM',
            instruction: 'Pressione a tecla vermelha "O" para voltar à tela principal e depois clique na tecla verde "I".',
            tip: 'O status passará para RUN e o motor acelerará suavemente.',
            isCompleted: (state) => state.motorStatus === 'RUNNING' && state.controlSource === 'LOC',
          },
        ],
      },
    ],
  },
  {
    id: 'module_2',
    moduleNumber: 2,
    title: 'Acionamento Remoto por Bornes I/O',
    description: 'Comando por botoeiras externas a 2 fios, entradas digitais e variação de velocidade por potenciômetro.',
    icon: '🔌',
    lessons: [
      {
        id: 'lesson_2_1',
        title: '2.1 Entradas Digitais e Analógicas',
        type: 'THEORY',
        durationMin: 6,
        description: 'Conheça o funcionamento das entradas digitais PNP/NPN (DI1-DI4) e entrada analógica 0-10V (AI1).',
        theoryData: {
          title: 'Sinais de Comando na Régua de Bornes',
          content: [
            '• Entradas Digitais (DI1 a DI4): Operam com nível lógico alto (+24Vcc). A entrada DI1 vem de fábrica programada para Gira/Para.',
            '• Entrada Analógica (AI1): Recebe sinal de tensão de 0 a 10 Vcc proporcional à frequência (0V = P0133 Freq. Mínima, 10V = P0134 Freq. Máxima).',
            '• Seleção Local/Remoto: O parâmetro P0220 define a origem do comando, e P0222 define a fonte de velocidade no modo Remoto (1 = AI1).',
          ],
          keyTakeaway: 'Em aplicações industriais, o comando remoto via bornes garante a operação do inversor através de botões no painel da máquina ou saídas a relé do CLP.',
        },
      },
      {
        id: 'lesson_2_2',
        title: '2.2 Prática: Parametrização e Controle por Potenciômetro',
        type: 'PRACTICE',
        durationMin: 12,
        description: 'Comande o motor remotamente utilizando a chave DI1 e varie a rotação pelo potenciômetro analógico.',
        steps: [
          {
            id: 'p2_locrem',
            title: 'Alternar Inversor para Modo Remoto (REM)',
            instruction: 'Pressione a tecla LOC/REM na IHM para comutar o controle para a régua de bornes.',
            tip: 'Verifique no display a indicação superior mudar de LOC para REM.',
            isCompleted: (state) => state.controlSource === 'REM',
          },
          {
            id: 'p2_ref_pot',
            title: 'Configurar Referência Remota por AI1 (P0222 = 1)',
            instruction: 'Ajuste o parâmetro P0222 para o valor 1.',
            tip: 'Acesse P0222 na IHM, pressione PROG, coloque 1 e salve com PROG.',
            isCompleted: (state) => state.parameters.P0222?.currentValue === 1,
          },
          {
            id: 'p2_start_di1',
            title: 'Ligar o Motor pela Chave DI1',
            instruction: 'Na régua de bornes, clique na chave DI1 para comutá-la para a posição ON.',
            tip: 'O inversor entrará em RUN e iniciará a rotação comandado pelo borne externo.',
            isCompleted: (state) => state.digitalInputs.di1 === true && state.motorStatus === 'RUNNING',
          },
          {
            id: 'p2_speed_ai1',
            title: 'Ajustar Potenciômetro AI1 acima de 5V',
            instruction: 'Arraste o slider da entrada analógica AI1 para uma tensão superior a 5.0 V.',
            tip: 'Observe a frequência e a velocidade em RPM subirem proporcionalmente à tensão.',
            isCompleted: (state) => state.ai1Voltage >= 4.8 && state.outputFrequency >= 20.0,
          },
        ],
      },
    ],
  },
  {
    id: 'module_3',
    moduleNumber: 3,
    title: 'Multispeed & Diagnóstico de Falhas',
    description: 'Programação de velocidades pré-fixadas por combinações digitais e procedimento de rearme após falhas.',
    icon: '🛠️',
    lessons: [
      {
        id: 'lesson_3_1',
        title: '3.1 Como Funciona a Função Multispeed?',
        type: 'THEORY',
        durationMin: 6,
        description: 'Aprenda a criar até 8 velocidades fixas selecionáveis por combinação binária de entradas digitais.',
        theoryData: {
          title: 'Tabela Verdade do Multispeed WEG (P0222 = 6)',
          content: [
            'A função Multispeed permite selecionar frequências pré-programadas através das chaves DI2, DI3 e DI4 sem precisar de sinal analógico:',
            '• DI4=0, DI3=0, DI2=0 ➔ Referência P0124 (Ex: 5.0 Hz)',
            '• DI4=0, DI3=0, DI2=1 ➔ Referência P0125 (Ex: 10.0 Hz)',
            '• DI4=0, DI3=1, DI2=0 ➔ Referência P0126 (Ex: 20.0 Hz)',
            '• DI4=0, DI3=1, DI2=1 ➔ Referência P0127 (Ex: 30.0 Hz)',
          ],
          keyTakeaway: 'Muito utilizado em pontes rolantes, esteiras de embalagem com velocidades pré-definidas e prensas.',
        },
      },
      {
        id: 'lesson_3_2',
        title: '3.2 Prática: Diagnóstico de Falha e Reset de Fábrica',
        type: 'PRACTICE',
        durationMin: 10,
        description: 'Simule uma falha de sobrecorrente (F006), execute o rearme e teste o reset de fábrica (P0204 = 5).',
        steps: [
          {
            id: 'p3_fault_f006',
            title: 'Induzir Sobrecarga de Corrente (F006)',
            instruction: 'No painel de injeção de falhas, clique para simular a falha F006.',
            tip: 'Observe o inversor desarmar, o relé RL2 acender e o LCD exibir F006 piscante.',
            isCompleted: (state) => state.activeFault?.code === 'F006',
          },
          {
            id: 'p3_reset_fault',
            title: 'Efetuar Reset de Falha na IHM',
            instruction: 'Pressione a tecla vermelha "O" para limpar o código de alarme.',
            tip: 'O display sairá de F006 e voltará a mostrar rdy.',
            isCompleted: (state) => state.activeFault === null && state.motorStatus === 'READY',
          },
          {
            id: 'p3_factory_reset',
            title: 'Carregar Padrão de Fábrica (P0204 = 5)',
            instruction: 'Acesse o parâmetro P0204, ajuste o valor para 5 e confirme pressionando a tecla PROG.',
            tip: 'Navegue até P0204, aperte PROG, use ▲ para colocar 5 e confirme no PROG.',
            isCompleted: (state) => {
              const wasResetTriggered = !!state.lastFactoryResetTimestamp;
              const isDefaultParams = state.parameters.P0100?.currentValue === 5.0 && state.parameters.P0101?.currentValue === 5.0;
              return wasResetTriggered || (state.parameters.P0204?.currentValue === 0 && isDefaultParams);
            },
          },
        ],
      },
    ],
  },
];