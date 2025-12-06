// /admin/admin/page.tsx (server component)
import { getAdmins } from "@/actions/admin";
import AdminAdmin from "./ui";

export default async function AdminPage() {
  const admins = await getAdmins(); // fetch from DB
  const sanitizedAdmins = admins.map((a) => ({
    adminId: a.adminId,
    fName: a.fName ?? "",
    lName: a.lName ?? "",
    email: a.email ?? "",
  }));
  return <AdminAdmin adminsData={sanitizedAdmins} />;
}
