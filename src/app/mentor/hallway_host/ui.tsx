import InfoBox from "../../components/infoBox";
import MentorButtons from "../../components/mentorButtons";
import InfoTable from "../../components/infoTable";
import EditableContent from "../../components/EditableContent";

export default function HallwayHostUI({
  mentorsData,
  hallwayHostEvents,
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
  hallwayHostEvents: Array<{
    eventId: number;
    name: string | null;
    date: string | null;
    time: string | null;
    description: string | null;
  }>;
}) {
  return (
    <>
      <div className="mentor-info-box">
        <MentorButtons link="/mentor/hallway_host/group_attendance">
          Attendance
        </MentorButtons>
      </div>

      <section className="mentor-info-box">
        <InfoBox headerText="Event Details">
          <InfoTable
            headers={["Event", "Date", "Time", "Description"]}
            data={hallwayHostEvents.map((event) => [
              event.name ?? "N/A",
              event.date ?? "N/A",
              event.time ?? "N/A",
              event.description ?? "N/A",
            ])}
          />
        </InfoBox>
      </section>

      <InfoBox headerText="Additional Instruction">
        <EditableContent contentKey="hallway_host_more_details" />
      </InfoBox>
    </>
  );
}
