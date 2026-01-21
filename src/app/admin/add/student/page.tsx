"use client";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import AddButton from "../../../components/addButton";
import SaveButton from "../../../components/saveButton";
import InfoBox from "../../../components/infoBox";
import EditUserDropdown from "../../../components/editUserDropdown";
import EditTable from "../../../components/editTable";
import "../../../css/admin.css";
import "../../../css/logo+login.css";

export default function AdminAddStudent() {
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
        <h1 className="admin-title">Add Student</h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>

      <InfoBox headerText="Manual Add">
        <div className="form-container">
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
              <label className="form-label">Student First Name:</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter First Name"
              />
            </div>

            <div className="form-row">
              <label className="form-label">Student Last Name:</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter Last Name"
              />
            </div>

            <div className="form-row">
              <label className="form-label">Student ID:</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter ID"
              />
            </div>

            <div className="form-row">
              <select className="form-select">
                <option value="">Assign to Group... </option>
                {groupOptions.map((group, index) => (
                  <option key={index} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div className="save-button-wrapper">
              <AddButton>
                Add
                <i
                  className="bi bi-plus-circle"
                  style={{ marginLeft: "30px", fontSize: "30px" }}
                ></i>
              </AddButton>
            </div>
          </form>
        </div>
      </InfoBox>
    </main>
  );
}
