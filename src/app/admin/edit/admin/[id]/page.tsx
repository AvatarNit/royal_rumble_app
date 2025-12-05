"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import LogoButton from "../../../../components/logoButton";
import LoginButton from "../../../../components/loginButton";
import SaveButton from "../../../../components/saveButton";
import BackButton from "@/app/components/backButton";
import "../../../../css/admin.css";
import "../../../../css/logo+login.css";

import { getAdminById, updateAdminByID } from "@/actions/admin";

export default function AdminEditAdmin({ params }: { params: { id: string } }) {
  const router = useRouter();
  const adminId = Number(params.id);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");

  // Load admin data
  useEffect(() => {
    const loadAdmin = async () => {
      const admin = await getAdminById(adminId);
      setFName(admin.fName ?? "");
      setLName(admin.lName ?? "");
      setEmail(admin.email ?? "");
    };
    loadAdmin();
  }, [adminId]);

  const handleSave = async () => {
    await updateAdminByID(adminId, {
      f_name: fName,
      l_name: lName,
      email: email,
    });
    router.push("/admin/admin"); // redirect after save
  };

  const contentBoxStyle = {
    border: "5px solid var(--primaryRed)",
    padding: "16px",
    margin: "15px 50px",
    height: "auto",
    color: "var(--textGrey)",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left" as const,
    overflow: "auto" as const,
  };

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">
          Edit Admin - {fName} {lName}
        </h1>
      </header>

      <BackButton href="/admin/admin" />

      <div style={contentBoxStyle}>
        <div className="edit-user-form">
          <div className="form-row">
            <label className="form-label">First Name:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Admin First Name"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Last Name:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Admin Last Name"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Email:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <SaveButton onClick={handleSave}>Save</SaveButton>
        </div>
      </div>
    </main>
  );
}
