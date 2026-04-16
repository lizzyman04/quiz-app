'use client';

import React from 'react';
import { WifiOff } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="flex flex-col items-center space-y-6 text-center">
        <div className="bg-blue-50 p-6 rounded-full">
          <WifiOff className="w-16 h-16 text-blue-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Você está offline
        </h1>
        
        <p className="text-lg text-gray-600 max-w-md">
          Parece que você perdeu a conexão com a internet. Verifique sua rede para continuar usando o Quiz App.
        </p>
        
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
