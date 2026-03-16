// src/app/admin/routes/page.tsx

import AdminRoutesUI from "./ui";
import {
  getEventOrderPatterns,
  getBlockSchedule,
  getAllTourRoutesWithStops,
} from "@/actions/routes";
import { getAllHallways } from "@/actions/group";

export default async function AdminRoutesPage() {
  const patterns = await getEventOrderPatterns();
  const blocks = await getBlockSchedule();
  const routes = await getAllTourRoutesWithStops();
  const hallways = await getAllHallways();

  return (
    <AdminRoutesUI
      patterns={patterns}
      blocks={blocks}
      routes={routes}
      hallways={hallways.map((h) => ({
        hallwayStopId: h.hallwayStopId,
        location: h.location ?? "",
      }))}
    />
  );
}
