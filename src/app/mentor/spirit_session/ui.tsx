import InfoBox from "../../components/infoBox";
import InfoTable from "../../components/infoTable";
import EditableContent from "../../components/EditableContent";

export default function SpiritSessionUI({
  mentorsData,
  spiritSessionEvents,
}: {
  mentorsData: {
    mentorId: number;
    fName: string | null;
    lName: string | null;
    email: string | null;
    job: string | null;
    tshirtSize: string | null;
    gradYear: number | null;
    languages: string | null;
    phoneNum: string | null;
    trainingDay: string | null;
    pizzaType: string | null;
  };
  spiritSessionEvents: Array<{
    eventId: number;
    name: string | null;
    date: string | null;
    time: string | null;
    description: string | null;
  }>;
}) {
  return (
    <>
      <section className="mentor-info-box">
        <InfoBox headerText="Event Details">
          <InfoTable
            headers={["Event", "Date", "Time", "Description"]}
            data={spiritSessionEvents.map((event) => [
              event.name ?? "N/A",
              event.date ?? "N/A",
              event.time ?? "N/A",
              event.description ?? "N/A",
            ])}
          />
        </InfoBox>
      </section>

      <InfoBox headerText="Additional Instruction">
        <EditableContent contentKey="spirit_session_more_details" />
      </InfoBox>
    </>
  );
}
