import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  username: string;
  isVerified: string;
  role: "admin" | "user" | "guest"
}

interface AuthStore {
  user: User | null;
  setAuth: (user: User) => void;
  clearAuth: () => void;
}


export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,

      setAuth: (user) => set({ user }),

      clearAuth: () => set({ user: null }),
    }),
    {
      name: "user",
    }
  )
);