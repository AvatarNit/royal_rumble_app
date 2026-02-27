import { auth } from "@/auth";
import "../css/mentor.css";
import "../css/logo+login.css";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const DEV_MODE = process.env.DEV_MODE === "true";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!DEV_MODE) {
    const session = await auth();

    if (!session?.user) {
      redirect("/login");
    }
  }

  return <>{children}</>;
}
