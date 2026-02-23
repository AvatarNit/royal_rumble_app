import AdminEditMentorUI from "./ui";

export default async function AdminEditMentorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return <AdminEditMentorUI params={resolvedParams} />;
}
