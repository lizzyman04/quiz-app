'use client';

import React from 'react';
import { Download, X } from 'lucide-react';
import { usePWAInstall } from '@/lib/hooks/usePWAInstall';

export const InstallPrompt = () => {
  const { showPrompt, promptInstall, dismissPrompt } = usePWAInstall();

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:bottom-6 md:right-6 md:left-auto md:w-96 animate-in slide-in-from-bottom-full duration-500">
      <div className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-3xl shadow-2xl p-6 relative overflow-hidden">
        <button 
          onClick={dismissPrompt}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-xl transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex gap-4 items-start pr-8">
          <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-100 flex-shrink-0">
            <Download className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-black text-slate-900">Instalar Quiz App</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Instale o aplicativo para usar offline e ter uma experiência melhor.
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={dismissPrompt}
            className="flex-1 px-4 py-3 bg-slate-50 text-slate-700 font-bold rounded-2xl hover:bg-slate-100 transition-colors"
          >
            Agora não
          </button>
          <button
            onClick={promptInstall}
            className="flex-1 px-4 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
          >
            Instalar
          </button>
        </div>
      </div>
    </div>
  );
};
