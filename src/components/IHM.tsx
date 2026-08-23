import React from 'react';
import { useInverter } from '../context/InverterContext';
import { ParameterKey } from '../types/cfw500';

export const IHM: React.FC = () => {
  const { state, dispatch, currentDisplayValue, selectedParameter } = useInverter();
  const paramKeys = Object.keys(state.parameters) as ParameterKey[];

  return (
    <div style={containerWrapperStyle}>
      {/* CHASSI WEG */}
      <div style={housingStyle}>
        <div style={brandHeaderStyle}>
          <span style={{ fontWeight: 900, fontSize: '20px', color: '#fff' }}>weg</span>
          <span style={modelBadgeStyle}>CFW500</span>
        </div>

        <div style={ihmPanelStyle}>
          {/* DISPLAY LCD */}
          <div style={lcdBezelStyle}>
            <div style={lcdScreenStyle}>
              <div style={lcdHeaderStyle}>
                <span>{state.ihmMode}</span>
                <span>{state.controlSource}</span>
              </div>
              <div style={lcdMainStyle}>{currentDisplayValue}</div>
              <div style={lcdFooterStyle}>
                <span>{state.ihmMode === 'PARAM_EDIT' ? selectedParameter?.unit : 'Hz'}</span>
                <span>{state.motorStatus}</span>
              </div>
            </div>
          </div>

          {/* LEDS INDICADORES */}
          <div style={{ display: 'flex', justifyContent: 'space-around', margin: '12px 0 8px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: state.motorStatus === 'RUNNING' ? '#00e676' : '#222',
                  boxShadow: state.motorStatus === 'RUNNING' ? '0 0 10px #00e676' : 'none',
                }}
              />
              <span style={{ fontSize: '10px', color: '#90a4ae', fontWeight: 'bold' }}>RUN</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: state.isForwardDirection ? '#ffea00' : '#222',
                  boxShadow: state.isForwardDirection ? '0 0 10px #ffea00' : 'none',
                }}
              />
              <span style={{ fontSize: '10px', color: '#90a4ae', fontWeight: 'bold' }}>SENTIDO</span>
            </div>
          </div>

          {/* TECLADO IHM - COM ÁREA DE TOQUE OTIMIZADA PARA DEDOS */}
          <div style={keypadGridStyle}>
            <button style={{ ...btnStyle, background: '#0277bd' }} onClick={() => dispatch({ type: 'PRESS_PROG' })}>
              PROG
            </button>
            <button style={btnStyle} onClick={() => dispatch({ type: 'PRESS_UP' })}>
              ▲
            </button>
            <button style={{ ...btnStyle, fontSize: '11px' }} onClick={() => dispatch({ type: 'PRESS_LOCREM' })}>
              LOC/REM
            </button>
            <button style={btnStyle} onClick={() => dispatch({ type: 'PRESS_DOWN' })}>
              ▼
            </button>
            <button style={btnStyle} onClick={() => dispatch({ type: 'PRESS_DIRECTION' })}>
              ↻/↺
            </button>
            <div />
            <button style={{ ...btnStyle, background: '#2e7d32', fontSize: '16px' }} onClick={() => dispatch({ type: 'PRESS_RUN' })}>
              I
            </button>
            <div />
            <button style={{ ...btnStyle, background: '#c62828', fontSize: '16px' }} onClick={() => dispatch({ type: 'PRESS_STOP' })}>
              O
            </button>
          </div>
        </div>
      </div>

      {/* PAINEL INFORMATIVO DO PARÂMETRO */}
      <div style={infoPanelStyle}>
        <h3 style={{ fontSize: '14px', color: '#64b5f6', borderBottom: '1px solid #333', paddingBottom: '6px', marginBottom: '8px' }}>
          Parâmetro Selecionado
        </h3>
        <div style={infoRowStyle}>
          <span>Código:</span>
          <strong>{selectedParameter?.code}</strong>
        </div>
        <div style={infoRowStyle}>
          <span>Descrição:</span>
          <strong style={{ textAlign: 'right', maxWidth: '60%' }}>{selectedParameter?.description}</strong>
        </div>
        <div style={infoRowStyle}>
          <span>Faixa:</span>
          <strong>
            {selectedParameter?.min} a {selectedParameter?.max} {selectedParameter?.unit}
          </strong>
        </div>
        <div style={infoRowStyle}>
          <span>Padrão de Fábrica:</span>
          <strong>
            {selectedParameter?.defaultValue} {selectedParameter?.unit}
          </strong>
        </div>
        <div style={infoRowStyle}>
          <span>Valor em Memória:</span>
          <strong style={{ color: '#00e676' }}>
            {selectedParameter?.currentValue} {selectedParameter?.unit}
          </strong>
        </div>

        <h4 style={{ fontSize: '12px', color: '#90a4ae', marginTop: '12px', marginBottom: '6px' }}>Lista Rápida de Parâmetros:</h4>
        <div style={paramListStyle}>
          {paramKeys.map((k) => (
            <div
              key={k}
              onClick={() => dispatch({ type: 'SELECT_PARAM_DIRECT', payload: k })}
              style={{
                ...paramItemStyle,
                background: selectedParameter?.code === k ? '#2b313a' : 'transparent',
                color: selectedParameter?.code === k ? '#64b5f6' : '#bbb',
              }}
            >
              <span>
                <strong>{k}</strong> - {state.parameters[k].description}
              </span>
              <span>
                {state.parameters[k].currentValue} {state.parameters[k].unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ESTILOS RESPONSIVOS
const containerWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  width: '100%',
  flex: '1 1 500px',
};

const housingStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '320px',
  margin: '0 auto',
  background: 'linear-gradient(180deg, #2d3136 0%, #1b1d20 100%)',
  borderRadius: '12px',
  padding: '14px',
  border: '1px solid #3e444c',
  boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
  flexShrink: 0,
};

const brandHeaderStyle: React.CSSProperties = {
  background: '#005a9c',
  margin: '-14px -14px 14px -14px',
  padding: '10px 14px',
  borderTopLeftRadius: '11px',
  borderTopRightRadius: '11px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const modelBadgeStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  color: '#d1e5f7',
  background: '#003866',
  padding: '2px 6px',
  borderRadius: '4px',
};

const ihmPanelStyle: React.CSSProperties = {
  background: '#1e2124',
  borderRadius: '8px',
  padding: '12px',
  border: '2px solid #141618',
};

const lcdBezelStyle: React.CSSProperties = {
  background: '#111',
  padding: '8px',
  borderRadius: '6px',
};

const lcdScreenStyle: React.CSSProperties = {
  background: '#9ec49b',
  borderRadius: '4px',
  padding: '6px 8px',
  color: '#172415',
  fontFamily: 'monospace',
};

const lcdHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '10px',
  fontWeight: 'bold',
  borderBottom: '1px dashed rgba(23, 36, 21, 0.4)',
};

const lcdMainStyle: React.CSSProperties = {
  fontSize: '36px',
  fontWeight: 900,
  textAlign: 'right',
  letterSpacing: '2px',
  lineHeight: '42px',
};

const lcdFooterStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '10px',
  fontWeight: 'bold',
};

const keypadGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '8px',
};

const btnStyle: React.CSSProperties = {
  background: '#3e444c',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  height: '46px',
  fontWeight: 'bold',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const infoPanelStyle: React.CSSProperties = {
  flex: '1 1 260px',
  minWidth: '260px',
  background: '#1a1d21',
  borderRadius: '12px',
  padding: '14px',
  border: '1px solid #323842',
  display: 'flex',
  flexDirection: 'column',
};

const infoRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '12px',
  marginBottom: '6px',
  color: '#cfd8dc',
};

const paramListStyle: React.CSSProperties = {
  maxHeight: '190px',
  overflowY: 'auto',
  background: '#121417',
  borderRadius: '6px',
  padding: '4px',
};

const paramItemStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '11px',
  padding: '6px 8px',
  borderBottom: '1px solid #222',
  cursor: 'pointer',
};