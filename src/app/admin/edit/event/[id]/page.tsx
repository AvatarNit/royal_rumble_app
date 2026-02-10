"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import LogoButton from "../../../../components/logoButton";
import LoginButton from "../../../../components/loginButton";
import SaveButton from "../../../../components/saveButton";
import BackButton from "@/app/components/backButton";
import "../../../../css/admin.css";
import "../../../../css/logo+login.css";
import { useAlert } from "@/app/context/AlertContext";

import { getEventById, updateEventByID } from "@/actions/other";

export default function AdminEditEvents({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const eventId = Number(params.id);
  const { showAlert } = useAlert();

  const [job, setJob] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const [currentJob, setCurrentJob] = useState("");

  // Load event data
  useEffect(() => {
    const loadEvent = async () => {
      const event = await getEventById(eventId);
      setName(event.name ?? "");
      setDate(event.date ?? "");
      setTime(event.time ?? "");
      setLocation(event.location ?? "");
      setJob(event.job ?? "");
      setDescription(event.description ?? "");
      setCurrentJob(event.job ?? "");
    };
    loadEvent();
  }, [eventId]);

  const handleSave = async () => {
    await updateEventByID(
      eventId,
      {
        name: name,
        date: date,
        time: time,
        location: location,
        job: job,
        description: description,
      },
      currentJob,
    );
    showAlert(`Event ${name} updated successfully!`, "success");
    router.push("/admin/events");
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
        <h1 className="admin-title">Edit Event - {name}</h1>
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
              type="date"
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
            <label className="form-label">Job:</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setJob(e.target.value)}
              value={job || ""}
            >
              {job === "" ? (
                <option disabled value="">
                  Select Job
                </option>
              ) : null}
              <option value="ALL">ALL</option>
              <option value="GROUP LEADER">GROUP LEADER</option>
              <option value="HALLWAY HOST">HALLWAY HOST</option>
              <option value="SPIRIT SESSION">SPIRIT SESSION</option>
              <option value="UTILITY SQUAD">UTILITY SQUAD</option>
            </select>
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
      <div style={{ display: "flex", alignItems: "center" }}>
        <SaveButton onClick={handleSave}>Save</SaveButton>
      </div>
    </main>
  );
}
