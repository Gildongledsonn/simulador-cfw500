import type { CableConnection } from '../components/treinamentos/FornoGasSimulator';

/** Pluggable connector, MN189V10.12 p.4. Wire colours never create signals. */
export function evaluateOvenCircuit(cables: CableConnection[], breaker: boolean) {
  const adj = new Map<string, string[]>();
  const edge = (a: string, b: string) => {
    adj.set(a, [...(adj.get(a) ?? []), b]);
    adj.set(b, [...(adj.get(b) ?? []), a]);
  };
  cables.forEach(c => edge(`${c.fromComponentId}:${c.fromTerminalId}`, `${c.toComponentId}:${c.toTerminalId}`));
  if (breaker) {
    edge('comp_dj:DJ_IN_1', 'comp_dj:DJ_OUT_2');
    edge('comp_dj:DJ_IN_N', 'comp_dj:DJ_OUT_N');
  }
  const connected = (a: string, b: string) => {
    const pending = [a], seen = new Set<string>();
    while (pending.length) {
      const n = pending.pop()!;
      if (n === b) return true;
      if (seen.has(n)) continue;
      seen.add(n); pending.push(...(adj.get(n) ?? []));
    }
    return false;
  };
  const pin = (n: number) => `comp_inova_bornes:PIN_${n}`;
  const live = 'comp_forca:FORCA_L', neutral = 'comp_forca:FORCA_N', pe = 'comp_forca:FORCA_PE';
  const shortCircuit = connected(live, neutral) || connected(live, pe) || connected(neutral, pe);
  const isEnergizado = breaker && !shortCircuit && connected(live, pin(15)) && connected(neutral, pin(14));
  // A sensor pair must be isolated from power and from every other signal pair.
  const isolated = (a: string, b: string) => connected(a, b) &&
    ![live, neutral, pe].some(source => connected(a, source));
  const termoparOk = isolated(pin(1), 'comp_queimador:TERMOPAR_J_MINUS') &&
    isolated(pin(2), 'comp_queimador:TERMOPAR_J_PLUS') && !connected(pin(1), pin(2));
  const groundOk = connected(pe, 'comp_queimador:CH_TERRA') && connected(pin(7), pe);
  const sensor1Ok = groundOk && isolated(pin(8), 'comp_queimador:FLAME_ROD_1') && !connected(pin(8), pin(9));
  const sensor2Ok = groundOk && isolated(pin(9), 'comp_queimador:FLAME_ROD_2') && !connected(pin(8), pin(9));
  // Validate load wiring with relays open; feeding a relay output directly is not a valid command.
  const load = (common: number, output: number, phase: string, ret: string) =>
    connected(live, pin(common)) && connected(pin(output), phase) && connected(neutral, ret) &&
    ![live, neutral, pe].some(source => connected(pin(output), source)) && !connected(phase, ret);
  return { isEnergizado, shortCircuit, termoparOk, sensor1Ok, sensor2Ok,
    usinaOk: load(21, 22, 'comp_usina:USINA_L', 'comp_usina:USINA_N') &&
      isolated('comp_usina:USINA_HV', 'comp_queimador:SPARK_ELECTRODE'),
    // Feed 24 and take 25: both S4 contacts are in series through their common 26.
    valvulaGasOk: load(24, 25, 'comp_valvulas:VALV_GAS_1', 'comp_valvulas:VALV_GAS_2') &&
      ![live, neutral, pe, pin(24), pin(25)].some(source => connected(pin(26), source)),
    valvulaAguaOk: load(16, 20, 'comp_valvulas:VALV_AGUA_1', 'comp_valvulas:VALV_AGUA_2'),
  };
}

export type OvenGrid = ReturnType<typeof evaluateOvenCircuit>;
export interface OvenSettings { ignition: number; interval: number; attempts: number; secondSensor: boolean; ignitionFirst: boolean; delay: number; setpoint: number; offset: number; hysteresis: number }
export interface OvenState { phase: 'off' | 'delay' | 'ignition' | 'interval' | 'heating' | 'satisfied' | 'fault'; elapsed: number; attempt: number; temperature: number; gas: boolean; spark: boolean; error: string | null }
export const initialOven = (): OvenState => ({ phase: 'off', elapsed: 0, attempt: 0, temperature: 24, gas: false, spark: false, error: null });
export function advanceOven(state: OvenState, grid: OvenGrid, settings: OvenSettings, seconds: number): OvenState {
  const dt = Math.max(0, Math.min(seconds, 0.25));
  const s = { ...state, elapsed: state.elapsed + dt };
  const fault = (error: string): OvenState => ({ ...s, phase: 'fault', gas: false, spark: false, error });
  s.temperature = Math.max(24, s.temperature + (s.phase === 'heating' ? 1.7 : -0.25) * dt);
  if (s.phase === 'off' || s.phase === 'fault') return { ...s, gas: false, spark: false };
  if (!grid.isEnergizado) return fault('ENER');
  if (!grid.termoparOk) return fault('tEr');
  const flame = grid.usinaOk && grid.valvulaGasOk && grid.sensor1Ok && (!settings.secondSensor || grid.sensor2Ok);
  if (s.phase === 'delay' && s.elapsed >= settings.delay || s.phase === 'interval' && s.elapsed >= settings.interval) {
    return { ...s, phase: 'ignition', elapsed: 0, attempt: s.attempt + 1, spark: grid.usinaOk, gas: !settings.ignitionFirst && grid.valvulaGasOk };
  }
  if (s.phase === 'ignition') {
    const gasDelay = settings.ignitionFirst ? 2 : 0;
    s.spark = grid.usinaOk; s.gas = grid.valvulaGasOk && s.elapsed >= gasDelay;
    if (flame && s.gas && s.elapsed >= gasDelay + 0.5) return { ...s, phase: 'heating', spark: false, elapsed: 0 };
    if (s.elapsed >= settings.ignition + gasDelay) {
      if (s.attempt >= settings.attempts) return fault('GAS');
      return { ...s, phase: 'interval', elapsed: 0, spark: false, gas: !settings.ignitionFirst && grid.valvulaGasOk };
    }
  }
  if (s.phase === 'heating') {
    if (!grid.valvulaGasOk || !grid.sensor1Ok || settings.secondSensor && !grid.sensor2Ok) return fault('GAS');
    if (s.temperature + settings.offset >= settings.setpoint) return { ...s, phase: 'satisfied', gas: false, spark: false, elapsed: 0 };
  }
  if (s.phase === 'satisfied' && s.temperature + settings.offset < settings.setpoint - settings.hysteresis) {
    return { ...s, phase: 'delay', elapsed: 0, attempt: 0 };
  }
  return s;
}
