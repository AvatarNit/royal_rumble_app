import LogoButton from "../components/logoButton";
import LoginButton from "../components/loginButton";
import AdminButtons from "../components/adminButtons";
import "../css/admin.css";
import "../css/logo+login.css";
import { auth } from "@/auth";
import { getAdminById } from "@/src/actions/admin";

export default async function AdminHomepage() {
  // const session = await auth();
  // const studentId = session?.user?.id;
  const adminId = "271914";
  const admin = await getAdminById(Number(adminId));

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">
          Welcome, {admin?.fName} {admin?.lName}!
        </h1>
      </header>

      <section
        className="admin-button-box"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            margin: "20px",
          }}
        >
          <AdminButtons link="/admin/admin">Admin</AdminButtons>
          <AdminButtons link="/admin/mentor">Mentor</AdminButtons>
          <AdminButtons link="/admin/freshmen">Freshmen</AdminButtons>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            margin: "20px",
          }}
        >
          <AdminButtons link="/admin/upload">Upload</AdminButtons>
          <AdminButtons link="/admin/attendance">Attendance</AdminButtons>
          <AdminButtons link="/admin/events">Events</AdminButtons>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            margin: "20px",
          }}
        >
          <AdminButtons link="/admin/all_groups">All Groups</AdminButtons>
          <AdminButtons link="/admin/editContent">Edit Content</AdminButtons>
          {/* <AdminButtons link="/admin/search">Search</AdminButtons> */}
        </div>
      </section>
    </main>
  );
}
