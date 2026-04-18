'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowRight } from 'lucide-react';
import * as svc from '@/lib/services';
import { offlineRequest } from '@/lib/api';

export default function JoinPage() {
  const router = useRouter();
  const [sessionCode, setSessionCode] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const sid = parseInt(sessionCode);
      if (isNaN(sid)) throw new Error('Código da sessão inválido');

      const session = await svc.getSessionById(sid);
      if (session.status !== 'active') throw new Error('Esta sessão não está ativa');

      // Find student in class
      const students = await offlineRequest(() => svc.getStudents(), { cacheKey: 'students' });
      const student = students.find(s => 
        s.class_id === session.class_id && 
        (s.name.toLowerCase() === studentName.toLowerCase() || (studentCode && s.student_code === studentCode))
      );

      if (!student) throw new Error('Estudante não encontrado nesta turma');

      localStorage.setItem('current_student', JSON.stringify(student));
      router.push(`/play/${sid}`);
    } catch (err: any) {
      setError(err.message || 'Erro ao entrar na sessão');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden">
        <div className="bg-blue-600 p-8 text-white text-center">
          <h1 className="text-2xl font-bold">Entrar no Quiz</h1>
          <p className="text-blue-100 mt-2">Insira os dados para começar</p>
        </div>

        <form onSubmit={handleJoin} className="p-8 space-y-6">
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Código da Sessão</label>
              <input
                type="text"
                maxLength={10}
                required
                value={sessionCode}
                onChange={(e) => setSessionCode(e.target.value)}
                placeholder="Ex: 123"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Seu Nome</label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Digite seu nome completo"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Código do Aluno (opcional)</label>
              <input
                type="text"
                value={studentCode}
                onChange={(e) => setStudentCode(e.target.value)}
                placeholder="Ex: 06.0842.2024"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? 'Verificando...' : (
              <>
                Começar Quiz
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
