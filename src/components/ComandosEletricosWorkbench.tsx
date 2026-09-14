import { buildControlCircuit } from '../utils/controlCircuit';
import { createVoltageModel } from '../utils/voltageModel';
import { motorConnection, motorPhaseDirection } from '../utils/motorConnection';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useInverter } from '../context/InverterContext';
import { MotorVisualizer } from './MotorVisualizer';
import {
  RealisticContactor,
  RealisticThermalRelay,
  RealisticMiniBreaker,
  RealisticMotorBreaker,
  RealisticPushButton,
  RealisticEmergencyButton,
  RealisticSelectorSwitch,
  RealisticPilotLight,
  RealisticPhaseFailureRelay,
  RealisticSafetyRelay,
  RealisticLotoSwitch,
  RealisticAuxBlock,
  RealisticTransformer,
  RealisticTerminalBlock,
  RealisticBusbar,
  RealisticGrid3P,
  RealisticGrid1P,
  RealisticInterlockSwitch,
  RealisticMotor3Phase,
  RealisticMotorSingle,
  RealisticCapacitor,
  RealisticBrakingResistor,
} from './RealisticComponents';

export type ComponentCategory =
  | 'REDE_TRIFASICA'
  | 'REDE_MONOFASICA'
  | 'BARRAMENTO_PENTE'
  | 'REGUA_BORNES'
  | 'TRANSFORMADOR_ISOLADOR'
  | 'SECCIONADORA_LOTO'
  | 'RELE_SEGURANCA_NR12'
  | 'CHAVE_INTERTRAVAMENTO_NR12'
  | 'CHAVE_SELETORA_3POS'
  | 'DISJUNTOR_MONOPOLAR'
  | 'DISJUNTOR_MOTOR'
  | 'DISJUNTOR_BIPOLAR'
  | 'CONTATOR_TRIPOLAR'
  | 'BLOCO_AUXILIAR'
  | 'RELE_TERMICO'
  | 'RELE_FALTA_FASE'
  | 'TEMPORIZADOR_TON'
  | 'BOTOEIRA_PULSO_NA'
  | 'BOTOEIRA_COGUMELO_NF'
  | 'SINALEIRO_LED'
  | 'MOTOR_TRIFASICO_6P'
  | 'MOTOR_MONOFASICO_CAPACITOR'
  | 'CAPACITOR_ELETROLITICO'
  | 'RESISTOR_FREINAGEM';

export interface TerminalPole {
  id: string;
  name: string;
  relX: number;
  relY: number;
  type: 'FORCA' | 'COMANDO' | 'TERRA';
}

export type LampColor = 'VERDE' | 'VERMELHO' | 'AMARELO' | 'AZUL' | 'BRANCO';

export interface PlacedComponent {
  id: string;
  category: ComponentCategory;
  tag: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  state: boolean;
  tripped?: boolean;
  currentRating?: number;
  timerStar?: boolean;
  timerDelta?: boolean;
  rotationDirection?: 'FWD' | 'REV';
  lampColor?: LampColor;
  selectorPosition?: 'MAN' | '0' | 'AUT';
  terminals: TerminalPole[];
}

export interface Point2D {
  x: number;
  y: number;
}

export type CableType =
  | 'FORCA_R'
  | 'FORCA_S'
  | 'FORCA_T'
  | 'COMANDO_FASE'
  | 'COMANDO_NEUTRO'
  | 'TERRA_PE'
  | 'JUMPER_FECHAMENTO'
  | 'CABO_PRETO'
  | 'CABO_BRANCO'
  | 'CABO_CINZA'
  | 'CABO_ROXO'
  | 'CABO_LARANJA';

export interface CableConnection {
  id: string;
  fromComponentId: string;
  fromTerminalId: string;
  toComponentId: string;
  toTerminalId: string;
  cableType: CableType;
  waypoints?: Point2D[];
}

export type MultimeterScale = 'V_AC' | 'V_DC' | 'CURRENT_A' | 'CONTINUITY' | 'RESISTANCE_OHM' | 'DIODE';

export interface MeterProbePosition {
  compId: string;
  termId: string;
}

export interface TrainingLesson {
  id: string;
  title: string;
  module: string;
  description: string;
  theory: string[];
  steps: string[];
  schematicTips: string;
}

export const CABLE_COLORS: Record<CableType, string> = {
  FORCA_R: '#ef4444',
  FORCA_S: '#f97316',
  FORCA_T: '#64748b',
  COMANDO_FASE: '#ec4899',
  COMANDO_NEUTRO: '#38bdf8',
  TERRA_PE: '#10b981',
  JUMPER_FECHAMENTO: '#eab308',
  CABO_PRETO: '#111827',
  CABO_BRANCO: '#f8fafc',
  CABO_CINZA: '#64748b',
  CABO_ROXO: '#a855f7',
  CABO_LARANJA: '#ea580c',
};

const LAMP_COLOR_CONFIG: Record<LampColor, { on: string; off: string; glow: string; label: string }> = {
  VERDE: { on: '#22c55e', off: '#14532d', glow: '0 0 24px #22c55e, inset 0 0 8px #fff', label: 'Verde' },
  VERMELHO: { on: '#ef4444', off: '#7f1d1d', glow: '0 0 24px #ef4444, inset 0 0 8px #fff', label: 'Vermelho' },
  AMARELO: { on: '#eab308', off: '#713f12', glow: '0 0 24px #eab308, inset 0 0 8px #fff', label: 'Amarelo' },
  AZUL: { on: '#38bdf8', off: '#0c4a6e', glow: '0 0 24px #38bdf8, inset 0 0 8px #fff', label: 'Azul' },
  BRANCO: { on: '#f8fafc', off: '#475569', glow: '0 0 26px #ffffff, inset 0 0 8px #fff', label: 'Branco' },
};

const AMPERAGE_OPTIONS = [2, 4, 6, 10, 16, 20, 25, 32, 40, 50, 63];

interface CatalogItem {
  category: ComponentCategory;
  title: string;
  subtitle: string;
  icon: string;
  group: 'ALIMENTACAO' | 'PROTECAO' | 'COMANDO' | 'SEGURANCA' | 'CARGAS';
}

const CATALOG_ITEMS: CatalogItem[] = [
  { category: 'DISJUNTOR_MONOPOLAR', title: 'Disjuntor Monopolar (WEG MDW 1P)', subtitle: 'Disjuntor DIN 1P, curva C e corrente nominal selecionável', icon: '⚡', group: 'PROTECAO' },
  { category: 'DISJUNTOR_BIPOLAR', title: 'Disjuntor Bipolar (WEG MDW 2P)', subtitle: 'Proteção bipolar com amperagem ajustável', icon: '⚡', group: 'PROTECAO' },
  { category: 'DISJUNTOR_MOTOR', title: 'Disjuntor-Motor MPW', subtitle: 'Proteção termomagnética para motores', icon: '🎛️', group: 'PROTECAO' },
  { category: 'RELE_TERMICO', title: 'Relé Térmico de Sobrecarga RW', subtitle: 'Proteção com contatos 95-96 e 97-98', icon: '🔥', group: 'PROTECAO' },
  { category: 'RELE_FALTA_FASE', title: 'Relé Falta de Fase RPF', subtitle: 'Monitor de assimetria 11-12-14', icon: '📡', group: 'PROTECAO' },
  { category: 'CHAVE_SELETORA_3POS', title: 'Chave Seletora 3 Posições (MAN - 0 - AUT)', subtitle: 'Comutação de modo com contatos 13-14 e 23-24', icon: '🔘', group: 'COMANDO' },
  { category: 'CONTATOR_TRIPOLAR', title: 'Contator de Potência WEG CWM', subtitle: 'Chave eletromagnética tripolar para motores', icon: '🧲', group: 'COMANDO' },
  { category: 'BLOCO_AUXILIAR', title: 'Bloco de Contatos Auxiliares Frontal', subtitle: 'Contatos extras 13-14 (NA) e 21-22 (NF) por TAG', icon: '📑', group: 'COMANDO' },
  { category: 'REGUA_BORNES', title: 'Régua de Bornes de Passagem (DIN)', subtitle: 'Organização de cabos e sinais', icon: '🧱', group: 'ALIMENTACAO' },
  { category: 'BARRAMENTO_PENTE', title: 'Barramento Pente de Distribuição', subtitle: 'Distribuição trifásica de fases', icon: '📶', group: 'ALIMENTACAO' },
  { category: 'REDE_TRIFASICA', title: 'Rede Trifásica 380V (R, S, T, N, PE)', subtitle: 'Alimentação principal de força', icon: '⚡', group: 'ALIMENTACAO' },
  { category: 'REDE_MONOFASICA', title: 'Rede Monofásica 220V (F, N, PE)', subtitle: 'Fonte monofásica auxiliar', icon: '🔌', group: 'ALIMENTACAO' },
  { category: 'SECCIONADORA_LOTO', title: 'Chave Seccionadora LOTO (NR-10)', subtitle: 'Bloqueio de segurança com cadeado', icon: '🛑', group: 'SEGURANCA' },
  { category: 'TRANSFORMADOR_ISOLADOR', title: 'Transformador Isolador 220V/24V CA', subtitle: 'Secundário CA; isolação e proteção dependem do projeto', icon: '⚡', group: 'SEGURANCA' },
  { category: 'RELE_SEGURANCA_NR12', title: 'Relé de Segurança (representação didática)', subtitle: 'Contatos ilustrativos; supervisão de segurança não simulada', icon: '🛡️', group: 'SEGURANCA' },
  { category: 'CHAVE_INTERTRAVAMENTO_NR12', title: 'Chave Intertravamento (NR-12)', subtitle: 'Monitoramento de portas e proteções', icon: '🔒', group: 'SEGURANCA' },
  { category: 'BOTOEIRA_PULSO_NA', title: 'Botoeira Pulsadora Liga (NA)', subtitle: 'Botão verde (3-4 NO)', icon: '🟢', group: 'COMANDO' },
  { category: 'BOTOEIRA_COGUMELO_NF', title: 'Botoeira de Emergência Cogumelo (NF)', subtitle: 'Botão de parada com trava', icon: '🔴', group: 'COMANDO' },
  { category: 'SINALEIRO_LED', title: 'Sinalizador Luminoso LED (Cores Trocáveis)', subtitle: 'Lâmpada com opção de alterar a cor', icon: '💡', group: 'COMANDO' },
  { category: 'MOTOR_TRIFASICO_6P', title: 'Motor Trifásico W22 (6 Pontas)', subtitle: 'Fechamento Estrela / Triângulo', icon: '⚙️', group: 'CARGAS' },
  { category: 'MOTOR_MONOFASICO_CAPACITOR', title: 'Motor Monofásico com Capacitor', subtitle: 'Motor monofásico com bornes Fase, Neutro e Capacitor', icon: '🌀', group: 'CARGAS' },
  { category: 'CAPACITOR_ELETROLITICO', title: 'Capacitor de Partida', subtitle: 'Capacitor de partida não substitui capacitor permanente ou de correção', icon: '🔋', group: 'PROTECAO' },
  { category: 'RESISTOR_FREINAGEM', title: 'Resistor de Frenagem (Dynamic Braking)', subtitle: 'Dissipação de energia regenerativa de inversor', icon: '♨️', group: 'PROTECAO' },
];

const COMANDOS_LESSONS: TrainingLesson[] = [
  {
    id: 'aula_01_componentes',
    title: '1. Introdução aos Componentes de Força e Comando',
    module: 'Módulo 1: Fundamentos',
    description: 'Compreensão funcional da anatomia de contatores, relés térmicos, botoeiras e disjuntores.',
    theory: [
      'Em comandos elétricos, o circuito é dividido em circuito de força (potência) e circuito de comando.',
      'O contator (K) utiliza uma bobina eletromagnética (A1-A2) para manobrar contatos principais de alta capacidade (1L1-2T1, 3L2-4T2, 5L3-6T3) e auxiliares de sinalização (13-14 NA, 21-22 NF).',
      'O relé térmico (F) protege o enrolamento do estator contra sobrecargas contínuas usando tiras bimetálicas, desarmando o contato 95-96 NF na linha de comando.',
      'As botoeiras pulsadoras verdes são normalmente abertas (NA 3-4) e os botões vermelhos de desligamento ou emergência são normalmente fechados (NF 1-2 ou 11-12).'
    ],
    steps: [
      'Insira no painel: 1 Contator CWM25 (K1), 1 Relé Térmico (F1) e 1 Botoeira Verde NA (S1).',
      'Identifique visualmente os bornes de bobina A1 e A2 e os contatos auxiliares 13-14 NA do contator.',
      'Desconecte a alimentação e confirme a ausência de tensão antes de testar a continuidade dos contatos NA e NF.'
    ],
    schematicTips: 'Circuito de Comando: Fase -> Proteção 1P -> 95-96 do Relé Térmico -> Botoeiras -> Bobina A1-A2 -> Neutro.'
  },
  {
    id: 'aula_02_nr10_nr12',
    title: '2. Segurança em Painéis: NR-10 e NR-12',
    module: 'Módulo 1: Fundamentos',
    description: 'Estudo de seccionamento, bloqueio, extra-baixa tensão e funções de segurança. A bancada não valida categoria ou PL.',
    theory: [
      'Desenergizar exige procedimento: seccionar, impedir reenergização, constatar ausência de tensão, aplicar aterramento temporário/equipotencialização conforme o procedimento, proteger partes próximas energizadas e sinalizar. Um cadeado isoladamente não comprova condição segura.',
      'Um secundário de 24 V CA não é corrente contínua. A classificação SELV/PELV depende da fonte, separação elétrica, aterramento e demais requisitos do projeto.',
      'A categoria ou o PL requerido de cada função de segurança depende da apreciação de riscos. A NR-12 não impõe categoria 4 a toda máquina; relé, sensores, atuadores e diagnóstico devem ser projetados e validados como sistema.'
    ],
    steps: [
      'Adicione a Chave Seccionadora LOTO (QS1) na entrada de alimentação trifásica da rede.',
      'Conecte a saída monofásica no primário do Transformador 220V/24V (TR1) para alimentar o circuito de comando em extra-baixa tensão.',
      'Identifique os elementos de uma função de segurança no diagrama do fabricante. O relé da bancada é ilustrativo e não reproduz os canais de entrada, diagnóstico e rearme supervisionado.'
    ],
    schematicTips: 'Força e comando têm ramais próprios. Primário de 220 V: use fase-neutro de rede 380/220 V, com proteção adequada; nunca 380 V entre fases. Secundário do trafo: 24 V CA.'
  },
  {
    id: 'aula_03_partida_direta',
    title: '3. Partida Direta com Contato de Selo',
    module: 'Módulo 2: Comandos Básicos',
    description: 'Montagem do circuito clássico de partida direta com retenção (selo 13-14), botão liga/desliga e sinaleiro de status.',
    theory: [
      'A partida direta aplica a tensão nominal plena instantaneamente sobre os terminais do motor trifásico.',
      'Ao pressionar o botão NA S1 (Liga), a bobina de K1 é energizada. Quando o operador solta o botão, o contato auxiliar K1:13-14 em paralelo com S1 mantém a bobina alimentada (Contato de Selo).',
      'O botão NF S0 ou a atuação do contato 95-96 do relé térmico interrompe a retenção, desligando o motor.',
      'Sinaleiros luminosos verdes indicam motor em operação (K1:13-14) e vermelhos indicam trip térmico (F1:97-98).'
    ],
    steps: [
      'Alimente o comando: F -> disjuntor 1P -> F1:95-96 NF -> S0:11-12 NF -> S1:3-4 NA -> K1:A1 (bobina 220 V CA nesta bancada).',
      'Conecte o borne N da rede no borne A2 do contator K1.',
      'Faça o contato de selo conectando K1:13 e K1:14 em paralelo com os bornes 3 e 4 do botão S1.',
      'Conecte o circuito de força: R, S, T -> Disjuntor-Motor -> Contator K1 -> Relé Térmico -> Motor W22 (U1, V1, W1; estrela para motor 220/380 V em rede 380 V, conforme placa).'
    ],
    schematicTips: 'Linha: [Fase] -> [95 F1 96] -> [1 S0 2] -> [3 S1 4 // 13 K1 14] -> [A1 K1 A2] -> [Neutro]'
  },
  {
    id: 'aula_04_partida_reversa',
    title: '4. Partida Direta com Reversão e Intertravamento',
    module: 'Módulo 2: Comandos Básicos',
    description: 'Inversão do sentido de rotação trocando duas fases e garantindo intertravamento elétrico por contatos NF cruzados.',
    theory: [
      'Para inverter o sentido de giro de um motor de indução trifásico, basta comutar duas de suas três fases de alimentação (ex: trocar R por S mantendo T).',
      'Dois contatores são utilizados: K1 (Sentido Horário) e K2 (Sentido Anti-horário).',
      'Use também intertravamento mecânico entre os contatores. INTERTRAVAMENTO ELÉTRICO: Se K1 e K2 forem acionados juntos, ocorrerá um curto-circuito fase-fase violento. Por isso, a bobina de K1 passa pelo contato auxiliar NF (21-22) de K2, e vice-versa.'
    ],
    steps: [
      'Insira dois contatores: K1 (Horário) e K2 (Anti-horário) e duas botoeiras NA: S1 (Horário) e S2 (Anti-horário).',
      'Faça o intertravamento: antes do A1 de K1, passe pelo contato 21-22 NF de K2. Antes do A1 de K2, passe pelo contato 21-22 NF de K1.',
      'No circuito de força de K2, inverta as fases de entrada nos bornes 1L1 e 3L2 em relação ao K1.'
    ],
    schematicTips: 'Intertravamento cruzado: Linha S1 -> K2:21-22 (NF) -> K1:A1 | Linha S2 -> K1:21-22 (NF) -> K2:A1.'
  },
  {
    id: 'aula_05_estrela_triangulo',
    title: '5. Partida Estrela-Triângulo (Y-Δ) com Temporizador',
    module: 'Módulo 3: Métodos de Partida Indireta',
    description: 'Redução da corrente de linha na partida para aproximadamente 1/3 da partida direta em triângulo, na mesma rede.',
    theory: [
      'A corrente de partida direta de um motor pode atingir 6 a 8 vezes a corrente nominal (Ip/In), causando quedas de tensão na rede.',
      'Na ligação Estrela (Y), a tensão aplicada em cada bobina é reduzida por raiz de 3 (220V em rede 380V), reduzindo o conjugado de partida e a corrente de linha a cerca de 1/3 dos valores de partida direta em triângulo; não da corrente nominal.',
      'A transição depende da aceleração e da carga: desligue K3, mantenha intervalo sem sobreposição e então ligue K2. O ajuste deve seguir o motor, a carga e o conjunto de partida.',
      'O motor deve ter 6 pontas acessíveis e sua tensão nominal em triângulo deve coincidir com a tensão de linha da rede.'
    ],
    steps: [
      'Componentes necessários: Contator de Linha K1, Contator Triângulo K2, Contator Estrela K3 e Relé Temporizador TON.',
      'Fechamento Estrela: K3 conecta em curto os terminais W2, U2 e V2 do motor.',
      'Fechamento Triângulo: K2 conecta U1-W2, V1-U2 e W1-V2.',
      'Preveja intertravamento elétrico e mecânico entre K2 e K3 e tempo morto na transição. O temporizador automático ainda não está disponível no catálogo; esta etapa é estudo de esquema.'
    ],
    schematicTips: 'K1 + K3 -> aceleração -> abre K3 -> tempo morto -> K1 + K2. Em rede 380 V use motor 380/660 V Δ/Y; motor 220/380 V não pode operar em Δ a 380 V.'
  },
  {
    id: 'aula_06_partida_compensada',
    title: '6. Partida Compensada por Autotransformador',
    module: 'Módulo 3: Métodos de Partida Indireta',
    description: 'Partida de motores sob carga com redução de tensão via taps de 65% ou 80% em autotransformador de partida.',
    theory: [
      'A partida compensada pode oferecer mais conjugado que estrela-triângulo, conforme o tap. A capacidade de acelerar depende da curva de carga e do motor.',
      'No tap de 65%, a corrente de linha e o conjugado de partida são aproximadamente 0,65² = 42% dos valores de partida direta, desprezando perdas; a corrente do motor é cerca de 65% da partida direta.',
      'São empregados três contatores: K1 (Linha Principal), K2 (Alimentação do Trafo) e K3 (Ponto Estrela do Trafo).',
      'O autotrafo possui regime intermitente de poucos segundos e deve ser protegido contra religamentos consecutivos sem resfriamento.'
    ],
    steps: [
      'Estudo de esquema: o autotransformador de partida não está disponível nesta bancada. Identifique seus taps no diagrama do fabricante.',
      'Determine o tempo de aceleração pelo motor, carga e limite de operação do autotransformador; não existe ajuste universal de 6 segundos.',
      'Ligue K2 e K3 para aplicar a tensão reduzida nos bornes U1-V1-W1; na transição, K2/K3 abrem e K1 fecha direto na rede 380V.'
    ],
    schematicTips: 'Transição: (K2 + K3 fecham no Tap) -> Tempo esgota -> Abre K3 -> Abre K2 -> Fecha K1 direto na rede.'
  },
  {
    id: 'aula_07_bombas_recalque',
    title: '7. Sistema de Recalque de Água com Revezamento Automático',
    module: 'Módulo 4: Automações Prediais e Industriais',
    description: 'Controle de nível por boias elétricas e alternância automática entre Bomba 1 e Bomba 2 a cada ciclo de enchimento.',
    theory: [
      'Sistemas prediais de abastecimento utilizam dois conjuntos motobomba (Bomba 1 e Bomba 2) em paralelo com revezamento para desgaste uniforme e garantia de redundância.',
      'O reservatório inferior (cisterna) possui boia de nível mínimo de proteção contra trabalho a seco (bloqueio geral).',
      'O reservatório superior possui boia de nível máximo (desliga) e boia de nível mínimo (chama bomba).',
      'Uma chave comutadora de 3 posições permite operar em Manual (MAN), Desligado (0) ou Automático (AUT via boias e relé de alternância).'
    ],
    steps: [
      'Insira a Chave Seletora 3 Posições (SA1: MAN - 0 - AUT) e dois contatores (K1 Bomba 1 e K2 Bomba 2).',
      'Estudo de esquema: boias e relé de alternância não estão disponíveis no catálogo. Preveja a proteção contra trabalho a seco também no modo manual.',
      'Adicione um bloco de sinalização sonora/visual para alerta de nível crítico ou desarme por sobrecarga térmica de bomba.'
    ],
    schematicTips: 'Linha AUT: [Fase] -> [Boia Cisterna OK] -> [Boia Caixa Baixa] -> [Relé de Revezamento K1/K2] -> [K1:A1 / K2:A1]'
  }
];

export const ComandosEletricosWorkbench: React.FC = () => {
  const { state: inverterState, dispatch } = useInverter();

  const [isWorkbenchVisible, setIsWorkbenchVisible] = useState(true);
  const [motorDirection, setMotorDirection] = useState<'FWD' | 'REV'>('FWD');
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState<string>(COMANDOS_LESSONS[0].id);

  const [components, setComponents] = useState<PlacedComponent[]>([
    {
      id: 'comp_grid3p',
      category: 'REDE_TRIFASICA',
      tag: 'GRID-3F',
      name: 'Rede Trifásica 380V',
      x: 30,
      y: 30,
      width: 140,
      height: 80,
      state: true,
      terminals: [
        { id: 'R', name: 'R', relX: 18, relY: 80, type: 'FORCA' },
        { id: 'S', name: 'S', relX: 38, relY: 80, type: 'FORCA' },
        { id: 'T', name: 'T', relX: 58, relY: 80, type: 'FORCA' },
        { id: 'N', name: 'N', relX: 78, relY: 80, type: 'COMANDO' },
        { id: 'PE', name: 'PE', relX: 92, relY: 80, type: 'TERRA' },
      ],
    },
    {
      id: 'comp_grid1p',
      category: 'REDE_MONOFASICA',
      tag: 'GRID-1F',
      name: 'Rede Monofásica 220V',
      x: 200,
      y: 30,
      width: 120,
      height: 80,
      state: true,
      terminals: [
        { id: 'F', name: 'F', relX: 25, relY: 80, type: 'COMANDO' },
        { id: 'N', name: 'N', relX: 55, relY: 80, type: 'COMANDO' },
        { id: 'PE', name: 'PE', relX: 85, relY: 80, type: 'TERRA' },
      ],
    },
  ]);

  const [cables, setCables] = useState<CableConnection[]>([]);
  const [selectedCompId, setSelectedCompId] = useState<string | null>(null);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [catalogFilter, setCatalogFilter] = useState<'ALL' | 'ALIMENTACAO' | 'PROTECAO' | 'COMANDO' | 'SEGURANCA' | 'CARGAS'>('ALL');

  // Ferramenta de Cabo e Roteamento por Waypoints
  const [activeCableTool, setActiveCableTool] = useState<CableType | null>('COMANDO_FASE');
  const [wiringOrigin, setWiringOrigin] = useState<{ compId: string; termId: string } | null>(null);
  const [activeWaypoints, setActiveWaypoints] = useState<Point2D[]>([]);
  const [mousePos, setMousePos] = useState<Point2D | null>(null);

  // Modal Flutuante para 2 Cliques no Cabo
  const [editingCableId, setEditingCableId] = useState<string | null>(null);
  const [modalPos, setModalPos] = useState<Point2D>({ x: 0, y: 0 });

  // Multímetro
  const [isMeterActive, setIsMeterActive] = useState(false);
  const [meterScale, setMeterScale] = useState<MultimeterScale>('V_AC');
  const [redProbe, setRedProbe] = useState<MeterProbePosition | null>(null);
  const [blackProbe, setBlackProbe] = useState<MeterProbePosition | null>(null);
  const [activeProbeTarget, setActiveProbeTarget] = useState<'RED' | 'BLACK'>('RED');
  const [meterReadout, setMeterReadout] = useState<string>('0.0 V');
  const [isContinuityBuzzer, setIsContinuityBuzzer] = useState(false);

  // Arraste de Componentes
  const [draggingCompId, setDraggingCompId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<Point2D>({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  const activeLesson = COMANDOS_LESSONS.find((l) => l.id === selectedLessonId) || COMANDOS_LESSONS[0];
  const filteredCatalog = CATALOG_ITEMS.filter((item) =>
    catalogFilter === 'ALL' ? true : item.group === catalogFilter
  );

  const getTerminalAbsolutePos = useCallback((compId: string, termId: string): Point2D => {
    const comp = components.find((c) => c.id === compId);
    if (!comp) return { x: 0, y: 0 };
    const term = comp.terminals?.find((t) => t.id === termId);
    if (!term) return { x: comp.x + comp.width / 2, y: comp.y + comp.height / 2 };

    return {
      x: comp.x + (comp.width * term.relX) / 100,
      y: comp.y + (comp.height * term.relY) / 100,
    };
  }, [components]);

  // MOTOR ORTOGONAL EM 90° PURO COM CURVA DE CONCORDÂNCIA ABERTA E LIMPA
  const renderOrthogonalSmoothPath = (rawPts: Point2D[]): string => {
    if (rawPts.length < 2) return '';

    // 1. Converte qualquer sequência de cliques para eixos estritamente Manhattan (90°)
    const orthoPts: Point2D[] = [rawPts[0]];

    for (let i = 1; i < rawPts.length; i++) {
      const pPrev = orthoPts[orthoPts.length - 1];
      const pCurr = rawPts[i];

      if (pPrev.x === pCurr.x || pPrev.y === pCurr.y) {
        orthoPts.push(pCurr);
      } else {
        const dy = Math.abs(pCurr.y - pPrev.y);
        const dx = Math.abs(pCurr.x - pPrev.x);

        if (dy > dx && (pPrev.y < 120 || pPrev.y > 600)) {
          orthoPts.push({ x: pPrev.x, y: pCurr.y });
        } else {
          orthoPts.push({ x: pCurr.x, y: pPrev.y });
        }
        orthoPts.push(pCurr);
      }
    }

    // 2. Remove vértices colineares redundantes
    const cleanPts: Point2D[] = [];
    for (let i = 0; i < orthoPts.length; i++) {
      if (i > 0 && i < orthoPts.length - 1) {
        const p0 = orthoPts[i - 1];
        const p1 = orthoPts[i];
        const p2 = orthoPts[i + 1];

        if ((p0.x === p1.x && p1.x === p2.x) || (p0.y === p1.y && p1.y === p2.y)) {
          continue;
        }
      }
      cleanPts.push(orthoPts[i]);
    }

    if (cleanPts.length < 2) return '';
    if (cleanPts.length === 2) {
      return `M ${cleanPts[0].x} ${cleanPts[0].y} L ${cleanPts[1].x} ${cleanPts[1].y}`;
    }

    // 3. Arredondamento aberto em cada curva de 90° (sem quina de caixa/quadrado)
    let d = `M ${cleanPts[0].x} ${cleanPts[0].y}`;
    const targetRadius = 24;

    for (let i = 1; i < cleanPts.length - 1; i++) {
      const pPrev = cleanPts[i - 1];
      const pCurr = cleanPts[i];
      const pNext = cleanPts[i + 1];

      const len1 = Math.hypot(pCurr.x - pPrev.x, pCurr.y - pPrev.y);
      const len2 = Math.hypot(pNext.x - pCurr.x, pNext.y - pCurr.y);

      const r = Math.min(targetRadius, len1 * 0.48, len2 * 0.48);

      const v1x = (pCurr.x - pPrev.x) / len1;
      const v1y = (pCurr.y - pPrev.y) / len1;
      const v2x = (pNext.x - pCurr.x) / len2;
      const v2y = (pNext.y - pCurr.y) / len2;

      const pStart = {
        x: pCurr.x - v1x * r,
        y: pCurr.y - v1y * r,
      };
      const pEnd = {
        x: pCurr.x + v2x * r,
        y: pCurr.y + v2y * r,
      };

      d += ` L ${pStart.x} ${pStart.y} Q ${pCurr.x} ${pCurr.y}, ${pEnd.x} ${pEnd.y}`;
    }

    d += ` L ${cleanPts[cleanPts.length - 1].x} ${cleanPts[cleanPts.length - 1].y}`;
    return d;
  };

  // Traçado Automático Padrão caso não haja waypoints manuais
  const calculateDefaultOrthoRoute = (
    fromCompId: string,
    fromTermId: string,
    toCompId: string,
    toTermId: string
  ): Point2D[] => {
    const p1 = getTerminalAbsolutePos(fromCompId, fromTermId);
    const p2 = getTerminalAbsolutePos(toCompId, toTermId);

    const fromComp = components.find((c) => c.id === fromCompId);
    const fromTerm = fromComp?.terminals?.find((t) => t.id === fromTermId);

    const fromDirY = fromTerm && fromTerm.relY > 50 ? 1 : -1;
    const marginY = 32;
    const p1Exit: Point2D = { x: p1.x, y: p1.y + fromDirY * marginY };

    return [p1, p1Exit, p2];
  };

  // Motor Elétrico de Continuidade dos Comandos
  useEffect(() => {
    const hasPath = buildControlCircuit(components, cables);
    const { voltage, potential } = createVoltageModel(components, hasPath);
    const energizedTags = new Set(components.filter(c => c.category === 'CONTATOR_TRIPOLAR' && voltage(`${c.id}:A1`, `${c.id}:A2`) === 220).map(c => c.tag.toUpperCase().trim()));
    const motorPowered = (c: PlacedComponent) => c.category === 'MOTOR_TRIFASICO_6P'
      ? motorConnection(c.id, hasPath, voltage) !== 'INVALID'
      : voltage(`${c.id}:F`, `${c.id}:N`) === 220 && components.some(cap => cap.category === 'CAPACITOR_ELETROLITICO' &&
          ((hasPath(`${c.id}:C1`, `${cap.id}:C1`) && hasPath(`${c.id}:C2`, `${cap.id}:C2`)) ||
           (hasPath(`${c.id}:C1`, `${cap.id}:C2`) && hasPath(`${c.id}:C2`, `${cap.id}:C1`)))) && !hasPath(`${c.id}:C1`, `${c.id}:C2`);
    const isMot3pPowered = components.some(c => c.category === 'MOTOR_TRIFASICO_6P' && motorPowered(c));
    const isMotMonoPowered = components.some(c => c.category === 'MOTOR_MONOFASICO_CAPACITOR' && motorPowered(c));
    const runningMotor = components.find(c => c.category === 'MOTOR_TRIFASICO_6P' && motorPowered(c));
    if (runningMotor) {
      const direction = motorPhaseDirection(runningMotor.id, potential);
      if (direction) setMotorDirection(direction);
    }

    let stateChanged = false;
    const updated = components.map((c) => {
      const cleanTag = c.tag.toUpperCase().trim();
      const shouldBeActive = c.category === 'CONTATOR_TRIPOLAR' ? voltage(`${c.id}:A1`, `${c.id}:A2`) === 220 : energizedTags.has(cleanTag);

      if (c.category === 'CONTATOR_TRIPOLAR' || c.category === 'BLOCO_AUXILIAR') {
        if (c.state !== shouldBeActive) {
          stateChanged = true;
          return { ...c, state: shouldBeActive };
        }
      }
      if (c.category === 'SINALEIRO_LED') {
        const nodeX1 = `${c.id}:X1`;
        const nodeX2 = `${c.id}:X2`;
        const lampOn = voltage(nodeX1, nodeX2) === 220;
        if (c.state !== lampOn) {
          stateChanged = true;
          return { ...c, state: lampOn };
        }
      }
      if (c.category === 'MOTOR_TRIFASICO_6P') {
        const powered = motorPowered(c);
        const direction = powered ? motorPhaseDirection(c.id, potential) ?? c.rotationDirection : c.rotationDirection;
        if (c.state !== powered || c.rotationDirection !== direction) {
          stateChanged = true;
          return { ...c, state: powered, rotationDirection: direction };
        }
      }
      if (c.category === 'MOTOR_MONOFASICO_CAPACITOR') {
        if (c.state !== motorPowered(c)) {
          stateChanged = true;
          return { ...c, state: motorPowered(c) };
        }
      }
      return c;
    });

    if (stateChanged) {
      setComponents(updated);
    }

    const anyRunning = isMot3pPowered || isMotMonoPowered;
    if (anyRunning && inverterState.motorStatus !== 'RUNNING') {
      dispatch({ type: 'PRESS_RUN' });
    } else if (!anyRunning && inverterState.motorStatus === 'RUNNING') {
      dispatch({ type: 'PRESS_STOP' });
    }

    if (redProbe && blackProbe) {
      const nodeA = `${redProbe.compId}:${redProbe.termId}`;
      const nodeB = `${blackProbe.compId}:${blackProbe.termId}`;

      const hasDirectContinuity = hasPath(nodeA, nodeB);
      const powered = potential(nodeA) !== null || potential(nodeB) !== null;
      setIsContinuityBuzzer(false);
      if (meterScale === 'V_AC') {
        const measured = voltage(nodeA, nodeB);
        setMeterReadout(measured === null ? 'Indeterminado' : `${measured.toFixed(1)} V~`);
      } else if (meterScale === 'V_DC') {
        setMeterReadout('0.0 V= (fontes CA)');
      } else if (meterScale === 'CURRENT_A') {
        setMeterReadout('Não simulado: medição em série');
      } else if (powered) {
        setMeterReadout('Desenergize para medir Ω/continuidade');
      } else if (meterScale === 'CONTINUITY') {
        setMeterReadout(hasDirectContinuity ? '0.0 Ω (BIP)' : 'O.L (Aberto)');
        setIsContinuityBuzzer(hasDirectContinuity);
      } else if (meterScale === 'RESISTANCE_OHM') {
        setMeterReadout(hasDirectContinuity ? '0.0 Ω' : 'O.L / carga não modelada');
      } else {
        setMeterReadout('Não simulado');
      }
    } else {
      setMeterReadout(meterScale === 'CONTINUITY' ? 'O.L' : '0.00');
      setIsContinuityBuzzer(false);
    }
  }, [cables, components, redProbe, blackProbe, meterScale, inverterState.motorStatus, dispatch]);

  const handleStartDrag = (clientX: number, clientY: number, compId: string) => {
    const comp = components.find((c) => c.id === compId);
    if (!comp || !panelRef.current) return;

    const panelRect = panelRef.current.getBoundingClientRect();
    setDraggingCompId(compId);
    setDragOffset({
      x: clientX - panelRect.left - comp.x,
      y: clientY - panelRect.top - comp.y,
    });
  };

  const handleMoveDrag = (clientX: number, clientY: number) => {
    if (!panelRef.current) return;
    const panelRect = panelRef.current.getBoundingClientRect();
    const currX = clientX - panelRect.left;
    const currY = clientY - panelRect.top;

    setMousePos({ x: currX, y: currY });

    if (!draggingCompId) return;

    const newX = Math.max(10, Math.min(panelRect.width - 160, currX - dragOffset.x));
    const newY = Math.max(10, Math.min(panelRect.height - 180, currY - dragOffset.y));

    setComponents((prev) =>
      prev.map((c) => (c.id === draggingCompId ? { ...c, x: newX, y: newY } : c))
    );
  };

  const handleEndDrag = () => {
    setDraggingCompId(null);
  };

  const handleDoubleClickComp = (e: React.MouseEvent, compId: string) => {
    e.stopPropagation();
    setSelectedCompId(compId);
    setEditingCableId(null);
  };

  // Clique na Bancada para Criar Waypoint no Cabo em Andamento
  const handlePanelClick = (e: React.MouseEvent) => {
    if (!wiringOrigin || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const clickPt: Point2D = {
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    };

    setActiveWaypoints((prev) => [...prev, clickPt]);
  };

  // Conexão do Cabo
  const handleTerminalClick = (e: React.MouseEvent | React.TouchEvent, compId: string, termId: string) => {
    e.stopPropagation();

    if (isMeterActive) {
      if (activeProbeTarget === 'RED') {
        setRedProbe({ compId, termId });
        setActiveProbeTarget('BLACK');
      } else {
        setBlackProbe({ compId, termId });
        setActiveProbeTarget('RED');
      }
      return;
    }

    if (!activeCableTool) {
      alert('Selecione primeiro uma cor de cabo na barra superior!');
      return;
    }

    if (!wiringOrigin) {
      setWiringOrigin({ compId, termId });
      setActiveWaypoints([]);
    } else {
      if (wiringOrigin.compId === compId && wiringOrigin.termId === termId) {
        setWiringOrigin(null);
        setActiveWaypoints([]);
        return;
      }

      const newCable: CableConnection = {
        id: `cbl_${Date.now()}`,
        fromComponentId: wiringOrigin.compId,
        fromTerminalId: wiringOrigin.termId,
        toComponentId: compId,
        toTerminalId: termId,
        cableType: activeCableTool,
        waypoints: activeWaypoints,
      };

      setCables((prev) => [...prev, newCable]);
      setWiringOrigin(null);
      setActiveWaypoints([]);
    }
  };

  // Duplo clique no cabo -> Abre janela flutuante
  const handleCableDoubleClick = (e: React.MouseEvent, cableId: string) => {
    e.stopPropagation();
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    setModalPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setEditingCableId(cableId);
    setSelectedCompId(null);
  };

  const handleChangeCableColor = (newColor: CableType) => {
    if (!editingCableId) return;
    setCables((prev) =>
      prev.map((c) => (c.id === editingCableId ? { ...c, cableType: newColor } : c))
    );
    setEditingCableId(null);
  };

  const handleDeleteCable = () => {
    if (!editingCableId) return;
    setCables((prev) => prev.filter((c) => c.id !== editingCableId));
    setEditingCableId(null);
  };

  // Tecla ESC cancela traçado de cabo ou fecha modais
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setWiringOrigin(null);
        setActiveWaypoints([]);
        setEditingCableId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTagInputChange = (compId: string, newTag: string) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === compId ? { ...c, tag: newTag.toUpperCase() } : c))
    );
  };

  const handleCurrentRatingChange = (compId: string, rating: number) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === compId ? { ...c, currentRating: rating } : c))
    );
  };

  const handleLampColorChange = (compId: string, color: LampColor) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === compId ? { ...c, lampColor: color } : c))
    );
  };

  const handleSelectorToggle = (compId: string) => {
    setComponents((prev) =>
      prev.map((c) => {
        if (c.id !== compId) return c;
        const nextPos: 'MAN' | '0' | 'AUT' =
          c.selectorPosition === 'MAN' ? '0' : c.selectorPosition === '0' ? 'AUT' : 'MAN';
        return { ...c, selectorPosition: nextPos };
      })
    );
  };

  const tPoleLocal = (id: string, name: string, relX: number, relY: number, type: 'FORCA' | 'COMANDO' | 'TERRA' = 'COMANDO'): TerminalPole => ({
    id,
    name,
    relX,
    relY,
    type,
  });

  const handleInsertComponentToProject = (category: ComponentCategory) => {
    const count = components.length + 1;
    let tag = `C${count}`;
    let name = 'Módulo';
    let width = 75;
    let height = 155;
    let terminals: TerminalPole[] = [];
    let currentRating: number | undefined = undefined;
    let lampColor: LampColor | undefined = undefined;

    if (category === 'DISJUNTOR_MONOPOLAR') {
      tag = `Q${count}`;
      name = 'Disjuntor DIN 1P';
      width = 48;
      height = 140;
      currentRating = 16;
      terminals = [tPoleLocal('1', '1', 50, 10), tPoleLocal('2', '2', 50, 90)];
    } else if (category === 'DISJUNTOR_BIPOLAR') {
      tag = `Q${count}`;
      name = 'Disjuntor DIN 2P';
      width = 76;
      height = 140;
      currentRating = 20;
      terminals = [
        tPoleLocal('1L1', '1', 25, 10),
        tPoleLocal('3L2', '3', 75, 10),
        tPoleLocal('2T1', '2', 25, 90),
        tPoleLocal('4T2', '4', 75, 90),
      ];
    } else if (category === 'DISJUNTOR_MOTOR') {
      tag = `Q${count}`;
      name = 'Disjuntor MPW';
      width = 90;
      height = 150;
      currentRating = 20;
      terminals = [
        tPoleLocal('1L1', '1/L1', 18, 10, 'FORCA'),
        tPoleLocal('3L2', '3/L2', 50, 10, 'FORCA'),
        tPoleLocal('5L3', '5/L3', 82, 10, 'FORCA'),
        tPoleLocal('2T1', '2/T1', 18, 90, 'FORCA'),
        tPoleLocal('4T2', '4/T2', 50, 90, 'FORCA'),
        tPoleLocal('6T3', '6/T3', 82, 90, 'FORCA'),
      ];
    } else if (category === 'SINALEIRO_LED') {
      tag = `H${count}`;
      name = 'Sinalizador';
      width = 65;
      height = 100;
      lampColor = 'VERDE';
      terminals = [tPoleLocal('X1', 'X1', 50, 8), tPoleLocal('X2', 'X2', 50, 92)];
    } else if (category === 'CHAVE_SELETORA_3POS') {
      tag = `SA${count}`;
      name = 'Seletora MAN-0-AUT';
      width = 85;
      height = 140;
      terminals = [
        tPoleLocal('13', '13', 30, 10),
        tPoleLocal('23', '23', 70, 10),
        tPoleLocal('14', '14', 30, 90),
        tPoleLocal('24', '24', 70, 90),
      ];
    } else if (category === 'REGUA_BORNES') {
      tag = `XT${count}`;
      name = 'Régua de Bornes';
      width = 120;
      height = 130;
      terminals = [
        tPoleLocal('X1_IN', '1', 20, 10, 'FORCA'),
        tPoleLocal('X2_IN', '2', 40, 10, 'FORCA'),
        tPoleLocal('X3_IN', '3', 60, 10, 'FORCA'),
        tPoleLocal('X4_IN', '4', 80, 10),
        tPoleLocal('X1_OUT', '1', 20, 90, 'FORCA'),
        tPoleLocal('X2_OUT', '2', 40, 90, 'FORCA'),
        tPoleLocal('X3_OUT', '3', 60, 90, 'FORCA'),
        tPoleLocal('X4_OUT', '4', 80, 90),
      ];
    } else if (category === 'BARRAMENTO_PENTE') {
      tag = `BAR${count}`;
      name = 'Barramento Pente 3F';
      width = 130;
      height = 70;
      terminals = [
        tPoleLocal('R1', 'R1', 20, 20, 'FORCA'),
        tPoleLocal('S1', 'S1', 50, 20, 'FORCA'),
        tPoleLocal('T1', 'T1', 80, 20, 'FORCA'),
        tPoleLocal('R2', 'R2', 20, 80, 'FORCA'),
        tPoleLocal('S2', 'S2', 50, 80, 'FORCA'),
        tPoleLocal('T2', 'T2', 80, 80, 'FORCA'),
      ];
    } else if (category === 'SECCIONADORA_LOTO') {
      tag = `QS${count}`;
      name = 'Chave LOTO NR-10';
      width = 95;
      height = 150;
      terminals = [
        tPoleLocal('1L1', '1', 25, 8, 'FORCA'),
        tPoleLocal('3L2', '3', 50, 8, 'FORCA'),
        tPoleLocal('5L3', '5', 75, 8, 'FORCA'),
        tPoleLocal('2T1', '2', 25, 92, 'FORCA'),
        tPoleLocal('4T2', '4', 50, 92, 'FORCA'),
        tPoleLocal('6T3', '6', 75, 92, 'FORCA'),
      ];
    } else if (category === 'TRANSFORMADOR_ISOLADOR') {
      tag = `TR${count}`;
      name = 'Trafo 220V/24V';
      width = 95;
      height = 130;
      terminals = [
        tPoleLocal('PRI_L1', '220V', 30, 8),
        tPoleLocal('PRI_L2', '0V', 70, 8),
        tPoleLocal('SEC_L', '24V~', 30, 92),
        tPoleLocal('SEC_N', '0V', 70, 92),
      ];
    } else if (category === 'RELE_SEGURANCA_NR12') {
      tag = `SR${count}`;
      name = 'Relé Segurança Cat 4';
      width = 110;
      height = 160;
      terminals = [
        tPoleLocal('A1', 'A1', 20, 8),
        tPoleLocal('A2', 'A2', 50, 8),
        tPoleLocal('S11', 'S11', 80, 8),
        tPoleLocal('13NO', '13', 30, 92),
        tPoleLocal('14NO', '14', 70, 92),
      ];
    } else if (category === 'CHAVE_INTERTRAVAMENTO_NR12') {
      tag = `SQ${count}`;
      name = 'Intertravamento';
      width = 80;
      height = 120;
      terminals = [
        tPoleLocal('11NC', '11', 30, 8),
        tPoleLocal('21NC', '21', 70, 8),
        tPoleLocal('12NC', '12', 30, 92),
        tPoleLocal('22NC', '22', 70, 92),
      ];
    } else if (category === 'BOTOEIRA_PULSO_NA') {
      tag = `S${count}`;
      name = 'Botão Liga NA';
      width = 65;
      height = 100;
      terminals = [tPoleLocal('3NO', '3', 50, 8), tPoleLocal('4NO', '4', 50, 92)];
    } else if (category === 'BOTOEIRA_COGUMELO_NF') {
      tag = `S${count}`;
      name = 'Emergência NF';
      width = 65;
      height = 100;
      terminals = [tPoleLocal('11NC', '11', 50, 8), tPoleLocal('12NC', '12', 50, 92)];
    } else if (category === 'RELE_TERMICO') {
      tag = `F${count}`;
      name = 'Relé Térmico RW';
      width = 120;
      height = 190;
      terminals = [
        tPoleLocal('1L1', '1/L1', 20, 8, 'FORCA'),
        tPoleLocal('3L2', '3/L2', 50, 8, 'FORCA'),
        tPoleLocal('5L3', '5/L3', 80, 8, 'FORCA'),
        tPoleLocal('95NC', '95', 18, 58),
        tPoleLocal('96NC', '96', 40, 58),
        tPoleLocal('97NO', '97', 62, 58),
        tPoleLocal('98NO', '98', 84, 58),
        tPoleLocal('2T1', '2/T1', 20, 92, 'FORCA'),
        tPoleLocal('4T2', '4/T2', 50, 92, 'FORCA'),
        tPoleLocal('6T3', '6/T3', 80, 92, 'FORCA'),
      ];
    } else if (category === 'CONTATOR_TRIPOLAR') {
      tag = `K${count}`;
      name = 'Contator CWM25';
      width = 110;
      height = 180;
      terminals = [
        tPoleLocal('1L1', '1/L1', 18, 8, 'FORCA'),
        tPoleLocal('3L2', '3/L2', 38, 8, 'FORCA'),
        tPoleLocal('5L3', '5/L3', 58, 8, 'FORCA'),
        tPoleLocal('13NO', '13', 82, 8),
        tPoleLocal('A1', 'A1', 82, 28),
        tPoleLocal('2T1', '2/T1', 18, 92, 'FORCA'),
        tPoleLocal('4T2', '4/T2', 38, 92, 'FORCA'),
        tPoleLocal('6T3', '6/T3', 58, 92, 'FORCA'),
        tPoleLocal('14NO', '14', 82, 92),
        tPoleLocal('A2', 'A2', 82, 72),
        tPoleLocal('21NC', '21 NF', 18, 45),
        tPoleLocal('22NC', '22 NF', 18, 62),
      ];
    } else if (category === 'MOTOR_TRIFASICO_6P') {
      tag = `M${count}`;
      name = 'Motor W22 6P';
      width = 170;
      height = 180;
      terminals = [
        tPoleLocal('U1', 'U1', 25, 28, 'FORCA'),
        tPoleLocal('V1', 'V1', 50, 28, 'FORCA'),
        tPoleLocal('W1', 'W1', 75, 28, 'FORCA'),
        tPoleLocal('W2', 'W2', 25, 72, 'FORCA'),
        tPoleLocal('U2', 'U2', 50, 72, 'FORCA'),
        tPoleLocal('V2', 'V2', 75, 72, 'FORCA'),
      ];
    } else if (category === 'MOTOR_MONOFASICO_CAPACITOR') {
      tag = `M${count}`;
      name = 'Motor Mono c/ Capacitor';
      width = 150;
      height = 160;
      terminals = [
        tPoleLocal('F', 'F (Fase)', 30, 15, 'FORCA'),
        tPoleLocal('N', 'N (Neutro)', 70, 15),
        tPoleLocal('C1', 'C1 (Cap)', 30, 85, 'FORCA'),
        tPoleLocal('C2', 'C2 (Cap)', 70, 85, 'FORCA'),
      ];
    } else if (category === 'CAPACITOR_ELETROLITICO') {
      tag = `C${count}`;
      name = 'Capacitor de Partida';
      width = 80;
      height = 120;
      terminals = [tPoleLocal('C1', 'C1', 30, 10, 'FORCA'), tPoleLocal('C2', 'C2', 70, 90, 'FORCA')];
    } else if (category === 'RESISTOR_FREINAGEM') {
      tag = `R${count}`;
      name = 'Resistor de Frenagem';
      width = 110;
      height = 100;
      terminals = [tPoleLocal('B1', 'B1', 25, 50, 'FORCA'), tPoleLocal('B2', 'B2', 75, 50, 'FORCA')];
    } else if (category === 'REDE_TRIFASICA') {
      tag = `GRID3-${count}`;
      name = 'Rede Trifásica 380V';
      width = 140;
      height = 80;
      terminals = [
        tPoleLocal('R', 'R', 18, 80, 'FORCA'),
        tPoleLocal('S', 'S', 38, 80, 'FORCA'),
        tPoleLocal('T', 'T', 58, 80, 'FORCA'),
        tPoleLocal('N', 'N', 78, 80),
        tPoleLocal('PE', 'PE', 92, 80, 'TERRA'),
      ];
    } else if (category === 'REDE_MONOFASICA') {
      tag = `GRID1-${count}`;
      name = 'Rede Monofásica 220V';
      width = 120;
      height = 80;
      terminals = [
        tPoleLocal('F', 'F', 25, 80),
        tPoleLocal('N', 'N', 55, 80),
        tPoleLocal('PE', 'PE', 85, 80, 'TERRA'),
      ];
    } else if (category === 'RELE_FALTA_FASE') {
      tag = `RPF${count}`;
      name = 'Relé Falta de Fase RPF-01';
      width = 65;
      height = 135;
      terminals = [
        tPoleLocal('R', 'R', 25, 8, 'FORCA'),
        tPoleLocal('S', 'S', 50, 8, 'FORCA'),
        tPoleLocal('T', 'T', 75, 8, 'FORCA'),
        tPoleLocal('95', '95', 25, 92),
        tPoleLocal('96', '96', 50, 92),
        tPoleLocal('98', '98', 75, 92),
      ];
    } else if (category === 'BLOCO_AUXILIAR') {
      tag = `KA${count}`;
      name = 'Bloco de Contatos Auxiliares';
      width = 85;
      height = 95;
      terminals = [
        tPoleLocal('13', '13', 30, 10),
        tPoleLocal('14', '14', 70, 10),
        tPoleLocal('21', '21', 30, 90),
        tPoleLocal('22', '22', 70, 90),
      ];
    } else {
      tag = `C${count}`;
      name = 'Módulo';
      terminals = [tPoleLocal('1', '1', 50, 10), tPoleLocal('2', '2', 50, 90)];
    }

    const initialState = category !== 'BOTOEIRA_PULSO_NA' && category !== 'SINALEIRO_LED';

    const newComp: PlacedComponent = {
      id: `comp_${Date.now()}`,
      category,
      tag,
      name,
      x: 80 + (components.length % 3) * 30,
      y: 140 + (components.length % 4) * 30,
      width,
      height,
      state: initialState,
      currentRating,
      lampColor,
      selectorPosition: '0',
      terminals,
    };

    setComponents((prev) => [...prev, newComp]);
    setIsCatalogModalOpen(false);
  };

  const handleRemoveSelectedComponent = () => {
    if (!selectedCompId || components.length <= 2) return;
    setComponents((prev) => prev.filter((c) => c.id !== selectedCompId));
    setCables((prev) => prev.filter((cb) => cb.fromComponentId !== selectedCompId && cb.toComponentId !== selectedCompId));
    setSelectedCompId(null);
  };

  const selectedCompObj = components.find((c) => c.id === selectedCompId);

  return (
    <div style={containerStyle}>
      {/* Barra de Controle Superior */}
      <div style={topControlBarStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => setIsCatalogModalOpen(true)} style={btnOpenCatalogStyle}>
            📦 + Adicionar Componente
          </button>

          <button
            onClick={() => setIsWorkbenchVisible(!isWorkbenchVisible)}
            style={{
              ...btnMeterToggleStyle,
              background: isWorkbenchVisible ? '#166534' : '#991b1b',
              color: '#fff',
              borderColor: isWorkbenchVisible ? '#22c55e' : '#ef4444',
            }}
          >
            {isWorkbenchVisible ? '🔓 Bancada visível' : '🔒 Bancada oculta'}
          </button>

          <button
            onClick={() => setIsMeterActive(!isMeterActive)}
            style={{
              ...btnMeterToggleStyle,
              background: isMeterActive ? '#eab308' : '#1e293b',
              color: isMeterActive ? '#000' : '#facc15',
              borderColor: '#eab308',
            }}
          >
            📟 {isMeterActive ? 'Ocultar Multímetro' : 'Multímetro Digital'}
          </button>

          <button
            onClick={() => setIsTrainingOpen(!isTrainingOpen)}
            style={{
              ...btnMeterToggleStyle,
              background: isTrainingOpen ? '#6a1b9a' : '#2e1065',
              color: '#f3e8ff',
              borderColor: '#a855f7',
            }}
          >
            🎓 {isTrainingOpen ? 'Ocultar Treinamento' : 'Treinamento'}
          </button>
        </div>

        {/* Seletor de Cores de Cabo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#00e676', marginRight: '4px' }}>
            🔌 Cabo 90°:
          </span>

          <button onClick={() => { setActiveCableTool('FORCA_R'); setWiringOrigin(null); }} style={{ ...btnCableSelectStyle, background: activeCableTool === 'FORCA_R' ? '#ef4444' : '#263238', borderColor: '#f87171', color: '#fff' }} title="Fase R (Vermelho)">R</button>
          <button onClick={() => { setActiveCableTool('FORCA_S'); setWiringOrigin(null); }} style={{ ...btnCableSelectStyle, background: activeCableTool === 'FORCA_S' ? '#f97316' : '#263238', borderColor: '#fb923c', color: '#fff' }} title="Fase S (Laranja)">S</button>
          <button onClick={() => { setActiveCableTool('FORCA_T'); setWiringOrigin(null); }} style={{ ...btnCableSelectStyle, background: activeCableTool === 'FORCA_T' ? '#64748b' : '#263238', borderColor: '#60a5fa', color: '#fff' }} title="Fase T (Cinza)">T</button>
          <button onClick={() => { setActiveCableTool('COMANDO_FASE'); setWiringOrigin(null); }} style={{ ...btnCableSelectStyle, background: activeCableTool === 'COMANDO_FASE' ? '#ec4899' : '#263238', borderColor: '#f472b6', color: '#fff' }} title="Condutor de comando (tensão definida pela fonte)">Comando</button>
          <button onClick={() => { setActiveCableTool('COMANDO_NEUTRO'); setWiringOrigin(null); }} style={{ ...btnCableSelectStyle, background: activeCableTool === 'COMANDO_NEUTRO' ? '#06b6d4' : '#263238', borderColor: '#22d3ee', color: '#fff' }} title="Neutro / 0V">0V / N</button>
          <button onClick={() => { setActiveCableTool('TERRA_PE'); setWiringOrigin(null); }} style={{ ...btnCableSelectStyle, background: activeCableTool === 'TERRA_PE' ? '#10b981' : '#263238', borderColor: '#34d399', color: '#fff' }} title="Proteção Terra (PE)">PE Terra</button>
          <button onClick={() => { setActiveCableTool('JUMPER_FECHAMENTO'); setWiringOrigin(null); }} style={{ ...btnCableSelectStyle, background: activeCableTool === 'JUMPER_FECHAMENTO' ? '#eab308' : '#263238', borderColor: '#fde047', color: '#000', fontWeight: 'bold' }} title="Jumper Estrela / Triângulo">⭐/Δ</button>
          <button onClick={() => { setActiveCableTool('CABO_PRETO'); setWiringOrigin(null); }} style={{ ...btnCableSelectStyle, background: activeCableTool === 'CABO_PRETO' ? '#111827' : '#1f2937', borderColor: '#4b5563', color: '#fff' }} title="Preto">Preto</button>
          <button onClick={() => { setActiveCableTool('CABO_BRANCO'); setWiringOrigin(null); }} style={{ ...btnCableSelectStyle, background: activeCableTool === 'CABO_BRANCO' ? '#f8fafc' : '#263238', borderColor: '#e2e8f0', color: activeCableTool === 'CABO_BRANCO' ? '#000' : '#fff' }} title="Branco">Branco</button>
          <button onClick={() => { setActiveCableTool('CABO_CINZA'); setWiringOrigin(null); }} style={{ ...btnCableSelectStyle, background: activeCableTool === 'CABO_CINZA' ? '#64748b' : '#263238', borderColor: '#94a3b8', color: '#fff' }} title="Cinza">Cinza</button>
          <button onClick={() => { setActiveCableTool('CABO_ROXO'); setWiringOrigin(null); }} style={{ ...btnCableSelectStyle, background: activeCableTool === 'CABO_ROXO' ? '#a855f7' : '#263238', borderColor: '#c084fc', color: '#fff' }} title="Roxo">Roxo</button>
          <button onClick={() => { setActiveCableTool('CABO_LARANJA'); setWiringOrigin(null); }} style={{ ...btnCableSelectStyle, background: activeCableTool === 'CABO_LARANJA' ? '#ea580c' : '#263238', borderColor: '#fb923c', color: '#fff' }} title="Laranja">Laranja</button>

          {wiringOrigin && (
            <button onClick={() => { setWiringOrigin(null); setActiveWaypoints([]); }} style={{ ...btnCableSelectStyle, background: '#dc2626', borderColor: '#ef4444', color: '#fff' }}>
              ✕ Cancelar
            </button>
          )}

          <button onClick={() => { setCables([]); setWiringOrigin(null); setActiveWaypoints([]); setSelectedCompId(null); setEditingCableId(null); }} style={btnClearCablesBtnStyle} title="Limpar todos os cabos">🗑️</button>
        </div>
      </div>

      {/* Janela de Treinamento */}
      {isTrainingOpen && (
        <div style={trainingContainerStyle}>
          <div style={trainingHeaderStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>🎓</span>
              <div>
                <strong style={{ fontSize: '13px', color: '#c084fc' }}>
                  CURSO PRÁTICO DE COMANDOS ELÉTRICOS INDUSTRIAIS
                </strong>
                <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block' }}>
                  Normas NR-10 & NR-12 • Partidas Direta, Reversa, Y-Δ, Compensada e Automação de Recalque
                </span>
              </div>
            </div>
            <button onClick={() => setIsTrainingOpen(false)} style={btnCloseTrainingStyle}>✕ Fechar</button>
          </div>

          <div style={trainingBodyGridStyle}>
            <div style={trainingSidebarStyle}>
              <span style={{ fontSize: '10px', color: '#a855f7', fontWeight: 'bold', marginBottom: '6px', display: 'block' }}>
                AULAS DISPONÍVEIS:
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {COMANDOS_LESSONS.map((les) => {
                  const isSelected = les.id === selectedLessonId;
                  return (
                    <button
                      key={les.id}
                      onClick={() => setSelectedLessonId(les.id)}
                      style={{
                        ...btnLessonSelectStyle,
                        background: isSelected ? '#581c87' : '#1e1b4b',
                        borderColor: isSelected ? '#a855f7' : '#312e81',
                        color: isSelected ? '#fff' : '#c7d2fe',
                      }}
                    >
                      <span style={{ fontSize: '9px', color: '#a5b4fc', display: 'block' }}>{les.module}</span>
                      <strong style={{ fontSize: '11px', display: 'block', marginTop: '2px' }}>{les.title}</strong>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={trainingContentStyle}>
              <div style={{ borderBottom: '1px solid #3b0764', paddingBottom: '8px', marginBottom: '8px' }}>
                <span style={badgeModuleStyle}>{activeLesson.module}</span>
                <h3 style={{ fontSize: '15px', color: '#fff', margin: '4px 0 2px 0' }}>{activeLesson.title}</h3>
                <p style={{ fontSize: '11px', color: '#d8b4fe', margin: 0 }}>{activeLesson.description}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                <div style={theoryBlockCardStyle}>
                  <strong style={{ fontSize: '11px', color: '#e9d5ff', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <span>📖</span> Fundamentos & Normas Técnicas:
                  </strong>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '10.5px', color: '#cbd5e1', lineHeight: '1.5' }}>
                    {activeLesson.theory.map((t, idx) => (
                      <li key={idx} style={{ marginBottom: '4px' }}>{t}</li>
                    ))}
                  </ul>
                </div>

                <div style={practiceBlockCardStyle}>
                  <strong style={{ fontSize: '11px', color: '#86efac', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <span>🛠️</span> Roteiro de Montagem na Bancada:
                  </strong>
                  <ol style={{ margin: 0, paddingLeft: '16px', fontSize: '10.5px', color: '#e2e8f0', lineHeight: '1.5' }}>
                    {activeLesson.steps.map((s, idx) => (
                      <li key={idx} style={{ marginBottom: '4px' }}>{s}</li>
                    ))}
                  </ol>

                  <div style={schematicTipBoxStyle}>
                    <strong style={{ fontSize: '10px', color: '#facc15' }}>💡 Diagrama do Circuito:</strong>
                    <div style={{ fontSize: '10px', color: '#fff', marginTop: '2px', fontFamily: 'monospace' }}>
                      {activeLesson.schematicTips}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Multímetro Digital */}
      {isMeterActive && (
        <div style={multimeterContainerStyle}>
          <div style={meterDisplayHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#eab308' }}>FLUKE / WEG TRUE RMS</span>
              {isContinuityBuzzer && (
                <span style={{ fontSize: '11px', color: '#22c55e' }}>🔊 BEEP!</span>
              )}
            </div>
            <span style={{ fontSize: '9px', color: '#94a3b8' }}>CAT III 600V</span>
          </div>

          <div style={meterLcdDisplayStyle}>
            <span style={{ fontSize: '11px', color: '#475569', fontWeight: 'bold', position: 'absolute', top: '4px', right: '8px' }}>
              {meterScale.replace('_', ' ')}
            </span>
            <strong style={{ fontSize: '26px', color: '#0f172a', fontFamily: 'monospace' }}>
              {meterReadout}
            </strong>
          </div>

          <div style={meterScaleSelectorRow}>
            {(['V_AC', 'V_DC', 'CONTINUITY', 'RESISTANCE_OHM', 'DIODE', 'CURRENT_A'] as MultimeterScale[]).map((scale) => (
              <button
                key={scale}
                onClick={() => setMeterScale(scale)}
                style={{
                  ...btnMeterScaleStyle,
                  background: meterScale === scale ? '#eab308' : '#1e293b',
                  color: meterScale === scale ? '#000' : '#cbd5e1',
                  fontWeight: meterScale === scale ? 'bold' : 'normal',
                }}
              >
                {scale === 'V_AC' && 'V~ (AC)'}
                {scale === 'V_DC' && 'V= (DC)'}
                {scale === 'CONTINUITY' && '·))) Bip'}
                {scale === 'RESISTANCE_OHM' && 'Ω Ohm'}
                {scale === 'DIODE' && '->|- Diodo'}
                {scale === 'CURRENT_A' && 'A~ Amp'}
              </button>
            ))}
          </div>

          <div style={meterProbesRow}>
            <button
              onClick={() => setActiveProbeTarget('RED')}
              style={{ ...btnProbeSelectStyle, background: '#ef4444', outline: activeProbeTarget === 'RED' ? '3px solid #fff' : 'none' }}
            >
              Ponta (+) Vermelha
            </button>
            <button
              onClick={() => setActiveProbeTarget('BLACK')}
              style={{ ...btnProbeSelectStyle, background: '#1e293b', border: '1px solid #64748b', outline: activeProbeTarget === 'BLACK' ? '3px solid #fff' : 'none' }}
            >
              Ponta (-) Preta
            </button>
            <button onClick={() => { setRedProbe(null); setBlackProbe(null); }} style={btnResetProbesStyle}>
              Soltar Pontas
            </button>
          </div>
        </div>
      )}

      {/* Catálogo */}
      {isCatalogModalOpen && (
        <div style={modalOverlayStyle} onClick={() => setIsCatalogModalOpen(false)}>
          <div style={modalCardStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>📦</span>
                <h3 style={{ fontSize: '15px', color: '#fff', margin: 0 }}>Biblioteca de Componentes</h3>
              </div>
              <button onClick={() => setIsCatalogModalOpen(false)} style={btnCloseModalStyle}>✕</button>
            </div>

            <div style={filterTabsContainer}>
              <button onClick={() => setCatalogFilter('ALL')} style={{ ...btnFilterTabStyle, background: catalogFilter === 'ALL' ? '#0288d1' : '#1e293b', color: catalogFilter === 'ALL' ? '#fff' : '#94a3b8' }}>Todos</button>
              <button onClick={() => setCatalogFilter('PROTECAO')} style={{ ...btnFilterTabStyle, background: catalogFilter === 'PROTECAO' ? '#0288d1' : '#1e293b', color: catalogFilter === 'PROTECAO' ? '#fff' : '#94a3b8' }}>🛡️ Proteção</button>
              <button onClick={() => setCatalogFilter('COMANDO')} style={{ ...btnFilterTabStyle, background: catalogFilter === 'COMANDO' ? '#0288d1' : '#1e293b', color: catalogFilter === 'COMANDO' ? '#fff' : '#94a3b8' }}>🧲 Comando</button>
              <button onClick={() => setCatalogFilter('ALIMENTACAO')} style={{ ...btnFilterTabStyle, background: catalogFilter === 'ALIMENTACAO' ? '#0288d1' : '#1e293b', color: catalogFilter === 'ALIMENTACAO' ? '#fff' : '#94a3b8' }}>📶 Bornes</button>
              <button onClick={() => setCatalogFilter('SEGURANCA')} style={{ ...btnFilterTabStyle, background: catalogFilter === 'SEGURANCA' ? '#0288d1' : '#1e293b', color: catalogFilter === 'SEGURANCA' ? '#fff' : '#94a3b8' }}>🔒 NR-10/12</button>
              <button onClick={() => setCatalogFilter('CARGAS')} style={{ ...btnFilterTabStyle, background: catalogFilter === 'CARGAS' ? '#0288d1' : '#1e293b', color: catalogFilter === 'CARGAS' ? '#fff' : '#94a3b8' }}>⚙️ Motores</button>
            </div>

            <div style={catalogGridStyle}>
              {filteredCatalog.map((item, idx) => (
                <div key={idx} style={catalogCardItemStyle}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '24px' }}>{item.icon}</span>
                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: '12px', color: '#fff', display: 'block' }}>{item.title}</strong>
                      <p style={{ fontSize: '10px', color: '#94a3b8', margin: '3px 0 8px 0', lineHeight: '1.3' }}>{item.subtitle}</p>
                    </div>
                  </div>
                  <button onClick={() => handleInsertComponentToProject(item.category)} style={btnInsertItemStyle}>➕ Inserir no Painel</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Alertas contextuais */}
      {selectedCompObj ? (
        <div style={{ ...selectedCableAlertBarStyle, borderColor: '#ffd600', background: 'rgba(255, 214, 0, 0.15)', color: '#fff' }}>
          <span>📦 <strong>Selecionado:</strong> {selectedCompObj.name} ({selectedCompObj.tag})</span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={handleRemoveSelectedComponent} style={btnDeleteSingleCableStyle}>❌ Excluir Componente</button>
            <button onClick={() => setSelectedCompId(null)} style={btnDeselectCableStyle}>Fechar</button>
          </div>
        </div>
      ) : wiringOrigin ? (
        <div style={wiringPromptBarStyle}>
          ⚡ Roteamento ativo: <strong>{wiringOrigin.compId}:{wiringOrigin.termId}</strong> ({activeWaypoints.length} curvas em 90° fixadas). Clique na bancada para guiar o cabo ou clique no borne de destino para conectar.
        </div>
      ) : null}

      {/* BANCADA DE COMANDOS ELÉTRICOS */}
      {isWorkbenchVisible ? (
        <div
          ref={panelRef}
          onClick={handlePanelClick}
          onMouseMove={(e) => handleMoveDrag(e.clientX, e.clientY)}
          onMouseUp={handleEndDrag}
          onTouchMove={(e) => {
            if (e.touches.length > 0) {
              handleMoveDrag(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          onTouchEnd={handleEndDrag}
          style={panelMountStyle}
        >
          {/* CAMADA SVG: ROTEAMENTO ORTOGONAL SUAVE 90° */}
          <svg style={svgOverlayStyle}>
            {/* Cabos Concluídos */}
            {cables.map((cb) => {
              const p1 = getTerminalAbsolutePos(cb.fromComponentId, cb.fromTerminalId);
              const p2 = getTerminalAbsolutePos(cb.toComponentId, cb.toTerminalId);

              const allPoints = cb.waypoints && cb.waypoints.length > 0
                ? [p1, ...cb.waypoints, p2]
                : calculateDefaultOrthoRoute(cb.fromComponentId, cb.fromTerminalId, cb.toComponentId, cb.toTerminalId);

              const pathString = renderOrthogonalSmoothPath(allPoints);
              const color = CABLE_COLORS[cb.cableType] || '#fff';

              return (
                <g
                  key={cb.id}
                  style={{ pointerEvents: 'stroke' }}
                  onDoubleClick={(e) => handleCableDoubleClick(e, cb.id)}
                >
                  <path d={pathString} fill="none" stroke="transparent" strokeWidth="24" style={{ cursor: 'pointer' }} />
                  <path d={pathString} fill="none" stroke="rgba(0,0,0,0.65)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d={pathString} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              );
            })}

            {/* Cabo Elástico em 90° Sendo Traçado */}
            {wiringOrigin && (
              (() => {
                const pStart = getTerminalAbsolutePos(wiringOrigin.compId, wiringOrigin.termId);
                const currentPts = [pStart, ...activeWaypoints];
                if (mousePos) currentPts.push(mousePos);

                const activePath = renderOrthogonalSmoothPath(currentPts);
                const activeColor = CABLE_COLORS[activeCableTool || 'COMANDO_FASE'];

                return (
                  <g>
                    <path
                      d={activePath}
                      fill="none"
                      stroke={activeColor}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="6,4"
                    />
                  </g>
                );
              })()
            )}
          </svg>

          {/* JANELA FLUTUANTE (MODAL): DUPLO CLIQUE NO CABO */}
          {editingCableId && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                left: `${Math.min(modalPos.x, 850)}px`,
                top: `${Math.min(modalPos.y, 800)}px`,
                backgroundColor: '#0f172a',
                border: '2px solid #38bdf8',
                borderRadius: '10px',
                padding: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.9)',
                zIndex: 50,
                width: '240px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid #334155', paddingBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#38bdf8' }}>CONFIGURAÇÃO DO CABO</span>
                <button onClick={() => setEditingCableId(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '12px' }}>✕</button>
              </div>

              <span style={{ fontSize: '10px', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
                Mudar Cor do Condutor:
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', marginBottom: '10px' }}>
                {(Object.keys(CABLE_COLORS) as CableType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleChangeCableColor(type)}
                    style={{
                      backgroundColor: CABLE_COLORS[type],
                      height: '22px',
                      borderRadius: '4px',
                      border: '1px solid #fff',
                      cursor: 'pointer',
                    }}
                    title={type}
                  />
                ))}
              </div>

              <button
                onClick={handleDeleteCable}
                style={{
                  width: '100%',
                  backgroundColor: '#dc2626',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 0',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                🗑️ Excluir Cabo
              </button>
            </div>
          )}

          {/* Renderizador de Componentes */}
          {components.map((comp) => {
            const isSelected = selectedCompId === comp.id;
            const isGrid = comp.category.startsWith('REDE_');
            const isQ = comp.category.startsWith('DISJUNTOR');
            const isK = comp.category === 'CONTATOR_TRIPOLAR';
            const isF = comp.category === 'RELE_TERMICO';
            const isRPF = comp.category === 'RELE_FALTA_FASE';
            const isAux = comp.category === 'BLOCO_AUXILIAR';
            const isMotor = comp.category === 'MOTOR_TRIFASICO_6P';
            const isMotorMono = comp.category === 'MOTOR_MONOFASICO_CAPACITOR';
            const isCapacitor = comp.category === 'CAPACITOR_ELETROLITICO';
            const isResistor = comp.category === 'RESISTOR_FREINAGEM';
            const isSelector = comp.category === 'CHAVE_SELETORA_3POS';
            const isRegua = comp.category === 'REGUA_BORNES';
            const isPente = comp.category === 'BARRAMENTO_PENTE';
            const isLamp = comp.category === 'SINALEIRO_LED';
            const isTrafo = comp.category === 'TRANSFORMADOR_ISOLADOR';
            const isLoto = comp.category === 'SECCIONADORA_LOTO';
            const isSafeRelay = comp.category === 'RELE_SEGURANCA_NR12';
            const isInterlock = comp.category === 'CHAVE_INTERTRAVAMENTO_NR12';
            const isBtnNA = comp.category === 'BOTOEIRA_PULSO_NA';
            const isBtnNF = comp.category === 'BOTOEIRA_COGUMELO_NF';

            return (
              <div
                key={comp.id}
                onMouseDown={(e) => handleStartDrag(e.clientX, e.clientY, comp.id)}
                onTouchStart={(e) => {
                  if (e.touches.length > 0) {
                    handleStartDrag(e.touches[0].clientX, e.touches[0].clientY, comp.id);
                  }
                }}
                onDoubleClick={(e) => handleDoubleClickComp(e, comp.id)}
                style={{
                  position: 'absolute',
                  left: `${comp.x}px`,
                  top: `${comp.y}px`,
                  width: `${comp.width}px`,
                  height: `${comp.height}px`,
                  cursor: 'grab',
                  userSelect: 'none',
                  touchAction: 'none',
                  zIndex: 2,
                  boxSizing: 'border-box',
                }}
              >
                <div style={tagSidebarFloatingBox}>
                  <span style={{ fontSize: '7px', color: '#90a4ae', fontWeight: 'bold' }}>TAG</span>
                  <input
                    type="text"
                    value={comp.tag}
                    onChange={(e) => handleTagInputChange(comp.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    style={tagInputFieldStyle}
                  />

                  {isQ && comp.currentRating !== undefined && (
                    <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span style={{ fontSize: '6px', color: '#38bdf8', fontWeight: 'bold' }}>AMP</span>
                      <select
                        value={comp.currentRating}
                        onChange={(e) => handleCurrentRatingChange(comp.id, Number(e.target.value))}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        style={selectAmperageStyle}
                      >
                        {AMPERAGE_OPTIONS.map((amp) => (
                          <option key={amp} value={amp}>
                            {String(amp) + 'A'}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {isLamp && (
                    <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span style={{ fontSize: '6px', color: '#ffd600', fontWeight: 'bold' }}>
                        COR {comp.state ? `(${LAMP_COLOR_CONFIG[comp.lampColor || 'VERDE'].label} ACESO)` : ''}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <span
                          title={comp.state ? 'Energizado' : 'Desenergizado'}
                          style={{
                            width: '7px',
                            height: '7px',
                            borderRadius: '50%',
                            flexShrink: 0,
                            backgroundColor: comp.state
                              ? LAMP_COLOR_CONFIG[comp.lampColor || 'VERDE'].on
                              : LAMP_COLOR_CONFIG[comp.lampColor || 'VERDE'].off,
                            boxShadow: comp.state ? LAMP_COLOR_CONFIG[comp.lampColor || 'VERDE'].glow : 'none',
                          }}
                        />
                        <select
                          value={comp.lampColor || 'VERDE'}
                          onChange={(e) => handleLampColorChange(comp.id, e.target.value as LampColor)}
                          onClick={(e) => e.stopPropagation()}
                          onMouseDown={(e) => e.stopPropagation()}
                          style={{ ...selectAmperageStyle, color: '#facc15' }}
                        >
                          <option value="VERDE">🟢 Verde</option>
                          <option value="VERMELHO">🔴 Vermelho</option>
                          <option value="AMARELO">🟡 Amarelo</option>
                          <option value="AZUL">🔵 Azul</option>
                          <option value="BRANCO">⚪ Branco</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {isQ && comp.category === 'DISJUNTOR_MOTOR' && (
                  <RealisticMotorBreaker
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    name={comp.name}
                    currentRating={comp.currentRating}
                    state={comp.state}
                    isSelected={isSelected}
                    onToggle={() => {
                      setComponents((prev) =>
                        prev.map((c) => (c.id === comp.id ? { ...c, state: !c.state } : c))
                      );
                    }}
                  />
                )}

                {isQ && comp.category !== 'DISJUNTOR_MOTOR' && (
                  <RealisticMiniBreaker
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    poles={comp.category === 'DISJUNTOR_BIPOLAR' ? 2 : 1}
                    currentRating={comp.currentRating}
                    state={comp.state}
                    isSelected={isSelected}
                    onToggle={() => {
                      setComponents((prev) =>
                        prev.map((c) => (c.id === comp.id ? { ...c, state: !c.state } : c))
                      );
                    }}
                  />
                )}

                {isK && (
                  <RealisticContactor
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    name={comp.name}
                    state={comp.state}
                    isSelected={isSelected}
                  />
                )}

                {isF && (
                  <RealisticThermalRelay
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    name={comp.name}
                    tripped={comp.tripped}
                    isSelected={isSelected}
                    onTripToggle={() => {
                      setComponents((prev) =>
                        prev.map((c) => (c.id === comp.id ? { ...c, tripped: !c.tripped } : c))
                      );
                    }}
                  />
                )}

                {isSelector && (
                  <RealisticSelectorSwitch
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    position={comp.selectorPosition}
                    isSelected={isSelected}
                    onToggle={() => handleSelectorToggle(comp.id)}
                  />
                )}

                {isLamp && (
                  <RealisticPilotLight
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    state={comp.state}
                    color={comp.lampColor}
                    isSelected={isSelected}
                  />
                )}

                {isBtnNA && (
                  <RealisticPushButton
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    state={comp.state}
                    isSelected={isSelected}
                    onPress={() => setComponents((prev) => prev.map((c) => (c.id === comp.id ? { ...c, state: true } : c)))}
                    onRelease={() => setComponents((prev) => prev.map((c) => (c.id === comp.id ? { ...c, state: false } : c)))}
                  />
                )}

                {isBtnNF && (
                  <RealisticEmergencyButton
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    state={comp.state}
                    isSelected={isSelected}
                    onToggle={() => setComponents((prev) => prev.map((c) => (c.id === comp.id ? { ...c, state: !c.state } : c)))}
                  />
                )}

                {isPente && (
                  <RealisticBusbar
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    isSelected={isSelected}
                  />
                )}

                {isRegua && (
                  <RealisticTerminalBlock
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    isSelected={isSelected}
                  />
                )}

                {isGrid && comp.category === 'REDE_TRIFASICA' && (
                  <RealisticGrid3P
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    name={comp.name}
                    isSelected={isSelected}
                  />
                )}

                {isGrid && comp.category === 'REDE_MONOFASICA' && (
                  <RealisticGrid1P
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    name={comp.name}
                    isSelected={isSelected}
                  />
                )}

                {isTrafo && (
                  <RealisticTransformer
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    isSelected={isSelected}
                  />
                )}

                {isLoto && (
                  <RealisticLotoSwitch
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    state={comp.state}
                    isSelected={isSelected}
                    onToggle={() => setComponents((prev) => prev.map((c) => (c.id === comp.id ? { ...c, state: !c.state } : c)))}
                  />
                )}

                {isSafeRelay && (
                  <RealisticSafetyRelay
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    state={comp.state}
                    tripped={comp.tripped}
                    isSelected={isSelected}
                    onTripToggle={() => setComponents((prev) => prev.map((c) => (c.id === comp.id ? { ...c, tripped: !c.tripped } : c)))}
                  />
                )}

                {isInterlock && (
                  <RealisticInterlockSwitch
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    state={comp.state}
                    isSelected={isSelected}
                    onToggle={() => setComponents((prev) => prev.map((c) => (c.id === comp.id ? { ...c, state: !c.state } : c)))}
                  />
                )}

                {isRPF && (
                  <RealisticPhaseFailureRelay
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    state={comp.state}
                    tripped={comp.tripped}
                    isSelected={isSelected}
                  />
                )}

                {isAux && (
                  <RealisticAuxBlock
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    state={comp.state}
                    isSelected={isSelected}
                  />
                )}

                {isMotor && (
                  <RealisticMotor3Phase
                    rotationDirection={comp.rotationDirection}
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    name={comp.name}
                    state={comp.state}
                    isSelected={isSelected}
                  />
                )}

                {isMotorMono && (
                  <RealisticMotorSingle
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    name={comp.name}
                    state={comp.state}
                    isSelected={isSelected}
                  />
                )}

                {isCapacitor && (
                  <RealisticCapacitor
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    isSelected={isSelected}
                  />
                )}

                {isResistor && (
                  <RealisticBrakingResistor
                    width={comp.width}
                    height={comp.height}
                    tag={comp.tag}
                    isSelected={isSelected}
                  />
                )}

                {comp.terminals?.map((t) => {
                  const isOrigin = wiringOrigin?.compId === comp.id && wiringOrigin?.termId === t.id;
                  const isRedProbeAttached = redProbe?.compId === comp.id && redProbe?.termId === t.id;
                  const isBlackProbeAttached = blackProbe?.compId === comp.id && blackProbe?.termId === t.id;

                  return (
                    <div
                      key={t.id}
                      onClick={(e) => handleTerminalClick(e, comp.id, t.id)}
                      onTouchEnd={(e) => handleTerminalClick(e, comp.id, t.id)}
                      onMouseDown={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                      style={{
                        ...screwPoleStyle,
                        left: `${t.relX}%`,
                        top: `${t.relY}%`,
                        borderColor: isRedProbeAttached
                          ? '#ef4444'
                          : isBlackProbeAttached
                          ? '#000'
                          : isOrigin
                          ? '#00e676'
                          : '#94a3b8',
                        background: isRedProbeAttached
                          ? '#ef4444'
                          : isBlackProbeAttached
                          ? '#0f172a'
                          : isOrigin
                          ? '#00e676'
                          : '#334155',
                        boxShadow: isRedProbeAttached
                          ? '0 0 10px #ef4444'
                          : isBlackProbeAttached
                          ? '0 0 10px #000'
                          : '0 2px 4px rgba(0,0,0,0.4)',
                      }}
                      title={`Borne ${t.name}`}
                    >
                      <span style={terminalSubscriptLabel}>{t.name}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ padding: '50px', textAlign: 'center', color: '#94a3b8', background: '#13171d', borderRadius: '10px', border: '1px dashed #334155' }}>
          🔒 <strong>Bancada oculta.</strong> Clique no botão no topo para liberar a bancada.
        </div>
      )}

      {/* Visualizador de Motor Inferior */}
      <div style={bottomVisualizerRowStyle}>
        <div style={{ flex: '1 1 360px' }}>
          <MotorVisualizer loadTorquePercent={25} rotationDirection={motorDirection} />
        </div>

        <div style={guideCardStyle}>
          <strong style={{ fontSize: '12px', color: '#00e676' }}>
            ⚡ Roteamento Ortogonal em 90° e Edição Dinâmica de Cabos:
          </strong>
          <ul style={{ fontSize: '11px', color: '#cfd8dc', margin: '6px 0 0 16px', lineHeight: '1.6' }}>
            <li>
              <strong>Traçado em 90°:</strong> Clique no borne inicial, clique em qualquer ponto da bancada para fixar curvas em ângulo reto (sem quina viva de caixa) e clique no borne final.
            </li>
            <li>
              <strong>Dois Cliques no Cabo:</strong> Dê dois cliques em cima de qualquer cabo para abrir a janela de alteração de cor ou exclusão imediata.
            </li>
            <li>
              <strong>Cancelamento Rápido:</strong> Pressione a tecla <strong>ESC</strong> para cancelar o cabo em andamento.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  background: '#0a0d11',
  border: '1px solid #232b36',
  borderRadius: '12px',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
  boxSizing: 'border-box',
};

const topControlBarStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#13171d',
  border: '1px solid #263238',
  borderRadius: '8px',
  padding: '8px 12px',
  flexWrap: 'wrap',
  gap: '8px',
};

const btnOpenCatalogStyle: React.CSSProperties = {
  background: '#0288d1',
  border: '1px solid #29b6f6',
  color: '#fff',
  borderRadius: '6px',
  padding: '7px 14px',
  fontSize: '12px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const btnMeterToggleStyle: React.CSSProperties = {
  border: '1px solid',
  borderRadius: '6px',
  padding: '7px 14px',
  fontSize: '12px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
};

const trainingContainerStyle: React.CSSProperties = {
  background: '#150d2a',
  border: '2px solid #a855f7',
  borderRadius: '12px',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  boxShadow: '0 8px 30px rgba(168, 85, 247, 0.2)',
};

const trainingHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #3b0764',
  paddingBottom: '8px',
};

const btnCloseTrainingStyle: React.CSSProperties = {
  background: '#3b0764',
  border: '1px solid #7e22ce',
  color: '#e9d5ff',
  borderRadius: '6px',
  padding: '4px 10px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const trainingBodyGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '260px 1fr',
  gap: '12px',
};

const trainingSidebarStyle: React.CSSProperties = {
  background: '#0e081c',
  border: '1px solid #3b0764',
  borderRadius: '8px',
  padding: '8px',
  maxHeight: '380px',
  overflowY: 'auto',
};

const btnLessonSelectStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'left',
  padding: '8px',
  borderRadius: '6px',
  border: '1px solid',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
};

const trainingContentStyle: React.CSSProperties = {
  background: '#1f1338',
  border: '1px solid #4c1d95',
  borderRadius: '8px',
  padding: '12px',
  maxHeight: '380px',
  overflowY: 'auto',
};

const badgeModuleStyle: React.CSSProperties = {
  background: '#6b21a8',
  color: '#f3e8ff',
  fontSize: '9px',
  fontWeight: 'bold',
  padding: '2px 8px',
  borderRadius: '4px',
  display: 'inline-block',
};

const theoryBlockCardStyle: React.CSSProperties = {
  background: '#160b29',
  border: '1px solid #581c87',
  borderRadius: '6px',
  padding: '10px',
};

const practiceBlockCardStyle: React.CSSProperties = {
  background: '#09211c',
  border: '1px solid #065f46',
  borderRadius: '6px',
  padding: '10px',
};

const schematicTipBoxStyle: React.CSSProperties = {
  background: '#041712',
  border: '1px dashed #10b981',
  borderRadius: '4px',
  padding: '6px 8px',
  marginTop: '8px',
};

const multimeterContainerStyle: React.CSSProperties = {
  background: '#090d16',
  border: '2px solid #eab308',
  borderRadius: '10px',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  boxShadow: '0 8px 24px rgba(234, 179, 8, 0.2)',
};

const meterDisplayHeader: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const meterLcdDisplayStyle: React.CSSProperties = {
  position: 'relative',
  background: '#94a3b8',
  border: '2px solid #475569',
  borderRadius: '6px',
  padding: '14px 12px 6px 12px',
  textAlign: 'center',
  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.4)',
};

const meterScaleSelectorRow: React.CSSProperties = {
  display: 'flex',
  gap: '6px',
  flexWrap: 'wrap',
};

const btnMeterScaleStyle: React.CSSProperties = {
  border: '1px solid #475569',
  borderRadius: '4px',
  padding: '4px 8px',
  fontSize: '10px',
  cursor: 'pointer',
};

const meterProbesRow: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  flexWrap: 'wrap',
};

const btnProbeSelectStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '4px',
  color: '#fff',
  padding: '4px 8px',
  fontSize: '10px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const btnResetProbesStyle: React.CSSProperties = {
  background: '#334155',
  border: 'none',
  borderRadius: '4px',
  color: '#94a3b8',
  padding: '4px 8px',
  fontSize: '10px',
  cursor: 'pointer',
  marginLeft: 'auto',
};

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.8)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  padding: '12px',
};

const modalCardStyle: React.CSSProperties = {
  background: '#14181f',
  border: '1px solid #2d3748',
  borderRadius: '14px',
  width: '100%',
  maxWidth: '850px',
  maxHeight: '88vh',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
  overflow: 'hidden',
};

const modalHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '14px 16px',
  borderBottom: '1px solid #232b36',
  background: '#11151a',
};

const btnCloseModalStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#90a4ae',
  fontSize: '18px',
  cursor: 'pointer',
  padding: '4px',
};

const filterTabsContainer: React.CSSProperties = {
  display: 'flex',
  gap: '6px',
  padding: '8px 14px',
  borderBottom: '1px solid #232b36',
  flexWrap: 'wrap',
  background: '#0d1117',
};

const btnFilterTabStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '6px',
  padding: '5px 10px',
  fontSize: '10px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const catalogGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: '10px',
  padding: '12px 14px',
  overflowY: 'auto',
  maxHeight: 'calc(85vh - 140px)',
};

const catalogCardItemStyle: React.CSSProperties = {
  background: '#1a202c',
  border: '1px solid #2d3748',
  borderRadius: '10px',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const btnInsertItemStyle: React.CSSProperties = {
  background: '#00e676',
  border: 'none',
  borderRadius: '6px',
  color: '#000',
  padding: '7px 10px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
  width: '100%',
};

const selectedCableAlertBarStyle: React.CSSProperties = {
  background: 'rgba(0, 230, 118, 0.15)',
  border: '1px solid #00e676',
  borderRadius: '6px',
  padding: '6px 12px',
  fontSize: '11px',
  color: '#b9f6ca',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '8px',
};

const btnDeleteSingleCableStyle: React.CSSProperties = {
  background: '#b71c1c',
  border: 'none',
  borderRadius: '4px',
  color: '#fff',
  padding: '3px 8px',
  fontSize: '10px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const btnDeselectCableStyle: React.CSSProperties = {
  background: '#37474f',
  border: 'none',
  borderRadius: '4px',
  color: '#eceff1',
  padding: '3px 8px',
  fontSize: '10px',
  cursor: 'pointer',
};

const btnCableSelectStyle: React.CSSProperties = {
  border: '1px solid',
  borderRadius: '4px',
  padding: '4px 7px',
  fontSize: '10px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const btnClearCablesBtnStyle: React.CSSProperties = {
  background: '#7f1d1d',
  border: '1px solid #ef4444',
  color: '#fff',
  borderRadius: '4px',
  padding: '4px 8px',
  fontSize: '10px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const wiringPromptBarStyle: React.CSSProperties = {
  background: 'rgba(2, 136, 209, 0.15)',
  border: '1px solid #0288d1',
  borderRadius: '6px',
  padding: '6px 12px',
  fontSize: '11px',
  color: '#81d4fa',
};

const panelMountStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '1100px',
  background: 'repeating-linear-gradient(0deg, #1e2630, #1e2630 30px, #171d24 30px, #171d24 60px)',
  border: '2px solid #374151',
  borderRadius: '10px',
  overflowY: 'auto',
  overflowX: 'hidden',
  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)',
  touchAction: 'none',
};

const svgOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: 4,
};

const tagSidebarFloatingBox: React.CSSProperties = {
  position: 'absolute',
  top: '4px',
  left: 'calc(100% + 4px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '#13171d',
  border: '1px solid #374151',
  borderRadius: '4px',
  padding: '2px',
  zIndex: 4,
};

const tagInputFieldStyle: React.CSSProperties = {
  width: '38px',
  background: '#0d1117',
  border: '1px solid #0288d1',
  color: '#00e676',
  fontSize: '8px',
  fontWeight: 'bold',
  borderRadius: '3px',
  padding: '1px',
  textAlign: 'center',
  outline: 'none',
};

const selectAmperageStyle: React.CSSProperties = {
  background: '#0d1117',
  border: '1px solid #334155',
  color: '#38bdf8',
  fontSize: '7px',
  fontWeight: 'bold',
  borderRadius: '2px',
  padding: '1px',
  outline: 'none',
};

const screwPoleStyle: React.CSSProperties = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  width: '13px',
  height: '13px',
  borderRadius: '50%',
  border: '1.5px solid',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
};

const terminalSubscriptLabel: React.CSSProperties = {
  position: 'absolute',
  bottom: '-11px',
  fontSize: '7px',
  color: '#fff',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  background: 'rgba(0,0,0,0.7)',
  padding: '0 2px',
  borderRadius: '2px',
};

const bottomVisualizerRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
};

const guideCardStyle: React.CSSProperties = {
  background: '#13171d',
  border: '1px solid #232b36',
  borderRadius: '8px',
  padding: '12px',
  flex: '1 1 300px',
  display: 'flex',
  flexDirection: 'column',
};
