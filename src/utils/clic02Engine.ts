// CLIC02 20HR-D: basic Ladder execution. Time is injected for deterministic scans.
export const addresses = (prefix: string, count: number) => Array.from({ length: count }, (_, i) => prefix + (i + 1).toString(16).toUpperCase().padStart(2, '0'));
export const INPUTS = addresses('I', 12);
export const OUTPUTS = addresses('Q', 8);
export const CONTACTS = [...INPUTS, ...OUTPUTS, ...addresses('M', 63), ...addresses('N', 63), ...addresses('T', 31), ...addresses('C', 31), ...addresses('R', 31), ...addresses('G', 31), ...addresses('Z', 4)];
export const WRITABLE = [...OUTPUTS, ...addresses('M', 48), ...addresses('N', 63)];
export type Contact = { type: 'NO' | 'NC' | 'WIRE'; tag: string };
export type Rung = { cells: Contact[]; seal: string; kind: 'OUT' | 'SET' | 'RST' | 'PULSE_FF' | 'TIMER' | 'COUNTER' | 'COMPARE' | 'RTC' | 'HMI'; tag: string };
export type Timer = { mode: number; base: number; preset: number; reset: string };
export type Counter = { preset: number; reset: string; direction: string; continuous: boolean };
export type Operand = { tag: string; value: number };
export type Comparator = { mode: number; x: Operand; y: Operand; reference: Operand };
export type Rtc = { mode: number; startDay: number; endDay: number; on: string; off: string; startDate: string; endDate: string; second: number };
export type Hmi = { mode: number; lines: string[] };
export type Program = { rungs: Rung[]; timers: Record<string, Timer>; counters: Record<string, Counter>; comparators?: Record<string, Comparator>; rtc?: Record<string, Rtc>; hmi?: Record<string, Hmi> };
export type Runtime = { bits: Record<string, boolean>; elapsed: Record<string, number>; counts: Record<string, number>; edges: Record<string, boolean>; clock: number; first: boolean };
export const freshRuntime = (): Runtime => ({ bits: {}, elapsed: {}, counts: {}, edges: {}, clock: 0, first: true });
export const defaultTimer = (): Timer => ({ mode: 1, base: 1, preset: 3, reset: '' });
export const defaultCounter = (): Counter => ({ preset: 5, reset: '', direction: '', continuous: false });
export const defaultComparator = (): Comparator => ({ mode: 5, x: { tag: 'A01', value: 0 }, y: { tag: '', value: 0 }, reference: { tag: '', value: 5 } });
export const defaultRtc = (): Rtc => ({ mode: 1, startDay: 1, endDay: 5, on: '08:00', off: '18:00', startDate: '2026-01-01', endDate: '2026-12-31', second: 20 });
export const defaultHmi = (): Hmi => ({ mode: 1, lines: ['CLIC02', 'PROCESSO ATIVO', '', ''] });
export const ANALOG_TAGS = [...addresses('A', 4), ...addresses('V', 4), ...addresses('T', 31), ...addresses('C', 31), ...addresses('DR', 240)];
export function rtcActive(p: Rtc, date: Date): boolean {
  const minutes = (time: string) => { const [h, m] = time.split(':').map(Number); return h * 60 + m; };
  const now = date.getHours() * 60 + date.getMinutes();
  const on = minutes(p.on), off = minutes(p.off), day = date.getDay();
  const inRange = (n: number, a: number, b: number) => a <= b ? n >= a && n <= b : n >= a || n <= b;
  if (p.mode === 4) return day === p.startDay && now === on && (p.second <= 30 ? date.getSeconds() < p.second : date.getSeconds() === p.second);
  if (p.mode === 1 || (p.mode === 2 && p.startDay === p.endDay)) {
    const eligible = (d: number) => p.startDay === p.endDay || inRange(d, p.startDay, p.endDay);
    return on < off ? eligible(day) && now >= on && now < off : on > off && ((eligible(day) && now >= on) || (eligible((day + 6) % 7) && now < off));
  }
  if (p.mode === 2) {
    const n = day * 1440 + now, a = p.startDay * 1440 + on, b = p.endDay * 1440 + off;
    return a < b ? n >= a && n < b : a > b && (n >= a || n < b);
  }
  const local = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  return p.mode === 3 && (p.startDate < p.endDate ? local >= p.startDate && local < p.endDate : p.startDate > p.endDate && (local >= p.startDate || local < p.endDate));
}
export const initialProgram = (): Program => ({ rungs: [
  { cells: [{ type: 'NO', tag: 'I01' }, { type: 'NO', tag: 'I02' }, { type: 'WIRE', tag: 'I01' }], seal: 'Q01', kind: 'OUT', tag: 'Q01' },
  { cells: [{ type: 'NO', tag: 'Q01' }, { type: 'WIRE', tag: 'I01' }, { type: 'WIRE', tag: 'I01' }], seal: '', kind: 'TIMER', tag: 'T01' },
  { cells: [{ type: 'NO', tag: 'T01' }, { type: 'WIRE', tag: 'I01' }, { type: 'WIRE', tag: 'I01' }], seal: '', kind: 'OUT', tag: 'Q02' },
], timers: { T01: defaultTimer() }, counters: {} });

export function scan(program: Program, previous: Runtime, inputs: Record<string, boolean>, seconds: number, analog: Record<string, number> = {}, date = new Date()): Runtime {
  const s: Runtime = { ...previous, bits: { ...previous.bits, ...inputs }, elapsed: { ...previous.elapsed }, counts: { ...previous.counts }, edges: { ...previous.edges }, clock: previous.clock + Math.max(0, seconds), first: false };
  s.bits.M31 = previous.first;
  s.bits.M32 = s.clock % 1 < 0.5;
  const read = (tag: string) => !!s.bits[tag];
  const value = (operand: Operand) => operand.tag.startsWith('T') ? (s.elapsed[operand.tag] ?? 0) / (program.timers[operand.tag]?.base ?? 1) : operand.tag.startsWith('C') ? s.counts[operand.tag] ?? 0 : operand.tag ? analog[operand.tag] ?? 0 : operand.value;
  program.rungs.forEach((r, index) => {
    const enabled = r.cells.every((c, i) => (i === 0 && r.seal && read(r.seal)) || c.type === 'WIRE' || (c.type === 'NO' ? read(c.tag) : !read(c.tag)));
    const key = 'r' + index;
    const rising = enabled && !previous.edges[key];
    const falling = !enabled && !!previous.edges[key];
    s.edges[key] = enabled;
    if (r.kind === 'COMPARE') {
      const p = program.comparators?.[r.tag] ?? defaultComparator();
      const x = value(p.x), y = value(p.y), ref = value(p.reference);
      s.bits[r.tag] = enabled && [true, x >= y - ref && x <= y + ref, x <= y, x >= y, ref >= x, ref <= x, ref === x, ref !== x][p.mode];
    } else if (r.kind === 'RTC') {
      const p = program.rtc?.[r.tag] ?? defaultRtc();
      const active = p.mode === 0 || rtcActive(p, date);
      s.bits[r.tag] = enabled && active && !(p.mode === 4 && p.second > 30 && previous.edges[r.tag + ':rtc']);
      s.edges[r.tag + ':rtc'] = active;
    } else if (r.kind === 'HMI') {
      s.bits[r.tag] = enabled && (program.hmi?.[r.tag] ?? defaultHmi()).mode === 1;
    } else if (r.kind === 'TIMER') {
      const p = program.timers[r.tag] ?? defaultTimer();
      const target = p.preset * p.base;
      let elapsed = s.elapsed[r.tag] || 0;
      let done = read(r.tag);
      if (read(p.reset)) { elapsed = 0; done = false; }
      else if (p.mode === 1 || p.mode === 2) {
        elapsed = enabled ? Math.min(target, elapsed + seconds) : p.mode === 1 ? 0 : elapsed;
        done = elapsed >= target && (enabled || p.mode === 2);
      } else if (p.mode === 3) {
        if (enabled) { elapsed = 0; done = true; }
        else if (done) { elapsed += seconds; done = elapsed < target; }
      } else if (p.mode === 4) {
        if (enabled) { elapsed = 0; done = false; }
        else if (falling) { elapsed = 0; done = target > 0; }
        else if (done) { elapsed += seconds; done = elapsed < target; }
      } else if (p.mode === 5 || p.mode === 6) {
        const latched = p.mode === 6 && !!s.edges[r.tag + ':latched'];
        if (enabled || latched) {
          s.edges[r.tag + ':latched'] = true;
          elapsed = rising && !latched ? 0 : elapsed + seconds;
          done = target > 0 && elapsed % (2 * target) < target;
        } else { elapsed = 0; done = false; }
      }
      if (read(p.reset)) s.edges[r.tag + ':latched'] = false;
      s.elapsed[r.tag] = elapsed; s.bits[r.tag] = done;
    } else if (r.kind === 'COUNTER') {
      const p = program.counters[r.tag] ?? defaultCounter();
      const down = read(p.direction);
      let count = s.counts[r.tag] ?? (down ? p.preset : 0);
      if (read(p.reset)) count = down ? p.preset : 0;
      else if (rising) count = Math.max(0, Math.min(p.continuous ? 999999 : p.preset, count + (down ? -1 : 1)));
      s.counts[r.tag] = count;
      s.bits[r.tag] = down ? count === 0 : count >= p.preset;
    } else if (WRITABLE.includes(r.tag)) {
      if (r.kind === 'OUT') s.bits[r.tag] = enabled;
      if (r.kind === 'SET' && rising) s.bits[r.tag] = true;
      if (r.kind === 'RST' && rising) s.bits[r.tag] = false;
      if (r.kind === 'PULSE_FF' && rising) s.bits[r.tag] = !read(r.tag);
    }
  });
  return s;
}
