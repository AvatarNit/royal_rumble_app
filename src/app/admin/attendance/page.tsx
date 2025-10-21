import type { Metadata } from "next";
import Link from "next/link";

export default function AdminAttendanceHomePage() {
  return (
    <div>
      <nav style={{ textAlign: "center", padding: "10px" }}>
        <Link href="/admin/attendance/all_groups">All Groups</Link> |{" "}
        <Link href="/admin/attendance/freshmen">Freshmen</Link> |{" "}
        <Link href="/admin/attendance/mentor">Mentor</Link>
      </nav>
      <h1>Admin Attendance</h1>
      <p>This is the attendance page for admins.</p>
    </div>
  );
}
