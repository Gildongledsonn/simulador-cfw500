import { InverterState, ParameterKey, ParameterMap } from '../types/cfw500';

export type InverterAction =
  | { type: 'PRESS_PROG' }
  | { type: 'PRESS_UP' }
  | { type: 'PRESS_DOWN' }
  | { type: 'PRESS_RUN' }
  | { type: 'PRESS_STOP' }
  | { type: 'PRESS_LOCREM' }
  | { type: 'PRESS_DIRECTION' }
  | { type: 'SET_DIGITAL_INPUT'; payload: { input: 'di1' | 'di2' | 'di3' | 'di4'; value: boolean } }
  | { type: 'SET_ANALOG_INPUT_1'; payload: number }
  | { type: 'SELECT_PARAM_DIRECT'; payload: ParameterKey }
  | { type: 'UPDATE_DYNAMIC_TELEMETRY'; payload: { freq: number; current: number; rpm: number } }
  | { type: 'TRIGGER_FAULT'; payload: { code: string; description: string; active: boolean } }
  | { type: 'CLEAR_FAULT' }
  | { type: 'SET_PARAMETER_VALUE'; payload: { key: ParameterKey; value: number } };

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
  switch (action.type) {
    case 'PRESS_PROG': {
      const currentKeys = Object.keys(state.parameters) as ParameterKey[];
      const nextMode = state.ihmMode === 'MONIT' ? 'PARAM_SELECT' : state.ihmMode === 'PARAM_SELECT' ? 'PARAM_EDIT' : 'MONIT';
      const nextState = { ...state, ihmMode: nextMode as InverterState['ihmMode'] };
      if (nextMode === 'PARAM_EDIT') {
        nextState.editBuffer = state.parameters[currentKeys[state.selectedParamIndex]].currentValue;
      }
      return nextState;
    }

    case 'PRESS_UP': {
      if (state.ihmMode === 'PARAM_SELECT') {
        const nextIndex = Math.max(0, state.selectedParamIndex - 1);
        return { ...state, selectedParamIndex: nextIndex };
      }
      if (state.ihmMode === 'PARAM_EDIT') {
        const selected = state.parameters[Object.keys(state.parameters)[state.selectedParamIndex] as ParameterKey];
        const step = selected.step > 0 ? selected.step : 1;
        return {
          ...state,
          editBuffer: Number((state.editBuffer + step).toFixed(3)),
        };
      }
      return state;
    }

    case 'PRESS_DOWN': {
      if (state.ihmMode === 'PARAM_SELECT') {
        const keys = Object.keys(state.parameters) as ParameterKey[];
        const nextIndex = Math.min(keys.length - 1, state.selectedParamIndex + 1);
        return { ...state, selectedParamIndex: nextIndex };
      }
      if (state.ihmMode === 'PARAM_EDIT') {
        const selected = state.parameters[Object.keys(state.parameters)[state.selectedParamIndex] as ParameterKey];
        const step = selected.step > 0 ? selected.step : 1;
        return {
          ...state,
          editBuffer: Number((state.editBuffer - step).toFixed(3)),
        };
      }
      return state;
    }

    case 'PRESS_RUN': {
      return { ...state, motorStatus: 'RUNNING', activeFault: null };
    }

    case 'PRESS_STOP': {
      return { ...state, motorStatus: 'READY', activeFault: null };
    }

    case 'PRESS_LOCREM': {
      return { ...state, controlSource: state.controlSource === 'LOC' ? 'REM' : 'LOC' };
    }

    case 'PRESS_DIRECTION': {
      return { ...state, isForwardDirection: !state.isForwardDirection };
    }

    case 'SET_DIGITAL_INPUT': {
      const { input, value } = action.payload;
      return {
        ...state,
        digitalInputs: { ...state.digitalInputs, [input]: value },
      };
    }

    case 'SET_ANALOG_INPUT_1': {
      return { ...state, ai1Voltage: action.payload };
    }

    case 'SELECT_PARAM_DIRECT': {
      const keys = Object.keys(state.parameters) as ParameterKey[];
      const index = keys.indexOf(action.payload);
      if (index < 0) return state;
      return { ...state, selectedParamIndex: index, ihmMode: 'PARAM_SELECT' };
    }

    case 'UPDATE_DYNAMIC_TELEMETRY': {
      return {
        ...state,
        outputFrequency: action.payload.freq,
        outputCurrent: action.payload.current,
        motorRPM: action.payload.rpm,
      };
    }

    case 'TRIGGER_FAULT': {
      return {
        ...state,
        activeFault: { code: action.payload.code, description: action.payload.description, active: true },
        motorStatus: 'FAULT',
      };
    }

    case 'CLEAR_FAULT': {
      return { ...state, activeFault: null, motorStatus: 'READY' };
    }

    case 'SET_PARAMETER_VALUE': {
      const key = action.payload.key;
      const nextParameters = {
        ...state.parameters,
        [key]: {
          ...state.parameters[key],
          currentValue: action.payload.value,
        },
      };
      return { ...state, parameters: nextParameters };
    }

    default:
      return state;
  }
};