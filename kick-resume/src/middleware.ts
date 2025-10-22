// import { log } from "console";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   console.log("Middleware triggered for path:", request.nextUrl.pathname);

//   return NextResponse.redirect(new URL("/home", request.url));
// }

import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signup", // unauthenticated user yaha redirect hoga
  },
});

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/ai-resume-analyzer/:path*",
    "/ai-resume-builder/:path*",
    "/job-matcher/:path*",
    "/resume-job-analysis/:path*",
    "/ai-resume-screener"
  ],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(request: NextRequest) {
//   // Exclude NextAuth and public routes
//   if (
//     request.nextUrl.pathname.startsWith("/api/auth") ||
//     request.nextUrl.pathname.startsWith("/public")
//   ) {
//     return NextResponse.next();
//   }

//   const token = await getToken({
//     req: request,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   if (!token) {
//     // Redirect to sign-in with callback to the original page
//     const signInUrl = new URL("/api/auth/signin", request.url);
//     signInUrl.searchParams.set("callbackUrl", request.url);
//     return NextResponse.redirect(signInUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
// "/ai-resume-analyzer/:path*",
// "/ai-resume-builder/:path*",
// "/job-matcher/:path*",
// "/resume-job-analysis/:path*",
//   ],
// };
