"use client";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import DropdownTable from "../../../components/dropdownTable";
import "../../../css/admin.css";
import "../../../css/logo+login.css";
import BackButton from "@/app/components/backButton";

export default function MentorAssignGroup() {

const mentorsData = [
  { mentorId: "######", fName: "example", lName: "example" },
  { mentorId: "######", fName: "example", lName: "example" },

];


  // Search state
  const [searchText, setSearchText] = useState("");

  const [showAssigned, setShowAssigned] = useState(false);

  // Convert data to the format EditTable expects

  const tableData = (mentorsData ?? []).map((m) => [
    m.mentorId,
    m.fName,
    m.lName,
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

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Assign Mentor Groups</h1>
      </header>

      <BackButton href="/admin/mentor" />

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
            </div>
            <div className="form-row checkbox-row">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        className="checkbox-input"
                        checked={showAssigned}
                        onChange={(e) => setShowAssigned(e.target.checked)}
                    />
                    Show assigned mentors?
                </label>
            </div>
          </form>
        </div>
      </div>

      <div style={{ width: "85%", marginTop: "50px" }}>
        <DropdownTable
          headers={["ID", "First Name", "Last Name"]}
          data={mentorsData.map((m) => [
                m.mentorId,
                m.fName,
                m.lName,
           ])}
          visibleColumns={[0, 1, 2]}
          idIndex={0}
        />
      </div>
    </main>
  );
}
