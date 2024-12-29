"use client";
import React, { use, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  LinearProgress,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { blue } from "@mui/material/colors";
import historicalArrayFormatter from "../../utils/historicalDataFormatter";
import { useUser } from "@clerk/nextjs";
import { createTheme, ThemeProvider } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import ColorThief from "colorthief";
import { getCurrentURL, joinPaths } from "../../utils/commFuncs";
import { useUserStore } from "../../store/user";

const apiUrl = process.env.NEXT_PUBLIC_CRYPTO_API_URL;
const api_key = process.env.NEXT_PUBLIC_API_KEY;
const theme = createTheme({
  palette: {
    secondary: {
      main: "#1e3a8a",
    },
  },
});

const getLatestDate = (data) => {
  return data.reduce((latest, item) => {
    return item.date > latest ? item.date : latest;
  }, new Date(0)); // Initialize with the earliest possible date
};

const filterHistData = (data, intervalInMinutes) => {
  if (data.length === 0) return []; // Handle empty dataset
  if (intervalInMinutes === 1440) return data;

  const latestDate = getLatestDate(data); // Get the latest date
  const intervalInMilliseconds = intervalInMinutes * 60 * 1000; // Convert interval to milliseconds

  // Filter data that falls within the interval before the latest date
  return data.filter((item) => {
    const timeDiff = latestDate - item.date; // Difference between the latest date and the item's date
    return timeDiff >= 0 && timeDiff <= intervalInMilliseconds;
  });
};

const initialCoinDetailFlags = {
  isSuccess: false,
  isError: false,
  isLoading: true,
};

const initialCoinHistDataFlags = {
  isSuccess: false,
  isError: false,
  isLoading: true,
};
export default function Crypto() {
  const route = useRouter();
  const { id: coinId } = useParams();
  const userData = useUser();
  const { isSignedIn } = userData;
  const [coinDetails, setCoinDetails] = useState({});
  const [coinDescription, setCoinDescription] = useState("");
  const [coinHistData, setCoinHistData] = useState([]);
  const [coinHistFilteredData, setCoinHistFilteredData] = useState([]);
  const [bookmarkAdded, setBookmarkAdded] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [coinDetailFlags, setCoinDetailFlags] = useState(
    initialCoinDetailFlags
  );
  const [coinHistDataFlags, setCoinHistDataFlags] = useState(
    initialCoinHistDataFlags
  );
  const [chartRange, setChartRange] = useState("1440");
  const [bgColor, setBgColor] = useState("transparent");
  const fetchUserData = useUserStore((state) => state.fetchUserData);

  const handleChartRangeChange = (e) => {
    const range = e.target.value;
    setChartRange(range);
    setCoinHistFilteredData(filterHistData(coinHistData, range));
  };

  async function handleBookmark(action) {
    if (userData.isSignedIn) {
      const {
        user: { id: userId },
      } = userData;
      const path = getCurrentURL();
      const url = joinPaths(path, "bookmarks");
      let newBookmarks = [];
      if (action === "add") {
        newBookmarks = [...bookmarks, coinId];
        setBookmarkAdded(true);
      } else if (action === "delete") {
        newBookmarks = bookmarks.filter((item) => item !== coinId);
        setBookmarkAdded(false);
      }
      await fetch(url, {
        method: "POST",
        body: JSON.stringify({ userId, coinId, bookmarks: newBookmarks }),
      }).finally(() => {
        fetchUserData(userId);
      });
    }
  }

  useEffect(() => {
    if (typeof coinId == "string" && coinId != "") {
      const fetchCoinInfo = async () => {
        try {
          const resp = await fetch(`${apiUrl}/coins/${coinId}`, {
            method: "GET",
            headers: {
              accept: "application/json",
              "x-cg-demo-api-key": api_key,
            },
          });
          const cryptoData = await resp.json();
          const img = new Image();
          img.crossOrigin = "*/*"; // Allow cross-origin image processing
          img.src = cryptoData.image.large;

          img.onload = () => {
            const colorThief = new ColorThief();
            const dominantColor = colorThief.getColor(img); // Get dominant color [r, g, b]
            const rgbColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
            setBgColor(rgbColor); // Update state with the extracted color
          };
          // Extract description up to the first period (.)
          const fullDescription = cryptoData.description.en.split(".");
          setCoinDetails(cryptoData);
          setCoinDescription(fullDescription.slice(0, 5).join(". ") + ".");
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
    if (typeof coinId == "string" && coinId != "") {
      const fetchHistoricalData = async () => {
        try {
          const response = await fetch(
            `${apiUrl}/coins/${coinId}/market_chart?vs_currency=usd&days=1&precision=2`
          );
          const data = await response.json();
          const formattedData = historicalArrayFormatter(data.prices);
          setCoinHistData(formattedData);
          setCoinHistFilteredData(formattedData);
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
  useEffect(() => {
    if (coinId && isSignedIn) {
      const {
        user: { id: userId },
      } = userData;
      const path = getCurrentURL();
      const url = joinPaths(path, "bookmarks");
      const fetchBookmark = async () => {
        try {
          const resp = await fetch(`${url}?userId=${userId}`);
          const data = await resp.json();
          setBookmarks(data[0].user_bookmarks);
          setBookmarkAdded(data[0].user_bookmarks.includes(coinId));
        } catch (error) {
          console.error("Error fetching bookmark data: ", error);
        }
      };
      fetchBookmark();
    }
  }, [isSignedIn]);
  return (
    <ThemeProvider theme={theme}>
      {coinDetailFlags.isLoading || coinHistDataFlags.isLoading ? (
        <LinearProgress color="primary" />
      ) : (
        <Container className="mt-5">
          {coinDetailFlags.isSuccess ? (
            <Card>
              <CardHeader
                title={<Typography variant="h3">{coinDetails.name}</Typography>}
                avatar={
                  <IconButton onClick={() => route.push("/dashboard")}>
                    <ArrowBackIosIcon />
                  </IconButton>
                }
                action={
                  <IconButton
                    className="ml-auto text-color-black"
                    onClick={() =>
                      handleBookmark(bookmarkAdded ? "delete" : "add")
                    }
                  >
                    {bookmarkAdded ? (
                      <BookmarkAddedIcon sx={{ color: blue[800] }} />
                    ) : (
                      <BookmarkAddIcon />
                    )}
                  </IconButton>
                }
                className="border-b"
              />
              <CardContent className="block sm:flex py-4">
                <img
                  src={coinDetails.image.large}
                  className="card-img-top img-fluid mx-auto sm:mx-0"
                  alt=""
                  style={{ minWidth: "fit-content" }}
                />
                {coinHistDataFlags.isSuccess ? (
                  <div className="flex flex-col items-center sm:mx-3 sm:w-full">
                    <LineChart
                      className="shadow-md rounded-md"
                      dataset={coinHistFilteredData}
                      xAxis={[{ dataKey: "date", scaleType: "utc" }]}
                      series={[
                        {
                          dataKey: "price",
                          color: bgColor,
                          curve: "linear",
                          showMark: false,
                        },
                      ]}
                      height={200}
                      margin={{ left: 80 }}
                    />
                    <ToggleButtonGroup
                      color="secondary"
                      value={chartRange}
                      exclusive
                      onChange={handleChartRangeChange}
                      className="mt-2 font-semibold"
                    >
                      <ToggleButton value="1440" aria-label="24 Hours">
                        1 Day
                      </ToggleButton>
                      <ToggleButton value="720" aria-label="12 Hours">
                        12 Hrs
                      </ToggleButton>
                      <ToggleButton value="360" aria-label="12 Hours">
                        6 Hrs
                      </ToggleButton>
                      <ToggleButton value="60" aria-label="1 Hour">
                        1 Hr
                      </ToggleButton>
                      <ToggleButton value="30" aria-label="30 Minutes">
                        30 Mins
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                ) : null}
              </CardContent>
              <CardContent>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  {coinDescription}
                </Typography>
                <Typography variant="subtitle2">
                  <b>Symbol: </b>
                  {coinDetails.symbol.toUpperCase()}
                </Typography>
                <Typography variant="subtitle2">
                  <b>Rank: </b>
                  {coinDetails.market_cap_rank}
                </Typography>
                <Typography variant="subtitle2">
                  <b>Market Cap: </b>
                  {coinDetails.market_data.market_cap.inr}
                </Typography>
                <Typography variant="subtitle2">
                  <b>Current Price: </b>
                  {coinDetails.market_data.current_price.inr}
                </Typography>
                <Typography variant="subtitle2">
                  <b>Total Supply: </b>
                  {coinDetails.market_data.total_supply}
                </Typography>
                <Typography variant="subtitle2">
                  <b>Market Cap Change (24h): </b>
                  {coinDetails.market_data.market_cap_change_percentage_24h}%
                </Typography>
                <Typography variant="subtitle2">
                  <b>High (24h): </b>
                  {coinDetails.market_data.high_24h.inr}
                </Typography>
                <Typography variant="subtitle2">
                  <b>Low (24h): </b>
                  {coinDetails.market_data.low_24h.inr}
                </Typography>
                <Typography variant="subtitle2">
                  <b>Total Volume (24h): </b>
                  {coinDetails.market_data.total_volume.inr}
                </Typography>
                <Typography variant="subtitle2">
                  <b>Circulating Supply: </b>
                  {coinDetails.market_data.circulating_supply}
                </Typography>
              </CardContent>
            </Card>
          ) : null}
        </Container>
      )}
    </ThemeProvider>
  );
}
