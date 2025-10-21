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
          <Link href="/">Home</Link> | <Link href="/about">About</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
