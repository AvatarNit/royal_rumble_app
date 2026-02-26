import SpiritSessionHomepageUI from "./ui";
import {
  getMentorById,
  getSpiritSessionEvents,
} from "../../../../src/actions/mentor";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";
const DEV_MODE = process.env.DEV_MODE === "true";

export default async function SpiritSessionHomepage() {
  const session = await auth();
  const studentId = !DEV_MODE ? session?.user?.id : "100004";

  const mentorsData = await getMentorById(Number(studentId));
  const spiritSessionEvents = await getSpiritSessionEvents();

  return (
    <SpiritSessionHomepageUI
      mentorsData={mentorsData}
      spiritSessionEvents={spiritSessionEvents}
    />
  );
}
