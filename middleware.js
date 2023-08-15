// export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  const token = await getToken({ req });
  console.log("Token", token);
  const authUrl = new URL("/auth", req.url);

  authUrl.searchParams.set("from", req.nextUrl.pathname + req.nextUrl.search);

  if (!token) return NextResponse.redirect(authUrl);
};

export const config = { matcher: ["/profile/:path*"] };
