import React, { createContext, useContext, useReducer, useEffect } from 'react';

// 1. DEFINIÇÃO DE TIPOS
export type ParameterKey =
  | 'P0000' | 'P0001' | 'P0002' | 'P0003' | 'P0004'
  | 'P0100' | 'P0101' | 'P0102' | 'P0103'
  | 'P0121' | 'P0122' | 'P0124' | 'P0125' | 'P0126' | 'P0127' | 'P0128' | 'P0129' | 'P0130' | 'P0131'
  | 'P0133' | 'P0134' | 'P0135'
  | 'P0202' | 'P0220' | 'P0221' | 'P0222'
  | 'P0275' | 'P0277'
  | 'P0295' | 'P0400' | 'P0401' | 'P0402' | 'P0403';

export type IHMMode = 'MONIT' | 'PARAM_SELECT' | 'PARAM_EDIT';
export type ControlSource = 'LOC' | 'REM';
export type MotorStatus = 'READY' | 'RUNNING' | 'FAULT';

export interface ParameterMetadata {
  code: ParameterKey;
  description: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  currentValue: number;
  unit: string;
  readOnly?: boolean;
}

export type ParameterMap = Record<ParameterKey, ParameterMetadata>;

export interface FaultData {
  code: string;
  description: string;
  active: boolean;
}

export interface DigitalInputsState {
  di1: boolean;
  di2: boolean;
  di3: boolean;
  di4: boolean;
}

export interface InverterState {
  parameters: ParameterMap;
  selectedParamIndex: number;
  editBuffer: number;
  ihmMode: IHMMode;
  controlSource: ControlSource;
  motorStatus: MotorStatus;
  isForwardDirection: boolean;
  activeFault: FaultData | null;
  digitalInputs: DigitalInputsState;
  ai1Voltage: number;
  outputFrequency: number;
  outputCurrent: number;
  motorRPM: number;
  dcBusVoltage: number;
}

// 2. PARÂMETROS PADRÃO DE FÁBRICA
export const INITIAL_PARAMETERS: ParameterMap = {
  P0000: { code: 'P0000', description: 'Acesso aos Parâmetros', min: 0, max: 9999, step: 1, defaultValue: 0, currentValue: 5, unit: '' },
  P0001: { code: 'P0001', description: 'Velocidade de Saída (RPM)', min: 0, max: 9999, step: 1, defaultValue: 0, currentValue: 0, unit: 'RPM', readOnly: true },
  P0002: { code: 'P0002', description: 'Frequência de Saída', min: 0, max: 500, step: 0.1, defaultValue: 0, currentValue: 0, unit: 'Hz', readOnly: true },
  P0003: { code: 'P0003', description: 'Corrente do Motor', min: 0, max: 100, step: 0.1, defaultValue: 0, currentValue: 0, unit: 'A', readOnly: true },
  P0004: { code: 'P0004', description: 'Tensão Barramento CC', min: 0, max: 1000, step: 1, defaultValue: 310, currentValue: 310, unit: 'V', readOnly: true },
  P0100: { code: 'P0100', description: 'Tempo de Aceleração 1', min: 0.1, max: 999.0, step: 0.1, defaultValue: 5.0, currentValue: 5.0, unit: 's' },
  P0101: { code: 'P0101', description: 'Tempo de Desaceleração 1', min: 0.1, max: 999.0, step: 0.1, defaultValue: 5.0, currentValue: 5.0, unit: 's' },
  P0102: { code: 'P0102', description: 'Tempo de Aceleração 2', min: 0.1, max: 999.0, step: 0.1, defaultValue: 10.0, currentValue: 10.0, unit: 's' },
  P0103: { code: 'P0103', description: 'Tempo de Desaceleração 2', min: 0.1, max: 999.0, step: 0.1, defaultValue: 10.0, currentValue: 10.0, unit: 's' },
  P0121: { code: 'P0121', description: 'Referência Frequência IHM', min: 0.0, max: 300.0, step: 0.1, defaultValue: 3.0, currentValue: 60.0, unit: 'Hz' },
  P0122: { code: 'P0122', description: 'Frequência de JOG', min: 0.0, max: 300.0, step: 0.1, defaultValue: 5.0, currentValue: 5.0, unit: 'Hz' },
  P0124: { code: 'P0124', description: 'Multispeed Referência 1', min: 0.0, max: 300.0, step: 0.1, defaultValue: 5.0, currentValue: 5.0, unit: 'Hz' },
  P0125: { code: 'P0125', description: 'Multispeed Referência 2', min: 0.0, max: 300.0, step: 0.1, defaultValue: 10.0, currentValue: 10.0, unit: 'Hz' },
  P0126: { code: 'P0126', description: 'Multispeed Referência 3', min: 0.0, max: 300.0, step: 0.1, defaultValue: 20.0, currentValue: 20.0, unit: 'Hz' },
  P0127: { code: 'P0127', description: 'Multispeed Referência 4', min: 0.0, max: 300.0, step: 0.1, defaultValue: 30.0, currentValue: 30.0, unit: 'Hz' },
  P0128: { code: 'P0128', description: 'Multispeed Referência 5', min: 0.0, max: 300.0, step: 0.1, defaultValue: 40.0, currentValue: 40.0, unit: 'Hz' },
  P0129: { code: 'P0129', description: 'Multispeed Referência 6', min: 0.0, max: 300.0, step: 0.1, defaultValue: 50.0, currentValue: 50.0, unit: 'Hz' },
  P0130: { code: 'P0130', description: 'Multispeed Referência 7', min: 0.0, max: 300.0, step: 0.1, defaultValue: 55.0, currentValue: 55.0, unit: 'Hz' },
  P0131: { code: 'P0131', description: 'Multispeed Referência 8', min: 0.0, max: 300.0, step: 0.1, defaultValue: 60.0, currentValue: 60.0, unit: 'Hz' },
  P0133: { code: 'P0133', description: 'Frequência Mínima', min: 0.0, max: 300.0, step: 0.1, defaultValue: 3.0, currentValue: 3.0, unit: 'Hz' },
  P0134: { code: 'P0134', description: 'Frequência Máxima', min: 0.0, max: 300.0, step: 0.1, defaultValue: 60.0, currentValue: 60.0, unit: 'Hz' },
  P0135: { code: 'P0135', description: 'Corrente Máxima de Saída', min: 0.0, max: 50.0, step: 0.1, defaultValue: 10.0, currentValue: 10.0, unit: 'A' },
  P0202: { code: 'P0202', description: 'Tipo de Controle (0=V/F, 1=VVW)', min: 0, max: 1, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0220: { code: 'P0220', description: 'Seleção Modo Local/Remoto', min: 0, max: 3, step: 1, defaultValue: 2, currentValue: 2, unit: '' },
  P0221: { code: 'P0221', description: 'Referência Local (0=IHM, 1=AI1)', min: 0, max: 1, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0222: { code: 'P0222', description: 'Referência Remota (0=IHM, 1=AI1, 6=Multi)', min: 0, max: 10, step: 1, defaultValue: 1, currentValue: 1, unit: '' },
  P0275: { code: 'P0275', description: 'Função Relé RL1 (15=RUN, 14=Falha)', min: 0, max: 20, step: 1, defaultValue: 15, currentValue: 15, unit: '' },
  P0277: { code: 'P0277', description: 'Função Relé RL2 (14=Falha, 15=RUN)', min: 0, max: 20, step: 1, defaultValue: 14, currentValue: 14, unit: '' },
  P0295: { code: 'P0295', description: 'Corrente Nominal Inversor', min: 0.1, max: 100.0, step: 0.1, defaultValue: 7.3, currentValue: 7.3, unit: 'A', readOnly: true },
  P0400: { code: 'P0400', description: 'Tensão Nominal Motor', min: 100, max: 600, step: 1, defaultValue: 220, currentValue: 220, unit: 'V' },
  P0401: { code: 'P0401', description: 'Frequência Nominal Motor', min: 10.0, max: 300.0, step: 0.1, defaultValue: 60.0, currentValue: 60.0, unit: 'Hz' },
  P0402: { code: 'P0402', description: 'Rotação Nominal Motor', min: 0, max: 9999, step: 1, defaultValue: 1750, currentValue: 1750, unit: 'RPM' },
  P0403: { code: 'P0403', description: 'Corrente Nominal Motor', min: 0.1, max: 50.0, step: 0.1, defaultValue: 4.5, currentValue: 4.5, unit: 'A' },
};

// 3. AÇÕES DO REDUCER
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

// 4. CONTEXTO E PROVEDOR
interface InverterContextType {
  state: InverterState;
  dispatch: React.Dispatch<InverterAction>;
  currentDisplayValue: string;
  selectedParameter: ParameterMetadata;
}

const STORAGE_KEY = '@CFW500_EEPROM_STORAGE';

const loadSavedParameters = (): ParameterMap => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return INITIAL_PARAMETERS;
  try {
    return { ...INITIAL_PARAMETERS, ...JSON.parse(saved) };
  } catch {
    return INITIAL_PARAMETERS;
  }
};

const initialState: InverterState = {
  parameters: loadSavedParameters(),
  selectedParamIndex: 0,
  editBuffer: 0,
  ihmMode: 'MONIT',
  controlSource: 'LOC',
  motorStatus: 'READY',
  isForwardDirection: true,
  activeFault: null,
  digitalInputs: { di1: false, di2: false, di3: false, di4: false },
  ai1Voltage: 0,
  outputFrequency: 0,
  outputCurrent: 0,
  motorRPM: 0,
  dcBusVoltage: 310,
};

const InverterContext = createContext<InverterContextType | undefined>(undefined);

export const InverterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(inverterReducer, initialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.parameters));
  }, [state.parameters]);

  const paramKeys = Object.keys(state.parameters) as ParameterKey[];
  const selectedParameter = state.parameters[paramKeys[state.selectedParamIndex]] || INITIAL_PARAMETERS.P0000;

  let currentDisplayValue = 'rdy';
  if (state.activeFault) {
    currentDisplayValue = state.activeFault.code;
  } else if (state.ihmMode === 'MONIT') {
    currentDisplayValue = state.motorStatus === 'RUNNING' ? state.outputFrequency.toFixed(1) : 'rdy';
  } else if (state.ihmMode === 'PARAM_SELECT') {
    currentDisplayValue = selectedParameter ? selectedParameter.code : 'P0000';
  } else if (state.ihmMode === 'PARAM_EDIT') {
    currentDisplayValue = selectedParameter ? state.editBuffer.toFixed(selectedParameter.step < 1 ? 1 : 0) : '0';
  }

  return (
    <InverterContext.Provider value={{ state, dispatch, currentDisplayValue, selectedParameter }}>
      {children}
    </InverterContext.Provider>
  );
};

export const useInverter = (): InverterContextType => {
  const context = useContext(InverterContext);
  if (!context) throw new Error('useInverter deve ser usado dentro de InverterProvider');
  return context;
};