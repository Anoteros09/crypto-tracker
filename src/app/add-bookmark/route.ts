import { neon } from "@neondatabase/serverless";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { userId, coinId } = await request.json();
  const sql = neon(`${process.env.DATABASE_URL}`);
  const userDets = await sql(
    `SELECT * FROM user_details as ud WHERE ud.user_id = '${userId}';`
  );
  const bookmark = userDets[0].user_bookmark;
  const newBookmark = [coinId, ...bookmark];
  const resp = await sql(
    `UPDATE user_details SET user_bookmark = '${JSON.stringify(
      newBookmark
    )}' WHERE user_id = '${userId}' `
  );
  return Response.json({
    message: `${coinId} has been added to bookmark.`,
  });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("userId");
  const sql = neon(`${process.env.DATABASE_URL}`);
  const resp = await sql(
    `SELECT * FROM user_details as ud WHERE ud.user_id = '${id}';`
  );
  return Response.json(resp);
}
