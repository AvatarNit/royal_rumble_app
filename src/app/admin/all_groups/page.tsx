import AdminAllGroups from "./ui";
import { getAllGroups } from "@/actions/group";

export default async function AdminPage() {
  const freshmenGroups = await getAllGroups(); // fetch from DB
  return <AdminAllGroups />;
}
