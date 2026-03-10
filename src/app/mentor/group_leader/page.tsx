import { getMentorById, getGroupLeaderEvents } from "@/src/actions/mentor";
import {
  getGroupByGroupId,
  getGroupIdByMentorId,
  getMentorsByGroupId,
  getFreshmenByGroupId,
} from "@/src/actions/group";
import GroupLeaderHomepageUI from "./ui";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";
const DEV_MODE = process.env.DEV_MODE === "true";

export default async function GroupLeaderHomepage() {
  const session = await auth();
  const studentId = !DEV_MODE ? session?.user?.id : "100001";

  const mentorsData = await getMentorById(Number(studentId));
  const groupLeaderEvents = await getGroupLeaderEvents();

  const groupId = await getGroupIdByMentorId(Number(studentId));
  const groupDetails = await getGroupByGroupId(String(groupId));
  const groupMentorsData = await getMentorsByGroupId(String(groupId));
  const groupFreshmen = await getFreshmenByGroupId(String(groupId));

  const groupMentors = groupMentorsData.map((mentor) => ({
    mentorId: mentor.mentor_id,
    fName: mentor.fname,
    lName: mentor.lname,
  }));

  return (
    <GroupLeaderHomepageUI
      mentorsData={mentorsData}
      groupLeaderEvents={groupLeaderEvents}
      groupDetails={groupDetails}
      groupMentors={groupMentors}
      groupFreshmen={groupFreshmen}
    />
  );
}
