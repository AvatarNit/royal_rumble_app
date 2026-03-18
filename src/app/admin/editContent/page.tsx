import AdminEditContentPageUI from "./ui";
import { getFAQContent } from "@/src/actions/other";

export default async function AdminEditContentPage() {
  const faqData = await getFAQContent();
  return <AdminEditContentPageUI faqData={faqData} />;
}
