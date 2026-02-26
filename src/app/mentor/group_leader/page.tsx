import { getMentorById, getGroupLeaderEvents } from "@/src/actions/mentor";
import GroupLeaderHomepageUI from "./ui";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";
const DEV_MODE = process.env.DEV_MODE === "true";

export default async function GroupLeaderHomepage() {
  const session = await auth();
  const studentId = !DEV_MODE ? session?.user?.id : "100001";

  const mentorsData = await getMentorById(Number(studentId));
  const groupLeaderEvents = await getGroupLeaderEvents();

  return (
    <GroupLeaderHomepageUI
      mentorsData={mentorsData}
      groupLeaderEvents={groupLeaderEvents}
    />
  );
}
