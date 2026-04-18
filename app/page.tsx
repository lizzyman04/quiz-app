'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, Users, LayoutDashboard, PlayCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Quiz <span className="text-blue-600">App</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium">
            Teste seus conhecimentos offline
          </p>
        </header>

        <div className="grid gap-4 w-full">
          <Link 
            href="/dashboard"
            className="group relative flex flex-col items-center p-8 bg-white rounded-3xl border-2 border-slate-100 shadow-sm hover:border-blue-500 hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 active:scale-[0.98]"
          >
            <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Sou Professor</h2>
            <p className="text-slate-500 text-sm mt-2">
              Gerencie turmas, crie quizzes e acompanhe resultados.
            </p>
            <div className="mt-4 flex items-center text-blue-600 font-bold text-sm">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Acessar Painel
            </div>
          </Link>

          <Link 
            href="/play/join"
            className="group relative flex flex-col items-center p-8 bg-white rounded-3xl border-2 border-slate-100 shadow-sm hover:border-blue-500 hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 active:scale-[0.98]"
          >
            <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Sou Aluno</h2>
            <p className="text-slate-500 text-sm mt-2">
              Entre em uma sessão e responda as questões.
            </p>
            <div className="mt-4 flex items-center text-blue-600 font-bold text-sm">
              <PlayCircle className="w-4 h-4 mr-2" />
              Entrar no Quiz
            </div>
          </Link>
        </div>

        <footer className="pt-8">
          <p className="text-slate-400 text-xs">
            &copy; {new Date().getFullYear()} Quiz App &bull; Offline First PWA
          </p>
        </footer>
      </div>
    </div>
  );
}
