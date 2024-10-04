import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import {
  API_AUTH_PREFIX,
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  PUBLIC_ROUTES,
} from "./routes";
import { BASE_URL } from "./config/config";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const session = await auth();
  const isLoggedIn: Boolean = session === null ? false : true;


  const isApiAuthRoute = API_AUTH_PREFIX.includes(nextUrl.pathname);

  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(`${BASE_URL}${DEFAULT_LOGIN_REDIRECT}`);
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(`${BASE_URL}/signin`);
  }

  return null;
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
