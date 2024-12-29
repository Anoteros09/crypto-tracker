//Depreciated?? IDK
import { neon } from "@neondatabase/serverless";
import { type NextRequest } from "next/server";

/*
{
    "id": "bitcoin",
    "name": "Bitcoin",
    "image": "https://via.placeholder.com/50",
    "current_price": 43520.54,
    "price_change_percentage_24h": 2.54
  },
  */
const api_key = process.env.NEXT_PUBLIC_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_CRYPTO_API_URL;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("userId");
    const sql = neon(`${process.env.DATABASE_URL}`);
    const resp = await sql(
      `SELECT * FROM user_details as ud WHERE ud.user_id = '${id}';`
    );
    if (resp.length === 0) {
      return Response.json([]);
    }
    //   resp[0].user_bookmarks
    const response = await fetch(
      `${apiUrl}/coins/markets?vs_currency=inr&order=market_cap_desc&sparkline=true&price_change_percentage=24h%2C`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": api_key,
        },
      }
    );
    const data = await response.json();
    const filteredData = data.filter((item) =>
      resp[0].user_bookmarks.includes(item.id)
    );
    const respData = [];
    filteredData.forEach((item) => {
      respData.push({
        id: item.id,
        name: item.name,
        image: item.image,
        current_price: item.current_price,
        price_change_percentage_24h: item.price_change_percentage_24h,
        price_7d_hrly_chart: item.sparkline_in_7d.price,
      });
    });
    // Need to write code for chart data for each coin
    return Response.json(respData);
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
