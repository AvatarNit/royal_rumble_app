import { auth } from "@/auth";
import LogoButton from "../components/logoButton";
import LoginButton from "../components/loginButton";
import "../css/mentor.css";
import "../css/logo+login.css";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

// Map user jobs to their mentor routes
const jobRoutes: Record<string, string> = {
  "GROUP LEADER": "group_leader",
  "HALLWAY HOST": "hallway_host",
  "SPIRIT SESSION": "spirit_session",
  "UTILITY SQUAD": "utility_squad",
};

export default async function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Not logged in → send to login
  if (!session?.user) redirect("/login");

  const userJob = session.user.job ?? "";
  const userRoute = jobRoutes[userJob];

  // Redirect to their mentor page if accessing other mentor pages
  if (userRoute) {
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    if (!path.includes(`/mentor/${userRoute}`)) {
      redirect(`/mentor/${userRoute}`);
    }
  }

  return (
    <main className="mentor-container">
      <LogoButton />
      <LoginButton />
      {children}
    </main>
  );
}
