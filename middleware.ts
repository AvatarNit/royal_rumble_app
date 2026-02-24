import { auth } from "./auth";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/admin/:path*", "/freshmen/:path*", "/mentor/:path*"],
  runtime: "nodejs",
};

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;

  const path = nextUrl.pathname;
  const isLoggedIn = !!session;

  if (path.startsWith("/admin")) {
    if (!isLoggedIn || session?.user?.job !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
  }

  if (path.startsWith("/freshmen")) {
    if (!isLoggedIn || session?.user?.job !== "FRESHMAN") {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
  }

  if (path.startsWith("/mentor")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }

    const allowedMentorJobs = [
      "GROUP LEADER",
      "HALLWAY HOST",
      "UTILITY SQUAD",
      "SPIRIT SESSION",
    ];

    if (!allowedMentorJobs.includes(session.user.job)) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
  }

  return NextResponse.next();
});