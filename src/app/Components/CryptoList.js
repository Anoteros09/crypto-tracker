"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";

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

const CryptoTracker = () => {
  const [data, setData] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_CRYPTO_API_URL;
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api_key = process.env.NEXT_PUBLIC_API_KEY;
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
        <Paper sx={{ height: "630px", width: "100%" }}>
          <DataGrid
            columns={colDefs}
            rows={filteredData}
            pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            sx={{ border: 0 }}
          />
        </Paper>

        {/* <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Symbol</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Market Cap</TableCell>
                <TableCell align="left">1h Change</TableCell>
                <TableCell align="left">24h Change</TableCell>
                <TableCell align="left">7D Change</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredData
              ).map((crypto) => (
                <TableRow key={crypto.id}>
                  <TableCell>
                    <Link
                      href={`/crypto/${crypto.id}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <img
                        src={crypto.image}
                        alt={crypto.name}
                        className="rounded-circle mr-2"
                        style={{ width: "30px", height: "30px" }}
                      />
                      {crypto.name}
                    </Link>
                  </TableCell>
                  <TableCell>{crypto.symbol.toUpperCase()}</TableCell>
                  <TableCell>₹{crypto.current_price.toFixed(2)}</TableCell>
                  <TableCell>
                    ₹{crypto.market_cap.toLocaleString("en-US")}
                  </TableCell>
                  <TableCell
                    style={{
                      color:
                        crypto.price_change_percentage_1h_in_currency < 0
                          ? "red"
                          : "green",
                    }}
                  >
                    {Number(
                      crypto.price_change_percentage_1h_in_currency
                    ).toFixed(2)}
                    %
                  </TableCell>
                  <TableCell
                    style={{
                      color:
                        crypto.price_change_percentage_24h_in_currency < 0
                          ? "red"
                          : "green",
                    }}
                  >
                    {Number(
                      crypto.price_change_percentage_24h_in_currency
                    ).toFixed(2)}
                    %
                  </TableCell>
                  <TableCell
                    style={{
                      color:
                        crypto.price_change_percentage_7d_in_currency < 0
                          ? "red"
                          : "green",
                    }}
                  >
                    {Number(
                      crypto.price_change_percentage_7d_in_currency
                    ).toFixed(2)}
                    %
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={filteredData.length}
                  rowsPerPage={10}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer> */}
        {/* <table className="table border-solid border-2 border-sky-500">
          <thead className="bg-dark">
            <tr>
              <th className="bg-info">Name</th>
              <th className="bg-info">Symbol</th>
              <th className="bg-info">Price</th>
              <th className="bg-info">Market Cap</th>
              <th className="bg-info">1h change</th>
              <th className="bg-info">24h change</th>
              <th className="bg-info">7D Change</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((crypto) => (
              <tr key={crypto.id}>
                <td>
                  <Link
                    href={`/crypto/${crypto.id}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <img
                      src={crypto.image}
                      alt={crypto.name}
                      className="rounded-circle mr-2"
                      style={{ width: "30px", height: "30px" }}
                    />
                    {crypto.name}
                  </Link>
                </td>
                <td>{crypto.symbol.toUpperCase()}</td>
                <td>₹{crypto.current_price.toFixed(2)}</td>
                <td>₹{crypto.market_cap.toLocaleString("en-US")}</td>
                <td
                  style={{
                    color:
                      crypto.price_change_percentage_1h_in_currency < 0
                        ? "red"
                        : "green",
                  }}
                >
                  {Number(
                    crypto.price_change_percentage_1h_in_currency
                  ).toFixed(2)}
                  %
                </td>
                <td
                  style={{
                    color:
                      crypto.price_change_percentage_24h_in_currency < 0
                        ? "red"
                        : "green",
                  }}
                >
                  {Number(
                    crypto.price_change_percentage_24h_in_currency
                  ).toFixed(2)}
                  %
                </td>
                <td
                  style={{
                    color:
                      crypto.price_change_percentage_7d_in_currency < 0
                        ? "red"
                        : "green",
                  }}
                >
                  {Number(
                    crypto.price_change_percentage_7d_in_currency
                  ).toFixed(2)}
                  %
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </>
  );
};

export default CryptoTracker;
