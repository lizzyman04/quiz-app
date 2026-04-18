'use client';

import React from 'react';
import { Menu, UserCircle } from 'lucide-react';
import { useUIStore } from '@/lib/stores';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { toggleSidebar } = useUIStore();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-slate-100 lg:px-8 h-20">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 text-slate-500 bg-slate-50 rounded-xl lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">{title}</h2>
      </div>

      <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-2xl">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-slate-900 leading-none">Professor</p>
          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-1">Administrador</p>
        </div>
        <UserCircle className="w-8 h-8 text-blue-500" />
      </div>
    </header>
  );
};
