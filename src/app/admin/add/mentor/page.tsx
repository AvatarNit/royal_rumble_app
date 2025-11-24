"use client";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import AddButton from "../../../components/addButton";
import { addMentor } from "../../../../actions/mentor";
import "../../../css/admin.css";
import "../../../css/logo+login.css";
import { useState } from "react";

export default function AdminAddMentor() {
  const router = useRouter();

  const [f_name, setf_name] = useState("");
  const [l_name, setl_name] = useState("");
  const [mentorId, setMentorId] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogoClick = () => {
    router.push("/admin/add");
  };

  const handleAdd = async () => {
    try {
      const mentor_return = await addMentor({
        f_name: f_name,
        l_name: l_name,
        mentor_id: Number(mentorId),
        graduation_year: Number(graduationYear),
        email,
        phone_number: phoneNumber,
      });
      if (!mentor_return.success) {
        throw new Error("Failed to add mentor");
      } else {
        alert(
          `Mentor ${mentor_return.f_name} ${mentor_return.l_name} added successfully!`
        );
        router.push("/admin/add/mentor");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add mentor.");
    }
  };

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Add New Mentor</h1>
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
              value={mentorId}
              onChange={(e) => setMentorId(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Graduation Year:</label>
            <input
              type="text"
              className="form-input"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
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
            <label className="form-label">Phone Number:</label>
            <input
              type="text"
              className="form-input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
