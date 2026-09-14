import { CourseModule, Lesson } from '../types/tutorial';

const data = [
 ['Segurança e arquitetura do CLIC02',300,'Modelo 20HR-D: 24 Vcc, LCD 4×16, 12 entradas (I09–I0C/A1–A4 compartilhadas) e 8 relés. Identifique bornes, proteção e categoria das cargas.'],
 ['Ciclo de varredura e diagnóstico de entradas',300,'Leia entradas, execute Ladder e atualize saídas. Compare I01–I08 digitais com I09–I0C em 24 V ou 0–10 V.'],
 ['Ladder: contatos, ligações e bobinas',300,'Edite em STOP; NA, NF, ligações e endereços I/Q/M/N/T/C/R/G/H. Valide cada estado no monitor.'],
 ['Partida, selo e intertravamento',360,'Monte partida/parada com contato NF, selo de Q01 e intertravamento entre direções. Teste rompimento do fio de parada.'],
 ['Temporizadores T01–T1F',420,'Pratique TON, retentivo, TOF, pulso e osciladores. Bases 0,01 s, 0,1 s, 1 s e 1 min; preset 0–9999.'],
 ['Contadores C01–C1F',420,'Use contagem crescente/decrescente, reset, preset até 999999, retenção e pulsos de bancada.'],
 ['Analógicas e comparadores G01–G1F',420,'Ajuste V=A×ganho+offset; ganho padrão 10. Use faixa, menor/maior, igualdade e diferença com 0–10 V.'],
 ['RTC diário, semanal e calendário',420,'Programe turnos, virada da meia-noite, datas e precisão em segundos nos blocos R01–R1F.'],
 ['IHM H01–H1F e registradores DR',300,'Crie telas de quatro linhas por 16 caracteres e trabalhe DR01–DR240 com inteiro com ou sem sinal.'],
 ['Memória, retenção e entrega',540,'Edite em STOP, grave/leia PM05, defina retentividade e execute checklist de comissionamento e relatório final.'],
];
const lesson = (row: typeof data[number], i: number): Lesson => { const [title, minutes, text] = row; return { id: `clic58_m${i + 1}`, title: `Aula ${i + 1}: ${title}`, type: i % 2 ? 'PRACTICE' : 'THEORY', durationMin: minutes as number, description: `${(minutes as number) / 60} horas de teoria aplicada e prática guiada no CLIC02 20HR-D.`, category: i < 3 ? 'Básico' : i < 7 ? 'Controle Remoto' : 'Diagnóstico', theoryData: { title: title as string, content: [text as string, 'Execute a sequência no simulador, observe o display e registre o resultado.'], diagramInfo: 'I/A → varredura → Ladder → T/C/G/R/H → Q', keyTakeaway: `Prática: ${text}` }, steps: [{ id: `clic58_step_${i + 1}`, title: 'Executar e registrar', instruction: `Configure a aula “${title}”, rode em RUN e confirme o comportamento esperado.`, tip: 'Use STOP para editar e RUN apenas para monitorar.', isCompleted: () => false }] }; };
export const COURSE_MODULES_CLIC02: CourseModule[] = data.map((row, i) => ({ id: `clic58_modulo_${i + 1}`, moduleNumber: i + 1, title: `Módulo ${i + 1} · ${row[0]}`, description: `${(row[1] as number) / 60} horas de treinamento com simulação.`, icon: i % 2 ? '🛠️' : '📘', lessons: [lesson(row, i)] }));
export const CLIC02_TRAINING_TOTAL_MINUTES = COURSE_MODULES_CLIC02.reduce((sum, m) => sum + m.lessons[0].durationMin, 0);

