import { useEffect, useRef } from 'react';
import { useInverter } from '../context/InverterContext';

interface UsePhysicsLoopProps {
  loadTorquePercent?: number;
  enableNoise?: boolean;
}

export const usePhysicsLoop = ({
  loadTorquePercent = 0,
  enableNoise = true,
}: UsePhysicsLoopProps = {}) => {
  const { state, dispatch } = useInverter();

  const stateRef = useRef(state);
  stateRef.current = state;

  const currentFreqRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    let animId: number;

    const loop = (time: number) => {
      animId = requestAnimationFrame(loop);

      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      const s = stateRef.current;
      const isLoc = String(s.controlSource || '').toUpperCase() === 'LOC';

      // 1. Determina a magnitude da frequência desejada
      let targetMagnitude = 0;
      if (isLoc) {
        targetMagnitude = Number(s.parameters?.P0121?.currentValue ?? 60.0);
      } else {
        const ai1 = typeof s.ai1Voltage === 'number' ? s.ai1Voltage : 0;
        if (ai1 > 0.05) {
          targetMagnitude = (ai1 / 10) * 60.0;
        } else {
          targetMagnitude = Number(s.parameters?.P0121?.currentValue ?? 60.0);
        }
      }

      // Checagem de direção baseada nas chaves ou estado
      const di2 = Boolean((s.digitalInputs as any)?.di2 || (s.digitalInputs as any)?.DI2);
      const isReverse = !s.isForwardDirection || di2;
      const dirSign = isReverse ? -1 : 1;

      const isRunning = s.motorStatus === 'RUNNING' && !s.activeFault;
      const signedTarget = isRunning ? targetMagnitude * dirSign : 0;

      // 2. Parâmetros de rampa
      const accelTime = Math.max(Number(s.parameters?.P0100?.currentValue ?? 5.0), 0.2);
      const decelTime = Math.max(Number(s.parameters?.P0101?.currentValue ?? 5.0), 0.2);
      const fMax = 60.0;

      const accelRate = fMax / accelTime;
      const decelRate = fMax / decelTime;

      let currentSigned = currentFreqRef.current;

      // 3. Integração Contínua: se estiver desacelerando, move-se em direção a 0 mantendo o sentido
      if (currentSigned < signedTarget) {
        const rate = currentSigned < 0 ? decelRate : accelRate;
        currentSigned = Math.min(signedTarget, currentSigned + rate * dt);
      } else if (currentSigned > signedTarget) {
        const rate = currentSigned > 0 ? decelRate : accelRate;
        currentSigned = Math.max(signedTarget, currentSigned - rate * dt);
      }

      // Trava de zona morta para evitar inversão espúria no fim da desaceleração
      if (Math.abs(currentSigned) < 0.02 && !isRunning) {
        currentSigned = 0;
      }

      currentFreqRef.current = currentSigned;

      const absFreq = Math.abs(currentSigned);
      const isMoving = absFreq > 0.05;

      // 4. Cálculos Elétricos e Mecânicos
      const nominalRpm = Number(s.parameters?.P0402?.currentValue ?? 1750);
      const calculatedRPM = Math.round((absFreq / 60) * nominalRpm);

      let calculatedCurrent = 0;
      if (isMoving) {
        const baseCurrent = 1.2 + (absFreq / 60) * 2.8;
        const loadAddition = (loadTorquePercent / 100) * 2.5;
        const noise = enableNoise ? (Math.random() - 0.5) * 0.1 : 0;
        calculatedCurrent = Number(Math.max(0, baseCurrent + loadAddition + noise).toFixed(1));
      }

      let calculatedDcBus = 310;
      if (isMoving) {
        const loadDrop = (loadTorquePercent / 100) * 12;
        calculatedDcBus = Math.round(310 - loadDrop + (enableNoise ? (Math.random() - 0.5) * 2 : 0));
      }

      if (dispatch) {
        dispatch({
          type: 'UPDATE_PHYSICS',
          payload: {
            frequency: Number(absFreq.toFixed(1)),
            current: calculatedCurrent,
            motorRPM: calculatedRPM,
            dcBus: calculatedDcBus,
          },
        });
      }
    };

    lastTimeRef.current = performance.now();
    animId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animId);
  }, [dispatch, loadTorquePercent, enableNoise]);
};