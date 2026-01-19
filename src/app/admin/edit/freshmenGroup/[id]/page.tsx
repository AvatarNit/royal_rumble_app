import EditFreshmenGroupUI from "./ui";
import {
  getGroupByGroupId,
  getMentorsByGroupId,
  getFreshmenByGroupId,
} from "@/actions/group";

export default async function EditFreshmenGroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const groupData = await getGroupByGroupId(id);
  const freshmenData = await getFreshmenByGroupId(id);
  const mentorData = await getMentorsByGroupId(id);

  return (
    <EditFreshmenGroupUI
      groupData={groupData}
      freshmenData={freshmenData}
      mentorData={mentorData}
    />
  );
}
