import EditHallwayGroupUI from "./ui";
import {
  getHallwayByHallwayId,
  getMentorsByHallwayId,
  getAllHallways,
  getNullHallwayMentors,
} from "@/actions/group";

export default async function EditHallwayGroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const possibleHallways = await getAllHallways();

  if (id === (-1).toString()) {
    const hallwayData = {
      hallwayStopId: -1,
      location: "Unassigned",
    };
    const rawMentorData = await getNullHallwayMentors();
    const mentorData = rawMentorData.map((mentor) => ({
      mentor_id: mentor.mentorId,
      fname: mentor.fName ?? "",
      lname: mentor.lName ?? "",
    }));
    return (
      <EditHallwayGroupUI
        hallwayData={hallwayData}
        mentorData={mentorData}
        possibleHallways={possibleHallways}
      />
    );
  }

  const hallwayId = Number(id);

  const hallwayData = await getHallwayByHallwayId(hallwayId);
  const mentorData = await getMentorsByHallwayId(hallwayId);

  return (
    <EditHallwayGroupUI
      hallwayData={hallwayData}
      mentorData={mentorData}
      possibleHallways={possibleHallways}
    />
  );
}
