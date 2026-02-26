import { auth } from "@/auth";
import LogoButton from "../components/logoButton";
import LoginButton from "../components/loginButton";
import "../css/mentor.css";
import "../css/logo+login.css";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Not logged in → send to login
  if (!session?.user) redirect("/login");

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />
      {children}
    </main>
  );
}
