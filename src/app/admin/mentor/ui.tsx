"use client";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../components/logoButton";
import LoginButton from "../../components/loginButton";
import EditTable from "../../components/editTable";
import AddButton from "../../components/addButton";
import "../../css/admin.css";
import "../../css/logo+login.css";
import BackButton from "@/app/components/backButton";
import { deleteMentorById } from "@/actions/mentor";

export default function AdminMentors({
  mentorsData,
}: {
  mentorsData: Array<{
    mentorId: number;
    fName: string;
    lName: string;
    email: string;
    job: string;
    tshirtSize: string;
    gradYear: number;
    language: string;
    phoneNum: string;
    trainingDay: string;
    pizzaType: string;
  }>;
}) {
  //   Column toggle states
  const [IDSelected, setIDSelected] = useState(false);
  const [firstNameSelected, setFirstNameSelected] = useState(true);
  const [lastNameSelected, setLastNameSelected] = useState(true);
  const [emailSelected, setEmailSelected] = useState(false);
  const [jobSelected, setJobSelected] = useState(false);
  const [shirtSelected, setShirtSelected] = useState(false);
  const [gradYearSelected, setGradYearSelected] = useState(false);
  const [languageSelected, setLanguageSelected] = useState(false);
  const [phoneSelected, setPhoneSelected] = useState(false);
  const [trainingSelected, setTrainingSelected] = useState(false);
  const [pizzaSelected, setPizzaSelected] = useState(false);

  // Search state
  const [searchText, setSearchText] = useState("");

  // Table headers
  const ALL_HEADERS = [
    "ID",
    "First Name",
    "Last Name",
    "Email",
    "Job",
    "Shirt Size",
    "Grad Year",
    "Language",
    "Phone #",
    "Training Day",
    "Pizza Type",
  ];

  // Convert data to the format EditTable expects
  const tableData = mentorsData.map((m) => [
    m.mentorId,
    m.fName,
    m.lName,
    m.email,
    m.job,
    m.tshirtSize,
    m.gradYear,
    m.language,
    m.phoneNum,
    m.trainingDay,
    m.pizzaType,
  ]);

  // --- SEARCH FILTER LOGIC ---
  const filteredData = tableData.filter((row) => {
    const id = row[0].toString();
    const fName = String(row[1]).toLowerCase();
    const lName = String(row[2]).toLowerCase();

    const query = searchText.trim().toLowerCase();
    if (query === "") return true;

    // If numeric → search by ID
    if (!isNaN(Number(query))) {
      return id.includes(query);
    }

    // If two words → match first and last name separately
    const parts = query.split(" ");
    if (parts.length === 2) {
      const [firstPart, lastPart] = parts;
      return fName.includes(firstPart) && lName.includes(lastPart);
    }

    // Otherwise → match first OR last name
    return fName.includes(query) || lName.includes(query);
  });

  //   Generate visible columns
  const visibleColumns: number[] = [];
  if (IDSelected) visibleColumns.push(0);
  if (firstNameSelected) visibleColumns.push(1);
  if (lastNameSelected) visibleColumns.push(2);
  if (emailSelected) visibleColumns.push(3);
  if (jobSelected) visibleColumns.push(4);
  if (shirtSelected) visibleColumns.push(5);
  if (gradYearSelected) visibleColumns.push(6);
  if (languageSelected) visibleColumns.push(7);
  if (phoneSelected) visibleColumns.push(8);
  if (trainingSelected) visibleColumns.push(9);
  if (pizzaSelected) visibleColumns.push(10);

  // If none selected → default to first + last name
  if (visibleColumns.length === 0) visibleColumns.push(1, 2);

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Mentor Information</h1>
      </header>

      <BackButton href="/admin" />

      {/* --- ADD MENTOR BUTTON --- */}
      <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
        <AddButton href="/admin/add/mentor">
          Add
          <i
            className="bi bi-plus-circle"
            style={{ marginLeft: "30px", fontSize: "30px" }}
            ></i>
        </AddButton>
        <AddButton href="/admin/mentor/assignGroup" style = {{ fontSize: "30px", width: "340px" }}>
          Assign Groups
          <i
            className="bi bi-plus-circle"
            style={{ marginLeft: "30px", fontSize: "30px" }}
            ></i>
        </AddButton>
      </div>

      {/* --- SEARCH BAR --- */}
      <div className="search-container" style={{ marginLeft: "15%" }}>
        <div className="search-row">
          <input
            type="text"
            placeholder="Search Name/ ID..."
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {/* --- CHECKBOXES FOR COLUMN VISIBILITY --- */}
      <div style={{ width: "85%", marginTop: "20px" }}>
        <div className="form-container" style={{ margin: "0px" }}>
          <form className="manual-add-form">
            <div className="form-row checkbox-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={IDSelected}
                  onChange={(e) => setIDSelected(e.target.checked)}
                />
                ID
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={firstNameSelected}
                  onChange={(e) => setFirstNameSelected(e.target.checked)}
                />
                First Name
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={lastNameSelected}
                  onChange={(e) => setLastNameSelected(e.target.checked)}
                />
                Last Name
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={emailSelected}
                  onChange={(e) => setEmailSelected(e.target.checked)}
                />
                Email
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={jobSelected}
                  onChange={(e) => setJobSelected(e.target.checked)}
                />
                Job
              </label>
            </div>
            <div className="form-row checkbox-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={gradYearSelected}
                  onChange={(e) => setGradYearSelected(e.target.checked)}
                />
                Grad Year
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={languageSelected}
                  onChange={(e) => setLanguageSelected(e.target.checked)}
                />
                Language
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={phoneSelected}
                  onChange={(e) => setPhoneSelected(e.target.checked)}
                />
                Phone #
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={shirtSelected}
                  onChange={(e) => setShirtSelected(e.target.checked)}
                />
                T-Shirt
              </label>
            </div>
            <div className="form-row checkbox-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={trainingSelected}
                  onChange={(e) => setTrainingSelected(e.target.checked)}
                />
                Training Day
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={pizzaSelected}
                  onChange={(e) => setPizzaSelected(e.target.checked)}
                />
                Pizza
              </label>
            </div>
          </form>
        </div>
      </div>
      {/* --- TABLE --- */}
      <div style={{ width: "85%", marginTop: "50px" }}>
        <EditTable
          headers={ALL_HEADERS}
          data={filteredData}
          visibleColumns={visibleColumns}
          editLink="/admin/edit/mentor"
          deleteAction={async (id) => {
            const result = await deleteMentorById(Number(id));
            return { success: result.success };
          }}
          idIndex={0}
        />
      </div>
    </main>
  );
}
