'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Search, Eye, Calendar, Play, CheckCircle, RotateCcw } from 'lucide-react';
import { useSessions, useClasses, useSubjects, useCreateSession, useDeleteSession, useUpdateSessionStatus } from '@/lib/api';
import { SessionForm, ConfirmDialog } from '@/components/dashboard';
import type { Session } from '@/lib/types';

const statusConfig = {
  draft: { label: 'Rascunho', color: 'bg-slate-100 text-slate-600' },
  active: { label: 'Ativa', color: 'bg-green-100 text-green-700' },
  completed: { label: 'Concluída', color: 'bg-blue-100 text-blue-700' },
};

export default function SessionsPage() {
  const { data: sessions, isLoading: isLoadingSessions } = useSessions();
  const { data: classes } = useClasses();
  const { data: subjects } = useSubjects();
  
  const createSession = useCreateSession();
  const deleteSession = useDeleteSession();
  const updateStatus = useUpdateSessionStatus();

  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingSession, setDeletingSession] = useState<Session | null>(null);

  const filteredSessions = sessions?.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const handleCreateSession = async (data: any) => {
    try {
      await createSession.mutateAsync({ ...data, status: 'draft' });
      setIsFormOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deletingSession) {
      try {
        await deleteSession.mutateAsync(deletingSession.id);
        setDeletingSession(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleStatusChange = async (id: number, status: 'draft' | 'active' | 'completed') => {
    try {
      await updateStatus.mutateAsync({ id, data: { status } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar sessões..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
        >
          <Plus className="w-5 h-5" /> Nova Sessão
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Título</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Turma / Disciplina</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tempo</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoadingSessions ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Carregando...</td></tr>
              ) : filteredSessions.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Nenhuma sessão encontrada.</td></tr>
              ) : filteredSessions.map((session) => {
                const config = statusConfig[session.status as keyof typeof statusConfig];
                return (
                  <tr key={session.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-slate-700">{session.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-700">{classes?.find(c => c.id === session.class_id)?.name}</p>
                      <p className="text-xs text-slate-400 font-medium">{subjects?.find(s => s.id === session.subject_id)?.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${config.color}`}>
                        {config.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-500">
                      {Math.floor(session.time_limit_seconds / 60)} min
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        {session.status === 'draft' && (
                          <button onClick={() => handleStatusChange(session.id, 'active')} className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all" title="Iniciar">
                            <Play className="w-5 h-5" />
                          </button>
                        )}
                        {session.status === 'active' && (
                          <button onClick={() => handleStatusChange(session.id, 'completed')} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Finalizar">
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                        {session.status === 'completed' && (
                          <button onClick={() => handleStatusChange(session.id, 'active')} className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all" title="Reabrir">
                            <RotateCcw className="w-5 h-5" />
                          </button>
                        )}
                        <Link href={`/dashboard/sessions/${session.id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Ver Detalhes">
                          <Eye className="w-5 h-5" />
                        </Link>
                        <button onClick={() => setDeletingSession(session)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" title="Excluir">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <SessionForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateSession}
        isLoading={createSession.isPending}
      />

      <ConfirmDialog
        isOpen={!!deletingSession}
        title="Excluir Sessão"
        message={`Tem certeza que deseja excluir a sessão "${deletingSession?.title}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingSession(null)}
        isLoading={deleteSession.isPending}
      />
    </div>
  );
}
