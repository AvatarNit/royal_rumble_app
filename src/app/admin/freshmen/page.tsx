// /admin/freshmen/page.tsx (server component)
import { getFreshmen } from "@/actions/freshmen";
import AdminFreshmen from "./ui";

export default async function FreshmenPage() {
  const freshmen = await getFreshmen(); // fetch from DB
  return <AdminFreshmen freshmenData={freshmen} />;
}
