"use client";
import { useRouter} from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import AddButton from "../../../components/addButton";
import "../../../css/admin.css";
import "../../../css/logo+login.css";

export default function AdminAddCustomGroup() {

  const router = useRouter();
  const handleLogoClick = () => {
      router.push("/admin/all_groups");
  };

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Add New Group</h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>
      
      <section className="add-form">
        <div className= "edit-user-form">
          <div className="form-row">
            <label className="form-label">Group Name:</label>
            <input type="text" className="form-input" placeholder="ex. ENL: Spaish"/>
          </div>
          <div className="form-row">
            <label className="form-label">Event Order:</label>
            <input type="text" className="form-input" />
          </div>
          <div className="form-row">
            <label className="form-label">Route #:</label>
            <input type="text" className="form-input" />
          </div>
        </div>
      </section>
      <div className="add-button-align">
        <AddButton> 
          Add 
          <i className="bi bi-plus-circle" 
            style={{ marginLeft: "30px", fontSize: "30px" }}>
          </i>
        </AddButton>
      </div>
    </main>
  );
}
