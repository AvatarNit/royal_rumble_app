import React from "react";
import MentorAssignGroupUI from "./ui";
import {
  getAmbassadorAssignments,
  getHallwayHostAssignments,
} from "../../../../actions/mentor";
import { getGroupIds, getAllHallways } from "../../../../actions/group";

async function MentorAssignGroupPage() {
  const ambassadorAssignments = await getAmbassadorAssignments();
  const groupIds = await getGroupIds();
  const hallwayHostAssignments = await getHallwayHostAssignments();
  const hallwayStops = await getAllHallways();

  console.log("Ambassador Assignments:", ambassadorAssignments);
  return (
    <MentorAssignGroupUI
      ambassadorAssignments={ambassadorAssignments}
      groupIds={groupIds.map((g: { groupId: string }) => String(g.groupId))}
      hallwayHostAssignments={hallwayHostAssignments}
      hallwayStops={hallwayStops}
    />
  );
}

export default MentorAssignGroupPage;
