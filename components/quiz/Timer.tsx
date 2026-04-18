'use client';

import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  totalSeconds: number;
  onTimeUp: () => void;
  isRunning?: boolean;
}

export const Timer: React.FC<TimerProps> = ({ totalSeconds, onTimeUp, isRunning = true }) => {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isCritical = timeLeft < 30;

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono font-bold text-lg transition-colors ${
      isCritical ? 'bg-red-50 text-red-500 animate-pulse' : 'bg-slate-50 text-slate-700'
    }`}>
      <Clock className={`w-5 h-5 ${isCritical ? 'text-red-500' : 'text-slate-400'}`} />
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};
