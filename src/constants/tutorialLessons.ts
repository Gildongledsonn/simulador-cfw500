import { TutorialLesson } from '../types/tutorial';
import { InverterState } from '../types/cfw500';

export const TUTORIAL_LESSONS: TutorialLesson[] = [
  {
    id: 'lesson_basic_run',
    title: 'Aula 1: Parametrização e Partida Local',
    category: 'Básico',
    type: 'PRACTICE',
    durationMin: 10,
    description: 'Aprenda a desbloquear parâmetros com P0000, ajustar tempo de aceleração e dar partida na IHM.',
    steps: [
      {
        id: 'step_unlock',
        title: '1. Desbloquear Parâmetros (P0000 = 5)',
        instruction: 'Acesse o parâmetro P0000 e altere o valor para 5.',
        tip: 'Pressione PROG, use ▲ até 5 e salve com PROG.',
        isCompleted: (state: InverterState) => state.parameters.P0000?.currentValue === 5,
      },
      {
        id: 'step_accel',
        title: '2. Ajustar Rampa de Aceleração (P0100 = 2.0s)',
        instruction: 'Navegue até P0100 e configure o valor para 2.0 s.',
        tip: 'Com ▲ vá até P0100, tecle PROG, reduza para 2.0 com ▼ e salve com PROG.',
        isCompleted: (state: InverterState) => {
          const val = state.parameters.P0100?.currentValue;
          return val !== undefined && val <= 2.1 && val >= 0.1;
        },
      },
      {
        id: 'step_run',
        title: '3. Partir o Motor no Teclado (Tecla I)',
        instruction: 'Volte à tela principal e tecle a tecla verde "I".',
        tip: 'Verifique se o inversor está em modo LOC antes de partir.',
        isCompleted: (state: InverterState) => state.motorStatus === 'RUNNING' && state.controlSource === 'LOC',
      },
    ],
  },
  {
    id: 'lesson_remote_pot',
    title: 'Aula 2: Controle Remoto por Bornes e Potenciômetro',
    category: 'Controle Remoto',
    type: 'PRACTICE',
    durationMin: 12,
    description: 'Configure o inversor para acionamento externo via bornes DI1 e entrada analógica AI1 (0-10V).',
    steps: [
      {
        id: 'step_locrem',
        title: '1. Alternar para Modo Remoto (REM)',
        instruction: 'Pressione a tecla LOC/REM para passar o controle à régua de bornes.',
        tip: 'O display indicará REM no topo.',
        isCompleted: (state: InverterState) => state.controlSource === 'REM',
      },
      {
        id: 'step_p0222',
        title: '2. Configurar Referência Remota por AI1 (P0222 = 1)',
        instruction: 'Altere o parâmetro P0222 para 1.',
        tip: 'Selecione P0222, aperte PROG, mude para 1 e salve com PROG.',
        isCompleted: (state: InverterState) => state.parameters.P0222?.currentValue === 1,
      },
      {
        id: 'step_di1',
        title: '3. Ligar o Motor pela Chave DI1',
        instruction: 'Comute a chave DI1 para a posição ON na régua de bornes.',
        tip: 'O inversor passará para o estado RUN.',
        isCompleted: (state: InverterState) => state.digitalInputs.di1 && state.motorStatus === 'RUNNING',
      },
      {
        id: 'step_ai1',
        title: '4. Ajustar Rotação no Potenciômetro AI1',
        instruction: 'Suba o potenciômetro analógico AI1 acima de 5.0 V.',
        tip: 'Observe a frequência de saída e o RPM subirem.',
        isCompleted: (state: InverterState) => state.ai1Voltage >= 4.8 && state.outputFrequency >= 20.0,
      },
    ],
  },
  {
    id: 'lesson_fault_reset',
    title: 'Aula 3: Diagnóstico de Falha e Reset de Fábrica',
    category: 'Diagnóstico',
    type: 'PRACTICE',
    durationMin: 10,
    description: 'Simule sobrecorrente e restaure as configurações de fábrica pelo parâmetro P0204.',
    steps: [
      {
        id: 'step_fault',
        title: '1. Induzir Falha F006',
        instruction: 'Clique no painel de falhas para simular sobrecorrente F006.',
        tip: 'O display indicará o alarme F006 piscando.',
        isCompleted: (state: InverterState) => state.activeFault?.code === 'F006',
      },
      {
        id: 'step_clear_fault',
        title: '2. Resetar Alarme na IHM',
        instruction: 'Pressione a tecla vermelha "O" para limpar o código de alarme.',
        tip: 'O inversor voltará para READY.',
        isCompleted: (state: InverterState) => state.activeFault === null && state.motorStatus === 'READY',
      },
      {
        id: 'step_reset_p0204',
        title: '3. Restaurar Padrão de Fábrica (P0204 = 5)',
        instruction: 'Acesse o parâmetro P0204, ajuste para 5 e confirme com PROG.',
        tip: 'Todos os parâmetros voltarão aos valores de catálogo.',
        isCompleted: (state: InverterState) => {
          const wasReset = !!state.lastFactoryResetTimestamp;
          const isDefaults = state.parameters.P0100?.currentValue === 5.0 && state.parameters.P0101?.currentValue === 5.0;
          return wasReset || (state.parameters.P0204?.currentValue === 0 && isDefaults);
        },
      },
    ],
  },
];