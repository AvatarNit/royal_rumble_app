// src/app/mentor/group_leader/route/page.tsx

import GroupLeaderRouteUI from "./ui";
import { getGroupIdByMentorId } from "@/actions/group";
import { getGroupSchedule } from "@/actions/routes";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";
const DEV_MODE = process.env.DEV_MODE === "true";

export default async function GroupLeaderRoutePage() {
  const session = await auth();
  const studentId = !DEV_MODE ? session?.user?.id : "100001";

  const groupId = await getGroupIdByMentorId(Number(studentId));
  const schedule = await getGroupSchedule(String(groupId));

  return <GroupLeaderRouteUI schedule={schedule} />;
}
