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

      <div className="mentor-info-box"
        style={{
          flexDirection: "row",
          gap: "20px"
        }}
      >
        <MentorButtons link="/mentor/group_leader/attendance">
          Attendance
        </MentorButtons>
        <MentorButtons link="/mentor/group_leader/route">Route</MentorButtons>
      </div>
      
      <section className="mentor-info-box">
        <InfoBox headerText="Group Details">
          <div className="info-pairs">
            <div className="info-pair">
              <div className="info-label">Group #:</div>
              <div className="info-value">1</div>
            </div>
            <div className="info-pair">
              <div className="info-label">Partner(s):</div>
              <div className="info-value">Nico, Nithik</div>
            </div>
            <div className="info-pair">
              <div className="info-label">Route #:</div>
              <div className="info-value">10</div>
            </div>
            <div className="info-pair">
              <div className="info-label">Event Order:</div>
              <div className="info-value">Tour - LGI - GYM</div>
            </div>
          </div>

          <div className="freshmen-label">Freshmen:</div>
          <InfoTable
            headers={["Student Name", "Interest", "Prime Language", "Shirt Size"]}
            data={[
              ["John Doe", "Math", "English", "M"],
              ["Jane Smith", "Science", "Spanish", "L"],
            ]}
          />
        </InfoBox>
      </section>

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
