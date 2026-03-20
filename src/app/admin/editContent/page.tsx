import AdminEditContentPageUI from "./ui";
import { getFAQContent, getRoyalRumbleTicketLink } from "@/src/actions/other";

export default async function AdminEditContentPage() {
  const faqData = await getFAQContent();
  const royalRumbleTicketLink = await getRoyalRumbleTicketLink();
  return (
    <AdminEditContentPageUI
      faqData={faqData}
      royalRumbleTicketLinkCurrent={royalRumbleTicketLink}
    />
  );
}
