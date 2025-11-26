"use client";

import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../components/logoButton";
import LoginButton from "../../components/loginButton";
import InfoBox from "../../components/infoBox";
import "../../css/admin.css";
import "../../css/logo+login.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminUpload() {
  const [messages, setMessages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [funnyText, setFunnyText] = useState<Record<string, string>>({});

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
        currentProgress += Math.random() * 5;
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
            [tableName]: "Almost done, hold tight!",
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
    } catch (err: any) {
      setMessages((prev) => ({
        ...prev,
        [tableName]: "Upload failed: " + err.message,
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
              { label: "GoFan → Freshmen Data", table: "freshmen_data" },
              {
                label: "Freshman Prep Classes → Seminar Data",
                table: "seminar_data",
              },
              { label: "Mentor Data", table: "mentor_data" },
              { label: "Group Data", table: "group_data" },
            ].map((item) => (
              // Giving all of the inputs the proper elements
              <div
                key={item.table}
                className="upload-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr 2fr",
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
    </main>
  );
}
