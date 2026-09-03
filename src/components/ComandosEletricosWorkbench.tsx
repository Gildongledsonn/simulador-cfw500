import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useInverter } from '../context/InverterContext';
import { MotorVisualizer } from './MotorVisualizer';

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
  | 'MOTOR_TRIFASICO_6P';

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
  lampColor?: LampColor;
  selectorPosition?: 'MAN' | '0' | 'AUT';
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

export type MultimeterScale = 'V_AC' | 'V_DC' | 'CURRENT_A' | 'CONTINUITY' | 'RESISTANCE_OHM' | 'DIODE';

export interface MeterProbePosition {
  compId: string;
  termId: string;
}

const CABLE_COLORS: Record<string, string> = {
  FORCA_R: '#ef4444',
  FORCA_S: '#f97316',
  FORCA_T: '#3b82f6',
  COMANDO_FASE: '#ec4899',
  COMANDO_NEUTRO: '#06b6d4',
  TERRA_PE: '#10b981',
  JUMPER_FECHAMENTO: '#eab308',
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
  { category: 'DISJUNTOR_MONOPOLAR', title: 'Disjuntor Monopolar DIN', subtitle: 'Ilustração vetorial 2D com corrente nominal ajustável', icon: '⚡', group: 'PROTECAO' },
  { category: 'DISJUNTOR_BIPOLAR', title: 'Disjuntor Bipolar 2P DIN', subtitle: 'Módulo duplo com corrente configurável', icon: '⚡', group: 'PROTECAO' },
  { category: 'DISJUNTOR_MOTOR', title: 'Disjuntor-Motor MPW', subtitle: 'Proteção magnética com manopla rotativa', icon: '🎛️', group: 'PROTECAO' },
  { category: 'RELE_TERMICO', title: 'Relé Térmico RW', subtitle: 'Proteção com botões teste/rearme', icon: '🔥', group: 'PROTECAO' },
  { category: 'RELE_FALTA_FASE', title: 'Relé Falta de Fase RPF', subtitle: 'LEDs indicadores de status e saída 11-12-14', icon: '📡', group: 'PROTECAO' },
  { category: 'CHAVE_SELETORA_3POS', title: 'Chave Seletora MAN - 0 - AUT', subtitle: 'Comutação de 3 posições com contatos 13-14 e 23-24', icon: '🔘', group: 'COMANDO' },
  { category: 'CONTATOR_TRIPOLAR', title: 'Contator de Força CWM', subtitle: 'Chave eletromagnética tripolar estilo Canva', icon: '🧲', group: 'COMANDO' },
  { category: 'BLOCO_AUXILIAR', title: 'Bloco de Contatos Auxiliares', subtitle: 'Contatos extras 13-14 e 21-22 sincronizados', icon: '📑', group: 'COMANDO' },
  { category: 'REGUA_BORNES', title: 'Régua de Bornes de Passagem', subtitle: '4 canais isolados para interligação', icon: '🧱', group: 'ALIMENTACAO' },
  { category: 'BARRAMENTO_PENTE', title: 'Barramento Pente 3F', subtitle: 'Distribuição trifásica de fases', icon: '📶', group: 'ALIMENTACAO' },
  { category: 'REDE_TRIFASICA', title: 'Rede Trifásica 380V', subtitle: 'Bornes de alimentação R, S, T, N, PE', icon: '⚡', group: 'ALIMENTACAO' },
  { category: 'REDE_MONOFASICA', title: 'Rede Monofásica 220V', subtitle: 'Fonte de alimentação F, N, PE', icon: '🔌', group: 'ALIMENTACAO' },
  { category: 'SECCIONADORA_LOTO', title: 'Chave Seccionadora LOTO', subtitle: 'Seccionador com bloqueio mecânico cadeado', icon: '🛑', group: 'SEGURANCA' },
  { category: 'TRANSFORMADOR_ISOLADOR', title: 'Trafo Isolador 220V/24V', subtitle: 'Extra baixa tensão de segurança galvânica', icon: '⚡', group: 'SEGURANCA' },
  { category: 'RELE_SEGURANCA_NR12', title: 'Relé de Segurança Cat 4', subtitle: 'Monitoramento redundante de parada imediata', icon: '🛡️', group: 'SEGURANCA' },
  { category: 'CHAVE_INTERTRAVAMENTO_NR12', title: 'Sensor de Proteção (NR-12)', subtitle: 'Chave de segurança de abertura de porta', icon: '🔒', group: 'SEGURANCA' },
  { category: 'BOTOEIRA_PULSO_NA', title: 'Botoeira Pulsadora Liga (NA)', subtitle: 'Botão verde com relevo e toque macio', icon: '🟢', group: 'COMANDO' },
  { category: 'BOTOEIRA_COGUMELO_NF', title: 'Botoeira de Emergência Cogumelo', subtitle: 'Cogumelo vermelho com retenção', icon: '🔴', group: 'COMANDO' },
  { category: 'SINALEIRO_LED', title: 'Sinalizador LED (Cores Trocáveis)', subtitle: 'Lâmpada estilizada com brilho dinâmico', icon: '💡', group: 'COMANDO' },
  { category: 'MOTOR_TRIFASICO_6P', title: 'Motor de Indução W22 (6 Pontas)', subtitle: 'Carcaça aletada estilo vetor técnico', icon: '⚙️', group: 'CARGAS' },
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
      width: 150,
      height: 85,
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
      x: 210,
      y: 30,
      width: 130,
      height: 85,
      state: true,
      terminals: [
        { id: 'F', name: 'F', relX: 25, relY: 80, type: 'COMANDO' },
        { id: 'N', name: 'N', relX: 55, relY: 80, type: 'COMANDO' },
        { id: 'PE', name: 'PE', relX: 85, relY: 80, type: 'TERRA' },
      ],
    },
  ]);

  const [cables, setCables] = useState<CableConnection[]>([]);
  const [selectedCableId, setSelectedCableId] = useState<string | null>(null);
  const [selectedCompId, setSelectedCompId] = useState<string | null>(null);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [catalogFilter, setCatalogFilter] = useState<'ALL' | 'ALIMENTACAO' | 'PROTECAO' | 'COMANDO' | 'SEGURANCA' | 'CARGAS'>('ALL');

  // MULTÍMETRO DIGITAL
  const [isMeterActive, setIsMeterActive] = useState(false);
  const [meterScale, setMeterScale] = useState<MultimeterScale>('V_AC');
  const [redProbe, setRedProbe] = useState<MeterProbePosition | null>(null);
  const [blackProbe, setBlackProbe] = useState<MeterProbePosition | null>(null);
  const [activeProbeTarget, setActiveProbeTarget] = useState<'RED' | 'BLACK'>('RED');
  const [meterReadout, setMeterReadout] = useState<string>('0.0 V');
  const [isContinuityBuzzer, setIsContinuityBuzzer] = useState(false);

  const [activeCableTool, setActiveCableTool] = useState<
    'FORCA_R' | 'FORCA_S' | 'FORCA_T' | 'COMANDO_FASE' | 'COMANDO_NEUTRO' | 'TERRA_PE' | 'JUMPER_FECHAMENTO' | null
  >(null);

  const [wiringOrigin, setWiringOrigin] = useState<{ compId: string; termId: string } | null>(null);
  const [draggingCompId, setDraggingCompId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<Point2D>({ x: 0, y: 0 });

  const panelRef = useRef<HTMLDivElement>(null);

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
    const fromTerm = fromComp?.terminals?.find((t) => t.id === fromTermId);
    const toTerm = toComp?.terminals?.find((t) => t.id === toTermId);

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

  // MOTOR DE CONTINUIDADE (BFS)
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
      } else if (comp.category === 'DISJUNTOR_MONOPOLAR') {
        if (comp.state) {
          addEdge(`${comp.id}:1`, `${comp.id}:2`);
        }
      } else if (comp.category === 'CHAVE_SELETORA_3POS') {
        if (comp.selectorPosition === 'MAN') {
          addEdge(`${comp.id}:13`, `${comp.id}:14`);
        } else if (comp.selectorPosition === 'AUT') {
          addEdge(`${comp.id}:23`, `${comp.id}:24`);
        }
      } else if (comp.category === 'REGUA_BORNES') {
        addEdge(`${comp.id}:X1_IN`, `${comp.id}:X1_OUT`);
        addEdge(`${comp.id}:X2_IN`, `${comp.id}:X2_OUT`);
        addEdge(`${comp.id}:X3_IN`, `${comp.id}:X3_OUT`);
        addEdge(`${comp.id}:X4_IN`, `${comp.id}:X4_OUT`);
      } else if (comp.category === 'BARRAMENTO_PENTE') {
        addEdge(`${comp.id}:R1`, `${comp.id}:R2`);
        addEdge(`${comp.id}:S1`, `${comp.id}:S2`);
        addEdge(`${comp.id}:T1`, `${comp.id}:T2`);
      } else if (comp.category === 'TRANSFORMADOR_ISOLADOR') {
        if (comp.state) {
          addEdge(`${comp.id}:SEC_L`, `${comp.id}:SEC_N`);
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
      } else if (comp.category === 'BOTOEIRA_PULSO_NA') {
        if (comp.state) {
          addEdge(`${comp.id}:3NO`, `${comp.id}:4NO`);
        }
      } else if (comp.category === 'BOTOEIRA_COGUMELO_NF') {
        if (comp.state) {
          addEdge(`${comp.id}:11NC`, `${comp.id}:12NC`);
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

    const phaseSources = ['comp_grid3p:R', 'comp_grid3p:S', 'comp_grid3p:T', 'comp_grid1p:F'];
    const neutralSources = ['comp_grid3p:N', 'comp_grid1p:N'];

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

    let stateChanged = false;
    const updated = components.map((c) => {
      const cleanTag = c.tag.toUpperCase().trim();
      const shouldBeActive = energizedTags.has(cleanTag);

      if (c.category === 'CONTATOR_TRIPOLAR' || c.category === 'BLOCO_AUXILIAR') {
        if (c.state !== shouldBeActive) {
          stateChanged = true;
          return { ...c, state: shouldBeActive };
        }
      }
      if (c.category === 'SINALEIRO_LED') {
        const x1 = isNodeEnergizedByPhase(`${c.id}:X1`);
        const x2 = isNodeEnergizedByNeutral(`${c.id}:X2`);
        const lampOn = x1 && x2;
        if (c.state !== lampOn) {
          stateChanged = true;
          return { ...c, state: lampOn };
        }
      }
      if (c.category === 'MOTOR_TRIFASICO_6P') {
        if (c.state !== isMot3pPowered) {
          stateChanged = true;
          return { ...c, state: isMot3pPowered };
        }
      }
      return c;
    });

    if (stateChanged) {
      setComponents(updated);
    }

    if (isMot3pPowered && inverterState.motorStatus !== 'RUNNING') {
      dispatch({ type: 'PRESS_RUN' });
    } else if (!isMot3pPowered && inverterState.motorStatus === 'RUNNING') {
      dispatch({ type: 'PRESS_STOP' });
    }

    // MULTÍMETRO READOUT
    if (redProbe && blackProbe) {
      const nodeA = `${redProbe.compId}:${redProbe.termId}`;
      const nodeB = `${blackProbe.compId}:${blackProbe.termId}`;

      const aPhase = isNodeEnergizedByPhase(nodeA);
      const aNeutral = isNodeEnergizedByNeutral(nodeA);
      const bPhase = isNodeEnergizedByPhase(nodeB);
      const bNeutral = isNodeEnergizedByNeutral(nodeB);
      const hasDirectContinuity = hasPath(nodeA, nodeB);

      if (meterScale === 'V_AC') {
        if ((aPhase && bNeutral) || (bPhase && aNeutral)) {
          setMeterReadout('220.4 V~');
        } else if (aPhase && bPhase && nodeA !== nodeB) {
          setMeterReadout('380.2 V~');
        } else {
          setMeterReadout('0.0 V~');
        }
        setIsContinuityBuzzer(false);
      } else if (meterScale === 'V_DC') {
        const isTrafoSec = (nodeA.includes('SEC_') && nodeB.includes('SEC_'));
        setMeterReadout(isTrafoSec ? '24.1 V=' : '0.00 V=');
        setIsContinuityBuzzer(false);
      } else if (meterScale === 'CONTINUITY') {
        setMeterReadout(hasDirectContinuity ? '00.2 Ω (BIP)' : 'O.L (Aberto)');
        setIsContinuityBuzzer(hasDirectContinuity);
      } else if (meterScale === 'RESISTANCE_OHM') {
        setMeterReadout(hasDirectContinuity ? '0.4 Ω' : nodeA.includes('mot') && nodeB.includes('mot') ? '18.6 Ω' : 'O.L MΩ');
        setIsContinuityBuzzer(false);
      } else if (meterScale === 'DIODE') {
        setMeterReadout(hasDirectContinuity ? '.001 V' : 'O.L V');
        setIsContinuityBuzzer(false);
      } else if (meterScale === 'CURRENT_A') {
        setMeterReadout(isMot3pPowered && (nodeA.includes('2T1') || nodeA.includes('U1')) ? '6.42 A~' : '0.00 A~');
        setIsContinuityBuzzer(false);
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
    if (!panelRef.current || !draggingCompId) return;
    const panelRect = panelRef.current.getBoundingClientRect();

    const newX = Math.max(10, Math.min(panelRect.width - 160, clientX - panelRect.left - dragOffset.x));
    const newY = Math.max(10, Math.min(panelRect.height - 180, clientY - panelRect.top - dragOffset.y));

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
    setSelectedCableId(null);
  };

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

  const handleInsertComponentToProject = (category: ComponentCategory) => {
    const count = components.length + 1;
    let tag = `C${count}`;
    let name = 'Módulo';
    let width = 95;
    let height = 155;
    let terminals: TerminalPole[] = [];
    let currentRating: number | undefined = undefined;
    let lampColor: LampColor | undefined = undefined;

    const isBreaker =
      category === 'DISJUNTOR_MONOPOLAR' ||
      category === 'DISJUNTOR_BIPOLAR' ||
      category === 'DISJUNTOR_MOTOR';

    if (isBreaker) {
      currentRating = 16;
    }

    if (category === 'DISJUNTOR_MONOPOLAR') {
      tag = `Q${count}`;
      name = 'Disj. Mono DIN';
      width = 75;
      height = 160;
      terminals = [
        { id: '1', name: '1 (L)', relX: 50, relY: 8, type: 'COMANDO' },
        { id: '2', name: '2 (Carga)', relX: 50, relY: 92, type: 'COMANDO' },
      ];
    } else if (category === 'DISJUNTOR_BIPOLAR') {
      tag = `Q${count}`;
      name = 'Disjuntor MDW 2P';
      width = 90;
      height = 160;
      terminals = [
        { id: '1L1', name: '1', relX: 30, relY: 8, type: 'COMANDO' },
        { id: '3L2', name: '3', relX: 70, relY: 8, type: 'COMANDO' },
        { id: '2T1', name: '2', relX: 30, relY: 92, type: 'COMANDO' },
        { id: '4T2', name: '4', relX: 70, relY: 92, type: 'COMANDO' },
      ];
    } else if (category === 'DISJUNTOR_MOTOR') {
      tag = `Q${count}`;
      name = 'Disjuntor MPW';
      width = 105;
      height = 175;
      currentRating = 20;
      terminals = [
        { id: '1L1', name: '1/L1', relX: 20, relY: 8, type: 'FORCA' },
        { id: '3L2', name: '3/L2', relX: 50, relY: 8, type: 'FORCA' },
        { id: '5L3', name: '5/L3', relX: 80, relY: 8, type: 'FORCA' },
        { id: '2T1', name: '2/T1', relX: 20, relY: 92, type: 'FORCA' },
        { id: '4T2', name: '4/T2', relX: 50, relY: 92, type: 'FORCA' },
        { id: '6T3', name: '6/T3', relX: 80, relY: 92, type: 'FORCA' },
      ];
    } else if (category === 'SINALEIRO_LED') {
      tag = `H${count}`;
      name = 'Sinalizador';
      width = 70;
      height = 105;
      lampColor = 'VERDE';
      terminals = [
        { id: 'X1', name: 'X1', relX: 50, relY: 8, type: 'COMANDO' },
        { id: 'X2', name: 'X2', relX: 50, relY: 92, type: 'COMANDO' },
      ];
    } else if (category === 'CHAVE_SELETORA_3POS') {
      tag = `SA${count}`;
      name = 'Seletora MAN-0-AUT';
      width = 90;
      height = 145;
      terminals = [
        { id: '13', name: '13', relX: 30, relY: 10, type: 'COMANDO' },
        { id: '23', name: '23', relX: 70, relY: 10, type: 'COMANDO' },
        { id: '14', name: '14', relX: 30, relY: 90, type: 'COMANDO' },
        { id: '24', name: '24', relX: 70, relY: 90, type: 'COMANDO' },
      ];
    } else if (category === 'REGUA_BORNES') {
      tag = `XT${count}`;
      name = 'Régua de Bornes';
      width = 130;
      height = 135;
      terminals = [
        { id: 'X1_IN', name: '1', relX: 20, relY: 10, type: 'FORCA' },
        { id: 'X2_IN', name: '2', relX: 40, relY: 10, type: 'FORCA' },
        { id: 'X3_IN', name: '3', relX: 60, relY: 10, type: 'FORCA' },
        { id: 'X4_IN', name: '4', relX: 80, relY: 10, type: 'COMANDO' },
        { id: 'X1_OUT', name: '1', relX: 20, relY: 90, type: 'FORCA' },
        { id: 'X2_OUT', name: '2', relX: 40, relY: 90, type: 'FORCA' },
        { id: 'X3_OUT', name: '3', relX: 60, relY: 90, type: 'FORCA' },
        { id: 'X4_OUT', name: '4', relX: 80, relY: 90, type: 'COMANDO' },
      ];
    } else if (category === 'BARRAMENTO_PENTE') {
      tag = `BAR${count}`;
      name = 'Barramento Pente 3F';
      width = 130;
      height = 70;
      terminals = [
        { id: 'R1', name: 'R1', relX: 20, relY: 20, type: 'FORCA' },
        { id: 'S1', name: 'S1', relX: 50, relY: 20, type: 'FORCA' },
        { id: 'T1', name: 'T1', relX: 80, relY: 20, type: 'FORCA' },
        { id: 'R2', name: 'R2', relX: 20, relY: 80, type: 'FORCA' },
        { id: 'S2', name: 'S2', relX: 50, relY: 80, type: 'FORCA' },
        { id: 'T2', name: 'T2', relX: 80, relY: 80, type: 'FORCA' },
      ];
    } else if (category === 'SECCIONADORA_LOTO') {
      tag = `QS${count}`;
      name = 'Chave LOTO NR-10';
      width = 100;
      height = 155;
      terminals = [
        { id: '1L1', name: '1', relX: 25, relY: 8, type: 'FORCA' },
        { id: '3L2', name: '3', relX: 50, relY: 8, type: 'FORCA' },
        { id: '5L3', name: '5', relX: 75, relY: 8, type: 'FORCA' },
        { id: '2T1', name: '2', relX: 25, relY: 92, type: 'FORCA' },
        { id: '4T2', name: '4', relX: 50, relY: 92, type: 'FORCA' },
        { id: '6T3', name: '6', relX: 75, relY: 92, type: 'FORCA' },
      ];
    } else if (category === 'TRANSFORMADOR_ISOLADOR') {
      tag = `TR${count}`;
      name = 'Trafo 220V/24V';
      width = 105;
      height = 135;
      terminals = [
        { id: 'PRI_L1', name: '220V', relX: 30, relY: 8, type: 'COMANDO' },
        { id: 'PRI_L2', name: '0V', relX: 70, relY: 8, type: 'COMANDO' },
        { id: 'SEC_L', name: '+24V', relX: 30, relY: 92, type: 'COMANDO' },
        { id: 'SEC_N', name: '0V', relX: 70, relY: 92, type: 'COMANDO' },
      ];
    } else if (category === 'RELE_SEGURANCA_NR12') {
      tag = `SR${count}`;
      name = 'Relé Segurança Cat 4';
      width = 115;
      height = 165;
      terminals = [
        { id: 'A1', name: 'A1', relX: 20, relY: 8, type: 'COMANDO' },
        { id: 'A2', name: 'A2', relX: 50, relY: 8, type: 'COMANDO' },
        { id: 'S11', name: 'S11', relX: 80, relY: 8, type: 'COMANDO' },
        { id: '13NO', name: '13', relX: 30, relY: 92, type: 'COMANDO' },
        { id: '14NO', name: '14', relX: 70, relY: 92, type: 'COMANDO' },
      ];
    } else if (category === 'CHAVE_INTERTRAVAMENTO_NR12') {
      tag = `SQ${count}`;
      name = 'Intertravamento';
      width = 85;
      height = 125;
      terminals = [
        { id: '11NC', name: '11', relX: 30, relY: 8, type: 'COMANDO' },
        { id: '21NC', name: '21', relX: 70, relY: 8, type: 'COMANDO' },
        { id: '12NC', name: '12', relX: 30, relY: 92, type: 'COMANDO' },
        { id: '22NC', name: '22', relX: 70, relY: 92, type: 'COMANDO' },
      ];
    } else if (category === 'BOTOEIRA_PULSO_NA') {
      tag = `S${count}`;
      name = 'Botão Liga NA';
      width = 70;
      height = 105;
      terminals = [
        { id: '3NO', name: '3', relX: 50, relY: 8, type: 'COMANDO' },
        { id: '4NO', name: '4', relX: 50, relY: 92, type: 'COMANDO' },
      ];
    } else if (category === 'BOTOEIRA_COGUMELO_NF') {
      tag = `S${count}`;
      name = 'Emergência NF';
      width = 70;
      height = 105;
      terminals = [
        { id: '11NC', name: '11', relX: 50, relY: 8, type: 'COMANDO' },
        { id: '12NC', name: '2', relX: 50, relY: 92, type: 'COMANDO' },
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
    } else if (category === 'CONTATOR_TRIPOLAR') {
      tag = `K${count}`;
      name = `Contator CWM25`;
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
      x: 80 + (components.length % 3) * 30,
      y: 140 + (components.length % 4) * 30,
      width,
      height,
      state: true,
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

  const selectedCableObj = cables.find((c) => c.id === selectedCableId);
  const selectedCompObj = components.find((c) => c.id === selectedCompId);

  const filteredCatalog = CATALOG_ITEMS.filter((item) =>
    catalogFilter === 'ALL' ? true : item.group === catalogFilter
  );

  return (
    <div style={containerStyle}>
      {/* 1. BARRA SUPERIOR */}
      <div style={topControlBarStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setIsCatalogModalOpen(true)}
            style={btnOpenCatalogStyle}
          >
            📦 + Adicionar Componente
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
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#00e676' }}>
            🔌 Cabos:
          </span>

          <button onClick={() => { setActiveCableTool('FORCA_R'); setWiringOrigin(null); }} style={{ ...btnCableSelectStyle, background: activeCableTool === 'FORCA_R' ? '#ef4444' : '#263238', borderColor: '#f87171', color: '#fff' }}>R</button>
          <button onClick={() => { setActiveCableTool('FORCA_S'); setWiringOrigin(null); }} style={{ ...btnCableSelectStyle, background: activeCableTool === 'FORCA_S' ? '#f97316' : '#263238', borderColor: '#fb923c', color: '#fff' }}>S</button>
          <button onClick={() => { setActiveCableTool('FORCA_T'); setWiringOrigin(null); }} style={{ ...btnCableSelectStyle, background: activeCableTool === 'FORCA_T' ? '#3b82f6' : '#263238', borderColor: '#60a5fa', color: '#fff' }}>T</button>
          <button onClick={() => { setActiveCableTool('COMANDO_FASE'); setWiringOrigin(null); }} style={{ ...btnCableSelectStyle, background: activeCableTool === 'COMANDO_FASE' ? '#ec4899' : '#263238', borderColor: '#f472b6', color: '#fff' }}>Comando</button>
          <button onClick={() => { setActiveCableTool('COMANDO_NEUTRO'); setWiringOrigin(null); }} style={{ ...btnCableSelectStyle, background: activeCableTool === 'COMANDO_NEUTRO' ? '#06b6d4' : '#263238', borderColor: '#22d3ee', color: '#fff' }}>0V / Neutro</button>
          <button onClick={() => { setActiveCableTool('JUMPER_FECHAMENTO'); setWiringOrigin(null); }} style={{ ...btnCableSelectStyle, background: activeCableTool === 'JUMPER_FECHAMENTO' ? '#eab308' : '#263238', borderColor: '#fde047', color: '#000', fontWeight: 'bold' }}>⭐/🔺 Jumper</button>
          <button onClick={() => { setCables([]); setWiringOrigin(null); setSelectedCableId(null); setSelectedCompId(null); }} style={btnClearCablesBtnStyle}>🗑️</button>
        </div>
      </div>

      {/* MULTÍMETRO DIGITAL */}
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

      {/* MODAL / BIBLIOTECA */}
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

      {/* BARRA DE SELEÇÃO */}
      {selectedCompObj ? (
        <div style={{ ...selectedCableAlertBarStyle, borderColor: '#ffd600', background: 'rgba(255, 214, 0, 0.15)', color: '#fff' }}>
          <span>📦 <strong>Selecionado:</strong> {selectedCompObj.name} ({selectedCompObj.tag})</span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={handleRemoveSelectedComponent} style={btnDeleteSingleCableStyle}>❌ Excluir</button>
            <button onClick={() => setSelectedCompId(null)} style={btnDeselectCableStyle}>Fechar</button>
          </div>
        </div>
      ) : selectedCableObj ? (
        <div style={selectedCableAlertBarStyle}>
          <span>📍 <strong>Cabo:</strong> {selectedCableObj.cableType}</span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={() => { setCables((prev) => prev.filter((c) => c.id !== selectedCableObj.id)); setSelectedCableId(null); }} style={btnDeleteSingleCableStyle}>❌ Remover</button>
            <button onClick={() => setSelectedCableId(null)} style={btnDeselectCableStyle}>Fechar</button>
          </div>
        </div>
      ) : isMeterActive ? (
        <div style={{ ...wiringPromptBarStyle, background: 'rgba(234, 179, 8, 0.15)', borderColor: '#eab308', color: '#fef08a' }}>
          📟 <strong>Multímetro Ativo:</strong> Toque no borne para posicionar a ponta <strong style={{ color: activeProbeTarget === 'RED' ? '#ef4444' : '#fff' }}>{activeProbeTarget === 'RED' ? 'VERMELHA (+)' : 'PRETA (-)'}</strong>.
        </div>
      ) : wiringOrigin ? (
        <div style={wiringPromptBarStyle}>⚡ Toque no <strong>borne de destino</strong> para conectar o cabo.</div>
      ) : null}

      {/* 2. PAINEL DE MONTAGEM (CANVA 2D VECTORIAL) */}
      <div
        ref={panelRef}
        onMouseMove={(e) => handleMoveDrag(e.clientX, e.clientY)}
        onMouseUp={handleEndDrag}
        onTouchMove={(e) => {
          if (e.touches.length > 0) {
            handleMoveDrag(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        onTouchEnd={handleEndDrag}
        onClick={() => { setSelectedCableId(null); setSelectedCompId(null); }}
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
              <g key={cb.id} onClick={(e) => { e.stopPropagation(); setSelectedCableId(cb.id); setSelectedCompId(null); }}>
                <path d={pathString} fill="none" stroke="transparent" strokeWidth="24" style={{ cursor: 'pointer', pointerEvents: 'stroke' }} />
                <path d={pathString} fill="none" stroke={isSelected ? '#00e676' : 'rgba(0,0,0,0.55)'} strokeWidth={isSelected ? '7' : '5'} strokeDasharray={isSelected ? '6,4' : 'none'} />
                <path d={pathString} fill="none" stroke={color} strokeWidth={isSelected ? '4.5' : '3.5'} strokeLinecap="round" strokeLinejoin="round" />
              </g>
            );
          })}
        </svg>

        {components.map((comp) => {
          const isSelected = selectedCompId === comp.id;
          const isGrid = comp.category.startsWith('REDE_');
          const isQ = comp.category.startsWith('DISJUNTOR');
          const isK = comp.category === 'CONTATOR_TRIPOLAR';
          const isF = comp.category === 'RELE_TERMICO';
          const isRPF = comp.category === 'RELE_FALTA_FASE';
          const isAux = comp.category === 'BLOCO_AUXILIAR';
          const isMotor = comp.category === 'MOTOR_TRIFASICO_6P';
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
              {/* CAIXA DE CONFIGURAÇÃO FLUTUANTE EXTERNA */}
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
                    <span style={{ fontSize: '6px', color: '#38bdf8', fontWeight: 'bold' }}>AMPERES</span>
                    <select
                      value={comp.currentRating}
                      onChange={(e) => handleCurrentRatingChange(comp.id, Number(e.target.value))}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      style={selectAmperageStyle}
                    >
                      {AMPERAGE_OPTIONS.map((amp) => (
                        <option key={amp} value={amp}>
                          {String(amp) + ' A'}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {isLamp && (
                  <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '6px', color: '#ffd600', fontWeight: 'bold' }}>COR</span>
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
                )}
              </div>

              {/* BARRAMENTO PENTE ESTILO CANVA */}
              {isPente && (
                <div style={{ ...canvaCardBase, outline: isSelected ? '3px dashed #00e676' : 'none', background: '#334155' }}>
                  <div style={compHeaderStyle}>
                    <strong style={{ fontSize: '9px', color: '#38bdf8' }}>PENTE 3F</strong>
                    <span style={{ fontSize: '8px', color: '#fff' }}>{comp.tag}</span>
                  </div>
                  <span style={{ fontSize: '8px', color: '#94a3b8', textAlign: 'center', marginTop: '6px' }}>Barramento R-S-T</span>
                </div>
              )}

              {/* RÉGUA DE BORNES ESTILO CANVA */}
              {isRegua && (
                <div style={{ ...canvaCardBase, outline: isSelected ? '3px dashed #00e676' : 'none', background: '#1e293b' }}>
                  <div style={compHeaderStyle}>
                    <strong style={{ fontSize: '9px', color: '#00e676' }}>BORNES DIN</strong>
                    <span style={{ fontSize: '8px', color: '#94a3b8' }}>{comp.tag}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '8px', color: '#cbd5e1', marginTop: '6px' }}>
                    <span>X1</span><span>X2</span><span>X3</span><span>X4</span>
                  </div>
                </div>
              )}

              {/* CHAVE SELETORA 3 POSIÇÕES ESTILO CANVA */}
              {isSelector && (
                <div style={{ ...canvaCardBase, outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div style={compHeaderStyle}>
                    <strong style={{ fontSize: '8px', color: '#0288d1' }}>SELETORA</strong>
                    <span style={{ fontSize: '9px', color: '#37474f', fontWeight: 'bold' }}>{comp.tag}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '8px 0' }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSelectorToggle(comp.id); }}
                      style={{
                        ...btnRelayActionStyle,
                        background: comp.selectorPosition === '0' ? '#475569' : '#0288d1',
                        padding: '4px 8px',
                        fontSize: '9px',
                      }}
                    >
                      {comp.selectorPosition === 'MAN' && '👈 MAN'}
                      {comp.selectorPosition === '0' && '⚪ 0'}
                      {comp.selectorPosition === 'AUT' && '👉 AUT'}
                    </button>
                  </div>
                </div>
              )}

              {/* REDE DE ALIMENTAÇÃO ESTILO CANVA */}
              {isGrid && (
                <div style={{ ...canvaCardBase, outline: isSelected ? '3px dashed #00e676' : 'none', background: '#263238', borderColor: '#ff9800' }}>
                  <div style={compHeaderStyle}>
                    <strong style={{ fontSize: '9px', color: '#ffb74d' }}>ALIMENTAÇÃO</strong>
                    <span style={{ fontSize: '9px', color: '#fff', fontWeight: 'bold' }}>{comp.tag}</span>
                  </div>
                  <span style={{ fontSize: '8px', color: '#cfd8dc', textAlign: 'center', marginTop: '4px' }}>
                    {comp.name}
                  </span>
                </div>
              )}

              {/* TRANSFORMADOR ISOLADOR 24V */}
              {isTrafo && (
                <div style={{ ...canvaCardBase, borderColor: '#00e676', outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div style={compHeaderStyle}>
                    <strong style={{ fontSize: '8px', color: '#2e7d32' }}>TRAFO 24V</strong>
                    <span style={{ fontSize: '9px', color: '#455a64', fontWeight: 'bold' }}>{comp.tag}</span>
                  </div>
                  <div style={{ textAlign: 'center', margin: '6px 0' }}>
                    <span style={{ fontSize: '8px', color: '#00e676', fontWeight: 'bold' }}>SELV / PELV</span>
                  </div>
                  <span style={{ fontSize: '7px', color: '#546e7a', textAlign: 'center', fontWeight: 'bold' }}>{comp.name}</span>
                </div>
              )}

              {/* CHAVE SECCIONADORA LOTO */}
              {isLoto && (
                <div style={{ ...canvaCardBase, borderColor: '#ef5350', outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div style={compHeaderStyle}>
                    <strong style={{ fontSize: '8px', color: '#c62828' }}>LOTO NR-10</strong>
                    <span style={{ fontSize: '9px', color: '#455a64', fontWeight: 'bold' }}>{comp.tag}</span>
                  </div>
                  <div style={wegLeverSlotStyle}>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setComponents((prev) =>
                          prev.map((c) => (c.id === comp.id ? { ...c, state: !c.state } : c))
                        );
                      }}
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

              {/* RELÉ DE SEGURANÇA (NR-12) */}
              {isSafeRelay && (
                <div style={{ ...canvaCardBase, borderColor: '#ffd600', background: '#fffde7', outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div style={compHeaderStyle}>
                    <strong style={{ fontSize: '8px', color: '#f57f17' }}>RELÉ NR-12</strong>
                    <span style={{ fontSize: '9px', color: '#455a64', fontWeight: 'bold' }}>{comp.tag}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', margin: '4px 0' }}>
                    <span style={{ fontSize: '8px', color: comp.tripped ? '#d32f2f' : '#2e7d32', fontWeight: 'bold' }}>
                      {comp.tripped ? 'EMERGÊNCIA' : 'SEGURO'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setComponents((prev) =>
                          prev.map((c) => (c.id === comp.id ? { ...c, tripped: !c.tripped } : c))
                        );
                      }}
                      style={{ ...btnRelayActionStyle, background: comp.tripped ? '#d32f2f' : '#37474f' }}
                    >
                      {comp.tripped ? 'Rearmar' : 'Falha'}
                    </button>
                  </div>
                  <span style={{ fontSize: '7px', color: '#546e7a', textAlign: 'center', fontWeight: 'bold' }}>{comp.name}</span>
                </div>
              )}

              {/* CHAVE DE INTERTRAVAMENTO (NR-12) */}
              {isInterlock && (
                <div style={{ ...canvaCardBase, borderColor: '#fbc02d', outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div style={compHeaderStyle}>
                    <strong style={{ fontSize: '8px', color: '#f57f17' }}>INTERTRAV.</strong>
                    <span style={{ fontSize: '9px', color: '#455a64', fontWeight: 'bold' }}>{comp.tag}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '4px 0' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setComponents((prev) =>
                          prev.map((c) => (c.id === comp.id ? { ...c, state: !c.state } : c))
                        );
                      }}
                      style={{ ...btnRelayActionStyle, background: comp.state ? '#2e7d32' : '#c62828' }}
                    >
                      {comp.state ? 'FECHADA' : 'ABERTA'}
                    </button>
                  </div>
                  <span style={{ fontSize: '7px', color: '#546e7a', textAlign: 'center', fontWeight: 'bold' }}>{comp.name}</span>
                </div>
              )}

              {/* DISJUNTORES 2D ESTILO CANVA */}
              {isQ && (
                <div style={{ ...canvaCardBase, outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div style={compHeaderStyle}>
                    <strong style={{ fontSize: '9px', color: '#005ea6' }}>WEG</strong>
                    <span style={{ fontSize: '8px', color: '#005ea6', fontWeight: 'bold' }}>
                      {'C' + String(comp.currentRating || 16)}
                    </span>
                  </div>

                  <div style={wegLeverSlotStyle}>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setComponents((prev) =>
                          prev.map((c) => (c.id === comp.id ? { ...c, state: !c.state } : c))
                        );
                      }}
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
                  <span style={{ fontSize: '8px', color: '#546e7a', textAlign: 'center', fontWeight: 'bold' }}>
                    {comp.name + ' - C' + String(comp.currentRating || 16) + 'A'}
                  </span>
                </div>
              )}

              {/* CONTATOR TRIPOLAR ESTILO CANVA */}
              {isK && (
                <div style={{ ...canvaCardBase, outline: isSelected ? '3px dashed #00e676' : 'none', background: '#e2e8f0' }}>
                  <div style={compHeaderStyle}>
                    <strong style={{ fontSize: '9px', color: '#005ea6' }}>WEG</strong>
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
                      {comp.state ? 'ATRACADO' : 'ABERTO'}
                    </span>
                  </div>
                  <span style={{ fontSize: '8px', color: '#546e7a', textAlign: 'center', fontWeight: 'bold' }}>{comp.name}</span>
                </div>
              )}

              {/* RELÉ TÉRMICO ESTILO CANVA */}
              {isF && (
                <div style={{ ...canvaCardBase, outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div style={compHeaderStyle}>
                    <strong style={{ fontSize: '8px', color: '#d32f2f' }}>RW27</strong>
                    <span style={{ fontSize: '9px', color: '#37474f', fontWeight: 'bold' }}>{comp.tag}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', margin: '6px 0' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setComponents((prev) =>
                          prev.map((c) => (c.id === comp.id ? { ...c, tripped: !c.tripped } : c))
                        );
                      }}
                      style={{ ...btnRelayActionStyle, background: comp.tripped ? '#d32f2f' : '#b71c1c' }}
                    >
                      {comp.tripped ? 'TRIP' : 'TEST'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', background: '#b0bec5', padding: '1px 0', borderRadius: '2px' }}>
                    <span style={{ fontSize: '7px', color: '#1a237e', fontWeight: 'bold' }}>95 96 NC</span>
                    <span style={{ fontSize: '7px', color: '#b71c1c', fontWeight: 'bold' }}>97 98 NO</span>
                  </div>
                </div>
              )}

              {/* RELÉ FALTA DE FASE */}
              {isRPF && (
                <div style={{ ...canvaCardBase, outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div style={compHeaderStyle}>
                    <strong style={{ fontSize: '8px', color: '#0288d1' }}>RPF-01</strong>
                    <span style={{ fontSize: '9px', color: '#37474f', fontWeight: 'bold' }}>{comp.tag}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', margin: '4px 0' }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: comp.state && !comp.tripped ? '#00e676' : '#263238' }} />
                      <span style={{ fontSize: '7px', color: '#37474f' }}>PWR</span>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: comp.tripped ? '#ff1744' : '#263238' }} />
                      <span style={{ fontSize: '7px', color: '#37474f' }}>FALHA</span>
                    </div>
                  </div>
                </div>
              )}

              {/* BLOCO AUXILIAR */}
              {isAux && (
                <div style={{ ...canvaCardBase, outline: isSelected ? '3px dashed #00e676' : 'none', background: '#f1f5f9' }}>
                  <div style={compHeaderStyle}>
                    <strong style={{ fontSize: '8px', color: '#005ea6' }}>BLOCO AUX</strong>
                    <span style={{ fontSize: '9px', color: '#37474f', fontWeight: 'bold' }}>{comp.tag}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', margin: '6px 0' }}>
                    <span style={{ fontSize: '7px', color: '#455a64' }}>Com {comp.tag}</span>
                    <span style={{ fontSize: '8px', color: comp.state ? '#00e676' : '#90a4ae', fontWeight: 'bold' }}>
                      {comp.state ? '13-14 ON' : '21-22 ON'}
                    </span>
                  </div>
                </div>
              )}

              {/* MOTOR 2D ESTILO VETORIAL CANVA */}
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
                </div>
              )}

              {/* SINALEIRO LED COM TROCA DE CORES */}
              {isLamp && (
                <div style={{ ...circularDeviceContainer, outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div
                    style={{
                      ...circularBezelStyle,
                      background: comp.state
                        ? (LAMP_COLOR_CONFIG[comp.lampColor || 'VERDE'] || LAMP_COLOR_CONFIG.VERDE).on
                        : (LAMP_COLOR_CONFIG[comp.lampColor || 'VERDE'] || LAMP_COLOR_CONFIG.VERDE).off,
                      boxShadow: comp.state ? (LAMP_COLOR_CONFIG[comp.lampColor || 'VERDE'] || LAMP_COLOR_CONFIG.VERDE).glow : 'inset 0 0 10px rgba(0,0,0,0.8)',
                    }}
                  >
                    <span style={{ fontSize: '8px', color: comp.state ? '#000' : '#cbd5e1', fontWeight: 'bold' }}>
                      {comp.state ? 'ON' : 'OFF'}
                    </span>
                  </div>
                  <span style={deviceTagLabel}>{comp.tag} ({(LAMP_COLOR_CONFIG[comp.lampColor || 'VERDE'] || LAMP_COLOR_CONFIG.VERDE).label})</span>
                </div>
              )}

              {/* BOTOEIRA NA */}
              {isBtnNA && (
                <div style={{ ...circularDeviceContainer, outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setComponents((prev) => prev.map((c) => (c.id === comp.id ? { ...c, state: true } : c)));
                    }}
                    onMouseUp={(e) => {
                      e.stopPropagation();
                      setComponents((prev) => prev.map((c) => (c.id === comp.id ? { ...c, state: false } : c)));
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      setComponents((prev) => prev.map((c) => (c.id === comp.id ? { ...c, state: true } : c)));
                    }}
                    onTouchEnd={(e) => {
                      e.stopPropagation();
                      setComponents((prev) => prev.map((c) => (c.id === comp.id ? { ...c, state: false } : c)));
                    }}
                    style={{
                      ...circularBezelStyle,
                      background: comp.state ? '#22c55e' : '#15803d',
                      transform: comp.state ? 'scale(0.92)' : 'scale(1)',
                      boxShadow: comp.state
                        ? '0 0 16px rgba(34,197,94,0.8), inset 0 0 8px rgba(0,0,0,0.6)'
                        : 'inset 0 0 10px rgba(0,0,0,0.8), 0 4px 10px rgba(0,0,0,0.5)',
                    }}
                  >
                    <span style={{ fontSize: '9px', color: '#fff', fontWeight: 'bold' }}>LIGA</span>
                  </div>
                  <span style={deviceTagLabel}>{comp.tag}</span>
                </div>
              )}

              {/* BOTOEIRA NF */}
              {isBtnNF && (
                <div style={{ ...circularDeviceContainer, outline: isSelected ? '3px dashed #00e676' : 'none' }}>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setComponents((prev) => prev.map((c) => (c.id === comp.id ? { ...c, state: !c.state } : c)));
                    }}
                    style={{
                      ...circularBezelStyle,
                      background: comp.state ? '#ef4444' : '#334155',
                      boxShadow: comp.state
                        ? '0 0 16px rgba(239,68,68,0.6), inset 0 0 8px rgba(0,0,0,0.6)'
                        : 'inset 0 0 10px rgba(0,0,0,0.8), 0 4px 10px rgba(0,0,0,0.5)',
                    }}
                  >
                    <span style={{ fontSize: '8px', color: '#fff', fontWeight: 'bold' }}>
                      {comp.state ? 'STOP' : 'TRAV'}
                    </span>
                  </div>
                  <span style={deviceTagLabel}>{comp.tag}</span>
                </div>
              )}

              {/* BORNES DE CONEXÃO */}
              {comp.terminals?.map((t) => {
                const isOrigin = wiringOrigin?.compId === comp.id && wiringOrigin?.termId === t.id;
                const isRedProbeAttached = redProbe?.compId === comp.id && redProbe?.termId === t.id;
                const isBlackProbeAttached = blackProbe?.compId === comp.id && blackProbe?.termId === t.id;

                return (
                  <div
                    key={t.id}
                    onClick={(e) => handleTerminalClick(e, comp.id, t.id)}
                    onTouchEnd={(e) => handleTerminalClick(e, comp.id, t.id)}
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

      {/* 3. VISUALIZADOR MECÂNICO 3D */}
      <div style={bottomVisualizerRowStyle}>
        <div style={{ flex: '1 1 360px' }}>
          <MotorVisualizer loadTorquePercent={25} />
        </div>

        <div style={guideCardStyle}>
          <strong style={{ fontSize: '12px', color: '#00e676' }}>
            ⚡ Bancada de Comandos (Estilo Canva 2D):
          </strong>
          <ul style={{ fontSize: '11px', color: '#cfd8dc', margin: '6px 0 0 16px', lineHeight: '1.6' }}>
            <li>
              <strong>Design Ilustrado e Preciso:</strong> Modelos 2D otimizados para desenho didático vetorial estilo apostila técnica e Canva.
            </li>
            <li>
              <strong>Controle Exclusivo de Amperagem:</strong> Altere a corrente nominal nos disjuntores e troque as cores dos sinaleiros em tempo real.
            </li>
            <li>
              <strong>Multímetro Integrado:</strong> Medições de tensão, corrente e teste de continuidade com bip.
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
  zIndex: 1,
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

// ESTILO BASE CANVA PARA EQUIPAMENTOS 2D VETORIAIS
const canvaCardBase: React.CSSProperties = {
  width: '100%',
  height: '100%',
  background: '#f8fafc',
  border: '2px solid #cbd5e1',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '8px 6px',
  boxSizing: 'border-box',
  boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
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
  boxShadow: '0 6px 16px rgba(0,0,0,0.5)',
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
};

const btnRelayActionStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '4px',
  color: '#fff',
  padding: '4px 8px',
  fontSize: '8px',
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
  borderBottom: '1px solid #cbd5e1',
  paddingBottom: '2px',
};

const wegLeverSlotStyle: React.CSSProperties = {
  position: 'relative',
  width: '32px',
  height: '65px',
  background: '#334155',
  borderRadius: '4px',
  margin: '0 auto',
  border: '1px solid #475569',
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
  boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
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
  width: '52px',
  height: '52px',
  borderRadius: '50%',
  border: '4px solid #cbd5e1',
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
  width: '14px',
  height: '14px',
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