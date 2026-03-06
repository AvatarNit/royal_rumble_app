import { auth } from "@/auth";
import { NextResponse } from "next/server";

const isDevMode = process.env.DEV_MODE === "true";

function devMiddleware() {
  return NextResponse.next();
}

function prodMiddleware(req: any) {
  const { nextUrl } = req;
  const session = req.auth;

  const path = nextUrl.pathname;
  const user = session?.user;

  const isLoggedIn = !!user;

  if (path.startsWith("/admin")) {
    if (!isLoggedIn || user.job !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  if (path.startsWith("/freshmen")) {
    if (!isLoggedIn || user.job !== "FRESHMAN") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  if (path.startsWith("/mentor")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }

    const allowedMentorJobs = [
      "GROUP LEADER",
      "HALLWAY HOST",
      "UTILITY SQUAD",
      "SPIRIT SESSION",
    ];

    if (!allowedMentorJobs.includes(user.job ?? "")) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  return NextResponse.next();
}

export default isDevMode ? devMiddleware : auth(prodMiddleware);