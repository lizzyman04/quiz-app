'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import type { OptionResponse } from '@/lib/types';

interface OptionListProps {
  options: OptionResponse[];
  selectedOptionId: number | null;
  onSelect: (optionId: number) => void;
  disabled?: boolean;
  showCorrect?: boolean;
}

export const OptionList: React.FC<OptionListProps> = ({
  options,
  selectedOptionId,
  onSelect,
  disabled,
  showCorrect,
}) => {
  return (
    <div className="grid gap-3 mt-4">
      {options.map((option) => {
        const isSelected = selectedOptionId === option.id;
        const isCorrect = option.is_correct;
        const showResult = showCorrect && (isSelected || isCorrect);
        
        const baseClass = "flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all duration-200 active:scale-[0.98] outline-none";
        const stateClass = showResult
          ? isCorrect
            ? "border-green-500 bg-green-50 text-green-700"
            : "border-red-500 bg-red-50 text-red-700"
          : isSelected
            ? "border-blue-500 bg-blue-50 text-blue-700"
            : "border-slate-100 hover:border-slate-200 bg-white text-slate-700";

        return (
          <button
            key={option.id}
            onClick={() => !disabled && onSelect(option.id)}
            disabled={disabled}
            className={`${baseClass} ${stateClass} ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
            aria-label={option.text}
          >
            <span className="text-base font-medium">{option.text}</span>
            {showResult && (
              isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />
            )}
          </button>
        );
      })}
    </div>
  );
};
