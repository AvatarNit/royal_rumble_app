"use client";
import { useRouter} from "next/navigation";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../components/logoButton";
import LoginButton from "../../components/loginButton";
import SaveButton from "../../components/saveButton";
import EditTable from "../../components/editTable";
import AddButton from "../../components/addButton";
import "../../css/admin.css";
import "../../css/logo+login.css";

export default function AdminFreshmen() {

  const router = useRouter();
  const handleLogoClick = () => {
      router.push("/admin");
  };

  const [tableHeaders, setTableHeaders] = useState(["First Name", "Last Name"]);
  const [tableData, setTableData] = useState([
    ["", ""],
    ["", ""]
  ]);

  const [firstNameSelected, setFirstNameSelected] = useState(false);
  const [lastNameSelected, setLastNameSelected] = useState(false);
  const [shirtSelected, setShirtSelected] = useState(false);
  const [emailSelected, setEmailSelected] = useState(false);
  const [interestsSelected, setInterestsSelected] = useState(false);
  const [healthConcernsSelected, setHealthConcernsSelected] = useState(false);
  const [presentSelected, setPresentSelected] = useState(false);

 const handleFilter = () => {
  const headers: string[] = [];

  if (firstNameSelected) headers.push("First Name");
  if (lastNameSelected) headers.push("Last Name");
  if (shirtSelected) headers.push("T-Shirt");
  if (emailSelected) headers.push("Email");
  if (interestsSelected) headers.push("Interests");
  if (healthConcernsSelected) headers.push("Health Concerns");
  if (presentSelected) headers.push("Present");

  if (headers.length === 0) {
    headers.push("First Name", "Last Name", "Filter");
  }

  setTableHeaders(headers);
};

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Freshmen Information</h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>

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
                                checked={shirtSelected}
                                onChange={(e) => setShirtSelected(e.target.checked)}
                            />
                            T-Shirt
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
                    </div>
                    <div className="form-row checkbox-row">
                        <label className="checkbox-label">
                            <input 
                                type="checkbox" 
                                className="checkbox-input"
                                checked={interestsSelected}
                                onChange={(e) => setInterestsSelected(e.target.checked)}
                            />
                            Interests
                        </label>
                        <label className="checkbox-label">
                            <input 
                                type="checkbox" 
                                className="checkbox-input"
                                checked={healthConcernsSelected}
                                onChange={(e) => setHealthConcernsSelected(e.target.checked)}
                            />
                            Health Concerns
                        </label>
                        <label className="checkbox-label">
                            <input 
                                type="checkbox" 
                                className="checkbox-input"
                                checked={presentSelected}
                                onChange={(e) => setPresentSelected(e.target.checked)}
                            />
                            Present
                        </label>
                    </div>
                </form>
            </div>
        </div>
        <div style={{ width: "85%", display: "flex", justifyContent: "flex-end",
                    alignItems: "center", marginTop: "20px" }}>
            <AddButton link="/admin/add/freshman">
                Add 
                <i className="bi bi-plus-circle" 
                    style={{ marginLeft: "30px", fontSize: "30px" }}>
                </i>
            </AddButton>
        </div>
        
        <div style= {{ width: "85%", marginTop: "25px" }}>
            <EditTable headers={tableHeaders} data={tableData} />
        </div>

    </main>
  );
}