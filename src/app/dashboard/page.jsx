"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";
import InfoIconFooter from "../Components/InfoIconFooter";
import CustomModal from "../Components/CustomModal";
import { Box, Paper, TextField } from "@mui/material";
import { useDashboardStore } from "../store/dashboard";

const colDefs = [
  {
    field: "name",
    minWidth: 150,
    flex: 1,
    headerName: "Name",
    renderCell: (params) => {
      return (
        <Link
          href={`/crypto/${params.row.id}`}
          className="flex items-center"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <img
            src={params.row.image}
            className="rounded-circle mr-2"
            style={{ width: "30px", height: "30px" }}
          />
          <span>{params.value}</span>
        </Link>
      );
    },
  },

  {
    field: "symbol",
    minWidth: 150,
    flex: 1,
    headerName: "Symbol",
    valueFormatter: (value) => {
      if (value == null) {
        return "";
      }
      return value.toUpperCase();
    },
  },
  {
    field: "current_price",
    minWidth: 150,
    flex: 1,
    headerName: "Current Price",
    valueFormatter: (value) => {
      if (!value) {
        return value;
      }
      return `₹${value.toFixed(2)}`;
    },
  },
  {
    field: "market_cap",
    minWidth: 150,
    flex: 1,
    headerName: "Market Cap",
    valueFormatter: (value) => {
      if (!value) {
        return value;
      }
      return `₹${value.toLocaleString("en-US")}`;
    },
  },
  {
    field: "price_change_percentage_1h_in_currency",
    minWidth: 150,
    flex: 1,
    headerName: "1Hr Change",
    valueFormatter: (value) => {
      if (!value) {
        return value;
      }
      return `${value.toFixed(2)}%`;
    },
    cellClassName: (params) => {
      if (params.value == null) {
        return "";
      }

      return params.value > 0 ? "text-green-500" : "text-red-500";
    },
  },
  {
    field: "price_change_percentage_24h_in_currency",
    minWidth: 150,
    flex: 1,
    headerName: "24Hrs Change",
    valueFormatter: (value) => {
      if (!value) {
        return value;
      }
      return `${value.toFixed(2)}%`;
    },
    cellClassName: (params) => {
      if (params.value == null) {
        return "";
      }

      return params.value > 0 ? "text-green-500" : "text-red-500";
    },
  },
  {
    field: "price_change_percentage_7d_in_currency",
    minWidth: 150,
    flex: 1,
    headerName: "7Day Change",
    valueFormatter: (value) => {
      if (!value) {
        return value;
      }
      return `${value.toFixed(2)}%`;
    },
    cellClassName: (params) => {
      if (params.value == null) {
        return "";
      }

      return params.value > 0 ? "text-green-500" : "text-red-500";
    },
  },
];

export default function Page() {
  const tableData = useDashboardStore((state) => state.tableData);
  const fetchTableData = useDashboardStore((state) => state.fetchTableData);
  const searchQuery = useDashboardStore((state) => state.searchQuery);
  const setSearchQuery = useDashboardStore((state) => state.setSearchQuery);
  const infoModalOpen = useDashboardStore((state) => state.infoModalOpen);
  const setInfoModalOpen = useDashboardStore((state) => state.setInfoModalOpen);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = tableData.filter((crypto) => {
    return crypto.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  useEffect(() => {
    fetchTableData();
  }, []);
  return (
    <>
      <Paper className="md:w-[75%] w-[90%] mx-auto h-[100%] bg-gray-100 p-2 mt-10">
        <TextField
          className=" bg-white rounded mb-5"
          type="text"
          id="outlined-basic"
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          placeholder="Search crypto name"
          fullWidth
        />
        <Box className="w-[100%] h-[630px]">
          <DataGrid
            columns={colDefs}
            rows={filteredData}
            rowHeight={52}
            disableVirtualization={true}
            slots={{
              footer: InfoIconFooter,
            }}
            slotProps={{
              footer: { setInfoModalOpen },
            }}
            pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            sx={{ border: 0 }}
          />
        </Box>
      </Paper>
      <CustomModal
        open={infoModalOpen}
        setOpen={setInfoModalOpen}
        titleText="Info"
        bodyText="Click on the Coin's Name to get detail info about the coin!"
      />
    </>
  );
}
