import { TutorialLesson } from '../types/tutorial';

export const TUTORIAL_LESSONS: TutorialLesson[] = [
  {
    id: 'lesson_1_basic_ramps',
    title: '1. Desbloqueio e Ajuste de Rampas',
    category: 'Básico',
    description: 'Aprenda a desbloquear a edição de parâmetros e configurar rampas de partida rápida.',
    steps: [
      {
        id: 'step_unlock',
        title: 'Desbloquear Acesso (P0000)',
        instruction: 'Acesse o parâmetro P0000 e altere seu valor para 5 para habilitar edição.',
        tip: 'Pressione PROG até ver P0000, tecle PROG novamente para abrir o valor, use ▲ para colocar 5 e aperte PROG para salvar.',
        isCompleted: (state) => state.parameters.P0000.currentValue === 5,
      },
      {
        id: 'step_accel',
        title: 'Configurar Rampa de Aceleração (P0100)',
        instruction: 'Ajuste o tempo de aceleração P0100 para 2.0 s.',
        tip: 'Navegue com ▲ até P0100, pressione PROG, diminua o valor com ▼ até 2.0 e confirme no PROG.',
        isCompleted: (state) => Math.abs(state.parameters.P0100.currentValue - 2.0) <= 0.1,
      },
      {
        id: 'step_run_local',
        title: 'Partir Motor em Modo Local',
        instruction: 'Pressione a tecla vermelha "O" para voltar à tela principal e depois clique na tecla verde "I" para ligar o motor.',
        tip: 'Se a tela mostrar P0100, pressione "O" uma vez para sair do menu de parâmetros e então aperte "I".',
        // Valida imediatamente quando o motor entra em RUNNING no modo Local
        isCompleted: (state) => state.motorStatus === 'RUNNING' && state.controlSource === 'LOC',
      },
    ],
  },
  {
    id: 'lesson_2_remote_terminal',
    title: '2. Acionamento por Bornes Externos (2 Fios)',
    category: 'Controle Remoto',
    description: 'Configure o inversor para aceitar comandos de chaves externas e potenciômetro na régua de bornes.',
    steps: [
      {
        id: 'step_loc_rem',
        title: 'Alternar para Modo Remoto',
        instruction: 'Pressione o botão LOC/REM na IHM para colocar o CFW500 em modo REM.',
        tip: 'Observe a indicação no canto superior do LCD mudar de LOC para REM.',
        isCompleted: (state) => state.controlSource === 'REM',
      },
      {
        id: 'step_ref_remote',
        title: 'Configurar Referência por Potenciômetro (P0222)',
        instruction: 'Altere o parâmetro P0222 para o valor 1 (Referência Remota via AI1).',
        tip: 'Pressione PROG, selecione P0222, aperte PROG, ajuste para 1 e salve com PROG.',
        isCompleted: (state) => state.parameters.P0222.currentValue === 1,
      },
      {
        id: 'step_close_di1',
        title: 'Ligar Chave DI1 (Gira/Para)',
        instruction: 'Na Régua de Bornes I/O, feche a chave digital DI1.',
        tip: 'Clique no botão DI1: OFF para torná-lo ON.',
        isCompleted: (state) => state.digitalInputs.di1 === true && state.motorStatus === 'RUNNING',
      },
      {
        id: 'step_pot_speed',
        title: 'Ajustar Potenciômetro de Velocidade',
        instruction: 'Deslize a entrada analógica AI1 para acima de 5.0 V.',
        tip: 'O motor aumentará a rotação acompanhando a tensão analógica.',
        isCompleted: (state) => state.ai1Voltage >= 5.0 && state.outputFrequency >= 20.0,
      },
    ],
  },
  {
    id: 'lesson_3_fault_reset',
    title: '3. Diagnóstico e Reset de Falhas',
    category: 'Diagnóstico',
    description: 'Compreenda a atuação das proteções elétricas e o procedimento de rearme do sistema.',
    steps: [
      {
        id: 'step_inject_f006',
        title: 'Induzir Sobrecarga de Corrente (F006)',
        instruction: 'No painel de injeção de defeitos, clique no botão para simular a falha F006.',
        tip: 'Observe a lâmpada vermelha de falha (RL2) acender e o display mostrar F006.',
        isCompleted: (state) => state.activeFault?.code === 'F006',
      },
      {
        id: 'step_reset_fault',
        title: 'Executar Reset na IHM',
        instruction: 'Pressione a tecla vermelha O (Stop/Reset) na IHM ou use o botão de Reset.',
        tip: 'O código de falha sumirá do display, retornando o inversor ao status "rdy".',
        isCompleted: (state) => state.activeFault === null && state.motorStatus === 'READY',
      },
    ],
  },
];