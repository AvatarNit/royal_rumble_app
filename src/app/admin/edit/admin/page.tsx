"use client";
import { useRouter} from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import EditUserDropdown from "../../../components/editUserDropdown";
import "../../../css/admin.css";
import "../../../css/logo+login.css";

export default function AdminEditAdmin() {

  const router = useRouter();
  const handleLogoClick = () => {
      router.push("/admin/edit");
  };

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Edit Admin</h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search Admin Name..."
          className="search-input"
        />
      </div>

     <EditUserDropdown
        header=" "
        sections={[
          {
            title: "Admin 1",
            content: 
              <div className= "edit-user-form">
                <div className="form-row">
                  <label className="form-label">First Name:</label>
                  <input type="text" className="form-input" placeholder="Admin First Name" />
                </div>
                <div className="form-row">
                  <label className="form-label">Last Name:</label>
                  <input type="text" className="form-input" placeholder="Admin Last Name" />
                </div>
                <div className="form-row">
                  <label className="form-label">Email:</label>
                  <input type="text" className="form-input" placeholder="Admin Email" />
                </div>
              </div>
          },
          {
            title: "Admin 2",
            content: 
             <div className= "edit-user-form">
                <div className="form-row">
                  <label className="form-label">First Name:</label>
                  <input type="text" className="form-input" placeholder="Admin First Name" />
                </div>
                <div className="form-row">
                  <label className="form-label">Last Name:</label>
                  <input type="text" className="form-input" placeholder="Admin Last Name" />
                </div>
                <div className="form-row">
                  <label className="form-label">Email:</label>
                  <input type="text" className="form-input" placeholder="Admin Email" />
                </div>
              </div>
          },
          {
            title: "Admin 3",
            content: 
             <div className= "edit-user-form">
                <div className="form-row">
                  <label className="form-label">First Name:</label>
                  <input type="text" className="form-input" placeholder="Admin First Name" />
                </div>
                <div className="form-row">
                  <label className="form-label">Last Name:</label>
                  <input type="text" className="form-input" placeholder="Admin Last Name" />
                </div>
                <div className="form-row">
                  <label className="form-label">Email:</label>
                  <input type="text" className="form-input" placeholder="Admin Email" />
                </div>
              </div>
          },
        ]}
      />
    </main>
  );
}
