/** Ideal 380/220 V AC teaching model; floating or conflicting nets are unknown. */
export function createVoltageModel(
  components: Array<{ id: string; category: string }>,
  connected: (a: string, b: string) => boolean,
) {
  const sources: Array<{ node: string; phase: number }> = [];
  for (const c of components) {
    const terminals: Array<[string, number]> = c.category === 'REDE_TRIFASICA'
      ? [['R', 1], ['S', 2], ['T', 3], ['N', 0]]
      : c.category === 'REDE_MONOFASICA' ? [['F', 1], ['N', 0]] : [];
    // All grid components represent taps of the same utility supply.
    for (const [terminal, phase] of terminals) sources.push({ node: `${c.id}:${terminal}`, phase });
  }
  function potential(node: string): number | null {
    const phases = new Set(sources.filter(s => s.node === node || connected(s.node, node)).map(s => s.phase));
    return phases.size === 1 ? [...phases][0] : null;
  }
  function voltage(a: string, b: string): number | null {
    const pa = potential(a), pb = potential(b);
    if (pa === null || pb === null) return null;
    if (pa === pb) return 0;
    if (pa >= 10 || pb >= 10) return pa >= 10 && pb >= 10 && Math.floor(pa / 2) === Math.floor(pb / 2) ? 24 : null;
    return pa === 0 || pb === 0 ? 220 : 380;
  }
  // Each transformer secondary is a distinct isolated AC supply, not a short or DC source.
  components.filter(c => c.category === 'TRANSFORMADOR_ISOLADOR').forEach((c, index) => {
    if (voltage(`${c.id}:PRI_L1`, `${c.id}:PRI_L2`) === 220) {
      sources.push({ node: `${c.id}:SEC_L`, phase: 10 + index * 2 }, { node: `${c.id}:SEC_N`, phase: 11 + index * 2 });
    }
  });
  return { potential, voltage };
}
