"use server";

import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../components/logoButton";
import LoginButton from "../../components/loginButton";
import EditTable from "../../components/editTable";
import AddButton from "../../components/addButton";
import BackButton from "../../components/backButton";
import "../../css/admin.css";
import "../../css/logo+login.css";
import { deleteAdminById, getAdmins } from "@/actions/admin";

export default async function AdminAdmin() {
  const admins = await getAdmins();

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Admin Information</h1>
      </header>

      <BackButton href="/admin" />

      <div
        style={{
          width: "85%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <AddButton href="/admin/add/admin">
          Add
          <i
            className="bi bi-plus-circle"
            style={{ marginLeft: "30px", fontSize: "30px" }}
          ></i>
        </AddButton>
      </div>

      <div style={{ width: "85%", marginTop: "25px" }}>
        <EditTable
          headers={["ID", "First Name", "Last Name", "Email"]}
          data={admins.map((a) => [
            a.adminId ?? "",
            a.fName ?? "",
            a.lName ?? "",
            a.email ?? "",
          ])}
          visibleColumns={[1, 2, 3]}
          editLink="/admin/edit/admin"
          // deleteAction={async (id) => {
          //   const result = await deleteAdminById(Number(id));
          //   return { success: result.success };
          // }}
          deleteAction={deleteAdminById}
          idIndex={0}
        />
      </div>
    </main>
  );
}
