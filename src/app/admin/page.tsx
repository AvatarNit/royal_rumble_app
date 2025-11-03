import type { Metadata } from "next";
import LogoButton from "../components/logoButton";
import LoginButton from "../components/loginButton";
import AdminButtons from "../components/adminButtons";
import "../css/admin.css";
import "../css/logo+login.css";

export default function AdminHomepage() {

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Welcome, Admin Name!</h1>
      </header>

      <section className="admin-button-box" style={{ display: "flex", flexDirection: "column",
                                                     alignItems: "center", margin: "50px" }}>

        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <AdminButtons link="/admin/add">Add New</AdminButtons>
          <AdminButtons link="/admin/edit">Edit</AdminButtons>
          <AdminButtons link="/admin/upload">Upload</AdminButtons>
        </div>

        <div style={{ display: "flex", flexDirection: "row", gap: "20px", margin: "30px" }}>
          <AdminButtons link="/admin/all_groups">All Groups</AdminButtons>
          <AdminButtons link="/admin/search">Search</AdminButtons>
          <AdminButtons link="/admin/attendance">Attendance</AdminButtons>
        </div>
      </section>
    </main>
  );
}
