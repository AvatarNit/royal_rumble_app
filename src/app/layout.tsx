import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Next App",
  description: "A simple Next.js app made by Nithik",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav style={{ textAlign: "center", padding: "10px" }}>
          <Link href="/">Home</Link> | <Link href="/about">About</Link> |{" "}
          <Link href="/faq">FAQ</Link> |{" "}
          <Link href="/freshmen/home">Freshmen</Link> |{" "}
          <Link href="/mentor/group_leader">Group Leader</Link> |{" "}
          <Link href="/mentor/hallway_host">Hallway Host</Link> |{" "}
          <Link href="/mentor/utility_spirit">Utility/spirit</Link> |{" "}
          <Link href="/admin">Admin</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
