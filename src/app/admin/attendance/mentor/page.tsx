import AdminAttendanceMentorUI from "./ui";
import { getMentorAttendanceAllEvents } from "../../../../actions/other";

export default async function AdminAttendanceMentorPage() {
  const mentorAttendance = await getMentorAttendanceAllEvents();
  console.log("mentorAttendance", mentorAttendance);
  return <AdminAttendanceMentorUI mentorAttendance={mentorAttendance} />;
}
