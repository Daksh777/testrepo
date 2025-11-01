import { create } from "zustand";
import { User } from "./authStore";
import { createJSONStorage, persist } from "zustand/middleware";

interface AdminAuthStore {
  admin: User | null;
  setAdmin: (admin: User | null) => void;
}

export const useAdminAuthStore = create<AdminAuthStore>()(
  persist(
    (set) => ({
      admin: null,
      setAdmin: (admin) => set({ admin }),
    }),
    {
      name: "unmapt-admin-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
