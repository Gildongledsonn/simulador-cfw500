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
  const resetParams: ParameterMap = {};
  (Object.keys(params) as ParameterKey[]).forEach((key) => {
    if (params[key]) {
      resetParams[key] = {
        ...params[key],
        currentValue: params[key].defaultValue ?? 0,
      };
    }
  });

  // Garante P0000 desbloqueado (5) e P0204 em 0
  if (resetParams.P0000) resetParams.P0000.currentValue = 5;
  if (resetParams.P0204) resetParams.P0204.currentValue = 0;

  return resetParams;
};

export const inverterReducer = (state: InverterState, action: InverterAction): InverterState => {
  const paramKeys = Object.keys(state.parameters) as ParameterKey[];
  const currentKey = paramKeys[state.selectedParamIndex];
  const currentParam = state.parameters[currentKey];

  switch (action.type) {
    case 'PRESS_PROG': {
      if (state.activeFault) return state;

      // 1. Sai de MONIT para seleção de parâmetros
      if (state.ihmMode === 'MONIT') {
        return { ...state, ihmMode: 'PARAM_SELECT' };
      }

      // 2. Abre parâmetro para edição (com verificação da senha P0000 = 5)
      if (state.ihmMode === 'PARAM_SELECT') {
        if (!currentParam || currentParam.readOnly) return state;

        const isUnlocked = state.parameters.P0000?.currentValue === 5 || currentKey === 'P0000';
        if (!isUnlocked) return state;

        return {
          ...state,
          ihmMode: 'PARAM_EDIT',
          editBuffer: currentParam.currentValue,
        };
      }

      // 3. Salva parâmetro editado
      if (state.ihmMode === 'PARAM_EDIT') {
        // RESET DE FÁBRICA: P0204 ajustado para 5
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
          };
        }

        // Salvamento padrão de parâmetros
        return {
          ...state,
          ihmMode: 'PARAM_SELECT',
          parameters: {
            ...state.parameters,
            [currentKey]: {
              ...currentParam,
              currentValue: state.editBuffer,
            },
          },
        };
      }
      return state;
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
      };
    }

    case 'PRESS_UP': {
      if (state.ihmMode === 'PARAM_SELECT') {
        const nextIndex = (state.selectedParamIndex + 1) % paramKeys.length;
        return { ...state, selectedParamIndex: nextIndex };
      }
      if (state.ihmMode === 'PARAM_EDIT' && currentParam) {
        const nextVal = Math.min(currentParam.max, +(state.editBuffer + currentParam.step).toFixed(2));
        return { ...state, editBuffer: nextVal };
      }
      return state;
    }

    case 'PRESS_DOWN': {
      if (state.ihmMode === 'PARAM_SELECT') {
        const prevIndex = (state.selectedParamIndex - 1 + paramKeys.length) % paramKeys.length;
        return { ...state, selectedParamIndex: prevIndex };
      }
      if (state.ihmMode === 'PARAM_EDIT' && currentParam) {
        const prevVal = Math.max(currentParam.min, +(state.editBuffer - currentParam.step).toFixed(2));
        return { ...state, editBuffer: prevVal };
      }
      return state;
    }

    case 'SELECT_PARAM_DIRECT': {
      const idx = paramKeys.indexOf(action.payload);
      if (idx === -1) return state;
      return { ...state, selectedParamIndex: idx, ihmMode: 'PARAM_SELECT' };
    }

    case 'PRESS_RUN': {
      if (state.activeFault || state.controlSource !== 'LOC') return state;
      return { ...state, motorStatus: 'RUNNING' };
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
        nextStatus = nextInputs.di1 ? 'RUNNING' : 'READY';
        nextForward = !nextInputs.di2;

        if (state.parameters.P0222?.currentValue === 6) {
          const bit0 = nextInputs.di2 ? 1 : 0;
          const bit1 = nextInputs.di3 ? 1 : 0;
          const bit2 = nextInputs.di4 ? 1 : 0;
          const idx = (bit2 << 2) | (bit1 << 1) | bit0;
          const targetKey = `P012${4 + idx}` as ParameterKey;
          targetSpeed = state.parameters[targetKey]?.currentValue ?? 5.0;
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