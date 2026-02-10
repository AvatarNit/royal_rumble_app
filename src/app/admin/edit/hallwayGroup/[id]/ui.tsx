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

import { deleteMentorById, reassignMentorHallway } from "@/actions/mentor";
import { updateHallwayByID } from "@/actions/group";
import ReassignTable from "@/app/components/reassignTable";

interface hallwayData {
  hallwayStopId: string | number;
  location: string | null;
}

interface MentorData {
  mentor_id: string | number;
  fname: string;
  lname: string;
}

export default function EditHallwayGroupUI({
  hallwayData,
  mentorData,
  possibleHallways,
}: {
  hallwayData: hallwayData;
  mentorData: MentorData[];
  possibleHallways: hallwayData[];
}) {
  const { showAlert } = useAlert();

  const router = useRouter();
  const [location, setLocation] = useState("");
  const hallwayId = Number(hallwayData.hallwayStopId);
  console.log("Possible Hallways:", possibleHallways);

  useEffect(() => {
    setLocation(hallwayData.location ?? "");
  }, [hallwayData.location]);

  const handleSave = async () => {
    await updateHallwayByID(hallwayId, location);
    showAlert(`Hallway ${hallwayId} updated successfully!`, "success");
    router.push("/admin/all_groups"); // redirect after save
  };

  const contentBoxStyle = {
    border: "5px solid var(--primaryRed)",
    padding: "16px",
    margin: "15px 50px",
    height: "auto",
    width: "85%",
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
        <h1 className="admin-title">Edit Hallway - {location}</h1>
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <SaveButton onClick={handleSave}>Save</SaveButton>
          </div>
          <div className="form-row">
            <label className="form-label">Mentor:</label>
          </div>
          <div>
            <ReassignTable
              headers={["ID", "First Name", "Last Name"]}
              data={mentorData.map((m: any) => [m.mentor_id, m.fname, m.lname])}
              visibleColumns={[0, 1, 2]}
              deleteAction={async (id) => {
                const result = await deleteMentorById(Number(id));
                return { success: result.success };
              }}
              reassignAction={async (id, newGroupId) => {
                const result = await reassignMentorHallway(
                  Number(id),
                  newGroupId.toString(),
                );
                return { success: result.success };
              }}
              currentGroupId={hallwayData.hallwayStopId}
              possibleGroups={possibleHallways.map((hallway) => ({
                group_id: hallway.hallwayStopId.toString(),
                name: hallway.location ?? undefined,
              }))}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
