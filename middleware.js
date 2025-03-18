import { NextResponse } from "next/server";

export function middleware(request) {
  const loggedInUser = request.cookies.get("loggedinUser")?.value;

  console.log("Users data from middleware:", loggedInUser);

  if (!loggedInUser && request.nextUrl.pathname !== "/components/Login") {
    return NextResponse.redirect(new URL("/components/Login", request.url));
  }
}

export const config = {
  matcher: ["/components/Home"],
};
