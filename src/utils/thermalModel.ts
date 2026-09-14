/** Accelerated educational model, not a manufacturer's trip curve. */
export const RESET_HEAT = 0.35;
export function advanceThermal(heat: number, ratio: number, seconds: number) {
  const dt = Math.max(0, Math.min(seconds, 1));
  const safeRatio = Number.isFinite(ratio) ? Math.max(0, ratio) : 0;
  const equilibrium = 0.5 * safeRatio * safeRatio;
  const next = Math.max(0, equilibrium + (heat - equilibrium) * Math.exp(-dt / 12));
  return { heat: next, trip: next >= 1 };
}
