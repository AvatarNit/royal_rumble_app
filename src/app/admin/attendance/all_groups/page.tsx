"use client";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import ViewDropdown from "../../../components/viewDropdown";
import CheckBoxTable from "../../../components/checkBoxTable";
import "../../../css/admin.css";
import "../../../css/logo+login.css";

export default function AdminAttendanceAllGroups() {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push("/admin/attendance");
  };

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Group Attendance</h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>

      <ViewDropdown
        header="Groups"
        sections={[
          {
            title: "Group: 1 (Nico)",
            sectionId: "group1",
            content: (
              <section>
                <label
                  className="info-label"
                  style={{ marginLeft: "20px", marginBottom: "30px" }}
                >
                  Mentor:
                </label>

                <div style={{ width: 925 }}>
                  <CheckBoxTable
                    headers={["Mentor Name"]}
                    data={[["Student 1"]]}
                    status={[false]}
                  />
                </div>
                <label
                  className="info-label"
                  style={{ marginLeft: "20px", marginBottom: "30px" }}
                >
                  Freshmen:
                </label>

                <div style={{ width: 925 }}>
                  <CheckBoxTable
                    headers={["Freshmen Name"]}
                    data={[["Student 1"], ["Student 2"], ["Student 3"]]}
                    status={[false, true, false]}
                  />
                </div>
              </section>
            ),
          },
          {
            title: "Group: 2 (Nithik, John)",
            sectionId: "group2",
            content: (
              <section>
                <label
                  className="info-label"
                  style={{ marginLeft: "20px", marginBottom: "30px" }}
                >
                  Mentor:
                </label>

                <div style={{ width: 925 }}>
                  <CheckBoxTable
                    headers={["Mentor Name"]}
                    data={[["Student 1"], ["Student 2"]]}
                    status={[false, true]}
                  />
                </div>
                <label
                  className="info-label"
                  style={{ marginLeft: "20px", marginBottom: "30px" }}
                >
                  Freshmen:
                </label>

                <div style={{ width: 925 }}>
                  <CheckBoxTable
                    headers={["Freshmen Name"]}
                    data={[["Student 1"], ["Student 2"], ["Student 3"]]}
                    status={[false, true, false]}
                  />
                </div>
              </section>
            ),
          },
          {
            title: "Group: 3 (Paul, Zara)",
            sectionId: "group3",
            content: (
              <section>
                <label
                  className="info-label"
                  style={{ marginLeft: "20px", marginBottom: "30px" }}
                >
                  Mentor:
                </label>

                <div style={{ width: 925 }}>
                  <CheckBoxTable
                    headers={["Mentor Name"]}
                    data={[["Student 1"], ["Student 2"]]}
                    status={[false, true]}
                  />
                </div>
                <label
                  className="info-label"
                  style={{ marginLeft: "20px", marginBottom: "30px" }}
                >
                  Freshmen:
                </label>

                <div style={{ width: 925 }}>
                  <CheckBoxTable
                    headers={["Freshmen Name"]}
                    data={[["Student 1"], ["Student 2"], ["Student 3"]]}
                    status={[false, true, false]}
                  />
                </div>
              </section>
            ),
          },
        ]}
      />
    </main>
  );
}
