import { create } from "zustand";

interface LoginStore {
  isLoginOpen: boolean;
  setIsLoginOpen: (isLoginOpen: boolean) => void;
  isSignupOpen: boolean;
  setIsSignupOpen: (isSignupOpen: boolean) => void;
  isForgotPasswordOpen: boolean;
  setIsForgotPasswordOpen: (isForgotPasswordOpen: boolean) => void;
}

export const useLoginStore = create<LoginStore>((set) => ({
  isLoginOpen: false,
  setIsLoginOpen: (isLoginOpen) => set({ isLoginOpen }),
  isSignupOpen: false,
  setIsSignupOpen: (isSignupOpen) => set({ isSignupOpen }),
  isForgotPasswordOpen: false,
  setIsForgotPasswordOpen: (isForgotPasswordOpen) =>
    set({ isForgotPasswordOpen }),
}));
