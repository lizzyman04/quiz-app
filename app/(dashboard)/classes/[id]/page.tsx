'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, UserPlus, GraduationCap, Edit2 } from 'lucide-react';
import { useStudentsByClass } from '@/lib/api';
import * as svc from '@/lib/services';
import { useQuery } from '@tanstack/react-query';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ClassDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const cid = parseInt(id);
  const router = useRouter();

  const { data: cls, isLoading: isLoadingClass } = useQuery({
    queryKey: ['classes', cid],
    queryFn: () => svc.getClassById(cid)
  });

  const { data: students, isLoading: isLoadingStudents } = useStudentsByClass(cid);

  if (isLoadingClass) return <div className="p-8 text-center text-slate-400">Carregando detalhes...</div>;
  if (!cls) return <div className="p-8 text-center text-red-500">Turma não encontrada.</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h2 className="text-3xl font-black text-slate-900">{cls.name}</h2>
            <p className="text-slate-500 font-medium">Gerenciamento de Alunos</p>
          </div>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-700 font-bold rounded-2xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-all">
            <Edit2 className="w-4 h-4" /> Editar
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.98]">
            <UserPlus className="w-5 h-5" /> Adicionar Aluno
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Alunos Matriculados</h3>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">
                {students?.length || 0} Total
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/30 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Nome</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Código</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {isLoadingStudents ? (
                    <tr><td colSpan={2} className="px-6 py-8 text-center text-slate-400">Carregando alunos...</td></tr>
                  ) : !students || students.length === 0 ? (
                    <tr><td colSpan={2} className="px-6 py-8 text-center text-slate-400">Nenhum aluno cadastrado nesta turma.</td></tr>
                  ) : students.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                            <GraduationCap className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-slate-700">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-slate-500">{student.student_code}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Informações</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Data de Criação</p>
                <p className="text-slate-700 font-medium">{new Date(cls.created_at).toLocaleDateString('pt-BR')}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">ID do Sistema</p>
                <p className="text-slate-700 font-medium">#{cls.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
