import AdminAllGroups from "./ui";
import { getAllGroups } from "@/actions/group";
import { getAllHallways } from "@/actions/mentor";

export default async function AdminPage() {
  const freshmenGroups = await getAllGroups(); // fetch from DB
  const transformedFreshmenGroups = freshmenGroups.map((group) => ({
    ...group,
    event_order: String(group.event_order),
  }));
  const hallwayGroupsData = await getAllHallways(); // fetch from DB
  const hallwayGroups = hallwayGroupsData.map((group) => ({
    ...group,
    location: group.location ?? "",
  }));
  return (
    <AdminAllGroups
      freshmenGroups={transformedFreshmenGroups}
      hallwayGroups={hallwayGroups}
    />
  );
}
