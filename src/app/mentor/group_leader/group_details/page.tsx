"use client";

import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import InfoBox from "../../../components/infoBox";
import InfoTable from "../../../components/infoTable";
import "../../../css/mentor.css";
import "../../../css/logo+login.css";

export default function GroupLeaderGroupDetails() {
  return (
    <main className="mentor-container">
      <LogoButton />
      <LoginButton />

      <header className="mentor-header">
        <h1 className="mentor-title">Group Details</h1>
      </header>

      <section className="mentor-info-box">
        <InfoBox headerText="Event Details">
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
    </main>
  );
}

