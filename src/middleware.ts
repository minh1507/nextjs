// import { NextResponse } from "next/server";
// import type {
//   NextRequest as request,
//   NextResponse as response,
// } from "next/server";

// export default function middleware(req: request, res: response) {
//   // const origin = req.nextUrl.origin;

//   // const authentication = ["/"];
//   // const admin_page = ["/home", "/[catId]"];

//   // const role = req.cookies.get("role")?.value;
//   // let token = req.cookies.get("token")?.value;

//   // if (token) {
//   //   const decode = parseJwt(token);
//   //   token = decode.data.role;
//   // }

//   // if (role && token) {
//   //   let path = req.nextUrl.pathname;
//   //   if (role == "admin" && token == "admin") {
//   //     if (authentication.includes(path)) {
//   //       return NextResponse.redirect(origin + admin_page[0]);
//   //     }
//   //     return NextResponse.next();
//   //   }
//   //   return NextResponse.next();
//   // } else {
//   //   let path = req.nextUrl.pathname;
//   //   if (!authentication.includes(path)) {
//   //     return NextResponse.redirect(origin + authentication[0]);
//   //   }
//   //   return NextResponse.next();
//   // }
//   return NextResponse.next();
// }

// function parseJwt(token: any) {
//   return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
// }

// export const config = {
//   matcher: ["/", "/home", "/[catId]"],
// };

import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default withAuth(
  function middleware(req) {
    let adminPage = ["/home",]

    if (req.nextauth.token?.role !== "admin")
      return NextResponse.rewrite(
        new URL("/protected", req.url)
      );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/protected"],
};
