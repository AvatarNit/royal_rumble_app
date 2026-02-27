import { auth } from "@/auth";
import LogoButton from "../components/logoButton";
import LoginButton from "../components/loginButton";
import "../css/mentor.css";
import "../css/logo+login.css";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const DEV_MODE = process.env.DEV_MODE === "true";

export default async function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!DEV_MODE) {
    const session = await auth();

    // Not logged in → send to login
    if (!session?.user) {
      redirect("/login");
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
