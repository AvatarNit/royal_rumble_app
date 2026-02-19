import LogoButton from "../../components/logoButton";
import LoginButton from "../../components/loginButton";
import InfoBox from "../../components/infoBox";
import MentorButtons from "../../components/mentorButtons";
import InfoTable from "../../components/infoTable";
import "../../css/mentor.css";
import "../../css/logo+login.css";
import EditableContent from "../../components/EditableContent";

export default function GroupLeaderHomepageUI({
  mentorsData,
  groupLeaderEvents,
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
  groupLeaderEvents: Array<{
    eventId: number;
    name: string | null;
    date: string | null;
    time: string | null;
    description: string | null;
  }>;
}) {
  return (
    <main className="mentor-container">
      <LogoButton />
      <LoginButton />

      <header className="mentor-header">
        <h1 className="mentor-title">
          Welcome, {mentorsData?.fName} {mentorsData?.lName}!
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            margin: "20px 0px 0px",
          }}
        >
          <h3 className="mentor-subtitle1">Job: </h3>
          <h3 className="mentor-subtitle2"> {mentorsData?.job}</h3>
        </div>
      </header>

      <section
        className="mentor-info-box"
        style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            margin: "30px",
          }}
        >
          <MentorButtons link="/mentor/group_leader/group_details">
            Group Details
          </MentorButtons>
          <MentorButtons link="/mentor/group_leader/attendance">
            Attendance
          </MentorButtons>
          <MentorButtons link="/mentor/group_leader/route">Route</MentorButtons>
        </div>

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
              event.name || "N/A",
              event.date || "N/A",
              event.time || "N/A",
              event.description || "N/A",
            ])}
          />
        </InfoBox>
      </section>
      <InfoBox headerText="Additional Instruction">
        <div
          style={{
            margin: "10px 20px",
            color: "var(--primaryBlue)",
            fontSize: "30px",
            lineHeight: "1.6",
          }}
        >
          <EditableContent contentKey="group_leader_more_details" />
        </div>
      </InfoBox>
    </main>
  );
}
