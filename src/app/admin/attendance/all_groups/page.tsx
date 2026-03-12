import AdminAttendanceAllGroupsUI from "./ui";
import {
  getRoyalRumbleGroupAttendance,
  getRoyalRumbleEventId,
} from "../../../../actions/other";
import { db } from "@/db";
import { eventsData } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function AdminAttendanceAllGroupsPage() {
  const groups = await getRoyalRumbleGroupAttendance();

  const royalRumbleEventId = (await getRoyalRumbleEventId()) || -1;

  return (
    <AdminAttendanceAllGroupsUI
      groups={groups}
      royalRumbleEventId={royalRumbleEventId}
    />
  );
}
