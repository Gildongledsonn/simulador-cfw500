import { useEffect, useRef } from 'react';
import { useInverter } from '../context/InverterContext';

interface PhysicsLoopOptions {
  loadTorquePercent?: number;
  enableNoise?: boolean;
}

export const usePhysicsLoop = ({ loadTorquePercent = 20, enableNoise = true }: PhysicsLoopOptions = {}) => {
  const { state, dispatch } = useInverter();

  const freqRef = useRef(state.outputFrequency);
  const rpmRef = useRef(state.motorRPM);
  const currentRef = useRef(state.outputCurrent);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let animationId: number;

    const loop = (timestamp: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = timestamp;

      // Parâmetros de física
      const targetFreq = state.motorStatus === 'RUNNING' && !state.activeFault
        ? (state.parameters.P0121?.currentValue ?? 60.0)
        : 0.0;

      const fMin = state.parameters.P0133?.currentValue ?? 3.0;
      const fMax = state.parameters.P0134?.currentValue ?? 60.0;
      const effectiveTargetFreq = targetFreq > 0 ? Math.min(fMax, Math.max(fMin, targetFreq)) : 0.0;

      const accelTime = Math.max(0.1, state.parameters.P0100?.currentValue ?? 5.0);
      const decelTime = Math.max(0.1, state.parameters.P0101?.currentValue ?? 5.0);

      const accelRate = fMax / accelTime;
      const decelRate = fMax / decelTime;

      // Atualização de Frequência
      if (freqRef.current < effectiveTargetFreq) {
        freqRef.current = Math.min(effectiveTargetFreq, freqRef.current + accelRate * dt);
      } else if (freqRef.current > effectiveTargetFreq) {
        freqRef.current = Math.max(effectiveTargetFreq, freqRef.current - decelRate * dt);
      }

      // Cálculo de RPM com escorregamento proporcional à carga
      const syncRPM = (freqRef.current * 120) / 4; // Motor 4 polos
      const nominalSlipRPM = 50; // 1800 - 1750 = 50 RPM
      const slipRPM = syncRPM > 0 ? (nominalSlipRPM * (loadTorquePercent / 100)) : 0;
      rpmRef.current = Math.max(0, Math.round(syncRPM - slipRPM));

      // Cálculo de Corrente
      const iNominal = state.parameters.P0403?.currentValue ?? 4.5;
      const iNoLoad = iNominal * 0.35;
      const iLoad = iNoLoad + (iNominal - iNoLoad) * (loadTorquePercent / 100);
      const isAccelerating = freqRef.current < effectiveTargetFreq;
      const iAccelBoost = isAccelerating ? iNominal * 0.4 : 0;
      const noise = enableNoise && freqRef.current > 0 ? (Math.random() - 0.5) * 0.15 : 0;

      currentRef.current = freqRef.current > 0
        ? Math.max(0, (iLoad * (freqRef.current / fMax) + iAccelBoost + noise))
        : 0;

      // Proteção de Sobrecarga F006
      const iMax = state.parameters.P0135?.currentValue ?? 10.0;
      if (currentRef.current > iMax && !state.activeFault) {
        dispatch({
          type: 'TRIGGER_FAULT',
          payload: {
            code: 'F006',
            name: 'Sobrecorrente de Saída',
            description: 'Corrente ultrapassou o limite do parâmetro P0135.',
            autoResetable: false,
          },
        });
      }

      dispatch({
        type: 'UPDATE_DYNAMIC_TELEMETRY',
        payload: {
          freq: +freqRef.current.toFixed(1),
          current: +currentRef.current.toFixed(1),
          rpm: rpmRef.current,
        },
      });

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [state.motorStatus, state.activeFault, state.parameters, loadTorquePercent, enableNoise, dispatch]);
};