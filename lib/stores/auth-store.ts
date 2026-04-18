import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Teacher } from '@/lib/types';

interface AuthState {
  user: Teacher | null;
  isLoading: boolean;
  login: (teacher: Teacher) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: 'auth-storage' }
  )
);
