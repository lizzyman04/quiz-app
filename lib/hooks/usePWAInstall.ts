'use client';

import { useState, useEffect } from 'react';

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsInstalled(isStandalone);
    if (isStandalone) return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
      
      const dismissedUntil = localStorage.getItem('pwa-prompt-dismissed-until');
      if (!dismissedUntil || Date.now() > parseInt(dismissedUntil)) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem('pwa-prompt-dismissed-until', String(Date.now() + sevenDays));
  };

  return { isInstallable, isInstalled, showPrompt, promptInstall, dismissPrompt };
}
