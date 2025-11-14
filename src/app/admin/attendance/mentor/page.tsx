"use client";
import { useRouter} from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import ViewDropdown from "../../../components/viewDropdown";
import CheckBoxTable from "../../../components/checkBoxTable"
import "../../../css/admin.css";
import "../../../css/logo+login.css";

export default function AdminAttendanceMentor() {

   const router = useRouter();
    const handleLogoClick = () => {
        router.push("/admin/attendance");
    };

  return (
    
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">
            Mentor Attendance
        </h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>

     <ViewDropdown
        header="Events"
        sections={[
          {
            title: "Event: 5/3 Training (Group Leader)",
            content: 
              <section>
                <div className="info-pairs">
                  <div className="info-pair">
                    <div className="info-label">Job Assigned:</div>
                    <div className="info-value">Group leader</div>
                  </div>
                </div>

                <label className="info-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Hallway Host:</label>

                <div style={{ width: 925 }}>
                  <CheckBoxTable
                          headers={["Mentor Name"]}
                          data={[
                            ["Student 1"],
                            ["Student 2"],
                            ["Student 3"]
                          ]}
                  />
                </div>
              </section>
          },
          {
            title: "Event: 6/7 Training (Hallway Host)",
            content: 
              <section>
                <div className="info-pairs">
                  <div className="info-pair">
                    <div className="info-label">Job Assigned:</div>
                    <div className="info-value">Hallway Host</div>
                  </div>
                </div>

                <label className="info-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Hallway Host:</label>

                <div style={{ width: 925 }}>
                  <CheckBoxTable
                          headers={["Mentor Name"]}
                          data={[
                            ["Student 1"],
                            ["Student 2"],
                            ["Student 3"]
                          ]}
                  />
                </div>
              </section>
          },
          {
            title: "Event: Royal Rumble (All)",
            content: 
              <section>
                <div className="info-pairs">
                  <div className="info-pair">
                    <div className="info-label">Job Assigned:</div>
                    <div className="info-value">All</div>
                  </div>
                </div>

                <label className="info-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Group Leader:</label>

                <div style={{ width: 925 }}>
                  <CheckBoxTable
                          headers={["Mentor Name"]}
                          data={[
                            ["Student 1"],
                            ["Student 2"],
                            ["Student 3"]
                          ]}
                  />
                </div>
                <label className="info-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Hallway Host:</label>

                <div style={{ width: 925 }}>
                  <CheckBoxTable
                          headers={["Mentor Name"]}
                          data={[
                            ["Student 1"],
                            ["Student 2"],
                            ["Student 3"]
                          ]}
                  />
                </div>
                <label className="info-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Spirit/ Utility:</label>

                <div style={{ width: 925 }}>
                  <CheckBoxTable
                          headers={["Mentor Name"]}
                          data={[
                            ["Student 1"],
                            ["Student 2"],
                            ["Student 3"]
                          ]}
                  />
                </div>
              </section>
          },
        ]}
      />
    </main>
  );
}