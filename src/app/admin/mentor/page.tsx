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

export default function AdminMentor() {

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
  const [emailSelected, setEmailSelected] = useState(false);
  const [jobSelected, setJobSelected] = useState(false);
  const [shirtSelected, setShirtSelected] = useState(false);
  const [gradYearSelected, setGradYearSelected] = useState(false);
  const [languageSelected, setLanguageSelected] = useState(false);
  const [phoneSelected, setPhoneSelected] = useState(false);
  const [trainingSelected, setTrainingSelected] = useState(false);
  const [pizzaSelected, setPizzaSelected] = useState(false);

 const handleFilter = () => {
  const headers: string[] = [];

  if (firstNameSelected) headers.push("First Name");
  if (lastNameSelected) headers.push("Last Name");
  if (emailSelected) headers.push("Email");
  if (jobSelected) headers.push("Job");
  if (shirtSelected) headers.push("Shirt Size");
  if (gradYearSelected) headers.push("Grad Year");
  if (languageSelected) headers.push("Language");
  if (phoneSelected) headers.push("Phone #");
  if (trainingSelected) headers.push("Training Day");
  if (pizzaSelected) headers.push("Pizza Type");

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
        <h1 className="admin-title">Mentor Information</h1>
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
        <div style={{ width: "85%", display: "flex", justifyContent: "flex-end",
                    alignItems: "center", marginTop: "20px" }}>
            <AddButton link="/admin/add/mentor">
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