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