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

export default function AdminAdmin() {

  const router = useRouter();
  const handleLogoClick = () => {
      router.push("/admin");
  };

  const [tableHeaders, setTableHeaders] = useState(["First Name", "Last Name", "Email"]);
  const [tableData, setTableData] = useState([
    ["", "", ""],
    ["", "", ""]
  ]);

 const handleFilter = () => {
  const headers: string[] = [];

  if (headers.length === 0) {
    headers.push("First Name", "Last Name", "Email");
  }

  setTableHeaders(headers);
};

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Admin Information</h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>

        <div style={{ width: "85%", display: "flex", justifyContent: "flex-end",
                    alignItems: "center", marginTop: "20px" }}>
            <AddButton link="/admin/add/admin">
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