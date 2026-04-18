'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  isLoading?: boolean;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title, value, icon: Icon, trend, isLoading
}) => {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-pulse">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 bg-slate-100 rounded-xl" />
        </div>
        <div className="h-4 bg-slate-100 rounded w-1/2 mb-2" />
        <div className="h-8 bg-slate-100 rounded w-1/3" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
            trend.isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
            {trend.isUp ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
    </div>
  );
};
