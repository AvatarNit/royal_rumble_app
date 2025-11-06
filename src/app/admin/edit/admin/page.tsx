import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import EditUserDropdown from "../../../components/editUserDropdown";
import "../../../css/admin.css";
import "../../../css/logo+login.css";

export default function AdminEditAdmin() {
  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Edit Admin</h1>
      </header>

      <button className="back-button">
        <i className="bi bi-arrow-left"></i>
      </button>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search Admin..."
          className="search-input"
        />
      </div>

     <EditUserDropdown
        sections={[
          {
            title: "Admin 1",
            content: "edit user details here.",
          },
          {
            title: "Admin 2",
            content: "edit user details here.",
          },
          {
            title: "Admin 3",
            content: "edit user details here.",
          },
        ]}
      />
    </main>
  );
}
