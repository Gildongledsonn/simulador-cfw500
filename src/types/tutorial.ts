import { InverterState } from './cfw500';

export type LessonType = 'THEORY' | 'PRACTICE';

export interface TutorialStep {
  id: string;
  title: string;
  instruction: string;
  tip?: string;
  isCompleted: (state: InverterState) => boolean;
}

export interface TheorySection {
  title: string;
  content: string[];
  keyTakeaway: string;
  diagramInfo?: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  durationMin: number;
  description: string;
  theoryData?: TheorySection;
  steps?: TutorialStep[];
}

export interface CourseModule {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}