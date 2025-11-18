"use client";

import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../components/logoButton";
import LoginButton from "../../components/loginButton";
import InfoBox from "../../components/infoBox";
import "../../css/admin.css";
import "../../css/logo+login.css";
import { useState } from "react";

export default function AdminUpload() {
  const [messages, setMessages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    tableName: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading((prev) => ({ ...prev, [tableName]: true }));

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("table", tableName);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setMessages((prev) => ({
        ...prev,
        [tableName]: data.message || data.error,
      }));
    } catch (err: any) {
      setMessages((prev) => ({
        ...prev,
        [tableName]: "Upload failed: " + err.message,
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [tableName]: false }));
      e.target.value = ""; // reset file input
    }
  };

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Upload Data</h1>
      </header>

      <section className="upload-section">
        <InfoBox headerText="">
          <div className="upload-form">
            {/* GoFan → Freshmen Data */}
            <div className="upload-row">
              <label>Upload GoFan:</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  className="file-input"
                  accept=".xlsx,.xls"
                  onChange={(e) => handleUpload(e, "freshmen_data")}
                  disabled={loading["freshmen_data"]}
                />
              </div>
              <button className="upload-icon" disabled>
                <i className="bi bi-cloud-upload-fill"></i>
              </button>
              {messages["freshmen_data"] && (
                <p
                  style={{
                    color: messages["freshmen_data"]
                      ?.toLowerCase()
                      .includes("error")
                      ? "red"
                      : "green",
                  }}
                >
                  {messages["freshmen_data"]}
                </p>
              )}
            </div>

            {/* Freshman Prep Classes → Seminar Data */}
            <div className="upload-row">
              <label>Upload Freshman Prep Classes:</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  className="file-input"
                  accept=".xlsx,.xls"
                  onChange={(e) => handleUpload(e, "seminar_data")}
                  disabled={loading["seminar_data"]}
                />
              </div>
              <button className="upload-icon" disabled>
                <i className="bi bi-cloud-upload-fill"></i>
              </button>
              {messages["seminar_data"] && (
                <p
                  style={{
                    color: messages["seminar_data"]
                      ?.toLowerCase()
                      .includes("error")
                      ? "red"
                      : "green",
                  }}
                >
                  {messages["seminar_data"]}
                </p>
              )}
            </div>

            {/* Mentor Data */}
            <div className="upload-row">
              <label>Upload Mentor Data:</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  className="file-input"
                  accept=".xlsx,.xls"
                  onChange={(e) => handleUpload(e, "mentor_data")}
                  disabled={loading["mentor_data"]}
                />
              </div>
              <button className="upload-icon" disabled>
                <i className="bi bi-cloud-upload-fill"></i>
              </button>
              {messages["mentor_data"] && (
                <p
                  style={{
                    color: messages["mentor_data"]
                      ?.toLowerCase()
                      .includes("error")
                      ? "red"
                      : "green",
                  }}
                >
                  {messages["mentor_data"]}
                </p>
              )}
            </div>

            {/* Group Data */}
            <div className="upload-row">
              <label>Upload Group Data:</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  className="file-input"
                  accept=".xlsx,.xls"
                  onChange={(e) => handleUpload(e, "group_data")}
                  disabled={loading["group_data"]}
                />
              </div>
              <button className="upload-icon" disabled>
                <i className="bi bi-cloud-upload-fill"></i>
              </button>
              {messages["group_data"] && (
                <p
                  style={{
                    color: messages["group_data"]
                      ?.toLowerCase()
                      .includes("error")
                      ? "red"
                      : "green",
                  }}
                >
                  {messages["group_data"]}
                </p>
              )}
            </div>

            {/* Group Itinerary → placeholder */}
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

// import "bootstrap-icons/font/bootstrap-icons.css";
// import LogoButton from "../../components/logoButton";
// import LoginButton from "../../components/loginButton";
// import InfoBox from "../../components/infoBox";
// import "../../css/admin.css";
// import "../../css/logo+login.css";

// export default function AdminUpload() {
//   return (
//     <main className="admin-container">
//       <LogoButton />
//       <LoginButton />

//       <header className="admin-header">
//         <h1 className="admin-title">Upload Data</h1>
//       </header>

//       <section className="upload-section">
//         <InfoBox headerText="">
//           <div className="upload-form">
//             <div className="upload-row">
//               <label>Upload GoFan:</label>
//               <div className="file-input-wrapper">
//                 <input type="file" className="file-input" />
//               </div>
//               <button className="upload-icon">
//                 <i className="bi bi-cloud-upload-fill"></i>
//               </button>
//             </div>

//             <div className="upload-row">
//               <label>Upload Freshman Prep Classes:</label>
//               <div className="file-input-wrapper">
//                 <input type="file" className="file-input" />
//               </div>
//               <button className="upload-icon">
//                 <i className="bi bi-cloud-upload-fill"></i>
//               </button>
//             </div>

//             <div className="upload-row">
//               <label>Upload Mentor Data:</label>
//               <div className="file-input-wrapper">
//                 <input type="file" className="file-input" />
//               </div>
//               <button className="upload-icon">
//                 <i className="bi bi-cloud-upload-fill"></i>
//               </button>
//             </div>

//             <div className="upload-row">
//               <label>Upload Group Itinerary & Event Order:</label>
//               <div className="file-input-wrapper">
//                 <input type="file" className="file-input" />
//               </div>
//               <button className="upload-icon">
//                 <i className="bi bi-cloud-upload-fill"></i>
//               </button>
//             </div>
//           </div>
//         </InfoBox>
//       </section>
//     </main>
//   );
// }
