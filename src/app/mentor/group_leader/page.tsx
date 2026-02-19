import { getMentorById, getGroupLeaderEvents } from "@/src/actions/mentor";
import GroupLeaderHomepageUI from "./ui";

export default async function GroupLeaderHomepage() {
  // const session = await auth();
  // const studentId = session?.user?.id;
  const studentId = "123456"; // Placeholder student ID for testing purposes

  const mentorsData = await getMentorById(Number(studentId));
  const groupLeaderEvents = await getGroupLeaderEvents();
  return (
    <GroupLeaderHomepageUI
      mentorsData={mentorsData}
      groupLeaderEvents={groupLeaderEvents}
    />
  );
}
