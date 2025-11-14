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
  const [prepSelected, setPrepSelected] = useState(false);
  const [groupSelected, setGroupSelected] = useState(false);

  const [languages, setLanguages] = useState({
    Spanish: false,
    French: false,
    Mandarin: false,
    Hindi: false,
  });

  const [prepTeachers, setPrepTeachers] = useState({
    Teacher1: false,
    Teacher2: false,
    Teacher3: false,
    Teacher4: false,
  });

  const [groups, setGroups] = useState({
    Group1: false,
    Group2: false,
    Group3: false,
  });

  const [mentorJobs, setMentorJobs] = useState({
    "Group Leader": false,
    "Hallway Host": false,
    "Spirit / Utility": false,
  });

  const [tableHeaders, setTableHeaders] = useState(["Student Name", "Filter"]);
  const [tableData, setTableData] = useState([
    ["John Doe", ""],
    ["Jane Smith", ""],
  ]);

  const handleMentorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMentorSelected(e.target.checked);
    if (!e.target.checked) {

      setMentorJobs({
        "Group Leader": false,
        "Hallway Host": false,
        "Spirit / Utility": false,
      });
    }
  };
  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => setLanguageSelected(e.target.checked);
  const handleFreshmenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFreshmenSelected(e.target.checked);
    if (e.target.checked) {

      setMentorJobs({
        "Group Leader": false,
        "Hallway Host": false,
        "Spirit / Utility": false,
      });
    }
  };
  const handlePrepChange = (e: React.ChangeEvent<HTMLInputElement>) => setPrepSelected(e.target.checked);
  const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => setGroupSelected(e.target.checked);

  const handleLanguageSubChange = (lang: string) => {
    setLanguages(prev => ({ ...prev, [lang as keyof typeof prev]: !prev[lang as keyof typeof prev] }));
  };
  const handlePrepTeacherChange = (teacher: string) => {
    setPrepTeachers(prev => ({ ...prev, [teacher as keyof typeof prev]: !prev[teacher as keyof typeof prev] }));
  };
  const handleGroupSubChange = (grp: string) => {
    setGroups(prev => ({ ...prev, [grp as keyof typeof prev]: !prev[grp as keyof typeof prev] }));
  };
  const handleMentorJobChange = (job: string) => {
    setMentorJobs(prev => ({ ...prev, [job as keyof typeof prev]: !prev[job as keyof typeof prev] }));
  };

  const handleFilter = () => {
    let headers: string[] = [];
    const selectedLanguages = Object.entries(languages).filter(([_, v]) => v).map(([k]) => k);
    const selectedTeachers = Object.entries(prepTeachers).filter(([_, v]) => v).map(([k]) => k);
    const selectedGroups = Object.entries(groups).filter(([_, v]) => v).map(([k]) => k);
    const selectedMentorJobs = Object.entries(mentorJobs).filter(([_, v]) => v).map(([k]) => k);

    if (mentorSelected && !freshmenSelected) {

      if (selectedMentorJobs.length === 0 || selectedMentorJobs.length >= 2) {
        headers = ["Mentor Name", "Job"];
      } else if (selectedMentorJobs.length === 1) {
        headers = ["Mentor Name"];
      }
      if (languageSelected && (selectedLanguages.length !== 1)) headers.push("Language");
      if (groupSelected && (selectedGroups.length !== 1)) headers.push("Group");
    } 
    else if (freshmenSelected && !mentorSelected) {
      headers = ["Freshmen Name"];
      if (languageSelected && (selectedLanguages.length !== 1)) headers.push("Language");
      if (prepSelected && (selectedTeachers.length !== 1)) headers.push("Prep Class");
      if (groupSelected && (selectedGroups.length !== 1)) headers.push("Group");
    } 
    else if (freshmenSelected && mentorSelected) {
      headers = ["Student Name", "Student Type"];
      if (languageSelected && (selectedLanguages.length !== 1)) headers.push("Language");
      if (groupSelected && (selectedGroups.length !== 1)) headers.push("Group");
    } 
    else {
      headers = ["Student Name"];
    }

    const data = [
      headers.map(h => `${h} Ex. 1`),
      headers.map(h => `${h} Ex. 2`),
    ];

    setTableHeaders(headers);
    setTableData(data);
  };

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Search Information</h1>
      </header>

      <div className="search-container" style={{ marginLeft: "15%" }}>
        <div className="search-row">
          <input type="text" placeholder="Search Name/ ID..." className="search-input" />
          <div>
            <SaveButton onClick={handleFilter}>Filter</SaveButton>
          </div>
        </div>
      </div>

      <div style={{ width: "85%" }}>
        <div className="form-container" style={{ margin: "0px" }}>
          <form className="manual-add-form">
            <div className="form-row checkbox-row">
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" 
                checked={freshmenSelected} onChange={handleFreshmenChange} />
                Freshmen
              </label>
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" 
                checked={mentorSelected} onChange={handleMentorChange} />
                Mentor
              </label>
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" 
                checked={groupSelected} onChange={handleGroupChange} />
                Group
              </label>
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" 
                checked={languageSelected} onChange={handleLanguageChange} />
                Language
              </label>
            </div>

            {freshmenSelected && !mentorSelected && (
              <div className="form-row checkbox-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={prepSelected}
                    onChange={handlePrepChange}
                  />
                  Prep Class
                </label>
              </div>
            )}

            {mentorSelected && !freshmenSelected && (
              <div className="form-row checkbox-row">
                {Object.keys(mentorJobs).map((job) => (
                  <label key={job} className="checkbox-label">
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      checked={mentorJobs[job as keyof typeof mentorJobs]}
                      onChange={() => handleMentorJobChange(job)}
                    />
                    {job}
                  </label>
                ))}
              </div>
            )}

            {languageSelected && (
              <div className="form-row checkbox-row">
                {Object.keys(languages).map(lang => (
                  <label key={lang} className="checkbox-label">
                    <input type="checkbox" className="checkbox-input" 
                    checked={languages[lang as keyof typeof languages]} 
                    onChange={() => handleLanguageSubChange(lang)} />
                    {lang}
                  </label>
                ))}
              </div>
            )}

            {prepSelected && freshmenSelected && !mentorSelected && (
              <div className="form-row checkbox-row">
                {Object.keys(prepTeachers).map((teacher) => (
                  <label key={teacher} className="checkbox-label">
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      checked={prepTeachers[teacher as keyof typeof prepTeachers]}
                      onChange={() => handlePrepTeacherChange(teacher)}
                    />
                    {teacher.replace("Teacher", "Teacher ")}
                  </label>
                ))}
              </div>
            )}

            {groupSelected && (
              <div className="form-row checkbox-row">
                {Object.keys(groups).map(grp => (
                  <label key={grp} className="checkbox-label">
                    <input type="checkbox" className="checkbox-input" 
                    checked={groups[grp as keyof typeof groups]} 
                    onChange={() => handleGroupSubChange(grp)} />
                    {grp.replace("Group", "Group ")}
                  </label>
                ))}
              </div>
            )}

          </form>
        </div>
      </div>

      <section className="info-box">
        <InfoBox headerText="Filtered Info">
          <InfoTable headers={tableHeaders} data={tableData} />
        </InfoBox>
      </section>
    </main>
  );
}