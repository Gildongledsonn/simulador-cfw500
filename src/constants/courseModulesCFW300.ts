import { CourseModule } from '../types/tutorial';

export const COURSE_MODULES_CFW300: CourseModule[] = [
  {
    id: 'mod_cfw300_1',
    moduleNumber: 1,
    title: 'Comandos Locais e Parametrização Inicial (CFW300)',
    description: 'Navegação rápida no display LED de 4 dígitos, ajuste de rampa e partida local pela IHM.',
    icon: '⚙️',
    lessons: [
      {
        id: 'c300_l1_teoria_ihm',
        title: 'Estrutura da IHM e Teclas I/O',
        type: 'THEORY',
        durationMin: 10,
        description: 'Entenda o mapa de parâmetros e os LEDs indicadores do WEG CFW300.',
        theoryData: {
          title: 'Interface do Micro Drive WEG CFW300',
          content: [
            'O WEG CFW300 possui display de 7 segmentos de 4 dígitos vermelhos e teclado de membrana tátil.',
            'No modo LOCAL, a tecla verde [I] executa a rampa de aceleração P0100 até a velocidade de referência.',
            'A tecla vermelha [O] executa a desaceleração P0101 ou reseta falhas ativas no microinversor.'
          ],
          diagramInfo: '[Tecla I] -> Aceleração P0100 -> Rotação Nominal | [Tecla O] -> Desaceleração P0101 -> Parada',
          keyTakeaway: 'Pressione PROG para entrar no modo de edição de parâmetros e salvar na EEPROM.'
        }
      },
      {
        id: 'c300_l2_pratica_local',
        title: 'Ajuste de Frequência P0121 e Partida Local',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Ajuste a frequência de referência local para 45.0 Hz e dê a partida pela tecla I.',
        steps: [
          {
            id: 'c300_s1_loc',
            title: 'Garantir Modo Local Ativo',
            instruction: 'Verifique se o display indica o modo Local (indicador LOC aceso).',
            isCompleted: (s) => s.controlSource === 'LOC'
          },
          {
            id: 'c300_s2_p121',
            title: 'Ajustar P0121 para 45.0 Hz',
            instruction: 'Acesse o parâmetro P0121 e grave o valor de 45.0 Hz.',
            isCompleted: (s) => Math.abs(s.parameters.P0121.currentValue - 45.0) < 0.2
          },
          {
            id: 'c300_s3_run',
            title: 'Partir o Motor na Tecla [I]',
            instruction: 'Pressione o botão I para partir e atingir 45.0 Hz de frequência nominal.',
            isCompleted: (s) => s.motorStatus === 'RUNNING' && s.outputFrequency >= 44.5
          }
        ]
      }
    ]
  },
  {
    id: 'mod_cfw300_2',
    moduleNumber: 2,
    title: 'Comando Remoto por Módulo Plug-in (IOAR)',
    description: 'Acionamento por bornes digitais DI1 a DI4 e referência analógica de tensão 0-10V.',
    icon: '🔌',
    lessons: [
      {
        id: 'c300_l3_remoto_di1',
        title: 'Partida Remota por Borne DI1',
        type: 'PRACTICE',
        durationMin: 15,
        description: 'Passe o CFW300 para modo Remoto, ajuste a tensão analógica AI1 acima de 5.0V e ligue por DI1.',
        steps: [
          {
            id: 'c300_s4_rem',
            title: 'Alternar para Modo Remoto',
            instruction: 'Pressione o botão LOC/REM para comutar o controle para os bornes externos.',
            isCompleted: (s) => s.controlSource === 'REM'
          },
          {
            id: 'c300_s5_pot',
            title: 'Ajustar Entrada Analógica AI1 > 5.0V',
            instruction: 'Deslize o potenciômetro AI1 até ultrapassar 5.0 Volts de referência.',
            isCompleted: (s) => (s.ai1Voltage ?? 0) >= 5.0
          },
          {
            id: 'c300_s6_di1',
            title: 'Acionar Chave DI1 (Gira/Para)',
            instruction: 'Clique no botão DI1 para partir o motor pelo comando remoto.',
            isCompleted: (s) => s.motorStatus === 'RUNNING' && Boolean(s.digitalInputs?.di1 || (s.digitalInputs as any)?.DI1)
          }
        ]
      }
    ]
  }
];