export function motorConnection(id: string, connected: (a: string,b: string)=>boolean, voltage:(a:string,b:string)=>number|null) {
  const node=(t:string)=>`${id}:${t}`;
  const line=['U1','V1','W1'];
  const distinct=line.every((t,i)=>voltage(node(t),node(line[(i+1)%3]))===380);
  if (!distinct) return 'INVALID' as const;
  const star=['U2','V2','W2'];
  const y=connected(node('U2'),node('V2'))&&connected(node('V2'),node('W2'))&&star.every(t=>line.every(l=>!connected(node(t),node(l))));
  const delta=connected(node('U1'),node('W2'))&&connected(node('V1'),node('U2'))&&connected(node('W1'),node('V2'));
  return y ? 'STAR' as const : delta ? 'DELTA' as const : 'INVALID' as const;
}
/** R-S-T at U1-V1-W1 is the reference direction; any pair swap reverses it. */
export function motorPhaseDirection(id: string, potential: (node: string) => number | null): 'FWD' | 'REV' | null {
  const phases = ['U1', 'V1', 'W1'].map(t => potential(`${id}:${t}`));
  if (phases.some(p => p === null || p < 1 || p > 3) || new Set(phases).size !== 3) return null;
  const [u, v, w] = phases as number[];
  return (v - u) * (w - v) * (u - w) < 0 ? 'FWD' : 'REV';
}

export function advanceStarDelta(elapsed:number,powered:boolean,dt:number,delay=5,deadTime=0.2) {
  const next=powered ? elapsed+Math.max(0,Math.min(dt,0.25)) : 0;
  return {elapsed:next,star:powered&&next<delay,delta:powered&&next>=delay+deadTime};
}
