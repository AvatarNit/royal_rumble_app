import { getMentors } from "@/actions/mentor";
import AdminMentors from "./ui";

export default async function MentorPage() {
  const mentors = await getMentors(); // fetch from DB
  const transformedMentors = mentors.map((mentor) => ({
    ...mentor,
    language: mentor.languages || "",
    fName: mentor.fName || "",
    lName: mentor.lName || "",
    email: mentor.email || "",
    job: mentor.job || "",
    tshirtSize: mentor.tshirtSize || "",
    gradYear: mentor.gradYear || 0,
    phoneNum: mentor.phoneNum || "",
    trainingDay: mentor.trainingDay || "",
    pizzaType: mentor.pizzaType || "",
  }));
  return <AdminMentors mentorsData={transformedMentors} />;
}
