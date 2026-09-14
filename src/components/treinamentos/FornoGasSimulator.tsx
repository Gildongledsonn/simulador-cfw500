import { evaluateOvenCircuit, advanceOven, initialOven } from '../../utils/ovenCircuit';
import React, { useState, useRef, useEffect, useCallback } from 'react';

export type CableType =
  | 'FORCA_FASE'
  | 'FORCA_NEUTRO'
  | 'TERRA_PE'
  | 'SINAL_ION'
  | 'SINAL_TERMOPAR'
  | 'COMANDO_GAS'
  | 'COMANDO_VAPOR'
  | 'ALTA_TENSAO';

export const CABLE_COLORS: Record<CableType, string> = {
  FORCA_FASE: '#ef4444',
  FORCA_NEUTRO: '#3b82f6',
  TERRA_PE: '#10b981',
  SINAL_ION: '#22c55e',
  SINAL_TERMOPAR: '#eab308',
  COMANDO_GAS: '#f97316',
  COMANDO_VAPOR: '#06b6d4',
  ALTA_TENSAO: '#a855f7',
};

export interface Point2D {
  x: number;
  y: number;
}

export interface TerminalPole {
  id: string;
  name: string;
  relX: number;
  relY: number;
  type: 'FORCA' | 'COMANDO' | 'TERRA';
  desc?: string;
}

export interface PlacedComponent {
  id: string;
  tag: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  terminals: TerminalPole[];
}

export interface CableConnection {
  id: string;
  fromComponentId: string;
  fromTerminalId: string;
  toComponentId: string;
  toTerminalId: string;
  cableType: CableType;
  waypoints?: Point2D[];
}

interface InovaParameter {
  code: string;
  name: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  step: number;
  defaultVal: number;
  menu: string;
}

const FULL_30_PARAMETERS: InovaParameter[] = [
  { code: 'F-01', name: 'Tipo (0=Elétrico, 1=Gás, 2=Lenha, 3=Elétrico sem jumper)', value: 1, min: 0, max: 3, unit: 'tipo', step: 1, defaultVal: 1, menu: 'N4' },
  { code: 'F-02', name: 'Tempo de ignição acionada', value: 5, min: 2, max: 15, unit: 'seg', step: 1, defaultVal: 5, menu: 'N4' },
  { code: 'F-03', name: 'Intervalo entre acionamentos da ignição', value: 3, min: 1, max: 10, unit: 'seg', step: 1, defaultVal: 3, menu: 'N4' },
  { code: 'F-04', name: 'Número de tentativas de ignição', value: 3, min: 1, max: 5, unit: 'tent', step: 1, defaultVal: 3, menu: 'N4' },
  { code: 'F-05', name: 'Habilitação do segundo sensor de chama (CH2)', value: 0, min: 0, max: 1, unit: 'hab', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'F-06', name: 'Configuração do controle de acendimento', value: 0, min: 0, max: 1, unit: 'cfg', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'F-07', name: 'Limite inferior do setpoint de temperatura', value: 0, min: -10, max: 760, unit: '°C', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'F-08', name: 'Limite superior do setpoint de temperatura', value: 760, min: -10, max: 760, unit: '°C', step: 5, defaultVal: 760, menu: 'N4' },
  { code: 'F-09', name: 'Offset do sensor de temperatura', value: 0, min: -15, max: 15, unit: '°C', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'F-10', name: 'Modo de funcionamento do vapor', value: 0, min: 0, max: 2, unit: 'modo', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'F-11', name: 'Temperatura mínima para liberação de vapor', value: 60, min: -10, max: 760, unit: '°C', step: 1, defaultVal: 60, menu: 'N4' },
  { code: 'F-12', name: 'Escala de tempo do temporizador', value: 1, min: 0, max: 3, unit: 'esc', step: 1, defaultVal: 1, menu: 'N4' },
  { code: 'F-13', name: 'Ordem de contagem do temporizador', value: 0, min: 0, max: 1, unit: 'ord', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'F-14', name: 'Modo de disparo do temporizador', value: 0, min: 0, max: 2, unit: 'mod', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'F-15', name: 'Modo de reset do temporizador', value: 0, min: 0, max: 2, unit: 'rst', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'F-16', name: 'Tempo de espera para reset automático', value: 5, min: 0, max: 999, unit: 'seg', step: 1, defaultVal: 5, menu: 'N4' },
  { code: 'F-17', name: 'Saída auxiliar (Lâmpada/Turbina)', value: 0, min: 0, max: 2, unit: 'sai', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'F-18', name: 'Controle da turbina pela tecla com porta fechada', value: 1, min: 0, max: 1, unit: 'hab', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'F-19', name: 'Estado da turbina ao energizar', value: 0, min: 0, max: 1, unit: 'st', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'F-20', name: 'Modo de acionamento do relé do temporizador', value: 0, min: 0, max: 1, unit: 'mod', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'F-21', name: 'Modo da entrada E1 (sensor de porta)', value: 0, min: 0, max: 1, unit: 'e1', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'F-22', name: 'Modo de reinício de contagem após porta aberta', value: 0, min: 0, max: 1, unit: 'rst', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'F-23', name: 'Habilitação do controle de temperatura', value: 0, min: 0, max: 2, unit: 'hab', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'F-24', name: 'Retardo para controle térmico após inicialização a gás', value: 0, min: 0, max: 30, unit: 'seg', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'F-25', name: 'Sentido do controle (0=aquecimento, 1=refrigeração; modo elétrico)', value: 0, min: 0, max: 1, unit: 'mod', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'F-26', name: 'Após temporização: 0=manter aquecimento, 1=desligar', value: 0, min: 0, max: 1, unit: 'st', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'F-27', name: 'Registro de temperatura máxima alcançada', value: 0, min: 0, max: 1200, unit: '°C', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'F-28', name: 'Contador de excesso de temperatura', value: 0, min: 0, max: 9999, unit: 'vezes', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'F-29', name: 'Tempo de controle térmico com porta aberta', value: 0, min: 0, max: 255, unit: 'seg', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'F-30', name: 'Uso de senha nos níveis N2 e N3', value: 0, min: 0, max: 1, unit: 'pwd', step: 1, defaultVal: 0, menu: 'N4' },
  { code: 'U-L', name: 'Duração do pulso de vapor (mínimo didático: 1 s)', value: 6, min: 1, max: 255, unit: 'seg', step: 1, defaultVal: 6, menu: 'N3' },
  { code: 'U-d', name: 'Intervalo de vapor desligado', value: 1, min: 0, max: 255, unit: 'min', step: 1, defaultVal: 1, menu: 'N3' },
  { code: 'HStr', name: 'Histerese de aquecimento ON/OFF', value: 2, min: 1, max: 20, unit: '°C', step: 1, defaultVal: 2, menu: 'N5' },
];

const tPole = (
  id: string,
  name: string,
  relX: number,
  relY: number,
  type: 'FORCA' | 'COMANDO' | 'TERRA' = 'COMANDO',
  desc?: string
): TerminalPole => ({
  id,
  name,
  relX,
  relY,
  type,
  desc,
});

const SYSTEM_GAS_INOVA_TERMINALS: TerminalPole[] = [
  tPole('PIN_1', '1', 4.0, 18, 'COMANDO', 'Termopar (-) [Borne 1]'),
  tPole('PIN_2', '2', 11.6, 18, 'COMANDO', 'Termopar (+) [Borne 2]'),
  tPole('PIN_3', '3', 19.2, 18, 'COMANDO', 'PT100 (3º fio; sem uso com tipo J) [Borne 3]'),
  tPole('PIN_4', '4', 26.8, 18, 'COMANDO', 'PTC motor (entrada 1)'),
  tPole('PIN_5', '5', 34.4, 18, 'COMANDO', 'PTC motor (entrada 2)'),
  tPole('PIN_8', '8', 57.2, 18, 'COMANDO', 'CH1 - Sensor de Chama 1'),
  tPole('PIN_9', '9', 64.8, 18, 'COMANDO', 'CH2 - Sensor de Chama 2'),
  tPole('PIN_10', '10', 72.4, 18, 'COMANDO', 'E2 - Disparo do Timer'),
  tPole('PIN_11', '11', 80.0, 18, 'COMANDO', 'E1 - Sensor de Porta'),
  tPole('PIN_13', '13', 95.2, 18, 'COMANDO', 'Bz - Beep 12Vcc'),
  tPole('PIN_14', '14', 4.0, 82, 'COMANDO', 'Neutro da Rede'),
  tPole('PIN_15', '15', 11.6, 82, 'FORCA', 'Fase da Rede (1)'),
  tPole('PIN_16', '16', 19.2, 82, 'FORCA', 'Comum S5/S3/S2'),
  tPole('PIN_17', '17', 26.8, 82, 'COMANDO', 'S5 - Reversão / Temporizador'),
  tPole('PIN_19', '19', 42.0, 82, 'COMANDO', 'S3 - Saída Auxiliar'),
  tPole('PIN_20', '20', 49.6, 82, 'COMANDO', 'S2 - Válvula de Vapor'),
  tPole('PIN_21', '21', 57.2, 82, 'FORCA', 'Comum S1 (ignição)'),
  tPole('PIN_22', '22', 64.8, 82, 'COMANDO', 'S1 - Saída Ignição'),
  tPole('PIN_23', '23 (Vago)', 72.4, 82, 'COMANDO', 'Borne 23 Nulo / Vago'),
  tPole('PIN_24', '24', 80.0, 82, 'COMANDO', 'S4 contato 1: entrada de fase para ligação em série'),
  tPole('PIN_25', '25', 87.6, 82, 'COMANDO', 'S4 - Válvula Solenoide de Gás'),
  tPole('PIN_26', '26', 95.2, 82, 'FORCA', 'Comum S4: junção dos dois contatos; sem cabo no exemplo em série'),
  tPole('PIN_7', '7', 49.6, 18, 'TERRA', 'Terra do Sensor de Chama'),
];

const INITIAL_COMPONENTS: PlacedComponent[] = [
  {
    id: 'comp_forca',
    tag: 'GRID',
    name: 'Entrada de Força 220V',
    x: 40,
    y: 440,
    width: 170,
    height: 100,
    terminals: [
      tPole('FORCA_L', 'L', 25, 65, 'FORCA', 'Fase 220V'),
      tPole('FORCA_N', 'N', 50, 65, 'COMANDO', 'Neutro'),
      tPole('FORCA_PE', 'PE', 75, 65, 'TERRA', 'Terra Proteção'),
    ],
  },
  {
    id: 'comp_dj',
    tag: 'Q1',
    name: 'Disjuntor Bipolar (F + N)',
    x: 270,
    y: 410,
    width: 170,
    height: 170,
    terminals: [
      tPole('DJ_IN_1', '1', 28, 12, 'FORCA', 'Entrada Fase 1'),
      tPole('DJ_IN_N', '3', 72, 12, 'COMANDO', 'Entrada Neutro 3'),
      tPole('DJ_OUT_2', '2', 28, 88, 'FORCA', 'Saída Fase 2'),
      tPole('DJ_OUT_N', '4', 72, 88, 'COMANDO', 'Saída Neutro 4'),
    ],
  },
  {
    id: 'comp_inova_bornes',
    tag: 'INV_BORNES',
    name: 'Régua 26 Bornes Inova',
    x: 320,
    y: 30,
    width: 680,
    height: 130,
    terminals: SYSTEM_GAS_INOVA_TERMINALS,
  },
  {
    id: 'comp_usina',
    tag: 'IGN1',
    name: 'Usina de Ignição (S1 -> B22)',
    x: 500,
    y: 420,
    width: 170,
    height: 130,
    terminals: [
      tPole('USINA_L', 'Comando', 26, 40, 'COMANDO', 'Borne 22 (S1)'),
      tPole('USINA_N', 'Neutro', 74, 40, 'COMANDO', 'Borne 14 (Neutro)'),
      tPole('USINA_HV', 'HV', 50, 84, 'FORCA', 'Saída Alta Tensão'),
    ],
  },
  {
    id: 'comp_valvulas',
    tag: 'VALVS',
    name: 'Válvulas (Gás B25 & Vapor B20)',
    x: 730,
    y: 410,
    width: 230,
    height: 160,
    terminals: [
      tPole('VALV_GAS_1', 'Gás (+)', 35, 42, 'COMANDO', 'Borne 25 (S4 Gás)'),
      tPole('VALV_GAS_2', 'Gás (N)', 65, 42, 'COMANDO', 'Borne 14 (Neutro)'),
      tPole('VALV_AGUA_1', 'Vapor+', 35, 82, 'COMANDO', 'Borne 20 (S2 Vapor)'),
      tPole('VALV_AGUA_2', 'Vapor-', 65, 82, 'COMANDO', 'Borne 14 (Neutro)'),
    ],
  },
  {
    id: 'comp_queimador',
    tag: 'FORNO',
    name: 'Forno Combinado & Sensores',
    x: 1040,
    y: 30,
    width: 260,
    height: 380,
    terminals: [
      tPole('SPARK_ELECTRODE', 'SPK', 20, 16, 'FORCA', 'Centelhador'),
      tPole('FLAME_ROD_1', 'CH1', 48, 16, 'COMANDO', 'Borne 8 (Sensor Chama 1)'),
      tPole('FLAME_ROD_2', 'CH2', 76, 16, 'COMANDO', 'Borne 9 (Sensor Chama 2)'),
      tPole('CH_TERRA', 'Terra S.', 18, 55, 'TERRA', 'Borne 7 (Terra Sensor)'),
      tPole('TERMOPAR_J_PLUS', 'TJ+', 32, 92, 'COMANDO', 'Borne 2 (Tipo J +)'),
      tPole('TERMOPAR_J_MINUS', 'TJ-', 68, 92, 'COMANDO', 'Borne 1 (Tipo J -)'),
    ],
  },
];

export const FornoGasSimulator: React.FC = () => {
  const [components, setComponents] = useState<PlacedComponent[]>(INITIAL_COMPONENTS);
  const [cables, setCables] = useState<CableConnection[]>([]);
  const [activeCableTool, setActiveCableTool] = useState<CableType>('FORCA_FASE');

  const [wiringOrigin, setWiringOrigin] = useState<{ compId: string; termId: string } | null>(null);
  const [activeWaypoints, setActiveWaypoints] = useState<Point2D[]>([]);
  const [mousePos, setMousePos] = useState<Point2D | null>(null);

  const [editingCableId, setEditingCableId] = useState<string | null>(null);
  const [modalPos, setModalPos] = useState<Point2D>({ x: 0, y: 0 });

  const [draggingCompId, setDraggingCompId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<Point2D>({ x: 0, y: 0 });
  const workbenchRef = useRef<HTMLDivElement | null>(null);

  const [disjuntorArmado, setDisjuntorArmado] = useState<boolean>(false);
  const [oven, setOven] = useState(initialOven);
  const systemRunning = !['off', 'fault'].includes(oven.phase);
  const currentBaseTemp = oven.temperature;
  const [setpointTemp, setSetpointTemp] = useState<number>(180);

  const [isProgMode, setIsProgMode] = useState<boolean>(false);
  const [params, setParams] = useState<InovaParameter[]>(() => FULL_30_PARAMETERS.map(p => ({ ...p })));
  const [paramIndex, setParamIndex] = useState<number>(0);

  const gridStatus = evaluateOvenCircuit(cables, disjuntorArmado);
  const isEnergizado = gridStatus.isEnergizado;
  const offset = params[8].value;
  const effectiveTemp = currentBaseTemp + offset;
  const igniting = oven.spark && isEnergizado;
  const valveOpen = oven.gas && isEnergizado;
  const flame1Lit = oven.phase === 'heating' && valveOpen && gridStatus.sensor1Ok;
  const flame2Lit = flame1Lit && params[4].value === 1 && gridStatus.sensor2Ok;
  const errorCode = oven.error;
  const [vaporRemaining, setVaporRemaining] = useState(0);
  const [vaporWait, setVaporWait] = useState(0);
  const vaporAllowed = systemRunning && isEnergizado && !errorCode && gridStatus.termoparOk && gridStatus.valvulaAguaOk && params[9].value !== 2 && effectiveTemp >= params[10].value;
  const waterValveActive = vaporAllowed && vaporRemaining > 0;
  const [statusMessage, setStatusMessage] = useState('Monte o circuito desenergizado ou carregue o exemplo para estudar as ligações.');
  const settings = { ignition: params[1].value, interval: params[2].value, attempts: params[3].value,
    secondSensor: params[4].value === 1, ignitionFirst: params[5].value === 1, delay: params[23].value,
    setpoint: setpointTemp, offset, hysteresis: params.find(p => p.code === 'HStr')!.value };
  const latest = useRef({ gridStatus, settings, vaporAllowed });
  latest.current = { gridStatus, settings, vaporAllowed };
  useEffect(() => {
    const timer = window.setInterval(() => {
      const live = latest.current;
      setOven(prev => advanceOven(prev, live.gridStatus, live.settings, 0.1));
      setVaporRemaining(prev => live.vaporAllowed ? Math.max(0, prev - 0.1) : 0);
      setVaporWait(prev => Math.max(0, prev - 0.1));
    }, 100);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    const messages = { off: 'Sistema parado.', delay: 'Retardo inicial F-24 (não representa purga).',
      ignition: 'Ignição em andamento.', interval: 'Intervalo F-03 entre tentativas.',
      heating: 'Chama reconhecida. Aquecendo.', satisfied: 'Temperatura atingida. Gás fechado; aguardando histerese.',
      fault: 'Falha: saídas desligadas. Corrija a ligação e reinicie.' };
    setStatusMessage(messages[oven.phase]);
  }, [oven.phase]);
  useEffect(() => {
    setSetpointTemp(prev => Math.max(params[6].value, Math.min(params[7].value, prev)));
  }, [params]);

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

  const renderOrthogonalSmoothPath = (rawPts: Point2D[]): string => {
    if (rawPts.length < 2) return '';

    const orthoPts: Point2D[] = [rawPts[0]];

    for (let i = 1; i < rawPts.length; i++) {
      const pPrev = orthoPts[orthoPts.length - 1];
      const pCurr = rawPts[i];

      if (pPrev.x === pCurr.x || pPrev.y === pCurr.y) {
        orthoPts.push(pCurr);
      } else {
        const dy = Math.abs(pCurr.y - pPrev.y);
        const dx = Math.abs(pCurr.x - pPrev.x);

        if (dy > dx && (pPrev.y < 200 || pPrev.y > 400)) {
          orthoPts.push({ x: pPrev.x, y: pCurr.y });
        } else {
          orthoPts.push({ x: pCurr.x, y: pPrev.y });
        }
        orthoPts.push(pCurr);
      }
    }

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

    let d = `M ${cleanPts[0].x} ${cleanPts[0].y}`;
    const targetRadius = 35;

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

  const handleStartDrag = (clientX: number, clientY: number, compId: string) => {
    const comp = components.find((c) => c.id === compId);
    if (!comp || !workbenchRef.current) return;

    const panelRect = workbenchRef.current.getBoundingClientRect();
    setDraggingCompId(compId);
    setDragOffset({
      x: clientX - panelRect.left - comp.x,
      y: clientY - panelRect.top - comp.y,
    });
  };

  const handleMoveDrag = (clientX: number, clientY: number) => {
    if (!workbenchRef.current) return;
    const panelRect = workbenchRef.current.getBoundingClientRect();
    const currX = clientX - panelRect.left;
    const currY = clientY - panelRect.top;

    setMousePos({ x: currX, y: currY });

    if (!draggingCompId) return;

    const newX = Math.max(10, currX - dragOffset.x);
    const newY = Math.max(10, currY - dragOffset.y);

    setComponents((prev) =>
      prev.map((c) => (c.id === draggingCompId ? { ...c, x: newX, y: newY } : c))
    );
  };

  const handleEndDrag = () => {
    setDraggingCompId(null);
  };

  const handleWorkbenchClick = (e: React.MouseEvent) => {
    if (!wiringOrigin || !workbenchRef.current) return;
    const rect = workbenchRef.current.getBoundingClientRect();
    const clickPt: Point2D = {
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    };

    setActiveWaypoints((prev) => [...prev, clickPt]);
  };

  const handleTerminalClick = (e: React.MouseEvent, compId: string, termId: string) => {
    e.stopPropagation();

    if (compId === 'comp_inova_bornes' && termId === 'PIN_23') {
      setStatusMessage('AVISO: O Borne 23 é vago/nulo.');
      return;
    }
    if (!wiringOrigin) {
      setWiringOrigin({ compId, termId });
      setActiveWaypoints([]);
      setStatusMessage(`Cabo iniciado em ${compId}:${termId}. Escolha a identificação visual do cabo e clique no borne de destino.`);
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
      setStatusMessage('Cabo conectado! Dê 2 cliques nele para mudar a cor ou excluir.');
    }
  };

  const handleCableDoubleClick = (e: React.MouseEvent, cableId: string) => {
    e.stopPropagation();
    if (!workbenchRef.current) return;
    const rect = workbenchRef.current.getBoundingClientRect();
    setModalPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setEditingCableId(cableId);
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

  const isTermoparConectado = () => gridStatus.termoparOk;
  const startBurnerCycle = () => {
    if (!isEnergizado || !gridStatus.termoparOk || params[0].value !== 1) {
      setStatusMessage('Confira alimentação 14/15, termopar 1(-)/2(+) e modo gás F-01=1.');
      return;
    }
    setIsProgMode(false);
    setOven(prev => ({ ...initialOven(), temperature: prev.temperature, phase: 'delay' }));
  };
  const triggerVapor = () => {
    if (!vaporAllowed || vaporWait > 0) {
      setStatusMessage('Vapor bloqueado: confira ligação, F-10, temperatura mínima F-11 e intervalo U-d.');
      return;
    }
    const duration = params.find(p => p.code === 'U-L')!.value;
    setVaporRemaining(duration);
    setVaporWait(duration + params.find(p => p.code === 'U-d')!.value * 60);
  };
  useEffect(() => {
    if (params[9].value === 1 && vaporAllowed && vaporWait <= 0 && vaporRemaining <= 0) triggerVapor();
  }, [params, vaporAllowed, vaporWait, vaporRemaining]);
  const stopBurnerCycle = () => {
    setOven(prev => ({ ...initialOven(), temperature: prev.temperature }));
    setVaporRemaining(0);
    setVaporWait(0);
  };
  const resetCircuit = () => {
    stopBurnerCycle(); setDisjuntorArmado(false); setOven(initialOven());
    setCables([]); setWiringOrigin(null); setActiveWaypoints([]); setEditingCableId(null);
    setIsProgMode(false); setParamIndex(0); setSetpointTemp(180);
    setParams(FULL_30_PARAMETERS.map(p => ({ ...p })));
  };
  const loadExample = () => {
    resetCircuit();
    const links = [
      ['comp_forca:FORCA_L','comp_dj:DJ_IN_1'], ['comp_forca:FORCA_N','comp_dj:DJ_IN_N'],
      ...[15,16,21,24].map(n => ['comp_dj:DJ_OUT_2', `comp_inova_bornes:PIN_${n}`]),
      ['comp_dj:DJ_OUT_N','comp_inova_bornes:PIN_14'],
      ...['comp_usina:USINA_N','comp_valvulas:VALV_GAS_2','comp_valvulas:VALV_AGUA_2'].map(n => ['comp_dj:DJ_OUT_N',n]),
      ['comp_inova_bornes:PIN_22','comp_usina:USINA_L'], ['comp_inova_bornes:PIN_25','comp_valvulas:VALV_GAS_1'],
      ['comp_inova_bornes:PIN_20','comp_valvulas:VALV_AGUA_1'], ['comp_usina:USINA_HV','comp_queimador:SPARK_ELECTRODE'],
      ['comp_inova_bornes:PIN_1','comp_queimador:TERMOPAR_J_MINUS'], ['comp_inova_bornes:PIN_2','comp_queimador:TERMOPAR_J_PLUS'],
      ['comp_inova_bornes:PIN_8','comp_queimador:FLAME_ROD_1'], ['comp_inova_bornes:PIN_9','comp_queimador:FLAME_ROD_2'],
      ['comp_forca:FORCA_PE','comp_inova_bornes:PIN_7'], ['comp_forca:FORCA_PE','comp_queimador:CH_TERRA'],
    ];
    setCables(links.map(([a,b], i) => {
      const [fromComponentId,fromTerminalId] = a.split(':'); const [toComponentId,toTerminalId] = b.split(':');
      const cableType: CableType = a.includes('PE') ? 'TERRA_PE' : b.includes('TERMOPAR') ? 'SINAL_TERMOPAR' : b.includes('FLAME') ? 'SINAL_ION' : b.includes('ELECTRODE') ? 'ALTA_TENSAO' : a.includes('OUT_N') || a.includes('FORCA_N') ? 'FORCA_NEUTRO' : 'FORCA_FASE';
      return { id: `example_${i}`, fromComponentId, fromTerminalId, toComponentId, toTerminalId, cableType };
    }));
    setStatusMessage('Exemplo carregado, disjuntor desligado. Arme Q1 e inicie o ciclo.');
  };

  const handlePgmClick = () => {
    if (!isEnergizado || systemRunning) return;
    if (!isProgMode) {
      setIsProgMode(true);
      setParamIndex(0);
    } else {
      if (paramIndex + 1 < params.length) {
        setParamIndex((prev) => prev + 1);
      } else {
        setIsProgMode(false);
        setParamIndex(0);
      }
    }
  };

  const editableCodes = new Set(['F-02','F-03','F-04','F-05','F-06','F-07','F-08','F-09','F-10','F-11','F-24','U-L','U-d','HStr']);
  const adjustValue = (direction: number) => {
    if (!isEnergizado || systemRunning) return;
    if (!isProgMode) {
      setSetpointTemp(p => Math.max(params[6].value, Math.min(params[7].value, p + direction * 5)));
      return;
    }
    setParams(prev => prev.map((p, i) => {
      if (i !== paramIndex || !editableCodes.has(p.code)) return p;
      const min = p.code === 'F-08' || p.code === 'F-11' ? prev[6].value : p.min;
      const max = p.code === 'F-07' || p.code === 'F-11' ? prev[7].value : p.max;
      return { ...p, value: Math.max(min, Math.min(max, p.value + direction * p.step)) };
    }));
  };
  const handleUpClick = () => adjustValue(1);
  const handleDownClick = () => adjustValue(-1);

  const format4Digit = (val: number | string) => (typeof val === 'number' ? Math.round(val) : val).toString().padStart(4, '0');
  const activeParam = params[paramIndex];

  const getDisplayTemperature = () => {
    if (!isEnergizado) return '';
    if (!isTermoparConectado()) return 'tEr';
    if (errorCode) return errorCode;
    if (isProgMode) return activeParam.code;
    return format4Digit(effectiveTemp);
  };

  return (
    <div
      style={{
        backgroundColor: '#070a10',
        color: '#f8fafc',
        padding: '16px 20px',
        borderRadius: '16px',
        border: '1px solid #1e293b',
        width: '100%',
        maxWidth: '1680px',
        margin: '0 auto',
        fontFamily: 'sans-serif',
        boxSizing: 'border-box',
        userSelect: draggingCompId ? 'none' : 'auto',
      }}
      onMouseMove={(e) => handleMoveDrag(e.clientX, e.clientY)}
      onMouseUp={handleEndDrag}
    >
      {/* Topo / Barra de Ferramentas */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '12px', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#f59e0b', margin: 0 }}>
            SIMULADOR DE FORNO A GÁS — INOVA INV-YB1-11 (TIPO J)
          </h2>
          <p style={{ fontSize: '11px', color: '#94a3b8', margin: '2px 0 0 0' }}>
            Modelo didático: ligações, ignição, aquecimento ON/OFF e vapor. F2 inicia/para o ensaio; PGM percorre os ajustes com o ciclo parado.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={loadExample}>Carregar exemplo</button>
          {wiringOrigin && (
            <button
              onClick={() => { setWiringOrigin(null); setActiveWaypoints([]); }}
              style={{ backgroundColor: '#dc2626', color: '#fff', fontWeight: 'bold', padding: '7px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '11px' }}
            >
              ✕ Cancelar Cabo (ESC)
            </button>
          )}
          <button
            onClick={() => setComponents(INITIAL_COMPONENTS)}
            style={{ backgroundColor: '#1e293b', color: '#38bdf8', fontWeight: 600, padding: '7px 12px', borderRadius: '8px', border: '1px solid #0284c7', cursor: 'pointer', fontSize: '11px' }}
          >
            🔄 Resetar Posições
          </button>
          <button
            onClick={resetCircuit}
            style={{ backgroundColor: '#1e293b', color: '#cbd5e1', fontWeight: 600, padding: '7px 12px', borderRadius: '8px', border: '1px solid #334155', cursor: 'pointer', fontSize: '11px' }}
          >
            🗑️ Limpar Cabos
          </button>
        </div>
      </div>

      <details style={{ marginBottom: 12, fontSize: 13 }}>
        <summary>Guia de ligação e limites do ensaio</summary>
        <p>Alimentação: 14/15. Termopar J: 1 negativo, 2 positivo. Ignição: comum 21, saída 22. Vapor: comum 16, saída 20. Gás: fase em 24 e válvula em 25, com os dois contatos S4 em série pelo comum 26 (sem cabo externo no exemplo). Retornos das cargas ao neutro. Sensores CH1/CH2 em 8/9 e aterramento do queimador em 7/PE.</p>
        <p>A ligação permite simular chama; não reproduz medição real de ionização, vazão, purga, intertravamento de porta ou temporizador de processo. A resposta térmica é acelerada. O vapor só funciona durante o ensaio; U-L=0 e PID não são simulados.</p>
        <a href="https://www.inova.ind.br/images/YB1-11-J-H-F.pdf" target="_blank" rel="noreferrer">Manual oficial Inova (MN189V10.12)</a>
      </details>

      {/* Seletor de Cores de Cabo */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#0f172a', padding: '10px 14px', borderRadius: '10px', border: '1px solid #1e293b', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#00e676' }}>🔌 Tipo de Cabo:</span>
          {(
            [
              ['FORCA_FASE', 'Fase 220V (Vermelho)'],
              ['FORCA_NEUTRO', 'Neutro (Azul)'],
              ['TERRA_PE', 'PE Terra (Verde)'],
              ['SINAL_ION', 'Ionização (Verde Claro)'],
              ['SINAL_TERMOPAR', 'Termopar J (Amarelo)'],
              ['COMANDO_GAS', 'Válvula Gás (Laranja)'],
              ['COMANDO_VAPOR', 'Válvula Água (Ciano)'],
              ['ALTA_TENSAO', 'Alta Tensão HV (Roxo)'],
            ] as [CableType, string][]
          ).map(([type, label]) => (
            <button
              key={type}
              onClick={() => setActiveCableTool(type)}
              style={{
                backgroundColor: activeCableTool === type ? CABLE_COLORS[type] : '#1e293b',
                color: '#fff',
                border: activeCableTool === type ? '2px solid #fff' : `1px solid ${CABLE_COLORS[type]}`,
                borderRadius: '6px',
                padding: '5px 10px',
                fontSize: '10px',
                fontWeight: 700,
                cursor: 'pointer',
                transform: activeCableTool === type ? 'scale(1.05)' : 'none',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {wiringOrigin && (
          <span style={{ fontSize: '11px', color: '#fde047', fontFamily: 'monospace', backgroundColor: 'rgba(234,179,8,0.1)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(234,179,8,0.3)' }}>
            Origem: <strong>{wiringOrigin.compId}:{wiringOrigin.termId}</strong> ({activeWaypoints.length} curvas em 90°)
          </span>
        )}
      </div>

      {/* BANCADA PANORÂMICA */}
      <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '10px' }}>
        <div
          ref={workbenchRef}
          onClick={handleWorkbenchClick}
          style={{
            position: 'relative',
            width: '100%',
            minWidth: '1480px',
            height: '760px',
            backgroundColor: '#04070d',
            borderRadius: '12px',
            border: '2px dashed #1e293b',
            overflow: 'hidden',
            backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            marginBottom: '16px',
            cursor: wiringOrigin ? 'crosshair' : 'default',
          }}
        >
          {/* CAMADA SVG: CABOS ORTOGONAIS EM 90° COM CURVA ABERTA */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 4,
              pointerEvents: 'none',
            }}
          >
            {/* Cabos Concluídos */}
            {cables.map((cb) => {
              const p1 = getTerminalAbsolutePos(cb.fromComponentId, cb.fromTerminalId);
              const p2 = getTerminalAbsolutePos(cb.toComponentId, cb.toTerminalId);
              const allPoints = cb.waypoints && cb.waypoints.length > 0 ? [p1, ...cb.waypoints, p2] : [p1, p2];
              const pathString = renderOrthogonalSmoothPath(allPoints);
              const color = CABLE_COLORS[cb.cableType] || '#fff';
              const isHV = cb.cableType === 'ALTA_TENSAO';

              return (
                <g
                  key={cb.id}
                  style={{ pointerEvents: 'stroke' }}
                  onDoubleClick={(e) => handleCableDoubleClick(e, cb.id)}
                  className="cursor-pointer"
                >
                  <path d={pathString} fill="none" stroke="transparent" strokeWidth="24" style={{ cursor: 'pointer' }} />
                  <path d={pathString} fill="none" stroke="rgba(0,0,0,0.65)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d={pathString}
                    fill="none"
                    stroke={color}
                    strokeWidth={isHV ? '4.5' : '3.5'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={isHV ? '8,5' : 'none'}
                  />
                </g>
              );
            })}

            {/* Cabo em Andamento (Elástico Ortogonal) */}
            {wiringOrigin && (
              (() => {
                const pStart = getTerminalAbsolutePos(wiringOrigin.compId, wiringOrigin.termId);
                const currentPts = [pStart, ...activeWaypoints];
                if (mousePos) currentPts.push(mousePos);

                const activePath = renderOrthogonalSmoothPath(currentPts);
                const activeColor = CABLE_COLORS[activeCableTool] || '#ef4444';

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

          {/* JANELA FLUTUANTE DE OPÇÕES DO CABO */}
          {editingCableId && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                left: `${Math.min(modalPos.x, 1250)}px`,
                top: `${Math.min(modalPos.y, 600)}px`,
                backgroundColor: '#0f172a',
                border: '2px solid #38bdf8',
                borderRadius: '10px',
                padding: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.9)',
                zIndex: 50,
                width: '210px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid #334155', paddingBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#38bdf8' }}>OPÇÕES DO CABO</span>
                <button
                  onClick={() => setEditingCableId(null)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '12px' }}
                >
                  ✕
                </button>
              </div>

              <span style={{ fontSize: '10px', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
                Trocar Cor:
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

          {/* IHM FRONTAL REALISTA */}
          <div
            style={{
              position: 'absolute',
              left: '40px',
              top: '30px',
              width: '240px',
              backgroundColor: '#1b2024',
              borderRadius: '24px',
              border: '8px solid #101417',
              boxShadow: '0 15px 35px rgba(0,0,0,0.9)',
              padding: '12px',
              boxSizing: 'border-box',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontStyle: 'italic', fontWeight: 900, fontSize: '12px', color: '#e2e8f0', letterSpacing: '1px' }}>
                INOVA
              </span>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <span title="Aquecimento Acionado" style={{ fontSize: '10px', opacity: systemRunning ? 1 : 0.2 }}>🔥</span>
                <span title="Ignição Acionada" style={{ fontSize: '10px', opacity: igniting ? 1 : 0.2 }}>⚡</span>
                <span title="Vapor Acionado" style={{ fontSize: '10px', opacity: waterValveActive ? 1 : 0.2 }}>💨</span>
                <span title="Lâmpada Acionada" style={{ fontSize: '10px', opacity: 0.8 }}>💡</span>
                <span title="Turbina Acionada" style={{ fontSize: '10px', opacity: systemRunning ? 1 : 0.2 }}>🌀</span>
              </div>
            </div>

            <div style={{ backgroundColor: '#050709', borderRadius: '10px', border: '2px solid #232b32', padding: '8px 12px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
              <div style={{ position: 'relative', height: '36px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '38px', fontWeight: 'bold', color: '#2a0c0c', letterSpacing: '4px', position: 'absolute', right: 0, userSelect: 'none' }}>8888</span>
                <span style={{ fontFamily: 'monospace', fontSize: '38px', fontWeight: 900, color: '#ff2222', letterSpacing: '4px', position: 'relative', zIndex: 2, textShadow: '0 0 10px rgba(255,34,34,0.85)' }}>
                  {getDisplayTemperature()}
                </span>
              </div>

              <div style={{ position: 'relative', height: '36px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '38px', fontWeight: 'bold', color: '#072412', letterSpacing: '4px', position: 'absolute', right: 0, userSelect: 'none' }}>8888</span>
                <span style={{ fontFamily: 'monospace', fontSize: '38px', fontWeight: 900, color: '#00ff44', letterSpacing: '4px', position: 'relative', zIndex: 2, textShadow: '0 0 10px rgba(0,255,68,0.85)' }}>
                  {isEnergizado ? (isProgMode ? format4Digit(activeParam.value) : format4Digit(setpointTemp)) : ''}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '8px', color: '#94a3b8', fontFamily: 'monospace', fontWeight: 'bold' }}>
                <span>{isProgMode ? `MENU ${activeParam.menu} (${activeParam.code})` : '°C TEMPERATURA'}</span>
                <span>{isProgMode ? 'AJUSTE' : 'SETPOINT'}</span>
              </div>
            </div>

            {isProgMode && <p style={{ fontSize: '11px', color: '#e2e8f0' }}>{activeParam.name}{!editableCodes.has(activeParam.code) ? ' — somente consulta' : ''}</p>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
              <button onClick={handlePgmClick} style={{ backgroundColor: isProgMode ? '#0284c7' : '#262d35', border: '1px solid #3c4753', borderRadius: '6px', height: '34px', color: '#f8fafc', fontWeight: 900, fontSize: '10px', cursor: 'pointer' }} title="PGM">PGM</button>
              <button onClick={handleDownClick} style={{ backgroundColor: '#262d35', border: '1px solid #3c4753', borderRadius: '6px', height: '34px', color: '#f8fafc', fontWeight: 900, fontSize: '11px', cursor: 'pointer' }} title="V">V</button>
              <button onClick={handleUpClick} style={{ backgroundColor: '#262d35', border: '1px solid #3c4753', borderRadius: '6px', height: '34px', color: '#f8fafc', fontWeight: 900, fontSize: '11px', cursor: 'pointer' }} title="^">^</button>
              <button onClick={triggerVapor} style={{ backgroundColor: waterValveActive ? '#0891b2' : '#262d35', border: '1px solid #3c4753', borderRadius: '6px', height: '34px', color: '#f8fafc', fontWeight: 900, fontSize: '10px', cursor: 'pointer' }} title="F1">F1</button>
              <button onClick={() => { if (systemRunning) stopBurnerCycle(); else startBurnerCycle(); }} style={{ backgroundColor: systemRunning ? '#b91c1c' : '#262d35', border: '1px solid #3c4753', borderRadius: '6px', height: '34px', color: '#f8fafc', fontWeight: 900, fontSize: '10px', cursor: 'pointer' }} title="F2">F2</button>
            </div>
          </div>

          {/* COMPONENTES ARRASTÁVEIS COM BORNES */}
          {components.map((comp) => (
            <div
              key={comp.id}
              style={{
                position: 'absolute',
                left: `${comp.x}px`,
                top: `${comp.y}px`,
                width: `${comp.width}px`,
                height: `${comp.height}px`,
                zIndex: 2,
                boxSizing: 'border-box',
              }}
            >
              {/* Barra de Arraste */}
              <div
                onMouseDown={(e) => handleStartDrag(e.clientX, e.clientY, comp.id)}
                style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '0',
                  width: '100%',
                  height: '12px',
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '4px 4px 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'grab',
                }}
              >
                <div style={{ width: '28px', height: '2px', backgroundColor: '#64748b' }} />
              </div>

              {/* ENTRADA DE FORÇA */}
              {comp.id === 'comp_forca' && (
                <div style={{ width: '100%', height: '100%', backgroundColor: '#111827', border: '2px solid #374151', borderRadius: '8px', padding: '8px', boxSizing: 'border-box' }}>
                  <div style={{ fontSize: '10px', fontWeight: 900, color: '#f3f4f6', textAlign: 'center', marginBottom: '4px' }}>ENTRADA DE FORÇA (220V)</div>
                  <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: '#1f2937', padding: '6px', borderRadius: '6px' }}>
                    <span style={{ fontSize: '9px', color: '#ef4444', fontWeight: 'bold' }}>L (Fase)</span>
                    <span style={{ fontSize: '9px', color: '#3b82f6', fontWeight: 'bold' }}>N (Neutro)</span>
                    <span style={{ fontSize: '9px', color: '#10b981', fontWeight: 'bold' }}>PE (Terra)</span>
                  </div>
                </div>
              )}

              {/* DISJUNTOR DIN */}
              {comp.id === 'comp_dj' && (
                <div style={{ width: '100%', height: '100%', backgroundColor: '#111827', border: '2px solid #374151', borderRadius: '8px', padding: '8px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '9px', fontWeight: 900, color: '#e5e7eb', marginBottom: '2px' }}>DISJUNTOR BIPOLAR Q1</span>
                  <div style={{ width: '90px', backgroundColor: '#e5e7eb', borderRadius: '6px', border: '1px solid #9ca3af', padding: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '8px', color: '#1f2937', fontWeight: 'bold' }}>
                      <span>1 (L)</span>
                      <span>3 (N)</span>
                    </div>
                    <div style={{ width: '30px', height: '38px', backgroundColor: '#1f2937', borderRadius: '4px', margin: '2px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '2px 0' }}>
                      <div style={{ width: '10px', height: '4px', backgroundColor: disjuntorArmado ? '#22c55e' : '#ef4444', borderRadius: '1px' }} />
                      <button
                        onClick={() => {
                          if (disjuntorArmado) stopBurnerCycle();
                          setDisjuntorArmado(!disjuntorArmado);
                        }}
                        style={{ width: '20px', height: '20px', backgroundColor: disjuntorArmado ? '#dc2626' : '#4b5563', borderRadius: '3px', border: '1px solid #000', color: '#fff', fontWeight: 900, fontSize: '9px', cursor: 'pointer', transform: disjuntorArmado ? 'translateY(-2px)' : 'translateY(2px)' }}
                      >
                        {disjuntorArmado ? 'I' : 'O'}
                      </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '8px', color: '#1f2937', fontWeight: 'bold' }}>
                      <span>2 (L)</span>
                      <span>4 (N)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* RÉGUA 26 BORNES INOVA */}
              {comp.id === 'comp_inova_bornes' && (
                <div style={{ width: '100%', height: '100%', backgroundColor: '#0b0f14', borderRadius: '10px', border: '3px solid #1e2630', padding: '6px 8px', boxSizing: 'border-box' }}>
                  <div style={{ backgroundColor: '#227b47', borderRadius: '4px', height: '36px', border: '1px solid #2e9f5d', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' }}>
                    <span style={{ fontSize: '8px', color: '#fff', fontWeight: 'bold' }}>◄ SUPERIORES: 1 AO 13</span>
                    <span style={{ fontSize: '9px', color: '#a7f3d0', fontWeight: 900 }}>CONECTOR VERDE INOVA</span>
                  </div>
                  <div style={{ backgroundColor: '#227b47', borderRadius: '4px', height: '36px', border: '1px solid #2e9f5d', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' }}>
                    <span style={{ fontSize: '8px', color: '#fff', fontWeight: 'bold' }}>◄ INFERIORES: 14 AO 26</span>
                    <span style={{ fontSize: '8px', color: '#e5e7eb' }}>INV-YB1-11</span>
                  </div>
                </div>
              )}

              {/* USINA */}
              {comp.id === 'comp_usina' && (
                <div style={{ width: '100%', height: '100%', backgroundColor: '#111827', border: '2px solid #374151', borderRadius: '8px', padding: '6px', boxSizing: 'border-box' }}>
                  <div style={{ fontSize: '9px', fontWeight: 900, color: '#38bdf8', textAlign: 'center', marginBottom: '2px' }}>USINA DE IGNIÇÃO</div>
                  <div style={{ backgroundColor: '#030712', borderRadius: '6px', height: '80px', padding: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '8px', color: '#9ca3af' }}>
                      <span>S1 (B22)</span>
                      <span>Neutro (B14)</span>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: '8px', color: '#c084fc', fontWeight: 'bold' }}>
                      ⚡ Saída HV 15kV
                    </div>
                  </div>
                </div>
              )}

              {/* VÁLVULAS */}
              {comp.id === 'comp_valvulas' && (
                <div style={{ width: '100%', height: '100%', backgroundColor: '#111827', border: '2px solid #374151', borderRadius: '8px', padding: '6px', boxSizing: 'border-box' }}>
                  <div style={{ fontSize: '9px', fontWeight: 900, color: '#fb923c', textAlign: 'center', marginBottom: '4px' }}>VÁLVULAS SOLENOIDE</div>
                  <div style={{ backgroundColor: '#1c1917', border: '1px solid #44403c', borderRadius: '4px', padding: '4px', marginBottom: '4px', display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: '#fdba74' }}>
                    <span>S4 Gás (B25)</span>
                    <strong style={{ color: valveOpen ? '#4ade80' : '#f87171' }}>{valveOpen ? 'ON' : 'OFF'}</strong>
                  </div>
                  <div style={{ backgroundColor: '#082f49', border: '1px solid #075985', borderRadius: '4px', padding: '4px', display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: '#7dd3fc' }}>
                    <span>S2 Vapor (B20)</span>
                    <strong style={{ color: waterValveActive ? '#38bdf8' : '#64748b' }}>{waterValveActive ? 'ON' : 'OFF'}</strong>
                  </div>
                </div>
              )}

              {/* CARCAÇA REALISTA DO FORNO COMBINADO COM TERMOPAR TIPO J */}
              {comp.id === 'comp_queimador' && (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#1e293b',
                    backgroundImage: 'linear-gradient(135deg, #334155 0%, #1e293b 50%, #0f172a 100%)',
                    border: '4px solid #475569',
                    borderRadius: '16px',
                    padding: '10px',
                    boxSizing: 'border-box',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.9), inset 0 2px 4px rgba(255,255,255,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #334155', paddingBottom: '6px' }}>
                    <div>
                      <span style={{ fontSize: '10px', fontWeight: 900, color: '#f8fafc', letterSpacing: '0.5px' }}>FORNO COMBINADO A GÁS</span>
                      <span style={{ fontSize: '7px', color: '#38bdf8', display: 'block', fontWeight: 'bold' }}>INOX AISI 304 • CONVECÇÃO</span>
                    </div>
                    <div style={{ width: '12px', height: '34px', backgroundColor: '#64748b', borderRadius: '4px', border: '1px solid #94a3b8', boxShadow: 'inset 0 1px 2px #fff' }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '7px', color: '#a7f3d0', fontWeight: 'bold', margin: '2px 0' }}>
                    <span>⚡ SPK</span>
                    <span>🔥 CH1 (B8)</span>
                    <span>🔥 CH2 (B9)</span>
                  </div>

                  <div
                    style={{
                      height: '160px',
                      backgroundColor: '#020617',
                      borderRadius: '10px',
                      border: '3px solid #0f172a',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '8px',
                      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
                    }}
                  >
                    <div style={{ position: 'absolute', right: '12px', top: '12px', width: '48px', height: '48px', borderRadius: '50%', border: '2px dashed #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.6 }}>
                      <span style={{ fontSize: '16px', color: systemRunning ? '#38bdf8' : '#475569' }}>🌀</span>
                    </div>

                    <div style={{ position: 'absolute', left: '10px', top: '24px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '60px', height: '5px', backgroundColor: '#cbd5e1', borderRadius: '2px', border: '1px solid #64748b', boxShadow: '0 0 4px rgba(0,0,0,0.6)' }} />
                      <span style={{ fontSize: '7px', color: isTermoparConectado() ? '#facc15' : '#ef4444', fontWeight: 'bold', fontFamily: 'monospace' }}>
                        TC-J: {isTermoparConectado() ? `${effectiveTemp.toFixed(1)}°C` : 'ABERTO'}
                      </span>
                    </div>

                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '30px' }}>
                      {igniting && <span style={{ color: '#c084fc', fontSize: '10px', fontWeight: 900, fontFamily: 'monospace' }}>⚡ CENTELHA ATIVA ⚡</span>}
                      {flame1Lit || flame2Lit ? (
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                          {flame1Lit && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div style={{ width: '16px', height: '38px', background: 'radial-gradient(ellipse at bottom, #38bdf8 0%, #facc15 60%, #ef4444 100%)', borderRadius: '50% 50% 20% 20%', filter: 'blur(1px)', boxShadow: '0 0 12px #facc15' }} />
                              <span style={{ fontSize: '7px', color: '#facc15', fontWeight: 'bold' }}>CH1</span>
                            </div>
                          )}
                          {flame2Lit && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div style={{ width: '16px', height: '38px', background: 'radial-gradient(ellipse at bottom, #38bdf8 0%, #facc15 60%, #ef4444 100%)', borderRadius: '50% 50% 20% 20%', filter: 'blur(1px)', boxShadow: '0 0 12px #facc15' }} />
                              <span style={{ fontSize: '7px', color: '#facc15', fontWeight: 'bold' }}>CH2</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        !igniting && <span style={{ fontSize: '9px', color: '#475569' }}>Câmara Apagada</span>
                      )}
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '6px 8px', marginTop: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                      <span style={{ fontSize: '8px', fontWeight: 'bold', color: '#facc15' }}>TERMOPAR TIPO J (B1/B2)</span>
                      <span style={{ fontSize: '7px', color: isTermoparConectado() ? '#4ade80' : '#f87171', fontWeight: 'bold' }}>
                        {isTermoparConectado() ? 'CONECTADO' : 'DESCONECTADO'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '7px', color: '#cbd5e1' }}>
                      <span>TJ+ (Borne 2)</span>
                      <span>TJ- (Borne 1)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* BORNES INDUSTRIAIS DE CONEXÃO */}
              {comp.terminals?.map((t) => {
                const isOrigin = wiringOrigin?.compId === comp.id && wiringOrigin?.termId === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={(e) => handleTerminalClick(e, comp.id, t.id)}
                    style={{
                      position: 'absolute',
                      left: `${t.relX}%`,
                      top: `${t.relY}%`,
                      transform: 'translate(-50%, -50%)',
                      width: '13px',
                      height: '13px',
                      borderRadius: '50%',
                      border: isOrigin ? '2px solid #00e676' : '1.5px solid #94a3b8',
                      background: isOrigin ? '#00e676' : '#334155',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                      boxShadow: isOrigin ? '0 0 8px #00e676' : '0 2px 4px rgba(0,0,0,0.4)',
                    }}
                    title={`Borne ${t.name}${t.desc ? ` - ${t.desc}` : ''}`}
                  >
                    <div style={{ width: '6px', height: '1.2px', backgroundColor: '#e2e8f0' }} />
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-11px',
                        fontSize: '7px',
                        color: '#fff',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        background: 'rgba(0,0,0,0.8)',
                        padding: '0 2px',
                        borderRadius: '2px',
                      }}
                    >
                      {t.name}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* PAINEL INFERIOR: DIAGNÓSTICO E STATUS OPERACIONAL */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', padding: '12px' }}>
          <span style={{ fontSize: '10px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
            Diagnóstico do Controlador e Laço de Combustão
          </span>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: errorCode ? '#f87171' : isEnergizado ? '#4ade80' : '#f59e0b', lineHeight: 1.4 }}>
            {statusMessage}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '10px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', display: 'block' }}>
              Condutores Conectados
            </span>
            <span style={{ fontSize: '13px', fontWeight: 900, color: '#f59e0b', fontFamily: 'monospace' }}>
              {cables.length} cabos instalados
            </span>
          </div>
          <p style={{ fontSize: '9px', color: '#64748b', margin: 0 }}>
            Referência: Inova MN189V10.12, conector pluggable. F-01 fixo em gás. Parâmetros não simulados são somente consulta; menus e teclas simplificados. O controlador não substitui dispositivos de segurança.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FornoGasSimulator;
