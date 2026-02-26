import InfoBox from "../../components/infoBox";
import InfoTable from "../../components/infoTable";
import EditableContent from "../../components/EditableContent";

export default function UtilitySquadUI({
  utilitySquadEvents,
}: {
  utilitySquadEvents: Array<{
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
            data={utilitySquadEvents.map((event) => [
              event.name ?? "N/A",
              event.date ?? "N/A",
              event.time ?? "N/A",
              event.description ?? "N/A",
            ])}
          />
        </InfoBox>
      </section>

      <InfoBox headerText="Additional Instruction">
        <EditableContent contentKey="utility_squad_more_details" />
      </InfoBox>
    </>
  );
}
