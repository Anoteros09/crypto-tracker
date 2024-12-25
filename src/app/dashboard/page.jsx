"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import InfoIconFooter from "../Components/InfoIconFooter";
import CustomModal from "../Components/CustomModal";
import { useAuth, useUser } from "@clerk/nextjs";
import { getCurrentURL, joinPaths } from "../utils/commFuncs";
import { Box, Paper, TextField } from "@mui/material";

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
const api_key = process.env.NEXT_PUBLIC_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_CRYPTO_API_URL;

export default function page() {
  const [data, setData] = useState([]);
  const apiRef = useGridApiRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const userData = useUser();
  const { isSignedIn, userId } = useAuth();

  const addUserToDb = async () => {
    const {
      user: {
        username,
        primaryEmailAddress: { emailAddress },
        id,
      },
    } = userData;
    const path = getCurrentURL();
    const url = joinPaths(path, "userinfo");
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ username, id, emailAddress }),
    });
  };
  const fetchUserFromDb = async () => {
    const path = getCurrentURL();
    const url = joinPaths(path, "userinfo?");
    const resp = await fetch(
      url +
        new URLSearchParams({
          id: userId,
        })
    );
    const data = await resp.json();
    if (data.length == 0) {
      addUserToDb();
    }
  };

  useEffect(() => {
    if (isSignedIn && userId) {
      fetchUserFromDb();
    }
  }, [isSignedIn, userId]);
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
            apiRef={apiRef}
            columns={colDefs}
            rows={filteredData}
            rowHeight={52}
            // autosizeOnMount={true}
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
