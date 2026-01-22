import EditFreshmenGroupUI from "./ui";
import {
  getGroupByGroupId,
  getMentorsByGroupId,
  getFreshmenByGroupId,
  getNullGroupFreshmen,
  getNullGroupMentors,
} from "@/actions/group";

export default async function EditFreshmenGroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const orders: string[][] = (await import("../../../../../event_orders.json"))
    .default;

  if (id.toLowerCase() === "unassigned") {
    const groupData = {
      groupId: "Unassigned",
      routeNum: null,
      eventOrder: null,
    };
    const freshmenData = await getNullGroupFreshmen();
    const mentorData = await getNullGroupMentors();

    const sanitizedFreshmenData = freshmenData.map((freshman) => ({
      ...freshman,
      fName: freshman.fName ?? "",
      lName: freshman.lName ?? "",
    }));

    const sanitizedMentorData = mentorData.map((mentor) => ({
      ...mentor,
      mentor_id: mentor.mentorId ?? mentor.mentorId ?? 0,
      fname: mentor.fName ?? mentor.fName ?? "",
      lname: mentor.lName ?? mentor.lName ?? "",
    }));

    return (
      <EditFreshmenGroupUI
        groupData={groupData}
        freshmenData={sanitizedFreshmenData}
        mentorData={sanitizedMentorData}
        orders={orders}
      />
    );
  }
  const groupData = await getGroupByGroupId(id);
  const freshmenData = await getFreshmenByGroupId(id);
  const mentorData = await getMentorsByGroupId(id);

  const sanitizedFreshmenData = freshmenData.map((freshman) => ({
    ...freshman,
    fName: freshman.fName ?? "",
    lName: freshman.lName ?? "",
    tshirtSize: freshman.tshirtSize ?? "",
    email: freshman.email ?? "",
    primaryLanguage: freshman.primaryLanguage ?? "",
    interests: freshman.interests ?? "",
    healthConcerns: freshman.healthConcerns ?? "",
  }));

  console.log("Group Data", groupData);

  return (
    <EditFreshmenGroupUI
      groupData={groupData}
      freshmenData={sanitizedFreshmenData}
      mentorData={mentorData}
      orders={orders}
    />
  );
}
