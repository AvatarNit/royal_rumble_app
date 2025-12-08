"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "@/app/components/logoButton";
import LoginButton from "@/app/components/loginButton";
import SaveButton from "@/app/components/saveButton";
import "@/app/css/admin.css";
import "@/app/css/logo+login.css";
import BackButton from "@/app/components/backButton";
import { useAlert } from "@/app/context/AlertContext";

export default function EditHallwayGroup({

  params,
}: {
  params: { id: string };

}) {
  const hallwayId = Number(params.id);
  const { showAlert } = useAlert();

  const router = useRouter();
  const [location, setLocation] = useState("");

  //   Load mentor data
  /*
  useEffect(() => {
    const loadHallway = async () => {
      const group = await getHallwayById(groupId);
      setLocation(group.location ?? "");
    };
    loadHallway();
  }, [hallwayId]);

  const handleSave = async () => {
    await updateHallwayByID(hallwayId, {
      location: location,
    });
    showAlert(`Hallway ${hallwayId} updated successfully!`, "success");
    router.push("/admin/all_groups"); // redirect after save
  }; */
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
          Edit Hallway - {hallwayId}
        </h1>
      </header>

      <BackButton href="/admin/all_groups" />
      <div style={contentBoxStyle}>
        <div className="edit-user-form">
          <div className="form-row">
            <label className="form-label">Location:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Location:"
              /*
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              */
            />
          </div>
          <div className="form-row">
            <label className="form-label">Mentor:</label>
          </div>
        </div>
      </div>
      <div style={{display: "flex", alignItems: "center"}}>
        <SaveButton>
            Save
        </SaveButton>
      </div>
    </main>
  );
}