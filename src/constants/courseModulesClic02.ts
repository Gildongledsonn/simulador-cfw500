import { CourseModule } from '../types/tutorial';

export const COURSE_MODULES_CLIC02: CourseModule[] = [
  {
    id: 'mod_clic02_fundamentos',
    moduleNumber: 1,
    title: 'Lógica Ladder Básica (WEG CLIC-02)',
    description: 'Contatos normalmente abertos (NA), normalmente fechados (NF), bobinas e circuito de selo.',
    icon: '🪜',
    lessons: [
      {
        id: 'clic_l1_teoria_ladder',
        title: 'Princípios da Norma IEC 61131-3 no CLIC-02',
        type: 'THEORY',
        durationMin: 10,
        description: 'Entenda o ciclo de varredura (Scan Cycle) e a lógica de relés programáveis.',
        theoryData: {
          title: 'Estrutura do Relé Programável CLIC-02',
          content: [
            'O CLIC-02 executa a lógica linha por linha (da esquerda para a direita).',
            'Entradas digitais (I1..I8) alimentam o barramento lógico para acionar bobinas internas (M1..M8) ou saídas a relé (Q1..Q4).',
            'O comando do inversor é feito acionando a bobina Q1 (Partida) e escrevendo a frequência via blocos Modbus.'
          ],
          diagramInfo: '|--[ I1 (Liga) ]----[/ I2 (Desliga) ]----( Q1 Inversor )--|',
          keyTakeaway: 'O botão de parada deve ser sempre configurado com contato NF para máxima segurança.'
        }
      },
      {
        id: 'clic_l2_partida_selo',
        title: 'Circuito com Selo para Partida de Inversor',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Coloque o CLIC-02 em RUN e comande a saída Q1 usando a entrada de pulso I1.',
        steps: [
          {
            id: 'clic_s1_run_plc',
            title: 'Habilitar Modo RUN no CLP',
            instruction: 'Inicie a execução do programa clicando no botão RUN do painel CLIC-02.',
            isCompleted: (s) => s.motorStatus === 'RUNNING' || s.controlSource === 'REM'
          }
        ]
      }
    ]
  },
  {
    id: 'mod_clic02_avancado',
    moduleNumber: 2,
    title: 'Automação com Temporizadores & Rede Modbus',
    description: 'Temporizadores TON/TOF, contadores e escrita de frequência via registradores RS-485.',
    icon: '⚡',
    lessons: [
      {
        id: 'clic_l3_teoria_temporizadores',
        title: 'Temporizadores TON e Blocos Modbus',
        type: 'THEORY',
        durationMin: 12,
        description: 'Atraso na partida de esteiras e chaveamento de velocidade automática.',
        theoryData: {
          title: 'Temporização e Comunicação Serial',
          content: [
            'Os blocos temporizadores T1 a T4 geram atrasos na condução de sinal.',
            'O bloco MB_SPEED envia telegramas Modbus RTU direto ao registrador 40002 (P0681) do inversor de frequência.'
          ],
          diagramInfo: '|--[ I1 ]------------------------[ TON T1 5.0s ]--|\n|--[ T1 ]------------------------( MB_SPEED 60Hz )--|',
          keyTakeaway: 'A comunicação serial dispensa fiação analógica extra e garante precisão digital.'
        }
      }
    ]
  }
];