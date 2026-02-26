import UtilitySquadHomepageUI from "./ui";
import {
  getMentorById,
  getUtilitySquadEvents,
} from "../../../../src/actions/mentor";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function UtilitySquadHomepage() {
  const session = await auth();
  const studentId = session?.user?.id;

  const mentorsData = await getMentorById(Number(studentId));
  const utilitySquadEvents = await getUtilitySquadEvents();

  return (
    <UtilitySquadHomepageUI
      mentorsData={mentorsData}
      utilitySquadEvents={utilitySquadEvents}
    />
  );
}
