import { CourseModule } from '../types/tutorial';

export const COURSE_MODULES_L1000: CourseModule[] = [
  // =========================================================================================
  // BLOCO 1: FUNDAMENTOS, HARDWARE & SEGURANÇA (MÓDULOS 1 A 5 - FASE GUIADA)
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
        title: 'Lição 1: Anatomia do Yaskawa L1000 para Elevadores',
        description: 'Diferenças construtivas entre inversores industriais e inversores dedicados à elevação vertical.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Arquitetura do Yaskawa L1000',
          content: [
            'O inversor Yaskawa L1000 é desenvolvido especificamente para tração vertical, incorporando controle de torque em velocidade zero sem escorregamento.',
            'Diferente de acionamentos de uso geral, ele integra sequenciamento direto para contatores de freio eletromecânico, controle anti-recuo (Anti-Rollback) e curvas Jerk para conforto humano.',
            'Opera tanto com motores de indução trifásicos com redutor mecânico (Geared) quanto com máquinas síncronas de ímãs permanentes de acoplamento direto (Gearless PMSM).',
          ],
          diagramInfo: 'Rede Trifásica -> Reator de Linha -> L1000 -> Contatores de Segurança (EDM) -> Máquina Gearless PMSM',
          keyTakeaway: 'O dimensionamento do inversor de elevadores prioriza capacidade de sobrecarga de 150% por 60 segundos e resposta instantânea de torque na liberação do freio.',
        },
      },
      {
        id: 'l1000-m1-l2',
        title: 'Lição 2: Requisitos de Segurança das Normas NM 207 e EN 81-20/50',
        description: 'Exigências de contatores em série, monitoramento de contatos guiados e circuito de segurança.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Segurança Normativa em Elevadores',
          content: [
            'A norma exige corte de potência redundante entre o inversor e o motor através de contatores com contatos guiados mecanicamente (EDM).',
            'O inversor monitora o estado dos contatores antes de liberar novas viagens. Se um contator colar, nova partida é bloqueada.',
            'O freio eletromecânico deve possuir duas sapatas/discos independentes, cada uma com capacidade de segurar a cabine com 125% da carga nominal.',
          ],
          diagramInfo: 'Linha de Segurança (Limites + Trincos) -> Bobinas dos Contatores -> Retorno EDM ao L1000',
          keyTakeaway: 'Qualquer interrupção na linha de segurança desenergiza instantaneamente os contatores e provoca a queda mecânica do freio.',
        },
      },
      {
        id: 'l1000-m1-l3',
        title: 'Lição 3: Dinâmica de Carga, Cabine e Contrapeso',
        description: 'Fator de balanceamento de 40% a 50% e viagens motoras vs. regenerativas.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Balanceamento de Carga Vertical',
          content: [
            'O contrapeso equilibra o peso morto da cabine vazia mais 40% a 50% da capacidade máxima de passageiros.',
            'Cabine Cheia Subindo: O motor consome energia da rede elétrica para vencer o peso dos passageiros (Regime Motor).',
            'Cabine Cheia Descendo: A gravidade puxa a cabine para baixo, o motor atua como gerador e a energia retorna ao barramento CC (Regime Regenerativo).',
          ],
          diagramInfo: 'Cabine (100% Carga) Descendo -> Motor Regenerando -> Barramento CC > 700V -> Chopper de Frenagem -> Resistor Dissipando',
          keyTakeaway: 'O dimensionamento do resistor de frenagem é crítico para evitar desligamento por sobretensão (ov) em horários de pico.',
        },
      },
    ],
  },
  {
    id: 'l1000-mod2',
    moduleNumber: 2,
    title: 'Circuito de Potência, Bornes e Aterramento',
    description: 'Instalação de força R/S/T, saída U/V/W, ligação de resistor e medição no barramento CC.',
    icon: '⚡',
    lessons: [
      {
        id: 'l1000-m2-l1',
        title: 'Lição 1: Entrada de Rede, Reatores e Barramento CC',
        description: 'Conexão dos bornes R/L1, S/L2, T/L3 e medição da tensão contínua no parâmetro P0004.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Conexão de Entrada e Barramento CC',
          content: [
            'A rede trifásica deve ser ligada nos bornes R/L1, S/L2 e T/L3 através de fusíveis ultrarrápidos classe aR ou disjuntores caixa moldada.',
            'O barramento de corrente contínua mantém a tensão estável em ~310V (rede 220V) ou ~540V (rede 380V), monitorada diretamente no parâmetro P0004.',
            'O uso de reator de linha trifásico na entrada é obrigatório para reduzir harmônicas e proteger a ponte retificadora contra surtos.',
          ],
          diagramInfo: 'Parâmetro de Leitura: P0004 = Tensão Barramento CC (V)',
          keyTakeaway: 'Nunca ligue a rede de alimentação nos bornes de saída U/V/W sob risco de queima imediata do inversor.',
        },
      },
      {
        id: 'l1000-m2-l2',
        title: 'Lição 2: Conexão do Motor e Resistor de Frenagem (B1/B2)',
        description: 'Esquema de ligação do resistor térmico e cabeamento blindado da máquina.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Saída de Potência e Resistor de Frenagem',
          content: [
            'Os bornes B1 e B2 conectam o banco de resistores de frenagem ao transistor chopper interno do L1000.',
            'O cabo que liga o inversor à máquina de tração deve ser blindado com a malha aterrada em 360° no flange metálico do painel.',
          ],
          keyTakeaway: 'Mantenha o resistor em compartimento ventilado no topo do painel devido à alta dissipação térmica.',
        },
      },
      {
        id: 'l1000-m2-l3',
        title: 'Lição 3: Blindagem e Aterramento contra Ruídos de Encoder',
        description: 'Separação de eletrocalhas e equipotencialização da casa de máquinas.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Compatibilidade Eletromagnética (EMC)',
          content: [
            'Cabos de controle e sinais do encoder PG devem correr em eletrocalhas separadas a pelo menos 20 cm dos cabos de força.',
            'A carcaça da máquina de tração, o chassi do painel e o terra do inversor devem convergir para uma barra de terra única de baixa impedância.',
          ],
          keyTakeaway: 'Ruídos induzidos no cabo do encoder provocam desvios de velocidade falsos e desarmes durante a viagem.',
        },
      },
      {
        id: 'l1000-m2-l4',
        title: 'Lição 4: Inspeção Visual e Teste de Isolamento Pré-Energização',
        description: 'Uso seguro do megômetro e conferência de torques dos bornes.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Procedimento Pré-Energização',
          content: [
            'Desconecte todos os cabos de saída do inversor antes de aplicar tensão de ensaio com megômetro no motor.',
            'Reaperte todos os parafusos de potência com torquímetro para evitar resistência de contato e aquecimento.',
          ],
          keyTakeaway: 'A alta tensão do megômetro destrói instantaneamente os transistores IGBT do inversor.',
        },
      },
      {
        id: 'l1000-m2-l5',
        title: 'Lição 5: Prática Guiada: Leitura de Tensão CC no Parâmetro P0004',
        description: 'Consulte o parâmetro P0004 na IHM para validar a tensão retificada.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m2-s1',
            title: 'Consultar Parâmetro P0004 na IHM',
            instruction: 'Pressione PROG, navegue até o parâmetro P0004 (Tensão Barramento CC) e confirme a leitura em ~310V.',
            isCompleted: (s) => (s.dcBusVoltage ?? 310) >= 300,
          },
          {
            id: 'l1000-m2-s2',
            title: 'Confirmar Estado de Pronto (RDY)',
            instruction: 'Certifique-se de que o inversor não possui falhas ativas na inicialização.',
            isCompleted: (s) => s.motorStatus === 'READY' && s.activeFault === null,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod3',
    moduleNumber: 3,
    title: 'IHM Digital & Navegação nos Menus do L1000',
    description: 'Navegação nos parâmetros P0000 (Acesso), P0002 (Frequência) e P0204 (Reset).',
    icon: '📟',
    lessons: [
      {
        id: 'l1000-m3-l1',
        title: 'Lição 1: Teclado de Membrana e LEDs de Sinalização',
        description: 'Funções das teclas ESC, RESET, ENTER, RUN e STOP no L1000.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'IHM Digital do Yaskawa L1000',
          content: [
            'Display LCD retroiluminado com monitoramento simultâneo de velocidade linear (m/s), corrente e status de marcha.',
            'Teclas direcionais permitem transição rápida entre parâmetros de inicialização, controle e diagnóstico.',
          ],
          diagramInfo: 'Parâmetro P0000: Senha de Acesso (Ajustar em 5 para liberar edição)',
          keyTakeaway: 'A tecla ESC retorna ao nível anterior e cancela alterações não salvas.',
        },
      },
      {
        id: 'l1000-m3-l2',
        title: 'Lição 2: Estrutura de Grupos e Nível de Acesso (P0000)',
        description: 'Liberação de parâmetros protegidos através do parâmetro P0000.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Acesso aos Parâmetros',
          content: [
            'P0000 = 5: Libera acesso total de leitura e escrita a todos os parâmetros.',
            'P0002: Monitora a frequência de saída em Hz.',
            'P0204 = 5: Carrega o padrão de fábrica no inversor.',
          ],
          keyTakeaway: 'Sempre confira se o P0000 está em 5 caso não consiga alterar um valor.',
        },
      },
      {
        id: 'l1000-m3-l3',
        title: 'Lição 3: Modo de Monitoramento em Tempo Real',
        description: 'Leitura de grandezas elétricas e velocidade de cabine.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Monitores de Operação',
          content: [
            'P0001: Velocidade de Saída (RPM).',
            'P0002: Frequência de Saída (Hz).',
            'P0003: Corrente do Motor (A).',
          ],
          keyTakeaway: 'Acompanhar P0001 e P0003 em tempo real evita sobrecarga na partida.',
        },
      },
      {
        id: 'l1000-m3-l4',
        title: 'Lição 4: Prática Guiada: Acessar Parâmetro P0002',
        description: 'Navegue na IHM até o parâmetro P0002.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m3-s1',
            title: 'Entrar no Modo de Programação (PROG)',
            instruction: 'Pressione a tecla PROG na IHM para acessar a lista de parâmetros.',
            isCompleted: (s) => s.ihmMode === 'PARAM_SELECT' || s.ihmMode === 'PARAM_EDIT',
          },
          {
            id: 'l1000-m3-s2',
            title: 'Selecionar Parâmetro P0002',
            instruction: 'Navegue pelas teclas ▲ / ▼ até selecionar o parâmetro P0002 (Frequência de Saída).',
            isCompleted: (s) => s.selectedParamIndex !== undefined && (s.ihmMode === 'PARAM_SELECT' || s.ihmMode === 'PARAM_EDIT'),
          },
        ],
      },
      {
        id: 'l1000-m3-l5',
        title: 'Lição 5: Prática Guiada: Reset de Fábrica (P0204 = 5)',
        description: 'Restaure os valores originais do inversor com segurança.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m3-s3',
            title: 'Executar Reset de Fábrica',
            instruction: 'Pressione o botão Resetar Inversor para aplicar P0204 = 5 e limpar a memória.',
            isCompleted: (s) => s.motorStatus === 'READY' && (s.outputFrequency ?? 0) === 0,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod4',
    moduleNumber: 4,
    title: 'Motores de Tração: Indução vs. PMSM Gearless',
    description: 'Configuração do tipo de controle em P0202 (0 = V/F, 1 = Vetorial VVW).',
    icon: '⚙️',
    lessons: [
      {
        id: 'l1000-m4-l1',
        title: 'Lição 1: Máquinas de Tração com Redutor (Geared)',
        description: 'Características de motores de indução trifásicos acoplados a redutores coroa e sem-fim.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Máquinas de Tração Geared',
          content: [
            'Convertem alta rotação do motor (ex: 1150 a 1750 RPM) em baixo RPM na polia de tração através de caixa de redução mecânica.',
            'Exigem controle vetorial com parâmetros de escorregamento compensados em P0138.',
          ],
          diagramInfo: 'Parâmetro de Modo: P0202 = 1 (Controle Vetorial VVW)',
          keyTakeaway: 'Apresentam menor rendimento elétrico que máquinas síncronas de acoplamento direto.',
        },
      },
      {
        id: 'l1000-m4-l2',
        title: 'Lição 2: Máquinas Gearless com Ímãs Permanentes (PMSM)',
        description: 'Acoplamento direto da polia, múltiplos polos e eliminação do redutor.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Máquinas Síncronas PMSM Gearless',
          content: [
            'O rotor possui ímãs de Neodímio de alta densidade magnética fixados diretamente na carcaça.',
            'Opera em rotações muito baixas (ex: 90 a 240 RPM) com torque extremo na polia.',
          ],
          keyTakeaway: 'Exigem encoder absoluto de alta resolução (EnDat/SinCos) e calibração precisa do ângulo de polo magnético.',
        },
      },
      {
        id: 'l1000-m4-l3',
        title: 'Lição 3: Seleção do Método de Controle em P0202',
        description: 'Ajuste do modo escalar V/F (P0202 = 0) vs. Vetorial (P0202 = 1).',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Métodos de Controle',
          content: [
            'P0202 = 0: Controle Escalar V/F linear (utilizado apenas para movimentação provisória de obra).',
            'P0202 = 1: Controle Vetorial VVW com torque constante em baixa velocidade.',
          ],
          keyTakeaway: 'O modo vetorial é mandatório para operação de elevadores com passageiros.',
        },
      },
    ],
  },
  {
    id: 'l1000-mod5',
    moduleNumber: 5,
    title: 'Cartões PG & Configuração de Encoders',
    description: 'Instalação de placas PG, resolução de pulsos (P0402) e leitura de rotação.',
    icon: '🔄',
    lessons: [
      {
        id: 'l1000-m5-l1',
        title: 'Lição 1: Encoders Incrementais com Placa PG-X3',
        description: 'Sinais diferenciais Line Driver (A, /A, B, /B) e padrão de 1024 a 4096 PPR.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Encoders Incrementais para Indução',
          content: [
            'Enviam dois trens de pulsos defasados em 90° elétricos para que o inversor determine velocidade e sentido de giro.',
            'Sinais diferenciais cancelam ruídos induzidos no cabo pelo chaveamento dos IGBTs.',
          ],
          diagramInfo: 'Parâmetro de Rotação Nominal do Encoder: P0402 (RPM)',
          keyTakeaway: 'A blindagem do cabo de encoder deve ser aterrada em ponto único no painel.',
        },
      },
      {
        id: 'l1000-m5-l2',
        title: 'Lição 2: Encoders Absolutos com Placa PG-F3 (EnDat / SinCos)',
        description: 'Transmissão serial de posição absoluta para máquinas Gearless.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Encoders Absolutos para PMSM',
          content: [
            'Informam ao L1000 a posição mecânica angular exata do rotor desde o instante em que o painel é ligado.',
            'Indispensáveis para que o inversor aplique o vetor de torque antes da liberação do freio.',
          ],
          keyTakeaway: 'Evita recuo ou solavanco mecânico na abertura do freio.',
        },
      },
      {
        id: 'l1000-m5-l3',
        title: 'Lição 3: Relação entre Frequência e Rotação Nominal (P0402)',
        description: 'Ajuste de RPM e conferência da resposta na telemetria.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Parametrização de Rotação',
          content: [
            'P0402: Insere a rotação nominal gravada na placa de identificação da máquina de tração.',
            'Permite ao inversor calcular a velocidade linear exata da cabine em metros por segundo (m/s).',
          ],
          keyTakeaway: 'O RPM correto é indispensável para que o inversor não gere alarme de sobrevelocidade.',
        },
      },
      {
        id: 'l1000-m5-l4',
        title: 'Lição 4: Prática Guiada: Partida e Leitura de RPM',
        description: 'Acione a máquina de tração e monitore a resposta de rotação.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m5-s1',
            title: 'Partir Máquina de Tração (RUN)',
            instruction: 'Pressione a tecla RUN para partir a máquina e elevar a frequência acima de 10 Hz.',
            isCompleted: (s) => (s.outputFrequency ?? 0) >= 10,
          },
          {
            id: 'l1000-m5-s2',
            title: 'Confirmar Medição de RPM',
            instruction: 'Verifique se a telemetria indica rotação ativa proporcional à frequência de saída.',
            isCompleted: (s) => (s.motorRPM ?? 0) > 0 || (s.outputFrequency ?? 0) >= 10,
          },
        ],
      },
    ],
  },

  // =========================================================================================
  // BLOCO 2: AUTO-TUNING, PARÂMETROS DE MOTOR & CURVAS JERK (MÓDULOS 6 A 10 - FASE GUIADA)
  // =========================================================================================
  {
    id: 'l1000-mod6',
    moduleNumber: 6,
    title: 'Auto-Tuning de Motores de Indução (P0400 / P0403)',
    description: 'Inserção de dados nominais de placa: Tensão (P0400 = 220V) e Corrente (P0403 = 4.5A).',
    icon: '🛠️',
    lessons: [
      {
        id: 'l1000-m6-l1',
        title: 'Lição 1: Inserção de Dados Nominais de Placa',
        description: 'Potência (P0404), Tensão (P0400), Corrente (P0403), Frequência (P0401) e RPM (P0402).',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Dados de Placa do Motor',
          content: [
            'O controle vetorial calcula o modelo matemático do motor a partir dos dados inseridos.',
            'P0400: Tensão Nominal (220V ou 380V).',
            'P0403: Corrente Nominal de Placa (ex: 4.5 A).',
          ],
          diagramInfo: 'Parâmetros: P0400 = 220V | P0403 = 4.5A | P0401 = 60Hz | P0402 = 1750 RPM',
          keyTakeaway: 'Consulte a placa de identificação fixada na carcaça da máquina de tração antes de iniciar o tuning.',
        },
      },
      {
        id: 'l1000-m6-l2',
        title: 'Lição 2: Auto-Tuning Estático com Cabos de Aço Passados',
        description: 'Medição da resistência de enrolamento sem girar a polia de tração.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Tuning Estático',
          content: [
            'Injeta pulsos de corrente contínua controlada com o freio mecânico fechado e cabos de aço passados na polia.',
            'Mede a resistência de fase estatórica (P0409) sem movimentar a cabine no poço.',
          ],
          keyTakeaway: 'Ideal para modernizações e manutenções em que não é possível desacoplar os cabos de tração.',
        },
      },
      {
        id: 'l1000-m6-l3',
        title: 'Lição 3: Procedimento de Execução na IHM',
        description: 'Ajuste de P0408 = 1 para disparo do auto-ajuste de motor.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Sequência de Auto-Tuning',
          content: [
            '1. Insira os dados de placa em P0400, P0401, P0402, P0403 e P0404.',
            '2. Ajuste P0408 = 1 (Habilita Auto-Ajuste).',
            '3. Pressione a tecla RUN para iniciar a medição da resistência Rs.',
          ],
          keyTakeaway: 'Nunca desligue a alimentação enquanto o auto-tuning estiver em andamento.',
        },
      },
      {
        id: 'l1000-m6-l4',
        title: 'Lição 4: Prática Guiada: Configurar P0400 e P0403',
        description: 'Programe P0400 = 220V e P0403 = 4.5A na memória do inversor.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m6-s1',
            title: 'Programar Tensão Nominal (P0400 = 220V)',
            instruction: 'Acesse o parâmetro P0400 e ajuste o valor para 220V.',
            isCompleted: (s) => (s.parameters?.P0400?.currentValue ?? 0) >= 200,
          },
          {
            id: 'l1000-m6-s2',
            title: 'Programar Corrente Nominal (P0403 = 4.5A)',
            instruction: 'Acesse o parâmetro P0403 e ajuste a corrente nominal para 4.5 A.',
            isCompleted: (s) => (s.parameters?.P0403?.currentValue ?? 0) >= 4.0,
          },
        ],
      },
      {
        id: 'l1000-m6-l5',
        title: 'Lição 5: Prática Guiada: Partida e Teste de Corrente',
        description: 'Acione o motor em velocidade nominal de 60 Hz e confira a corrente estabilizada.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m6-s3',
            title: 'Acelerar até 60 Hz',
            instruction: 'Pressione RUN e acelere a máquina até a frequência nominal de 60 Hz.',
            isCompleted: (s) => (s.outputFrequency ?? 0) >= 50,
          },
          {
            id: 'l1000-m6-s4',
            title: 'Confirmar Corrente Estável',
            instruction: 'Verifique se a corrente de operação permanece estável e abaixo do limite térmico.',
            isCompleted: (s) => Number(s.outputCurrent ?? 0) > 0 && Number(s.outputCurrent ?? 0) < 15,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod7',
    moduleNumber: 7,
    title: 'Auto-Tuning de Motores Síncronos PMSM (P0401 / P0402)',
    description: 'Configuração de Frequência Base (P0401 = 60.0Hz) e Rotação Nominal (P0402 = 1750 RPM).',
    icon: '🧲',
    lessons: [
      {
        id: 'l1000-m7-l1',
        title: 'Lição 1: Grandezas Elétricas de Máquinas Gearless PMSM',
        description: 'Indutâncias de eixo direto (Ld) e quadratura (Lq), fluxo magnético e Ke.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Modelagem de Motores de Ímãs Permanentes',
          content: [
            'Máquinas PMSM não possuem corrente de magnetização estatórica; o fluxo magnético é permanente nos ímãs do rotor.',
            'P0401 define a frequência base de trabalho (60.0 Hz).',
            'P0402 define a rotação nominal correspondente aos polos da máquina.',
          ],
          diagramInfo: 'Parâmetros: P0401 = 60.0 Hz | P0402 = 1750 RPM',
          keyTakeaway: 'A precisão de Ld e Lq define a capacidade de segurar a cabine imóvel em velocidade zero.',
        },
      },
      {
        id: 'l1000-m7-l2',
        title: 'Lição 2: Auto-Tuning Estático para PMSM',
        description: 'Emissão de sinais sonoros de alta frequência para cálculo de indutância com freio fechado.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Ensaio Estático em PMSM',
          content: [
            'O L1000 injeta pulsos de teste nas bobinas com o freio mecânico fechado, determinando a resistência e indutâncias.',
            'Garante a identificação completa dos parâmetros sem necessidade de soltar a cabine.',
          ],
          keyTakeaway: 'Garante o correto cálculo de pré-torque antes da abertura do freio mecânico.',
        },
      },
      {
        id: 'l1000-m7-l3',
        title: 'Lição 3: Fator de Serviço e Rendimento (P0405 / P0407)',
        description: 'Parametrização do rendimento nominal e fator de serviço da máquina de tração.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Parâmetros de Eficiência',
          content: [
            'P0405: Rendimento nominal do motor (ex: 83.5%).',
            'P0407: Fator de serviço do motor de tração (ex: 1.15).',
          ],
          keyTakeaway: 'Ajustes finos de rendimento reduzem as perdas por aquecimento no estator.',
        },
      },
      {
        id: 'l1000-m7-l4',
        title: 'Lição 4: Prática Guiada: Configurar P0401 e P0402',
        description: 'Programe P0401 = 60.0 Hz e P0402 = 1750 RPM na IHM.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m7-s1',
            title: 'Configurar Frequência Nominal (P0401 = 60.0 Hz)',
            instruction: 'Acesse o parâmetro P0401 e ajuste para 60.0 Hz.',
            isCompleted: (s) => (s.parameters?.P0401?.currentValue ?? 0) === 60.0,
          },
          {
            id: 'l1000-m7-s2',
            title: 'Configurar Rotação Nominal (P0402 = 1750 RPM)',
            instruction: 'Acesse o parâmetro P0402 e ajuste para 1750 RPM.',
            isCompleted: (s) => (s.parameters?.P0402?.currentValue ?? 0) >= 1000,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod8',
    moduleNumber: 8,
    title: 'Sentido de Giro & Calibração de Offset de Polo',
    description: 'Parametrização do sentido de giro local em P0223 (0 = Horário, 1 = Anti-Horário).',
    icon: '🎯',
    lessons: [
      {
        id: 'l1000-m8-l1',
        title: 'Lição 1: A Importância do Alinhamento Magnético',
        description: 'Relação geométrica entre os polos do estator e os ímãs permanentes do rotor.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Ângulo de Polo do Rotor',
          content: [
            'Para que o inversor gere torque útil máximo, o campo girante do estator deve estar a exatamente 90° elétricos dos ímãs do rotor.',
            'O encoder absoluto fornece a posição mecânica; o parâmetro de offset calibra a defasagem entre o ponto zero do encoder e o polo magnético.',
          ],
          diagramInfo: 'Parâmetro de Sentido Local: P0223 (0 = FWD / Horário, 1 = REV / Anti-Horário)',
          keyTakeaway: 'Um offset de polo incorreto impede o movimento, gera corrente excessiva e causa sobrecorrente (oC).',
        },
      },
      {
        id: 'l1000-m8-l2',
        title: 'Lição 2: Método de Alinhamento Estático com Freio Fechado',
        description: 'Injeção de corrente CC para determinação do ângulo magnético sem soltar o contrapeso.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Sintonia de Offset Estático',
          content: [
            'O inversor aplica pulsos de corrente nas fases U-V-W e mede a saturação do núcleo de ferro.',
            'Calcula o ângulo elétrico exato e calibra o sentido de avanço e retorno.',
          ],
          keyTakeaway: 'Dispensa o desacoplamento de cabos ou elevação mecânica da cabine durante a calibração.',
        },
      },
      {
        id: 'l1000-m8-l3',
        title: 'Lição 3: Diagnóstico de Falhas de Offset (dEv / PGo)',
        description: 'Como diagnosticar desalinhamento após soltura de acoplamento do encoder.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Sintomas de Offset Descalibrado',
          content: [
            'O motor emite zumbido elevado, consome corrente máxima de placa e não consegue girar a polia.',
            'Ocorre pequeno recuo no sentido contrário ao comandado antes do travamento mecânico.',
          ],
          keyTakeaway: 'Sempre que o acoplamento do encoder for solto para manutenção, o alinhamento deve ser refeito.',
        },
      },
      {
        id: 'l1000-m8-l4',
        title: 'Lição 4: Prática Guiada: Teste de Sentido FWD e Reversão REV',
        description: 'Acione o motor em sentido direto e inverta o giro pelo botão de reversão da IHM.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m8-s1',
            title: 'Partir em Sentido Avanço (FWD)',
            instruction: 'Parta o motor no sentido direto (FWD) e confirme o giro da máquina acima de 5 Hz.',
            isCompleted: (s) => (s.outputFrequency ?? 0) > 5 && s.isForwardDirection === true,
          },
          {
            id: 'l1000-m8-s2',
            title: 'Inverter para Sentido Retorno (REV)',
            instruction: 'Pressione o botão de inversão de sentido da IHM (↻/↺) e confirme o giro anti-horário.',
            isCompleted: (s) => (s.outputFrequency ?? 0) > 5 && s.isForwardDirection === false,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod9',
    moduleNumber: 9,
    title: 'Ajuste de Velocidades: Nominal (P0121) e Nivelamento (P0133)',
    description: 'Parametrização das frequências: Viagem (P0121 = 60.0 Hz) e Nivelamento (P0133 = 3.0 Hz).',
    icon: '📊',
    lessons: [
      {
        id: 'l1000-m9-l1',
        title: 'Lição 1: Escala Padrão de Velocidades de Elevadores',
        description: 'Velocidade nominal de cruzeiro, nivelamento de piso e manutenção de poço.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Tabela de Velocidades',
          content: [
            'P0121: Referência de Frequência da IHM / Viagem Nominal (ajustada em 60.0 Hz).',
            'P0133: Frequência Mínima / Velocidade de Nivelamento (ajustada em 3.0 Hz).',
            'P0122: Frequência de JOG / Manutenção de poço (ajustada em 5.0 Hz).',
          ],
          diagramInfo: 'Parâmetros: P0121 = 60.0 Hz (Viagem) | P0133 = 3.0 Hz (Nivelamento) | P0122 = 5.0 Hz (JOG)',
          keyTakeaway: 'A velocidade de nivelamento deve permitir a aproximação suave até o ponto de corte do sensor de parada.',
        },
      },
      {
        id: 'l1000-m9-l2',
        title: 'Lição 2: Seleção de Velocidades por Entradas Digitais',
        description: 'Combinação binária de relés do CLP acionando os bornes do inversor.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Controle Multivelocidade',
          content: [
            'O CLP seleciona a velocidade desejada fechando combinações digitais nos bornes do L1000.',
            'Permite ao comando acelerar até a velocidade máxima em percursos longos ou limitar a velocidade em viagens de um andar.',
          ],
          keyTakeaway: 'As entradas digitais garantem a transição segura entre regimes de alta e baixa velocidade.',
        },
      },
      {
        id: 'l1000-m9-l3',
        title: 'Lição 3: Relação entre Frequência (Hz) e Velocidade Linear (m/s)',
        description: 'Cálculo de velocidade da cabine em função do diâmetro da polia e suspensão (1:1 / 2:1).',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Cálculo Cinemático de Cabine',
          content: [
            'V (m/s) = (π * Diâmetro da Polia * RPM) / (60 * Relação de Suspensão).',
            'Para uma polia de 450mm a 1750 RPM em suspensão 2:1, 60 Hz corresponde a aproximadamente 1.50 m/s.',
          ],
          keyTakeaway: 'A parametrização correta da frequência máxima garante que o elevador atinja a velocidade contratada no projeto.',
        },
      },
      {
        id: 'l1000-m9-l4',
        title: 'Lição 4: Prática Guiada: Configurar P0121 = 60Hz e P0133 = 3Hz',
        description: 'Ajuste os parâmetros P0121 e P0133 na memória do inversor.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m9-s1',
            title: 'Programar Velocidade Nominal (P0121 = 60.0 Hz)',
            instruction: 'Acesse o parâmetro P0121 e ajuste a referência nominal para 60.0 Hz.',
            isCompleted: (s) => (s.parameters?.P0121?.currentValue ?? 0) === 60.0,
          },
          {
            id: 'l1000-m9-s2',
            title: 'Programar Velocidade de Nivelamento (P0133 = 3.0 Hz)',
            instruction: 'Acesse o parâmetro P0133 e ajuste a velocidade mínima para 3.0 Hz.',
            isCompleted: (s) => (s.parameters?.P0133?.currentValue ?? 0) <= 3.0,
          },
        ],
      },
      {
        id: 'l1000-m9-l5',
        title: 'Lição 5: Prática Guiada: Teste de Viagem e Desaceleração',
        description: 'Acione a aceleração até 60 Hz e execute a parada suave.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m9-s3',
            title: 'Atingir Velocidade Nominal (60 Hz)',
            instruction: 'Parta o motor e aguarde a velocidade atingir 60 Hz no display.',
            isCompleted: (s) => (s.outputFrequency ?? 0) >= 55,
          },
          {
            id: 'l1000-m9-s4',
            title: 'Desacelerar e Parar Suavemente',
            instruction: 'Pressione a tecla STOP e observe a desaceleração controlada até 0 Hz.',
            isCompleted: (s) => (s.outputFrequency ?? 0) < 5,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod10',
    moduleNumber: 10,
    title: 'Curvas em S & Conforto de Viagem (P0100 / P0101 / P0104)',
    description: 'Parametrização das rampas: Aceleração (P0100 = 5.0s), Desaceleração (P0101 = 5.0s) e Curva S (P0104 = 1).',
    icon: '📈',
    lessons: [
      {
        id: 'l1000-m10-l1',
        title: 'Lição 1: O Conceito de Jerk e a Percepção Humana',
        description: 'A física do conforto: taxa de variação da aceleração no corpo dos passageiros.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Dinâmica do Jerk',
          content: [
            'O corpo humano não percebe a velocidade constante, mas é altamente sensível à variação brusca da aceleração (Jerk em m/s³).',
            'P0104 = 1 ativa o arredondamento em curva S nas rampas de aceleração e desaceleração.',
          ],
          diagramInfo: 'Parâmetros: P0100 = 5.0s (Aceleração) | P0101 = 5.0s (Desaceleração) | P0104 = 1 (Curva S)',
          keyTakeaway: 'O Jerk ideal elimina a sensação desconfortável de peso súbito nos joelhos na saída do andar.',
        },
      },
      {
        id: 'l1000-m10-l2',
        title: 'Lição 2: Parametrização da Forma da Rampa (P0104)',
        description: 'Diferença operacional entre rampa linear (P0104 = 0) e curva em S (P0104 = 1).',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Forma de Rampa em Elevadores',
          content: [
            'P0104 = 0: Rampa Linear (gera impactos no início e final da aceleração).',
            'P0104 = 1: Rampa em Curva S com transições suaves e sem vibração.',
          ],
          keyTakeaway: 'A curva em S é obrigatória em qualquer instalação de elevador de passageiros.',
        },
      },
      {
        id: 'l1000-m10-l3',
        title: 'Lição 3: Tempos de Rampa de Aceleração e Desaceleração',
        description: 'Ajuste de P0100 e P0101 em função do tráfego do edifício.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Tempos de Rampa',
          content: [
            'P0100: Tempo de aceleração (ajustado tipicamente entre 3.0s e 5.0s).',
            'P0101: Tempo de desaceleração (ajustado tipicamente entre 3.0s e 5.0s).',
          ],
          keyTakeaway: 'Rampas excessivamente curtas provocam escorregamento dos cabos de aço na polia.',
        },
      },
      {
        id: 'l1000-m10-l4',
        title: 'Lição 4: Prática Guiada: Configurar P0100 = 5.0s e P0101 = 5.0s',
        description: 'Ajuste os parâmetros P0100 e P0101 para 5.0 segundos.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m10-s1',
            title: 'Programar Tempo de Aceleração (P0100 = 5.0s)',
            instruction: 'Acesse o parâmetro P0100 e ajuste o tempo de aceleração para 5.0 segundos.',
            isCompleted: (s) => (s.parameters?.P0100?.currentValue ?? 0) === 5.0,
          },
          {
            id: 'l1000-m10-s2',
            title: 'Programar Tempo de Desaceleração (P0101 = 5.0s)',
            instruction: 'Acesse o parâmetro P0101 e ajuste o tempo de desaceleração para 5.0 segundos.',
            isCompleted: (s) => (s.parameters?.P0101?.currentValue ?? 0) === 5.0,
          },
        ],
      },
      {
        id: 'l1000-m10-s3',
        title: 'Lição 5: Prática Guiada: Validação da Rampa Suave',
        description: 'Execute uma viagem completa e confirme a aceleração progressiva.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m10-s3',
            title: 'Partir e Acompanhar Subida Suave',
            instruction: 'Pressione RUN e confirme que a aceleração ocorre de forma progressiva e estável.',
            isCompleted: (s) => (s.outputFrequency ?? 0) > 30 && Number(s.outputCurrent ?? 0) < 15,
          },
        ],
      },
    ],
  },

  // =========================================================================================
  // BLOCO 3: CONTROLE DE FREIO, ANTI-ROLLBACK & CARGA (MÓDULOS 11 A 15 - FASE GUIADA)
  // =========================================================================================
  {
    id: 'l1000-mod11',
    moduleNumber: 11,
    title: 'Sequência de Controle do Freio Eletromecânico (P0275)',
    description: 'Configuração da saída a relé RL1 para acionamento do freio de segurança (P0275 = 15).',
    icon: '🛑',
    lessons: [
      {
        id: 'l1000-m11-l1',
        title: 'Lição 1: Sequência de Abertura do Freio (Brake Release)',
        description: 'Magnetização do estator em 0 Hz antes da liberação da bobina do freio.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Sequenciamento de Abertura',
          content: [
            '1. O CLP envia a ordem de marcha.',
            '2. O inversor magnetiza o motor em velocidade zero e estabelece o torque nominal.',
            '3. O relé de freio RL1 (P0275 = 15) é energizado, abrindo as sapatas mecânicas.',
            '4. Inicia-se a rampa de aceleração.',
          ],
          diagramInfo: 'Parâmetro: P0275 = 15 (Função Relé RL1 = Sinalização de RUN / Marcha Ativa)',
          keyTakeaway: 'Acelerar antes da abertura mecânica completa causa desgaste prematuro das lonas e queima do motor.',
        },
      },
      {
        id: 'l1000-m11-l2',
        title: 'Lição 2: Sequência de Fechamento do Freio (Brake Apply)',
        description: 'Retenção de torque em 0 Hz até o travamento mecânico total da polia.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Sequenciamento de Parada',
          content: [
            '1. A cabine desacelera na curva em S até atingir 0 Hz no nível do piso.',
            '2. O inversor desliga a bobina do freio, aplicando as molas mecânicas.',
            '3. Mantém o torque elétrico em 0 Hz até o assentamento da sapata.',
            '4. Corta a corrente do motor em repouso.',
          ],
          keyTakeaway: 'Cortar a corrente elétrica antes do assentamento do freio provoca degrau e solavanco na parada.',
        },
      },
      {
        id: 'l1000-m11-l3',
        title: 'Lição 3: Atrasos de Ligação e Desligamento de Relé (P0278 / P0279)',
        description: 'Ajuste de temporização em P0278 e P0279 para sincronismo com o contator de freio.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Temporizadores de Relé',
          content: [
            'P0278: Atraso de ligação do relé RL1 (segundos).',
            'P0279: Atraso de desligamento do relé RL1 (segundos).',
          ],
          keyTakeaway: 'Compensam a inércia mecânica do êmbolo da bobina do freio.',
        },
      },
      {
        id: 'l1000-m11-l4',
        title: 'Lição 4: Prática Guiada: Configurar Relé de Freio (P0275 = 15)',
        description: 'Programe o parâmetro P0275 para 15 na IHM.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m11-s1',
            title: 'Programar Função do Relé RL1 (P0275 = 15)',
            instruction: 'Acesse o parâmetro P0275 e configure para 15 (Sinalização de RUN / Marcha Ativa).',
            isCompleted: (s) => (s.parameters?.P0275?.currentValue ?? 0) === 15,
          },
        ],
      },
      {
        id: 'l1000-m11-l5',
        title: 'Lição 5: Prática Guiada: Parada e Desarme do Relé',
        description: 'Comande a parada do inversor e confirme o retorno ao estado de repouso.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m11-s2',
            title: 'Parar Inversor e Aplicar Freio',
            instruction: 'Pressione STOP e confirme que a máquina retorna ao repouso sem falhas ativas.',
            isCompleted: (s) => s.motorStatus === 'READY' && (s.outputFrequency ?? 0) === 0,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod12',
    moduleNumber: 12,
    title: 'Compensação de Partida Sem Rollback (P0135 / P0136)',
    description: 'Ajuste de Corrente Máxima (P0135 = 10.0A) e Boost de Torque Manual (P0136 = 5.0%).',
    icon: '⚖️',
    lessons: [
      {
        id: 'l1000-m12-l1',
        title: 'Lição 1: A Causa Mecânica do Rollback',
        description: 'Desbalanceamento gravitacional no milissegundo de abertura do freio.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Mecânica do Rollback',
          content: [
            'Quando o freio abre, se o motor não exercer exatamente o torque necessário para sustentar a carga, a cabine sofre um recuo instantâneo para cima ou para baixo.',
            'P0136 aplica um boost de torque manual para garantir fluxo magnético na partida.',
          ],
          diagramInfo: 'Parâmetros: P0135 = 10.0 A (Limite de Corrente) | P0136 = 5.0% (Boost de Torque)',
          keyTakeaway: 'O controle Anti-Rollback atua como uma trava magnética digital no eixo da polia.',
        },
      },
      {
        id: 'l1000-m12-l2',
        title: 'Lição 2: Controle de Posição Zero (Zero-Speed Control)',
        description: 'Uso do encoder para criar ganho de retenção estática.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Malha de Posição Zero',
          content: [
            'O inversor trava a contagem do encoder no instante em que o freio abre.',
            'Qualquer deslocamento de uma fração de milímetro gera uma resposta instantânea de contra-torque.',
          ],
          keyTakeaway: 'Elimina o recuo mesmo com cabine 100% lotada ou 100% vazia.',
        },
      },
      {
        id: 'l1000-m12-l3',
        title: 'Lição 3: Limite de Corrente Máxima de Partida (P0135)',
        description: 'Garantia de capacidade de sobrecarga para sustentação de carga pesada.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Capacidade de Sobrecarga',
          content: [
            'P0135: Limite de corrente de saída do inversor (ajustado em 10.0 A).',
            'Permite ao inversor aplicar 150% do torque nominal durante a abertura do freio.',
          ],
          keyTakeaway: 'Evita desarme por sobrecorrente durante o pico de partida.',
        },
      },
      {
        id: 'l1000-m12-l4',
        title: 'Lição 4: Prática Guiada: Configurar P0135 = 10.0A e P0136 = 5.0%',
        description: 'Ajuste os parâmetros P0135 e P0136 para retenção de torque.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m12-s1',
            title: 'Configurar Limite de Corrente (P0135 = 10.0A)',
            instruction: 'Acesse o parâmetro P0135 e ajuste o valor para 10.0 A.',
            isCompleted: (s) => (s.parameters?.P0135?.currentValue ?? 0) >= 10.0,
          },
          {
            id: 'l1000-m12-s2',
            title: 'Configurar Boost de Torque (P0136 = 5.0%)',
            instruction: 'Acesse o parâmetro P0136 e ajuste para 5.0%.',
            isCompleted: (s) => (s.parameters?.P0136?.currentValue ?? 0) >= 5.0,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod13',
    moduleNumber: 13,
    title: 'Integração com Célula de Carga (P0231 / P0233 / AI1)',
    description: 'Entrada analógica AI1: Sinal 0-10V (P0233 = 0) e Função de Entrada (P0231 = 0).',
    icon: '🏋️',
    lessons: [
      {
        id: 'l1000-m13-l1',
        title: 'Lição 1: Sensores de Carga em Cabos e Longarinas',
        description: 'Transdutores de peso sob o piso e sinais analógicos (0-10V / 4-20mA).',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Transdutores de Pesagem',
          content: [
            'Medem a deformação mecânica dos cabos de tração ou a deflexão sob o piso da cabine.',
            'P0233 = 0 seleciona entrada analógica AI1 em modo de tensão (0 a 10V).',
          ],
          diagramInfo: 'Parâmetros: P0231 = 0 (Função AI1) | P0233 = 0 (Sinal 0-10V) | P0018 = Tensão AI1 (V)',
          keyTakeaway: 'Permite ao inversor saber a carga exata antes de liberar o freio mecânico.',
        },
      },
      {
        id: 'l1000-m13-l2',
        title: 'Lição 2: Alimentação Direta de Torque (Feed-Forward)',
        description: 'Mapeamento da entrada analógica para injeção direta de torque.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Pré-Torque Feed-Forward',
          content: [
            'O sinal da célula de carga é somado diretamente à saída da malha de corrente.',
            'No momento da abertura do freio, o torque elétrico já é idêntico ao peso resultante da cabine.',
          ],
          keyTakeaway: 'Garante a melhor qualidade de partida possível em edifícios de alto padrão.',
        },
      },
      {
        id: 'l1000-m13-l3',
        title: 'Lição 3: Calibração de Zero e Ganho de Carga (P0232 / P0234)',
        description: 'Ganho da entrada analógica (P0232 = 1.00) e Offset (P0234 = 0.0%).',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Calibração Analógica',
          content: [
            'P0232: Ganho da entrada AI1 (ajustado em 1.00).',
            'P0234: Offset da entrada AI1 (ajustado em 0.0%).',
          ],
          keyTakeaway: 'Calibração incorreta causa solavanco para cima quando a cabine estiver vazia.',
        },
      },
      {
        id: 'l1000-m13-l4',
        title: 'Lição 4: Prática Guiada: Ajustar Potenciômetro AI1 > 3.0V',
        description: 'Mova o controle deslizante analógico AI1 acima de 3.0V para simular carga.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m13-s1',
            title: 'Ajustar Potenciômetro Analógico AI1',
            instruction: 'Ajuste a entrada analógica AI1 acima de 3.0V para simular 30% a 100% de carga na cabine.',
            isCompleted: (s) => (s.ai1Voltage ?? 0) >= 3.0,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod14',
    moduleNumber: 14,
    title: 'Ajuste de Ganhos da Malha de Velocidade (P0138 / P0137)',
    description: 'Compensação de escorregamento (P0138 = 1.0%) e Boost automático (P0137 = 0.0%).',
    icon: '🎛️',
    lessons: [
      {
        id: 'l1000-m14-l1',
        title: 'Lição 1: O Regulador de Velocidade e Escorregamento',
        description: 'Como o inversor compensa variações dinâmicas de carga durante a viagem.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Malha de Controle de Velocidade',
          content: [
            'P0138 ajusta a compensação de escorregamento do motor em 1.0%.',
            'Mantém a rotação estável independentemente do número de passageiros.',
          ],
          diagramInfo: 'Parâmetros: P0138 = 1.0% (Compensação Escorregamento) | P0137 = 0.0% (Boost Automático)',
          keyTakeaway: 'A resposta da malha de velocidade define a rigidez e a estabilidade de movimento da cabine.',
        },
      },
      {
        id: 'l1000-m14-l2',
        title: 'Lição 2: Ganhos Proporcionais e Integrais',
        description: 'Estabilização de partida, desaceleração e nivelamento.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Ganhos da Malha',
          content: [
            'Ganhos proporcionais mais altos garantem alinhamento milimétrico ao piso.',
            'Ganhos excessivos provocam vibração estrutural nos cabos de tração.',
          ],
          keyTakeaway: 'O equilíbrio de ganhos elimina ressonância acústica na cabine.',
        },
      },
      {
        id: 'l1000-m14-l3',
        title: 'Lição 3: Filtro da Realimentação de Velocidade',
        description: 'Eliminação de ruídos de alta frequência no sinal de encoder.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Filtro de Velocidade',
          content: [
            'Filtra oscilações de alta frequência antes do cálculo do vetor de torque.',
            'Assegura funcionamento silencioso em regime de cruzeiro.',
          ],
          keyTakeaway: 'Filtros com tempo longo demais causam atraso na resposta de nivelamento.',
        },
      },
      {
        id: 'l1000-m14-l4',
        title: 'Lição 4: Prática Guiada: Teste de Cruzeiro Estabilizado em 60 Hz',
        description: 'Parta o motor e confirme a estabilização da malha de velocidade em 60 Hz.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m14-s1',
            title: 'Atingir Velocidade de Cruzeiro Estabilizada',
            instruction: 'Parta o motor e mantenha a frequência de saída estável em 60 Hz.',
            isCompleted: (s) => (s.outputFrequency ?? 0) >= 58,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod15',
    moduleNumber: 15,
    title: 'Frenagem Dinâmica & Monitoramento do Barramento CC (P0004 / P0140)',
    description: 'Controle de frenagem por rampa (P0140 = 0) e monitoramento de tensão no barramento (P0004).',
    icon: '🔥',
    lessons: [
      {
        id: 'l1000-m15-l1',
        title: 'Lição 1: Comportamento Regenerativo em Elevadores',
        description: 'Como a energia potencial gravitacional eleva a tensão no barramento CC.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Regeneração de Energia',
          content: [
            'Quando a cabine desce mais pesada que o contrapeso, a gravidade aciona a máquina de tração.',
            'O inversor retifica a tensão gerada e eleva o barramento CC (P0004) acima de 700V/800V.',
          ],
          diagramInfo: 'Parâmetros: P0140 = 0 (Tipo Frenagem por Rampa) | P0004 = Tensão Barramento CC (V)',
          keyTakeaway: 'O transistor chopper desvia a corrente regenerativa para o resistor de frenagem.',
        },
      },
      {
        id: 'l1000-m15-l2',
        title: 'Lição 2: Tipo de Frenagem na Parada (P0140 = 0)',
        description: 'Seleção de parada por rampa (P0140 = 0) vs. inércia (P0140 = 1).',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Modo de Frenagem',
          content: [
            'P0140 = 0: Parada por Rampa controlada (mandatório em elevadores).',
            'P0140 = 1: Parada por Inércia (utilizado apenas em bombas/ventiladores).',
          ],
          keyTakeaway: 'Em elevadores, a parada deve ser sempre controlada por rampa.',
        },
      },
      {
        id: 'l1000-m15-l3',
        title: 'Lição 3: Proteção Térmica do Resistor por Termostato (Klixon)',
        description: 'Uso de contato bimetálico para corte de segurança em caso de superaquecimento.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Proteção Térmica de Resistor',
          content: [
            'O contato térmico NF do resistor deve estar em série com a linha de segurança ou entrada de falha externa.',
            'Se o transistor travar em curto, o resistor aquece até abrir o circuito antes de entrar em combustão.',
          ],
          keyTakeaway: 'Protege a casa de máquinas contra incêndio em caso de falha do módulo de potência.',
        },
      },
      {
        id: 'l1000-m15-l4',
        title: 'Lição 4: Prática Guiada: Monitorar P0004 e Configurar P0140 = 0',
        description: 'Consulte P0004 e confirme que P0140 está em 0 na memória.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m15-s1',
            title: 'Verificar Tensão no Barramento (P0004)',
            instruction: 'Acesse o parâmetro P0004 e confirme que a tensão CC está acima de 300V.',
            isCompleted: (s) => (s.parameters?.P0004?.currentValue ?? 310) >= 300,
          },
        ],
      },
    ],
  },

  // =========================================================================================
  // BLOCO 4: AUTOMAÇÃO COM CLP DE MANOBRA & PORTAS (MÓDULOS 16 A 20 - FASE GUIADA)
  // =========================================================================================
  {
    id: 'l1000-mod16',
    moduleNumber: 16,
    title: 'Integração do CLP de Manobra (P0263 / P0264 / P0220)',
    description: 'Configuração dos bornes: DI1 (P0263 = 1: Gira/Para), DI2 (P0264 = 1: Sentido) e Modo Remoto (P0220 = 2).',
    icon: '🔌',
    lessons: [
      {
        id: 'l1000-m16-l1',
        title: 'Lição 1: Arquitetura do Painel de Comando com CLP',
        description: 'Divisão de tarefas: CLP gerencia despacho de chamadas; L1000 gerencia tração.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Integração CLP x Inversor',
          content: [
            'O CLP recebe chamadas de cabine e pavimento, verifica trincos de porta e decide o sentido de viagem.',
            'P0263 = 1 configura a entrada digital DI1 como comando Gira/Para.',
            'P0264 = 1 configura a entrada digital DI2 como seleção de Sentido de Giro.',
          ],
          diagramInfo: 'Parâmetros: P0263 = 1 (Função DI1) | P0264 = 1 (Função DI2) | P0220 = 2 (Seleção Local/Remoto)',
          keyTakeaway: 'O inversor executa a viagem com a velocidade e rampa solicitadas pelo comando do CLP.',
        },
      },
      {
        id: 'l1000-m16-l2',
        title: 'Lição 2: Comutação entre Modo Local e Remoto (P0220)',
        description: 'Comutação de fonte de comando da IHM para os bornes do painel.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Modo Local vs. Remoto',
          content: [
            'Modo Local (LOC): Comandos de RUN/STOP pelo teclado da IHM.',
            'Modo Remoto (REM): Comandos pelos bornes DI1-DI4 interligados ao CLP.',
          ],
          keyTakeaway: 'Pressione o botão LOC/REM para habilitar os bornes remotos.',
        },
      },
      {
        id: 'l1000-m16-l3',
        title: 'Lição 3: Saídas Digitais para Realimentação do CLP',
        description: 'Sinalização de inversor pronto, velocidade zero e falha.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Feedback do Inversor para o CLP',
          content: [
            'Relé de Falha: Informa ao CLP para cancelar chamadas.',
            'Saída de Velocidade Zero: Informa ao CLP que a cabine parou e as portas podem ser abertas.',
          ],
          keyTakeaway: 'O CLP monitora essas saídas para coordenar a abertura e fechamento de portas.',
        },
      },
      {
        id: 'l1000-m16-l4',
        title: 'Lição 4: Prática Guiada: Comutar para REM e Acionar DI1',
        description: 'Comute para o modo REM e acione a marcha pelo borne digital DI1.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m16-s1',
            title: 'Comutar para Modo Remoto (REM)',
            instruction: 'Pressione o botão LOC/REM na IHM para comutar o controle para modo Remoto.',
            isCompleted: (s) => s.controlSource === 'REM',
          },
          {
            id: 'l1000-m16-s2',
            title: 'Acionar Marcha pelo Borne DI1',
            instruction: 'Ative a chave digital DI1 (S1) no quadro de comando para iniciar a marcha remota.',
            isCompleted: (s) => Boolean(s.digitalInputs?.di1) || (s.outputFrequency ?? 0) > 0,
          },
        ],
      },
      {
        id: 'l1000-m16-l5',
        title: 'Lição 5: Prática Guiada: Reversão de Sentido via Borne DI2',
        description: 'Acione a entrada digital DI2 para inverter o sentido de viagem.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m16-s3',
            title: 'Ativar Entrada DI2 (Sentido de Giro)',
            instruction: 'Ligue a chave digital DI2 (S2) e verifique a reversão da máquina 3D para rotação anti-horária.',
            isCompleted: (s) => Boolean(s.digitalInputs?.di2) && s.isForwardDirection === false,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod17',
    moduleNumber: 17,
    title: 'Linha de Segurança & Monitoramento EDM (P0276 / P0277)',
    description: 'Configuração do relé de falha RL2 (P0276 = 14) e monitoramento de contatores guiados.',
    icon: '🛡️',
    lessons: [
      {
        id: 'l1000-m17-l1',
        title: 'Lição 1: O Circuito da Linha de Segurança do Elevador',
        description: 'Contatos de emergência, chaves de limite final, amortecedores e trincos de porta.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Circuito de Segurança em Série',
          content: [
            'Todos os dispositivos mecânicos de segurança são ligados em série.',
            'P0276 = 14 configura o relé RL2 para atuar como sinalizador de Falha / Alarme.',
          ],
          diagramInfo: 'Parâmetros: P0276 = 14 (Função Relé RL2 = Alarme/Falha Ativa)',
          keyTakeaway: 'A linha de segurança tem prioridade sobre qualquer comando eletrônico do inversor.',
        },
      },
      {
        id: 'l1000-m17-l2',
        title: 'Lição 2: Monitoramento de Contatos Guiados (EDM)',
        description: 'Validação do estado dos contatores antes de permitir nova viagem.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'External Device Monitoring (EDM)',
          content: [
            'Contatos auxiliares NF guiados dos contatores de potência são conectados à entrada de segurança do L1000.',
            'Se um contator colar, o inversor bloqueia a próxima partida e gera alarme.',
          ],
          keyTakeaway: 'Evita partidas com contatores danificados.',
        },
      },
      {
        id: 'l1000-m17-l3',
        title: 'Lição 3: Parada de Emergência vs. Parada Normal',
        description: 'Corte por inércia x desaceleração controlada na curva Jerk.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Tipos de Parada',
          content: [
            'Parada Normal: Desacelera na curva em S, atinge 0 Hz e aplica o freio suavemente.',
            'Parada de Emergência: Freio mecânico atua imediatamente com a cabine em movimento.',
          ],
          keyTakeaway: 'Paradas de emergência frequentes desgastam as lonas de freio e os cabos de tração.',
        },
      },
      {
        id: 'l1000-m17-l4',
        title: 'Lição 4: Prática Guiada: Configurar P0276 = 14 e Validar Sistema',
        description: 'Programe P0276 = 14 e confira o status de prontidão do sistema.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m17-s1',
            title: 'Configurar Relé RL2 para Falha (P0276 = 14)',
            instruction: 'Acesse o parâmetro P0276 e configure para 14 (Sinalização de Falha).',
            isCompleted: (s) => (s.parameters?.P0276?.currentValue ?? 0) === 14,
          },
          {
            id: 'l1000-m17-s2',
            title: 'Confirmar Sistema Pronto (READY)',
            instruction: 'Certifique-se de que a linha de segurança está fechada e o inversor está pronto.',
            isCompleted: (s) => s.activeFault === null && s.motorStatus !== 'FAULT',
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod18',
    moduleNumber: 18,
    title: 'Comunicação Serial Modbus RTU (P0308 / P0310 / P0311)',
    description: 'Endereço de rede (P0308 = 1), Baud Rate (P0310 = 0: 9600) e Paridade (P0311 = 1: Par).',
    icon: '📡',
    lessons: [
      {
        id: 'l1000-m18-l1',
        title: 'Lição 1: O Padrão de Comunicação Serial em Elevadores',
        description: 'Rede serial de alta velocidade padronizada para supervisão predial.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Rede Serial RS-485',
          content: [
            'P0308: Endereço Modbus do inversor (1 a 247).',
            'P0310: Taxa de comunicação Baud Rate (0 = 9600 bps, 1 = 19200 bps).',
            'P0311: Paridade (1 = Par com 1 Stop Bit).',
          ],
          diagramInfo: 'Parâmetros: P0308 = 1 (Endereço) | P0310 = 0 (9600 bps) | P0311 = 1 (Paridade Par)',
          keyTakeaway: 'Reduz o tempo de instalação do painel de comando em até 60%.',
        },
      },
      {
        id: 'l1000-m18-l2',
        title: 'Lição 2: Mapeamento de Registradores Modbus RTU (RS-485)',
        description: 'Leitura de grandezas elétricas e alarmes pelo supervisório predial.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Comunicação Modbus no L1000',
          content: [
            'P0316: Monitor de telegramas Modbus válidos recebidos.',
            'Permite ler velocidade, corrente e temperatura diretamente pela rede RS-485.',
          ],
          keyTakeaway: 'Permite monitorar remotamente o elevador a partir da portaria ou central de manutenção.',
        },
      },
      {
        id: 'l1000-m18-l3',
        title: 'Lição 3: Tratamento de Timeout de Comunicação (P0313 / P0314)',
        description: 'Segurança contra perda de sinal serial com parada controlada da cabine.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Proteção de Timeout Serial',
          content: [
            'P0314: Tempo limite de timeout serial (ajustado em 1.0s).',
            'Se a comunicação cessar, o inversor executa a parada segura no andar mais próximo.',
          ],
          keyTakeaway: 'Evita que a cabine continue viajando indefinidamente sem supervisão do CLP.',
        },
      },
      {
        id: 'l1000-m18-l4',
        title: 'Lição 4: Prática Guiada: Configurar P0308 = 1 na IHM',
        description: 'Configure o endereço do inversor na rede Modbus (P0308 = 1).',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m18-s1',
            title: 'Configurar Endereço Modbus (P0308 = 1)',
            instruction: 'Acesse o parâmetro P0308 e configure o endereço de rede para 1.',
            isCompleted: (s) => (s.parameters?.P0308?.currentValue ?? 0) === 1,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod19',
    moduleNumber: 19,
    title: 'Nivelamento Direto no Pavimento (P0133 / P0101)',
    description: 'Cálculo de desaceleração direta sem tempo rastejante em baixa velocidade (P0133 = 3.0 Hz).',
    icon: '🎯',
    lessons: [
      {
        id: 'l1000-m19-l1',
        title: 'Lição 1: O Conceito de Direct Landing (Nivelamento Direto)',
        description: 'Comparativo entre o método tradicional com rastejo vs. desaceleração contínua.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Nivelamento Direto',
          content: [
            'Método Tradicional: O elevador desacelera e rasteja em baixa velocidade por 2 a 5 segundos antes de parar.',
            'Método Direto: O inversor calcula a rampa de forma que a velocidade zero coincida exatamente com a soleira do andar.',
          ],
          diagramInfo: 'Parâmetros: P0133 = 3.0 Hz (Velocidade Nivelamento) | P0101 = 5.0s (Tempo Desaceleração)',
          keyTakeaway: 'Elimina o tempo morto e aumenta o conforto dos passageiros.',
        },
      },
      {
        id: 'l1000-m19-l2',
        title: 'Lição 2: Cálculo de Distância de Desaceleração',
        description: 'Equação de espaço de frenagem em função da velocidade e aceleração.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Cálculo do Ponto de Corte',
          content: [
            'Distância = (V² / 2a) + Distância de Jerk.',
            'O sensor de poço informa a posição exata para início da curva de parada.',
          ],
          keyTakeaway: 'A precisão do cálculo garante parada perfeita independentemente da carga da cabine.',
        },
      },
      {
        id: 'l1000-m19-l3',
        title: 'Lição 3: Tolerância de Soleira e Conforto de Parada',
        description: 'Compensação de dilatação de cabos e tolerância milimétrica (±3mm).',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Tolerância de Soleira',
          content: [
            'A norma exige desnível máximo de ±5mm para evitar tropeços de passageiros.',
            'O inversor ajusta o ganho de posição final para assegurar o alinhamento ideal.',
          ],
          keyTakeaway: 'Degrau na soleira é uma das maiores causas de chamados e acidentes em edifícios.',
        },
      },
      {
        id: 'l1000-m19-l4',
        title: 'Lição 4: Prática Guiada: Executar Parada Nivelada a 0.0 Hz',
        description: 'Execute a desaceleração completa até 0.0 Hz.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m19-s1',
            title: 'Executar Desaceleração Completa',
            instruction: 'Comande a parada e aguarde o retorno da frequência a 0.0 Hz no nível do piso.',
            isCompleted: (s) => (s.outputFrequency ?? 0) === 0,
          },
        ],
      },
    ],
  },
  {
    id: 'l1000-mod20',
    moduleNumber: 20,
    title: 'Controle de Operador de Portas de Cabine (P0012 / P0013)',
    description: 'Monitoramento do status de entradas digitais (P0012) e saídas a relé de porta (P0013).',
    icon: '🚪',
    lessons: [
      {
        id: 'l1000-m20-l1',
        title: 'Lição 1: O Inversor de Porta de Cabine (VVVF)',
        description: 'Curvas de abertura e fechamento suave com controle de força de impacto.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Operador de Porta VVVF',
          content: [
            'Controla um motor independente montado no topo da cabine.',
            'P0012 monitora o status digital das entradas de fim de curso de porta aberta e fechada.',
          ],
          diagramInfo: 'Parâmetros: P0012 = Status Entradas DI1-DI4 | P0013 = Status Saídas Relé',
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
        description: 'Identificação de contatos oxidados e desregulagem mecânica de trincos.',
        type: 'THEORY',
        durationMin: 15,
        theoryData: {
          title: 'Falhas de Trinco de Porta',
          content: [
            'Contatos oxidados ou poeira nos trincos impedem o fechamento elétrico da linha de segurança.',
            'O elevador não parte mesmo com a porta mecanicamente fechada.',
          ],
          keyTakeaway: 'Manutenção e limpeza periódica dos contatos de porta evitam mais de 70% dos chamados técnicos.',
        },
      },
      {
        id: 'l1000-m20-l4',
        title: 'Lição 4: Prática Guiada: Validar Prontidão do Inversor (P0006)',
        description: 'Consulte o parâmetro P0006 para confirmar o estado do inversor.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m20-s1',
            title: 'Verificar Inversor Habilitado (READY)',
            instruction: 'Confirme que o sistema está em estado pronto (READY) para iniciar viagem.',
            isCompleted: (s) => s.motorStatus === 'READY' || s.motorStatus === 'RUNNING',
          },
        ],
      },
    ],
  },

  // =========================================================================================
  // BLOCO 5: OPERAÇÕES ESPECIAIS & RESGATE (MÓDULOS 21 A 25 - FASE DESAFIO PROFISSIONAL)
  // =========================================================================================
  {
    id: 'l1000-mod21',
    moduleNumber: 21,
    title: 'Resgate de Emergência por Baterias (Desafio)',
    description: 'Resolução prática de resgate sem indicação direta de parâmetros.',
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
        description: 'Configure o inversor para mover a cabine em velocidade ultra lenta de resgate por baterias.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m21-s1',
            title: 'Configurar a Velocidade Mínima de Manobra',
            instruction: 'Acesse o menu de parâmetros de limites de frequência e programe a velocidade mínima segura (abaixo de 5.0 Hz).',
            isCompleted: (s) => (s.parameters?.P0133?.currentValue ?? 0) <= 5.0,
          },
          {
            id: 'l1000-m21-s2',
            title: 'Testar Movimento de Resgate',
            instruction: 'Ligue o inversor e verifique se a velocidade se mantém estável entre 5 e 15 Hz em regime de emergência.',
            isCompleted: (s) => (s.outputFrequency ?? 0) >= 5 && (s.outputFrequency ?? 0) <= 15,
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
        description: 'Programe o inversor para operar o motor estritamente entre 10 e 25 Hz durante o teste de poço.',
        type: 'PRACTICE',
        durationMin: 20,
        steps: [
          {
            id: 'l1000-m22-s1',
            title: 'Limitar Frequência de Trabalho em Inspeção',
            instruction: 'Parta o motor e mantenha a frequência de trabalho estabilizada entre 10 e 25 Hz.',
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
            instruction: 'Parta o motor e alcance a velocidade máxima acima de 55 Hz em regime contínuo.',
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
            instruction: 'Pressione STOP e valide a desaceleração do motor até 0 Hz.',
            isCompleted: (s) => (s.outputFrequency ?? 0) === 0 && s.motorStatus === 'READY',
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
            instruction: 'Localize no grupo de limites a corrente máxima permitida para o acionamento e configure para 10.0 A.',
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
            isCompleted: (s) => s.activeFault === null && s.motorStatus === 'READY',
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
            instruction: 'Acesse o parâmetro P0050 de monitor de falhas e confirme o registro na memória.',
            isCompleted: (s) => (s.parameters?.P0050?.currentValue ?? 0) >= 0 && (s.ihmMode === 'PARAM_SELECT' || s.ihmMode === 'PARAM_EDIT'),
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
            instruction: 'Acesse o parâmetro de comutação PWM (P0139) e configure para 5.0 kHz.',
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
            instruction: 'Acione a máquina de tração acima de 20 Hz e confirme que o acionamento opera em regime contínuo.',
            isCompleted: (s) => (s.outputFrequency ?? 0) >= 20 && s.motorStatus === 'RUNNING',
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
            instruction: 'Acesse o parâmetro P0100 e certifique-se de que a rampa está ajustada para 5.0 segundos.',
            isCompleted: (s) => (s.parameters?.P0100?.currentValue ?? 0) === 5.0,
          },
          {
            id: 'l1000-m30-s2',
            title: 'Executar Ciclo Operacional Pleno',
            instruction: 'Parta o motor até a frequência nominal de 60 Hz e conclua com desaceleração suave.',
            isCompleted: (s) => (s.outputFrequency ?? 0) >= 55,
          },
        ],
      },
    ],
  },
];