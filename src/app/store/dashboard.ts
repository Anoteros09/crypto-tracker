import { create } from "zustand";
import { devtools } from "zustand/middleware";
const initialStore = {
  tableData: [],
  searchQuery: "",
  infoModalOpen: false,
  isLoading: true,
};

const api_key = process.env.NEXT_PUBLIC_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_CRYPTO_API_URL;

export const useDashboardStore = create(
  devtools(
    (set) => ({
      ...initialStore,
      setTableData: (tableData: any) => set({ tableData }),
      fetchTableData: async (currency: string) => {
        const response = await fetch(
          `${apiUrl}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              "x-cg-demo-api-key": api_key,
            },
          }
        );
        const data = await response.json();
        set({
          tableData: data,
        });
      },
      setSearchQuery: (searchQuery: string) => set({ searchQuery }),
      setInfoModalOpen: (infoModalOpen: Boolean) => set({ infoModalOpen }),
      setLoading: (isLoading: Boolean) => set({ isLoading }),
      resetStore: () => set({ ...initialStore }),
    }),
    { name: "dashboard" }
  )
);
