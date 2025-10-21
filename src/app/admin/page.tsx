import type { Metadata } from "next";
import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div>
      <nav style={{ textAlign: "center", padding: "10px" }}>
        <Link href="/admin/add">Add</Link> |{" "}
        <Link href="/admin/all_groups">All Groups</Link> |{" "}
        <Link href="/admin/attendance">Attendance</Link> |{" "}
        <Link href="/admin/edit">Edit</Link> |{" "}
        <Link href="/admin/search">Search</Link> |{" "}
        <Link href="/admin/upload">Upload</Link>
      </nav>
      <h1>Welcome Admin!</h1>
      <p>This is the home page for admins.</p>
    </div>
  );
}
