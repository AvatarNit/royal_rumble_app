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
import { useAlert } from "@/app/context/AlertContext";

export default function AdminAddAdmin() {
  const router = useRouter();
  const { showAlert } = useAlert();

  const [f_name, setf_name] = useState("");
  const [l_name, setl_name] = useState("");
  const [email, setEmail] = useState("");
  const [adminId, setAdminId] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!f_name.trim()) newErrors.f_name = "First name is required.";
    if (!l_name.trim()) newErrors.l_name = "Last name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!adminId.trim()) {
      newErrors.adminId = "Admin ID is required.";
    } else if (!/^\d+$/.test(adminId) || parseInt(adminId) <= 0) {
      newErrors.adminId = "Admin ID must be a positive integer.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = async () => {
    if (!validate()) return;

    try {
      const admin_return = await addAdmin({
        f_name,
        l_name,
        email,
        admin_id: parseInt(adminId),
      });

      if (!admin_return.success) {
        showAlert("Failed to add admin", "danger");
        return;
      }

      showAlert(
        `Admin ${admin_return.f_name} ${admin_return.l_name} added successfully!`,
        "success",
      );

      router.push("/admin/admin");
    } catch (error) {
      showAlert(`Error adding admin: ${f_name} ${l_name}`, "danger");
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
            <div>
              <input
                type="text"
                className={`form-input${errors.f_name ? " is-invalid" : ""}`}
                value={f_name}
                onChange={(e) => setf_name(e.target.value)}
              />
              {errors.f_name && (
                <div className="invalid-feedback d-block">{errors.f_name}</div>
              )}
            </div>
          </div>
          <div className="form-row">
            <label className="form-label">Last Name:</label>
            <div>
              <input
                type="text"
                className={`form-input${errors.l_name ? " is-invalid" : ""}`}
                value={l_name}
                onChange={(e) => setl_name(e.target.value)}
              />
              {errors.l_name && (
                <div className="invalid-feedback d-block">{errors.l_name}</div>
              )}
            </div>
          </div>
          <div className="form-row">
            <label className="form-label">Email:</label>
            <div>
              <input
                type="text"
                className={`form-input${errors.email ? " is-invalid" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="invalid-feedback d-block">{errors.email}</div>
              )}
            </div>
          </div>
          <div className="form-row">
            <label className="form-label">Admin ID:</label>
            <div>
              <input
                type="text"
                className={`form-input${errors.adminId ? " is-invalid" : ""}`}
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
              />
              {errors.adminId && (
                <div className="invalid-feedback d-block">{errors.adminId}</div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="add-button-align">
        <AddButton onClick={handleAdd} style={{ fontSize: "30px" }}>
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
