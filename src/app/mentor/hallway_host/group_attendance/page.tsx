"use client";

import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import InfoBox from "../../../components/infoBox";
import CheckBoxTable from "../../../components/checkBoxTable";
import "../../../css/mentor.css";
import "../../../css/logo+login.css";

export default function HallwayHostGroupAttendancePage() {
  return (
    <main className="mentor-container">
      <LogoButton />
      <LoginButton />

      <header className="mentor-header">
        <h1 className="mentor-title">Group Attendance</h1>
      </header>

      <section className="mentor-info-box">
        <InfoBox headerText="Itinerary">
          <CheckBoxTable
            headers={["Group Number", "Time Expected"]}
            data={[
                    ["1", "11:00"],
                    ["4", "11:30"],
                    ["8", "12:00"],
                  ]}
          />
        </InfoBox>
      </section>
    </main>
  );
}
