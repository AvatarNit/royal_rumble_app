import SpiritSessionHomepageUI from "./ui";
import {
  getMentorById,
  getSpiritSessionEvents,
} from "../../../../src/actions/mentor";

export default async function SpiritSessionHomepage() {
  // const session = await auth();
  // const studentId = session?.user?.id;
  const studentId = "654321"; // Placeholder student ID for testing purposes

  const mentorsData = await getMentorById(Number(studentId));
  const spiritSessionEvents = await getSpiritSessionEvents();

  return (
    <SpiritSessionHomepageUI
      mentorsData={mentorsData}
      spiritSessionEvents={spiritSessionEvents}
    />
  );
}
