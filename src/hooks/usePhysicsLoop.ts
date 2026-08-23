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

  // Temporizador de inatividade para a função Sleep (P0217 / P0218)
  const idleTimerRef = useRef<number>(0);

  useEffect(() => {
    let animationId: number;

    const loop = (timestamp: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = timestamp;

      // ============================================================
      // 1. LÓGICA SLEEP MODE (P0217 = 1 e P0218 = Tempo em Segundos)
      // ============================================================
      const isSleepEnabled = state.parameters.P0217?.currentValue === 1;
      const sleepTimeout = state.parameters.P0218?.currentValue ?? 120;

      // Se a esteira estiver rodando (DI1=ON) sem produto no sensor (DI2=OFF)
      if (state.motorStatus === 'RUNNING' && isSleepEnabled && !state.digitalInputs.di2) {
        idleTimerRef.current += dt;
        if (idleTimerRef.current >= sleepTimeout) {
          // Atingiu o tempo limite: Desliga o comando DI1 e entra em Sleep/Ready
          idleTimerRef.current = 0;
          dispatch({
            type: 'SET_DIGITAL_INPUT',
            payload: { input: 'di1', value: false },
          });
        }
      } else {
        // Se houver passagem no sensor DI2 ou a esteira parar, reinicia a contagem
        idleTimerRef.current = 0;
      }

      // ============================================================
      // 2. CÁLCULO DE FREQUÊNCIA ALVO E RAMPAS (P0100 / P0101)
      // ============================================================
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

      if (freqRef.current < effectiveTargetFreq) {
        freqRef.current = Math.min(effectiveTargetFreq, freqRef.current + accelRate * dt);
      } else if (freqRef.current > effectiveTargetFreq) {
        freqRef.current = Math.max(effectiveTargetFreq, freqRef.current - decelRate * dt);
      }

      // ============================================================
      // 3. CÁLCULO DE RPM E CORRENTE COM ESCORREGAMENTO
      // ============================================================
      const syncRPM = (freqRef.current * 120) / 4;
      const nominalSlipRPM = 50;
      const slipRPM = syncRPM > 0 ? (nominalSlipRPM * (loadTorquePercent / 100)) : 0;
      rpmRef.current = Math.max(0, Math.round(syncRPM - slipRPM));

      const iNominal = state.parameters.P0403?.currentValue ?? 4.5;
      const iNoLoad = iNominal * 0.35;
      const iLoad = iNoLoad + (iNominal - iNoLoad) * (loadTorquePercent / 100);
      const isAccelerating = freqRef.current < effectiveTargetFreq;
      const iAccelBoost = isAccelerating ? iNominal * 0.4 : 0;
      const noise = enableNoise && freqRef.current > 0 ? (Math.random() - 0.5) * 0.15 : 0;

      currentRef.current = freqRef.current > 0
        ? Math.max(0, (iLoad * (freqRef.current / fMax) + iAccelBoost + noise))
        : 0;

      // Proteção F006
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
  }, [state.motorStatus, state.activeFault, state.parameters, state.digitalInputs, loadTorquePercent, enableNoise, dispatch]);
};