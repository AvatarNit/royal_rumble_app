import SpiritSessionHomepageUI from "./ui";
import {
  getMentorById,
  getSpiritSessionEvents,
} from "../../../../src/actions/mentor";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function SpiritSessionHomepage() {
  const session = await auth();
  const studentId = session?.user?.id;

  const mentorsData = await getMentorById(Number(studentId));
  const spiritSessionEvents = await getSpiritSessionEvents();

  return (
    <SpiritSessionHomepageUI
      mentorsData={mentorsData}
      spiritSessionEvents={spiritSessionEvents}
    />
  );
}
