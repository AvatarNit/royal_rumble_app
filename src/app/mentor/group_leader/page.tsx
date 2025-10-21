import type { Metadata } from "next";
import Link from "next/link";

export default function GroupLeaderHomePage() {
  return (
    <div>
      <nav style={{ textAlign: "center", padding: "10px" }}>
        <Link href="/mentor/group_leader/group_details">Group Details</Link> |{" "}
        <Link href="/mentor/group_leader/attendance">Attendance</Link> |{" "}
        <Link href="/mentor/group_leader/route">Route</Link>
      </nav>
      <h1>Welcome Group Leaders!</h1>
      <p>This is the home page for group leaders.</p>
    </div>
  );
}
