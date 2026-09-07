import React from 'react';

// ============================================================================
// 1. CONTATOR TRIPOLAR REALISTA (PADRÃO WEG CWM25)
// Dimensões originais: width: 110, height: 180
// ============================================================================
interface ContactorProps {
  width: number;
  height: number;
  tag: string;
  name: string;
  state: boolean; // true = atracado (bobina energizada)
  isSelected?: boolean;
}

export const RealisticContactor: React.FC<ContactorProps> = ({
  width,
  height,
  tag,
  state,
  isSelected,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 110 180"
      style={{
        width: '100%',
        height: '100%',
        filter: isSelected
          ? 'drop-shadow(0 0 6px #00e676)'
          : 'drop-shadow(0 6px 12px rgba(0,0,0,0.5))',
        userSelect: 'none',
      }}
    >
      <defs>
        {/* Gradiente da carcaça cinza industrial */}
        <linearGradient id="cwmBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cfd8dc" />
          <stop offset="15%" stopColor="#eceff1" />
          <stop offset="85%" stopColor="#eceff1" />
          <stop offset="100%" stopColor="#b0bec5" />
        </linearGradient>

        {/* Gradiente do miolo azul característico WEG */}
        <linearGradient id="wegBlueCenter" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#004d84" />
          <stop offset="50%" stopColor="#005ea6" />
          <stop offset="100%" stopColor="#003b66" />
        </linearGradient>

        {/* Gradiente dos parafusos metálicos dos bornes */}
        <radialGradient id="screwMetal" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </radialGradient>

        {/* Sombra de cavidade funda para os bornes */}
        <radialGradient id="terminalCavity" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
      </defs>

      {/* 1. Base da Carcaça Principal */}
      <rect x="2" y="2" width="106" height="176" rx="6" fill="url(#cwmBody)" stroke="#78909c" strokeWidth="1.5" />

      {/* Reentrâncias laterais de travamento em trilho DIN */}
      <rect x="2" y="70" width="3" height="40" fill="#78909c" />
      <rect x="105" y="70" width="3" height="40" fill="#78909c" />

      {/* 2. Zonas de Bornes Superiores (Entrada: 1/L1, 3/L2, 5/L3 e Aux 13 NO) */}
      <rect x="6" y="5" width="98" height="28" rx="3" fill="#90a4ae" opacity="0.4" />

      {/* Cavidades dos bornes superiores - Alinhadas com relX: 18, 38, 58, 82 e relY: 8 */}
      {[19.8, 41.8, 63.8, 90.2].map((cx, i) => (
        <g key={`top-term-${i}`}>
          <rect x={cx - 7} y="6.4" width="14" height="16" rx="2" fill="url(#terminalCavity)" stroke="#334155" strokeWidth="0.8" />
          <circle cx={cx} cy="14.4" r="5" fill="url(#screwMetal)" />
          {/* Ranhura fenda cruzada/phillips no parafuso */}
          <line x1={cx - 3.5} y1="14.4" x2={cx + 3.5} y2="14.4" stroke="#1e293b" strokeWidth="1" />
          <line x1={cx} y1="14.4 - 3.5" x2={cx} y2="14.4 + 3.5" stroke="#1e293b" strokeWidth="1" />
        </g>
      ))}

      {/* Borne A1 da bobina (lado direito superior - relX: 82, relY: 28 -> y=50.4) */}
      <g>
        <rect x="83.2" y="42" width="14" height="16" rx="2" fill="url(#terminalCavity)" stroke="#334155" strokeWidth="0.8" />
        <circle cx="90.2" cy="50.4" r="4.5" fill="url(#screwMetal)" />
        <line x1="87.2" y1="50.4" x2="93.2" y2="50.4" stroke="#1e293b" strokeWidth="1" />
      </g>

      {/* 3. Bloco Central Azul WEG */}
      <rect x="6" y="40" width="76" height="96" rx="4" fill="url(#wegBlueCenter)" stroke="#002d50" strokeWidth="1" />
      <rect x="9" y="43" width="70" height="90" rx="3" fill="none" stroke="#38bdf8" strokeWidth="0.5" opacity="0.6" />

      {/* Logotipo e Tipografia Técnica WEG */}
      <text x="14" y="56" fill="#ffffff" fontSize="9" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="0.5">
        Шeg
      </text>
      <text x="40" y="56" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace">
        CWM25
      </text>
      <text x="14" y="66" fill="#e0f2fe" fontSize="5.5" fontFamily="Arial, sans-serif">
        Ui 1000V • Ith 40A
      </text>
      <text x="14" y="73" fill="#e0f2fe" fontSize="5" fontFamily="Arial, sans-serif">
        AC-3: 380V 25A 11kW
      </text>

      {/* 4. Núcleo Móvel Central (Indicador Mecânico de Atracamento) */}
      <g id="plungerGroup">
        <rect x="22" y="80" width="44" height="34" rx="3" fill="#1e293b" stroke="#0f172a" strokeWidth="1.2" />
        {/* Tampa do núcleo que se move fisicamente quando atracado */}
        <rect
          x="25"
          y={state ? 85 : 82}
          width="38"
          height="28"
          rx="2"
          fill={state ? '#0f766e' : '#374151'}
          stroke={state ? '#22c55e' : '#64748b'}
          strokeWidth="1"
          style={{ transition: 'all 0.12s ease-in-out' }}
        />
        {/* Bandeira indicadora mecânica interna */}
        <rect
          x="30"
          y={state ? 92 : 88}
          width="28"
          height="12"
          rx="2"
          fill={state ? '#22c55e' : '#dc2626'}
          stroke="#000"
          strokeWidth="0.5"
          style={{ transition: 'all 0.12s ease-in-out' }}
        />
        <text
          x="44"
          y={state ? 100.5 : 96.5}
          textAnchor="middle"
          fill="#ffffff"
          fontSize="6"
          fontWeight="900"
          fontFamily="monospace"
          style={{ transition: 'all 0.12s ease-in-out' }}
        >
          {state ? 'ON' : 'OFF'}
        </text>
      </g>

      {/* Identificação de TAG do Componente (ex: K1, K2) */}
      <rect x="22" y="118" width="44" height="14" rx="2" fill="#0f172a" stroke="#475569" strokeWidth="0.8" />
      <text x="44" y="128" textAnchor="middle" fill="#00e676" fontSize="8" fontWeight="bold" fontFamily="monospace">
        {tag}
      </text>

      {/* Borne A2 da bobina (lado direito inferior - relX: 82, relY: 72 -> y=129.6) */}
      <g>
        <rect x="83.2" y="121" width="14" height="16" rx="2" fill="url(#terminalCavity)" stroke="#334155" strokeWidth="0.8" />
        <circle cx="90.2" cy="129.6" r="4.5" fill="url(#screwMetal)" />
        <line x1="87.2" y1="129.6" x2="93.2" y2="129.6" stroke="#1e293b" strokeWidth="1" />
      </g>

      {/* 5. Zonas de Bornes Inferiores (Saída: 2/T1, 4/T2, 6/T3 e Aux 14 NO) */}
      <rect x="6" y="147" width="98" height="28" rx="3" fill="#90a4ae" opacity="0.4" />

      {/* Cavidades dos bornes inferiores - Alinhadas com relX: 18, 38, 58, 82 e relY: 92 (y=165.6) */}
      {[19.8, 41.8, 63.8, 90.2].map((cx, i) => (
        <g key={`bot-term-${i}`}>
          <rect x={cx - 7} y="157.6" width="14" height="16" rx="2" fill="url(#terminalCavity)" stroke="#334155" strokeWidth="0.8" />
          <circle cx={cx} cy="165.6" r="5" fill="url(#screwMetal)" />
          <line x1={cx - 3.5} y1="165.6" x2={cx + 3.5} y2="165.6" stroke="#1e293b" strokeWidth="1" />
          <line x1={cx} y1="165.6 - 3.5" x2={cx} y2="165.6 + 3.5" stroke="#1e293b" strokeWidth="1" />
        </g>
      ))}

      {/* Serigrafia gravada dos bornes na carcaça */}
      <text x="19.8" y="32" textAnchor="middle" fill="#374151" fontSize="6.5" fontWeight="bold">1/L1</text>
      <text x="41.8" y="32" textAnchor="middle" fill="#374151" fontSize="6.5" fontWeight="bold">3/L2</text>
      <text x="63.8" y="32" textAnchor="middle" fill="#374151" fontSize="6.5" fontWeight="bold">5/L3</text>
      <text x="90.2" y="32" textAnchor="middle" fill="#004d84" fontSize="6.5" fontWeight="bold">13NO</text>
      <text x="90.2" y="40" textAnchor="middle" fill="#b91c1c" fontSize="6" fontWeight="bold">A1</text>

      <text x="19.8" y="154" textAnchor="middle" fill="#374151" fontSize="6.5" fontWeight="bold">2/T1</text>
      <text x="41.8" y="154" textAnchor="middle" fill="#374151" fontSize="6.5" fontWeight="bold">4/T2</text>
      <text x="63.8" y="154" textAnchor="middle" fill="#374151" fontSize="6.5" fontWeight="bold">6/T3</text>
      <text x="90.2" y="154" textAnchor="middle" fill="#004d84" fontSize="6.5" fontWeight="bold">14NO</text>
      <text x="90.2" y="145" textAnchor="middle" fill="#b91c1c" fontSize="6" fontWeight="bold">A2</text>
    </svg>
  );
};


// ============================================================================
// 2. RELÉ TÉRMICO DE SOBRECARGA REALISTA (PADRÃO WEG RW27)
// Dimensões originais: width: 120, height: 190
// ============================================================================
interface ThermalRelayProps {
  width: number;
  height: number;
  tag: string;
  name: string;
  tripped?: boolean;
  onTripToggle?: () => void;
  isSelected?: boolean;
}

export const RealisticThermalRelay: React.FC<ThermalRelayProps> = ({
  width,
  height,
  tag,
  tripped,
  onTripToggle,
  isSelected,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 190"
      style={{
        width: '100%',
        height: '100%',
        filter: isSelected
          ? 'drop-shadow(0 0 6px #00e676)'
          : 'drop-shadow(0 6px 12px rgba(0,0,0,0.5))',
        userSelect: 'none',
      }}
    >
      <defs>
        {/* Corpo cinza escuro / preto industrial característico do relé térmico */}
        <linearGradient id="rwBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#374151" />
          <stop offset="50%" stopColor="#1f2937" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>

        {/* Hastes de Cobre Superiores (para acoplar direto nas saídas do contator) */}
        <linearGradient id="copperPin" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="40%" stopColor="#d97706" />
          <stop offset="70%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>

        {/* Dial de ajuste de corrente */}
        <radialGradient id="dialFace" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="85%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </radialGradient>
      </defs>

      {/* 1. Hastes de Cobre Superiores - relX: 20 (x=24), relX: 50 (x=60), relX: 80 (x=96) e relY: 8 (y=15.2) */}
      {[24, 60, 96].map((cx, i) => (
        <g key={`copper-${i}`}>
          <rect x={cx - 5} y="4" width="10" height="24" rx="2" fill="url(#copperPin)" stroke="#78350f" strokeWidth="0.8" />
          <circle cx={cx} cy="15.2" r="3.5" fill="#fef3c7" stroke="#92400e" strokeWidth="0.6" />
        </g>
      ))}

      {/* 2. Carcaça Principal do Relé RW27 */}
      <rect x="4" y="24" width="112" height="162" rx="5" fill="url(#rwBody)" stroke="#4b5563" strokeWidth="1.2" />

      {/* Relevo de topo do bloco mecânico */}
      <rect x="8" y="28" width="104" height="24" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
      <text x="14" y="44" fill="#ffffff" fontSize="9" fontWeight="900" fontFamily="Arial, sans-serif">
        Шeg
      </text>
      <text x="42" y="44" fill="#f87171" fontSize="8" fontWeight="bold" fontFamily="monospace">
        RW27-1D
      </text>
      <text x="86" y="44" fill="#00e676" fontSize="8" fontWeight="bold" fontFamily="monospace">
        {tag}
      </text>

      {/* 3. Disco Rotativo / Trimpot de Ajuste de Corrente (Dial Térmico) */}
      <g transform="translate(24, 60)">
        <circle cx="16" cy="16" r="14" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="11" fill="url(#dialFace)" />
        {/* Ranhura indicadora da escala de corrente */}
        <line x1="16" y1="7" x2="16" y2="13" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
        <text x="16" y="22" textAnchor="middle" fill="#0f172a" fontSize="5" fontWeight="bold">
          15-23A
        </text>
      </g>

      {/* 4. Botões de Reset (Azul) e Teste/Stop (Vermelho) */}
      {/* Botão RESET */}
      <g transform="translate(68, 58)">
        <rect x="0" y="0" width="18" height="18" rx="3" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
        <text x="9" y="11.5" textAnchor="middle" fill="#ffffff" fontSize="5.5" fontWeight="bold" fontFamily="Arial">
          RESET
        </text>
      </g>

      {/* Botão STOP / TEST Interativo (Clique para alternar disparo) */}
      <g
        transform="translate(90, 58)"
        onClick={(e) => {
          e.stopPropagation();
          onTripToggle && onTripToggle();
        }}
        style={{ cursor: 'pointer' }}
      >
        <rect
          x="0"
          y="0"
          width="18"
          height="18"
          rx="3"
          fill={tripped ? '#b91c1c' : '#dc2626'}
          stroke="#7f1d1d"
          strokeWidth="1"
          filter={tripped ? 'brightness(1.3)' : 'none'}
        />
        <text x="9" y="11.5" textAnchor="middle" fill="#ffffff" fontSize="5.5" fontWeight="bold" fontFamily="Arial">
          {tripped ? 'TRIP' : 'TEST'}
        </text>
      </g>

      {/* Bandeira óptica de indicação mecânica de desarme */}
      <rect x="74" y="80" width="30" height="7" rx="1.5" fill="#000" />
      <rect
        x="75"
        y="81"
        width="28"
        height="5"
        rx="1"
        fill={tripped ? '#ef4444' : '#22c55e'}
        style={{ transition: 'fill 0.15s ease' }}
      />

      {/* 5. Linha dos Contatos Auxiliares (95-96 NC e 97-98 NO) */}
      {/* relY: 58% em 190px = 110.2px */}
      <rect x="8" y="98" width="104" height="30" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
      
      {/* 95 NC (relX: 18 -> 21.6), 96 NC (relX: 40 -> 48), 97 NO (relX: 62 -> 74.4), 98 NO (relX: 84 -> 100.8) */}
      {[21.6, 48, 74.4, 100.8].map((cx, i) => (
        <g key={`aux-term-${i}`}>
          <rect x={cx - 6} y="103.2" width="12" height="14" rx="2" fill="#0f172a" stroke="#475569" strokeWidth="0.8" />
          <circle cx={cx} cy="110.2" r="4.2" fill="#94a3b8" />
          <line x1={cx - 2.8} y1="110.2" x2={cx + 2.8} y2="110.2" stroke="#1e293b" strokeWidth="1" />
        </g>
      ))}

      {/* Serigrafia dos contatos 95-96 NC e 97-98 NO */}
      <text x="21.6" y="125" textAnchor="middle" fill="#93c5fd" fontSize="6.5" fontWeight="bold">95</text>
      <text x="48" y="125" textAnchor="middle" fill="#93c5fd" fontSize="6.5" fontWeight="bold">96 NC</text>
      <text x="74.4" y="125" textAnchor="middle" fill="#fca5a5" fontSize="6.5" fontWeight="bold">97</text>
      <text x="100.8" y="125" textAnchor="middle" fill="#fca5a5" fontSize="6.5" fontWeight="bold">98 NO</text>

      {/* 6. Bornes Inferiores de Potência para o Motor (2/T1, 4/T2, 6/T3) */}
      {/* relY: 92% em 190px = 174.8px */}
      <rect x="8" y="156" width="104" height="26" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />

      {/* relX: 20 (x=24), relX: 50 (x=60), relX: 80 (x=96) */}
      {[24, 60, 96].map((cx, i) => (
        <g key={`load-term-${i}`}>
          <rect x={cx - 7} y="166.8" width="14" height="16" rx="2" fill="#0f172a" stroke="#475569" strokeWidth="0.8" />
          <circle cx={cx} cy="174.8" r="5" fill="#94a3b8" />
          <line x1={cx - 3.5} y1="174.8" x2={cx + 3.5} y2="174.8" stroke="#1e293b" strokeWidth="1" />
          <line x1={cx} y1="174.8 - 3.5" x2={cx} y2="174.8 + 3.5" stroke="#1e293b" strokeWidth="1" />
        </g>
      ))}

      <text x="24" y="163" textAnchor="middle" fill="#e2e8f0" fontSize="6.5" fontWeight="bold">2/T1</text>
      <text x="60" y="163" textAnchor="middle" fill="#e2e8f0" fontSize="6.5" fontWeight="bold">4/T2</text>
      <text x="96" y="163" textAnchor="middle" fill="#e2e8f0" fontSize="6.5" fontWeight="bold">6/T3</text>
    </svg>
  );
};