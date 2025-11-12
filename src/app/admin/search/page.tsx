"use client";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../components/logoButton";
import LoginButton from "../../components/loginButton";
import SaveButton from "../../components/saveButton";
import InfoBox from "../../components/infoBox";
import InfoTable from "../../components/infoTable";
import "../../css/admin.css";
import "../../css/logo+login.css";

export default function AdminSearch() {

  const [mentorSelected, setMentorSelected] = useState(false);
  const [languageSelected, setLanguageSelected] = useState(false);
  const [freshmenSelected, setFreshmenSelected] = useState(false);

  const handleMentorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMentorSelected(e.target.checked);
  };
  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLanguageSelected(e.target.checked);
  };
  const handleFreshmenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFreshmenSelected(e.target.checked);
  };

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Search Information</h1>
      </header>

      <div className="search-container" style={{marginLeft: "15%"}}>
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

      <div style={{width:"85%"}}>
        <div className= "form-container" style={{margin:"0px"}}>
          <form className="manual-add-form">

          <div className="form-row checkbox-row">
            <label className="checkbox-label">
              <input type="checkbox" 
                     className="checkbox-input"
                     checked={freshmenSelected}
                     onChange={handleFreshmenChange} />
              Freshmen
            </label>

            <label className="checkbox-label">
              <input type="checkbox" 
                     className="checkbox-input"
                     checked={mentorSelected}
                     onChange={handleMentorChange} />
              Mentor
            </label>
          </div>
            {mentorSelected && (
              <div className="form-row checkbox-row">
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" />
                  Group Leader
                </label>

                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" />
                  Hallway Host
                </label>

                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" />
                  Spirit / Utility
                </label>
              </div>
            )}
          <div className="form-row checkbox-row">
            <label className="checkbox-label">
              <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={languageSelected}
                  onChange={handleLanguageChange}
                />
                Language
            </label>
            {freshmenSelected && (
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" />
                Prep Class
              </label>
            )}
          </div>
          {languageSelected && (
              <div className="form-row checkbox-row">
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" />
                  Spanish
                </label>

                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" />
                  French
                </label>
              </div>
            )}
          </form>
        </div>
      </div>
      <section className="info-box">
        <InfoBox headerText="Filtered Info">
          <InfoTable
            headers={["Student Name", "Filter ex. Language"]}
            data={[
              ["John Doe", "English"],
              ["Jane Smith", "Spanish"]
            ]}
            />
        </InfoBox>
      </section>
    </main>
  );
}