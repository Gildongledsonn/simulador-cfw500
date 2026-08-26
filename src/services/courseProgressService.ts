import { COURSE_MODULES } from '../constants/courseModules';

export interface UserProgressData {
  studentId: string;
  studentName: string;
  completedLessons: string[];
  completedSteps: Record<string, string[]>;
  lastLessonId?: string;
}

// Chaves de armazenamento local
const SESSION_KEY = '@CFW500_STUDENT_SESSION';
const PROGRESS_STORAGE_PREFIX = '@CFW500_PROGRESS_DATA_';
const ADMIN_BYPASS_KEY = '@CFW500_ADMIN_UNLOCK_ALL';

// URL base da API no UOL Host
const API_BASE_URL: string =
  ((import.meta as any).env?.VITE_API_URL as string) || 'https://seudominio.com.br/api';

/**
 * 1. Obtém a sessão do aluno atual (ID e Nome)
 */
export const getStudentSession = (): { id: string; name: string } => {
  try {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {}
  return { id: 'aluno-demo', name: 'Aluno de Teste' };
};

/**
 * 2. Define o aluno logado e busca automaticamente o progresso dele no banco MySQL
 */
export const setStudentSession = (id: string, name: string) => {
  const cleanId = id.trim().toLowerCase();
  const cleanName = name.trim();
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: cleanId, name: cleanName }));
  syncProgressFromCloud(cleanId);
};

/**
 * 3. Obtém o progresso atual do aluno
 */
export const getUserProgress = (): UserProgressData => {
  const session = getStudentSession();
  try {
    const local = localStorage.getItem(`${PROGRESS_STORAGE_PREFIX}${session.id}`);
    if (local) {
      return JSON.parse(local);
    }
  } catch {}

  return {
    studentId: session.id,
    studentName: session.name,
    completedLessons: [],
    completedSteps: {},
  };
};

/**
 * 4. Salva localmente e notifica a interface do React em tempo real
 */
const saveLocalAndNotify = (progress: UserProgressData) => {
  try {
    localStorage.setItem(`${PROGRESS_STORAGE_PREFIX}${progress.studentId}`, JSON.stringify(progress));
    window.dispatchEvent(new Event('course_progress_updated'));
  } catch (err) {
    console.warn('Erro ao salvar no localStorage:', err);
  }
};

/**
 * 5. SINCRONIZAÇÃO: Salva no MySQL através do save_progress.php
 */
export const syncProgressToCloud = async (progress: UserProgressData) => {
  if (!API_BASE_URL || progress.studentId === 'aluno-demo') return;

  try {
    await fetch(`${API_BASE_URL}/save_progress.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(progress),
    });
  } catch (err) {
    console.warn('Modo offline ativo ou falha ao sincronizar com UOL Host:', err);
  }
};

/**
 * 6. SINCRONIZAÇÃO: Carrega do MySQL através do get_progress.php
 */
export const syncProgressFromCloud = async (studentId: string) => {
  if (!API_BASE_URL || !studentId || studentId === 'aluno-demo') return;

  try {
    const response = await fetch(
      `${API_BASE_URL}/get_progress.php?student_id=${encodeURIComponent(studentId)}`
    );

    if (response.ok) {
      const cloudData = await response.json();
      if (cloudData && Array.isArray(cloudData.completedLessons)) {
        const merged: UserProgressData = {
          studentId: cloudData.studentId || studentId,
          studentName: cloudData.studentName || 'Aluno',
          completedLessons: cloudData.completedLessons,
          completedSteps: cloudData.completedSteps || {},
          lastLessonId: cloudData.lastLessonId,
        };
        saveLocalAndNotify(merged);
      }
    }
  } catch (err) {
    console.warn('Não foi possível buscar progresso remoto:', err);
  }
};

/**
 * 7. Marca um passo prático como concluído e envia para a nuvem
 */
export const markStepCompleted = (lessonId: string, stepId: string) => {
  const p = getUserProgress();
  const list = p.completedSteps[lessonId] || [];

  if (!list.includes(stepId)) {
    p.completedSteps[lessonId] = [...list, stepId];
    p.lastLessonId = lessonId;
    saveLocalAndNotify(p);
    syncProgressToCloud(p);
  }
};

/**
 * 8. Marca uma lição/módulo como concluído e envia para a nuvem
 */
export const markLessonCompleted = (lessonId: string) => {
  const p = getUserProgress();

  if (!p.completedLessons.includes(lessonId)) {
    p.completedLessons.push(lessonId);
    p.lastLessonId = lessonId;
    saveLocalAndNotify(p);
    syncProgressToCloud(p);
  }
};

/**
 * 9. FUNÇÕES ADMINISTRATIVAS (DevTools / Testes)
 */
export const isAdminUnlockAllActive = (): boolean => {
  try {
    return localStorage.getItem(ADMIN_BYPASS_KEY) === 'true';
  } catch {
    return false;
  }
};

export const setAdminUnlockAll = (enabled: boolean) => {
  try {
    localStorage.setItem(ADMIN_BYPASS_KEY, enabled ? 'true' : 'false');
    window.dispatchEvent(new Event('course_progress_updated'));
  } catch (err) {
    console.warn('Erro ao salvar admin bypass:', err);
  }
};

export const resetStudentProgress = (studentId?: string) => {
  const session = getStudentSession();
  const targetId = studentId || session.id;

  const emptyProgress: UserProgressData = {
    studentId: targetId,
    studentName: session.name,
    completedLessons: [],
    completedSteps: {},
  };

  saveLocalAndNotify(emptyProgress);
  syncProgressToCloud(emptyProgress);
};

/**
 * 10. Helpers de Bloqueio/Desbloqueio Sequencial
 */
export const isModuleCompleted = (module: any, progress: UserProgressData): boolean => {
  if (!module || !module.lessons || !module.lessons.length) return false;
  return module.lessons.every((l: any) => progress.completedLessons.includes(l.id));
};

export const isModuleUnlocked = (moduleIndex: number, progress: UserProgressData): boolean => {
  if (isAdminUnlockAllActive()) return true;
  if (moduleIndex === 0) return true;

  const previousModule = COURSE_MODULES[moduleIndex - 1];
  if (!previousModule) return false;

  return isModuleCompleted(previousModule, progress);
};

export const isLessonUnlocked = (
  moduleIndex: number,
  lessonIndex: number,
  progress: UserProgressData
): boolean => {
  if (isAdminUnlockAllActive()) return true;
  if (!isModuleUnlocked(moduleIndex, progress)) return false;
  if (lessonIndex === 0) return true;

  const currentModule = COURSE_MODULES[moduleIndex];
  if (!currentModule || !currentModule.lessons) return false;

  const previousLesson = currentModule.lessons[lessonIndex - 1];
  if (!previousLesson) return false;

  return progress.completedLessons.includes(previousLesson.id);
};

export const getModuleCompletionPercent = (module: any, progress: UserProgressData): number => {
  if (!module || !module.lessons || !module.lessons.length) return 0;
  const done = module.lessons.filter((l: any) => progress.completedLessons.includes(l.id)).length;
  return Math.round((done / module.lessons.length) * 100);
};