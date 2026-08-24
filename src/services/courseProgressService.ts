import { COURSE_MODULES } from '../constants/courseModules';
import { CourseModule } from '../types/tutorial';

const PROGRESS_STORAGE_PREFIX = 'cfw500_course_progress_';

export interface UserProgressData {
  completedLessons: string[];
  completedSteps: Record<string, string[]>;
}

const getActiveUsername = (): string => {
  try {
    const session = localStorage.getItem('cfw500_auth_user');
    if (session) {
      const user = JSON.parse(session);
      return user.username || 'default_user';
    }
  } catch {
    // fallback silencioso
  }
  return 'default_user';
};

export const getUserProgress = (): UserProgressData => {
  const username = getActiveUsername();
  const raw = localStorage.getItem(`${PROGRESS_STORAGE_PREFIX}${username}`);
  if (!raw) {
    return { completedLessons: [], completedSteps: {} };
  }
  try {
    return JSON.parse(raw);
  } catch {
    return { completedLessons: [], completedSteps: {} };
  }
};

export const saveUserProgress = (progress: UserProgressData) => {
  const username = getActiveUsername();
  localStorage.setItem(`${PROGRESS_STORAGE_PREFIX}${username}`, JSON.stringify(progress));
  window.dispatchEvent(new Event('course_progress_updated'));
};

export const markLessonCompleted = (lessonId: string) => {
  const progress = getUserProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    saveUserProgress(progress);
  }
};

export const markStepCompleted = (lessonId: string, stepId: string) => {
  const progress = getUserProgress();
  if (!progress.completedSteps[lessonId]) {
    progress.completedSteps[lessonId] = [];
  }
  if (!progress.completedSteps[lessonId].includes(stepId)) {
    progress.completedSteps[lessonId].push(stepId);
    saveUserProgress(progress);
  }
};

export const isModuleCompleted = (module: CourseModule, progress: UserProgressData): boolean => {
  return module.lessons.every((lesson) => progress.completedLessons.includes(lesson.id));
};

export const getModuleCompletionPercent = (module: CourseModule, progress: UserProgressData): number => {
  if (module.lessons.length === 0) return 0;
  const completed = module.lessons.filter((l) => progress.completedLessons.includes(l.id)).length;
  return Math.round((completed / module.lessons.length) * 100);
};

export const isModuleUnlocked = (moduleIndex: number, progress: UserProgressData): boolean => {
  if (moduleIndex === 0) return true;
  const prevModule = COURSE_MODULES[moduleIndex - 1];
  return isModuleCompleted(prevModule, progress);
};

export const isLessonUnlocked = (
  moduleIndex: number,
  lessonIndex: number,
  progress: UserProgressData
): boolean => {
  if (!isModuleUnlocked(moduleIndex, progress)) return false;
  if (lessonIndex === 0) return true;

  const currentModule = COURSE_MODULES[moduleIndex];
  const prevLesson = currentModule.lessons[lessonIndex - 1];
  return progress.completedLessons.includes(prevLesson.id);
};