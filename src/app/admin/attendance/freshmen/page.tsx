"use client";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import SaveButton from "../../../components/saveButton";
import InfoBox from "../../../components/infoBox";
import CheckBoxTable from "../../../components/checkBoxTable";
import "../../../css/admin.css";
import "../../../css/logo+login.css";

export default function AdminAttendanceFreshmen() {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push("/admin/attendance");
  };

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Freshmen Attendance</h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>

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

      <InfoBox headerText="All Freshmen">
        <section>
          <div>
            <CheckBoxTable
              headers={["Freshman Name", "Student ID"]}
              data={[
                ["Student 1", "######"],
                ["Student 2", "######"],
                ["Student 3", "######"],
                ["Student 4", "######"],
                ["Student 5", "######"],
                ["Student 6", "######"],
              ]}
              status={[false, true, false, false, true, false]}
            />
          </div>
        </section>
      </InfoBox>
    </main>
  );
}
