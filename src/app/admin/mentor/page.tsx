import { getMentors } from "@/actions/mentor";
import AdminMentors from "./ui";

export default async function MentorPage() {
  const mentors = await getMentors(); // fetch from DB
  return <AdminMentors mentorsData={mentors} />;
}
