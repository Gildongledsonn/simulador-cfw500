import { InverterState, ParameterKey, ParameterMap } from '../types/cfw500';
import { INITIAL_PARAMETERS } from './InverterContext';

export type InverterAction =
  | { type: 'PRESS_RUN' }
  | { type: 'PRESS_STOP' }
  | { type: 'PRESS_LOCREM' }
  | { type: 'PRESS_PROG' }
  | { type: 'PRESS_UP' }
  | { type: 'PRESS_DOWN' }
  | { type: 'PRESS_DIRECTION' }
  | { type: 'SELECT_PARAM_DIRECT'; payload: ParameterKey }
  | { type: 'SET_DIGITAL_INPUT'; payload: { input: string | number; value: boolean } }
  | { type: 'TOGGLE_DIGITAL_INPUT'; payload: string }
  | { type: 'TOGGLE_DI'; payload: string | number }
  | { type: 'SET_AI1_VOLTAGE'; payload: number }
  | { type: 'SET_ANALOG_INPUT_1'; payload: number }
  | { type: 'TRIGGER_FAULT'; payload: any }
  | { type: 'RESET_FAULT' }
  | { type: 'RESET_FACTORY_DEFAULTS' }
  | {
      type: 'UPDATE_PHYSICS';
      payload: {
        frequency: number;
        current?: number;
        motorRPM?: number;
        dcBus?: number;
      };
    };

export const inverterReducer = (state: InverterState, action: InverterAction): InverterState => {
  const paramKeys = Object.keys(state.parameters) as ParameterKey[];
  const currentKey = paramKeys[state.selectedParamIndex] || 'P0000';
  const currentParam = state.parameters[currentKey];

  switch (action.type) {
    case 'PRESS_RUN': {
      if (state.activeFault) return state;
      return {
        ...state,
        motorStatus: 'RUNNING',
      };
    }

    case 'PRESS_STOP': {
      let nextActiveFault = state.activeFault;
      if (state.activeFault) {
        nextActiveFault = null;
      }
      return {
        ...state,
        motorStatus: 'READY',
        activeFault: nextActiveFault,
      };
    }

    case 'PRESS_LOCREM': {
      const nextSource = state.controlSource === 'LOC' ? 'REM' : 'LOC';
      return {
        ...state,
        controlSource: nextSource,
        motorStatus: 'READY',
      };
    }

    case 'PRESS_DIRECTION': {
      return {
        ...state,
        isForwardDirection: !state.isForwardDirection,
      };
    }

    case 'PRESS_PROG': {
      if (state.ihmMode === 'MONIT') {
        return {
          ...state,
          ihmMode: 'PARAM_SELECT',
        };
      } else if (state.ihmMode === 'PARAM_SELECT') {
        return {
          ...state,
          ihmMode: 'PARAM_EDIT',
          editBuffer: currentParam ? currentParam.currentValue : 0,
        };
      } else if (state.ihmMode === 'PARAM_EDIT') {
        const updatedParams: ParameterMap = {
          ...state.parameters,
          [currentKey]: {
            ...currentParam,
            currentValue: state.editBuffer,
          },
        };
        return {
          ...state,
          parameters: updatedParams,
          ihmMode: 'PARAM_SELECT',
        };
      }
      return state;
    }

    case 'PRESS_UP': {
      if (state.ihmMode === 'PARAM_SELECT') {
        const nextIndex = (state.selectedParamIndex + 1) % paramKeys.length;
        return {
          ...state,
          selectedParamIndex: nextIndex,
        };
      } else if (state.ihmMode === 'PARAM_EDIT') {
        if (!currentParam || currentParam.readOnly) return state;
        const step = currentParam.step || 1;
        const nextVal = Math.min(currentParam.max, Number((state.editBuffer + step).toFixed(2)));
        return {
          ...state,
          editBuffer: nextVal,
        };
      } else if (state.ihmMode === 'MONIT') {
        const p121 = state.parameters.P0121;
        if (!p121) return state;
        const nextFreq = Math.min(p121.max, Number((p121.currentValue + 1.0).toFixed(1)));
        return {
          ...state,
          parameters: {
            ...state.parameters,
            P0121: { ...p121, currentValue: nextFreq },
          },
        };
      }
      return state;
    }

    case 'PRESS_DOWN': {
      if (state.ihmMode === 'PARAM_SELECT') {
        const prevIndex = (state.selectedParamIndex - 1 + paramKeys.length) % paramKeys.length;
        return {
          ...state,
          selectedParamIndex: prevIndex,
        };
      } else if (state.ihmMode === 'PARAM_EDIT') {
        if (!currentParam || currentParam.readOnly) return state;
        const step = currentParam.step || 1;
        const nextVal = Math.max(currentParam.min, Number((state.editBuffer - step).toFixed(2)));
        return {
          ...state,
          editBuffer: nextVal,
        };
      } else if (state.ihmMode === 'MONIT') {
        const p121 = state.parameters.P0121;
        if (!p121) return state;
        const prevFreq = Math.max(p121.min, Number((p121.currentValue - 1.0).toFixed(1)));
        return {
          ...state,
          parameters: {
            ...state.parameters,
            P0121: { ...p121, currentValue: prevFreq },
          },
        };
      }
      return state;
    }

    case 'SELECT_PARAM_DIRECT': {
      const targetKey = action.payload;
      const idx = paramKeys.indexOf(targetKey);
      if (idx !== -1) {
        return {
          ...state,
          selectedParamIndex: idx,
          ihmMode: 'PARAM_SELECT',
        };
      }
      return state;
    }

    case 'SET_DIGITAL_INPUT': {
      const { input, value } = action.payload;
      const key = String(input).toLowerCase();
      const keyUpper = key.toUpperCase();

      const newDigitalInputs: Record<string, boolean> = {
        ...state.digitalInputs,
        [key]: value,
        [keyUpper]: value,
      };

      let newMotorStatus = state.motorStatus;
      let newIsForward = state.isForwardDirection;

      if (state.controlSource === 'REM') {
        const di1Active = Boolean(newDigitalInputs.di1 || newDigitalInputs.DI1);
        const di2Active = Boolean(newDigitalInputs.di2 || newDigitalInputs.DI2);

        if (di1Active && !di2Active) {
          newMotorStatus = 'RUNNING';
          newIsForward = true;
        } else if (di2Active && !di1Active) {
          newMotorStatus = 'RUNNING';
          newIsForward = false;
        } else if (!di1Active && !di2Active) {
          newMotorStatus = 'READY';
        }
      }

      return {
        ...state,
        digitalInputs: newDigitalInputs as any,
        motorStatus: newMotorStatus,
        isForwardDirection: newIsForward,
      };
    }

    case 'TOGGLE_DIGITAL_INPUT':
    case 'TOGGLE_DI': {
      const rawKey = action.payload;
      const key = typeof rawKey === 'number' ? `di${rawKey}` : String(rawKey).toLowerCase();
      const curVal = Boolean((state.digitalInputs as any)?.[key] || (state.digitalInputs as any)?.[key.toUpperCase()]);
      const nextVal = !curVal;

      return inverterReducer(state, {
        type: 'SET_DIGITAL_INPUT',
        payload: { input: key, value: nextVal },
      });
    }

    case 'SET_AI1_VOLTAGE':
    case 'SET_ANALOG_INPUT_1': {
      const v = typeof action.payload === 'number' ? action.payload : 0;
      return {
        ...state,
        ai1Voltage: v,
      };
    }

    case 'TRIGGER_FAULT': {
      return {
        ...state,
        activeFault: action.payload,
        motorStatus: 'FAULT',
      };
    }

    case 'RESET_FAULT': {
      return {
        ...state,
        activeFault: null,
        motorStatus: 'READY',
      };
    }

    case 'RESET_FACTORY_DEFAULTS': {
      return {
        ...state,
        parameters: { ...INITIAL_PARAMETERS },
        selectedParamIndex: 0,
        editBuffer: 0,
        ihmMode: 'MONIT',
        controlSource: 'LOC',
        motorStatus: 'READY',
        isForwardDirection: true,
        activeFault: null,
        digitalInputs: { di1: false, di2: false, di3: false, di4: false } as any,
        ai1Voltage: 0,
        outputFrequency: 0,
        outputCurrent: 0,
        motorRPM: 0,
        dcBusVoltage: 310,
      };
    }

    case 'UPDATE_PHYSICS': {
      const { frequency, current, motorRPM, dcBus } = action.payload;
      return {
        ...state,
        outputFrequency: frequency,
        outputCurrent: current !== undefined ? current : state.outputCurrent,
        motorRPM: motorRPM !== undefined ? motorRPM : state.motorRPM,
        dcBusVoltage: dcBus !== undefined ? dcBus : state.dcBusVoltage,
      };
    }

    default:
      return state;
  }
};