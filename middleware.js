import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default withAuth(
  async (req) => {
    const token = await getToken({ req });
    const authUrl = new URL("/auth", req.url);

    authUrl.searchParams.set("from", req.nextUrl.pathname + req.nextUrl.search);

    if (!token) return NextResponse.redirect(authUrl);
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/profile/:path*", "/create-prompt", "/update-prompt"],
};
