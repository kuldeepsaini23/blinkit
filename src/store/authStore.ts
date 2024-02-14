"use client";

import { create } from "zustand";

interface AuthState {
  email: any;
  loading: boolean;
  token: any;

  setEmail: (payload: any) => void;
  setLoading: (payload: boolean) => void;
  setToken: (payload: any) => void;
}

const useAuthStore = create<AuthState>((set) => {
  let initialToken = null;

  if (typeof window !== "undefined") {
    const tokenFromLocalStorage = localStorage.getItem("token");
    initialToken = tokenFromLocalStorage ? tokenFromLocalStorage : null;
  }

  return {
    email: "",
    loading: false,
    token: initialToken,
  


    setEmail: (payload) => set({ email: payload }),

    setLoading: (payload) => set({ loading: payload }),

    setToken: (payload) => {
      set({ token: payload });
    },

  };
});


export default useAuthStore;
