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

      // 1. Se estiver no modo de monitoramento (MONIT), vai para a seleção de parâmetros
      if (state.ihmMode === 'MONIT') {
        return { ...state, ihmMode: 'PARAM_SELECT' };
      }

      // 2. Se estiver selecionando o parâmetro, abre para edição do valor
      if (state.ihmMode === 'PARAM_SELECT') {
        if (!currentParam || currentParam.readOnly) return state;
        return {
          ...state,
          ihmMode: 'PARAM_EDIT',
          editBuffer: currentParam.currentValue,
        };
      }

      // 3. Se estiver editando, grava na memória
      if (state.ihmMode === 'PARAM_EDIT') {
        // Reset de Fábrica: P0204 configurado para 5
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
      if (state.ihmMode === 'PARAM_SELECT') {
        const nextIndex = (state.selectedParamIndex + 1) % paramKeys.length;
        return { ...state, selectedParamIndex: nextIndex };
      }
      if (state.ihmMode === 'PARAM_EDIT' && currentParam) {
        const nextVal = Math.min(currentParam.max, +(state.editBuffer + currentParam.step).toFixed(1));
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
        const prevVal = Math.max(currentParam.min, +(state.editBuffer - currentParam.step).toFixed(1));
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
        // DI1 = Comando de Partida Remoto (Gira/Para)
        nextStatus = nextInputs.di1 ? 'RUNNING' : 'READY';

        // LÓGICA DE MULTISPEED (P0222 = 6) - Automação da Esteira e Aplicações Industriais
        if (state.parameters.P0222?.currentValue === 6) {
          if (nextInputs.di2) {
            // Sensor de Entrada Ativo -> Comuta para Velocidade 2 (P0125 = 50.0 Hz)
            targetSpeed = state.parameters.P0125?.currentValue ?? 50.0;
          } else {
            // Esteira em Operação Padrão -> Velocidade 1 (P0124 = 15.0 Hz)
            targetSpeed = state.parameters.P0124?.currentValue ?? 15.0;
          }
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