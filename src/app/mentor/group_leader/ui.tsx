import InfoBox from "../../components/infoBox";
import MentorButtons from "../../components/mentorButtons";
import InfoTable from "../../components/infoTable";
import EditableContent from "../../components/EditableContent";

export default function GroupLeaderUI({
  groupLeaderEvents,
}: {
  groupLeaderEvents: Array<{
    eventId: number;
    name: string | null;
    date: string | null;
    time: string | null;
    description: string | null;
  }>;
}) {
  return (
    <>
      <div
        className="mentor-info-box"
        style={{ flexDirection: "row", gap: "20px" }}
      >
        <MentorButtons link="/mentor/group_leader/attendance">
          Attendance
        </MentorButtons>
        <MentorButtons link="/mentor/group_leader/route">Route</MentorButtons>
      </div>

      <section className="mentor-info-box">
        <InfoBox headerText="Event Details">
          <div
            style={{
              color: "var(--primaryBlue)",
              fontWeight: "bold",
              fontSize: "30px",
              margin: "10px 0px",
            }}
          >
            Dates:
          </div>

          <InfoTable
            headers={["Event", "Date", "Time", "Description"]}
            data={groupLeaderEvents.map((event) => [
              event.name ?? "N/A",
              event.date ?? "N/A",
              event.time ?? "N/A",
              event.description ?? "N/A",
            ])}
          />
        </InfoBox>
      </section>

      <InfoBox headerText="Additional Instruction">
        <EditableContent contentKey="group_leader_more_details" />
      </InfoBox>
    </>
  );
}
