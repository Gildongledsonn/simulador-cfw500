import React, { useState, useRef, useEffect } from 'react';
import { useInverter } from '../context/InverterContext';
import { MotorVisualizer } from './MotorVisualizer';
import { DisjuntorWeg3D } from './DisjuntorWeg3D';

export type ComponentCategory =
  | 'REDE_TRIFASICA'
  | 'REDE_MONOFASICA'
  | 'TRANSFORMADOR_ISOLADOR'
  | 'SECCIONADORA_LOTO'
  | 'RELE_SEGURANCA_NR12'
  | 'CHAVE_INTERTRAVAMENTO_NR12'
  | 'DISJUNTOR_MOTOR'
  | 'DISJUNTOR_BIPOLAR'
  | 'DISJUNTOR_MONO_WEG_3D'
  | 'CONTATOR_TRIPOLAR'
  | 'BLOCO_AUXILIAR'
  | 'RELE_TERMICO'
  | 'RELE_FALTA_FASE'
  | 'TEMPORIZADOR_TON'
  | 'BOTOEIRA_PULSO_NA'
  | 'BOTOEIRA_COGUMELO_NF'
  | 'SINALEIRO_LED'
  | 'MOTOR_TRIFASICO_6P';

export interface TerminalPole {
  id: string;
  name: string;
  relX: number;
  relY: number;
  type: 'FORCA' | 'COMANDO' | 'TERRA';
}

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
  terminals: TerminalPole[];
}

export interface Point2D {
  x: number;
  y: number;
}

export interface CableConnection {
  id: string;
  fromComponentId: string;
  fromTerminalId: string;
  toComponentId: string;
  toTerminalId: string;
  cableType: 'FORCA_R' | 'FORCA_S' | 'FORCA_T' | 'COMANDO_FASE' | 'COMANDO_NEUTRO' | 'TERRA_PE' | 'JUMPER_FECHAMENTO';
  customWaypoints?: Point2D[];
}

const CABLE_COLORS: Record<string, string> = {
  FORCA_R: '#d32f2f',
  FORCA_S: '#f57c00',
  FORCA_T: '#1976d2',
  COMANDO_FASE: '#e91e63',
  COMANDO_NEUTRO: '#00e5ff',
  TERRA_PE: '#00e676',
  JUMPER_FECHAMENTO: '#ffd600',
};

interface CatalogItem {
  category: ComponentCategory;
  title: string;
  subtitle: string;
  icon: string;
  group: 'ALIMENTACAO' | 'PROTECAO' | 'COMANDO' | 'SEGURANCA' | 'CARGAS';
}

const CATALOG_ITEMS: CatalogItem[] = [
  {
    category: 'DISJUNTOR_MONO_WEG_3D',
    title: 'Disjuntor Monopolar WEG MDW-C16 (3D Realista)',
    subtitle: 'Minidisjuntor DIN 16A Curva C com alavanca mecânica e inspeção 3D',
    icon: '⚡',
    group: 'PROTECAO',
  },
  {
    category: 'REDE_TRIFASICA',
    title: 'Rede Trifásica 380V (R,S,T,N,PE)',
    subtitle: 'Fonte de alimentação principal trifásica com neutro e aterramento',
    icon: '⚡',
    group: 'ALIMENTACAO',
  },
  {
    category: 'REDE_MONOFASICA',
    title: 'Rede Monofásica 220V (F,N,PE)',
    subtitle: 'Alimentação monofásica para circuitos auxiliares e residenciais',
    icon: '🔌',
    group: 'ALIMENTACAO',
  },
  {
    category: 'SECCIONADORA_LOTO',
    title: 'Chave Seccionadora LOTO (NR-10)',
    subtitle: 'Bloqueio mecânico cadeado para desenergização segura',
    icon: '🛑',
    group: 'SEGURANCA',
  },
  {
    category: 'TRANSFORMADOR_ISOLADOR',
    title: 'Trafo Isolador 220V/24V (NR-10)',
    subtitle: 'Separação galvânica e Extra Baixa Tensão de Segurança (SELV/PELV)',
    icon: '⚡',
    group: 'SEGURANCA',
  },
  {
    category: 'RELE_SEGURANCA_NR12',
    title: 'Relé de Segurança Duplo Canal (NR-12)',
    subtitle: 'Monitoramento Categoria 4 / PLe para paradas de emergência',
    icon: '🛡️',
    group: 'SEGURANCA',
  },
  {
    category: 'CHAVE_INTERTRAVAMENTO_NR12',
    title: 'Sensor de Proteção / Intertravamento (NR-12)',
    subtitle: 'Chave monitora de portas e proteções móveis com contatos 11-12 e 21-22',
    icon: '🔒',
    group: 'SEGURANCA',
  },
  {
    category: 'DISJUNTOR_MOTOR',
    title: 'Disjuntor-Motor WEG MPW',
    subtitle: 'Proteção termomagnética ajustável para partidas de motores',
    icon: '🎛️',
    group: 'PROTECAO',
  },
  {
    category: 'DISJUNTOR_BIPOLAR',
    title: 'Disjuntor Bipolar MDW 2P',
    subtitle: 'Proteção de circuitos de comando e comando geral 220V',
    icon: '⚡',
    group: 'PROTECAO',
  },
  {
    category: 'RELE_TERMICO',
    title: 'Relé Térmico de Sobrecarga RW',
    subtitle: 'Proteção de sobrecorrente com contatos auxiliares 95-96 e 97-98',
    icon: '🔥',
    group: 'PROTECAO',
  },
  {
    category: 'RELE_FALTA_FASE',
    title: 'Relé Falta de Fase RPF',
    subtitle: 'Monitor de assimetria e presença das três fases R, S, T',
    icon: '📡',
    group: 'PROTECAO',
  },
  {
    category: 'CONTATOR_TRIPOLAR',
    title: 'Contator de Potência WEG CWM',
    subtitle: 'Chave magnética tripolar para comando de cargas e motores',
    icon: '🧲',
    group: 'COMANDO',
  },
  {
    category: 'BLOCO_AUXILIAR',
    title: 'Bloco de Contatos Auxiliares Frontal',
    subtitle: 'Contatos extras 13-14 (NA) e 21-22 (NF) conjugados por TAG',
    icon: '📑',
    group: 'COMANDO',
  },
  {
    category: 'TEMPORIZADOR_TON',
    title: 'Relé Temporizador Eletrônico (TON)',
    subtitle: 'Retardo na energização com contatos comutadores 15-16-18',
    icon: '⏱️',
    group: 'COMANDO',
  },
  {
    category: 'BOTOEIRA_PULSO_NA',
    title: 'Botoeira Pulsadora Liga (Verde NA)',
    subtitle: 'Botão momentâneo de comando (bornes 3-4 NO)',
    icon: '🟢',
    group: 'COMANDO',
  },
  {
    category: 'BOTOEIRA_COGUMELO_NF',
    title: 'Botoeira de Emergência Cogumelo (Vermelho NF)',
    subtitle: 'Botão de parada imediata com retenção mecânica',
    icon: '🔴',
    group: 'COMANDO',
  },
  {
    category: 'SINALEIRO_LED',
    title: 'Sinalizador Luminoso LED',
    subtitle: 'Lâmpada de indicação visual de operação e falha',
    icon: '💡',
    group: 'COMANDO',
  },
  {
    category: 'MOTOR_TRIFASICO_6P',
    title: 'Motor de Indução Trifásico WEG W22 (6 Pontas)',
    subtitle: 'Motor com caixa de bornes aberta para fechamento Estrela / Triângulo',
    icon: '⚙️',
    group: 'CARGAS',
  },
];

export const ComandosEletricosWorkbench: React.FC = () => {
  const { state: inverterState, dispatch } = useInverter();

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
      id: 'comp_q_mono',
      category: 'DISJUNTOR_MONO_WEG_3D',
      tag: 'Q0',
      name: 'Disj. WEG C16',
      x: 30,
      y: 150,
      width: 75,
      height: 160,
      state: true,
      terminals: [
        { id: '1', name: '1 (L)', relX: 50, relY: 8, type: 'COMANDO' },
        { id: '2', name: '2 (Carga)', relX: 50, relY: 92, type: 'COMANDO' },
      ],
    },
    {
      id: 'comp_q1',
      category: 'DISJUNTOR_MOTOR',
      tag: 'Q1',
      name: 'Disjuntor MPW',
      x: 30,
      y: 340,
      width: 100,
      height: 170,
      state: true,
      terminals: [
        { id: '1L1', name: '1/L1', relX: 20, relY: 8, type: 'FORCA' },
        { id: '3L2', name: '3/L2', relX: 50, relY: 8, type: 'FORCA' },
        { id: '5L3', name: '5/L3', relX: 80, relY: 8, type: 'FORCA' },
        { id: '2T1', name: '2/T1', relX: 20, relY: 92, type: 'FORCA' },
        { id: '4T2', name: '4/T2', relX: 50, relY: 92, type: 'FORCA' },
        { id: '6T3', name: '6/T3', relX: 80, relY: 92, type: 'FORCA' },
      ],
    },
    {
      id: 'comp_k1',
      category: 'CONTATOR_TRIPOLAR',
      tag: 'K1',
      name: 'Contator CWM25',
      x: 30,
      y: 550,
      width: 110,
      height: 180,
      state: false,
      terminals: [
        { id: '1L1', name: '1/L1', relX: 18, relY: 8, type: 'FORCA' },
        { id: '3L2', name: '3/L2', relX: 38, relY: 8, type: 'FORCA' },
        { id: '5L3', name: '5/L3', relX: 58, relY: 8, type: 'FORCA' },
        { id: '13NO', name: '13', relX: 82, relY: 8, type: 'COMANDO' },
        { id: 'A1', name: 'A1', relX: 82, relY: 28, type: 'COMANDO' },
        { id: '2T1', name: '2/T1', relX: 18, relY: 92, type: 'FORCA' },
        { id: '4T2', name: '4/T2', relX: 38, relY: 92, type: 'FORCA' },
        { id: '6T3', name: '6/T3', relX: 58, relY: 92, type: 'FORCA' },
        { id: '14NO', name: '14', relX: 82, relY: 92, type: 'COMANDO' },
        { id: 'A2', name: 'A2', relX: 82, relY: 72, type: 'COMANDO' },
      ],
    },
    {
      id: 'comp_f1',
      category: 'RELE_TERMICO',
      tag: 'F1',
      name: 'Relé Térmico RW',
      x: 30,
      y: 770,
      width: 120,
      height: 190,
      state: true,
      tripped: false,
      terminals: [
        { id: '1L1', name: '1/L1', relX: 20, relY: 8, type: 'FORCA' },
        { id: '3L2', name: '3/L2', relX: 50, relY: 8, type: 'FORCA' },
        { id: '5L3', name: '5/L3', relX: 80, relY: 8, type: 'FORCA' },
        { id: '95NC', name: '95', relX: 18, relY: 58, type: 'COMANDO' },
        { id: '96NC', name: '96', relX: 40, relY: 58, type: 'COMANDO' },
        { id: '97NO', name: '97', relX: 62, relY: 58, type: 'COMANDO' },
        { id: '98NO', name: '98', relX: 84, relY: 58, type: 'COMANDO' },
        { id: '2T1', name: '2/T1', relX: 20, relY: 92, type: 'FORCA' },
        { id: '4T2', name: '4/T2', relX: 50, relY: 92, type: 'FORCA' },
        { id: '6T3', name: '6/T3', relX: 80, relY: 92, type: 'FORCA' },
      ],
    },
    {
      id: 'comp_mot3p',
      category: 'MOTOR_TRIFASICO_6P',
      tag: 'M1',
      name: 'Motor W22 6 Pontas',
      x: 30,
      y: 990,
      width: 170,
      height: 180,
      state: false,
      terminals: [
        { id: 'U1', name: 'U1', relX: 25, relY: 28, type: 'FORCA' },
        { id: 'V1', name: 'V1', relX: 50, relY: 28, type: 'FORCA' },
        { id: 'W1', name: 'W1', relX: 75, relY: 28, type: 'FORCA' },
        { id: 'W2', name: 'W2', relX: 25, relY: 72, type: 'FORCA' },
        { id: 'U2', name: 'U2', relX: 50, relY: 72, type: 'FORCA' },
        { id: 'V2', name: 'V2', relX: 75, relY: 72, type: 'FORCA' },
      ],
    },
    {
      id: 'comp_rpf',
      category: 'RELE_FALTA_FASE',
      tag: 'RPF1',
      name: 'Relé Falha de Fase',
      x: 230,
      y: 170,
      width: 95,
      height: 160,
      state: true,
      tripped: false,
      terminals: [
        { id: 'L1', name: 'L1', relX: 20, relY: 8, type: 'FORCA' },
        { id: 'L2', name: 'L2', relX: 50, relY: 8, type: 'FORCA' },
        { id: 'L3', name: 'L3', relX: 80, relY: 8, type: 'FORCA' },
        { id: '11C', name: '11', relX: 25, relY: 92, type: 'COMANDO' },
        { id: '12NC', name: '12', relX: 55, relY: 92, type: 'COMANDO' },
        { id: '14NO', name: '14', relX: 85, relY: 92, type: 'COMANDO' },
      ],
    },
    {
      id: 'comp_s0',
      category: 'BOTOEIRA_COGUMELO_NF',
      tag: 'S0',
      name: 'Desliga NF',
      x: 230,
      y: 390,
      width: 65,
      height: 100,
      state: true,
      terminals: [
        { id: '11NC', name: '1', relX: 50, relY: 8, type: 'COMANDO' },
        { id: '12NC', name: '2', relX: 50, relY: 92, type: 'COMANDO' },
      ],
    },
    {
      id: 'comp_s1',
      category: 'BOTOEIRA_PULSO_NA',
      tag: 'S1',
      name: 'Liga NA',
      x: 230,
      y: 520,
      width: 65,
      height: 100,
      state: false,
      terminals: [
        { id: '3NO', name: '3', relX: 50, relY: 8, type: 'COMANDO' },
        { id: '4NO', name: '4', relX: 50, relY: 92, type: 'COMANDO' },
      ],
    },
    {
      id: 'comp_h1',
      category: 'SINALEIRO_LED',
      tag: 'H1',
      name: 'Sinalizador',
      x: 230,
      y: 650,
      width: 65,
      height: 100,
      state: false,
      terminals: [
        { id: 'X1', name: 'X1', relX: 50, relY: 8, type: 'COMANDO' },
        { id: 'X2', name: 'X2', relX: 50, relY: 92, type: 'COMANDO' },
      ],
    },
  ]);

  const [cables, setCables] = useState<CableConnection[]>([
    { id: 'cbl_0a', fromComponentId: 'comp_grid3p', fromTerminalId: 'R', toComponentId: 'comp_q_mono', toTerminalId: '1', cableType: 'COMANDO_FASE' },
    { id: 'cbl_1', fromComponentId: 'comp_grid3p', fromTerminalId: 'R', toComponentId: 'comp_q1', toTerminalId: '1L1', cableType: 'FORCA_R' },
    { id: 'cbl_2', fromComponentId: 'comp_grid3p', fromTerminalId: 'S', toComponentId: 'comp_q1', toTerminalId: '3L2', cableType: 'FORCA_S' },
    { id: 'cbl_3', fromComponentId: 'comp_grid3p', fromTerminalId: 'T', toComponentId: 'comp_q1', toTerminalId: '5L3', cableType: 'FORCA_T' },
    { id: 'cbl_4', fromComponentId: 'comp_q1', fromTerminalId: '2T1', toComponentId: 'comp_k1', toTerminalId: '1L1', cableType: 'FORCA_R' },
    { id: 'cbl_5', fromComponentId: 'comp_q1', fromTerminalId: '4T2', toComponentId: 'comp_k1', toTerminalId: '3L2', cableType: 'FORCA_S' },
    { id: 'cbl_6', fromComponentId: 'comp_q1', fromTerminalId: '6T3', toComponentId: 'comp_k1', toTerminalId: '5L3', cableType: 'FORCA_T' },
    { id: 'cbl_7', fromComponentId: 'comp_k1', fromTerminalId: '2T1', toComponentId: 'comp_f1', toTerminalId: '1L1', cableType: 'FORCA_R' },
    { id: 'cbl_8', fromComponentId: 'comp_k1', fromTerminalId: '4T2', toComponentId: 'comp_f1', toTerminalId: '3L2', cableType: 'FORCA_S' },
    { id: 'cbl_9', fromComponentId: 'comp_k1', fromTerminalId: '6T3', toComponentId: 'comp_f1', toTerminalId: '5L3', cableType: 'FORCA_T' },
    { id: 'cbl_10', fromComponentId: 'comp_f1', fromTerminalId: '2T1', toComponentId: 'comp_mot3p', toTerminalId: 'U1', cableType: 'FORCA_R' },
    { id: 'cbl_11', fromComponentId: 'comp_f1', fromTerminalId: '4T2', toComponentId: 'comp_mot3p', toTerminalId: 'V1', cableType: 'FORCA_S' },
    { id: 'cbl_12', fromComponentId: 'comp_f1', fromTerminalId: '6T3', toComponentId: 'comp_mot3p', toTerminalId: 'W1', cableType: 'FORCA_T' },
    { id: 'cbl_j1', fromComponentId: 'comp_mot3p', fromTerminalId: 'W2', toComponentId: 'comp_mot3p', toTerminalId: 'U2', cableType: 'JUMPER_FECHAMENTO' },
    { id: 'cbl_j2', fromComponentId: 'comp_mot3p', fromTerminalId: 'U2', toComponentId: 'comp_mot3p', toTerminalId: 'V2', cableType: 'JUMPER_FECHAMENTO' },
  ]);

  const [selectedCableId, setSelectedCableId] = useState<string | null>(null);
  const [selectedCompId, setSelectedCompId] = useState<string | null>(null);
  const [inspect3DCompId, setInspect3DCompId] = useState<string | null>(null);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [catalogFilter, setCatalogFilter] = useState<'ALL' | 'ALIMENTACAO' | 'PROTECAO' | 'COMANDO' | 'SEGURANCA' | 'CARGAS'>('ALL');

  const [activeCableTool, setActiveCableTool] = useState<
    'FORCA_R' | 'FORCA_S' | 'FORCA_T' | 'COMANDO_FASE' | 'COMANDO_NEUTRO' | 'TERRA_PE' | 'JUMPER_FECHAMENTO' | null
  >(null);

  const [wiringOrigin, setWiringOrigin] = useState<{ compId: string; termId: string } | null>(null);
  const [draggingCompId, setDraggingCompId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<Point2D>({ x: 0, y: 0 });

  const panelRef = useRef<HTMLDivElement>(null);

  const getTerminalAbsolutePos = (compId: string, termId: string): Point2D => {
    const comp = components.find((c) => c.id === compId);
    if (!comp) return { x: 0, y: 0 };
    const term = comp.terminals.find((t) => t.id === termId);
    if (!term) return { x: comp.x + comp.width / 2, y: comp.y + comp.height / 2 };

    return {
      x: comp.x + (comp.width * term.relX) / 100,
      y: comp.y + (comp.height * term.relY) / 100,
    };
  };

  const calculateSmartRoute = (
    fromCompId: string,
    fromTermId: string,
    toCompId: string,
    toTermId: string,
    customWaypoints?: Point2D[]
  ): Point2D[] => {
    const p1 = getTerminalAbsolutePos(fromCompId, fromTermId);
    const p2 = getTerminalAbsolutePos(toCompId, toTermId);

    if (customWaypoints && customWaypoints.length > 0) {
      return [p1, ...customWaypoints, p2];
    }

    const fromComp = components.find((c) => c.id === fromCompId);
    const toComp = components.find((c) => c.id === toCompId);
    const fromTerm = fromComp?.terminals.find((t) => t.id === fromTermId);
    const toTerm = toComp?.terminals.find((t) => t.id === toTermId);

    const fromDirY = fromTerm && fromTerm.relY > 50 ? 1 : -1;
    const toDirY = toTerm && toTerm.relY > 50 ? 1 : -1;

    const offsetDist = 26;
    const p1Exit: Point2D = { x: p1.x, y: p1.y + fromDirY * offsetDist };
    const p2Entry: Point2D = { x: p2.x, y: p2.y + toDirY * offsetDist };

    if (fromCompId === toCompId) {
      const bridgeY = Math.max(p1.y, p2.y) + (fromDirY > 0 ? offsetDist * 1.4 : -offsetDist * 1.4);
      return [p1, p1Exit, { x: p1.x, y: bridgeY }, { x: p2.x, y: bridgeY }, p2Entry, p2];
    }

    const channelX =
      Math.abs(p1.x - p2.x) < 30
        ? p1.x
        : fromComp && toComp && fromComp.x !== toComp.x
        ? (p1.x + p2.x) / 2
        : Math.max(fromComp ? fromComp.x + fromComp.width + 24 : p1.x + 30, toComp ? toComp.x + toComp.width + 24 : p2.x + 30);

    const pts: Point2D[] = [p1, p1Exit];

    if (Math.abs(p1Exit.y - p2Entry.y) > 15) {
      pts.push({ x: channelX, y: p1Exit.y });
      pts.push({ x: channelX, y: p2Entry.y });
    } else {
      pts.push({ x: channelX, y: (p1Exit.y + p2Entry.y) / 2 });
    }

    pts.push(p2Entry);
    pts.push(p2);

    return pts;
  };

  const renderSmoothPath = (pts: Point2D[]): string => {
    if (pts.length < 2) return '';
    if (pts.length === 2) {
      return `M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y}`;
    }

    let d = `M ${pts[0].x} ${pts[0].y}`;
    const radius = 12;

    for (let i = 1; i < pts.length - 1; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const next = pts[i + 1];

      const d1 = { x: curr.x - prev.x, y: curr.y - prev.y };
      const d2 = { x: next.x - curr.x, y: next.y - curr.y };
      const len1 = Math.hypot(d1.x, d1.y);
      const len2 = Math.hypot(d2.x, d2.y);

      if (len1 === 0 || len2 === 0) {
        d += ` L ${curr.x} ${curr.y}`;
        continue;
      }

      const r = Math.min(radius, len1 / 2, len2 / 2);
      const pStart = { x: curr.x - (d1.x / len1) * r, y: curr.y - (d1.y / len1) * r };
      const pEnd = { x: curr.x + (d2.x / len2) * r, y: curr.y + (d2.y / len2) * r };

      d += ` L ${pStart.x} ${pStart.y} Q ${curr.x} ${curr.y}, ${pEnd.x} ${pEnd.y}`;
    }

    d += ` L ${pts[pts.length - 1].x} ${pts[pts.length - 1].y}`;
    return d;
  };

  // Continuidade BFS com Acionamento Conjugado por TAG
  useEffect(() => {
    const adj: Record<string, string[]> = {};
    const addEdge = (u: string, v: string) => {
      if (!adj[u]) adj[u] = [];
      if (!adj[v]) adj[v] = [];
      adj[u].push(v);
      adj[v].push(u);
    };

    cables.forEach((c) => {
      addEdge(`${c.fromComponentId}:${c.fromTerminalId}`, `${c.toComponentId}:${c.toTerminalId}`);
    });

    components.forEach((comp) => {
      if (comp.category === 'SECCIONADORA_LOTO' || comp.category === 'DISJUNTOR_MOTOR' || comp.category === 'DISJUNTOR_BIPOLAR') {
        if (comp.state) {
          addEdge(`${comp.id}:1L1`, `${comp.id}:2T1`);
          addEdge(`${comp.id}:3L2`, `${comp.id}:4T2`);
          addEdge(`${comp.id}:5L3`, `${comp.id}:6T3`);
        }
      } else if (comp.category === 'DISJUNTOR_MONO_WEG_3D') {
        if (comp.state) {
          addEdge(`${comp.id}:1`, `${comp.id}:2`);
        }
      } else if (comp.category === 'TRANSFORMADOR_ISOLADOR') {
        if (comp.state) {
          addEdge(`${comp.id}:SEC_L`, `${comp.id}:SEC_N`);
        }
      } else if (comp.category === 'CONTATOR_TRIPOLAR') {
        if (comp.state) {
          addEdge(`${comp.id}:1L1`, `${comp.id}:2T1`);
          addEdge(`${comp.id}:3L2`, `${comp.id}:4T2`);
          addEdge(`${comp.id}:5L3`, `${comp.id}:6T3`);
          addEdge(`${comp.id}:13NO`, `${comp.id}:14NO`);
        }
      } else if (comp.category === 'BLOCO_AUXILIAR') {
        if (comp.state) {
          addEdge(`${comp.id}:13NO`, `${comp.id}:14NO`);
        } else {
          addEdge(`${comp.id}:21NC`, `${comp.id}:22NC`);
        }
      } else if (comp.category === 'RELE_TERMICO') {
        addEdge(`${comp.id}:1L1`, `${comp.id}:2T1`);
        addEdge(`${comp.id}:3L2`, `${comp.id}:4T2`);
        addEdge(`${comp.id}:5L3`, `${comp.id}:6T3`);
        if (!comp.tripped) {
          addEdge(`${comp.id}:95NC`, `${comp.id}:96NC`);
        } else {
          addEdge(`${comp.id}:97NO`, `${comp.id}:98NO`);
        }
      } else if (comp.category === 'RELE_FALTA_FASE') {
        if (comp.state && !comp.tripped) {
          addEdge(`${comp.id}:11C`, `${comp.id}:14NO`);
        } else {
          addEdge(`${comp.id}:11C`, `${comp.id}:12NC`);
        }
      } else if (comp.category === 'RELE_SEGURANCA_NR12') {
        if (comp.state && !comp.tripped) {
          addEdge(`${comp.id}:13NO`, `${comp.id}:14NO`);
        }
      } else if (comp.category === 'CHAVE_INTERTRAVAMENTO_NR12') {
        if (comp.state) {
          addEdge(`${comp.id}:11NC`, `${comp.id}:12NC`);
          addEdge(`${comp.id}:21NC`, `${comp.id}:22NC`);
        }
      } else if (comp.category === 'BOTOEIRA_COGUMELO_NF') {
        if (comp.state) {
          addEdge(`${comp.id}:11NC`, `${comp.id}:12NC`);
        }
      } else if (comp.category === 'BOTOEIRA_PULSO_NA') {
        if (comp.state) {
          addEdge(`${comp.id}:3NO`, `${comp.id}:4NO`);
        }
      }
    });

    const hasPath = (start: string, goal: string) => {
      if (!adj[start] || !adj[goal]) return false;
      const visited = new Set<string>();
      const queue = [start];
      visited.add(start);

      while (queue.length > 0) {
        const curr = queue.shift()!;
        if (curr === goal) return true;
        for (const neighbor of adj[curr] || []) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        }
      }
      return false;
    };

    const phaseSources = ['comp_grid3p:R', 'comp_grid3p:S', 'comp_grid3p:T'];
    const neutralSources = ['comp_grid3p:N'];

    const isNodeEnergizedByPhase = (targetNode: string) =>
      phaseSources.some((src) => hasPath(src, targetNode));

    const isNodeEnergizedByNeutral = (targetNode: string) =>
      neutralSources.some((src) => hasPath(src, targetNode));

    const energizedTags = new Set<string>();
    components.forEach((comp) => {
      if (comp.category === 'CONTATOR_TRIPOLAR') {
        const a1Powered = isNodeEnergizedByPhase(`${comp.id}:A1`);
        const a2Powered = isNodeEnergizedByNeutral(`${comp.id}:A2`) || isNodeEnergizedByPhase(`${comp.id}:A2`);
        if (a1Powered && a2Powered) {
          energizedTags.add(comp.tag.toUpperCase().trim());
        }
      }
    });

    const motComp = components.find((c) => c.category === 'MOTOR_TRIFASICO_6P');
    let isMot3pPowered = false;
    if (motComp) {
      const u1HasPhase = isNodeEnergizedByPhase(`${motComp.id}:U1`);
      const v1HasPhase = isNodeEnergizedByPhase(`${motComp.id}:V1`);
      const w1HasPhase = isNodeEnergizedByPhase(`${motComp.id}:W1`);
      const isStarClosed = hasPath(`${motComp.id}:W2`, `${motComp.id}:U2`) && hasPath(`${motComp.id}:U2`, `${motComp.id}:V2`);
      isMot3pPowered = u1HasPhase && v1HasPhase && w1HasPhase && isStarClosed;
    }

    setComponents((prev) =>
      prev.map((c) => {
        const cleanTag = c.tag.toUpperCase().trim();
        const shouldBeActive = energizedTags.has(cleanTag);

        if (c.category === 'CONTATOR_TRIPOLAR' || c.category === 'BLOCO_AUXILIAR') {
          return { ...c, state: shouldBeActive };
        }
        if (c.category === 'SINALEIRO_LED') {
          const x1 = isNodeEnergizedByPhase(`${c.id}:X1`);
          const x2 = isNodeEnergizedByNeutral(`${c.id}:X2`);
          return { ...c, state: x1 && x2 };
        }
        if (c.category === 'MOTOR_TRIFASICO_6P') {
          return { ...c, state: isMot3pPowered };
        }
        return c;
      })
    );

    if (isMot3pPowered && inverterState.motorStatus !== 'RUNNING') {
      dispatch({ type: 'PRESS_RUN' });
    } else if (!isMot3pPowered && inverterState.motorStatus === 'RUNNING') {
      dispatch({ type: 'PRESS_STOP' });
    }
  }, [cables, components.map((c) => `${c.id}:${c.tag}:${c.state}:${c.tripped}`).join()]);

  // Tecla Delete para apagar cabo ou componente selecionado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedCableId) {
          setCables((prev) => prev.filter((c) => c.id !== selectedCableId));
          setSelectedCableId(null);
        } else if (selectedCompId && components.length > 1) {
          setComponents((prev) => prev.filter((c) => c.id !== selectedCompId));
          setCables((prev) => prev.filter((cb) => cb.fromComponentId !== selectedCompId && cb.toComponentId !== selectedCompId));
          setSelectedCompId(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCableId, selectedCompId, components.length]);

  const handleMouseDownComp = (e: React.MouseEvent, compId: string) => {
    e.stopPropagation();
    const comp = components.find((c) => c.id === compId);
    if (!comp || !panelRef.current) return;

    const panelRect = panelRef.current.getBoundingClientRect();
    setDraggingCompId(compId);
    setDragOffset({
      x: e.clientX - panelRect.left - comp.x,
      y: e.clientY - panelRect.top - comp.y,
    });
  };

  const handleDoubleClickComp = (e: React.MouseEvent, compId: string) => {
    e.stopPropagation();
    setSelectedCompId(compId);
    setSelectedCableId(null);
  };

  const handleMouseMovePanel = (e: React.MouseEvent) => {
    if (!panelRef.current || !draggingCompId) return;
    const panelRect = panelRef.current.getBoundingClientRect();

    const newX = Math.max(10, Math.min(panelRect.width - 240, e.clientX - panelRect.left - dragOffset.x));
    const newY = Math.max(10, Math.min(panelRect.height - 200, e.clientY - panelRect.top - dragOffset.y));

    setComponents((prev) =>
      prev.map((c) => (c.id === draggingCompId ? { ...c, x: newX, y: newY } : c))
    );
  };

  const handleMouseUpPanel = () => {
    setDraggingCompId(null);
  };

  const handleTerminalClick = (e: React.MouseEvent, compId: string, termId: string) => {
    e.stopPropagation();
    if (!activeCableTool) {
      alert('Selecione primeiro uma cor de cabo na barra superior!');
      return;
    }

    if (!wiringOrigin) {
      setWiringOrigin({ compId, termId });
    } else {
      if (wiringOrigin.compId === compId && wiringOrigin.termId === termId) {
        setWiringOrigin(null);
        return;
      }

      const newCable: CableConnection = {
        id: `cbl_${Date.now()}`,
        fromComponentId: wiringOrigin.compId,
        fromTerminalId: wiringOrigin.termId,
        toComponentId: compId,
        toTerminalId: termId,
        cableType: activeCableTool,
      };

      setCables([...cables, newCable]);
      setWiringOrigin(null);
    }
  };

  const handleTagInputChange = (compId: string, newTag: string) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === compId ? { ...c, tag: newTag.toUpperCase() } : c))
    );
  };

  const handleInsertComponentToProject = (category: ComponentCategory) => {
    const count = components.length + 1;
    let tag = `C${count}`;
    let name = 'Módulo Elétrico';
    let width = 95;
    let height = 150;
    let terminals: TerminalPole[] = [];

    if (category === 'DISJUNTOR_MONO_WEG_3D') {
      tag = `Q${count}`;
      name = 'Disj. WEG C16 (3D)';
      width = 75;
      height = 160;
      terminals = [
        { id: '1', name: '1 (L)', relX: 50, relY: 8, type: 'COMANDO' },
        { id: '2', name: '2 (Carga)', relX: 50, relY: 92, type: 'COMANDO' },
      ];
    } else if (category === 'REDE_TRIFASICA') {
      tag = `GRID${count}`;
      name = 'Rede Trifásica 380V';
      width = 140;
      height = 80;
      terminals = [
        { id: 'R', name: 'R', relX: 18, relY: 80, type: 'FORCA' },
        { id: 'S', name: 'S', relX: 38, relY: 80, type: 'FORCA' },
        { id: 'T', name: 'T', relX: 58, relY: 80, type: 'FORCA' },
        { id: 'N', name: 'N', relX: 78, relY: 80, type: 'COMANDO' },
        { id: 'PE', name: 'PE', relX: 92, relY: 80, type: 'TERRA' },
      ];
    } else if (category === 'CONTATOR_TRIPOLAR') {
      tag = `K${count}`;
      name = `Contator CWM25 (K${count})`;
      width = 110;
      height = 180;
      terminals = [
        { id: '1L1', name: '1/L1', relX: 18, relY: 8, type: 'FORCA' },
        { id: '3L2', name: '3/L2', relX: 38, relY: 8, type: 'FORCA' },
        { id: '5L3', name: '5/L3', relX: 58, relY: 8, type: 'FORCA' },
        { id: '13NO', name: '13', relX: 82, relY: 8, type: 'COMANDO' },
        { id: 'A1', name: 'A1', relX: 82, relY: 28, type: 'COMANDO' },
        { id: '2T1', name: '2/T1', relX: 18, relY: 92, type: 'FORCA' },
        { id: '4T2', name: '4/T2', relX: 38, relY: 92, type: 'FORCA' },
        { id: '6T3', name: '6/T3', relX: 58, relY: 92, type: 'FORCA' },
        { id: '14NO', name: '14', relX: 82, relY: 92, type: 'COMANDO' },
        { id: 'A2', name: 'A2', relX: 82, relY: 72, type: 'COMANDO' },
      ];
    } else if (category === 'DISJUNTOR_MOTOR') {
      tag = `Q${count}`;
      name = 'Disjuntor MPW';
      width = 100;
      height = 170;
      terminals = [
        { id: '1L1', name: '1/L1', relX: 20, relY: 8, type: 'FORCA' },
        { id: '3L2', name: '3/L2', relX: 50, relY: 8, type: 'FORCA' },
        { id: '5L3', name: '5/L3', relX: 80, relY: 8, type: 'FORCA' },
        { id: '2T1', name: '2/T1', relX: 20, relY: 92, type: 'FORCA' },
        { id: '4T2', name: '4/T2', relX: 50, relY: 92, type: 'FORCA' },
        { id: '6T3', name: '6/T3', relX: 80, relY: 92, type: 'FORCA' },
      ];
    } else if (category === 'RELE_TERMICO') {
      tag = `F${count}`;
      name = 'Relé Térmico RW';
      width = 120;
      height = 190;
      terminals = [
        { id: '1L1', name: '1/L1', relX: 20, relY: 8, type: 'FORCA' },
        { id: '3L2', name: '3/L2', relX: 50, relY: 8, type: 'FORCA' },
        { id: '5L3', name: '5/L3', relX: 80, relY: 8, type: 'FORCA' },
        { id: '95NC', name: '95', relX: 18, relY: 58, type: 'COMANDO' },
        { id: '96NC', name: '96', relX: 40, relY: 58, type: 'COMANDO' },
        { id: '97NO', name: '97', relX: 62, relY: 58, type: 'COMANDO' },
        { id: '98NO', name: '98', relX: 84, relY: 58, type: 'COMANDO' },
        { id: '2T1', name: '2/T1', relX: 20, relY: 92, type: 'FORCA' },
        { id: '4T2', name: '4/T2', relX: 50, relY: 92, type: 'FORCA' },
        { id: '6T3', name: '6/T3', relX: 80, relY: 92, type: 'FORCA' },
      ];
    } else {
      tag = `C${count}`;
      name = 'Módulo';
      terminals = [
        { id: '1', name: '1', relX: 50, relY: 10, type: 'COMANDO' },
        { id: '2', name: '2', relX: 50, relY: 90, type: 'COMANDO' },
      ];
    }

    const newComp: PlacedComponent = {
      id: `comp_${Date.now()}`,
      category,
      tag,
      name,
      x: 120 + (components.length % 3) * 40,
      y: 120 + (components.length % 4) * 30,
      width,
      height,
      state: true,
      terminals,
    };

    setComponents((prev) => [...prev, newComp]);
    setIsCatalogModalOpen(false);
  };

  const handleToggleCompState = (compId: string) => {
    setComponents((prev) =>
      prev.map((c) => {
        if (c.id !== compId) return c;
        if (c.category === 'RELE_TERMICO' || c.category === 'RELE_FALTA_FASE' || c.category === 'RELE_SEGURANCA_NR12') {
          return { ...c, tripped: !c.tripped };
        }
        return { ...c, state: !c.state };
      })
    );
  };

  const handlePushButtonPress = (compId: string) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === compId ? { ...c, state: true } : c))
    );
  };

  const handlePushButtonRelease = (compId: string) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === compId ? { ...c, state: false } : c))
    );
  };

  const handleRemoveSelectedComponent = () => {
    if (!selectedCompId || components.length <= 1) return;
    setComponents((prev) => prev.filter((c) => c.id !== selectedCompId));
    setCables((prev) => prev.filter((cb) => cb.fromComponentId !== selectedCompId && cb.toComponentId !== selectedCompId));
    setSelectedCompId(null);
  };

  const selectedCableObj = cables.find((c) => c.id === selectedCableId);
  const selectedCompObj = components.find((c) => c.id === selectedCompId);
  const inspectingComp = components.find((c) => c.id === inspect3DCompId);

  const filteredCatalog = CATALOG_ITEMS.filter((item) =>
    catalogFilter === 'ALL' ? true : item.group === catalogFilter
  );

  return (
    <div style={containerStyle}>
      {/* 1. BARRA SUPERIOR: BOTÃO DO CATÁLOGO DE COMPONENTES & PALETA DE CABOS */}
      <div style={topControlBarStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setIsCatalogModalOpen(true)}
            style={btnOpenCatalogStyle}
            title="Abrir a biblioteca de dispositivos industriais e de segurança"
          >
            📦 + Adicionar Componente ao Projeto
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#00e676' }}>
            🔌 Cabos:
          </span>

          <button
            onClick={() => { setActiveCableTool('FORCA_R'); setWiringOrigin(null); }}
            style={{ ...btnCableSelectStyle, background: activeCableTool === 'FORCA_R' ? '#d32f2f' : '#263238', borderColor: '#ef5350', color: '#fff' }}
          >
            Fase R
          </button>
          <button
            onClick={() => { setActiveCableTool('FORCA_S'); setWiringOrigin(null); }}
            style={{ ...btnCableSelectStyle, background: activeCableTool === 'FORCA_S' ? '#f57c00' : '#263238', borderColor: '#ffa726', color: '#fff' }}
          >
            Fase S
          </button>
          <button
            onClick={() => { setActiveCableTool('FORCA_T'); setWiringOrigin(null); }}
            style={{ ...btnCableSelectStyle, background: activeCableTool === 'FORCA_T' ? '#1976d2' : '#263238', borderColor: '#42a5f5', color: '#fff' }}
          >
            Fase T
          </button>
          <button
            onClick={() => { setActiveCableTool('COMANDO_FASE'); setWiringOrigin(null); }}
            style={{ ...btnCableSelectStyle, background: activeCableTool === 'COMANDO_FASE' ? '#e91e63' : '#263238', borderColor: '#f06292', color: '#fff' }}
          >
            Comando (Fase)
          </button>
          <button
            onClick={() => { setActiveCableTool('COMANDO_NEUTRO'); setWiringOrigin(null); }}
            style={{ ...btnCableSelectStyle, background: activeCableTool === 'COMANDO_NEUTRO' ? '#00b4d8' : '#263238', borderColor: '#00e5ff', color: '#fff' }}
          >
            Neutro (0V)
          </button>
          <button
            onClick={() => { setActiveCableTool('JUMPER_FECHAMENTO'); setWiringOrigin(null); }}
            style={{ ...btnCableSelectStyle, background: activeCableTool === 'JUMPER_FECHAMENTO' ? '#fbc02d' : '#263238', borderColor: '#ffd600', color: '#000', fontWeight: 'bold' }}
          >
            ⭐/🔺 Jumper Motor
          </button>
          <button
            onClick={() => { setCables([]); setWiringOrigin(null); setSelectedCableId(null); setSelectedCompId(null); }}
            style={btnClearCablesBtnStyle}
          >
            🗑️ Limpar Todos
          </button>
        </div>
      </div>

      {/* MODAL DE INSPEÇÃO 3D REALISTA WEG THREE.JS */}
      {inspectingComp && (
        <div style={modalOverlayStyle} onClick={() => setInspect3DCompId(null)}>
          <div style={{ ...modalCardStyle, maxWidth: '920px' }} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>🔍</span>
                <div>
                  <h3 style={{ fontSize: '15px', color: '#fff', margin: 0 }}>
                    Inspeção e Acionamento 3D: {inspectingComp.name} ({inspectingComp.tag})
                  </h3>
                  <span style={{ fontSize: '11px', color: '#90a4ae' }}>
                    Interaja com a alavanca em 3D, gire o disjuntor com o mouse e teste a proteção
                  </span>
                </div>
              </div>
              <button onClick={() => setInspect3DCompId(null)} style={btnCloseModalStyle}>
                ✕
              </button>
            </div>
            <div style={{ padding: '16px' }}>
              <DisjuntorWeg3D
                initialState={inspectingComp.state}
                onStateChange={(nextState) => {
                  setComponents((prev) =>
                    prev.map((c) => (c.id === inspectingComp.id ? { ...c, state: nextState } : c))
                  );
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* MODAL / BIBLIOTECA COMPLETA DE COMPONENTES */}
      {isCatalogModalOpen && (
        <div style={modalOverlayStyle} onClick={() => setIsCatalogModalOpen(false)}>
          <div style={modalCardStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>📦</span>
                <div>
                  <h3 style={{ fontSize: '16px', color: '#fff', margin: 0 }}>
                    Biblioteca de Componentes e Dispositivos
                  </h3>
                  <span style={{ fontSize: '11px', color: '#90a4ae' }}>
                    Selecione o equipamento e clique em <strong>➕ Inserir no Painel</strong>
                  </span>
                </div>
              </div>
              <button onClick={() => setIsCatalogModalOpen(false)} style={btnCloseModalStyle}>
                ✕
              </button>
            </div>

            <div style={filterTabsContainer}>
              <button
                onClick={() => setCatalogFilter('ALL')}
                style={{ ...btnFilterTabStyle, background: catalogFilter === 'ALL' ? '#0288d1' : '#1e293b', color: catalogFilter === 'ALL' ? '#fff' : '#94a3b8' }}
              >
                Todos ({CATALOG_ITEMS.length})
              </button>
              <button
                onClick={() => setCatalogFilter('ALIMENTACAO')}
                style={{ ...btnFilterTabStyle, background: catalogFilter === 'ALIMENTACAO' ? '#0288d1' : '#1e293b', color: catalogFilter === 'ALIMENTACAO' ? '#fff' : '#94a3b8' }}
              >
                ⚡ Alimentação
              </button>
              <button
                onClick={() => setCatalogFilter('PROTECAO')}
                style={{ ...btnFilterTabStyle, background: catalogFilter === 'PROTECAO' ? '#0288d1' : '#1e293b', color: catalogFilter === 'PROTECAO' ? '#fff' : '#94a3b8' }}
              >
                🛡️ Proteção & Relés
              </button>
              <button
                onClick={() => setCatalogFilter('COMANDO')}
                style={{ ...btnFilterTabStyle, background: catalogFilter === 'COMANDO' ? '#0288d1' : '#1e293b', color: catalogFilter === 'COMANDO' ? '#fff' : '#94a3b8' }}
              >
                🧲 Comando & Botoeiras
              </button>
              <button
                onClick={() => setCatalogFilter('SEGURANCA')}
                style={{ ...btnFilterTabStyle, background: catalogFilter === 'SEGURANCA' ? '#0288d1' : '#1e293b', color: catalogFilter === 'SEGURANCA' ? '#fff' : '#94a3b8' }}
              >
                🔒 Normas NR-10 / NR-12
              </button>
              <button
                onClick={() => setCatalogFilter('CARGAS')}
                style={{ ...btnFilterTabStyle, background: catalogFilter === 'CARGAS' ? '#0288d1' : '#1e293b', color: catalogFilter === 'CARGAS' ? '#fff' : '#94a3b8' }}
              >
                ⚙️ Motores & Cargas
              </button>
            </div>

            <div style={catalogGridStyle}>
              {filteredCatalog.map((item, idx) => (
                <div key={idx} style={catalogCardItemStyle}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '28px' }}>{item.icon}</span>
                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: '13px', color: '#fff', display: 'block' }}>
                        {item.title}
                      </strong>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 10px 0', lineHeight: '1.4' }}>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleInsertComponentToProject(item.category)}
                    style={btnInsertItemStyle}
                  >
                    ➕ Inserir no Painel
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BARRA DE SELEÇÃO E AÇÕES */}
      {selectedCompObj ? (
        <div style={{ ...selectedCableAlertBarStyle, borderColor: '#ffd600', background: 'rgba(255, 214, 0, 0.15)', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span>
              📦 <strong>Componente Selecionado:</strong> {selectedCompObj.name} (TAG: <strong>{selectedCompObj.tag}</strong>)
            </span>
            {selectedCompObj.category === 'DISJUNTOR_MONO_WEG_3D' && (
              <button
                onClick={() => setInspect3DCompId(selectedCompObj.id)}
                style={btnInspectActionStyle}
              >
                🔍 Inspecionar em 3D
              </button>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handleRemoveSelectedComponent} style={btnDeleteSingleCableStyle}>
              ❌ Excluir Componente (Del)
            </button>
            <button onClick={() => setSelectedCompId(null)} style={btnDeselectCableStyle}>
              Desmarcar
            </button>
          </div>
        </div>
      ) : selectedCableObj ? (
        <div style={selectedCableAlertBarStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span>
              📍 <strong>Cabo Ativo:</strong> {selectedCableObj.cableType} (De{' '}
              {components.find((c) => c.id === selectedCableObj.fromComponentId)?.tag}[{selectedCableObj.fromTerminalId}] para{' '}
              {components.find((c) => c.id === selectedCableObj.toComponentId)?.tag}[{selectedCableObj.toTerminalId}])
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => {
                setCables((prev) => prev.filter((c) => c.id !== selectedCableObj.id));
                setSelectedCableId(null);
              }}
              style={btnDeleteSingleCableStyle}
            >
              ❌ Remover Cabo (Del)
            </button>
            <button onClick={() => setSelectedCableId(null)} style={btnDeselectCableStyle}>
              Desmarcar
            </button>
          </div>
        </div>
      ) : wiringOrigin ? (
        <div style={wiringPromptBarStyle}>
          ⚡ <strong>Passando Cabo:</strong> Origem no borne{' '}
          <strong style={{ color: '#00e676' }}>
            {components.find((c) => c.id === wiringOrigin.compId)?.tag} [{wiringOrigin.termId}]
          </strong>
          . Clique no borne de destino para fechar a conexão.
        </div>
      ) : null}

      {/* 2. PAINEL ELÉTRICO EXPANDIDO (1100px) */}
      <div
        ref={panelRef}
        onMouseMove={handleMouseMovePanel}
        onMouseUp={handleMouseUpPanel}
        onClick={() => {
          setSelectedCableId(null);
          setSelectedCompId(null);
        }}
        style={panelMountStyle}
      >
        <svg style={svgOverlayStyle}>
          {cables.map((cb) => {
            const routePoints = calculateSmartRoute(
              cb.fromComponentId,
              cb.fromTerminalId,
              cb.toComponentId,
              cb.toTerminalId,
              cb.customWaypoints
            );
            const color = CABLE_COLORS[cb.cableType] || '#fff';
            const isSelected = selectedCableId === cb.id;
            const pathString = renderSmoothPath(routePoints);

            return (
              <g
                key={cb.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCableId(cb.id);
                  setSelectedCompId(null);
                }}
              >
                <path
                  d={pathString}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="20"
                  style={{ cursor: 'pointer', pointerEvents: 'stroke' }}
                />
                <path
                  d={pathString}
                  fill="none"
                  stroke={isSelected ? '#00e676' : 'rgba(0,0,0,0.55)'}
                  strokeWidth={isSelected ? '7' : '5'}
                  strokeDasharray={isSelected ? '6,4' : 'none'}
                />
                <path
                  d={pathString}
                  fill="none"
                  stroke={color}
                  strokeWidth={isSelected ? '4.5' : '3.5'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            );
          })}
        </svg>

        {components.map((comp) => {
          const isSelected = selectedCompId === comp.id;
          const isGrid = comp.category.startsWith('REDE_');
          const isLoto = comp.category === 'SECCIONADORA_LOTO';
          const isTrafo = comp.category === 'TRANSFORMADOR_ISOLADOR';
          const isSafeRelay = comp.category === 'RELE_SEGURANCA_NR12';
          const isInterlock = comp.category === 'CHAVE_INTERTRAVAMENTO_NR12';
          const isQ = comp.category.startsWith('DISJUNTOR');
          const isK = comp.category === 'CONTATOR_TRIPOLAR';
          const isF = comp.category === 'RELE_TERMICO';
          const isRPF = comp.category === 'RELE_FALTA_FASE';
          const isAux = comp.category === 'BLOCO_AUXILIAR';
          const isMotor = comp.category === 'MOTOR_TRIFASICO_6P';
          const isBtnNA = comp.category === 'BOTOEIRA_PULSO_NA';
          const isBtnNF = comp.category === 'BOTOEIRA_COGUMELO_NF';
          const isLamp = comp.category === 'SINALEIRO_LED';

          return (
            <div
              key={comp.id}
              onMouseDown={(e) => handleMouseDownComp(e, comp.id)}
              onDoubleClick={(e) => handleDoubleClickComp(e, comp.id)}
              style={{
                position: 'absolute',
                left: `${comp.x}px`,
                top: `${comp.y}px`,
                width: `${comp.width}px`,
                height: `${comp.height}px`,
                cursor: 'grab',
                userSelect: 'none',
                zIndex: 2,
                boxSizing: 'border-box',
              }}
            >
              {/* CAIXA DE RENOMEAÇÃO FLUTUANTE EXTERNA */}
              <div style={tagSidebarFloatingBox}>
                <span style={{ fontSize: '7px', color: '#90a4ae', fontWeight: 'bold' }}>TAG</span>
                <input
                  type="text"
                  value={comp.tag}
                  onChange={(e) => handleTagInputChange(comp.id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  style={tagInputFieldStyle}
                  title="Digite para renomear."
                />
              </div>

              {/* REDE DE FORÇA */}
              {isGrid && (
                <div style={{ ...gridBusStyle, outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div style={compHeaderStyle}>
                    <strong style={{ fontSize: '10px', color: '#ffb74d' }}>ALIMENTAÇÃO</strong>
                    <span style={{ fontSize: '9px', color: '#fff', fontWeight: 'bold' }}>{comp.tag}</span>
                  </div>
                  <span style={{ fontSize: '8px', color: '#cfd8dc', textAlign: 'center', marginTop: '4px' }}>
                    {comp.name}
                  </span>
                </div>
              )}

              {/* DISJUNTOR MONOPOLAR WEG MDW-C16 (3D / 2D HÍBRIDO) */}
              {comp.category === 'DISJUNTOR_MONO_WEG_3D' && (
                <div style={{ ...wegBreakerBodyStyle, outline: isSelected ? '3px dashed #00e676' : 'none', background: '#f1f5f9' }}>
                  <div style={compHeaderStyle}>
                    <strong style={{ fontSize: '9px', color: '#005ea6' }}>WEG MDW</strong>
                    <span style={{ fontSize: '8px', color: '#005ea6', fontWeight: 'bold' }}>C16</span>
                  </div>

                  <div style={wegLeverSlotStyle}>
                    <div
                      onClick={(e) => { e.stopPropagation(); handleToggleCompState(comp.id); }}
                      style={{
                        ...wegLeverHandleStyle,
                        top: comp.state ? '4px' : '40px',
                        background: comp.state ? '#22c55e' : '#ef4444',
                      }}
                    >
                      <span style={{ fontSize: '7px', color: '#fff', fontWeight: 'bold' }}>
                        {comp.state ? 'I ON' : 'O OFF'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); setInspect3DCompId(comp.id); }}
                    style={btnInspectCardThumbStyle}
                  >
                    🔍 3D
                  </button>
                </div>
              )}

              {/* CHAVE SECCIONADORA LOTO */}
              {isLoto && (
                <div style={{ ...wegBreakerBodyStyle, borderColor: '#ef5350', outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div style={compHeaderStyle}>
                    <strong style={{ fontSize: '9px', color: '#c62828' }}>LOTO NR-10</strong>
                    <span style={{ fontSize: '9px', color: '#455a64', fontWeight: 'bold' }}>{comp.tag}</span>
                  </div>
                  <div style={wegLeverSlotStyle}>
                    <div
                      onClick={(e) => { e.stopPropagation(); handleToggleCompState(comp.id); }}
                      style={{
                        ...wegLeverHandleStyle,
                        top: comp.state ? '4px' : '40px',
                        background: comp.state ? '#2e7d32' : '#c62828',
                      }}
                    >
                      <span style={{ fontSize: '8px', color: '#fff', fontWeight: 'bold' }}>
                        {comp.state ? 'I ON' : 'O OFF'}
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: '7px', color: '#546e7a', textAlign: 'center', fontWeight: 'bold' }}>{comp.name}</span>
                </div>
              )}

              {/* DISJUNTORES PADRÃO */}
              {isQ && comp.category !== 'DISJUNTOR_MONO_WEG_3D' && (
                <div style={{ ...wegBreakerBodyStyle, outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div style={compHeaderStyle}>
                    <strong style={{ fontSize: '10px', color: '#005ea6' }}>WEG</strong>
                    <span style={{ fontSize: '9px', color: '#455a64', fontWeight: 'bold' }}>{comp.tag}</span>
                  </div>

                  <div style={wegLeverSlotStyle}>
                    <div
                      onClick={(e) => { e.stopPropagation(); handleToggleCompState(comp.id); }}
                      style={{
                        ...wegLeverHandleStyle,
                        top: comp.state ? '4px' : '40px',
                        background: comp.state ? '#2e7d32' : '#c62828',
                      }}
                    >
                      <span style={{ fontSize: '8px', color: '#fff', fontWeight: 'bold' }}>
                        {comp.state ? 'I ON' : 'O OFF'}
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: '8px', color: '#546e7a', textAlign: 'center', fontWeight: 'bold' }}>{comp.name}</span>
                </div>
              )}

              {/* CONTATOR TRIPOLAR */}
              {isK && (
                <div style={{ ...contactorBodyStyle, outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div style={compHeaderStyle}>
                    <strong style={{ fontSize: '10px', color: '#005ea6' }}>WEG</strong>
                    <span style={{ fontSize: '9px', color: '#37474f', fontWeight: 'bold' }}>{comp.tag}</span>
                  </div>

                  <div style={contactorCoreIndicator}>
                    <div
                      style={{
                        width: '36px',
                        height: '14px',
                        background: comp.state ? '#00e676' : '#263238',
                        borderRadius: '2px',
                        boxShadow: comp.state ? '0 0 10px #00e676' : 'none',
                      }}
                    />
                    <span style={{ fontSize: '8px', color: comp.state ? '#00e676' : '#37474f', fontWeight: 'bold' }}>
                      {comp.state ? 'ATRACADO' : 'DESENERGIZADO'}
                    </span>
                  </div>
                  <span style={{ fontSize: '8px', color: '#546e7a', textAlign: 'center', fontWeight: 'bold' }}>{comp.name}</span>
                </div>
              )}

              {/* RELÉ TÉRMICO */}
              {isF && (
                <div style={{ ...thermalRelayStyle, outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div style={compHeaderStyle}>
                    <strong style={{ fontSize: '9px', color: '#d32f2f' }}>RELÉ RW27</strong>
                    <span style={{ fontSize: '9px', color: '#37474f', fontWeight: 'bold' }}>{comp.tag}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', margin: '2px 0' }}>
                    <div style={currentDialKnobStyle}>
                      <span style={{ fontSize: '7px', color: '#fff', fontWeight: 'bold' }}>4.5A</span>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleToggleCompState(comp.id); }}
                        style={{ ...btnRelayActionStyle, background: comp.tripped ? '#d32f2f' : '#b71c1c' }}
                      >
                        TEST
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleToggleCompState(comp.id); }}
                        style={{ ...btnRelayActionStyle, background: '#0288d1' }}
                      >
                        RESET
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', background: '#b0bec5', padding: '1px 0', borderRadius: '2px' }}>
                    <span style={{ fontSize: '7px', color: '#1a237e', fontWeight: 'bold' }}>95 96 NC</span>
                    <span style={{ fontSize: '7px', color: '#b71c1c', fontWeight: 'bold' }}>97 98 NO</span>
                  </div>

                  <span style={{ fontSize: '7px', color: comp.tripped ? '#d32f2f' : '#546e7a', textAlign: 'center', fontWeight: 'bold' }}>
                    {comp.tripped ? 'TRIP (SOBRECARGA)' : 'NORMAL'}
                  </span>
                </div>
              )}

              {/* RELÉ FALTA DE FASE */}
              {isRPF && (
                <div style={{ ...rpfRelayStyle, outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div style={compHeaderStyle}>
                    <strong style={{ fontSize: '9px', color: '#0288d1' }}>RPF-01</strong>
                    <span style={{ fontSize: '9px', color: '#37474f', fontWeight: 'bold' }}>{comp.tag}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', margin: '4px 0' }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: comp.state && !comp.tripped ? '#00e676' : '#263238', boxShadow: comp.state && !comp.tripped ? '0 0 6px #00e676' : 'none' }} />
                      <span style={{ fontSize: '7px', color: '#37474f' }}>PWR</span>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: comp.tripped ? '#ff1744' : '#263238', boxShadow: comp.tripped ? '0 0 6px #ff1744' : 'none' }} />
                      <span style={{ fontSize: '7px', color: '#37474f' }}>FALHA</span>
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); handleToggleCompState(comp.id); }}
                      style={{ ...btnRelayActionStyle, background: comp.tripped ? '#d32f2f' : '#37474f', width: '70px', marginTop: '2px' }}
                    >
                      {comp.tripped ? 'Restaurar' : 'Simular Queda'}
                    </button>
                  </div>
                  <span style={{ fontSize: '7px', color: '#546e7a', textAlign: 'center', fontWeight: 'bold' }}>{comp.name}</span>
                </div>
              )}

              {/* BLOCO DE CONTATOS AUXILIARES CONJUGADO */}
              {isAux && (
                <div style={{ ...auxBlockBodyStyle, outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div style={compHeaderStyle}>
                    <strong style={{ fontSize: '9px', color: '#005ea6' }}>BLOCO AUX</strong>
                    <span style={{ fontSize: '9px', color: '#37474f', fontWeight: 'bold' }}>{comp.tag}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', margin: '6px 0' }}>
                    <span style={{ fontSize: '7px', color: '#455a64' }}>Acoplado com: <strong>{comp.tag}</strong></span>
                    <span style={{ fontSize: '8px', color: comp.state ? '#00e676' : '#90a4ae', fontWeight: 'bold' }}>
                      {comp.state ? '13-14 ON / 21-22 OFF' : '13-14 OFF / 21-22 ON'}
                    </span>
                  </div>
                </div>
              )}

              {/* MOTOR 2D REALISTA */}
              {isMotor && (
                <div style={{ ...motorRealisticWrapperStyle, outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div style={motorFinHousingStyle}>
                    <div style={motorSideFinLeft} />
                    <div style={motorSideFinRight} />

                    <div style={motorRotorCapStyle}>
                      <div
                        style={{
                          ...motorShaftCenterStyle,
                          background: comp.state
                            ? 'conic-gradient(from 0deg, #00e676, #004d40, #00e676)'
                            : '#546e7a',
                          animation: comp.state ? 'spin 0.5s linear infinite' : 'none',
                        }}
                      />
                    </div>

                    <div style={motorBaseFeetStyle} />
                  </div>

                  <div style={motorTerminalBoardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                      <span style={{ fontSize: '8px', color: '#81d4fa', fontWeight: 'bold' }}>U1 V1 W1</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '30px' }}>
                      <span style={{ fontSize: '8px', color: '#ffd600', fontWeight: 'bold' }}>W2 U2 V2</span>
                    </div>
                  </div>

                  <span style={motorBadgeLabelStyle}>
                    {comp.name} {comp.state ? '• GIRANDO (380V)' : '• PARADO'}
                  </span>
                </div>
              )}

              {/* BOTOEIRA NA */}
              {isBtnNA && (
                <div style={{ ...circularDeviceContainer, outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div
                    onMouseDown={(e) => { e.stopPropagation(); handlePushButtonPress(comp.id); }}
                    onMouseUp={(e) => { e.stopPropagation(); handlePushButtonRelease(comp.id); }}
                    onMouseLeave={(e) => { e.stopPropagation(); handlePushButtonRelease(comp.id); }}
                    onTouchStart={(e) => { e.stopPropagation(); handlePushButtonPress(comp.id); }}
                    onTouchEnd={(e) => { e.stopPropagation(); handlePushButtonRelease(comp.id); }}
                    style={{
                      ...circularBezelStyle,
                      background: comp.state ? '#00e676' : '#2e7d32',
                      transform: comp.state ? 'scale(0.92)' : 'scale(1)',
                      boxShadow: comp.state
                        ? '0 0 16px rgba(0,230,118,0.8), inset 0 0 8px rgba(0,0,0,0.6)'
                        : 'inset 0 0 10px rgba(0,0,0,0.8), 0 4px 10px rgba(0,0,0,0.5)',
                    }}
                  >
                    <span style={{ fontSize: '9px', color: '#fff', fontWeight: 'bold' }}>
                      LIGA
                    </span>
                  </div>
                  <span style={deviceTagLabel}>{comp.tag}</span>
                </div>
              )}

              {/* BOTOEIRA NF DE EMERGÊNCIA */}
              {isBtnNF && (
                <div style={{ ...circularDeviceContainer, outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div
                    onClick={(e) => { e.stopPropagation(); handleToggleCompState(comp.id); }}
                    style={{
                      ...circularBezelStyle,
                      background: comp.state ? '#c62828' : '#37474f',
                      boxShadow: comp.state
                        ? '0 0 14px rgba(255,23,68,0.5), inset 0 0 8px rgba(0,0,0,0.6)'
                        : 'inset 0 0 10px rgba(0,0,0,0.8), 0 4px 10px rgba(0,0,0,0.5)',
                    }}
                  >
                    <span style={{ fontSize: '9px', color: '#fff', fontWeight: 'bold' }}>
                      {comp.state ? 'STOP' : 'TRAVADO'}
                    </span>
                  </div>
                  <span style={deviceTagLabel}>{comp.tag}</span>
                </div>
              )}

              {/* SINALEIROS CIRCULARES */}
              {isLamp && (
                <div style={{ ...circularDeviceContainer, outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div
                    style={{
                      ...circularBezelStyle,
                      background: comp.state ? '#00e676' : '#1b5e20',
                      boxShadow: comp.state ? '0 0 20px #00e676, inset 0 0 6px #fff' : 'inset 0 0 10px rgba(0,0,0,0.8)',
                    }}
                  >
                    <span style={{ fontSize: '8px', color: comp.state ? '#000' : '#81c784', fontWeight: 'bold' }}>
                      {comp.state ? 'ON' : 'OFF'}
                    </span>
                  </div>
                  <span style={deviceTagLabel}>{comp.tag}</span>
                </div>
              )}

              {/* PARAFUSOS DE BORNE */}
              {comp.terminals.map((t) => {
                const isOrigin = wiringOrigin?.compId === comp.id && wiringOrigin?.termId === t.id;

                return (
                  <div
                    key={t.id}
                    onClick={(e) => handleTerminalClick(e, comp.id, t.id)}
                    style={{
                      ...screwPoleStyle,
                      left: `${t.relX}%`,
                      top: `${t.relY}%`,
                      borderColor: isOrigin ? '#00e676' : '#b0bec5',
                      background: isOrigin ? '#00e676' : '#37474f',
                    }}
                    title={`Borne ${t.name} (${t.type})`}
                  >
                    <span style={terminalSubscriptLabel}>{t.name}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* 3. VISUALIZADOR MECÂNICO 3D */}
      <div style={bottomVisualizerRowStyle}>
        <div style={{ flex: '1 1 360px' }}>
          <MotorVisualizer loadTorquePercent={25} />
        </div>

        <div style={guideCardStyle}>
          <strong style={{ fontSize: '12px', color: '#00e676' }}>
            ⚡ Como Usar o Disjuntor WEG 3D e o Catálogo:
          </strong>
          <ul style={{ fontSize: '11px', color: '#cfd8dc', margin: '6px 0 0 16px', lineHeight: '1.6' }}>
            <li>
              <strong>Adicionar Disjuntor WEG MDW:</strong> Abra o botão <strong>📦 + Adicionar Componente</strong> e escolha <strong>Disjuntor Monopolar WEG MDW-C16 (3D Realista)</strong>.
            </li>
            <li>
              <strong>Inspeção 3D Realista:</strong> Clique duas vezes no disjuntor e pressione <strong>🔍 Inspecionar em 3D</strong> para manipulá-lo em órbita 3D e testar sobrecargas térmicas e magnéticas.
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
  boxShadow: '0 4px 12px rgba(2, 136, 209, 0.4)',
  transition: 'all 0.2s ease',
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
  padding: '16px',
};

const modalCardStyle: React.CSSProperties = {
  background: '#14181f',
  border: '1px solid #2d3748',
  borderRadius: '14px',
  width: '100%',
  maxWidth: '850px',
  maxHeight: '85vh',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
  overflow: 'hidden',
};

const modalHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 20px',
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
  padding: '10px 20px',
  borderBottom: '1px solid #232b36',
  flexWrap: 'wrap',
  background: '#0d1117',
};

const btnFilterTabStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '6px',
  padding: '6px 12px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
};

const catalogGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '12px',
  padding: '16px 20px',
  overflowY: 'auto',
  maxHeight: 'calc(85vh - 140px)',
};

const catalogCardItemStyle: React.CSSProperties = {
  background: '#1a202c',
  border: '1px solid #2d3748',
  borderRadius: '10px',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'all 0.2s ease',
};

const btnInsertItemStyle: React.CSSProperties = {
  background: '#00e676',
  border: 'none',
  borderRadius: '6px',
  color: '#000',
  padding: '8px 12px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
  width: '100%',
  transition: 'all 0.15s ease',
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

const btnInspectActionStyle: React.CSSProperties = {
  background: '#0288d1',
  border: 'none',
  borderRadius: '4px',
  color: '#fff',
  padding: '4px 10px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const btnInspectCardThumbStyle: React.CSSProperties = {
  background: '#0288d1',
  border: 'none',
  borderRadius: '3px',
  color: '#fff',
  padding: '2px',
  fontSize: '8px',
  fontWeight: 'bold',
  cursor: 'pointer',
  width: '100%',
  marginTop: '2px',
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
  padding: '5px 8px',
  fontSize: '10px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
};

const btnClearCablesBtnStyle: React.CSSProperties = {
  background: '#7f1d1d',
  border: '1px solid #ef4444',
  color: '#fff',
  borderRadius: '4px',
  padding: '5px 8px',
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
  cursor: 'crosshair',
};

const svgOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: 1,
};

const tagSidebarFloatingBox: React.CSSProperties = {
  position: 'absolute',
  top: '4px',
  left: 'calc(100% + 6px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '#13171d',
  border: '1px solid #374151',
  borderRadius: '4px',
  padding: '2px 4px',
  zIndex: 4,
};

const tagInputFieldStyle: React.CSSProperties = {
  width: '42px',
  background: '#0d1117',
  border: '1px solid #0288d1',
  color: '#00e676',
  fontSize: '9px',
  fontWeight: 'bold',
  borderRadius: '3px',
  padding: '2px',
  textAlign: 'center',
  outline: 'none',
};

const gridBusStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  background: '#263238',
  border: '2px solid #ff9800',
  borderRadius: '6px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '6px 4px',
  boxSizing: 'border-box',
  boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
};

const wegBreakerBodyStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  background: '#eceff1',
  border: '2px solid #90a4ae',
  borderRadius: '6px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '6px 4px',
  boxSizing: 'border-box',
  boxShadow: '0 8px 18px rgba(0,0,0,0.5)',
};

const contactorBodyStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  background: '#cfd8dc',
  border: '2px solid #78909c',
  borderRadius: '6px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '6px 4px',
  boxSizing: 'border-box',
  boxShadow: '0 8px 18px rgba(0,0,0,0.5)',
};

const thermalRelayStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  background: '#eceff1',
  border: '2px solid #b0bec5',
  borderRadius: '6px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '6px 4px',
  boxSizing: 'border-box',
  boxShadow: '0 8px 18px rgba(0,0,0,0.5)',
};

const rpfRelayStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  background: '#eceff1',
  border: '2px solid #90a4ae',
  borderRadius: '6px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '6px 4px',
  boxSizing: 'border-box',
  boxShadow: '0 8px 18px rgba(0,0,0,0.5)',
};

const auxBlockBodyStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  background: '#e0e0e0',
  border: '2px solid #757575',
  borderRadius: '6px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '6px 4px',
  boxSizing: 'border-box',
  boxShadow: '0 6px 14px rgba(0,0,0,0.4)',
};

const motorRealisticWrapperStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
};

const motorFinHousingStyle: React.CSSProperties = {
  position: 'relative',
  width: '120px',
  height: '110px',
  borderRadius: '50%',
  background: '#2b3644',
  border: '5px solid #005ea6',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 10px 24px rgba(0,0,0,0.7)',
};

const motorSideFinLeft: React.CSSProperties = {
  position: 'absolute',
  left: '-12px',
  top: '20px',
  bottom: '20px',
  width: '10px',
  background: 'repeating-linear-gradient(0deg, #005ea6, #005ea6 4px, #1a237e 4px, #1a237e 8px)',
  borderRadius: '3px 0 0 3px',
};

const motorSideFinRight: React.CSSProperties = {
  position: 'absolute',
  right: '-12px',
  top: '20px',
  bottom: '20px',
  width: '10px',
  background: 'repeating-linear-gradient(0deg, #005ea6, #005ea6 4px, #1a237e 4px, #1a237e 8px)',
  borderRadius: '0 3px 3px 0',
};

const motorRotorCapStyle: React.CSSProperties = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: '#37474f',
  border: '3px solid #78909c',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const motorShaftCenterStyle: React.CSSProperties = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  border: '2px solid #fff',
};

const motorBaseFeetStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '-8px',
  width: '100px',
  height: '10px',
  background: '#1e293b',
  border: '2px solid #005ea6',
  borderRadius: '3px',
};

const motorTerminalBoardStyle: React.CSSProperties = {
  width: '140px',
  background: '#0d1117',
  border: '2px solid #30363d',
  borderRadius: '6px',
  padding: '6px 4px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0 4px 10px rgba(0,0,0,0.6)',
};

const motorBadgeLabelStyle: React.CSSProperties = {
  fontSize: '9px',
  fontWeight: 'bold',
  color: '#00e676',
  textAlign: 'center',
  marginTop: '4px',
};

const currentDialKnobStyle: React.CSSProperties = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  background: '#263238',
  border: '2px solid #78909c',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const btnRelayActionStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '3px',
  color: '#fff',
  padding: '2px 5px',
  fontSize: '7px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const contactorCoreIndicator: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
};

const compHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #b0bec5',
  paddingBottom: '2px',
};

const wegLeverSlotStyle: React.CSSProperties = {
  position: 'relative',
  width: '32px',
  height: '65px',
  background: '#263238',
  borderRadius: '4px',
  margin: '0 auto',
  border: '1px solid #37474f',
};

const wegLeverHandleStyle: React.CSSProperties = {
  position: 'absolute',
  left: '2px',
  width: '26px',
  height: '22px',
  borderRadius: '3px',
  border: '1px solid #fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'top 0.15s ease',
  boxShadow: '0 2px 6px rgba(0,0,0,0.6)',
};

const circularDeviceContainer: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
};

const circularBezelStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  border: '4px solid #b0bec5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
};

const deviceTagLabel: React.CSSProperties = {
  fontSize: '9px',
  fontWeight: 'bold',
  color: '#cfd8dc',
  background: '#1e293b',
  padding: '1px 6px',
  borderRadius: '4px',
};

const screwPoleStyle: React.CSSProperties = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  border: '2px solid',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 3,
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