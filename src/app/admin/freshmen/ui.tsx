"use client";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../components/logoButton";
import LoginButton from "../../components/loginButton";
import SaveButton from "../../components/saveButton";
import EditTable from "../../components/editTable";
import AddButton from "../../components/addButton";
import "../../css/admin.css";
import "../../css/logo+login.css";
import BackButton from "@/app/components/backButton";
import { deleteFreshmanById } from "@/actions/freshmen";

export default function AdminFreshmen({
  freshmenData,
}: {
  freshmenData: Array<{
    freshmenId: number;
    fName: string;
    lName: string;
    email: string;
    tshirtSize: string;
    primaryLanguage: string;
    interests: string;
    healthConcerns: string;
    present: boolean;
  }>;
}) {
  const [IDSelected, setIDSelected] = useState(false);
  const [firstNameSelected, setFirstNameSelected] = useState(true);
  const [lastNameSelected, setLastNameSelected] = useState(true);
  const [shirtSelected, setShirtSelected] = useState(false);
  const [emailSelected, setEmailSelected] = useState(false);
  const [languageSelected, setLanguageSelected] = useState(false);
  const [interestsSelected, setInterestsSelected] = useState(false);
  const [healthConcernsSelected, setHealthConcernsSelected] = useState(false);
  const [presentSelected, setPresentSelected] = useState(false);

  const ALL_HEADERS = [
    "ID",
    "First Name",
    "Last Name",
    "Email",
    "T-Shirt",
    "Language",
    "Interests",
    "Health Concerns",
    "Present",
  ];

  const tableData = freshmenData.map((f) => [
    f.freshmenId,
    f.fName,
    f.lName,
    f.email,
    f.tshirtSize,
    f.primaryLanguage,
    f.interests,
    f.healthConcerns,
    f.present ? "Yes" : "No",
  ]);
  // Generate visible columns list
  const visibleColumns = [];
  if (IDSelected) visibleColumns.push(0);
  if (firstNameSelected) visibleColumns.push(1);
  if (lastNameSelected) visibleColumns.push(2);
  if (emailSelected) visibleColumns.push(3);
  if (shirtSelected) visibleColumns.push(4);
  if (languageSelected) visibleColumns.push(5);
  if (interestsSelected) visibleColumns.push(6);
  if (healthConcernsSelected) visibleColumns.push(7);
  if (presentSelected) visibleColumns.push(8);

  // If no boxes checked → default to first + last name
  if (visibleColumns.length === 0) visibleColumns.push(1, 2);

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Freshmen Information</h1>
      </header>

      <BackButton href="/admin/freshmen" />

      <div className="search-container" style={{ marginLeft: "15%" }}>
        <div className="search-row">
          <input
            type="text"
            placeholder="Search Name/ ID..."
            className="search-input"
          />
          <div></div>
        </div>
      </div>

      <div style={{ width: "85%" }}>
        <div className="form-container" style={{ margin: "0px" }}>
          <form className="manual-add-form">
            <div className="form-row checkbox-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={IDSelected}
                  onChange={(e) => setIDSelected(e.target.checked)}
                />
                ID
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={firstNameSelected}
                  onChange={(e) => setFirstNameSelected(e.target.checked)}
                />
                First Name
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={lastNameSelected}
                  onChange={(e) => setLastNameSelected(e.target.checked)}
                />
                Last Name
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={emailSelected}
                  onChange={(e) => setEmailSelected(e.target.checked)}
                />
                Email
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
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
                  checked={languageSelected}
                  onChange={(e) => setLanguageSelected(e.target.checked)}
                />
                Language
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={interestsSelected}
                  onChange={(e) => setInterestsSelected(e.target.checked)}
                />
                Interests
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={healthConcernsSelected}
                  onChange={(e) => setHealthConcernsSelected(e.target.checked)}
                />
                Health Concerns
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={presentSelected}
                  onChange={(e) => setPresentSelected(e.target.checked)}
                />
                Present
              </label>
            </div>
          </form>
        </div>
      </div>
      <div
        style={{
          width: "85%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <AddButton href="/admin/add/freshman">
          Add
          <i
            className="bi bi-plus-circle"
            style={{ marginLeft: "30px", fontSize: "30px" }}
          ></i>
        </AddButton>
      </div>

      <div style={{ width: "85%", marginTop: "25px" }}>
        <EditTable
          headers={ALL_HEADERS}
          data={tableData}
          visibleColumns={visibleColumns}
          editLink="/admin/edit/freshman"
          deleteAction={deleteFreshmanById}
          idIndex={0}
        />
      </div>
    </main>
  );
}
