import { CourseModule } from '../types/tutorial';

export const COURSE_MODULES_CLIC02: CourseModule[] = [
  {
    id: 'mod_clic02_completo',
    moduleNumber: 1,
    title: 'Automação Industrial com SoftPLC CLIC-02 & Rede Modbus',
    description: 'Do Ladder básico (IEC 61131-3) até integração serial com inversores de frequência.',
    icon: '🪜',
    lessons: [
      {
        id: 'clic_l1_teoria_ladder',
        title: 'Lição 1: Fundamentos do Ciclo de Varredura e Linguagem Ladder',
        type: 'THEORY',
        durationMin: 12,
        description: 'Estrutura de barramentos elétricos virtuais, contatos NA/NF e tempo de scan.',
        theoryData: {
          title: 'Arquitetura de Programação do WEG CLIC-02',
          content: [
            'O CLIC-02 executa sua lógica ciclicamente: Leitura das Entradas -> Execução do Programa Ladder -> Atualização das Saídas.',
            'Entradas físicas I1 a I8 leem sinais de 24V CC de botoeiras e sensores indutivos.',
            'O contato NA fecha com 24V; o contato NF conduz em repouso (0V) e abre sob 24V.',
            'A saída Q1 comuta um relé interno para comandar contatores de potência ou enviar sinal de partida.'
          ],
          diagramInfo: '|--[ I1 (Liga NA) ]----[/ I2 (Desliga NF) ]----( Q1 Inversor )--|',
          keyTakeaway: 'O botão de parada de emergência deve sempre usar contato NF para garantir desligamento se o fio romper.'
        }
      },
      {
        id: 'clic_l2_partida_selo',
        title: 'Lição 2: Circuito de Retenção (Selo) e Intertravamento',
        type: 'THEORY',
        durationMin: 12,
        description: 'Auto-retenção com botoeiras de pulso e segurança de partida.',
        theoryData: {
          title: 'Lógica de Retenção de Potência',
          content: [
            'Botoeiras de pulso não mantêm o contato fechado após a soltura do operador.',
            'O circuito de selo coloca um contato NA da própria saída Q1 em paralelo com o botão Liga (I1).',
            'Ao pressionar o botão Desliga (I2), a linha perde continuidade e a saída desliga com segurança.'
          ],
          diagramInfo: '|--[ I1 ]--+--[/ I2 ]----------------( Q1 )--|\n|--[ Q1 ]--+|',
          keyTakeaway: 'O contato de selo garante retorno seguro em caso de queda de energia.'
        }
      },
      {
        id: 'clic_l3_teoria_temporizadores',
        title: 'Lição 3: Temporizadores TON e Escrita de Velocidade Modbus',
        type: 'THEORY',
        durationMin: 15,
        description: 'Atraso na partida de esteiras e envio da referência de frequência para o registrador 40002.',
        theoryData: {
          title: 'Integração de Temporização e Rede RS-485',
          content: [
            'O bloco temporizador T1 (Timer On Delay) conta o tempo configurado antes de acionar seu contato.',
            'O bloco de escrita Modbus (MB_SPEED) envia um telegrama serial para o registrador 40002 (P0681) do inversor.',
            'Uma referência de 60.0 Hz é enviada como valor numérico 8192 (100% da escala de velocidade).'
          ],
          diagramInfo: '|--[ I1 ]------------------------[ TON T1 3.0s ]--|\n|--[ T1 ]------------------------( MB_SPEED 60Hz )--|',
          keyTakeaway: 'A rede Modbus RTU permite comandar velocidade e ler corrente por apenas 2 fios blindados.'
        }
      }
    ]
  }
];