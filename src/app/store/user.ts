import { create } from "zustand";

type User = {
  userName: string;
  email: string;
  userId: string;
  isSignedIn: boolean;
  userBookMarks: string[];
  userPorfolio: string[];
};

const initialUser: User = {
  userName: "",
  email: "",
  userId: "",
  isSignedIn: false,
  userBookMarks: [],
  userPorfolio: [],
};

export const useUserStore = create((set) => ({
  userData: initialUser,
  setUser: (newUser: any) =>
    set((state: any) => ({
      userData: { ...state.userData, ...newUser },
    })),
  updateUserData: (newData: any) =>
    set((state: any) => ({
      userData: {
        ...state.userData,
        ...newData,
      },
    })),
  resetUserData: () => set({ userData: initialUser }),
}));
