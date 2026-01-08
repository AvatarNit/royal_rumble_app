"use client";

import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../components/logoButton";
import LoginButton from "../../components/loginButton";
import InfoBox from "../../components/infoBox";
import "../../css/admin.css";
import "../../css/logo+login.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSeminarGroups, createGroups, syncGroups } from "@/actions/group";
import { Popover, OverlayTrigger } from "react-bootstrap";

export default function AdminUpload() {
  const [messages, setMessages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [funnyText, setFunnyText] = useState<Record<string, string>>({});

  const runGrouping = async () => {
    return await createSeminarGroups();
  };

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    tableName: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading((prev) => ({ ...prev, [tableName]: true }));
    setProgress((prev) => ({ ...prev, [tableName]: 0 }));
    setMessages((prev) => ({ ...prev, [tableName]: "" }));
    setFunnyText((prev) => ({ ...prev, [tableName]: "" }));

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("table", tableName);

      // Smooth progress animation with funny messages
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.random() * 0.65;
        if (currentProgress > 99) currentProgress = 99;
        setProgress((prev) => ({ ...prev, [tableName]: currentProgress }));

        // Funny messages at certain intervals
        if (currentProgress >= 20 && currentProgress < 40) {
          setFunnyText((prev) => ({
            ...prev,
            [tableName]: "Just getting started...",
          }));
        } else if (currentProgress >= 50 && currentProgress < 70) {
          setFunnyText((prev) => ({
            ...prev,
            [tableName]: "Halfway there, keep calm!",
          }));
        } else if (currentProgress >= 80 && currentProgress < 90) {
          setFunnyText((prev) => ({
            ...prev,
            [tableName]: "Indian sweets are being cooked",
          }));
        } else if (currentProgress >= 99) {
          setFunnyText((prev) => ({
            ...prev,
            [tableName]:
              "This is a fake progress bar... but if you are seeing this, it is still working!",
          }));
        } else {
          setFunnyText((prev) => ({ ...prev, [tableName]: "" }));
        }
      }, 100);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);

      const data = await res.json();
      setProgress((prev) => ({ ...prev, [tableName]: 100 }));
      setFunnyText((prev) => ({ ...prev, [tableName]: "" }));

      // Display number of inserted rows
      const fullMessage = data.message || "Upload Failed";
      const truncatedMessage = fullMessage.includes("inserted")
        ? fullMessage.split("inserted")[0] + "inserted"
        : fullMessage;

      setMessages((prev) => ({
        ...prev,
        [tableName]: truncatedMessage,
      }));
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setMessages((prev) => ({
        ...prev,
        [tableName]: "Upload failed: " + errorMessage,
      }));
      setProgress((prev) => ({ ...prev, [tableName]: 0 }));
      setFunnyText((prev) => ({ ...prev, [tableName]: "" }));
    } finally {
      setLoading((prev) => ({ ...prev, [tableName]: false }));
      e.target.value = ""; // reset file input
    }
  };

  const router = useRouter();
  const handleLogoClick = () => {
    router.push("/admin");
  };

  const buttonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--primaryBlue)",
    color: "white",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    fontSize: "20px",
    border: "5px solid transparent",
    borderRadius: "14px",
    padding: "5px 5px",
    textAlign: "center" as const,
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const buttonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "white";
    e.currentTarget.style.color = "var(--primaryBlue)";
    e.currentTarget.style.borderColor = "var(--primaryBlue)";
  };

  const buttonUnhover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "var(--primaryBlue)";
    e.currentTarget.style.color = "white";
    e.currentTarget.style.borderColor = "transparent";
  };

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Upload Data</h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>

      <section className="upload-section">
        <InfoBox headerText="">
          <div className="upload-form">
            {/* Inputs needed */}
            {[
              {
                label: "GoFan → Freshmen Data",
                table: "freshmen_data",
                headers:
                  "Freshmen ID,	First Name,	Last Name,	Shirt Size,	Email,	Primary Language,	Interests,	Health Concerns",
              },
              {
                label: "Freshman Prep Classes → Seminar Data",
                table: "seminar_data",
                headers:
                  "Last Name,	First Name,	Freshmen ID,	semester,	Teacher full name,	Period",
              },
              {
                label: "Mentor Data",
                table: "mentor_data",
                headers:
                  "Mentor ID,	First Name,	Last Name,	Graduation Year,	Job,	Pizza,	Languages,	Training Day,	Shirt Size,	Phone Number, Email",
              },
              {
                label: "Mentor Group Assignments",
                table: "group_leader_data",
                headers:
                  "Mentor ID, First Name(Optional), Last Name(Optional), Group ID",
              },
            ].map((item) => (
              // Giving all of the inputs the proper elements
              <div
                key={item.table}
                className="upload-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.5fr 2fr 2fr",
                  rowGap: "0.5rem",
                  alignItems: "center",
                  marginBottom: "2rem",
                }}
              >
                {/* Label + upload input */}
                <label style={{ gridColumn: "1 / 2" }}>
                  Upload {item.label}:
                </label>
                <div
                  className="file-input-wrapper d-flex align-items-center"
                  style={{ gridColumn: "2 / 4", gap: "0.5rem" }}
                >
                  <input
                    type="file"
                    className="file-input flex-grow-1"
                    accept=".xlsx,.xls"
                    onChange={(e) => handleUpload(e, item.table)}
                    disabled={loading[item.table]}
                  />
                  {loading[item.table] ? (
                    <div className="spinner-border text-danger" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <button className="upload-icon" disabled>
                      <i className="bi bi-cloud-upload-fill"></i>
                    </button>
                  )}
                </div>

                {/* Popover Status Button */}
                <OverlayTrigger
                  trigger="click"
                  rootClose
                  placement="right"
                  overlay={
                    <Popover id={`popover-${item.table}`}>
                      <Popover.Header as="h3">
                        Column Headers should be:
                      </Popover.Header>
                      <Popover.Body>{item.headers}</Popover.Body>
                    </Popover>
                  }
                >
                  <button
                    style={buttonStyle}
                    onMouseEnter={buttonHover}
                    onMouseLeave={buttonUnhover}
                    type="button"
                  >
                    Column Details
                  </button>
                </OverlayTrigger>
                {/* Success/Error message */}
                <p
                  style={{
                    gridColumn: "1 / 2",
                    margin: 0,
                    color:
                      messages[item.table] === "Upload Failed"
                        ? "red"
                        : "green",
                    fontWeight: "bold",
                  }}
                >
                  {messages[item.table]}
                </p>

                {/* Progress bar */}
                {progress[item.table] !== undefined && (
                  <div style={{ gridColumn: "2 / 4" }}>
                    <div
                      className="progress"
                      style={{ height: "25px", width: "100%" }}
                    >
                      <div
                        className={`progress-bar ${
                          progress[item.table] === 100
                            ? "bg-success"
                            : "progress-bar-striped progress-bar-animated"
                        }`}
                        role="progressbar"
                        style={{
                          width: `${progress[item.table]}%`,
                          transition: "width 0.2s",
                        }}
                        aria-valuenow={progress[item.table]}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        {Math.floor(progress[item.table])}%{" "}
                        {funnyText[item.table] && ` - ${funnyText[item.table]}`}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Group Itinerary placeholder */}
            <div className="upload-row">
              <label>Upload Group Itinerary & Event Order:</label>
              <div className="file-input-wrapper">
                <input type="file" className="file-input" disabled />
              </div>
              <button className="upload-icon" disabled>
                <i className="bi bi-cloud-upload-fill"></i>
              </button>
              <p style={{ opacity: 0.5 }}>Coming soon</p>
            </div>
          </div>
        </InfoBox>
      </section>
      <button
        onClick={async () => {
          const groupingReturn = await runGrouping();
          alert(
            `Groups assigned! Final group count: ${groupingReturn.finalGroupCount}`
          );
        }}
      >
        Assign Groups
      </button>
      <button
        onClick={async () => {
          const groupTotal = await createGroups();
          alert(`Created Groups: ${groupTotal}`);
        }}
      >
        Create Groups
      </button>
      <button
        onClick={async () => {
          const syncResult = await syncGroups();
          alert(
            `Groups synced: ${syncResult.success} \n ${JSON.stringify(
              syncResult.unmatched
            )}`
          );
        }}
      >
        Sync Groups
      </button>
    </main>
  );
}
