import UtilitySquadHomepageUI from "./ui";
import {
  getMentorById,
  getUtilitySquadEvents,
} from "../../../../src/actions/mentor";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";
const DEV_MODE = process.env.DEV_MODE === "true";

export default async function UtilitySquadHomepage() {
  const session = await auth();
  const studentId = !DEV_MODE ? session?.user?.id : "100003";

  const mentorsData = await getMentorById(Number(studentId));
  const utilitySquadEvents = await getUtilitySquadEvents();

  return (
    <UtilitySquadHomepageUI
      mentorsData={mentorsData}
      utilitySquadEvents={utilitySquadEvents}
    />
  );
}
