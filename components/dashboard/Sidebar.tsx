'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, GraduationCap, 
  BookOpen, Calendar, X, LogOut, User 
} from 'lucide-react';
import { useUIStore } from '@/lib/stores';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Turmas', href: '/dashboard/classes', icon: Users },
  { label: 'Alunos', href: '/dashboard/students', icon: GraduationCap },
  { label: 'Disciplinas', href: '/dashboard/subjects', icon: BookOpen },
  { label: 'Sessões', href: '/dashboard/sessions', icon: Calendar },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside className={sidebarClasses}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between">
            <h1 className="text-2xl font-black text-slate-900">
              Quiz <span className="text-blue-600">App</span>
            </h1>
            <button onClick={toggleSidebar} className="p-2 text-slate-500 lg:hidden">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => sidebarOpen && toggleSidebar()}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 mt-auto border-t border-slate-100">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <User className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">Professor</p>
                <p className="text-xs text-slate-500 truncate">admin@quiz.app</p>
              </div>
              <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
