import { create } from 'zustand';
import { onNetworkChange } from '@/lib/utils/network';

interface SyncState {
  isOnline: boolean;
  isSyncing: boolean;
  pendingScores: number;
  pendingMutations: number;
  lastSyncAt: string | null;
  setOnline: (online: boolean) => void;
  setSyncing: (syncing: boolean) => void;
  setPendingCounts: (scores: number, mutations: number) => void;
  markSynced: () => void;
}

export const useSyncStore = create<SyncState>((set) => {
  if (typeof window !== 'undefined') {
    onNetworkChange((online) => set({ isOnline: online }));
  }

  return {
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    isSyncing: false,
    pendingScores: 0,
    pendingMutations: 0,
    lastSyncAt: null,
    setOnline: (online) => set({ isOnline: online }),
    setSyncing: (syncing) => set({ isSyncing: syncing }),
    setPendingCounts: (scores, mutations) => set({ pendingScores: scores, pendingMutations: mutations }),
    markSynced: () => set({ lastSyncAt: new Date().toISOString() }),
  };
});
