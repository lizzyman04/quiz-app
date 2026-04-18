'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar, Header } from '@/components/dashboard';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Map pathname to title
  const getTitle = () => {
    switch (pathname) {
      case '/dashboard': return 'Início';
      case '/dashboard/classes': return 'Turmas';
      case '/dashboard/students': return 'Alunos';
      case '/dashboard/subjects': return 'Disciplinas';
      case '/dashboard/sessions': return 'Sessões';
      default: return 'Painel';
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header title={getTitle()} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
