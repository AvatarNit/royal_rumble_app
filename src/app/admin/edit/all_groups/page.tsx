"use client";
import { useRouter} from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import AddButton from "../../../components/addButton";
import SaveButton from "../../../components/saveButton";
import InfoBox from "../../../components/infoBox";
import EditUserDropdown from "../../../components/editUserDropdown";
import EditTable from "../../../components/editTable"
import "../../../css/admin.css";
import "../../../css/logo+login.css";

export default function AdminEditGroups() {

  const router = useRouter();
  const handleLogoClick = () => {
      router.push("/admin/all_groups");
  };

  const groupOptions = ["1", "2", "3", "4"]; 

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Edit All Groups</h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>

      <InfoBox headerText="Manual Add">
        <div className= "form-container">
          <form className="manual-add-form">

            <div className="form-row checkbox-row">
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" />
                Freshman
              </label>

              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" />
                Mentor
              </label>
            </div>

            <div className="form-row">
              <label className="form-label">Student Name:</label>
              <input type="text" className="form-input" placeholder="Enter Name" />
            </div>

            <div className="form-row">
              <label className="form-label">Student ID:</label>
              <input type="text" className="form-input" placeholder="Enter ID" />
            </div>

            <div className="form-row">
              <select className="form-select">
                <option value="">Assign to Group... </option>
                {groupOptions.map((group, index) => (
                  <option key={index} value={group}>{group}</option>
                ))}
              </select>
            </div>

            <div className="save-button-wrapper">
              <AddButton> 
                Add 
                <i className="bi bi-plus-circle" 
                  style={{ marginLeft: "30px", fontSize: "30px" }}>
                </i>
              </AddButton>
            </div>
          </form>
        </div>
      </InfoBox>

      <div className="search-container">
        <div className="search-row">
          <input
            type="text"
            placeholder="Search Name/ ID..."
            className="search-input"
          />
          <div>
            <SaveButton>Filter</SaveButton>
          </div>
        </div>
      </div>

     <EditUserDropdown
        header="Freshmen Groups"
        sections={[
          {
            title: "Group 1 (Mentor assigned)",
            content: 
              <section>
                <div className="edit-group-row">
                  <div className="edit-group-pair">
                    <label className="edit-group-label">Route #:</label>
                    <input type="text" className="edit-group-input" placeholder="Route #..." />
                  </div>
                  <div className="edit-group-pair">
                    <label className="edit-group-label">Event Order: </label>
                    <input type="text" className="edit-group-input" placeholder="Event Order..." />
                  </div>
                </div>

                <label className="edit-group-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Mentors:</label>
                <div >
                  <EditTable
                          headers={["Mentor Name"]}
                          data={[
                            ["Student 1"],
                            ["Student 2"],
                            ["Student 3"],
                          ]}
                  />
                </div>
                <label className="edit-group-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Freshmen:</label>
                <div style={{ width: 925 }}>
                  <EditTable
                          headers={["Freshman Name"]}
                          data={[
                            ["Student 1"],
                            ["Student 2"],
                            ["Student 3"],
                          ]}
                  />
                </div>
              </section>
          },
          {
            title: "Group 2 (Mentor assigned)",
            content: 
              <section>
                <div className="edit-group-row">
                  <div className="edit-group-pair">
                    <label className="edit-group-label">Route #:</label>
                    <input type="text" className="edit-group-input" placeholder="Route #..." />
                  </div>
                  <div className="edit-group-pair">
                    <label className="edit-group-label">Event Order: </label>
                    <input type="text" className="edit-group-input" placeholder="Event Order..." />
                  </div>
                </div>

                <label className="edit-group-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Mentors:</label>
                <div style={{ width: 925 }}>
                  <EditTable
                          headers={["Mentor Name"]}
                          data={[
                            ["Student 1"],
                            ["Student 2"],
                            ["Student 3"],
                          ]}
                  />
                </div>
                <label className="edit-group-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Freshmen:</label>
                <div style={{ width: 925 }}>
                  <EditTable
                          headers={["Freshman Name"]}
                          data={[
                            ["Student 1"],
                            ["Student 2"],
                            ["Student 3"],
                          ]}
                  />
                </div>
              </section>
          },
          {
            title: "Group 3 (Mentor assigned)",
            content: 
              <section>
                <div className="edit-group-row">
                  <div className="edit-group-pair">
                    <label className="edit-group-label">Route #:</label>
                    <input type="text" className="edit-group-input" placeholder="Route #..." />
                  </div>
                  <div className="edit-group-pair">
                    <label className="edit-group-label">Event Order: </label>
                    <input type="text" className="edit-group-input" placeholder="Event Order..." />
                  </div>
                </div>

                <label className="edit-group-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Mentors:</label>
                <div style={{ width: 925 }}>
                  <EditTable
                          headers={["Mentor Name"]}
                          data={[
                            ["Student 1"],
                            ["Student 2"],
                            ["Student 3"],
                          ]}
                  />
                </div>
                <label className="edit-group-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Freshmen:</label>
                <div style={{ width: 925 }}>
                  <EditTable
                          headers={["Freshman Name"]}
                          data={[
                            ["Student 1"],
                            ["Student 2"],
                            ["Student 3"],
                          ]}
                  />
                </div>
              </section>
          },
        ]}
      />
     <EditUserDropdown
        header="Hallway Groups"
        sections={[
          {
            title: "Hallway 1 (Mentor assigned)",
            content: 
              <section>
                <div className="edit-group-row">
                  <div className="edit-group-pair">
                    <label className="edit-group-label">Location:</label>
                    <input type="text" className="edit-group-input" placeholder="Hallway..." />
                  </div>
                </div>

                <label className="edit-group-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Mentors:</label>
                <div style={{ width: 925 }}>
                  <EditTable
                          headers={["Mentor Name"]}
                          data={[
                            ["Student 1"],
                            ["Student 2"],
                            ["Student 3"],
                          ]}
                  />
                </div>
              </section>
          },
          {
            title: "Hallway 2 (Mentor assigned)",
            content: 
              <section>
                <div className="edit-group-row">
                  <div className="edit-group-pair">
                    <label className="edit-group-label">Location:</label>
                    <input type="text" className="edit-group-input" placeholder="Hallway..." />
                  </div>
                </div>

                <label className="edit-group-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Mentors:</label>
                 <div style={{ width: 925 }}>
                  <EditTable
                          headers={["Mentor Name"]}
                          data={[
                            ["Student 1"],
                            ["Student 2"],
                            ["Student 3"],
                          ]}
                  />
                </div>
              </section>
          },
          {
            title: "Hallway 3 (Mentor assigned)",
            content: 
              <section>
                <div className="edit-group-row">
                  <div className="edit-group-pair">
                    <label className="edit-group-label">Location:</label>
                    <input type="text" className="edit-group-input" placeholder="Hallway..." />
                  </div>
                </div>

                <label className="edit-group-label" 
                       style={{ marginLeft: "20px", marginBottom: "30px"}}>Mentors:</label>
                 <div style={{ width: 925 }}>
                  <EditTable
                          headers={["Mentor Name"]}
                          data={[
                            ["Student 1"],
                            ["Student 2"],
                            ["Student 3"],
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