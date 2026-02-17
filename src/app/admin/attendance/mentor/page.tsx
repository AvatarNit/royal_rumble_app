import AdminAttendanceMentorUI from "./ui";
import { getMentorAttendanceAllEvents } from "../../../../actions/other";

export default async function AdminAttendanceMentorPage() {
  const mentorAttendance = await getMentorAttendanceAllEvents();
  return <AdminAttendanceMentorUI mentorAttendance={mentorAttendance} />;
}
