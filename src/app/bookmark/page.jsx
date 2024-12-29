"use client";
import React, { useState, useEffect } from "react";
import { LinearProgress } from "@mui/material";
import { useDashboardStore } from "../store/dashboard";
import { useUserStore } from "../store/user";
import { SparkLineChart } from "@mui/x-charts";
import { blue } from "@mui/material/colors";

const BookmarkGrid = () => {
  const bookmarks = useUserStore((state) => state.userData.userBookmarks);
  const isSignedIn = useUserStore((state) => state.userData.isSignedIn);
  const coinsData = useDashboardStore((state) => state.tableData);
  const fetchTableData = useDashboardStore((state) => state.fetchTableData);
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (coinsData.length === 0) {
        fetchTableData();
      } else {
        setCardData(coinsData.filter((coin) => bookmarks.includes(coin.id)));
      }
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
      setLoading(false);
    } finally {
      if (isSignedIn && coinsData.length > 0) {
        setLoading(false);
      }
    }
  }, [coinsData, bookmarks]);

  if (loading) {
    return <LinearProgress color="primary" />;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {bookmarks.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center space-y-4 bg-gray-50 p-6 rounded-md shadow-md">
          {/* Bookmark Not Found Message */}
          <p className="text-center text-lg font-semibold text-gray-600">
            Bookmark not found
          </p>

          {/* Instructions for Bookmarking */}
          <p className="text-center text-sm text-gray-500">
            Please bookmark coins to view them on this page. Head over to the
            dashboard and add coins to your bookmark list.
          </p>

          {/* Redirect Button */}
          <a
            href="/dashboard"
            className="inline-block bg-blue-500 text-white font-medium text-sm px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-200"
          >
            Go to Dashboard
          </a>
        </div>
      ) : (
        cardData.map((coin, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col items-center space-y-4 hover:shadow-lg transition-shadow duration-200 max-w-[500px] min-w-[300px] mx-auto"
          >
            {/* Coin Image */}
            <img
              src={coin.image}
              alt={coin.name}
              className="w-16 h-16 object-contain"
            />

            {/* Coin Title */}
            <h3 className="text-lg font-semibold text-gray-800">{coin.name}</h3>

            {/* Current Price */}
            <p className="text-sm text-gray-600">
              Current Price:{" "}
              <span className="font-bold text-gray-800">
                ${coin.current_price}
              </span>
            </p>

            {/* Current Price */}
            <p className="text-sm text-gray-600">
              Market Cap:{" "}
              <span className="font-bold text-gray-800">
                ${coin.market_cap.toFixed(2)}
              </span>
            </p>

            {/* Current Price */}
            <p className="text-sm text-gray-600">
              Today's High:{" "}
              <span className="font-bold text-gray-800">${coin.high_24h}</span>
            </p>

            {/* Current Price */}
            <p className="text-sm text-gray-600">
              Today's Low:{" "}
              <span className="font-bold text-gray-800">${coin.low_24h}</span>
            </p>

            {/* 1 Day Change */}
            <p
              className={`text-sm font-semibold ${
                coin.price_change_percentage_24h >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              1 Day Change: {coin.price_change_percentage_24h >= 0 ? "+" : ""}
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>

            {/* Sparkline Chart */}
            <div className="w-full bg-gray-100 rounded-md flex items-center justify-center text-gray-500 text-xs">
              <SparkLineChart
                data={coin.sparkline_in_7d.price}
                height={150}
                colors={[blue[800]]}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookmarkGrid;
