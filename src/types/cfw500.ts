export type ParameterKey =
  // Parâmetros de Leitura / Monitoração (P0000 a P0099)
  | 'P0000' | 'P0001' | 'P0002' | 'P0003' | 'P0004' | 'P0005' | 'P0006' | 'P0007' | 'P0008' | 'P0009'
  | 'P0010' | 'P0011' | 'P0012' | 'P0013' | 'P0014' | 'P0018' | 'P0023' | 'P0030' | 'P0037' | 'P0050'

  // Rampas e Limites de Frequência (P0100 a P0149)
  | 'P0100' | 'P0101' | 'P0102' | 'P0103' | 'P0104' | 'P0105'
  | 'P0120' | 'P0121' | 'P0122' | 'P0123' | 'P0124' | 'P0125' | 'P0126' | 'P0127' | 'P0128' | 'P0129' | 'P0130' | 'P0131'
  | 'P0133' | 'P0134' | 'P0135' | 'P0136' | 'P0137' | 'P0138' | 'P0139' | 'P0140' | 'P0142' | 'P0143' | 'P0145'

  // Frenagem CC e Proteções (P0150 a P0169)
  | 'P0150' | 'P0151' | 'P0152' | 'P0153' | 'P0156' | 'P0169'

  // Funções Gerais, Controle V/F e Modos (P0200 a P0229)
  | 'P0202' | 'P0204' | 'P0205' | 'P0206' | 'P0208'
  | 'P0217' | 'P0218' | 'P0219'
  | 'P0220' | 'P0221' | 'P0222' | 'P0223' | 'P0224' | 'P0225' | 'P0226' | 'P0227' | 'P0228'

  // Entradas e Saídas Analógicas / Digitais (P0230 a P0299)
  | 'P0231' | 'P0232' | 'P0233' | 'P0234' | 'P0235'
  | 'P0251' | 'P0252' | 'P0253' | 'P0254'
  | 'P0263' | 'P0264' | 'P0265' | 'P0266' | 'P0267' | 'P0268'
  | 'P0275' | 'P0276' | 'P0277' | 'P0278' | 'P0279'
  | 'P0295' | 'P0297'

  // Comunicação Modbus e IHM (P0300 a P0399)
  | 'P0308' | 'P0310' | 'P0311' | 'P0312' | 'P0313' | 'P0314' | 'P0316'
  | 'P0340' | 'P0341'

  // Dados de Catálogo do Motor e Proteções (P0400 a P0409)
  | 'P0400' | 'P0401' | 'P0402' | 'P0403' | 'P0404' | 'P0405' | 'P0406' | 'P0407' | 'P0408' | 'P0409';

export interface ParameterConfig {
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

export type ParameterMetadata = ParameterConfig;
export type ParameterMap = Record<string, ParameterConfig>;

export interface FaultData {
  code: string;
  name: string;
  description: string;
  autoResetable: boolean;
  active?: boolean;
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
  ihmMode: 'MONIT' | 'PARAM_SELECT' | 'PARAM_EDIT';
  controlSource: 'LOC' | 'REM';
  motorStatus: 'READY' | 'RUNNING' | 'FAULT';
  isForwardDirection: boolean;
  activeFault: FaultData | null;
  digitalInputs: DigitalInputsState;
  ai1Voltage: number;
  outputFrequency: number;
  outputCurrent: number;
  motorRPM: number;
  dcBusVoltage: number;
  lastFactoryResetTimestamp?: number;
}