"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../components/logoButton";
import LoginButton from "../../components/loginButton";
import ViewDropdown from "../../components/viewDropdown";
import InfoTable from "../../components/infoTable"
import "../../css/admin.css";
import "../../css/logo+login.css";

export default function AdminViewGroups() {

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title" 
            style={{ marginBottom: "45px" }}>
            View All Group Information
        </h1>
      </header>

     <ViewDropdown
        header="Freshmen Groups"
        sections={[
          {
            title: "Group 1 (Mentor assigned)",
            content: 
              <section>
                <div className="info-pairs">
                  <div className="info-pair">
                    <div className="info-label">Route #:</div>
                    <div className="info-value">10</div>
                  </div>
                  <div className="info-pair">
                    <div className="info-label">Event Order:</div>
                    <div className="info-value">Tour - LGI - GYM</div>
                  </div>
                </div>
                <div className="info-pair" 
                      style={{ marginBottom: "50px", 
                      marginTop: "30px"}}>
                  <label className="info-label">Most Recent Stop:</label>
                  <div className="info-value">A Hallway</div>
                </div>

                <label className="info-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Mentors:</label>
                <div style={{ width: 925 }}>
                  <InfoTable
                          headers={["Mentor Name", "Student ID"]}
                          data={[
                            ["Student 1", "######"],
                            ["Student 2", "######"],
                            ["Student 3", "######"],
                          ]}
                  />
                </div>
                <label className="info-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Freshmen:</label>
                <div style={{ width: 925 }}>
                  <InfoTable
                          headers={["Freshman Name", "Student ID"]}
                          data={[
                            ["Student 1", "######"],
                            ["Student 2", "######"],
                            ["Student 3", "######"],
                          ]}
                  />
                </div>
              </section>
          },
          {
            title: "Group 2 (Mentor assigned)",
            content: 
              <section>
                <div className="info-pairs">
                  <div className="info-pair">
                    <div className="info-label">Route #:</div>
                    <div className="info-value">11</div>
                  </div>
                  <div className="info-pair">
                    <div className="info-label">Event Order:</div>
                    <div className="info-value">LGI - Tour - GYM</div>
                  </div>
                </div>
                <div className="info-pair" 
                     style={{ marginBottom: "50px", 
                     marginTop: "30px"}}>
                  <label className="info-label">Most Recent Stop:</label>
                  <div className="info-value">B Hallway</div>
                </div>

                <label className="info-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Mentors:</label>
                <div style={{ width: 925 }}>
                  <InfoTable
                          headers={["Mentor Name", "Student ID"]}
                          data={[
                            ["Student 1", "######"],
                            ["Student 2", "######"],
                            ["Student 3", "######"],
                          ]}
                  />
                </div>
                <label className="info-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Freshmen:</label>
                <div style={{ width: 925 }}>
                  <InfoTable
                          headers={["Freshman Name", "Student ID"]}
                          data={[
                            ["Student 1", "######"],
                            ["Student 2", "######"],
                            ["Student 3", "######"],
                          ]}
                 />
                </div>
              </section>
          },
          {
            title: "Group 3 (Mentor assigned)",
            content: 
              <section>
                <div className="info-pairs">
                  <div className="info-pair">
                    <div className="info-label">Route #:</div>
                    <div className="info-value">5</div>
                  </div>
                  <div className="info-pair">
                    <div className="info-label">Event Order:</div>
                    <div className="info-value">GYM - LGI - Tour</div>
                  </div>
                </div>
                <div className="info-pair" 
                      style={{ marginBottom: "50px", 
                      marginTop: "30px"}}>
                  <label className="info-label">Most Recent Stop:</label>
                  <div className="info-value">J Hallway (Downstairs)</div>
                </div>

                <label className="info-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Mentors:</label>
                <div style={{ width: 925 }}>
                  <InfoTable
                          headers={["Mentor Name", "Student ID"]}
                          data={[
                            ["Student 1", "######"],
                            ["Student 2", "######"],
                            ["Student 3", "######"],
                          ]}
                  />
                </div>
                <label className="info-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Freshmen:</label>
                <div style={{ width: 925 }}>
                  <InfoTable
                          headers={["Freshmen Name", "Student ID"]}
                          data={[
                            ["Student 1", "######"],
                            ["Student 2", "######"],
                            ["Student 3", "######"],
                          ]}
                  />
                </div>
              </section>
          },
        ]}
      />
     <ViewDropdown
        header="Hallway Groups"
        sections={[
          {
            title: "Hallway 1 (Mentor assigned)",
            content: 
              <section>
                <div className="info-pairs">
                  <div className="info-pair" 
                       style={{ marginBottom: "50px", 
                       marginTop: "30px"}}>
                    <div className="info-label" >Location:</div>
                    <div className="info-value">B Hallway</div>
                  </div>
                </div>

                <label className="info-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Mentors:</label>
                <div style={{ width: 925 }}>
                  <InfoTable
                          headers={["Mentor Name", "Student ID"]}
                          data={[
                            ["Student 1", "######"],
                            ["Student 2", "######"],
                            ["Student 3", "######"],
                          ]}
                  />
                </div>
              </section>
          },
          {
            title: "Hallway 2 (Mentor assigned)",
            content: 
              <section>
                <div className="info-pairs">
                  <div className="info-pair" 
                       style={{ marginBottom: "50px", 
                       marginTop: "30px"}}>
                    <div className="info-label">Location:</div>
                    <div className="info-value">A Hallway</div>
                  </div>
                </div>

                <label className="info-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Mentors:</label>
                 <div style={{ width: 925 }}>
                  <InfoTable
                          headers={["Mentor Name", "Student ID"]}
                          data={[
                            ["Student 1", "######"],
                            ["Student 2", "######"],
                            ["Student 3", "######"],
                          ]}
                  />
                </div>
              </section>
          },
          {
            title: "Hallway 3 (Mentor assigned)",
            content: 
              <section>
                <div className="info-pairs">
                  <div className="info-pair" 
                       style={{ marginBottom: "50px", 
                       marginTop: "30px"}}>
                    <div className="info-label">Location:</div>
                    <div className="info-value">J Hallway (Upstairs)</div>
                  </div>
                </div>


                <label className="info-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Mentors:</label>
                 <div style={{ width: 925 }}>
                  <InfoTable
                          headers={["Mentor Name", "Student ID"]}
                          data={[
                            ["Student 1", "######"],
                            ["Student 2", "######"],
                            ["Student 3", "######"],
                          ]}
                  />
                </div>
              </section>
          }
        ]}
      />
    </main>
  );
}