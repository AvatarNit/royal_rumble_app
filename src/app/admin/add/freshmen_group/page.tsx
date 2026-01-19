import AdminAddFreshmenGroupPage from "./ui";

export default async function AdminAddCustomGroup() {
  const orders: string[][] = (await import("../../../../event_orders.json"))
    .default;
  return <AdminAddFreshmenGroupPage orders={orders} />;
}
