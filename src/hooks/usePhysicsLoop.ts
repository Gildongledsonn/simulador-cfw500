import { useEffect, useRef } from 'react';
import { useInverter } from '../context/InverterContext';

interface PhysicsOptions {
  loadTorquePercent?: number;
  enableNoise?: boolean;
}

export const usePhysicsLoop = ({ loadTorquePercent = 20, enableNoise = true }: PhysicsOptions = {}) => {
  const { state, dispatch } = useInverter();
  const stateRef = useRef(state);
  stateRef.current = state;

  const currentFreqRef = useRef<number>(state.outputFrequency);
  const lastTimeRef = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const loop = (timestamp: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
      const dt = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      const currentState = stateRef.current;
      const { parameters, motorStatus, activeFault } = currentState;

      if (activeFault) {
        currentFreqRef.current = 0;
        dispatch({ type: 'UPDATE_DYNAMIC_TELEMETRY', payload: { freq: 0, current: 0, rpm: 0 } });
        animationFrameId.current = requestAnimationFrame(loop);
        return;
      }

      const accelTime = Math.max(0.01, parameters.P0100.currentValue);
      const decelTime = Math.max(0.01, parameters.P0101.currentValue);
      const minFreq = parameters.P0133.currentValue;
      const maxFreq = parameters.P0134.currentValue;
      const motorNominalRPM = parameters.P0402.currentValue;
      const motorNominalFreq = parameters.P0401.currentValue;
      const motorNominalCurr = parameters.P0403.currentValue;

      let targetFreq = 0;
      if (motorStatus === 'RUNNING') {
        const setpoint = parameters.P0121.currentValue;
        targetFreq = Math.min(Math.max(setpoint, minFreq), maxFreq);
      }

      let currentFreq = currentFreqRef.current;

      if (currentFreq < targetFreq) {
        currentFreq += (maxFreq / accelTime) * dt;
        if (currentFreq > targetFreq) currentFreq = targetFreq;
      } else if (currentFreq > targetFreq) {
        currentFreq -= (maxFreq / decelTime) * dt;
        if (currentFreq < targetFreq) currentFreq = targetFreq;
      }

      if (motorStatus === 'READY' && currentFreq < 0.05) currentFreq = 0;
      currentFreqRef.current = currentFreq;

      const freqRatio = motorNominalFreq > 0 ? currentFreq / motorNominalFreq : 0;
      const syncRPM = freqRatio * motorNominalRPM;
      const slip = (loadTorquePercent / 100) * 0.05;
      const actualRPM = currentFreq > 0.1 ? Math.max(0, Math.round(syncRPM * (1 - slip))) : 0;

      let calculatedCurrent = 0;
      if (currentFreq > 0.1) {
        const iMag = motorNominalCurr * 0.4;
        const iAct = motorNominalCurr * 0.6 * (loadTorquePercent / 100);
        const noise = enableNoise ? (Math.random() - 0.5) * 0.08 : 0;
        calculatedCurrent = +(Math.sqrt(iMag ** 2 + iAct ** 2) * (currentFreq / maxFreq) + noise).toFixed(1);
      }

      const inverterNominalCurr = parameters.P0295.currentValue;
      if (calculatedCurrent > inverterNominalCurr * 1.5) {
        dispatch({
          type: 'TRIGGER_FAULT',
          payload: { code: 'F006', description: 'Sobrecorrente na Saída', active: true },
        });
        return;
      }

      dispatch({
        type: 'UPDATE_DYNAMIC_TELEMETRY',
        payload: {
          freq: +currentFreq.toFixed(2),
          current: Math.max(0, calculatedCurrent),
          rpm: actualRPM,
        },
      });

      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);
    return () => {
      if (animationFrameId.current !== null) cancelAnimationFrame(animationFrameId.current);
    };
  }, [dispatch, loadTorquePercent, enableNoise]);
};