import { InverterState } from '../types/cfw500';

export const evaluateRelayState = (funcCode: number, state: InverterState): boolean => {
  switch (funcCode) {
    case 13:
      return state.activeFault === null;
    case 14:
      return state.activeFault !== null;
    case 15:
      return state.motorStatus === 'RUNNING' && state.outputFrequency > 0.1;
    case 2:
      return (
        state.motorStatus === 'RUNNING' &&
        Math.abs(state.outputFrequency - state.parameters.P0121.currentValue) <= 0.1
      );
    default:
      return false;
  }
};