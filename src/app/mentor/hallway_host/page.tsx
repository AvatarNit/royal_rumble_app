import HallwayHostHomepageUI from "./ui";
import {
  getMentorById,
  getHallwayHostEvents,
} from "../../../../src/actions/mentor";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function HallwayHostHomepage() {
  const session = await auth();
  const studentId = session?.user?.id;

  const mentorsData = await getMentorById(Number(studentId));
  const hallwayHostEvents = await getHallwayHostEvents();

  return (
    <HallwayHostHomepageUI
      mentorsData={mentorsData}
      hallwayHostEvents={hallwayHostEvents}
    />
  );
}
