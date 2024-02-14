import { create } from "zustand";

interface UserState {
  user: any;
  loading: boolean;
  isUserLoggedIn: boolean;
  reload:boolean
  setUser: (payload: any) => void;
  setLoading: (payload: boolean) => void;
  setReload: (payload: boolean) => void;
  setIsUserLoggedIn: (payload: boolean) => void;
  
}

const useUserStore = create<UserState>((set) => {
  let initialUser = null;
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user");
    initialUser = userData ? userData : null;
  }
  return {
    user: initialUser,
    loading: false,
    isUserLoggedIn: false,
    reload:false,

    setUser: (payload) => set({ user: payload }),

    setLoading: (payload) => set({ loading: payload }),
    setReload: (payload) => set({ reload: payload }),
    setIsUserLoggedIn: (payload) => set({ isUserLoggedIn: payload }),
  };
});

// export const { user, setUser, setLoading } = useUserStore.getState();
export default useUserStore;
