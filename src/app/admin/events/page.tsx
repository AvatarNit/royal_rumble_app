"use client";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../components/logoButton";
import LoginButton from "../../components/loginButton";
import ViewDropdown from "../../components/viewDropdown";
import CheckBoxTable from "../../components/checkBoxTable";
import AddButton from "../../components/addButton";
import "../../css/admin.css";
import "../../css/logo+login.css";

export default function AdminEvents() {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push("/admin");
  };

  const handleFilter = () => {};

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title" style={{ marginBottom: "30px" }}>
          All Event Information
        </h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>

      {/* --- CHECKBOXES FOR GROUP VISIBILITY --- */}
      <div style={{ width: "85%", marginTop: "20px" }}>
        <div className="form-container" style={{ margin: "0px" }}>
          <form className="manual-add-form">
            <div className="form-row checkbox-row">
              <label className="checkbox-label">
                <input
                  type="radio"
                  name="groupType"
                  value="freshmen"
                  className="checkbox-input"
                />
                All
              </label>
              <label className="checkbox-label">
                <input
                  type="radio"
                  name="groupType"
                  value="freshmen"
                  className="checkbox-input"
                />
                Group Leader
              </label>
              <label className="checkbox-label">
                <input
                  type="radio"
                  name="groupType"
                  value="hallway"
                  className="checkbox-input"
                />
                Hallway Host
              </label>
              <label className="checkbox-label">
                <input
                  type="radio"
                  name="groupType"
                  value="hallway"
                  className="checkbox-input"
                />
                Spirit
              </label>
              <label className="checkbox-label">
                <input
                  type="radio"
                  name="groupType"
                  value="hallway"
                  className="checkbox-input"
                />
                Utility
              </label>
            </div>
          </form>
        </div>
      </div>

      <div
        style={{
          width: "87%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
          fontSize: "15px",
        }}
      >
        <AddButton
          onClick={() => router.push("/admin/add/event")}
          style={{ fontSize: "21px", justifyContent: "flex-start" }}
        >
          Add Event
          <i
            className="bi bi-plus-circle"
            style={{ marginLeft: "30px", fontSize: "30px" }}
          ></i>
        </AddButton>
      </div>

      <ViewDropdown
        header="Event Information"
        editLink="/admin/edit/event"
        sections={[
          {
            title: "Event Name",
            content: (
              <section>
                <div className="info-pairs">
                  <div className="info-pair">
                    <div className="info-label">Event Name:</div>
                    <div className="info-value">Name</div>
                  </div>
                  <div className="info-pair">
                    <div className="info-label">Date:</div>
                    <div className="info-value">Date</div>
                  </div>
                  <div className="info-pair">
                    <div className="info-label">Time:</div>
                    <div className="info-value">Time</div>
                  </div>
                  <div className="info-pair">
                    <div className="info-label">Location:</div>
                    <div className="info-value">Location</div>
                  </div>
                  <div className="info-pair">
                    <div className="info-label">Assigned to:</div>
                    <div className="info-value">All</div>
                  </div>
                </div>
                  <label className="info-label">Description:</label>
                  <div className="info-value">Description about this event and more information event infoarmtion.</div>
                <div
                  className="info-pair"
                  style={{ marginBottom: "50px" }}
                >
                </div>

                <label className="info-label" style={{ marginBottom: "30px" }}>
                  Mentors:
                </label>
                <div style={{ width: "100%" }}>
                  <CheckBoxTable
                    headers={["Mentor Name", "Student ID"]}
                    data={[
                      ["Student 1", "######"],
                      ["Student 2", "######"],
                      ["Student 3", "######"],
                    ]}
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
