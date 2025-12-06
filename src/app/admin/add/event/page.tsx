"use client";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import AddButton from "../../../components/addButton";
import "../../../css/admin.css";
import "../../../css/logo+login.css";
import { addTraining } from "@/actions/other";
import { useState } from "react";
import { useAlert } from "@/app/context/AlertContext";

export default function AdminAddEvent() {
  const router = useRouter();
  const { showAlert } = useAlert();

  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleLogoClick = () => {
    router.push("/admin/add");
  };

  const handleAddClick = async () => {
    try {
      const training_return = await addTraining({
        name,
        job,
        date,
        description,
      });
      if (!training_return.success) {
        throw new Error("Failed to add training");
      } else {
        showAlert(
          `Training ${training_return.name} on ${training_return.date} for ${training_return.job} added successfully!`,
          "success"
        );
        router.push("/admin/add/event");
      }
    } catch (error) {
      showAlert(`Error adding training: ${name}`, "danger");
    }
  };

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Add New Event</h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>

      <section className="add-form">
        <div className="edit-user-form">
          <div className="form-row">
            <label className="form-label">Event Name:</label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Event Date:</label>
            <input
              type="text"
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <label className="form-label">Event Description:</label>
          <textarea
            className="form-input-large"
            rows={2}
            onInput={(e) => {
              const textarea = e.currentTarget;
              textarea.style.height = "auto";
              textarea.style.height = textarea.scrollHeight + "px";
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="form-label">Assign To:</label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="radioDefault"
              id="radioAllMentors"
              onClick={(e) => setJob("All Mentors")}
            />
            <label className="form-check-label" htmlFor="radioAllMentors">
              All Mentors
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="radioDefault"
              id="radioGroupLeaders"
              onClick={(e) => setJob("Group Leader")}
            />
            <label className="form-check-label" htmlFor="radioGroupLeaders">
              Group Leaders
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="radioDefault"
              id="radioHallwayHosts"
              onClick={(e) => setJob("Hallway Host")}
            />
            <label className="form-check-label" htmlFor="radioHallwayHosts">
              Hallway Hosts
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="radioDefault"
              id="radioUtility"
              onClick={(e) => setJob("Utility")}
            />
            <label className="form-check-label" htmlFor="radioUtility">
              Utility
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="radioDefault"
              id="radioSpirit"
              onClick={(e) => setJob("Spirit")}
            />
            <label className="form-check-label" htmlFor="radioSpirit">
              Spirit
            </label>
          </div>
        </div>
      </section>
      <div className="add-button-align">
        <AddButton onClick={handleAddClick}>
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
