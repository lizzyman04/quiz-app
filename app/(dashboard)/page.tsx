'use client';

import React from 'react';
import { Users, GraduationCap, Calendar, HelpCircle } from 'lucide-react';
import { StatsCard } from '@/components/dashboard';

export default function DashboardHome() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total de Turmas" 
          value="12" 
          icon={Users} 
          trend={{ value: 8, isUp: true }}
        />
        <StatsCard 
          title="Total de Alunos" 
          value="342" 
          icon={GraduationCap} 
          trend={{ value: 12, isUp: true }}
        />
        <StatsCard 
          title="Sessões Ativas" 
          value="5" 
          icon={Calendar} 
        />
        <StatsCard 
          title="Questões Cadastradas" 
          value="1,240" 
          icon={HelpCircle} 
          trend={{ value: 4, isUp: true }}
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
