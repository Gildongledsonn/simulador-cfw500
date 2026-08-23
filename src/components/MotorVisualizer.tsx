import React, { useEffect, useRef } from 'react';
import { useInverter } from '../context/InverterContext';

export const MotorVisualizer: React.FC<{ loadTorquePercent?: number }> = ({ loadTorquePercent = 0 }) => {
  const { state } = useInverter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const angleRef = useRef(0);
  const lastTimestampRef = useRef<number | null>(null);

  useEffect(() => {
    let animationId: number;
    const render = (timestamp: number) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
      const dt = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dir = state.isForwardDirection ? 1 : -1;
      const angularSpeed = (state.motorRPM * 2 * Math.PI) / 60;
      angleRef.current += angularSpeed * dt * dir;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = (canvas.width / 2) * 0.85;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(cx, cy);

      // Aletas e Carcaça
      for (let i = 0; i < 24; i++) {
        const theta = (i * 2 * Math.PI) / 24;
        ctx.beginPath();
        ctx.arc(0, 0, radius * 1.12, theta - 0.04, theta + 0.04);
        ctx.lineTo(radius * 0.95 * Math.cos(theta + 0.08), radius * 0.95 * Math.sin(theta + 0.08));
        ctx.lineTo(radius * 0.95 * Math.cos(theta - 0.08), radius * 0.95 * Math.sin(theta - 0.08));
        ctx.closePath();
        ctx.fillStyle = '#37474f';
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#455a64';
      ctx.fill();

      // Bobinagem Estator
      for (let i = 0; i < 12; i++) {
        const theta = (i * 2 * Math.PI) / 12;
        ctx.beginPath();
        ctx.arc(Math.cos(theta) * (radius * 0.82), Math.sin(theta) * (radius * 0.82), radius * 0.12, 0, 2 * Math.PI);
        ctx.fillStyle = state.outputFrequency > 0 ? '#ff8f00' : '#8d6e63';
        ctx.fill();
      }

      // Rotor Giratório
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.68, 0, 2 * Math.PI);
      ctx.fillStyle = '#1e2124';
      ctx.fill();

      ctx.rotate(angleRef.current);

      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.62, 0, 2 * Math.PI);
      ctx.fillStyle = '#78909c';
      ctx.fill();

      for (let i = 0; i < 16; i++) {
        const theta = (i * 2 * Math.PI) / 16;
        ctx.beginPath();
        ctx.arc(Math.cos(theta) * (radius * 0.48), Math.sin(theta) * (radius * 0.48), 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#d7ccc8';
        ctx.fill();
      }

      // Eixo e Chaveta
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.22, 0, 2 * Math.PI);
      ctx.fillStyle = '#cfd8dc';
      ctx.fill();

      ctx.fillStyle = '#37474f';
      ctx.fillRect((radius * 0.22) * 0.2, -(radius * 0.22) * 0.35, (radius * 0.22) * 0.6, (radius * 0.22) * 0.7);

      ctx.restore();
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, [state.motorRPM, state.isForwardDirection, state.outputFrequency]);

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#b0bec5', borderBottom: '1px solid #2a2f38', paddingBottom: '6px' }}>
        <strong>MOTOR DE INDUÇÃO</strong>
        <span style={{ fontSize: '10px', color: state.motorStatus === 'RUNNING' ? '#81c784' : '#888' }}>
          {state.motorStatus}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
        <canvas ref={canvasRef} width={240} height={240} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
        <div style={metricBoxStyle}><small>ROTAÇÃO</small><strong>{state.motorRPM} RPM</strong></div>
        <div style={metricBoxStyle}><small>FREQUÊNCIA</small><strong>{state.outputFrequency.toFixed(1)} Hz</strong></div>
        <div style={metricBoxStyle}><small>CORRENTE</small><strong>{state.outputCurrent.toFixed(1)} A</strong></div>
        <div style={metricBoxStyle}><small>CARGA EIXO</small><strong>{loadTorquePercent}%</strong></div>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  background: '#1a1d21',
  border: '1px solid #323842',
  borderRadius: '12px',
  padding: '14px',
  width: '280px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const metricBoxStyle: React.CSSProperties = {
  background: '#121417',
  padding: '6px 8px',
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '12px',
};