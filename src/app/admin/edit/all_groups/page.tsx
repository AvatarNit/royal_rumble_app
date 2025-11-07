"use client";
import { useRouter} from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import AddButton from "../../../components/addButton";
import InfoBox from "../../../components/infoBox";
import EditUserDropdown from "../../../components/editUserDropdown";
import "../../../css/admin.css";
import "../../../css/logo+login.css";

export default function AdminEditGroups() {

  const router = useRouter();
  const handleLogoClick = () => {
      router.push("/admin/edit");
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

     <EditUserDropdown
        header="Freshmen Groups"
        sections={[
          {
            title: "Group 1",
            content: 
              <div className="info-pairs">
                <div className="info-pair">
                  <div className="info-label">Route #:</div>
                  <div className="info-value">10</div>
                </div>
                <div className="info-pair">
                  <div className="info-label">Event Order:</div>
                  <div className="info-value">Tour - LGI - GYM</div>
                </div>
              </div>,
          },
          {
            title: "Group 2",
            content: "edit user details here.",
          },
          {
            title: "Group 3",
            content: "edit user details here.",
          },
        ]}
      />
     <EditUserDropdown
        header="Hallway Groups"
        sections={[
          {
            title: "Hallway Group 1",
            content: "edit user details here.",
          },
          {
            title: "Hallway Group 2",
            content: "edit user details here.",
          },
          {
            title: "Hallway Group 3",
            content: "edit user details here.",
          },
        ]}
      />
    </main>
  );
}