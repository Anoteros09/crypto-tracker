"use client";
import React, { use, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "next/navigation";
import { Box, Paper } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { historicalArrayFormatter } from "@/app/utils/historicalDataFormatter";
import zIndex from "@mui/material/styles/zIndex";
import { grey } from "@mui/material/colors";
import LoadingAnimation from "@/app/Components/LoadingAnimation";

const apiUrl = process.env.NEXT_PUBLIC_CRYPTO_API_URL;
const api_key = process.env.NEXT_PUBLIC_API_KEY;

export default function crypto() {
  const params = useParams();
  const { id } = params;
  const [coinDetails, setCoinDetails] = useState({});
  const [coinDescription, setCoinDescription] = useState("");
  const [coinHistData, setCoinHistData] = useState([]);
  const [coinDetailFlags, setCoinDetailFlags] = useState({
    isSuccess: false,
    isError: false,
    isLoading: true,
  });
  const [coinHistDataFlags, setCoinHistDataFlags] = useState({
    isSuccess: false,
    isError: false,
    isLoading: true,
  });

  useEffect(() => {
    if (typeof id == "string" && id != "") {
      const fetchCoinInfo = async () => {
        try {
          const resp = await fetch(`${apiUrl}/coins/${id}`, {
            method: "GET",
            headers: {
              accept: "application/json",
              "x-cg-demo-api-key": api_key,
            },
          });
          const cryptoData = await resp.json();

          // Extract description up to the first period (.)
          const description = cryptoData.description.en.split(".")[0];
          setCoinDetails(cryptoData);
          setCoinDescription(description);
          setCoinDetailFlags({
            isSuccess: true,
            isError: false,
            isLoading: false,
          });
        } catch (error) {
          console.error("Error fetching Coin Details: ", error);
          setCoinDetailFlags({
            isSuccess: false,
            isError: true,
            isLoading: false,
          });
        }
      };
      fetchCoinInfo();
    }
  }, []);

  useEffect(() => {
    if (typeof id == "string" && id != "") {
      const fetchHistoricalData = async () => {
        try {
          const response = await fetch(
            `${apiUrl}/coins/${id}/market_chart?vs_currency=inr&days=1&precision=5`
          );
          const data = await response.json();
          const formattedData = historicalArrayFormatter(data.prices);
          console.log(formattedData);
          setCoinHistData(formattedData);
          setCoinHistDataFlags({
            isSuccess: true,
            isError: false,
            isLoading: false,
          });
        } catch (error) {
          console.error("Error fetching historical data:", error);
          setCoinHistDataFlags({
            isSuccess: false,
            isError: true,
            isLoading: false,
          });
        }
      };
      fetchHistoricalData();
    }
  }, []);
  return (
    <>
      {coinDetailFlags.isLoading || coinHistDataFlags.isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="container mt-5 d-flex justify-content-center">
          {coinDetailFlags.isSuccess ? (
            <Paper elevation={5}>
              <div className="card">
                <div className="flex">
                  <img
                    src={coinDetails.image.large}
                    className="card-img-top img-fluid"
                    alt=""
                    style={{ maxWidth: "200px" }}
                  />
                  {coinHistDataFlags.isSuccess ? (
                    <LineChart
                      style={{ backgroundColor: grey }}
                      resolveSizeBeforeRender={true}
                      dataset={coinHistData}
                      xAxis={[{ dataKey: "date", scaleType: "utc" }]}
                      series={[
                        {
                          dataKey: "price",
                          color: "#fdb462",
                          curve: "linear",
                          showMark: false,
                        },
                      ]}
                      height={200}
                      width={800}
                      margin={{ left: 80 }}
                    />
                  ) : null}
                </div>
                <div className="card-body">
                  <h1 className="card-title">{coinDetails.name}</h1>
                  <h5 className="card-text">{coinDescription}</h5>
                  <p className="card-text">
                    <b>Symbol:</b>
                    {coinDetails.symbol.toUpperCase()}
                  </p>
                  <p className="card-text">
                    <b>Rank:</b>
                    {coinDetails.market_cap_rank}
                  </p>
                  <p className="card-text">
                    <b>Market Cap:</b>
                    {coinDetails.market_data.market_cap.inr}
                  </p>
                  <p className="card-text">
                    <b>Current Price:</b>
                    {coinDetails.market_data.current_price.inr}
                  </p>
                  <p className="card-text">
                    <b>Total Supply:</b>
                    {coinDetails.market_data.total_supply}
                  </p>
                  <p className="card-text">
                    <b>Market Cap Change (24h):</b>
                    {coinDetails.market_data.market_cap_change_percentage_24h}%
                  </p>
                  <p className="card-text">
                    <b>High (24h):</b>
                    {coinDetails.market_data.high_24h.inr}
                  </p>
                  <p className="card-text">
                    <b>Low (24h):</b>
                    {coinDetails.market_data.low_24h.inr}
                  </p>
                  <p className="card-text">
                    <b>Total Volume (24h):</b>
                    {coinDetails.market_data.total_volume.inr}
                  </p>
                  <p className="card-text">
                    <b>Circulating Supply:</b>
                    {coinDetails.market_data.circulating_supply}
                  </p>
                </div>
              </div>
            </Paper>
          ) : null}
        </div>
      )}
    </>
  );
}
