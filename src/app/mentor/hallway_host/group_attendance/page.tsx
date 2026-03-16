// src/app/mentor/hallway_host/group_attendance/page.tsx

import HallwayHostAttendanceUI from "./ui";
import { getHallwayIdByMentorId, getHallwayByHallwayId } from "@/actions/group";
import { getAttendanceByStop } from "@/actions/routes";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";
const DEV_MODE = process.env.DEV_MODE === "true";

export default async function HallwayHostAttendancePage() {
  const session = await auth();
  const studentId = !DEV_MODE ? session?.user?.id : "100002";

  const hallwayStopId = await getHallwayIdByMentorId(Number(studentId));
  const hallwayData = await getHallwayByHallwayId(Number(hallwayStopId));
  const attendanceRows = await getAttendanceByStop(Number(hallwayStopId));

  return (
    <HallwayHostAttendanceUI
      hallwayStopId={Number(hallwayStopId)}
      hallwayLocation={hallwayData?.location ?? "Unknown Stop"}
      attendanceRows={attendanceRows.map((row) => ({
        groupId:  row.groupId,
        routeNum: row.routeNum ?? null,
        present:  row.present,
      }))}
    />
  );
}
