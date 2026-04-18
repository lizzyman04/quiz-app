import { create } from 'zustand';
import type { QuestionResponse } from '@/lib/types';

interface QuizState {
  sessionId: number | null;
  questions: QuestionResponse[];
  currentIndex: number;
  answers: Map<number, number>;
  timeRemaining: number;
  isSubmitted: boolean;
  loadQuiz: (sid: number, qs: QuestionResponse[], tl: number) => void;
  answerQuestion: (qid: number, oid: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
  getScore: () => number;
  getProgress: () => number;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  sessionId: null, questions: [], currentIndex: 0, answers: new Map(), timeRemaining: 0, isSubmitted: false,
  loadQuiz: (sessionId, questions, timeRemaining) => set({
    sessionId, questions, timeRemaining, currentIndex: 0, answers: new Map(), isSubmitted: false,
  }),
  answerQuestion: (qid, oid) => {
    const { answers } = get();
    answers.set(qid, oid);
    set({ answers: new Map(answers) });
  },
  nextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex < questions.length - 1) set({ currentIndex: currentIndex + 1 });
  },
  prevQuestion: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) set({ currentIndex: currentIndex - 1 });
  },
  submitQuiz: () => set({ isSubmitted: true }),
  resetQuiz: () => set({
    sessionId: null, questions: [], currentIndex: 0, answers: new Map(), timeRemaining: 0, isSubmitted: false,
  }),
  getScore: () => {
    const { questions, answers } = get();
    return questions.reduce((acc, q) => {
      const selected = answers.get(q.id);
      const correct = q.options.find(o => o.is_correct);
      return selected === correct?.id ? acc + 1 : acc;
    }, 0);
  },
  getProgress: () => {
    const { questions, answers } = get();
    return questions.length ? (answers.size / questions.length) * 100 : 0;
  },
}));
