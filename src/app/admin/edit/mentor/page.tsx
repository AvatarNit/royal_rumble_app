"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter} from "next/navigation";
import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import EditUserDropdown from "../../../components/editUserDropdown";
import "../../../css/admin.css";
import "../../../css/logo+login.css";

export default function AdminEditMentor() {

  const router = useRouter();
  const handleLogoClick = () => {
      router.push("/admin/edit");
  };

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Edit Mentor</h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search Mentor Name/ ID..."
          className="search-input"
        />
      </div>

     <EditUserDropdown
        header=" "
        sections={[
          {
            title: "Mentor 1",
            content: 
              <div className= "edit-user-form">
                <div className="form-row">
                  <label className="form-label">First Name:</label>
                  <input type="text" className="form-input" placeholder="Mentor First Name" />
                </div>
                <div className="form-row">
                  <label className="form-label">Last Name:</label>
                  <input type="text" className="form-input" placeholder="Mentor Last Name" />
                </div>
                <div className="form-row">
                  <label className="form-label">Job:</label>
                  <input type="text" className="form-input" placeholder="Mentor Job" />
                </div>
                <div className="form-row">
                  <label className="form-label">Graduation Year:</label>
                  <input type="text" className="form-input" placeholder="Mentor Graduation Year" />
                </div>
                <div className="form-row">
                  <label className="form-label">Email:</label>
                  <input type="text" className="form-input" placeholder="Mentor Email" />
                </div>
                <div className="form-row">
                  <label className="form-label">Phone Number:</label>
                  <input type="text" className="form-input" placeholder="Mentor Phone Number" />
                </div>
                <div className="form-row">
                  <label className="form-label">Primary Language:</label>
                  <input type="text" className="form-input" placeholder="Mentor Primary Language" />
                </div>
                <div className="form-row">
                  <label className="form-label">Pizza Choice:</label>
                  <input type="text" className="form-input" placeholder="Mentor Pizza Choice" />
                </div>
                <div className="form-row">
                  <label className="form-label">T-Shirt Size:</label>
                  <input type="text" className="form-input" placeholder="Mentor T-Shirt Size" />
                </div>
              </div>,
          },
          {
            title: "Mentor 2",
            content: 
              <div className= "edit-user-form">
                <div className="form-row">
                  <label className="form-label">First Name:</label>
                  <input type="text" className="form-input" placeholder="Mentor First Name" />
                </div>
                <div className="form-row">
                  <label className="form-label">Last Name:</label>
                  <input type="text" className="form-input" placeholder="Mentor Last Name" />
                </div>
                <div className="form-row">
                  <label className="form-label">Job:</label>
                  <input type="text" className="form-input" placeholder="Mentor Job" />
                </div>
                <div className="form-row">
                  <label className="form-label">Graduation Year:</label>
                  <input type="text" className="form-input" placeholder="Mentor Graduation Year" />
                </div>
                <div className="form-row">
                  <label className="form-label">Email:</label>
                  <input type="text" className="form-input" placeholder="Mentor Email" />
                </div>
                <div className="form-row">
                  <label className="form-label">Phone Number:</label>
                  <input type="text" className="form-input" placeholder="Mentor Phone Number" />
                </div>
                <div className="form-row">
                  <label className="form-label">Primary Language:</label>
                  <input type="text" className="form-input" placeholder="Mentor Primary Language" />
                </div>
                <div className="form-row">
                  <label className="form-label">Pizza Choice:</label>
                  <input type="text" className="form-input" placeholder="Mentor Pizza Choice" />
                </div>
                <div className="form-row">
                  <label className="form-label">T-Shirt Size:</label>
                  <input type="text" className="form-input" placeholder="Mentor T-Shirt Size" />
                </div>
              </div>,
          },
          {
            title: "Mentor 3",
            content:
              <div className= "edit-user-form">
                <div className="form-row">
                  <label className="form-label">First Name:</label>
                  <input type="text" className="form-input" placeholder="Mentor First Name" />
                </div>
                <div className="form-row">
                  <label className="form-label">Last Name:</label>
                  <input type="text" className="form-input" placeholder="Mentor Last Name" />
                </div>
                <div className="form-row">
                  <label className="form-label">Job:</label>
                  <input type="text" className="form-input" placeholder="Mentor Job" />
                </div>
                <div className="form-row">
                  <label className="form-label">Graduation Year:</label>
                  <input type="text" className="form-input" placeholder="Mentor Graduation Year" />
                </div>
                <div className="form-row">
                  <label className="form-label">Email:</label>
                  <input type="text" className="form-input" placeholder="Mentor Email" />
                </div>
                <div className="form-row">
                  <label className="form-label">Phone Number:</label>
                  <input type="text" className="form-input" placeholder="Mentor Phone Number" />
                </div>
                <div className="form-row">
                  <label className="form-label">Primary Language:</label>
                  <input type="text" className="form-input" placeholder="Mentor Primary Language" />
                </div>
                <div className="form-row">
                  <label className="form-label">Pizza Choice:</label>
                  <input type="text" className="form-input" placeholder="Mentor Pizza Choice" />
                </div>
                <div className="form-row">
                  <label className="form-label">T-Shirt Size:</label>
                  <input type="text" className="form-input" placeholder="Mentor T-Shirt Size" />
                </div>
              </div>,
          },
        ]}
      />
    </main>
  );
}