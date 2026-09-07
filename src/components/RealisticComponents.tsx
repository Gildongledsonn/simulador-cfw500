import React from 'react';

// ============================================================================
// 1. CONTATOR TRIPOLAR WEG CWM (110x180)
// ============================================================================
interface ContactorProps {
  width?: number;
  height?: number;
  tag?: string;
  name?: string;
  state: boolean;
  isSelected?: boolean;
}

export const RealisticContactor: React.FC<ContactorProps> = ({
  width = 110,
  height = 180,
  tag = 'K',
  state,
  isSelected = false,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 110 180"
    style={{
      width: '100%',
      height: '100%',
      display: 'block',
      outline: isSelected ? '2px solid #00e676' : 'none',
      borderRadius: '4px',
      userSelect: 'none',
    }}
  >
    {/* Carcaça cinza claro industrial */}
    <rect x="2" y="2" width="106" height="176" rx="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
    <rect x="6" y="5" width="98" height="26" rx="3" fill="#cbd5e1" opacity="0.6" />

    {/* Bornes superiores: 1/L1, 3/L2, 5/L3, 13NO */}
    {[19.8, 41.8, 63.8, 90.2].map((cx, i) => (
      <g key={`c-top-${i}`}>
        <rect x={cx - 7} y="6.4" width="14" height="15" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
        <circle cx={cx} cy="14" r="4.5" fill="#94a3b8" />
        <line x1={cx - 3} y1="14" x2={cx + 3} y2="14" stroke="#0f172a" strokeWidth="1" />
      </g>
    ))}

    {/* Borne A1 da bobina */}
    <g>
      <rect x="83.2" y="43" width="14" height="15" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
      <circle cx="90.2" cy="50.4" r="4.5" fill="#94a3b8" />
      <line x1="87.2" y1="50.4" x2="93.2" y2="50.4" stroke="#0f172a" strokeWidth="1" />
    </g>

    {/* Bloco central azul característico WEG */}
    <rect x="6" y="38" width="76" height="98" rx="4" fill="#005ea6" stroke="#003b66" strokeWidth="1" />
    <text x="14" y="54" fill="#ffffff" fontSize="9" fontWeight="900" fontFamily="Arial, sans-serif">Шeg</text>
    <text x="40" y="54" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace">CWM25</text>
    <text x="14" y="64" fill="#e0f2fe" fontSize="5.5" fontFamily="Arial, sans-serif">Ui 1000V • AC-3 25A</text>

    {/* Núcleo móvel indicador de acionamento */}
    <rect x="22" y="76" width="44" height="34" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1" />
    <rect
      x="25"
      y={state ? 81 : 78}
      width="38"
      height="28"
      rx="2"
      fill={state ? '#134e4a' : '#334155'}
      stroke={state ? '#22c55e' : '#64748b'}
      strokeWidth="1"
      style={{ transition: 'all 0.12s ease' }}
    />
    <rect
      x="30"
      y={state ? 88 : 84}
      width="28"
      height="12"
      rx="2"
      fill={state ? '#22c55e' : '#dc2626'}
      style={{ transition: 'all 0.12s ease' }}
    />
    <text x="44" y={state ? 96.5 : 92.5} textAnchor="middle" fill="#ffffff" fontSize="6" fontWeight="900" fontFamily="monospace">
      {state ? 'ON' : 'OFF'}
    </text>

    {/* Plaqueta de TAG */}
    <rect x="22" y="116" width="44" height="14" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
    <text x="44" y="126" textAnchor="middle" fill="#00e676" fontSize="8" fontWeight="bold" fontFamily="monospace">{tag}</text>

    {/* Borne A2 da bobina */}
    <g>
      <rect x="83.2" y="122" width="14" height="15" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
      <circle cx="90.2" cy="129.6" r="4.5" fill="#94a3b8" />
      <line x1="87.2" y1="129.6" x2="93.2" y2="129.6" stroke="#0f172a" strokeWidth="1" />
    </g>

    {/* Bornes inferiores: 2/T1, 4/T2, 6/T3, 14NO */}
    <rect x="6" y="149" width="98" height="26" rx="3" fill="#cbd5e1" opacity="0.6" />
    {[19.8, 41.8, 63.8, 90.2].map((cx, i) => (
      <g key={`c-bot-${i}`}>
        <rect x={cx - 7} y="157.6" width="14" height="15" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
        <circle cx={cx} cy="165.6" r="4.5" fill="#94a3b8" />
        <line x1={cx - 3} y1="165.6" x2={cx + 3} y2="165.6" stroke="#0f172a" strokeWidth="1" />
      </g>
    ))}

    {/* Serigrafia técnica dos bornes */}
    <text x="19.8" y="30" textAnchor="middle" fill="#475569" fontSize="6.5" fontWeight="bold">1/L1</text>
    <text x="41.8" y="30" textAnchor="middle" fill="#475569" fontSize="6.5" fontWeight="bold">3/L2</text>
    <text x="63.8" y="30" textAnchor="middle" fill="#475569" fontSize="6.5" fontWeight="bold">5/L3</text>
    <text x="90.2" y="30" textAnchor="middle" fill="#005ea6" fontSize="6.5" fontWeight="bold">13NO</text>
    <text x="90.2" y="40" textAnchor="middle" fill="#dc2626" fontSize="6" fontWeight="bold">A1</text>

    <text x="19.8" y="156" textAnchor="middle" fill="#475569" fontSize="6.5" fontWeight="bold">2/T1</text>
    <text x="41.8" y="156" textAnchor="middle" fill="#475569" fontSize="6.5" fontWeight="bold">4/T2</text>
    <text x="63.8" y="156" textAnchor="middle" fill="#475569" fontSize="6.5" fontWeight="bold">6/T3</text>
    <text x="90.2" y="156" textAnchor="middle" fill="#005ea6" fontSize="6.5" fontWeight="bold">14NO</text>
    <text x="90.2" y="146" textAnchor="middle" fill="#dc2626" fontSize="6" fontWeight="bold">A2</text>
  </svg>
);

// ============================================================================
// 2. RELÉ TÉRMICO DE SOBRECARGA WEG RW (120x190)
// ============================================================================
interface ThermalRelayProps {
  width?: number;
  height?: number;
  tag?: string;
  name?: string;
  tripped?: boolean;
  onTripToggle?: () => void;
  isSelected?: boolean;
}

export const RealisticThermalRelay: React.FC<ThermalRelayProps> = ({
  width = 120,
  height = 190,
  tag = 'F',
  tripped = false,
  onTripToggle,
  isSelected = false,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 120 190"
    style={{
      width: '100%',
      height: '100%',
      display: 'block',
      outline: isSelected ? '2px solid #00e676' : 'none',
      borderRadius: '4px',
      userSelect: 'none',
    }}
  >
    {/* Hastes de cobre de acoplamento superior */}
    {[24, 60, 96].map((cx, i) => (
      <g key={`rw-pin-${i}`}>
        <rect x={cx - 5} y="4" width="10" height="22" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="0.8" />
        <circle cx={cx} cy="15.2" r="3.5" fill="#fef3c7" />
      </g>
    ))}

    {/* Carcaça principal escura */}
    <rect x="4" y="24" width="112" height="162" rx="5" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
    <rect x="8" y="28" width="104" height="22" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
    <text x="14" y="43" fill="#ffffff" fontSize="8" fontWeight="900" fontFamily="Arial, sans-serif">Шeg</text>
    <text x="42" y="43" fill="#f87171" fontSize="7.5" fontWeight="bold" fontFamily="monospace">RW27</text>
    <text x="86" y="43" fill="#00e676" fontSize="7.5" fontWeight="bold" fontFamily="monospace">{tag}</text>

    {/* Dial de ajuste de corrente */}
    <g transform="translate(24, 56)">
      <circle cx="16" cy="16" r="14" fill="#0f172a" stroke="#475569" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="11" fill="#cbd5e1" />
      <line x1="16" y1="7" x2="16" y2="13" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
      <text x="16" y="22" textAnchor="middle" fill="#0f172a" fontSize="5" fontWeight="bold">15-23A</text>
    </g>

    {/* Botão RESET */}
    <g transform="translate(68, 56)">
      <rect x="0" y="0" width="18" height="18" rx="3" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
      <text x="9" y="11.5" textAnchor="middle" fill="#ffffff" fontSize="5.5" fontWeight="bold">RESET</text>
    </g>

    {/* Botão TEST / TRIP interativo */}
    <g transform="translate(90, 56)" onClick={(e) => { e.stopPropagation(); onTripToggle && onTripToggle(); }} style={{ cursor: 'pointer' }}>
      <rect x="0" y="0" width="18" height="18" rx="3" fill={tripped ? '#b91c1c' : '#dc2626'} stroke="#7f1d1d" strokeWidth="1" />
      <text x="9" y="11.5" textAnchor="middle" fill="#ffffff" fontSize="5.5" fontWeight="bold">{tripped ? 'TRIP' : 'TEST'}</text>
    </g>

    {/* Janela de sinalização mecânica */}
    <rect x="74" y="78" width="30" height="6" rx="1.5" fill="#000" />
    <rect x="75" y="79" width="28" height="4" rx="1" fill={tripped ? '#ef4444' : '#22c55e'} />

    {/* Contatos auxiliares 95-96 (NF) e 97-98 (NA) */}
    <rect x="8" y="96" width="104" height="28" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
    {[21.6, 48, 74.4, 100.8].map((cx, i) => (
      <g key={`aux-${i}`}>
        <circle cx={cx} cy="110.2" r="4.2" fill="#94a3b8" />
        <line x1={cx - 2.8} y1="110.2" x2={cx + 2.8} y2="110.2" stroke="#0f172a" strokeWidth="1" />
      </g>
    ))}
    <text x="21.6" y="122" textAnchor="middle" fill="#93c5fd" fontSize="6.5" fontWeight="bold">95</text>
    <text x="48" y="122" textAnchor="middle" fill="#93c5fd" fontSize="6.5" fontWeight="bold">96 NC</text>
    <text x="74.4" y="122" textAnchor="middle" fill="#fca5a5" fontSize="6.5" fontWeight="bold">97</text>
    <text x="100.8" y="122" textAnchor="middle" fill="#fca5a5" fontSize="6.5" fontWeight="bold">98 NO</text>

    {/* Bornes de saída para o motor (2/T1, 4/T2, 6/T3) */}
    <rect x="8" y="156" width="104" height="26" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
    {[24, 60, 96].map((cx, i) => (
      <g key={`load-${i}`}>
        <circle cx={cx} cy="174.8" r="4.8" fill="#94a3b8" />
        <line x1={cx - 3} y1="174.8" x2={cx + 3} y2="174.8" stroke="#0f172a" strokeWidth="1.2" />
      </g>
    ))}
    <text x="24" y="164" textAnchor="middle" fill="#cbd5e1" fontSize="6.5" fontWeight="bold">2/T1</text>
    <text x="60" y="164" textAnchor="middle" fill="#cbd5e1" fontSize="6.5" fontWeight="bold">4/T2</text>
    <text x="96" y="164" textAnchor="middle" fill="#cbd5e1" fontSize="6.5" fontWeight="bold">6/T3</text>
  </svg>
);

// ============================================================================
// 3. DISJUNTORES MODULARES DIN 1P E 2P (WEG MDW)
// ============================================================================
interface MiniBreakerProps {
  width?: number;
  height?: number;
  tag?: string;
  poles?: 1 | 2;
  currentRating?: number;
  state?: boolean;
  onToggle?: () => void;
  isSelected?: boolean;
}

export const RealisticMiniBreaker: React.FC<MiniBreakerProps> = ({
  width = 48,
  height = 140,
  tag = 'Q',
  poles = 1,
  currentRating = 16,
  state = true,
  onToggle,
  isSelected = false,
}) => {
  const is2P = poles === 2;
  const terminalX = is2P ? [width * 0.25, width * 0.75] : [width * 0.5];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        outline: isSelected ? '2px solid #00e676' : 'none',
        borderRadius: '4px',
        userSelect: 'none',
      }}
    >
      <rect x="1" y="1" width={width - 2} height={height - 2} rx="4" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
      {is2P && (
        <line x1={width / 2} y1="2" x2={width / 2} y2={height - 2} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,2" />
      )}

      {/* Bornes superiores (em 10% da altura) */}
      {terminalX.map((cx, i) => (
        <g key={`top-sc-${i}`}>
          <rect x={cx - 7} y={height * 0.1 - 7} width="14" height="14" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="0.8" />
          <circle cx={cx} cy={height * 0.1} r="4" fill="#94a3b8" />
          <line x1={cx - 3} y1={height * 0.1} x2={cx + 3} y2={height * 0.1} stroke="#0f172a" strokeWidth="1.2" />
        </g>
      ))}

      {/* Rótulo e Modelo */}
      <text x={width / 2} y="32" textAnchor="middle" fill="#005ea6" fontSize="8" fontWeight="900" fontFamily="Arial, sans-serif">Шeg</text>
      <text x={width / 2} y="41" textAnchor="middle" fill="#334155" fontSize="6.5" fontWeight="bold" fontFamily="monospace">MDW-{is2P ? '2P' : '1P'}</text>

      {/* Tarjeta Curva C */}
      <rect x={width / 2 - 13} y="46" width="26" height="11" rx="2" fill="#dc2626" />
      <text x={width / 2} y="54" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="900" fontFamily="monospace">{`C${currentRating}`}</text>

      {/* Janela mecânica de estado */}
      <rect x={width / 2 - 8} y="61" width="16" height="6" rx="1" fill="#0f172a" />
      <rect x={width / 2 - 7} y="62" width="14" height="4" rx="0.5" fill={state ? '#ef4444' : '#22c55e'} />

      {/* Manopla com clique */}
      <rect x={width / 2 - 10} y="72" width="20" height="34" rx="2" fill="#334155" stroke="#1e293b" strokeWidth="1" />
      <g onClick={(e) => { e.stopPropagation(); onToggle && onToggle(); }} style={{ cursor: 'pointer' }}>
        <rect
          x={width / 2 - 8}
          y={state ? 74 : 88}
          width="16"
          height="16"
          rx="2"
          fill="#ef4444"
          stroke="#991b1b"
          strokeWidth="0.8"
          style={{ transition: 'y 0.12s ease' }}
        />
        <text x={width / 2} y={state ? 84.5 : 98.5} textAnchor="middle" fill="#ffffff" fontSize="6" fontWeight="bold" style={{ transition: 'y 0.12s ease' }}>
          {state ? 'I' : '0'}
        </text>
      </g>

      <text x={width / 2} y="116" textAnchor="middle" fill="#00e676" fontSize="7" fontWeight="bold" fontFamily="monospace">{tag}</text>

      {/* Bornes inferiores (em 90% da altura) */}
      {terminalX.map((cx, i) => (
        <g key={`bot-sc-${i}`}>
          <rect x={cx - 7} y={height * 0.9 - 7} width="14" height="14" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="0.8" />
          <circle cx={cx} cy={height * 0.9} r="4" fill="#94a3b8" />
          <line x1={cx - 3} y1={height * 0.9} x2={cx + 3} y2={height * 0.9} stroke="#0f172a" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  );
};

// ============================================================================
// 4. DISJUNTOR-MOTOR WEG MPW (90x150)
// ============================================================================
interface MotorBreakerProps {
  width?: number;
  height?: number;
  tag?: string;
  name?: string;
  currentRating?: number;
  state?: boolean;
  onToggle?: () => void;
  isSelected?: boolean;
}

export const RealisticMotorBreaker: React.FC<MotorBreakerProps> = ({
  width = 90,
  height = 150,
  tag = 'Q',
  currentRating = 20,
  state = true,
  onToggle,
  isSelected = false,
}) => {
  const terminalX = [width * 0.18, width * 0.5, width * 0.82];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        outline: isSelected ? '2px solid #00e676' : 'none',
        borderRadius: '4px',
        userSelect: 'none',
      }}
    >
      <rect x="1" y="1" width={width - 2} height={height - 2} rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />

      {/* Bornes superiores (10%) */}
      {terminalX.map((cx, i) => (
        <g key={`mpw-t-${i}`}>
          <rect x={cx - 7} y={height * 0.1 - 7} width="14" height="14" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
          <circle cx={cx} cy={height * 0.1} r="4" fill="#94a3b8" />
          <line x1={cx - 3} y1={height * 0.1} x2={cx + 3} y2={height * 0.1} stroke="#0f172a" strokeWidth="1.2" />
        </g>
      ))}

      {/* Serigrafia */}
      <text x="12" y="32" fill="#ffffff" fontSize="8" fontWeight="900" fontFamily="Arial, sans-serif">Шeg</text>
      <text x={width / 2} y="32" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontWeight="bold" fontFamily="monospace">MPW40</text>
      <text x={width - 12} y="32" textAnchor="end" fill="#00e676" fontSize="7.5" fontWeight="bold" fontFamily="monospace">{tag}</text>

      {/* Botões industriais I (Ligar) e 0 (Desligar) */}
      <g onClick={(e) => { e.stopPropagation(); onToggle && onToggle(); }} style={{ cursor: 'pointer' }}>
        <rect x={width * 0.18 - 12} y="40" width="24" height="26" rx="2" fill={state ? '#0284c7' : '#334155'} stroke="#64748b" strokeWidth="1" />
        <text x={width * 0.18} y="56" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900">I</text>

        <rect x={width * 0.82 - 12} y="40" width="24" height="26" rx="2" fill={!state ? '#dc2626' : '#7f1d1d'} stroke="#991b1b" strokeWidth="1" />
        <text x={width * 0.82} y="56" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900">0</text>
      </g>

      {/* Dial de regulagem térmica */}
      <g transform={`translate(${width / 2 - 16}, 72)`}>
        <circle cx="16" cy="16" r="13" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
        <circle cx="16" cy="16" r="10" fill="#cbd5e1" />
        <line x1="16" y1="9" x2="16" y2="15" stroke="#dc2626" strokeWidth="1.5" />
        <text x="16" y="23" textAnchor="middle" fill="#0f172a" fontSize="5" fontWeight="bold">{`${currentRating}A`}</text>
      </g>

      <text x={width / 2} y="118" textAnchor="middle" fill="#64748b" fontSize="5" fontFamily="monospace">IEC 60947</text>

      {/* Bornes inferiores (90%) */}
      {terminalX.map((cx, i) => (
        <g key={`mpw-b-${i}`}>
          <rect x={cx - 7} y={height * 0.9 - 7} width="14" height="14" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
          <circle cx={cx} cy={height * 0.9} r="4" fill="#94a3b8" />
          <line x1={cx - 3} y1={height * 0.9} x2={cx + 3} y2={height * 0.9} stroke="#0f172a" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  );
};
// ============================================================================
// 5. BOTOEIRA DE PULSO Ø22mm (VERDE NA - CONTATOS 3-4)
// Dimensões: width: 65, height: 100
// ============================================================================
export const RealisticPushButton: React.FC<{
  width?: number;
  height?: number;
  tag?: string;
  state: boolean; // true = pressionado
  onPress?: () => void;
  onRelease?: () => void;
  isSelected?: boolean;
}> = ({ width = 65, height = 100, tag = 'S', state, onPress, onRelease, isSelected = false }) => {
  const cx = width / 2;
  const cy = height / 2;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        outline: isSelected ? '2px solid #00e676' : 'none',
        borderRadius: '4px',
        userSelect: 'none',
      }}
    >
      {/* Placa base traseira com borne superior (borne 3) e inferior (borne 4) */}
      <rect x="2" y="2" width={width - 4} height={height - 4} rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1.2" />

      {/* Parafuso borne 3 (relY: 8% -> 8px) */}
      <rect x={cx - 7} y="1" width="14" height="14" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
      <circle cx={cx} cy="8" r="4" fill="#94a3b8" />
      <line x1={cx - 3} y1="8" x2={cx + 3} y2="8" stroke="#0f172a" strokeWidth="1.2" />

      {/* Aro metálico frontal cromado Ø22mm */}
      <circle cx={cx} cy={cy} r="25" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="21" fill="#334155" stroke="#1e293b" strokeWidth="1" />

      {/* Atuador de pulso verde com efeito de profundidade ao pressionar */}
      <g
        onMouseDown={onPress}
        onMouseUp={onRelease}
        onTouchStart={onPress}
        onTouchEnd={onRelease}
        style={{ cursor: 'pointer' }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={state ? 16 : 18}
          fill={state ? '#15803d' : '#22c55e'}
          stroke={state ? '#166534' : '#4ade80'}
          strokeWidth="1.5"
          style={{ transition: 'all 0.08s ease' }}
        />
        <circle cx={cx} cy={cy} r="13" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.4" />
        <text
          x={cx}
          y={cy + 3}
          textAnchor="middle"
          fill="#ffffff"
          fontSize="7.5"
          fontWeight="900"
          fontFamily="Arial, sans-serif"
        >
          {state ? 'ON' : 'LIGA'}
        </text>
      </g>

      {/* TAG de identificação */}
      <text x={cx} y={height - 18} textAnchor="middle" fill="#00e676" fontSize="7" fontWeight="bold" fontFamily="monospace">
        {tag}
      </text>

      {/* Parafuso borne 4 (relY: 92% -> 92px) */}
      <rect x={cx - 7} y={height - 15} width="14" height="14" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
      <circle cx={cx} cy={height * 0.92} r="4" fill="#94a3b8" />
      <line x1={cx - 3} y1={height * 0.92} x2={cx + 3} y2={height * 0.92} stroke="#0f172a" strokeWidth="1.2" />
    </svg>
  );
};

// ============================================================================
// 6. BOTOEIRA DE EMERGÊNCIA TIPO COGUMELO (VERMELHA NF - CONTATOS 11-12)
// Dimensões: width: 65, height: 100
// ============================================================================
export const RealisticEmergencyButton: React.FC<{
  width?: number;
  height?: number;
  tag?: string;
  state: boolean; // true = fechado/pronto, false = acionado/travado
  onToggle?: () => void;
  isSelected?: boolean;
}> = ({ width = 65, height = 100, tag = 'S', state, onToggle, isSelected = false }) => {
  const cx = width / 2;
  const cy = height / 2;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        outline: isSelected ? '2px solid #00e676' : 'none',
        borderRadius: '4px',
        userSelect: 'none',
      }}
    >
      {/* Placa base */}
      <rect x="2" y="2" width={width - 4} height={height - 4} rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1.2" />

      {/* Borne superior 11 (8px) */}
      <rect x={cx - 7} y="1" width="14" height="14" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
      <circle cx={cx} cy="8" r="4" fill="#94a3b8" />
      <line x1={cx - 3} y1="8" x2={cx + 3} y2="8" stroke="#0f172a" strokeWidth="1.2" />

      {/* Plaqueta amarela de advertência de emergência (NR-12) */}
      <circle cx={cx} cy={cy} r="26" fill="#facc15" stroke="#ca8a04" strokeWidth="1.2" />
      <text x={cx} y={cy - 19} textAnchor="middle" fill="#0f172a" fontSize="4.5" fontWeight="bold">EMERGENCY</text>

      {/* Cabeçote cogumelo vermelho com setas de destravamento */}
      <g onClick={onToggle} style={{ cursor: 'pointer' }}>
        <circle
          cx={cx}
          cy={cy}
          r={!state ? 20 : 22}
          fill={!state ? '#b91c1c' : '#dc2626'}
          stroke={!state ? '#7f1d1d' : '#ef4444'}
          strokeWidth="2"
          style={{ transition: 'all 0.12s ease' }}
        />
        {/* Setas curvas brancas de rotação para destravar */}
        <circle cx={cx} cy={cy} r="14" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="6,4" opacity="0.85" />
        <text
          x={cx}
          y={cy + 3}
          textAnchor="middle"
          fill="#ffffff"
          fontSize="6.5"
          fontWeight="900"
          fontFamily="Arial, sans-serif"
        >
          {!state ? 'TRAV' : 'PARADA'}
        </text>
      </g>

      <text x={cx} y={height - 18} textAnchor="middle" fill="#00e676" fontSize="7" fontWeight="bold" fontFamily="monospace">
        {tag}
      </text>

      {/* Borne inferior 12 (92px) */}
      <rect x={cx - 7} y={height - 15} width="14" height="14" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
      <circle cx={cx} cy={height * 0.92} r="4" fill="#94a3b8" />
      <line x1={cx - 3} y1={height * 0.92} x2={cx + 3} y2={height * 0.92} stroke="#0f172a" strokeWidth="1.2" />
    </svg>
  );
};

// ============================================================================
// 7. CHAVE SELETORA 3 POSIÇÕES (MAN - 0 - AUT)
// Dimensões: width: 85, height: 140
// ============================================================================
export const RealisticSelectorSwitch: React.FC<{
  width?: number;
  height?: number;
  tag?: string;
  position?: 'MAN' | '0' | 'AUT';
  onToggle?: () => void;
  isSelected?: boolean;
}> = ({ width = 85, height = 140, tag = 'SA', position = '0', onToggle, isSelected = false }) => {
  const cx = width / 2;
  const cy = height / 2;
  const rotationDeg = position === 'MAN' ? -45 : position === 'AUT' ? 45 : 0;

  // Bornes: 13 e 23 (topo relX: 30%, 70%), 14 e 24 (base relX: 30%, 70%)
  const termX = [width * 0.3, width * 0.7];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        outline: isSelected ? '2px solid #00e676' : 'none',
        borderRadius: '4px',
        userSelect: 'none',
      }}
    >
      <rect x="2" y="2" width={width - 4} height={height - 4} rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1.2" />

      {/* Bornes superiores 13 e 23 (10% -> 14px) */}
      {termX.map((tx, i) => (
        <g key={`sel-top-${i}`}>
          <rect x={tx - 7} y="7" width="14" height="14" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
          <circle cx={tx} cy="14" r="4" fill="#94a3b8" />
          <line x1={tx - 3} y1="14" x2={tx + 3} y2="14" stroke="#0f172a" strokeWidth="1.2" />
        </g>
      ))}

      {/* Aro metálico e marcações angulares MAN - 0 - AUT */}
      <circle cx={cx} cy={cy} r="32" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
      <text x={cx - 20} y={cy - 16} textAnchor="middle" fill={position === 'MAN' ? '#38bdf8' : '#94a3b8'} fontSize="6.5" fontWeight="bold">MAN</text>
      <text x={cx} y={cy - 24} textAnchor="middle" fill={position === '0' ? '#ffffff' : '#94a3b8'} fontSize="7" fontWeight="bold">0</text>
      <text x={cx + 20} y={cy - 16} textAnchor="middle" fill={position === 'AUT' ? '#38bdf8' : '#94a3b8'} fontSize="6.5" fontWeight="bold">AUT</text>

      {/* Manopla rotativa com ponteiro indicador */}
      <g onClick={onToggle} style={{ cursor: 'pointer' }}>
        <circle cx={cx} cy={cy} r="18" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
        <g transform={`rotate(${rotationDeg}, ${cx}, ${cy})`} style={{ transition: 'transform 0.15s ease' }}>
          <rect x={cx - 4} y={cy - 22} width="8" height="28" rx="3" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
          <line x1={cx} y1={cy - 20} x2={cx} y2={cy - 10} stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>

      <text x={cx} y={height - 24} textAnchor="middle" fill="#00e676" fontSize="7.5" fontWeight="bold" fontFamily="monospace">{tag}</text>

      {/* Bornes inferiores 14 e 24 (90% -> 126px) */}
      {termX.map((tx, i) => (
        <g key={`sel-bot-${i}`}>
          <rect x={tx - 7} y={height * 0.9 - 7} width="14" height="14" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
          <circle cx={tx} cy={height * 0.9} r="4" fill="#94a3b8" />
          <line x1={tx - 3} y1={height * 0.9} x2={tx + 3} y2={height * 0.9} stroke="#0f172a" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  );
};

// ============================================================================
// 8. SINALEIRO LED Ø22mm (LENTE PRISMÁTICA E CORES TROCÁVEIS)
// Dimensões: width: 65, height: 100
// ============================================================================
const LAMP_PALETTE: Record<string, { on: string; off: string; core: string }> = {
  VERDE: { on: '#22c55e', off: '#14532d', core: '#86efac' },
  VERMELHO: { on: '#ef4444', off: '#7f1d1d', core: '#fca5a5' },
  AMARELO: { on: '#eab308', off: '#713f12', core: '#fde047' },
  AZUL: { on: '#38bdf8', off: '#0c4a6e', core: '#bae6fd' },
  BRANCO: { on: '#f8fafc', off: '#475569', core: '#ffffff' },
};

export const RealisticPilotLight: React.FC<{
  width?: number;
  height?: number;
  tag?: string;
  state: boolean; // true = aceso
  color?: string;
  isSelected?: boolean;
}> = ({ width = 65, height = 100, tag = 'H', state, color = 'VERDE', isSelected = false }) => {
  const cx = width / 2;
  const cy = height / 2;
  const palette = LAMP_PALETTE[color] || LAMP_PALETTE.VERDE;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        outline: isSelected ? '2px solid #00e676' : 'none',
        borderRadius: '4px',
        userSelect: 'none',
      }}
    >
      {/* Placa base */}
      <rect x="2" y="2" width={width - 4} height={height - 4} rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1.2" />

      {/* Borne superior X1 (8px) */}
      <rect x={cx - 7} y="1" width="14" height="14" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
      <circle cx={cx} cy="8" r="4" fill="#94a3b8" />
      <line x1={cx - 3} y1="8" x2={cx + 3} y2="8" stroke="#0f172a" strokeWidth="1.2" />

      {/* Aro cromado frontal Ø22mm */}
      <circle cx={cx} cy={cy} r="25" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="22" fill="#0f172a" />

      {/* Lente prismática translúcida */}
      <circle cx={cx} cy={cy} r="18" fill={state ? palette.on : palette.off} />

      {/* Efeito prismático concêntrico e reflexo de brilho */}
      <circle cx={cx} cy={cy} r="14" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity={state ? 0.6 : 0.2} />
      <circle cx={cx} cy={cy} r="10" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity={state ? 0.7 : 0.25} />
      <circle cx={cx} cy={cy} r="6" fill={state ? palette.core : 'transparent'} opacity={state ? 0.85 : 0} />

      {/* Arco de reflexo do domo de vidro */}
      <path
        d={`M ${cx - 12} ${cy - 8} A 14 14 0 0 1 ${cx + 8} ${cy - 12}`}
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity={state ? 0.9 : 0.4}
      />

      <text x={cx} y={height - 18} textAnchor="middle" fill="#00e676" fontSize="7" fontWeight="bold" fontFamily="monospace">
        {tag}
      </text>

      {/* Borne inferior X2 (92px) */}
      <rect x={cx - 7} y={height - 15} width="14" height="14" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
      <circle cx={cx} cy={height * 0.92} r="4" fill="#94a3b8" />
      <line x1={cx - 3} y1={height * 0.92} x2={cx + 3} y2={height * 0.92} stroke="#0f172a" strokeWidth="1.2" />
    </svg>
  );
};
// ============================================================================
// 9. RELÉ FALTA DE FASE WEG RPF-01 (65x135)
// ============================================================================
export const RealisticPhaseFailureRelay: React.FC<{
  width?: number; height?: number; tag?: string; state: boolean; tripped?: boolean; isSelected?: boolean;
}> = ({ width = 65, height = 135, tag = 'RPF', state, tripped = false, isSelected = false }) => {
  const cx = width / 2;
  const termX = [width * 0.25, width * 0.5, width * 0.75];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', display: 'block', outline: isSelected ? '2px solid #00e676' : 'none', borderRadius: '4px', userSelect: 'none' }}>
      <rect x="1" y="1" width={width - 2} height={height - 2} rx="4" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
      {termX.map((tx, i) => (
        <g key={`rpf-t-${i}`}>
          <rect x={tx - 6} y="4" width="12" height="13" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
          <circle cx={tx} cy="10.5" r="3.8" fill="#94a3b8" />
          <line x1={tx - 2.5} y1="10.5" x2={tx + 2.5} y2="10.5" stroke="#0f172a" strokeWidth="1.2" />
        </g>
      ))}
      <text x={cx} y="28" textAnchor="middle" fill="#005ea6" fontSize="7" fontWeight="900" fontFamily="Arial">Шeg</text>
      <text x={cx} y="36" textAnchor="middle" fill="#334155" fontSize="6.5" fontWeight="bold" fontFamily="monospace">RPF-01</text>
      <rect x={cx - 18} y="44" width="36" height="24" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
      <circle cx={cx - 8} cy="53" r="3.5" fill={state && !tripped ? '#22c55e' : '#14532d'} />
      <text x={cx - 8} y="62" textAnchor="middle" fill="#94a3b8" fontSize="4.5" fontWeight="bold">PWR</text>
      <circle cx={cx + 8} cy="53" r="3.5" fill={tripped ? '#ef4444' : '#7f1d1d'} />
      <text x={cx + 8} y="62" textAnchor="middle" fill="#94a3b8" fontSize="4.5" fontWeight="bold">TRIP</text>
      <g transform={`translate(${cx - 12}, 74)`}>
        <circle cx="12" cy="12" r="10" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
        <line x1="12" y1="5" x2="12" y2="10" stroke="#dc2626" strokeWidth="1.5" />
        <text x="12" y="27" textAnchor="middle" fill="#475569" fontSize="5" fontWeight="bold">ASYM %</text>
      </g>
      <text x={cx} y="112" textAnchor="middle" fill="#00e676" fontSize="6.5" fontWeight="bold" fontFamily="monospace">{tag}</text>
      {termX.map((tx, i) => (
        <g key={`rpf-b-${i}`}>
          <rect x={tx - 6} y={height - 17} width="12" height="13" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
          <circle cx={tx} cy={height - 10.5} r="3.8" fill="#94a3b8" />
          <line x1={tx - 2.5} y1={height - 10.5} x2={tx + 2.5} y2={height - 10.5} stroke="#0f172a" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  );
};

// ============================================================================
// 10. RELÉ DE SEGURANÇA CAT 4 NR-12 (110x160)
// ============================================================================
export const RealisticSafetyRelay: React.FC<{
  width?: number; height?: number; tag?: string; state: boolean; tripped?: boolean; onTripToggle?: () => void; isSelected?: boolean;
}> = ({ width = 110, height = 160, tag = 'SR', state, tripped = false, onTripToggle, isSelected = false }) => {
  const cx = width / 2;
  const topX = [width * 0.2, width * 0.5, width * 0.8];
  const botX = [width * 0.3, width * 0.7];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', display: 'block', outline: isSelected ? '2px solid #00e676' : 'none', borderRadius: '4px', userSelect: 'none' }}>
      <rect x="2" y="2" width={width - 4} height={height - 4} rx="5" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
      {topX.map((tx, i) => (
        <g key={`sr-t-${i}`}>
          <rect x={tx - 6} y="4" width="12" height="14" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
          <circle cx={tx} cy="11" r="4" fill="#94a3b8" /><line x1={tx - 3} y1="11" x2={tx + 3} y2="11" stroke="#0f172a" strokeWidth="1.2" />
        </g>
      ))}
      <rect x="6" y="26" width={width - 12} height="20" rx="3" fill="#0f172a" />
      <text x={cx} y="36" textAnchor="middle" fill="#facc15" fontSize="7" fontWeight="900">SAFETY RELAY • CAT 4</text>
      <text x={cx} y="43" textAnchor="middle" fill="#94a3b8" fontSize="5" fontFamily="monospace">NBR 14153 / NR-12</text>
      <rect x="10" y="52" width={width - 20} height="42" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
      <circle cx={cx - 24} cy="66" r="4" fill={state ? '#22c55e' : '#14532d'} /><text x={cx - 24} y="78" textAnchor="middle" fill="#cbd5e1" fontSize="5">PWR</text>
      <circle cx={cx - 8} cy="66" r="4" fill={state && !tripped ? '#22c55e' : '#14532d'} /><text x={cx - 8} y="78" textAnchor="middle" fill="#cbd5e1" fontSize="5">CH1</text>
      <circle cx={cx + 8} cy="66" r="4" fill={state && !tripped ? '#22c55e' : '#14532d'} /><text x={cx + 8} y="78" textAnchor="middle" fill="#cbd5e1" fontSize="5">CH2</text>
      <circle cx={cx + 24} cy="66" r="4" fill={tripped ? '#ef4444' : '#7f1d1d'} /><text x={cx + 24} y="78" textAnchor="middle" fill="#cbd5e1" fontSize="5">FAULT</text>
      <g onClick={onTripToggle} style={{ cursor: 'pointer' }}>
        <rect x={cx - 22} y="100" width="44" height="18" rx="3" fill={tripped ? '#dc2626' : '#0284c7'} stroke="#0369a1" strokeWidth="1" />
        <text x={cx} y="112" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontWeight="bold">{tripped ? 'REARMAR' : 'FALHA'}</text>
      </g>
      <text x={cx} y="132" textAnchor="middle" fill="#0f172a" fontSize="7.5" fontWeight="900" fontFamily="monospace">{tag}</text>
      {botX.map((bx, i) => (
        <g key={`sr-b-${i}`}>
          <rect x={bx - 6} y={height - 18} width="12" height="14" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
          <circle cx={bx} cy={height - 11} r="4" fill="#94a3b8" /><line x1={bx - 3} y1={height - 11} x2={bx + 3} y2={height - 11} stroke="#0f172a" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  );
};

// ============================================================================
// 11. CHAVE SECCIONADORA LOTO NR-10 (95x150)
// ============================================================================
export const RealisticLotoSwitch: React.FC<{
  width?: number; height?: number; tag?: string; state: boolean; onToggle?: () => void; isSelected?: boolean;
}> = ({ width = 95, height = 150, tag = 'QS', state, onToggle, isSelected = false }) => {
  const cx = width / 2;
  const cy = height / 2;
  const termX = [width * 0.25, width * 0.5, width * 0.75];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', display: 'block', outline: isSelected ? '2px solid #00e676' : 'none', borderRadius: '4px', userSelect: 'none' }}>
      <rect x="2" y="2" width={width - 4} height={height - 4} rx="5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      {termX.map((tx, i) => (
        <g key={`loto-t-${i}`}>
          <rect x={tx - 6} y="4" width="12" height="14" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
          <circle cx={tx} cy="11" r="4" fill="#94a3b8" /><line x1={tx - 3} y1="11" x2={tx + 3} y2="11" stroke="#0f172a" strokeWidth="1.2" />
        </g>
      ))}
      <circle cx={cx} cy={cy} r="32" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
      <text x={cx} y={cy - 20} textAnchor="middle" fill="#dc2626" fontSize="5.5" fontWeight="900">LOTO NR-10</text>
      <text x={cx - 18} y={cy + 3} textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold">0</text>
      <text x={cx + 18} y={cy + 3} textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold">I</text>
      <g onClick={onToggle} style={{ cursor: 'pointer' }}>
        <g transform={`rotate(${state ? 45 : -45}, ${cx}, ${cy})`} style={{ transition: 'transform 0.15s ease' }}>
          <rect x={cx - 6} y={cy - 22} width="12" height="44" rx="4" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
          <circle cx={cx} cy={cy - 12} r="2.5" fill="#facc15" />
        </g>
      </g>
      <text x={cx} y={height - 24} textAnchor="middle" fill="#005ea6" fontSize="7.5" fontWeight="bold" fontFamily="monospace">{tag}</text>
      {termX.map((tx, i) => (
        <g key={`loto-b-${i}`}>
          <rect x={tx - 6} y={height - 18} width="12" height="14" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
          <circle cx={tx} cy={height - 11} r="4" fill="#94a3b8" /><line x1={tx - 3} y1={height - 11} x2={tx + 3} y2={height - 11} stroke="#0f172a" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  );
};

// ============================================================================
// 12. BLOCO AUXILIAR FRONTAL WEG (85x95)
// ============================================================================
export const RealisticAuxBlock: React.FC<{
  width?: number; height?: number; tag?: string; state: boolean; isSelected?: boolean;
}> = ({ width = 85, height = 95, tag = 'KA', state, isSelected = false }) => {
  const cx = width / 2;
  const termX = [width * 0.3, width * 0.7];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', display: 'block', outline: isSelected ? '2px solid #00e676' : 'none', borderRadius: '4px', userSelect: 'none' }}>
      <rect x="2" y="2" width={width - 4} height={height - 4} rx="4" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      {termX.map((tx, i) => (
        <g key={`auxb-t-${i}`}>
          <rect x={tx - 6} y="4" width="12" height="12" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
          <circle cx={tx} cy="10" r="3.5" fill="#94a3b8" /><line x1={tx - 2.5} y1="10" x2={tx + 2.5} y2="10" stroke="#0f172a" strokeWidth="1" />
        </g>
      ))}
      <rect x="6" y="24" width={width - 12} height="46" rx="3" fill="#005ea6" />
      <text x={cx} y="36" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">BLOCO AUX</text>
      <rect x={cx - 18} y="42" width="36" height="14" rx="2" fill="#0f172a" />
      <text x={cx} y="52" textAnchor="middle" fill={state ? '#00e676' : '#94a3b8'} fontSize="6" fontWeight="bold" fontFamily="monospace">
        {state ? '13-14 ON' : '21-22 ON'}
      </text>
      <text x={cx} y="64" textAnchor="middle" fill="#e0f2fe" fontSize="5.5">Com {tag}</text>
      {termX.map((tx, i) => (
        <g key={`auxb-b-${i}`}>
          <rect x={tx - 6} y={height - 16} width="12" height="12" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
          <circle cx={tx} cy={height - 10} r="3.5" fill="#94a3b8" /><line x1={tx - 2.5} y1={height - 10} x2={tx + 2.5} y2={height - 10} stroke="#0f172a" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
};

// ============================================================================
// 13. TRANSFORMADOR ISOLADOR 220V/24V (95x130)
// ============================================================================
export const RealisticTransformer: React.FC<{
  width?: number; height?: number; tag?: string; isSelected?: boolean;
}> = ({ width = 95, height = 130, tag = 'TR', isSelected = false }) => {
  const cx = width / 2;
  const termX = [width * 0.3, width * 0.7];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', display: 'block', outline: isSelected ? '2px solid #00e676' : 'none', borderRadius: '4px', userSelect: 'none' }}>
      <rect x="2" y="2" width={width - 4} height={height - 4} rx="5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      {termX.map((tx, i) => (
        <g key={`tr-t-${i}`}>
          <rect x={tx - 6} y="4" width="12" height="14" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
          <circle cx={tx} cy="11" r="4" fill="#94a3b8" /><line x1={tx - 3} y1="11" x2={tx + 3} y2="11" stroke="#0f172a" strokeWidth="1.2" />
        </g>
      ))}
      <rect x="12" y="28" width={width - 24} height="68" rx="3" fill="#334155" stroke="#475569" strokeWidth="1" />
      <rect x="22" y="34" width={width - 44} height="56" rx="2" fill="#b45309" stroke="#78350f" strokeWidth="1" />
      <text x={cx} y="54" textAnchor="middle" fill="#fef3c7" fontSize="7" fontWeight="bold">PRI: 220V</text>
      <text x={cx} y="66" textAnchor="middle" fill="#86efac" fontSize="7" fontWeight="bold">SEC: 24V</text>
      <text x={cx} y="78" textAnchor="middle" fill="#ffffff" fontSize="5.5">50VA SELV</text>
      <text x={cx} y="110" textAnchor="middle" fill="#00e676" fontSize="7.5" fontWeight="bold" fontFamily="monospace">{tag}</text>
      {termX.map((tx, i) => (
        <g key={`tr-b-${i}`}>
          <rect x={tx - 6} y={height - 18} width="12" height="14" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
          <circle cx={tx} cy={height - 11} r="4" fill="#94a3b8" /><line x1={tx - 3} y1={height - 11} x2={tx + 3} y2={height - 11} stroke="#0f172a" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  );
};

// ============================================================================
// 14. RÉGUA DE BORNES DE PASSAGEM DIN (120x130)
// ============================================================================
export const RealisticTerminalBlock: React.FC<{
  width?: number; height?: number; tag?: string; isSelected?: boolean;
}> = ({ width = 120, height = 130, tag = 'XT', isSelected = false }) => {
  const termX = [width * 0.2, width * 0.4, width * 0.6, width * 0.8];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', display: 'block', outline: isSelected ? '2px solid #00e676' : 'none', borderRadius: '4px', userSelect: 'none' }}>
      <rect x="2" y="2" width={width - 4} height={height - 4} rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
      {termX.map((tx, i) => (
        <g key={`xt-t-${i}`}>
          <rect x={tx - 6} y="6" width="12" height="14" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
          <circle cx={tx} cy="13" r="4" fill="#94a3b8" /><line x1={tx - 3} y1="13" x2={tx + 3} y2="13" stroke="#0f172a" strokeWidth="1.2" />
          <text x={tx} y="32" textAnchor="middle" fill="#cbd5e1" fontSize="6.5" fontWeight="bold">{`X${i + 1}`}</text>
        </g>
      ))}
      <rect x="6" y="44" width={width - 12} height="38" rx="2" fill="#334155" />
      <text x={width / 2} y="62" textAnchor="middle" fill="#00e676" fontSize="8" fontWeight="bold">BORNES DIN</text>
      <text x={width / 2} y="72" textAnchor="middle" fill="#94a3b8" fontSize="6" fontFamily="monospace">{tag}</text>
      {termX.map((tx, i) => (
        <g key={`xt-b-${i}`}>
          <rect x={tx - 6} y={height - 20} width="12" height="14" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
          <circle cx={tx} cy={height - 13} r="4" fill="#94a3b8" /><line x1={tx - 3} y1={height - 13} x2={tx + 3} y2={height - 13} stroke="#0f172a" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  );
};

// ============================================================================
// 15. BARRAMENTO PENTE 3F (130x70)
// ============================================================================
export const RealisticBusbar: React.FC<{
  width?: number; height?: number; tag?: string; isSelected?: boolean;
}> = ({ width = 130, height = 70, tag = 'BAR', isSelected = false }) => {
  const termX = [width * 0.2, width * 0.5, width * 0.8];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', display: 'block', outline: isSelected ? '2px solid #00e676' : 'none', borderRadius: '4px', userSelect: 'none' }}>
      <rect x="2" y="2" width={width - 4} height={height - 4} rx="4" fill="#334155" stroke="#475569" strokeWidth="1.5" />
      <rect x="8" y="22" width={width - 16} height="26" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="1" />
      <text x={width / 2} y="38" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="bold">PENTE R-S-T</text>
      <text x={width / 2} y={height - 4} textAnchor="middle" fill="#00e676" fontSize="6" fontWeight="bold" fontFamily="monospace">{tag}</text>
      {termX.map((tx, i) => (
        <g key={`bar-t-${i}`}>
          <circle cx={tx} cy="14" r="4" fill="#fef3c7" stroke="#78350f" strokeWidth="1" />
          <circle cx={tx} cy={height - 14} r="4" fill="#fef3c7" stroke="#78350f" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
};

// ============================================================================
// 16. QUADRO DE ALIMENTAÇÃO REDE TRIFÁSICA 380V (140x80)
// Terminais apenas na base: R, S, T, N, PE (relY 80%)
// ============================================================================
export const RealisticGrid3P: React.FC<{
  width?: number; height?: number; tag?: string; name?: string; isSelected?: boolean;
}> = ({ width = 140, height = 80, tag = 'GRID-3F', isSelected = false }) => {
  const termX = [width * 0.18, width * 0.38, width * 0.58, width * 0.78, width * 0.92];
  const termColor = ['#78350f', '#78350f', '#78350f', '#1d4ed8', '#15803d'];
  const termFace = ['#d97706', '#d97706', '#d97706', '#3b82f6', '#22c55e'];
  const labels = ['R', 'S', 'T', 'N', 'PE'];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', display: 'block', outline: isSelected ? '2px solid #00e676' : 'none', borderRadius: '4px', userSelect: 'none' }}>
      {/* Quadro metálico com faixa de risco */}
      <rect x="2" y="2" width={width - 4} height={height - 4} rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      <rect x="2" y="2" width={width - 4} height="8" fill="url(#hazard3p)" />
      <defs>
        <pattern id="hazard3p" width="10" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="10" height="8" fill="#facc15" />
          <rect width="5" height="8" fill="#0f172a" />
        </pattern>
      </defs>

      {/* Cabo de entrada estilizado */}
      <rect x={width / 2 - 8} y="8" width="16" height="14" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
      <text x={width / 2} y="30" textAnchor="middle" fill="#f87171" fontSize="8" fontWeight="900">⚡ 380V</text>
      <text x={width / 2} y="40" textAnchor="middle" fill="#94a3b8" fontSize="6" fontFamily="monospace">REDE TRIFÁSICA CA</text>

      {/* Sinaleiros de fase R-S-T */}
      {[width * 0.3, width * 0.5, width * 0.7].map((cx, i) => (
        <circle key={`ph-${i}`} cx={cx} cy="48" r="4.5" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
      ))}
      <text x={width / 2} y="62" textAnchor="middle" fill="#00e676" fontSize="7.5" fontWeight="bold" fontFamily="monospace">{tag}</text>

      {/* Bornes de saída R S T N PE */}
      <rect x="6" y={height * 0.72} width={width - 12} height={height * 0.26} rx="3" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
      {termX.map((tx, i) => (
        <g key={`grid3-${i}`}>
          <circle cx={tx} cy={height * 0.8} r="5" fill={termFace[i]} stroke={termColor[i]} strokeWidth="1" />
          <line x1={tx - 3} y1={height * 0.8} x2={tx + 3} y2={height * 0.8} stroke="#0f172a" strokeWidth="1" />
          <text x={tx} y={height * 0.72 - 2} textAnchor="middle" fill="#cbd5e1" fontSize="6" fontWeight="bold">{labels[i]}</text>
        </g>
      ))}
    </svg>
  );
};

// ============================================================================
// 17. QUADRO DE ALIMENTAÇÃO REDE MONOFÁSICA 220V (120x80)
// Terminais apenas na base: F, N, PE (relY 80%)
// ============================================================================
export const RealisticGrid1P: React.FC<{
  width?: number; height?: number; tag?: string; name?: string; isSelected?: boolean;
}> = ({ width = 120, height = 80, tag = 'GRID-1F', isSelected = false }) => {
  const termX = [width * 0.25, width * 0.55, width * 0.85];
  const termColor = ['#78350f', '#1d4ed8', '#15803d'];
  const termFace = ['#d97706', '#3b82f6', '#22c55e'];
  const labels = ['F', 'N', 'PE'];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', display: 'block', outline: isSelected ? '2px solid #00e676' : 'none', borderRadius: '4px', userSelect: 'none' }}>
      <rect x="2" y="2" width={width - 4} height={height - 4} rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      <rect x="2" y="2" width={width - 4} height="8" fill="url(#hazard1p)" />
      <defs>
        <pattern id="hazard1p" width="10" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="10" height="8" fill="#facc15" />
          <rect width="5" height="8" fill="#0f172a" />
        </pattern>
      </defs>

      <rect x={width / 2 - 8} y="8" width="16" height="14" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
      <text x={width / 2} y="30" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="900">🔌 220V</text>
      <text x={width / 2} y="40" textAnchor="middle" fill="#94a3b8" fontSize="6" fontFamily="monospace">REDE MONOFÁSICA CA</text>

      <circle cx={width / 2} cy="48" r="4.5" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
      <text x={width / 2} y="62" textAnchor="middle" fill="#00e676" fontSize="7.5" fontWeight="bold" fontFamily="monospace">{tag}</text>

      <rect x="6" y={height * 0.72} width={width - 12} height={height * 0.26} rx="3" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
      {termX.map((tx, i) => (
        <g key={`grid1-${i}`}>
          <circle cx={tx} cy={height * 0.8} r="5" fill={termFace[i]} stroke={termColor[i]} strokeWidth="1" />
          <line x1={tx - 3} y1={height * 0.8} x2={tx + 3} y2={height * 0.8} stroke="#0f172a" strokeWidth="1" />
          <text x={tx} y={height * 0.72 - 2} textAnchor="middle" fill="#cbd5e1" fontSize="6" fontWeight="bold">{labels[i]}</text>
        </g>
      ))}
    </svg>
  );
};

// ============================================================================
// 18. CHAVE DE INTERTRAVAMENTO DE SEGURANÇA NR-12 (80x120)
// Bornes: 11/21 no topo (8%), 12/22 na base (92%)
// ============================================================================
export const RealisticInterlockSwitch: React.FC<{
  width?: number; height?: number; tag?: string; state: boolean; onToggle?: () => void; isSelected?: boolean;
}> = ({ width = 80, height = 120, tag = 'SQ', state, onToggle, isSelected = false }) => {
  const cx = width / 2;
  const termX = [width * 0.3, width * 0.7];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', display: 'block', outline: isSelected ? '2px solid #00e676' : 'none', borderRadius: '4px', userSelect: 'none' }}>
      <rect x="2" y="2" width={width - 4} height={height - 4} rx="5" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />

      {/* Bornes superiores 11 / 21 */}
      {termX.map((tx, i) => (
        <g key={`itl-t-${i}`}>
          <rect x={tx - 6} y="4" width="12" height="13" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
          <circle cx={tx} cy="10.5" r="3.8" fill="#94a3b8" />
          <line x1={tx - 2.5} y1="10.5" x2={tx + 2.5} y2="10.5" stroke="#0f172a" strokeWidth="1.2" />
        </g>
      ))}
      <text x={termX[0]} y="26" textAnchor="middle" fill="#7c2d12" fontSize="5.5" fontWeight="bold">11</text>
      <text x={termX[1]} y="26" textAnchor="middle" fill="#7c2d12" fontSize="5.5" fontWeight="bold">21</text>

      {/* Corpo escuro central com atuador tipo chave/lingueta */}
      <rect x="8" y="30" width={width - 16} height={height - 60} rx="4" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
      <text x={cx} y="42" textAnchor="middle" fill="#facc15" fontSize="6" fontWeight="900">NR-12</text>
      <text x={cx} y="50" textAnchor="middle" fill="#94a3b8" fontSize="5" fontFamily="monospace">CHAVE PORTA</text>

      {/* Ranhura e lingueta de acionamento (porta fechada = state true) */}
      <rect x={cx - 14} y="58" width="28" height="16" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
      <g onClick={onToggle} style={{ cursor: 'pointer' }}>
        <rect
          x={state ? cx - 3 : cx - 16}
          y="60"
          width="20"
          height="12"
          rx="2"
          fill={state ? '#22c55e' : '#dc2626'}
          stroke={state ? '#166534' : '#7f1d1d'}
          strokeWidth="1"
          style={{ transition: 'x 0.15s ease' }}
        />
      </g>
      <text x={cx} y="86" textAnchor="middle" fill="#e2e8f0" fontSize="5.5" fontWeight="bold">
        {state ? 'PORTA FECHADA' : 'PORTA ABERTA'}
      </text>

      <text x={cx} y={height - 24} textAnchor="middle" fill="#0f172a" fontSize="7.5" fontWeight="900" fontFamily="monospace">{tag}</text>

      {/* Bornes inferiores 12 / 22 */}
      {termX.map((tx, i) => (
        <g key={`itl-b-${i}`}>
          <rect x={tx - 6} y={height - 17} width="12" height="13" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
          <circle cx={tx} cy={height - 10.5} r="3.8" fill="#94a3b8" />
          <line x1={tx - 2.5} y1={height - 10.5} x2={tx + 2.5} y2={height - 10.5} stroke="#0f172a" strokeWidth="1.2" />
        </g>
      ))}
      <text x={termX[0]} y={height - 20} textAnchor="middle" fill="#7c2d12" fontSize="5.5" fontWeight="bold">12</text>
      <text x={termX[1]} y={height - 20} textAnchor="middle" fill="#7c2d12" fontSize="5.5" fontWeight="bold">22</text>
    </svg>
  );
};

// ============================================================================
// 19. MOTOR TRIFÁSICO W22 6 PONTAS (170x180)
// Caixa de bornes centralizada: U1V1W1 em 28%, W2U2V2 em 72%
// ============================================================================
export const RealisticMotor3Phase: React.FC<{
  width?: number; height?: number; tag?: string; name?: string; state: boolean; isSelected?: boolean;
}> = ({ width = 170, height = 180, tag = 'M', state, isSelected = false }) => {
  const cx = width / 2;
  const topY = height * 0.28;
  const botY = height * 0.72;
  const termX = [width * 0.25, width * 0.5, width * 0.75];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', display: 'block', outline: isSelected ? '2px solid #00e676' : 'none', borderRadius: '6px', userSelect: 'none' }}>
      {/* Carcaça cilíndrica nervurada */}
      <rect x="8" y="6" width={width - 16} height={height - 12} rx="18" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`fin-${i}`} x1={14 + i * ((width - 28) / 8)} y1="10" x2={14 + i * ((width - 28) / 8)} y2={height - 10} stroke="#1e293b" strokeWidth="3" opacity="0.7" />
      ))}

      {/* Tampa dianteira / eixo */}
      <circle cx="8" cy={height / 2} r="14" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
      <circle
        cx="8"
        cy={height / 2}
        r="6"
        fill={state ? '#00e676' : '#64748b'}
        style={state ? { animation: 'spin 0.4s linear infinite', transformOrigin: `8px ${height / 2}px` } : {}}
      />

      {/* Etiqueta WEG W22 */}
      <rect x={width * 0.32} y="14" width={width * 0.36} height="16" rx="3" fill="#005ea6" stroke="#003b66" strokeWidth="1" />
      <text x={cx} y="26" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="900" fontFamily="Arial, sans-serif">Шeg W22</text>

      {/* Caixa de ligação central com bornes U1 V1 W1 (topo) / W2 U2 V2 (base) */}
      <rect x={width * 0.22} y={topY - 14} width={width * 0.56} height={botY - topY + 28} rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />

      {termX.map((tx, i) => (
        <g key={`m3-top-${i}`}>
          <rect x={tx - 7} y={topY - 8} width="14" height="14" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
          <circle cx={tx} cy={topY - 1} r="4" fill="#94a3b8" />
          <line x1={tx - 3} y1={topY - 1} x2={tx + 3} y2={topY - 1} stroke="#0f172a" strokeWidth="1" />
        </g>
      ))}
      <text x={termX[0]} y={topY - 12} textAnchor="middle" fill="#93c5fd" fontSize="6" fontWeight="bold">U1</text>
      <text x={termX[1]} y={topY - 12} textAnchor="middle" fill="#93c5fd" fontSize="6" fontWeight="bold">V1</text>
      <text x={termX[2]} y={topY - 12} textAnchor="middle" fill="#93c5fd" fontSize="6" fontWeight="bold">W1</text>

      <text x={cx} y={(topY + botY) / 2 + 4} textAnchor="middle" fill="#facc15" fontSize="6.5" fontWeight="900" fontFamily="monospace">Y / Δ</text>

      {termX.map((tx, i) => (
        <g key={`m3-bot-${i}`}>
          <rect x={tx - 7} y={botY - 6} width="14" height="14" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
          <circle cx={tx} cy={botY + 1} r="4" fill="#94a3b8" />
          <line x1={tx - 3} y1={botY + 1} x2={tx + 3} y2={botY + 1} stroke="#0f172a" strokeWidth="1" />
        </g>
      ))}
      <text x={termX[0]} y={botY + 20} textAnchor="middle" fill="#fde68a" fontSize="6" fontWeight="bold">W2</text>
      <text x={termX[1]} y={botY + 20} textAnchor="middle" fill="#fde68a" fontSize="6" fontWeight="bold">U2</text>
      <text x={termX[2]} y={botY + 20} textAnchor="middle" fill="#fde68a" fontSize="6" fontWeight="bold">V2</text>

      <text x={cx} y={height - 8} textAnchor="middle" fill="#00e676" fontSize="8" fontWeight="900" fontFamily="monospace">{tag}</text>
      <text x={width - 14} y={height / 2} textAnchor="middle" fill={state ? '#22c55e' : '#64748b'} fontSize="6" fontWeight="bold">{state ? 'GIRANDO' : 'PARADO'}</text>
    </svg>
  );
};

// ============================================================================
// 20. MOTOR MONOFÁSICO COM CAPACITOR (150x160)
// Bornes: F, N no topo (15%), C1, C2 na base (85%)
// ============================================================================
export const RealisticMotorSingle: React.FC<{
  width?: number; height?: number; tag?: string; name?: string; state: boolean; isSelected?: boolean;
}> = ({ width = 150, height = 160, tag = 'M', state, isSelected = false }) => {
  const cx = width * 0.42;
  const topY = height * 0.15;
  const botY = height * 0.85;
  const topX = [width * 0.3, width * 0.7];
  const botX = [width * 0.3, width * 0.7];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', display: 'block', outline: isSelected ? '2px solid #00e676' : 'none', borderRadius: '6px', userSelect: 'none' }}>
      {/* Corpo do motor */}
      <rect x="6" y="18" width={width - 44} height={height - 36} rx="16" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`mf-${i}`} x1={12 + i * ((width - 56) / 5)} y1="22" x2={12 + i * ((width - 56) / 5)} y2={height - 22} stroke="#1e293b" strokeWidth="3" opacity="0.7" />
      ))}
      <circle cx={cx} cy={height / 2} r="10" fill={state ? '#38bdf8' : '#64748b'} style={state ? { animation: 'spin 0.5s linear infinite', transformOrigin: `${cx}px ${height / 2}px` } : {}} />

      {/* Capacitor de partida externo (cilindro anexado ao topo) */}
      <rect x={width - 40} y="4" width="30" height="46" rx="8" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
      <text x={width - 25} y="24" textAnchor="middle" fill="#fde047" fontSize="6" fontWeight="900">CAP</text>
      <text x={width - 25} y="34" textAnchor="middle" fill="#cbd5e1" fontSize="5">μF</text>

      {/* Bornes F/N no topo do motor */}
      {topX.map((tx, i) => (
        <g key={`ms-top-${i}`}>
          <rect x={tx - 7} y={topY - 7} width="14" height="14" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
          <circle cx={tx} cy={topY} r="4" fill="#94a3b8" />
          <line x1={tx - 3} y1={topY} x2={tx + 3} y2={topY} stroke="#0f172a" strokeWidth="1" />
        </g>
      ))}
      <text x={topX[0]} y={topY - 10} textAnchor="middle" fill="#38bdf8" fontSize="6" fontWeight="bold">F</text>
      <text x={topX[1]} y={topY - 10} textAnchor="middle" fill="#38bdf8" fontSize="6" fontWeight="bold">N</text>

      {/* Bornes C1/C2 na base (ligação do capacitor) */}
      {botX.map((tx, i) => (
        <g key={`ms-bot-${i}`}>
          <rect x={tx - 7} y={botY - 7} width="14" height="14" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
          <circle cx={tx} cy={botY} r="4" fill="#94a3b8" />
          <line x1={tx - 3} y1={botY} x2={tx + 3} y2={botY} stroke="#0f172a" strokeWidth="1" />
        </g>
      ))}
      <text x={botX[0]} y={botY + 16} textAnchor="middle" fill="#fde047" fontSize="6" fontWeight="bold">C1</text>
      <text x={botX[1]} y={botY + 16} textAnchor="middle" fill="#fde047" fontSize="6" fontWeight="bold">C2</text>

      <text x={cx} y={height - 4} textAnchor="middle" fill="#00e676" fontSize="7.5" fontWeight="900" fontFamily="monospace">{tag}</text>
    </svg>
  );
};

// ============================================================================
// 21. CAPACITOR DE PARTIDA / CORREÇÃO (80x120)
// Bornes: C1 no topo (relX 30, relY 10), C2 na base (relX 70, relY 90)
// ============================================================================
export const RealisticCapacitor: React.FC<{
  width?: number; height?: number; tag?: string; isSelected?: boolean;
}> = ({ width = 80, height = 120, tag = 'C', isSelected = false }) => {
  const cx = width / 2;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', display: 'block', outline: isSelected ? '2px solid #00e676' : 'none', borderRadius: '4px', userSelect: 'none' }}>
      <rect x="2" y="2" width={width - 4} height={height - 4} rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* Borne C1 (topo, relX 30%) */}
      <rect x={width * 0.3 - 7} y="4" width="14" height="14" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
      <circle cx={width * 0.3} cy="11" r="4" fill="#94a3b8" />
      <line x1={width * 0.3 - 3} y1="11" x2={width * 0.3 + 3} y2="11" stroke="#0f172a" strokeWidth="1" />
      <text x={width * 0.3} y="26" textAnchor="middle" fill="#dc2626" fontSize="6" fontWeight="900">+ C1</text>

      {/* Corpo cilíndrico de alumínio */}
      <rect x={cx - 22} y="30" width="44" height="62" rx="12" fill="#94a3b8" stroke="#64748b" strokeWidth="1.2" />
      <rect x={cx - 22} y="30" width="14" height="62" rx="8" fill="#cbd5e1" opacity="0.6" />
      <rect x={cx - 16} y="40" width="32" height="18" rx="2" fill="#1e293b" />
      <text x={cx} y="52" textAnchor="middle" fill="#fde047" fontSize="6.5" fontWeight="900">50µF</text>
      <text x={cx} y="70" textAnchor="middle" fill="#334155" fontSize="5.5" fontWeight="bold">250V ~</text>
      <text x={cx} y="82" textAnchor="middle" fill="#64748b" fontSize="5">MPP</text>

      <text x={cx} y="104" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="900" fontFamily="monospace">{tag}</text>

      {/* Borne C2 (base, relX 70%) */}
      <rect x={width * 0.7 - 7} y={height - 15} width="14" height="14" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
      <circle cx={width * 0.7} cy={height * 0.92} r="4" fill="#94a3b8" />
      <line x1={width * 0.7 - 3} y1={height * 0.92} x2={width * 0.7 + 3} y2={height * 0.92} stroke="#0f172a" strokeWidth="1" />
      <text x={width * 0.7} y={height - 20} textAnchor="middle" fill="#0284c7" fontSize="6" fontWeight="900">C2 −</text>
    </svg>
  );
};

// ============================================================================
// 22. RESISTOR DE FRENAGEM DINÂMICA (110x100)
// Bornes: B1 (relX 25, relY 50) e B2 (relX 75, relY 50) — laterais, meia-altura
// ============================================================================
export const RealisticBrakingResistor: React.FC<{
  width?: number; height?: number; tag?: string; isSelected?: boolean;
}> = ({ width = 110, height = 100, tag = 'R', isSelected = false }) => {
  const cy = height / 2;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', display: 'block', outline: isSelected ? '2px solid #00e676' : 'none', borderRadius: '4px', userSelect: 'none' }}>
      <rect x="2" y="2" width={width - 4} height={height - 4} rx="4" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />

      {/* Borne B1 (esquerda, meia altura) */}
      <rect x="2" y={cy - 7} width="14" height="14" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
      <circle cx="9" cy={cy} r="4" fill="#94a3b8" />
      <line x1="6" y1={cy} x2="12" y2={cy} stroke="#0f172a" strokeWidth="1" />
      <text x="9" y={cy - 12} textAnchor="middle" fill="#c2410c" fontSize="6" fontWeight="900">B1</text>

      {/* Corpo do resistor com aletas dissipadoras */}
      <rect x="20" y={cy - 26} width={width - 40} height="52" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="1.2" />
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`res-fin-${i}`} x1={26 + i * ((width - 52) / 5)} y1={cy - 26} x2={26 + i * ((width - 52) / 5)} y2={cy + 26} stroke="#92400e" strokeWidth="2" opacity="0.8" />
      ))}
      <rect x={width / 2 - 20} y={cy - 8} width="40" height="16" rx="2" fill="#1e293b" />
      <text x={width / 2} y={cy + 3.5} textAnchor="middle" fill="#fde047" fontSize="6.5" fontWeight="900" fontFamily="monospace">100Ω</text>
      <text x={width / 2} y={cy - 32} textAnchor="middle" fill="#7c2d12" fontSize="5.5" fontWeight="bold">DYNAMIC BRAKE 300W</text>

      <text x={width / 2} y={height - 6} textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="900" fontFamily="monospace">{tag}</text>

      {/* Borne B2 (direita, meia altura) */}
      <rect x={width - 16} y={cy - 7} width="14" height="14" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
      <circle cx={width - 9} cy={cy} r="4" fill="#94a3b8" />
      <line x1={width - 12} y1={cy} x2={width - 6} y2={cy} stroke="#0f172a" strokeWidth="1" />
      <text x={width - 9} y={cy - 12} textAnchor="middle" fill="#c2410c" fontSize="6" fontWeight="900">B2</text>
    </svg>
  );
};