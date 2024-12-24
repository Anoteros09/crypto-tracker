import { neon } from "@neondatabase/serverless";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const sql = neon(`${process.env.DATABASE_URL}`);
  const resp = await sql(
    `SELECT * FROM user_details as ud WHERE ud.user_id = '${id}';`
  );
  return Response.json(resp);
}

export async function POST(request: NextRequest) {
  const { id, username, emailAddress } = await request.json();
  const sql = neon(`${process.env.DATABASE_URL}`);
  const resp = await sql(
    `INSERT INTO user_details 
    (user_id, user_name, user_email) 
    VALUES ('${id}', '${username}', '${emailAddress}')`
  );
  return Response.json({ message: "User Added Successfully" });
}
