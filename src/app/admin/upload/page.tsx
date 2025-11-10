import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../components/logoButton";
import LoginButton from "../../components/loginButton";
import InfoBox from "../../components/infoBox";
import "../../css/admin.css";
import "../../css/logo+login.css";

export default function AdminUpload() {

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
            
            <div className="upload-row">
              <label>Upload GoFan:</label>
              <div className="file-input-wrapper">
                <input type="file" className="file-input" />
              </div>
              <button className="upload-icon">
                <i className="bi bi-cloud-upload-fill"></i>
              </button>
            </div>

            <div className="upload-row">
              <label>Upload Freshman Prep Classes:</label>
              <div className="file-input-wrapper">
                <input type="file" className="file-input" />
              </div>
              <button className="upload-icon">
                <i className="bi bi-cloud-upload-fill"></i>
              </button>
            </div>

            <div className="upload-row">
              <label>Upload Mentor Data:</label>
              <div className="file-input-wrapper">
                <input type="file" className="file-input" />
              </div>
              <button className="upload-icon">
                <i className="bi bi-cloud-upload-fill"></i>
              </button>
            </div>

            <div className="upload-row">
              <label>Upload Group Itinerary & Event Order:</label>
              <div className="file-input-wrapper">
                <input type="file" className="file-input" />
              </div>
              <button className="upload-icon">
                <i className="bi bi-cloud-upload-fill"></i>
              </button>
            </div>
          </div>
        </InfoBox>
      </section>
    </main>
  );
}
