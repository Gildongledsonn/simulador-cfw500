import { InverterState } from '../context/InverterContext';

export interface TutorialStep {
  id: string;
  title: string;
  instruction: string;
  tip?: string;
  isCompleted: (state: InverterState) => boolean;
}

export interface TutorialLesson {
  id: string;
  title: string;
  category: 'Básico' | 'Controle Remoto' | 'Multispeed' | 'Diagnóstico';
  description: string;
  steps: TutorialStep[];
}