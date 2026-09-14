import React, { useState } from 'react';
import { COURSE_MODULES_COMANDOS, COMANDOS_TRAINING_TOTAL_MINUTES } from '../constants/courseModulesComandos';
import { getUserProgress, isModuleCompleted, isModuleUnlocked, markLessonCompleted } from '../services/courseProgressService';

export const ComandosTrainingPanel: React.FC = () => {
  const [progress, setProgress] = useState(getUserProgress());
  const [selected, setSelected] = useState(0);
  const module = COURSE_MODULES_COMANDOS[selected];
  const refresh = () => setProgress(getUserProgress());
  return <section style={{ marginTop: 18, background: '#101820', border: '1px solid #2b4858', borderRadius: 8, padding: 14 }} aria-label="Curso de Comandos Elétricos">
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', color: '#dff8ff' }}><strong>🎓 Treinamento de Comandos Elétricos · 58 horas</strong><span>{COMANDOS_TRAINING_TOTAL_MINUTES / 60} h · liberação sequencial</span></div>
    <p style={{ color: '#9fb5c1', fontSize: 12 }}>Do básico ao projeto final: monte, simule, diagnostique e documente cada circuito.</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 8 }}>{COURSE_MODULES_COMANDOS.map((m, i) => { const unlocked = isModuleUnlocked(i, progress, COURSE_MODULES_COMANDOS); const done = isModuleCompleted(m, progress); return <button key={m.id} disabled={!unlocked} onClick={() => setSelected(i)} aria-label={`${m.title} ${unlocked ? 'liberado' : 'pendente bloqueado'}`} style={{ textAlign: 'left', minHeight: 78, padding: 9, borderRadius: 6, border: `1px solid ${i === selected ? '#2bc4de' : '#314957'}`, background: i === selected ? '#164052' : '#17232c', color: unlocked ? '#e9f7fb' : '#6f7e86', opacity: unlocked ? 1 : .65, cursor: unlocked ? 'pointer' : 'not-allowed' }}><div>{done ? '✅' : unlocked ? m.icon : '🔒'} <small>{done ? 'CONCLUÍDO' : unlocked ? 'DISPONÍVEL' : 'PENDENTE'}</small></div><b style={{ display: 'block', marginTop: 6, fontSize: 11 }}>Módulo {m.moduleNumber}</b><span style={{ fontSize: 10 }}>{m.title.replace(/^Módulo \d+ · /, '')}</span></button>; })}</div>
    <article style={{ marginTop: 14, background: '#162631', padding: 12, borderRadius: 6, color: '#e2f5f7' }}><span style={{ color: '#7ad9e8', fontSize: 11 }}>MÓDULO {module.moduleNumber} · {module.lessons[0].durationMin / 60} HORAS</span><h3 style={{ margin: '5px 0', fontSize: 15 }}>{module.lessons[0].title}</h3><p style={{ fontSize: 12 }}>{module.lessons[0].theoryData?.content.join(' ')}</p><p style={{ fontSize: 12, color: '#a6c6ce' }}>Prática: {module.lessons[0].steps?.[0].instruction}</p><button disabled={!isModuleUnlocked(selected, progress, COURSE_MODULES_COMANDOS) || isModuleCompleted(module, progress)} onClick={() => { markLessonCompleted(module.lessons[0].id); refresh(); }}>✅ Marcar aula e prática concluídas</button></article>
  </section>;
};
