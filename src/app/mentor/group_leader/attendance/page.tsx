"use client";

import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import InfoBox from "../../../components/infoBox";
import CheckBoxTable from "../../../components/checkBoxTable";
import "../../../css/mentor.css";
import "../../../css/logo+login.css";

export default function FreshmenAttendancePage() {
  return (
    <main className="mentor-container">
      <LogoButton />
      <LoginButton />

      <header className="mentor-header">
        <h1 className="mentor-title">Freshmen Attendance</h1>
      </header>

      <section className="mentor-info-box">
        <InfoBox headerText="Present?">
          <CheckBoxTable
            headers={["Student Name"]}
            data={[
                    ["Student 1"],
                    ["Student 2"],
                    ["Student 3"],
                  ]}
          />
        </InfoBox>
      </section>
    </main>
  );
}
