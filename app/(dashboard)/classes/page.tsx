'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Search, Users } from 'lucide-react';
import { useClasses, useCreateClass, useUpdateClass, useDeleteClass } from '@/lib/api';
import { ClassForm, ConfirmDialog } from '@/components/dashboard';
import type { Class } from '@/lib/types';

export default function ClassesPage() {
  const { data: classes, isLoading } = useClasses();
  const createClass = useCreateClass();
  const updateClass = useUpdateClass();
  const deleteClass = useDeleteClass();

  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [deletingClass, setDeletingClass] = useState<Class | null>(null);

  const filteredClasses = classes?.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const handleFormSubmit = async (name: string) => {
    try {
      if (editingClass) {
        await updateClass.mutateAsync({ id: editingClass.id, data: { name } });
      } else {
        await createClass.mutateAsync({ name });
      }
      setIsFormOpen(false);
      setEditingClass(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deletingClass) {
      try {
        await deleteClass.mutateAsync(deletingClass.id);
        setDeletingClass(null);
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
            placeholder="Buscar turmas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <button
          onClick={() => { setEditingClass(null); setIsFormOpen(true); }}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
        >
          <Plus className="w-5 h-5" /> Nova Turma
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
              ) : filteredClasses.length === 0 ? (
                <tr><td colSpan={2} className="px-6 py-8 text-center text-slate-400">Nenhuma turma encontrada.</td></tr>
              ) : filteredClasses.map((cls) => (
                <tr key={cls.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/dashboard/classes/${cls.id}`} className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-slate-700">{cls.name}</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => { setEditingClass(cls); setIsFormOpen(true); }}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setDeletingClass(cls)}
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

      <ClassForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingClass}
        isLoading={createClass.isPending || updateClass.isPending}
      />

      <ConfirmDialog
        isOpen={!!deletingClass}
        title="Excluir Turma"
        message={`Tem certeza que deseja excluir a turma "${deletingClass?.name}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingClass(null)}
        isLoading={deleteClass.isPending}
      />
    </div>
  );
}
