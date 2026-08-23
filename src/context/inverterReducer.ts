import { InverterState, ParameterKey, FaultData, DigitalInputsState } from '../types/cfw500';

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
  | { type: 'UPDATE_DYNAMIC_TELEMETRY'; payload: { freq: number; current: number; rpm: number } };

export const inverterReducer = (state: InverterState, action: InverterAction): InverterState => {
  const paramKeys = Object.keys(state.parameters) as ParameterKey[];
  const currentKey = paramKeys[state.selectedParamIndex];
  const currentParam = state.parameters[currentKey];

  switch (action.type) {
    case 'PRESS_PROG': {
      if (state.activeFault) return state;
      if (state.ihmMode === 'MONIT') return { ...state, ihmMode: 'PARAM_SELECT' };
      if (state.ihmMode === 'PARAM_SELECT') {
        if (currentParam.readOnly) return state;
        const isUnlocked = state.parameters.P0000.currentValue === 5 || currentKey === 'P0000';
        if (!isUnlocked) return state;
        return { ...state, ihmMode: 'PARAM_EDIT', editBuffer: currentParam.currentValue };
      }
      if (state.ihmMode === 'PARAM_EDIT') {
        return {
          ...state,
          ihmMode: 'PARAM_SELECT',
          parameters: {
            ...state.parameters,
            [currentKey]: { ...currentParam, currentValue: state.editBuffer },
          },
        };
      }
      return state;
    }

    case 'PRESS_UP': {
      if (state.ihmMode === 'PARAM_SELECT') {
        return { ...state, selectedParamIndex: (state.selectedParamIndex + 1) % paramKeys.length };
      }
      if (state.ihmMode === 'PARAM_EDIT') {
        const nextVal = Math.min(currentParam.max, +(state.editBuffer + currentParam.step).toFixed(2));
        return { ...state, editBuffer: nextVal };
      }
      return state;
    }

    case 'PRESS_DOWN': {
      if (state.ihmMode === 'PARAM_SELECT') {
        return { ...state, selectedParamIndex: (state.selectedParamIndex - 1 + paramKeys.length) % paramKeys.length };
      }
      if (state.ihmMode === 'PARAM_EDIT') {
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
      if (state.activeFault) return { ...state, activeFault: null, motorStatus: 'READY' };
      if (state.ihmMode === 'PARAM_EDIT') return { ...state, ihmMode: 'PARAM_SELECT' };
      if (state.ihmMode === 'PARAM_SELECT') return { ...state, ihmMode: 'MONIT' };
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
      const nextInputs = { ...state.digitalInputs, [action.payload.input]: action.payload.value };
      let nextStatus = state.motorStatus;
      let nextForward = state.isForwardDirection;
      let targetSpeed = state.parameters.P0121.currentValue;

      if (state.controlSource === 'REM' && !state.activeFault) {
        nextStatus = nextInputs.di1 ? 'RUNNING' : 'READY';
        nextForward = !nextInputs.di2;

        if (state.parameters.P0222.currentValue === 6) {
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
          P0121: { ...state.parameters.P0121, currentValue: targetSpeed },
        },
      };
    }

    case 'SET_ANALOG_INPUT_1': {
      const voltage = Math.min(10, Math.max(0, action.payload));
      const fMin = state.parameters.P0133.currentValue;
      const fMax = state.parameters.P0134.currentValue;
      const targetFreqFromAI = fMin + (voltage / 10) * (fMax - fMin);

      return {
        ...state,
        ai1Voltage: voltage,
        parameters:
          state.controlSource === 'REM' && state.parameters.P0222.currentValue === 1
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