import { auth } from "@/auth";
import LogoButton from "../components/logoButton";
import LoginButton from "../components/loginButton";
import "../css/mentor.css";
import "../css/logo+login.css";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const jobRoutes: Record<string, string> = {
  "GROUP LEADER": "group_leader",
  "HALLWAY HOST": "hallway_host",
  "SPIRIT SESSION": "spirit_session",
  "UTILITY SQUAD": "utility_squad",
};

export default async function MentorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug?: string[] }; // Next.js App Router passes slug for nested routes
}) {
  const session = await auth();

  // If not logged in, redirect to login
  if (!session?.user) redirect("/login");

  const userJob = session.user.job ?? "";
  const currentRoute = params.slug?.[0]; // e.g., "group_leader"

  // If user is trying to access a page that doesn't match their job, redirect
  if (jobRoutes[userJob] && currentRoute !== jobRoutes[userJob]) {
    redirect(`/mentor/${jobRoutes[userJob]}`);
  }

  return (
    <main className="mentor-container">
      <LogoButton />
      <LoginButton />

      {children}
    </main>
  );
}
