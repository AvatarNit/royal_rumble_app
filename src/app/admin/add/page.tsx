import type { Metadata } from "next";
import Link from "next/link";

export default function AdminAddPage() {
  return (
    <div>
      <nav style={{ textAlign: "center", padding: "10px" }}>
        <Link href="/admin/add/admin">Add Admin</Link> |{" "}
        <Link href="/admin/add/freshman">Add Freshman</Link> |{" "}
        <Link href="/admin/add/mentor">Add Mentor</Link>
      </nav>
      <h1>Admin Add</h1>
      <p>This is the add page for admins.</p>
    </div>
  );
}
