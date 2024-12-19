import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default async function crypto({ params }) {
  const { id } = await params;
  console.log(id);
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);

  const cryptoData = await response.json();

  // Extract description up to the first period (.)
  const description = cryptoData.description.en.split(".")[0];

  return (
    <>
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card">
          <img
            src={cryptoData.image.large}
            className="card-img-top img-fluid"
            alt=""
            style={{ maxWidth: "200px" }}
          />
          <div className="card-body">
            <h1 className="card-title">{cryptoData.name}</h1>
            <h5 className="card-text">{description}</h5>
            <p className="card-text">
              <b>Symbol:</b>
              {cryptoData.symbol.toUpperCase()}
            </p>
            <p className="card-text">
              <b>Rank:</b>
              {cryptoData.market_cap_rank}
            </p>
            <p className="card-text">
              <b>Market Cap:</b>
              {cryptoData.market_data.market_cap.inr}
            </p>
            <p className="card-text">
              <b>Current Price:</b>
              {cryptoData.market_data.current_price.inr}
            </p>
            <p className="card-text">
              <b>Total Supply:</b>
              {cryptoData.market_data.total_supply}
            </p>
            <p className="card-text">
              <b>Market Cap Change (24h):</b>
              {cryptoData.market_data.market_cap_change_percentage_24h}%
            </p>
            <p className="card-text">
              <b>High (24h):</b>
              {cryptoData.market_data.high_24h.inr}
            </p>
            <p className="card-text">
              <b>Low (24h):</b>
              {cryptoData.market_data.low_24h.inr}
            </p>
            <p className="card-text">
              <b>Total Volume (24h):</b>
              {cryptoData.market_data.total_volume.inr}
            </p>
            <p className="card-text">
              <b>Circulating Supply:</b>
              {cryptoData.market_data.circulating_supply}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
