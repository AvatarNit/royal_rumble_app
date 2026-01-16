"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import SaveButton from "../../../components/saveButton";
import BackButton from "@/app/components/backButton";
import "../../../css/admin.css";
import "../../../css/logo+login.css";
import { useAlert } from "@/app/context/AlertContext";

{/* import { getEventById, updateEventByID } from "@/actions/events"; */}

export default function AdminEditEvents({ params }: { params: { id: string } }) {
  const router = useRouter();
  const eventId = Number(params.id);
  const { showAlert } = useAlert();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [description, setDescription] = useState("");

  // Load event dat
  {/*}
  useEffect(() => {
    const loadEvent = async () => {
      const event = await getEventById(eventId);
      setName(event.name ?? "");
      setDate(event.date ?? "");
      setTime(event.time ?? "");
      setLocation(event.location ?? "");
      setAssignedTo(event.assignedTo ?? "");
      setDescription(event.description ?? "");
    };
    loadEvent();
  }, [eventId]);
  */}
  
  const handleSave = async () => {
    {/*
    await updateEventByID(eventId, {
      name: Name,
      date: Date,
      time: Time,
      location: Location,
      assignedTo: AssignedTo,
      description: Description,
    };
    showAlert(`Event ${Name} updated successfully!`, "success");
    router.push("/admin/events"); // redirect after save
    */}
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
          Edit Event - {name}
        </h1>
      </header>

      <BackButton href="/admin/events" />

      <div style={contentBoxStyle}>
        <div className="edit-user-form">
          <div className="form-row">
            <label className="form-label">Event name:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Event Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Date:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Event Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Time:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Time of Event"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Location:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Event Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Assigned To:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Mentors Assigned To Event"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Description:</label>
            <textarea
            className="form-input-large"
            rows={2}
            onInput={(e) => {
              const textarea = e.currentTarget;
              textarea.style.height = "auto";
              textarea.style.height = textarea.scrollHeight + "px";
            }}
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          </div>
        </div>
      </div>
      <div style={{display: "flex", alignItems: "center"}}>
        <SaveButton onClick={handleSave}>
          Save
        </SaveButton>
      </div>
    </main>
  );
}
