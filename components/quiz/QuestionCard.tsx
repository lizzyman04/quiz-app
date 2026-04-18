'use client';

import React from 'react';
import type { QuestionResponse } from '@/lib/types';

interface QuestionCardProps {
  question: QuestionResponse;
  currentIndex: number;
  totalQuestions: number;
  children?: React.ReactNode;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  children,
}) => {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center text-sm font-medium text-slate-500">
          <span>Questão {currentIndex + 1} de {totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight mt-2">
          {question.text}
        </h2>

        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};
