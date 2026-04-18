'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Search, GraduationCap, Filter } from 'lucide-react';
import { useStudents, useClasses, useCreateStudent, useDeleteStudent } from '@/lib/api';
import { StudentForm, ConfirmDialog } from '@/components/dashboard';
import type { Student } from '@/lib/types';

export default function StudentsPage() {
  const { data: students, isLoading: isLoadingStudents } = useStudents();
  const { data: classes } = useClasses();
  const createStudent = useCreateStudent();
  const deleteStudent = useDeleteStudent();

  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);

  const filteredStudents = students?.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                         s.student_code.toLowerCase().includes(search.toLowerCase());
    const matchesClass = classFilter === 'all' || s.class_id === parseInt(classFilter);
    return matchesSearch && matchesClass;
  }) || [];

  const handleFormSubmit = async (data: { name: string; student_code: string; class_id: number }) => {
    try {
      await createStudent.mutateAsync(data);
      setIsFormOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deletingStudent) {
      try {
        await deleteStudent.mutateAsync(deletingStudent.id);
        setDeletingStudent(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getClassName = (id: number) => {
    return classes?.find(c => c.id === id)?.name || 'N/A';
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou código..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="pl-12 pr-10 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none font-medium text-slate-600"
            >
              <option value="all">Todas as Turmas</option>
              {classes?.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-[0.98] w-full lg:w-auto justify-center"
        >
          <Plus className="w-5 h-5" /> Novo Aluno
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Aluno</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Código</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Turma</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoadingStudents ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400">Carregando...</td></tr>
              ) : filteredStudents.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400">Nenhum aluno encontrado.</td></tr>
              ) : filteredStudents.map((student) => (
                <tr key={student.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-slate-700">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-slate-500">
                    {student.student_code}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
                      {getClassName(student.class_id)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setDeletingStudent(student)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <StudentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        isLoading={createStudent.isPending}
      />

      <ConfirmDialog
        isOpen={!!deletingStudent}
        title="Excluir Aluno"
        message={`Tem certeza que deseja excluir o aluno "${deletingStudent?.name}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingStudent(null)}
        isLoading={deleteStudent.isPending}
      />
    </div>
  );
}
