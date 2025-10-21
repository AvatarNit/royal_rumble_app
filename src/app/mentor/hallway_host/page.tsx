import type { Metadata } from "next";
import Link from "next/link";

export default function HallwayHostHomePage() {
  return (
    <div>
      <nav style={{ textAlign: "center", padding: "10px" }}>
        <Link href="/mentor/hallway_host/group_attendance">
          Group Attendance
        </Link>
      </nav>
      <h1>Welcome Hallway Hosts!</h1>
      <p>This is the home page for hallway hosts.</p>
    </div>
  );
}
