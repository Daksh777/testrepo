import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  date_joined: string;
  is_active: boolean;
  provider?: "google" | "credentials";
  token: string;
  refreshToken: string;
  pass_active?: boolean;
};

interface AuthStore {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "unmapt-storage",
    }
  )
);
