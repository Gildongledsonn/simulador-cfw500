import { CourseModule } from '../types/tutorial';

const items: [string, number, string][] = [
 ['Fundamentos, segurança NR-10 e leitura de diagramas', 300, 'Grandezas elétricas, simbologia, proteção, LOTO, comando e força.'],
 ['Partida direta e proteção de motores', 300, 'Disjuntor-motor, contator, relé térmico, selo e diagnóstico.'],
 ['Partida reversora e intertravamentos', 360, 'Reversão segura, troca de fases, intertravamento elétrico e mecânico.'],
 ['Partida estrela-triângulo', 420, 'Seis pontas, temporização, contatores, transição e falhas de sobreposição.'],
 ['Comando de caixa de água e poços', 420, 'Boias, nível mínimo/máximo, bomba, falta d’água, automático e manual.'],
 ['Esteiras, rampas e transporte', 420, 'Sensores, sequência, emergência, reversão, acumulação e sincronismo.'],
 ['Elevadores, plataformas e segurança', 420, 'Fim de curso, portas, nivelamento, freio, prioridade e NR-12.'],
 ['Motores monofásicos, capacitores e frenagem', 300, 'Partida auxiliar, capacitor, resistor de frenagem e proteção.'],
 ['Comissionamento e diagnóstico avançado', 300, 'Medições, falta de fase, curto, sobrecarga, continuidade e manutenção.'],
 ['Projeto final integrado', 540, 'Dimensione e simule uma instalação completa com documentação e checklist.'],
];
export const COURSE_MODULES_COMANDOS: CourseModule[] = items.map(([title, durationMin, description], i) => ({ id: `comandos58-mod-${i + 1}`, moduleNumber: i + 1, title: `Módulo ${i + 1} · ${title}`, icon: i < 4 ? '⚡' : i < 8 ? '🏭' : '🧰', description: `${description} Aula teórica, prática guiada e simulação.`, lessons: [{ id: `comandos58-aula-${i + 1}`, title: `Aula prática: ${title}`, type: i % 2 ? 'PRACTICE' : 'THEORY', durationMin, description, theoryData: { title, content: [description, 'Monte o circuito no quadro virtual, energize com segurança e observe tensões, contatos e cargas.'], diagramInfo: 'PROTEÇÃO → COMANDO → CONTATOR → CARGA → SINALIZAÇÃO', keyTakeaway: 'Registre o teste, a falha encontrada e a correção aplicada.' }, steps: [{ id: `comandos58-step-${i + 1}`, title: 'Executar a prática', instruction: `Realize o exercício de ${title.toLowerCase()} no simulador de Comandos Elétricos.`, tip: 'A edição é reversível; teste sempre sem tensão antes de energizar.', isCompleted: () => false }] }] }));
export const COMANDOS_TRAINING_TOTAL_MINUTES = COURSE_MODULES_COMANDOS.reduce((sum, m) => sum + m.lessons[0].durationMin, 0);
