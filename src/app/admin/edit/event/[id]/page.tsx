import AdminEditEventsUI from "./ui";

export default async function AdminEditEventsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return <AdminEditEventsUI params={resolvedParams} />;
}
