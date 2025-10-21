import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ textAlign: "center", padding: "10px" }}>
      <Link href="/">Home</Link> | <Link href="/about">About</Link>
    </nav>
  );
}
