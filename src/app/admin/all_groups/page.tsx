"use client";
import { useRouter} from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../components/logoButton";
import LoginButton from "../../components/loginButton";
import SaveButton from "../../components/saveButton";
import ViewDropdown from "../../components/viewDropdown";
import InfoTable from "../../components/infoTable"
import AddButton from "../../components/addButton";
import "../../css/admin.css";
import "../../css/logo+login.css";

export default function AdminAllGroups() {

  const router = useRouter();
    const handleLogoClick = () => {
        router.push("/admin");
    };

  const handleFilter = () => {
 
  };
    
  const groupOptions = ["1", "2", "3", "4"]; 

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title" 
            style={{ marginBottom: "45px" }}>
            All Group Information
        </h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>

      <div className="search-container" style={{ marginLeft: "15%" }}>

        <div className="search-row">
              <div className="form-row">
              <select className="form-select">
                <option value="">Show Group ... </option>
                {groupOptions.map((group, index) => (
                  <option key={index} value={group}>{group}</option>
                ))}
              </select>
            </div>
            <div>
              <SaveButton onClick={handleFilter}>Filter</SaveButton>
            </div>
        </div>
      </div>
      <div style={{ width: "85%", display: "flex", justifyContent: "flex-end",
                          alignItems: "center", marginTop: "20px", fontSize: "15px" }}>
          <AddButton onClick={() => router.push("/admin/add/student")} style={{ fontSize: "21px" }}>
              Add Student
              <i className="bi bi-plus-circle" 
                  style={{ marginLeft: "30px", fontSize: "30px" }}>
              </i>
          </AddButton>
          <AddButton onClick={() => router.push("/admin/add/custom_group")} style={{ fontSize: "25px" }}>
              Add Group
              <i className="bi bi-plus-circle" 
                  style={{ marginLeft: "30px", fontSize: "30px" }}>
              </i>
          </AddButton>
      </div>

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