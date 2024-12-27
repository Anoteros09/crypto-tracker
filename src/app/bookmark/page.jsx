"use client";
import { useAuth } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import { getCurrentURL } from "../utils/commFuncs";
import { LinearProgress } from "@mui/material";

const BookmarkGrid = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isSignedIn, userId } = useAuth();

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const path = getCurrentURL();
        const response = await fetch(`${path}/bookmarks/data?userId=${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON response
        setBookmarks(data); // Assuming API returns an array of bookmarks
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
        setError("Failed to load bookmarks. Please try again later.");
        setLoading(false);
      }
    };
    if (isSignedIn) {
      fetchBookmarks();
    }
  }, [isSignedIn, userId]);

  if (error) {
    return <p>{error}</p>;
  }

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
        bookmarks.map((bookmark, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col items-center space-y-4 hover:shadow-lg transition-shadow duration-200"
          >
            {/* Coin Image */}
            <img
              src={bookmark.image}
              alt={bookmark.name}
              className="w-16 h-16 object-contain"
            />

            {/* Coin Title */}
            <h3 className="text-lg font-semibold text-gray-800">
              {bookmark.name}
            </h3>

            {/* Current Price */}
            <p className="text-sm text-gray-600">
              Current Price:{" "}
              <span className="font-bold text-gray-800">
                ${bookmark.current_price.toFixed(2)}
              </span>
            </p>

            {/* 1 Day Change */}
            <p
              className={`text-sm font-semibold ${
                bookmark.price_change_percentage_24h >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              1 Day Change:{" "}
              {bookmark.price_change_percentage_24h >= 0 ? "+" : ""}
              {bookmark.price_change_percentage_24h.toFixed(2)}%
            </p>

            {/* Placeholder for Trend Chart */}
            <div className="w-full h-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-500 text-xs">
              Trend Chart
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookmarkGrid;
