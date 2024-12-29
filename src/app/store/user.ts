import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getCurrentURL, joinPaths } from "../utils/commFuncs";

type User = {
  userName: string;
  email: string;
  userId: string;
  isSignedIn: boolean;
  userBookmarks: string[];
  userPortfolio: string[];
};

const initialUser: User = {
  userName: "",
  email: "",
  userId: "",
  isSignedIn: false,
  userBookmarks: [],
  userPortfolio: [],
};

export const useUserStore = create(
  devtools(
    (set) => ({
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
      fetchUserData: async (userId: string) => {
        const path = getCurrentURL();
        const url = joinPaths(path, "userinfo?");
        const resp = await fetch(
          url +
            new URLSearchParams({
              id: userId,
            })
        );
        const data = await resp.json();
        set((state: any) => ({
          userData: {
            ...state.userData,
            userBookmarks: data[0].user_bookmarks,
            userPortfolio: data[0].user_portfolio,
          },
        }));
      },
      resetUserData: () => set({ userData: initialUser }),
    }),
    { name: "user" }
  )
);
