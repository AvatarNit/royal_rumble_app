import AdminAllGroups from "./ui";
import {
  getAllGroups,
  getNullGroupFreshmen,
  getNullGroupMentors,
  getNullHallwayMentors,
} from "@/actions/group";
import { getAllHallways } from "@/actions/mentor";
import { get } from "http";

export default async function AdminPage() {
  const freshmenGroups = await getAllGroups(); // fetch from DB
  const transformedFreshmenGroups = freshmenGroups.map((group) => ({
    ...group,
    event_order: String(group.event_order),
    freshmen: group.freshmen.map((f) => ({
      freshman_id: f.freshman_id,
      name: f.name,
    })),
    mentors: group.mentors.map((m) => ({
      mentor_id: m.mentor_id,
      name: m.name,
    })),
  }));

  const hallwayGroupsData = await getAllHallways(); // fetch from DB
  const hallwayGroups = hallwayGroupsData.map((group) => ({
    ...group,
    location: group.location ?? "",
  }));

  {
    /* Unassigned Freshmen Group
  ==================================== */
  }
  interface GroupDetail {
    group_id: string;
    route_num: number;
    event_order: string;
    freshmen: Array<{ freshman_id: string; name: string }>;
    mentors: Array<{ mentor_id: string; name: string }>;
  }

  const nullGroupFreshmen = await getNullGroupFreshmen();
  const nullGroupMentors = await getNullGroupMentors();
  const groupMap = new Map<string, GroupDetail>();

  // initialize group
  groupMap.set("Unassigned", {
    group_id: "Unassigned",
    route_num: 0,
    event_order: "",
    freshmen: nullGroupFreshmen.map((f) => ({
      freshman_id: f.freshmenId.toString(),
      name: `${f.fName || ""} ${f.lName || ""}`.trim(),
    })),
    mentors: nullGroupMentors.map((m) => ({
      mentor_id: m.mentorId.toString(),
      name: `${m.fName || ""} ${m.lName || ""}`.trim(),
    })),
  });

  const unassignedGroup = Array.from(groupMap.values());

  {
    /* End of Unassigned Freshmen Group
==================================== */
  }
  {
    /* Unassigned Hallway Group
  ==================================== */
  }
  interface hallwayDetail {
    hallwayStopId: number;
    location: string;
    mentors: Array<{ mentor_id: string; name: string }>;
  }

  const nullHallwayMentors = await getNullHallwayMentors();
  const hallwayMap = new Map<string, hallwayDetail>();

  // initialize group
  hallwayMap.set("Unassigned", {
    hallwayStopId: -1,
    location: "Unassigned",
    mentors: nullHallwayMentors.map((m) => ({
      mentor_id: m.mentorId.toString(),
      name: `${m.fName || ""} ${m.lName || ""}`.trim(),
    })),
  });

  const unassignedHallway = Array.from(hallwayMap.values());
  {
    /* End of Unassigned Hallway Group
==================================== */
  }
  return (
    <AdminAllGroups
      freshmenGroups={[...unassignedGroup, ...transformedFreshmenGroups]}
      hallwayGroups={[...unassignedHallway, ...hallwayGroups]}
    />
  );
}
