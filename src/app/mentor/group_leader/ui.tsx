import InfoBox from "../../components/infoBox";
import MentorButtons from "../../components/mentorButtons";
import InfoTable from "../../components/infoTable";
import EditableContent from "../../components/EditableContent";

export default function GroupLeaderUI({
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
    <>
      <header className="mentor-header">
        <h1 className="mentor-title">
          Welcome, {mentorsData.fName} {mentorsData.lName}!
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
          <h3 className="mentor-subtitle1">Job:</h3>
          <h3 className="mentor-subtitle2">{mentorsData.job}</h3>
        </div>
      </header>

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
        <InfoBox headerText="Group Details">
          <section>
            <div className="info-pairs">
              <div className="info-pair">
                <div className="info-label">Route #:</div>
                <div className="info-value">1</div>
              </div>
              <div className="info-pair">
                <div className="info-label">Event Order:</div>
                <div className="info-value">LGI, GYM, CCA</div>
              </div>
            </div>
            <div className="info-pairs">
              <div className="info-pair">
                <div className="info-label">Mentor:</div>
                <div className="info-value">
                  <ol className="list-group list-group-numbered">
                    <li className="list-group-item">
                      {mentorsData.fName} {mentorsData.lName}
                    </li>
                  </ol>
                </div>
              </div>
              <div className="info-pairs">
                <div className="info-pair">
                  <div className="info-label">Frehsmen:</div>
                  <div className="info-value">
                    <ol className="list-group list-group-numbered">
                      <li className="list-group-item">
                        Freshman 1
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </section>
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
