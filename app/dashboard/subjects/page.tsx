'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Search, BookOpen } from 'lucide-react';
import { useSubjects, useCreateSubject, useDeleteSubject } from '@/lib/api';
import { SubjectForm, ConfirmDialog } from '@/components/dashboard';
import type { Subject } from '@/lib/types';

export default function SubjectsPage() {
  const { data: subjects, isLoading } = useSubjects();
  const createSubject = useCreateSubject();
  const deleteSubject = useDeleteSubject();

  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingSubject, setDeletingSubject] = useState<Subject | null>(null);

  const filteredSubjects = subjects?.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const handleFormSubmit = async (name: string) => {
    try {
      await createSubject.mutateAsync({ name });
      setIsFormOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deletingSubject) {
      try {
        await deleteSubject.mutateAsync(deletingSubject.id);
        setDeletingSubject(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar disciplinas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
        >
          <Plus className="w-5 h-5" /> Nova Disciplina
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={2} className="px-6 py-8 text-center text-slate-400">Carregando...</td></tr>
              ) : filteredSubjects.length === 0 ? (
                <tr><td colSpan={2} className="px-6 py-8 text-center text-slate-400">Nenhuma disciplina encontrada.</td></tr>
              ) : filteredSubjects.map((sub) => (
                <tr key={sub.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-slate-700">{sub.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setDeletingSubject(sub)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SubjectForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        isLoading={createSubject.isPending}
      />

      <ConfirmDialog
        isOpen={!!deletingSubject}
        title="Excluir Disciplina"
        message={`Tem certeza que deseja excluir a disciplina "${deletingSubject?.name}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingSubject(null)}
        isLoading={deleteSubject.isPending}
      />
    </div>
  );
}
