'use client';

import React, { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Play, CheckCircle, RotateCcw, 
  Plus, Upload, HelpCircle, Clock, BookOpen, Users 
} from 'lucide-react';
import { useSessionQuestions, useUpdateSessionStatus, useClasses, useSubjects, useAddQuestion } from '@/lib/api';
import * as svc from '@/lib/services';
import { useQuery } from '@tanstack/react-query';
import { QuestionForm } from '@/components/dashboard';
import type { CreateQuestionPayload } from '@/lib/types';

const statusConfig = {
  draft: { label: 'Rascunho', color: 'bg-slate-100 text-slate-600' },
  active: { label: 'Ativa', color: 'bg-green-100 text-green-700' },
  completed: { label: 'Concluída', color: 'bg-blue-100 text-blue-700' },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SessionDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const sid = parseInt(id);
  const router = useRouter();

  const [isQuestionFormOpen, setIsQuestionFormOpen] = useState(false);

  const { data: session, isLoading: isLoadingSession } = useQuery({
    queryKey: ['sessions', sid],
    queryFn: () => svc.getSessionById(sid)
  });

  const { data: questions, isLoading: isLoadingQuestions } = useSessionQuestions(sid);
  const { data: classes } = useClasses();
  const { data: subjects } = useSubjects();
  const updateStatus = useUpdateSessionStatus();
  const addQuestion = useAddQuestion(sid);

  if (isLoadingSession) return <div className="p-8 text-center text-slate-400 font-medium">Carregando detalhes...</div>;
  if (!session) return <div className="p-8 text-center text-red-500 font-bold">Sessão não encontrada.</div>;

  const config = statusConfig[session.status as keyof typeof statusConfig];

  const handleStatusChange = async (status: 'draft' | 'active' | 'completed') => {
    try {
      await updateStatus.mutateAsync({ id: sid, data: { status } });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddQuestion = async (data: CreateQuestionPayload) => {
    try {
      await addQuestion.mutateAsync(data);
      setIsQuestionFormOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-black text-slate-900">{session.title}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${config.color}`}>
                {config.label}
              </span>
            </div>
            <p className="text-slate-500 font-medium">Gerenciamento da Sessão</p>
          </div>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          {session.status === 'draft' && (
            <button 
              onClick={() => handleStatusChange('active')}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-2xl shadow-lg shadow-green-100 hover:bg-green-600 transition-all active:scale-[0.98]"
            >
              <Play className="w-5 h-5" /> Iniciar Sessão
            </button>
          )}
          {session.status === 'active' && (
            <button 
              onClick={() => handleStatusChange('completed')}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.98]"
            >
              <CheckCircle className="w-5 h-5" /> Finalizar Sessão
            </button>
          )}
          {session.status === 'completed' && (
            <button 
              onClick={() => handleStatusChange('active')}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all active:scale-[0.98]"
            >
              <RotateCcw className="w-5 h-5" /> Reabrir Sessão
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900">Questões do Quiz</h3>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => alert('Em desenvolvimento')}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                  title="Upload em Massa"
                >
                  <Upload className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsQuestionFormOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all active:scale-[0.95]"
                >
                  <Plus className="w-4 h-4" /> Adicionar
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-slate-100">
              {isLoadingQuestions ? (
                <div className="p-12 text-center text-slate-400">Carregando questões...</div>
              ) : !questions || questions.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-slate-400 font-medium mb-4">Nenhuma questão cadastrada para esta sessão.</p>
                  <button onClick={() => setIsQuestionFormOpen(true)} className="text-blue-600 font-bold hover:underline">
                    Começar a adicionar questões
                  </button>
                </div>
              ) : (
                questions.map((q, idx) => (
                  <div key={q.id} className="p-6 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-slate-800 font-bold mb-3">{q.text}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt) => (
                            <div key={opt.id} className={`p-3 rounded-xl border text-sm font-medium ${
                              opt.is_correct 
                                ? 'bg-green-50 border-green-100 text-green-700' 
                                : 'bg-slate-50 border-slate-100 text-slate-600'
                            }`}>
                              {opt.text}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-black text-slate-900 flex items-center gap-2">
              Informações da Sessão
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 text-slate-400 rounded-xl">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Turma</p>
                  <p className="text-slate-700 font-bold">{classes?.find(c => c.id === session.class_id)?.name || '...'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 text-slate-400 rounded-xl">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Disciplina</p>
                  <p className="text-slate-700 font-bold">{subjects?.find(s => s.id === session.subject_id)?.name || '...'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 text-slate-400 rounded-xl">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tempo Limite</p>
                  <p className="text-slate-700 font-bold">{Math.floor(session.time_limit_seconds / 60)} minutos</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Questões</span>
                <span className="font-black text-slate-900">{questions?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuestionForm
        isOpen={isQuestionFormOpen}
        onClose={() => setIsQuestionFormOpen(false)}
        onSubmit={handleAddQuestion}
        isLoading={addQuestion.isPending}
      />
    </div>
  );
}
