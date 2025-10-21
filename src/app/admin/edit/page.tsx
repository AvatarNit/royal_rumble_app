import type { Metadata } from "next";
import Link from "next/link";

export default function AdminEditPage() {
  return (
    <div>
      <nav style={{ textAlign: "center", padding: "10px" }}>
        <Link href="/admin/edit/admin">Admin</Link> |{" "}
        <Link href="/admin/edit/all_groups">All Groups</Link> |{" "}
        <Link href="/admin/edit/freshmen">Freshmen</Link> |{" "}
        <Link href="/admin/edit/general_info">General Info</Link> |{" "}
        <Link href="/admin/edit/mentor">Mentor</Link> |{" "}
        <Link href="/admin/edit/training">Training</Link>
      </nav>
      <h1>Edit Page</h1>
      <p>This is the edit page for admins.</p>
    </div>
  );
}
