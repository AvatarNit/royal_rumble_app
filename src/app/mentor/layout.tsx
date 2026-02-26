import { auth } from "@/auth";
import LogoButton from "../components/logoButton";
import LoginButton from "../components/loginButton";
import "../css/mentor.css";
import "../css/logo+login.css";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  if (session.user.job !== "GROUP LEADER") {
    redirect(`/mentor/${session.user.job.toLowerCase().replace(" ", "_")}`);
  }

  // Show welcome header only on exact /mentor/group_leader homepage
  const showHeader = !(
    typeof window !== "undefined" &&
    window.location.pathname !== "/mentor/group_leader"
  );

  return (
    <main className="mentor-container">
      <LogoButton />
      <LoginButton />

      {showHeader && (
        <header className="mentor-header">
          <h1 className="mentor-title">
            Welcome, {session.user.name?.split(" (")[0]}!
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              margin: "20px 0px 0px",
            }}
          >
            <h3 className="mentor-subtitle1">Job:</h3>
            <h3 className="mentor-subtitle2">{session.user.job}</h3>
          </div>
        </header>
      )}

      {children}
    </main>
  );
}
