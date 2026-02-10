"use client";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import AddButton from "../../../components/addButton";
import "../../../css/admin.css";
import "../../../css/logo+login.css";
import { addEvent } from "@/actions/other";
import { useState } from "react";
import { useAlert } from "@/app/context/AlertContext";

export default function AdminAddEvent() {
  const router = useRouter();
  const { showAlert } = useAlert();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [job, setJob] = useState("");
  const [description, setDescription] = useState("");

  const handleLogoClick = () => {
    router.push("/admin/events");
  };

  const handleAddClick = async () => {
    try {
      const event_return = await addEvent({
        name,
        date,
        time,
        location,
        job,
        description,
      });
      if (!event_return.success) {
        throw new Error("Failed to add event");
      } else {
        showAlert(
          `Event ${event_return.name} on ${event_return.date} for ${event_return.job} added successfully!`,
          "success",
        );
        router.push("/admin/events");
      }
    } catch (error) {
      showAlert(`Error adding event: ${name}`, "danger");
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
            <label className="form-label">Date:</label>
            <input
              type="date"
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Time:</label>
            <input
              type="text"
              className="form-input"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Location:</label>
            <input
              type="text"
              className="form-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <label className="form-label">Description:</label>
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

          <div style={{ width: "90%", marginTop: "20px" }}>
            <div className="form-container" style={{ margin: "0px" }}>
              <form className="manual-add-form">
                <div className="form-row checkbox-row">
                  <label className="checkbox-label">
                    <input
                      type="radio"
                      name="mentorType"
                      value="groupLeader"
                      className="checkbox-input"
                      onChange={(e) => setJob("GROUP LEADER")}
                    />
                    Group Leader
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="radio"
                      name="mentorType"
                      value="hallwayHost"
                      className="checkbox-input"
                      onChange={(e) => setJob("HALLWAY HOST")}
                    />
                    Hallway Host
                  </label>
                </div>
                <div className="form-row checkbox-row">
                  <label className="checkbox-label">
                    <input
                      type="radio"
                      name="mentorType"
                      value="all"
                      className="checkbox-input"
                      onChange={(e) => setJob("ALL")}
                    />
                    All
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="radio"
                      name="mentorType"
                      value="spirit"
                      className="checkbox-input"
                      onChange={(e) => setJob("SPIRIT SESSION")}
                    />
                    Spirit
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="radio"
                      name="mentorType"
                      value="utility"
                      className="checkbox-input"
                      onChange={(e) => setJob("UTILITY SQUAD")}
                    />
                    Utility
                  </label>
                </div>
              </form>
            </div>
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
