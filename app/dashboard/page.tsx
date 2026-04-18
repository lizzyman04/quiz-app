'use client';

import React from 'react';
import { Users, GraduationCap, Calendar, HelpCircle } from 'lucide-react';
import { StatsCard } from '@/components/dashboard';
import { useClasses, useStudents, useSessions } from '@/lib/api';
import * as svc from '@/lib/services';
import { useQueries } from '@tanstack/react-query';

export default function DashboardHome() {
  const { data: classes, isLoading: isLoadingClasses } = useClasses();
  const { data: students, isLoading: isLoadingStudents } = useStudents();
  const { data: sessions, isLoading: isLoadingSessions } = useSessions();

  // Fetch questions count for each session to get total questions
  const sessionQuestionsQueries = useQueries({
    queries: (sessions || []).map(session => ({
      queryKey: ['questions', session.id],
      queryFn: () => svc.getSessionQuestions(session.id),
      enabled: !!sessions,
    }))
  });

  const isLoadingQuestions = sessionQuestionsQueries.some(q => q.isLoading);
  const totalQuestions = sessionQuestionsQueries.reduce((acc, q) => acc + (q.data?.length || 0), 0);
  const activeSessions = sessions?.filter(s => s.status === 'active').length || 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total de Turmas" 
          value={classes?.length || 0} 
          icon={Users} 
          isLoading={isLoadingClasses}
        />
        <StatsCard 
          title="Total de Alunos" 
          value={students?.length || 0} 
          icon={GraduationCap} 
          isLoading={isLoadingStudents}
        />
        <StatsCard 
          title="Sessões Ativas" 
          value={activeSessions} 
          icon={Calendar} 
          isLoading={isLoadingSessions}
        />
        <StatsCard 
          title="Questões Cadastradas" 
          value={totalQuestions} 
          icon={HelpCircle} 
          isLoading={isLoadingSessions || isLoadingQuestions}
        />
      </div>

      <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-4">Bem-vindo, Professor!</h3>
        <p className="text-slate-500 leading-relaxed">
          Este é o seu novo painel de controle. Aqui você poderá gerenciar suas turmas, 
          acompanhar o progresso dos alunos e criar novas sessões de quiz, mesmo sem conexão com a internet.
        </p>
      </section>
    </div>
  );
}
