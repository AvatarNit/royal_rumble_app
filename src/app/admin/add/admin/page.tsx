"use client";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import AddButton from "../../../components/addButton";
import "../../../css/admin.css";
import "../../../css/logo+login.css";
import { useState } from "react";
import { addAdmin } from "@/actions/admin";
import BackButton from "@/app/components/backButton";

export default function AdminAddAdmin() {
  const router = useRouter();

  const [f_name, setf_name] = useState("");
  const [l_name, setl_name] = useState("");
  const [email, setEmail] = useState("");
  const [adminId, setAdminId] = useState("");

  const handleAdd = async () => {
    try {
      const admin_return = await addAdmin({
        f_name,
        l_name,
        email,
        admin_id: parseInt(adminId),
      });
      if (!admin_return.success) {
        throw new Error("Failed to add admin");
      } else {
        alert(
          `Admin ${admin_return.f_name} ${admin_return.l_name} added successfully!`
        );
        router.push("/admin/add/admin");
      }
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Add New Admin</h1>
      </header>

      <BackButton href="/admin/admin" />

      <section className="add-form">
        <div className="edit-user-form">
          <div className="form-row">
            <label className="form-label">First Name:</label>
            <input
              type="text"
              className="form-input"
              value={f_name}
              onChange={(e) => setf_name(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Last Name:</label>
            <input
              type="text"
              className="form-input"
              value={l_name}
              onChange={(e) => setl_name(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Email:</label>
            <input
              type="text"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Admin ID:</label>
            <input
              type="text"
              className="form-input"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
            />
          </div>
        </div>
      </section>
      <div className="add-button-align">
        <AddButton onClick={handleAdd}>
          Add
          <i
            className="bi bi-plus-circle"
            style={{ marginLeft: "30px", fontSize: "30px" }}
          ></i>
        </AddButton>
      </div>
    </main>
  );
}
