"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import InfoIconFooter from "./InfoIconFooter";
import CustomModal from "./CustomModal";

const colDefs = [
  {
    field: "name",
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
const api_key = process.env.NEXT_PUBLIC_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_CRYPTO_API_URL;

const CryptoTracker = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((crypto) => {
    return crypto.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <div className="container p-5">
        <input
          type="text"
          placeholder="Search crypto name"
          className="form-control mb-4"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Paper sx={{ height: "630px", width: "100%" }} elevation={5}>
          <DataGrid
            columns={colDefs}
            rows={filteredData}
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
        </Paper>
        <CustomModal
          open={infoModalOpen}
          setOpen={setInfoModalOpen}
          titleText="Info"
          bodyText="Click on the Coin's Name to get detail info about the coin!"
        />
      </div>
    </>
  );
};

export default CryptoTracker;
