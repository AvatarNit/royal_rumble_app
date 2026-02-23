import AdminEditAdminUI from "./ui";

export default async function AdminEditAdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return <AdminEditAdminUI params={resolvedParams} />;
}
