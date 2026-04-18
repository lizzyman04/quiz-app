'use client';

import React from 'react';
import { Check, X, RotateCcw } from 'lucide-react';
import type { QuestionResponse } from '@/lib/types';

interface ResultsSummaryProps {
  questions: QuestionResponse[];
  answers: Map<number, number>;
  score: number;
  totalQuestions: number;
  onReview?: () => void;
  onFinish?: () => void;
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  questions, answers, score, totalQuestions, onReview, onFinish,
}) => {
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-sm border border-slate-100 text-center">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Quiz Concluído!</h2>
        <p className="text-slate-500">Confira seu desempenho abaixo.</p>
      </div>

      <div className="relative inline-flex items-center justify-center mb-8">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle className="text-slate-100" strokeWidth="8" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64" />
          <circle className="text-blue-500 transition-all duration-1000 ease-out" strokeWidth="8" strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * percentage) / 100} strokeLinecap="round" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64" />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-bold text-slate-800">{score}/{totalQuestions}</span>
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Acertos</span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-8">
        {questions.map((q, idx) => {
          const isCorrect = q.options.find(o => o.id === answers.get(q.id))?.is_correct;
          return (
            <div key={q.id} className={`aspect-square flex items-center justify-center rounded-lg text-sm font-bold ${
              isCorrect ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}>
              {idx + 1}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={onReview} className="flex-1 px-6 py-4 bg-slate-50 text-slate-700 font-bold rounded-2xl hover:bg-slate-100 transition-ui">
          Revisar Respostas
        </button>
        <button onClick={onFinish} className="flex-1 px-6 py-4 bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-600 shadow-blue-200 shadow-lg transition-ui">
          Finalizar
        </button>
      </div>
    </div>
  );
};
