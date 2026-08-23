import React from 'react';
import { useInverter } from '../context/InverterContext';
import { ParameterKey } from '../types/cfw500';

export const IHM: React.FC = () => {
  const { state, dispatch, currentDisplayValue, selectedParameter } = useInverter();
  const paramKeys = Object.keys(state.parameters) as ParameterKey[];

  const isRunning = state.motorStatus === 'RUNNING';
  const isFaulted = state.activeFault !== null;

  return (
    <div style={outerContainerStyle}>
      {/* GABINETE FRONTAL WEG CFW500 */}
      <div style={chassisStyle}>
        {/* TOPO CHANFRADO AZUL COM LOGO WEG */}
        <div style={topBezelStyle}>
          <div style={logoWegStyle}>
            <span style={wegLetterStyle}>w</span>
            <span style={wegLetterStyle}>e</span>
            <span style={wegLetterStyle}>g</span>
          </div>
          <div style={modelBadgeStyle}>
            <span style={{ fontSize: '13px', fontWeight: 900, letterSpacing: '1px' }}>CFW500</span>
            <span style={{ fontSize: '8px', color: '#90caf9', letterSpacing: '0.5px' }}>VARIABLE SPEED DRIVE</span>
          </div>
        </div>

        {/* ÁREA DA IHM EMBUTIDA */}
        <div style={ihmInsertStyle}>
          {/* PAINEL SUPERIOR: DISPLAY LCD COM TEXTURA DE CRISTAL LÍQUIDO */}
          <div style={lcdOuterBezelStyle}>
            <div style={lcdInnerGlassStyle}>
              {/* LINHA SUPERIOR DO LCD (INDICADORES DE MODO) */}
              <div style={lcdHeaderRowStyle}>
                <span style={{ fontWeight: 'bold', color: state.controlSource === 'LOC' ? '#0f2410' : '#72986e' }}>
                  [LOC]
                </span>
                <span style={{ fontWeight: 'bold', color: state.controlSource === 'REM' ? '#0f2410' : '#72986e' }}>
                  [REM]
                </span>
                <span style={{ fontWeight: 'bold', color: state.ihmMode === 'PARAM_EDIT' ? '#0f2410' : '#72986e' }}>
                  PROG
                </span>
                <span style={{ fontWeight: 'bold', color: isRunning ? '#0f2410' : '#72986e' }}>
                  {state.isForwardDirection ? 'FWD ↻' : 'REV ↺'}
                </span>
              </div>

              {/* DÍGITOS PRINCIPAIS EM 7 SEGMENTOS */}
              <div style={lcdDigitsContainerStyle}>
                <span style={lcdMainDigitsStyle}>{currentDisplayValue}</span>
              </div>

              {/* LINHA INFERIOR DO LCD (UNIDADE E STATUS) */}
              <div style={lcdFooterRowStyle}>
                <span style={{ fontSize: '11px', fontWeight: 800 }}>
                  {state.ihmMode === 'PARAM_EDIT' ? selectedParameter?.unit || 'VAL' : 'Hz'}
                </span>
                <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.5px' }}>
                  {isFaulted ? 'FAULT' : isRunning ? 'RUN' : 'READY'}
                </span>
              </div>
            </div>
          </div>

          {/* LEDS DE SINALIZAÇÃO FRONTAL COM DIFUSOR */}
          <div style={ledsBarContainerStyle}>
            <div style={ledItemStyle}>
              <div
                style={{
                  ...ledIndicatorStyle,
                  background: isRunning ? '#00e676' : '#143818',
                  boxShadow: isRunning ? '0 0 10px #00e676, 0 0 2px #fff' : 'inset 0 1px 2px #000',
                }}
              />
              <span style={ledLabelStyle}>RUN</span>
            </div>

            <div style={ledItemStyle}>
              <div
                style={{
                  ...ledIndicatorStyle,
                  background: isFaulted ? '#ff1744' : '#3e1518',
                  boxShadow: isFaulted ? '0 0 10px #ff1744, 0 0 2px #fff' : 'inset 0 1px 2px #000',
                }}
              />
              <span style={ledLabelStyle}>FAULT</span>
            </div>

            <div style={ledItemStyle}>
              <div
                style={{
                  ...ledIndicatorStyle,
                  background: state.controlSource === 'REM' ? '#ffb300' : '#33260c',
                  boxShadow: state.controlSource === 'REM' ? '0 0 10px #ffb300, 0 0 2px #fff' : 'inset 0 1px 2px #000',
                }}
              />
              <span style={ledLabelStyle}>REM</span>
            </div>
          </div>

          {/* TECLADO DE MEMBRANA TÁTIL CFW500 */}
          <div style={membraneKeypadStyle}>
            {/* LINHA 1 DE TECLAS */}
            <button
              style={{ ...keyButtonStyle, background: '#005b9f', color: '#fff' }}
              onClick={() => dispatch({ type: 'PRESS_PROG' })}
              title="Menu / Entrar / Salvar (PROG)"
            >
              <span style={{ fontSize: '11px', fontWeight: 900 }}>PROG</span>
            </button>

            <button
              style={keyButtonStyle}
              onClick={() => dispatch({ type: 'PRESS_UP' })}
              title="Incrementar / Próximo Parâmetro (▲)"
            >
              <span style={{ fontSize: '16px' }}>▲</span>
            </button>

            <button
              style={{ ...keyButtonStyle, fontSize: '10px' }}
              onClick={() => dispatch({ type: 'PRESS_LOCREM' })}
              title="Alternar Local / Remoto"
            >
              <span style={{ fontWeight: 800, lineHeight: '1.1' }}>LOC<br />REM</span>
            </button>

            {/* LINHA 2 DE TECLAS */}
            <button
              style={keyButtonStyle}
              onClick={() => dispatch({ type: 'PRESS_DIRECTION' })}
              title="Inverter Sentido de Giro"
            >
              <span style={{ fontSize: '14px', fontWeight: 900 }}>↻/↺</span>
            </button>

            <button
              style={keyButtonStyle}
              onClick={() => dispatch({ type: 'PRESS_DOWN' })}
              title="Decrementar / Parâmetro Anterior (▼)"
            >
              <span style={{ fontSize: '16px' }}>▼</span>
            </button>

            <button
              style={{ ...keyButtonStyle, color: '#90caf9' }}
              onClick={() => dispatch({ type: 'PRESS_PROG' })}
              title="Entrar no Modo Parâmetro"
            >
              <span style={{ fontSize: '9px', fontWeight: 800 }}>MENU</span>
            </button>

            {/* LINHA 3: TECLAS DE POTÊNCIA (I / O) */}
            <button
              style={{ ...keyButtonStyle, ...runButtonStyle }}
              onClick={() => dispatch({ type: 'PRESS_RUN' })}
              title="Partir Inversor (RUN - Tecla I)"
            >
              <span style={{ fontSize: '18px', fontWeight: 900 }}>I</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={plugModuleSlotStyle} title="Módulo de Expansão Plug-in CFW500-IOS">
                <span style={{ fontSize: '8px', color: '#546e7a', fontWeight: 700 }}>PLUG-IN</span>
              </div>
            </div>

            <button
              style={{ ...keyButtonStyle, ...stopButtonStyle }}
              onClick={() => dispatch({ type: 'PRESS_STOP' })}
              title="Parar / Resetar Inversor (STOP - Tecla O)"
            >
              <span style={{ fontSize: '18px', fontWeight: 900 }}>O</span>
            </button>
          </div>
        </div>

        {/* FENDAS INFERIORES DE VENTILAÇÃO E CABEAMENTO */}
        <div style={bottomGrillContainerStyle}>
          <div style={grillSlitStyle} />
          <div style={grillSlitStyle} />
          <div style={grillSlitStyle} />
          <div style={grillSlitStyle} />
        </div>
      </div>

      {/* PAINEL LATERAL: DETALHES TÉCNICOS & NAVEGAÇÃO DE PARÂMETROS */}
      <div style={sideInspectorPanelStyle}>
        <div style={inspectorHeaderStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#0091ea', fontSize: '14px' }}>📋</span>
            <strong style={{ fontSize: '13px', color: '#eceff1' }}>MAPA DE PARÂMETROS (EEPROM)</strong>
          </div>
          <span style={paramCodeBadgeStyle}>{selectedParameter?.code || 'P0000'}</span>
        </div>

        <div style={dataCardStyle}>
          <div style={dataRowStyle}>
            <span style={dataLabelStyle}>Função:</span>
            <strong style={{ color: '#64b5f6', textAlign: 'right', maxWidth: '65%', fontSize: '12px' }}>
              {selectedParameter?.description}
            </strong>
          </div>
          <div style={dataRowStyle}>
            <span style={dataLabelStyle}>Faixa de Ajuste:</span>
            <span style={dataValueStyle}>
              {selectedParameter?.min} a {selectedParameter?.max} {selectedParameter?.unit}
            </span>
          </div>
          <div style={dataRowStyle}>
            <span style={dataLabelStyle}>Padrão de Fábrica:</span>
            <span style={dataValueStyle}>
              {selectedParameter?.defaultValue} {selectedParameter?.unit}
            </span>
          </div>
          <div style={{ ...dataRowStyle, borderBottom: 'none', paddingTop: '4px' }}>
            <span style={dataLabelStyle}>Valor Atual em Memória:</span>
            <strong style={{ color: '#00e676', fontSize: '14px' }}>
              {selectedParameter?.currentValue} {selectedParameter?.unit}
            </strong>
          </div>
        </div>

        <h4 style={{ fontSize: '11px', color: '#90a4ae', marginTop: '10px', marginBottom: '6px', letterSpacing: '0.5px' }}>
          SELEÇÃO DIRETA DE PARÂMETROS:
        </h4>
        <div style={paramListScrollStyle}>
          {paramKeys.map((k) => {
            const isSelected = selectedParameter?.code === k;
            return (
              <div
                key={k}
                onClick={() => dispatch({ type: 'SELECT_PARAM_DIRECT', payload: k })}
                style={{
                  ...paramItemStyle,
                  background: isSelected ? 'rgba(0, 145, 234, 0.2)' : 'transparent',
                  borderLeft: isSelected ? '3px solid #0091ea' : '3px solid transparent',
                  color: isSelected ? '#fff' : '#b0bec5',
                }}
              >
                <span>
                  <strong style={{ color: isSelected ? '#64b5f6' : '#90a4ae', fontFamily: 'monospace' }}>{k}</strong>
                  {' '}- {state.parameters[k].description}
                </span>
                <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>
                  {state.parameters[k].currentValue} {state.parameters[k].unit}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// ESTILOS VISUAIS WEG CFW500 REALISTA
// ==========================================

const outerContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  width: '100%',
  flex: '1 1 520px',
};

const chassisStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '310px',
  margin: '0 auto',
  background: 'linear-gradient(180deg, #2b3038 0%, #1c2026 100%)',
  borderRadius: '14px',
  padding: '12px',
  border: '2px solid #3a414d',
  boxShadow: '0 16px 36px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  boxSizing: 'border-box',
  flexShrink: 0,
};

const topBezelStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg, #005a9c 0%, #004377 100%)',
  margin: '-12px -12px 2px -12px',
  padding: '10px 14px',
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '2px solid #002d50',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
};

const logoWegStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  background: '#ffffff',
  padding: '2px 8px',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
};

const wegLetterStyle: React.CSSProperties = {
  color: '#005a9c',
  fontSize: '18px',
  fontWeight: 900,
  lineHeight: '1',
  fontFamily: 'Arial, sans-serif',
  letterSpacing: '-1px',
};

const modelBadgeStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  color: '#ffffff',
};

const ihmInsertStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg, #171a1f 0%, #121418 100%)',
  borderRadius: '10px',
  padding: '12px',
  border: '2px solid #0d0f12',
  boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8)',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

// DISPLAY LCD
const lcdOuterBezelStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg, #0a0c0e 0%, #181c22 100%)',
  padding: '8px',
  borderRadius: '8px',
  border: '2px solid #232832',
  boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.9), 0 1px 2px rgba(255,255,255,0.05)',
};

const lcdInnerGlassStyle: React.CSSProperties = {
  background: '#8cb885',
  borderRadius: '4px',
  padding: '8px 10px',
  color: '#132811',
  fontFamily: 'monospace',
  boxShadow: 'inset 0 0 12px rgba(0,0,0,0.25)',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const lcdHeaderRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '9px',
  letterSpacing: '0.5px',
  borderBottom: '1px dashed rgba(19, 40, 17, 0.3)',
  paddingBottom: '2px',
};

const lcdDigitsContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  minHeight: '44px',
};

const lcdMainDigitsStyle: React.CSSProperties = {
  fontSize: '38px',
  fontWeight: 900,
  letterSpacing: '2px',
  lineHeight: '40px',
  fontFamily: '"Courier New", Courier, monospace',
  textShadow: '1px 1px 0px rgba(0,0,0,0.15)',
};

const lcdFooterRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: '1px dashed rgba(19, 40, 17, 0.3)',
  paddingTop: '2px',
};

// LEDS
const ledsBarContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  background: '#0d0f12',
  padding: '6px 10px',
  borderRadius: '6px',
  border: '1px solid #20252e',
};

const ledItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};

const ledIndicatorStyle: React.CSSProperties = {
  width: '11px',
  height: '11px',
  borderRadius: '50%',
  transition: 'all 0.15s ease',
  border: '1px solid rgba(0,0,0,0.5)',
};

const ledLabelStyle: React.CSSProperties = {
  fontSize: '9px',
  fontWeight: 800,
  color: '#90a4ae',
  letterSpacing: '0.5px',
};

// TECLADO DE MEMBRANA
const membraneKeypadStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '8px',
  marginTop: '2px',
};

const keyButtonStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg, #373e4a 0%, #242932 100%)',
  border: '1px solid #485261',
  borderRadius: '6px',
  color: '#eceff1',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 3px 0 #15181e, 0 4px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
  transition: 'transform 0.05s ease, box-shadow 0.05s ease',
  userSelect: 'none',
};

const runButtonStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg, #2e7d32 0%, #1b5e20 100%)',
  border: '1px solid #43a047',
  color: '#ffffff',
  boxShadow: '0 3px 0 #0d3310, 0 4px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
};

const stopButtonStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg, #c62828 0%, #8e0000 100%)',
  border: '1px solid #e53935',
  color: '#ffffff',
  boxShadow: '0 3px 0 #4d0000, 0 4px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
};

const plugModuleSlotStyle: React.CSSProperties = {
  width: '100%',
  height: '36px',
  background: '#15181e',
  border: '1px dashed #323946',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

// GRELHA INFERIOR
const bottomGrillContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '6px',
  padding: '4px 8px 0 8px',
};

const grillSlitStyle: React.CSSProperties = {
  flex: 1,
  height: '14px',
  background: '#0e1013',
  borderRadius: '3px',
  border: '1px solid #2a2f38',
  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
};

// PAINEL DE INSPEÇÃO LATERAL
const sideInspectorPanelStyle: React.CSSProperties = {
  flex: '1 1 280px',
  minWidth: '270px',
  background: '#1a1d21',
  borderRadius: '14px',
  padding: '14px',
  border: '1px solid #323842',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
};

const inspectorHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #2a2f38',
  paddingBottom: '8px',
  marginBottom: '10px',
};

const paramCodeBadgeStyle: React.CSSProperties = {
  background: '#005a9c',
  color: '#fff',
  fontFamily: 'monospace',
  fontSize: '12px',
  fontWeight: 800,
  padding: '3px 8px',
  borderRadius: '4px',
  boxShadow: '0 2px 6px rgba(0,90,156,0.4)',
};

const dataCardStyle: React.CSSProperties = {
  background: '#121417',
  borderRadius: '8px',
  padding: '10px',
  border: '1px solid #252b36',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const dataRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '11px',
  paddingBottom: '4px',
  borderBottom: '1px solid #1c212b',
};

const dataLabelStyle: React.CSSProperties = {
  color: '#90a4ae',
};

const dataValueStyle: React.CSSProperties = {
  color: '#cfd8dc',
  fontWeight: 600,
};

const paramListScrollStyle: React.CSSProperties = {
  maxHeight: '180px',
  overflowY: 'auto',
  background: '#121417',
  borderRadius: '6px',
  padding: '4px',
  border: '1px solid #202631',
};

const paramItemStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '11px',
  padding: '6px 8px',
  borderRadius: '4px',
  marginBottom: '2px',
  cursor: 'pointer',
  transition: 'background 0.15s ease',
};