import type { Metadata } from "next";
import LogoButton from "../../components/logoButton";
import LoginButton from "../../components/loginButton";
import InfoBox from "../../components/infoBox";
import MentorButtons from "../../components/mentorButtons";
import InfoTable from "../../components/infoTable";
import "../../css/mentor.css";
import "../../css/logo+login.css";

export default function GroupLeaderHomepage() {

  return (
     <main className="mentor-container">
      <LogoButton />
      <LoginButton />

      <header className="mentor-header">
        <h1 className="mentor-title">Welcome, Mentor Name!</h1>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center",
                      justifyContent: "center", margin: "20px 0px 0px" }}>
          <h3 className="mentor-subtitle1">Job: </h3>
          <h3 className="mentor-subtitle2"> Group Leader</h3>
        </div>
      </header>

      <section className="mentor-info-box" style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", margin: "30px" }}>
          <MentorButtons link="/mentor/group_leader/group_details">Group Details</MentorButtons>
          <MentorButtons link="/mentor/group_leader/attendance">Attendance</MentorButtons>
          <MentorButtons link="/mentor/group_leader/route">Route</MentorButtons>
        </div>

        <InfoBox headerText="Event Details">
          <div style={{ color: "var(--primaryBlue)", fontWeight: "bold", fontSize: "30px", margin: "10px 0px" }}>
            Dates:
          </div>
          <InfoTable
            headers={["Event", "Date", "Time", "Description"]}
            data={[
              ["Training", "06/01/2023", "10:00 AM", "Training session for new mentors"],
              ["Royal Rumble", "06/03/2023", "12:00 PM", "Annual Royal Rumble event"],
            ]}
          />
        </InfoBox>
      </section>
    </main>
  );
}
