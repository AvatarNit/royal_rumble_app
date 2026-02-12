import React from "react";
import MentorAssignGroupUI from "./ui";
import {
  getGroupLeaderAssignments,
  getHallwayHostAssignments,
} from "../../../../actions/mentor";
import { getGroupIds, getAllHallways } from "../../../../actions/group";

async function MentorAssignGroupPage() {
  const groupLeaderAssignments = await getGroupLeaderAssignments();
  const groupIds = await getGroupIds();
  const hallwayHostAssignments = await getHallwayHostAssignments();
  const hallwayStops = await getAllHallways();

  console.log("Group Leader Assignments:", hallwayHostAssignments);
  return (
    <MentorAssignGroupUI
      groupLeaderAssignments={groupLeaderAssignments}
      groupIds={groupIds.map((g: { groupId: string }) => String(g.groupId))}
      hallwayHostAssignments={hallwayHostAssignments}
      hallwayStops={hallwayStops}
    />
  );
}

export default MentorAssignGroupPage;
