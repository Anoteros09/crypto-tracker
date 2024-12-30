import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialGlobal = {
  currency: "inr",
};

export const useGlobalStore = create(
  devtools((set: any) => ({
    globalValues: initialGlobal,
    setGlobalValues: (newValues: any) =>
      set((state: any) => ({
        globalValues: { ...state.globalValues, ...newValues },
      })),
    resetGlobalValues: () => set({ globalValues: initialGlobal }),
  }))
);
