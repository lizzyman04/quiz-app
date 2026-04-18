'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useClasses } from '@/lib/api';

interface StudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; student_code: string; class_id: number }) => void;
  isLoading?: boolean;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  isOpen, onClose, onSubmit, isLoading
}) => {
  const { data: classes } = useClasses();
  const [name, setName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [classId, setClassId] = useState<string>('');

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setStudentCode('');
      setClassId('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && studentCode.trim() && classId) {
      onSubmit({
        name: name.trim(),
        student_code: studentCode.trim(),
        class_id: parseInt(classId),
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-xl font-black text-slate-900">Novo Aluno</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Nome do Aluno</label>
            <input
              autoFocus
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome completo"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Código do Aluno</label>
            <input
              type="text"
              required
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
              placeholder="Ex: 2024.001"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Turma</label>
            <select
              required
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none"
            >
              <option value="">Selecione uma turma</option>
              {classes?.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-slate-50 text-slate-700 font-bold rounded-2xl hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || !name.trim() || !studentCode.trim() || !classId}
              className="flex-1 px-6 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
