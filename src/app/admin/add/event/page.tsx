"use client";
import { useRouter} from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import AddButton from "../../../components/addButton";
import "../../../css/admin.css";
import "../../../css/logo+login.css";

export default function AdminAddEvent() {

  const router = useRouter();
  const handleLogoClick = () => {
      router.push("/admin/add");
  };

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Add New Event</h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>
      
      <section className="add-form">
        <div className= "edit-user-form">
          <div className="form-row">
            <label className="form-label">Event Name:</label>
            <input type="text" className="form-input" />
          </div>
          <div className="form-row">
            <label className="form-label">Event Date:</label>
            <input type="text" className="form-input" />
          </div>
          <label className="form-label">Event Description:</label>
          <textarea className="form-input-large"
                    rows={2}
                    onInput={(e) => {
                    const textarea = e.currentTarget;
                    textarea.style.height = "auto";
                    textarea.style.height = textarea.scrollHeight + "px";
                    }}
            />
        <label className="form-label">Assign To:</label>
          <div className="form-row checkbox-row">
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" />
                All Mentors
              </label>
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" />
                Group Leaders
              </label>
          </div>
          <div className="form-row checkbox-row">
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" />
                Hallway Host
              </label>
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" />
                Spirit/ Utility
              </label>
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