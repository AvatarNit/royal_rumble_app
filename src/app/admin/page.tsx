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

<<<<<<< HEAD
      <section
        className="admin-button-box"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "50px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <AdminButtons link="/admin/add">Add New</AdminButtons>
          <AdminButtons link="/admin/edit">Edit</AdminButtons>
          <AdminButtons link="/admin/upload">Upload</AdminButtons>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            margin: "30px",
          }}
        >
          <AdminButtons link="/admin/all_groups">All Groups</AdminButtons>
          <AdminButtons link="/admin/search">Search</AdminButtons>
=======
      <section className="admin-button-box" style={{ display: "flex", flexDirection: "column",
                                                     alignItems: "center", margin: "50px" }}>

        <div style={{ display: "flex", flexDirection: "row", gap: "20px", margin: "20px" }}>
          <AdminButtons link="/admin/admin">Admin</AdminButtons>
          <AdminButtons link="/admin/mentor">Mentor</AdminButtons>
          <AdminButtons link="/admin/freshmen">Freshmen</AdminButtons>
        </div>

        <div style={{ display: "flex", flexDirection: "row", gap: "20px", margin: "20px" }}>
          <AdminButtons link="/admin/upload">Upload</AdminButtons>
>>>>>>> fb5a73741e47ba7b223d7ae1081fccb790252afb
          <AdminButtons link="/admin/attendance">Attendance</AdminButtons>
          <AdminButtons link="/admin/search">Search</AdminButtons>
        </div>

        <div style={{ display: "flex", flexDirection: "row", gap: "20px", margin: "20px"}}>
          <AdminButtons link="/admin/add">Add New</AdminButtons>
          <AdminButtons link="/admin/all_groups">All Groups</AdminButtons>
        </div>
      </section>
    </main>
  );
}
