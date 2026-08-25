import { InverterState, ParameterKey, ParameterMap, FaultData, DigitalInputsState } from '../types/cfw500';

export type InverterAction =
  | { type: 'PRESS_PROG' }
  | { type: 'PRESS_UP' }
  | { type: 'PRESS_DOWN' }
  | { type: 'PRESS_RUN' }
  | { type: 'PRESS_STOP' }
  | { type: 'PRESS_LOCREM' }
  | { type: 'PRESS_DIRECTION' }
  | { type: 'SELECT_PARAM_DIRECT'; payload: ParameterKey }
  | { type: 'SET_DIGITAL_INPUT'; payload: { input: keyof DigitalInputsState; value: boolean } }
  | { type: 'SET_ANALOG_INPUT_1'; payload: number }
  | { type: 'TRIGGER_FAULT'; payload: FaultData }
  | { type: 'RESET_FAULT' }
  | { type: 'RESET_FACTORY_DEFAULTS' }
  | { type: 'UPDATE_DYNAMIC_TELEMETRY'; payload: { freq: number; current: number; rpm: number } };

export const executeFactoryReset = (params: ParameterMap): ParameterMap => {
  const resetParams = { ...params };
  (Object.keys(resetParams) as ParameterKey[]).forEach((key) => {
    if (resetParams[key]) {
      resetParams[key] = {
        ...resetParams[key],
        currentValue: resetParams[key].defaultValue ?? 0,
      };
    }
  });

  if (resetParams.P0000) resetParams.P0000.currentValue = 5;
  if (resetParams.P0204) resetParams.P0204.currentValue = 0;

  return resetParams;
};

export const inverterReducer = (state: InverterState, action: InverterAction): InverterState => {
  const paramKeys = Object.keys(state.parameters) as ParameterKey[];
  const currentKey = paramKeys[state.selectedParamIndex] || 'P0000';
  const currentParam = state.parameters[currentKey];

  switch (action.type) {
    case 'PRESS_PROG': {
      if (state.activeFault) return state;

      // 1. Modo de monitoramento (MONIT) -> vai para seleção de parâmetros
      if (state.ihmMode === 'MONIT') {
        return { ...state, ihmMode: 'PARAM_SELECT' };
      }

      // 2. Modo Seleção de Parâmetros -> abre edição de valor
      if (state.ihmMode === 'PARAM_SELECT') {
        if (!currentParam || currentParam.readOnly) return state;
        return {
          ...state,
          ihmMode: 'PARAM_EDIT',
          editBuffer: currentParam.currentValue,
        };
      }

      // 3. Modo Edição -> grava na memória
      if (state.ihmMode === 'PARAM_EDIT') {
        // Reset de Fábrica: P0204 = 5
        if (currentKey === 'P0204' && Math.round(state.editBuffer) === 5) {
          const resetParams = executeFactoryReset(state.parameters);
          return {
            ...state,
            ihmMode: 'PARAM_SELECT',
            parameters: resetParams,
            motorStatus: 'READY',
            activeFault: null,
            outputFrequency: 0,
            outputCurrent: 0,
            motorRPM: 0,
            controlSource: 'LOC',
            isForwardDirection: true,
            lastFactoryResetTimestamp: Date.now(),
          };
        }

        const savedValue = +(state.editBuffer).toFixed(1);
        const updatedParams = {
          ...state.parameters,
          [currentKey]: {
            ...currentParam,
            currentValue: savedValue,
          },
        };

        return {
          ...state,
          ihmMode: 'PARAM_SELECT',
          parameters: updatedParams,
        };
      }
      return state;
    }

    case 'PRESS_UP': {
      // 1. MODO MONITOR: incrementa a velocidade P0121 em modo Local
      if (state.ihmMode === 'MONIT') {
        if (state.controlSource === 'LOC' && !state.activeFault) {
          const currentHz = state.parameters.P0121?.currentValue ?? state.outputFrequency ?? 0;
          const maxHz = state.parameters.P0134?.currentValue ?? 60.0;
          const nextHz = Math.min(maxHz, Number((currentHz + 5.0).toFixed(1)));

          return {
            ...state,
            parameters: {
              ...state.parameters,
              P0121: {
                ...state.parameters.P0121,
                currentValue: nextHz,
              },
            },
          };
        }
        return state;
      }

      // 2. MODO SELEÇÃO: navega para o próximo Pxxxx
      if (state.ihmMode === 'PARAM_SELECT') {
        const nextIndex = (state.selectedParamIndex + 1) % paramKeys.length;
        return { ...state, selectedParamIndex: nextIndex };
      }

      // 3. MODO EDIÇÃO: incrementa o valor
      if (state.ihmMode === 'PARAM_EDIT') {
        const step = currentParam?.step ?? 1;
        const max = currentParam?.max ?? 9999;
        const nextVal = Math.min(max, Number((state.editBuffer + step).toFixed(step < 1 ? 1 : 0)));
        return {
          ...state,
          editBuffer: nextVal,
        };
      }

      return state;
    }

    case 'PRESS_DOWN': {
      // 1. MODO MONITOR: decrementa a velocidade P0121 em modo Local
      if (state.ihmMode === 'MONIT') {
        if (state.controlSource === 'LOC' && !state.activeFault) {
          const currentHz = state.parameters.P0121?.currentValue ?? state.outputFrequency ?? 0;
          const minHz = 0.0;
          const nextHz = Math.max(minHz, Number((currentHz - 5.0).toFixed(1)));

          return {
            ...state,
            parameters: {
              ...state.parameters,
              P0121: {
                ...state.parameters.P0121,
                currentValue: nextHz,
              },
            },
          };
        }
        return state;
      }

      // 2. MODO SELEÇÃO: navega para o Pxxxx anterior
      if (state.ihmMode === 'PARAM_SELECT') {
        const prevIndex = (state.selectedParamIndex - 1 + paramKeys.length) % paramKeys.length;
        return { ...state, selectedParamIndex: prevIndex };
      }

      // 3. MODO EDIÇÃO: decrementa o valor
      if (state.ihmMode === 'PARAM_EDIT') {
        const step = currentParam?.step ?? 1;
        const min = currentParam?.min ?? 0;
        const nextVal = Math.max(min, Number((state.editBuffer - step).toFixed(step < 1 ? 1 : 0)));
        return {
          ...state,
          editBuffer: nextVal,
        };
      }

      return state;
    }

    case 'SELECT_PARAM_DIRECT': {
      const idx = paramKeys.indexOf(action.payload);
      if (idx === -1) return state;
      return { ...state, selectedParamIndex: idx, ihmMode: 'PARAM_SELECT' };
    }

    case 'PRESS_RUN': {
      if (state.activeFault) return state;

      if (state.controlSource === 'LOC') {
        const currentRef = state.parameters.P0121?.currentValue ?? 0;
        const startRef = currentRef > 0 ? currentRef : 30.0;

        return {
          ...state,
          motorStatus: 'RUNNING',
          parameters: {
            ...state.parameters,
            P0121: {
              ...state.parameters.P0121,
              currentValue: startRef,
            },
          },
        };
      }

      return state;
    }

    case 'PRESS_STOP': {
      if (state.activeFault) {
        return { ...state, activeFault: null, motorStatus: 'READY' };
      }
      if (state.ihmMode === 'PARAM_EDIT') {
        return { ...state, ihmMode: 'PARAM_SELECT' };
      }
      if (state.ihmMode === 'PARAM_SELECT') {
        return { ...state, ihmMode: 'MONIT' };
      }
      return { ...state, motorStatus: 'READY' };
    }

    case 'PRESS_LOCREM': {
      return {
        ...state,
        controlSource: state.controlSource === 'LOC' ? 'REM' : 'LOC',
        motorStatus: 'READY',
      };
    }

    case 'PRESS_DIRECTION': {
      return { ...state, isForwardDirection: !state.isForwardDirection };
    }

    case 'SET_DIGITAL_INPUT': {
      const nextInputs = {
        ...state.digitalInputs,
        [action.payload.input]: action.payload.value,
      };

      let nextStatus = state.motorStatus;
      let nextForward = state.isForwardDirection;
      let targetSpeed = state.parameters.P0121?.currentValue ?? 60.0;

      if (state.controlSource === 'REM' && !state.activeFault) {
        const isDi1 = Boolean(nextInputs.di1 ?? (nextInputs as any).DI1);
        const isDi2 = Boolean(nextInputs.di2 ?? (nextInputs as any).DI2);
        const isDi3 = Boolean(nextInputs.di3 ?? (nextInputs as any).DI3);
        const isDi4 = Boolean(nextInputs.di4 ?? (nextInputs as any).DI4);

        // 1. DI1 = Gira/Para (Partida do motor)
        nextStatus = isDi1 ? 'RUNNING' : 'READY';

        // 2. DI2 = Sentido de Giro (P0264 = 1): Aberto = Horário (FWD), Fechado = Anti-horário (REV)
        nextForward = !isDi2;

        // 3. MULTISPEED (DI3 e DI4): Seleção de frequências pré-programadas
        // DI3=OFF, DI4=OFF -> P0124 (Multispeed 1)
        // DI3=ON,  DI4=OFF -> P0125 (Multispeed 2)
        // DI3=OFF, DI4=ON  -> P0126 (Multispeed 3)
        // DI3=ON,  DI4=ON  -> P0127 (Multispeed 4)
        if (isDi3 && !isDi4) {
          targetSpeed = state.parameters.P0125?.currentValue ?? 35.0;
        } else if (!isDi3 && isDi4) {
          targetSpeed = state.parameters.P0126?.currentValue ?? 50.0;
        } else if (isDi3 && isDi4) {
          targetSpeed = state.parameters.P0127?.currentValue ?? 60.0;
        } else if (state.parameters.P0222?.currentValue === 6 || isDi1) {
          targetSpeed = state.parameters.P0124?.currentValue ?? 15.0;
        }
      }

      return {
        ...state,
        digitalInputs: nextInputs,
        motorStatus: nextStatus,
        isForwardDirection: nextForward,
        parameters: {
          ...state.parameters,
          P0121: {
            ...state.parameters.P0121,
            currentValue: targetSpeed,
          },
        },
      };
    }

    case 'SET_ANALOG_INPUT_1': {
      const voltage = Math.min(10, Math.max(0, action.payload));
      const fMin = state.parameters.P0133?.currentValue ?? 3.0;
      const fMax = state.parameters.P0134?.currentValue ?? 60.0;
      const targetFreqFromAI = fMin + (voltage / 10) * (fMax - fMin);

      return {
        ...state,
        ai1Voltage: voltage,
        parameters:
          state.controlSource === 'REM' && state.parameters.P0222?.currentValue === 1
            ? {
                ...state.parameters,
                P0121: { ...state.parameters.P0121, currentValue: +targetFreqFromAI.toFixed(1) },
              }
            : state.parameters,
      };
    }

    case 'TRIGGER_FAULT': {
      return {
        ...state,
        activeFault: action.payload,
        motorStatus: 'FAULT',
        outputFrequency: 0,
        outputCurrent: 0,
        motorRPM: 0,
      };
    }

    case 'RESET_FAULT': {
      return { ...state, activeFault: null, motorStatus: 'READY' };
    }

    case 'RESET_FACTORY_DEFAULTS': {
      const resetParams = executeFactoryReset(state.parameters);
      return {
        ...state,
        ihmMode: 'PARAM_SELECT',
        parameters: resetParams,
        motorStatus: 'READY',
        activeFault: null,
        outputFrequency: 0,
        outputCurrent: 0,
        motorRPM: 0,
        controlSource: 'LOC',
        isForwardDirection: true,
        lastFactoryResetTimestamp: Date.now(),
      };
    }

    case 'UPDATE_DYNAMIC_TELEMETRY': {
      return {
        ...state,
        outputFrequency: action.payload.freq,
        outputCurrent: action.payload.current,
        motorRPM: action.payload.rpm,
        parameters: {
          ...state.parameters,
          P0001: { ...state.parameters.P0001, currentValue: action.payload.rpm },
          P0002: { ...state.parameters.P0002, currentValue: action.payload.freq },
          P0003: { ...state.parameters.P0003, currentValue: action.payload.current },
        },
      };
    }

    default:
      return state;
  }
};