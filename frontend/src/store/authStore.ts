import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AccountUser = { name: string; email: string };

type AuthState = {
  user: AccountUser | null;
  signIn: (user: AccountUser) => void;
  signOut: () => void;
};

// DEMO: there is no backend yet, so "signing in" only remembers a name and email on this device.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      signIn: (user) => set({ user }),
      signOut: () => set({ user: null }),
    }),
    { name: 'daylight-pantry-account' },
  ),
);
