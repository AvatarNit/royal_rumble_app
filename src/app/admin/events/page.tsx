import React from "react";
import AdminEventsUI from "./ui";
import { getAllEvents } from "../../../actions/other";

async function AdminEvents() {
  const allEvents = await getAllEvents();
  const groupLeaderEvents = await getAllEvents("GROUP LEADER");
  const hallwayHostEvents = await getAllEvents("HALLWAY HOST");
  const spiritEvents = await getAllEvents("SPIRIT SESSION");
  const utilityEvents = await getAllEvents("UTILITY SQUAD");
  return (
    <AdminEventsUI
      allEvents={{ events: allEvents }}
      groupLeaderEvents={{ events: groupLeaderEvents }}
      hallwayHostEvents={{ events: hallwayHostEvents }}
      spiritEvents={{ events: spiritEvents }}
      utilityEvents={{ events: utilityEvents }}
    />
  );
}

export default AdminEvents;
