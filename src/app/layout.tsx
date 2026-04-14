import type { Metadata } from "next";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/globals.css";
import { AlertProvider } from "./context/AlertContext";
import AlertMessage from "./components/AlertMessage";
import Providers from "./components/Providers";

export const dynamic = "force-dynamic";
const DEV_MODE = process.env.DEV_MODE === "true";

export const metadata: Metadata = {
  title: "Royal Rumble App",
  description: "A simple Next.js app made by Nithik and Nico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AlertProvider>
            {DEV_MODE && (
              <nav style={{ textAlign: "center", padding: "30px" }}>
                <Link href="/">Home</Link> | <Link href="/about">About</Link> |{" "}
                <Link href="/faq">FAQ</Link> |{" "}
                <Link href="/freshmen/home">Freshmen</Link> |{" "}
                <Link href="/mentor/ambassador">Ambassador</Link> |{" "}
                <Link href="/mentor/hallway_host">Hallway Host</Link> |{" "}
                <Link href="/mentor/utility_squad">Utility Squad</Link> |{" "}
                <Link href="/mentor/spirit_session">Spirit Session</Link> |{" "}
                <Link href="/admin">Admin</Link> |{" "}
                <Link href="/testPage">Test</Link>
              </nav>
            )}

            {/* The alert UI that appears at the top of the screen */}
            <AlertMessage />

            {children}
          </AlertProvider>
        </Providers>
      </body>
    </html>
  );
}
