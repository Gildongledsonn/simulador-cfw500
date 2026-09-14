import type { PlacedComponent, CableConnection } from '../components/ComandosEletricosWorkbench';

/** Conductive paths only: coils and windings are loads, never wire jumpers. */
export function buildControlCircuit(components: PlacedComponent[], cables: CableConnection[]) {
    const adj: Record<string, string[]> = {};
    const addEdge = (u: string, v: string) => {
      if (!adj[u]) adj[u] = [];
      if (!adj[v]) adj[v] = [];
      adj[u].push(v);
      adj[v].push(u);
    };

    cables.forEach((c) => {
      addEdge(`${c.fromComponentId}:${c.fromTerminalId}`, `${c.toComponentId}:${c.toTerminalId}`);
    });

    components.forEach((comp) => {
      if (comp.category === 'TEMPORIZADOR_TON') {
        if (comp.timerStar) addEdge(`${comp.id}:15`, `${comp.id}:16`);
        if (comp.timerDelta) addEdge(`${comp.id}:25`, `${comp.id}:28`);
      } else if (comp.category === 'SECCIONADORA_LOTO' || comp.category === 'DISJUNTOR_MOTOR' || comp.category === 'DISJUNTOR_BIPOLAR') {
        if (comp.state) {
          addEdge(`${comp.id}:1L1`, `${comp.id}:2T1`);
          addEdge(`${comp.id}:3L2`, `${comp.id}:4T2`);
          addEdge(`${comp.id}:5L3`, `${comp.id}:6T3`);
        }
      } else if (comp.category === 'DISJUNTOR_MONOPOLAR') {
        if (comp.state) {
          addEdge(`${comp.id}:1`, `${comp.id}:2`);
        }
      } else if (comp.category === 'CHAVE_SELETORA_3POS') {
        if (comp.selectorPosition === 'MAN') {
          addEdge(`${comp.id}:13`, `${comp.id}:14`);
        } else if (comp.selectorPosition === 'AUT') {
          addEdge(`${comp.id}:23`, `${comp.id}:24`);
        }
      } else if (comp.category === 'REGUA_BORNES') {
        addEdge(`${comp.id}:X1_IN`, `${comp.id}:X1_OUT`);
        addEdge(`${comp.id}:X2_IN`, `${comp.id}:X2_OUT`);
        addEdge(`${comp.id}:X3_IN`, `${comp.id}:X3_OUT`);
        addEdge(`${comp.id}:X4_IN`, `${comp.id}:X4_OUT`);
      } else if (comp.category === 'BARRAMENTO_PENTE') {
        addEdge(`${comp.id}:R1`, `${comp.id}:R2`);
        addEdge(`${comp.id}:S1`, `${comp.id}:S2`);
        addEdge(`${comp.id}:T1`, `${comp.id}:T2`);
      } else if (comp.category === 'TRANSFORMADOR_ISOLADOR') {
        if (comp.state) {
          // Secondary supply requires a separate isolated source model.
        }
      } else if (comp.category === 'RELE_SEGURANCA_NR12') {
        if (comp.state && !comp.tripped) {
          addEdge(`${comp.id}:13NO`, `${comp.id}:14NO`);
        }
      } else if (comp.category === 'CHAVE_INTERTRAVAMENTO_NR12') {
        if (comp.state) {
          addEdge(`${comp.id}:11NC`, `${comp.id}:12NC`);
          addEdge(`${comp.id}:21NC`, `${comp.id}:22NC`);
        }
      } else if (comp.category === 'CONTATOR_TRIPOLAR') {
        if (comp.state) {
          addEdge(`${comp.id}:1L1`, `${comp.id}:2T1`);
          addEdge(`${comp.id}:3L2`, `${comp.id}:4T2`);
          addEdge(`${comp.id}:5L3`, `${comp.id}:6T3`);
          addEdge(`${comp.id}:13NO`, `${comp.id}:14NO`);
        } else {
          addEdge(`${comp.id}:21NC`, `${comp.id}:22NC`);
        }
      } else if (comp.category === 'BLOCO_AUXILIAR') {
        if (comp.state) {
          addEdge(`${comp.id}:13NO`, `${comp.id}:14NO`);
        } else {
          addEdge(`${comp.id}:21NC`, `${comp.id}:22NC`);
        }
      } else if (comp.category === 'RELE_TERMICO') {
        addEdge(`${comp.id}:1L1`, `${comp.id}:2T1`);
        addEdge(`${comp.id}:3L2`, `${comp.id}:4T2`);
        addEdge(`${comp.id}:5L3`, `${comp.id}:6T3`);
        if (!comp.tripped) {
          addEdge(`${comp.id}:95NC`, `${comp.id}:96NC`);
        } else {
          addEdge(`${comp.id}:97NO`, `${comp.id}:98NO`);
        }
      } else if (comp.category === 'BOTOEIRA_PULSO_NA') {
        if (comp.state) {
          addEdge(`${comp.id}:3NO`, `${comp.id}:4NO`);
        }
      } else if (comp.category === 'BOTOEIRA_COGUMELO_NF') {
        if (comp.state) {
          addEdge(`${comp.id}:11NC`, `${comp.id}:12NC`);
        }

      }
    });

    const hasPath = (start: string, goal: string) => {
      if (!adj[start] || !adj[goal]) return false;
      const visited = new Set<string>();
      const queue = [start];
      visited.add(start);

      while (queue.length > 0) {
        const curr = queue.shift()!;
        if (curr === goal) return true;
        for (const neighbor of adj[curr] || []) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        }
      }
      return false;
    };


    return hasPath;
}
