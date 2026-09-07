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