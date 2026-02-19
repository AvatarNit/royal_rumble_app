import UtilitySquadHomepageUI from "./ui";
import {
  getMentorById,
  getUtilitySquadEvents,
} from "../../../../src/actions/mentor";

export default async function UtilitySquadHomepage() {
  // const session = await auth();
  // const studentId = session?.user?.id;
  const studentId = "654321"; // Placeholder student ID for testing purposes

  const mentorsData = await getMentorById(Number(studentId));
  const utilitySquadEvents = await getUtilitySquadEvents();

  return (
    <UtilitySquadHomepageUI
      mentorsData={mentorsData}
      utilitySquadEvents={utilitySquadEvents}
    />
  );
}
