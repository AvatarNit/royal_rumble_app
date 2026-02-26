import { auth } from "@/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;

  const path = nextUrl.pathname;
  const user = session?.user;

  const isLoggedIn = !!user;

  if (path.startsWith("/admin")) {
    if (!isLoggedIn || user.job !== "ADMIN") {
      return Response.redirect(new URL("/login", nextUrl));
    }
  }

  if (path.startsWith("/freshmen")) {
    if (!isLoggedIn || user.job !== "FRESHMAN") {
      return Response.redirect(new URL("/login", nextUrl));
    }
  }

  if (path.startsWith("/mentor")) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/login", nextUrl));
    }

    const allowedMentorJobs = [
      "GROUP LEADER",
      "HALLWAY HOST",
      "UTILITY SQUAD",
      "SPIRIT SESSION",
    ];

    if (!allowedMentorJobs.includes(user.job ?? "")) {
      return Response.redirect(new URL("/login", nextUrl));
    }

    if (path.startsWith("/mentor/group_leader") && user.job !== "GROUP LEADER") {
      return Response.redirect(new URL(`/mentor/${user.job.toLowerCase().replace(' ', '_')}`, nextUrl));
    }

    if (path.startsWith("/mentor/hallway_host") && user.job !== "HALLWAY HOST") {
      return Response.redirect(new URL(`/mentor/${user.job.toLowerCase().replace(' ', '_')}`, nextUrl));
    }

    if (path.startsWith("/mentor/spirit_session") && user.job !== "SPIRIT SESSION") {
      return Response.redirect(new URL(`/mentor/${user.job.toLowerCase().replace(' ', '_')}`, nextUrl));
    }

    if (path.startsWith("/mentor/utility_squad") && user.job !== "UTILITY SQUAD") {
      return Response.redirect(new URL(`/mentor/${user.job.toLowerCase().replace(' ', '_')}`, nextUrl));
  }
  }
});