"use client";

import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import InfoBox from "../../../components/infoBox";
import InfoTable from "../../../components/infoTable";
import "../../../css/mentor.css";
import "../../../css/logo+login.css";

export default function GroupLeaderRoute() {
  return (
    <main className="mentor-container">
      <LogoButton />
      <LoginButton />

      <header className="mentor-header">
        <h1 className="mentor-title">Route</h1>
      </header>

      <section className="mentor-info-box">
        <InfoBox headerText="Itinerary">
          <div className="info-pairs">
                <div className="info-pair">
                  <div className="info-label">Route #:</div>
                  <div className="info-label">5</div>
                </div>
          </div>
          <InfoTable
                      headers={["Location", "Time"]}
                      data={[
                        ["J Hallway (upstairs)", "11:00"],
                        ["F Hallway (downstairs)", "11:30"]
                      ]}
                    />
        </InfoBox>
      </section>
    </main>
  );
}
