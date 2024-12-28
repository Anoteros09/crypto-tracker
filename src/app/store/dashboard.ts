import { create } from "zustand";

const initialStore = {
  tableData: [],
  searchQuery: "",
  infoModalOpen: false,
};

const api_key = process.env.NEXT_PUBLIC_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_CRYPTO_API_URL;

export const useDashboardStore = create((set) => ({
  ...initialStore,
  setTableData: (tableData: any) => set({ tableData }),
  fetchTableData: async () => {
    const response = await fetch(
      `${apiUrl}/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": api_key,
        },
      }
    );
    const data = await response.json();
    set({ tableData: data });
  },
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  setInfoModalOpen: (infoModalOpen: Boolean) => set({ infoModalOpen }),
  resetStore: () => set({ ...initialStore }),
}));
