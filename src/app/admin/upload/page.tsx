"use client";

import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../components/logoButton";
import LoginButton from "../../components/loginButton";
import InfoBox from "../../components/infoBox";
import ContentModal from "../../components/ContentModal";
import "../../css/admin.css";
import "../../css/logo+login.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSeminarGroups, syncGroups } from "@/actions/group";
import { createGroupsFromDB } from "@/actions/routes";  // ← only new import
import { Popover, OverlayTrigger } from "react-bootstrap";
import { useAlert } from "../../context/AlertContext";

export const runtime = "nodejs";

export default function AdminUpload() {
  const [messages, setMessages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [funnyText, setFunnyText] = useState<Record<string, string>>({});

  const { showAlert } = useAlert();
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/admin");
  };

  // Upload handler — identical to original
  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    table: string,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading((prev) => ({ ...prev, [table]: true }));
    setProgress((prev) => ({ ...prev, [table]: 0 }));
    setMessages((prev) => ({ ...prev, [table]: "" }));
    setFunnyText((prev) => ({ ...prev, [table]: "" }));

    try {
      // Convert Excel to base64
      const arrayBuffer = await file.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");

      // Smooth fake progress
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.random() * 0.65;
        if (currentProgress > 99) currentProgress = 99;
        setProgress((prev) => ({ ...prev, [table]: currentProgress }));

        if (currentProgress >= 20 && currentProgress < 40)
          setFunnyText((prev) => ({
            ...prev,
            [table]: "Just getting started...",
          }));
        else if (currentProgress >= 50 && currentProgress < 70)
          setFunnyText((prev) => ({
            ...prev,
            [table]: "Halfway there, keep calm!",
          }));
        else if (currentProgress >= 80 && currentProgress < 90)
          setFunnyText((prev) => ({
            ...prev,
            [table]: "Indian sweets are being cooked",
          }));
        else if (currentProgress >= 99)
          setFunnyText((prev) => ({ ...prev, [table]: "Almost done!" }));
        else setFunnyText((prev) => ({ ...prev, [table]: "" }));
      }, 100);

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileData: base64, table }),
      });

      const data = await res.json();
      clearInterval(interval);
      setProgress((prev) => ({ ...prev, [table]: 100 }));
      setFunnyText((prev) => ({ ...prev, [table]: "" }));

      if (data.error) {
        setMessages((prev) => ({ ...prev, [table]: `❌ ${data.error}` }));
      } else {
        setMessages((prev) => ({ ...prev, [table]: data.message }));
      }
    } catch (err: any) {
      setMessages((prev) => ({
        ...prev,
        [table]: "❌ Upload failed. Please try again.",
      }));
      setProgress((prev) => ({ ...prev, [table]: 0 }));
      setFunnyText((prev) => ({ ...prev, [table]: "" }));
    } finally {
      setLoading((prev) => ({ ...prev, [table]: false }));
      e.target.value = "";
    }
  };

  const buttonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--primaryBlue)",
    color: "white",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    fontSize: "21px",
    border: "5px solid transparent",
    borderRadius: "14px",
    padding: "5px 5px",
    textAlign: "center" as const,
    cursor: "pointer",
    transition: "background-color 0.3s",
    width: "270px"
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

  const buttonStyle2 = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--primaryRed)",
    color: "white",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    fontSize: "21px",
    border: "5px solid transparent",
    borderRadius: "14px",
    padding: "7px 7px",
    margin: "10px",
    textAlign: "center" as const,
    cursor: "pointer",
    transition: "background-color 0.3s",
    width: "270px"
  };

  const buttonHover2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "white";
    e.currentTarget.style.color = "var(--primaryRed)";
    e.currentTarget.style.borderColor = "var(--primaryRed)";
  };

  const buttonUnhover2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "var(--primaryRed)";
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
      

      <div
        style={{
          width: "87%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
          fontSize: "21px",
        }}
      >
        <>
        <button
          style={buttonStyle2}
          onMouseEnter={buttonHover2}
          onMouseLeave={buttonUnhover2}
          type="button"
        >
          Reset Tables
          <i
            className="bi bi-trash"
            style={{ marginLeft: "30px", fontSize: "30px" }}
          />
        </button>
        </>
        <div
          style={{
            width: "85%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <ContentModal
            title="Group Actions"
            btnText="Save"
            icon="bi bi-plus-circle"
          >
            <label className="form-label" 
                   style={{ fontWeight: "bold", width: "100%", textAlign: "center",
                            marginTop: "30px", marginBottom: "50px" }}>
              * Actions must be completed in top to bottom order *
            </label>
            <div style={{ display: "flex", flexDirection: "column", 
                          alignItems: "flex-start", gap: "50px", marginLeft: "15px", 
                          marginBottom: "50px" }}>
              <div style={{ display: "flex", flexDirection: "row", 
                          alignItems: "center", gap: "30px", justifyContent: "center" }}>
                <button
                  style={buttonStyle}
                  onMouseEnter={buttonHover}
                  onMouseLeave={buttonUnhover}
                  type="button"
                >
                  Assign Groups
                </button>
                  <div className="info-pair">
                    <i className="bi bi-info-circle" 
                       style={{ marginLeft: "30px", fontSize: "30px", marginBottom: "5px",
                                color: "var(--primaryBlue)", fontWeight: "bold"
                              }}>         
                    </i>
                    <div className="info-value" 
                        style = {{fontSize: "18px",marginBottom: "5px"}}> 
                      assign groups description
                    </div>
                  </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row", 
                          alignItems: "center", gap: "30px", justifyContent: "center" }}>
                <button
                  style={buttonStyle}
                  onMouseEnter={buttonHover}
                  onMouseLeave={buttonUnhover}
                  type="button"
                >
                  Create Groups
                </button>
                  <div className="info-pair">
                    <i className="bi bi-info-circle" 
                       style={{ marginLeft: "30px", fontSize: "30px", marginBottom: "5px",
                                color: "var(--primaryBlue)", fontWeight: "bold"
                              }}>         
                    </i>
                    <div className="info-value" 
                        style = {{fontSize: "18px", marginBottom: "5px"}}> 
                      create groups description
                    </div>
                  </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row", 
                          alignItems: "center", gap: "30px", justifyContent: "center" }}>
                <button
                  style={buttonStyle}
                  onMouseEnter={buttonHover}
                  onMouseLeave={buttonUnhover}
                  type="button"
                >
                  Sync Groups
                </button>
                  <div className="info-pair">
                    <i className="bi bi-info-circle" 
                       style={{ marginLeft: "30px", fontSize: "30px", marginBottom: "5px",
                                color: "var(--primaryBlue)", fontWeight: "bold"
                              }}>         
                    </i>
                    <div className="info-value" 
                        style = {{fontSize: "18px", marginBottom: "5px"}}> 
                      sync groups description
                    </div>
                  </div>
              </div>
            </div>
          </ContentModal>
        </div>
      </div>

      <section className="upload-section">
        <InfoBox headerText="">
          <div className="upload-form">
            {[
              {
                label: "GoFan → Freshmen Data",
                table: "freshmen_data",
                headers:
                  "Freshmen ID, First Name, Last Name, Shirt Size, Email, Primary Language, Interests, Health Concerns",
              },
              {
                label: "Freshman Prep Classes → Seminar Data",
                table: "seminar_data",
                headers:
                  "Last Name, First Name, Freshmen ID, Semester, Teacher Full Name, Period",
              },
              {
                label: "Mentor Data",
                table: "mentor_data",
                headers:
                  "Mentor ID, First Name, Last Name, Graduation Year, Job, Pizza, Languages, Training Day, Shirt Size, Phone Number, Email",
              },
            ].map((item) => (
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

                <p
                  style={{
                    gridColumn: "1 / 2",
                    margin: 0,
                    color: messages[item.table]?.startsWith("❌")
                      ? "red"
                      : "green",
                    fontWeight: "bold",
                  }}
                >
                  {messages[item.table]}
                </p>

                {progress[item.table] !== undefined && (
                  <div style={{ gridColumn: "2 / 4" }}>
                    <div
                      className="progress"
                      style={{ height: "25px", width: "100%" }}
                    >
                      <div
                        className={`progress-bar ${progress[item.table] === 100 ? "bg-success" : "progress-bar-striped progress-bar-animated"}`}
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
          </div>
        </InfoBox>
      </section>

      <button
        onClick={async () => {
          const groupingReturn = await createSeminarGroups();
          showAlert(
            `Groups assigned! Final group count: ${groupingReturn.finalGroupCount}`,
            "success",
          );
        }}
      >
        Assign Groups
      </button>

      {/* ← Only change: createGroups() replaced with createGroupsFromDB() */}
      <button
        onClick={async () => {
          const groupTotal = await createGroupsFromDB();
          showAlert(
            `Created ${groupTotal} groups and seeded tour routes automatically.`,
            "success",
          );
        }}
      >
        Create Groups
      </button>

      <button
        onClick={async () => {
          const syncResult = await syncGroups();
          showAlert(
            `Groups synced: ${syncResult.success}\n${JSON.stringify(syncResult.unmatched)}`,
            "success",
          );
        }}
      >
        Sync Groups
      </button>
    </main>
  );
}
