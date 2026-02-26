import { getMentorById, getGroupLeaderEvents } from "@/src/actions/mentor";
import GroupLeaderHomepageUI from "./ui";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function GroupLeaderHomepage() {
  const session = await auth();
  const studentId = session?.user?.id;

  const mentorsData = await getMentorById(Number(studentId));
  const groupLeaderEvents = await getGroupLeaderEvents();

  return (
    <GroupLeaderHomepageUI
      mentorsData={mentorsData}
      groupLeaderEvents={groupLeaderEvents}
    />
  );
}
