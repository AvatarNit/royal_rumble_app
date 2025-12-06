"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import AddButton from "../../../components/addButton";
import { addFreshman } from "../../../../actions/freshmen";
import "../../../css/admin.css";
import "../../../css/logo+login.css";
import { useAlert } from "@/app/context/AlertContext";

export default function AdminAddFreshman() {
  const router = useRouter();
  const { showAlert } = useAlert();

  const [f_name, setf_name] = useState("");
  const [l_name, setl_name] = useState("");
  const [freshmenId, setFreshmenId] = useState("");
  const [email, setEmail] = useState("");
  const [primaryLanguage, setPrimaryLanguage] = useState("");

  const handleLogoClick = () => {
    router.push("/admin/add");
  };

  const handleAdd = async () => {
    try {
      const freshmen_return = await addFreshman({
        f_name: f_name,
        l_name: l_name,
        freshmen_id: Number(freshmenId),
        email,
        primary_language: primaryLanguage,
      });
      if (!freshmen_return.success) {
        throw new Error("Failed to add freshman");
      }
      showAlert(
        `Freshman ${freshmen_return.f_name} ${freshmen_return.l_name} added successfully!`,
        "success"
      );
      router.push("/admin/add/freshman");
    } catch (error) {
      console.error(error);
      showAlert(`Failed to add freshman: ${f_name} ${l_name}`, "danger");
    }
    router.push("/admin/freshmen");
  };

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Add New Freshman</h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>

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
            <label className="form-label">Student ID:</label>
            <input
              type="text"
              className="form-input"
              value={freshmenId}
              onChange={(e) => setFreshmenId(e.target.value)}
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
            <label className="form-label">Primary Language:</label>
            <input
              type="text"
              className="form-input"
              value={primaryLanguage}
              onChange={(e) => setPrimaryLanguage(e.target.value)}
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
