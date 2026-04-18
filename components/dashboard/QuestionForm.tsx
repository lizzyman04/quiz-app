'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import type { CreateQuestionPayload } from '@/lib/types';

interface QuestionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateQuestionPayload) => void;
  isLoading?: boolean;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  isOpen, onClose, onSubmit, isLoading
}) => {
  const [text, setText] = useState('');
  const [options, setOptions] = useState([
    { text: '', is_correct: true },
    { text: '', is_correct: false },
    { text: '', is_correct: false },
    { text: '', is_correct: false },
  ]);

  useEffect(() => {
    if (!isOpen) {
      setText('');
      setOptions([
        { text: '', is_correct: true },
        { text: '', is_correct: false },
        { text: '', is_correct: false },
        { text: '', is_correct: false },
      ]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOptionChange = (index: number, val: string) => {
    const newOptions = [...options];
    newOptions[index].text = val;
    setOptions(newOptions);
  };

  const handleCorrectChange = (index: number) => {
    const newOptions = options.map((opt, i) => ({
      ...opt,
      is_correct: i === index,
    }));
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && options.every(o => o.text.trim())) {
      onSubmit({
        text: text.trim(),
        options: options.map(o => ({ ...o, text: o.text.trim() })),
      });
    }
  };

  const isValid = text.trim() && options.every(o => o.text.trim());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-xl font-black text-slate-900">Nova Questão</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Texto da Pergunta</label>
            <textarea
              autoFocus
              required
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite o enunciado da questão..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700">Opções de Resposta</label>
            <p className="text-xs text-slate-500 mb-4 font-medium">Selecione o ícone para marcar a resposta correta.</p>
            
            {options.map((option, idx) => (
              <div key={idx} className="flex gap-3 items-center group">
                <button
                  type="button"
                  onClick={() => handleCorrectChange(idx)}
                  className={`p-3 rounded-2xl border-2 transition-all ${
                    option.is_correct 
                      ? 'bg-blue-50 border-blue-500 text-blue-600 shadow-md shadow-blue-50' 
                      : 'bg-slate-50 border-slate-100 text-slate-300 hover:border-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-6 h-6" />
                </button>
                <input
                  type="text"
                  required
                  value={option.text}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  placeholder={`Opção ${String.fromCharCode(65 + idx)}`}
                  className={`flex-1 px-4 py-3 bg-slate-50 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    option.is_correct ? 'border-blue-200 font-bold' : 'border-slate-200'
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4 sticky bottom-0 bg-white border-t border-slate-50 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-slate-50 text-slate-700 font-bold rounded-2xl hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || !isValid}
              className="flex-1 px-6 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-blue-100"
            >
              {isLoading ? 'Salvando...' : 'Adicionar Questão'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
