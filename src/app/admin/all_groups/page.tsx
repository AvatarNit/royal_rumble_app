import AdminAllGroups from "./ui";
import { getAllGroups } from "@/actions/group";

export default async function AdminPage() {
  const freshmenGroups = await getAllGroups();
  const sanitizedFreshmenGroups = freshmenGroups.map((g) => ({
    groupId: g.groupId,
    eventOrder: g.eventOrder ?? "[]",
    routeNum: g.routeNum ?? 0,
  }));
  return <AdminAllGroups />;
}
