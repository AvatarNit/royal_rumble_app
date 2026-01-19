"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "@/app/components/logoButton";
import LoginButton from "@/app/components/loginButton";
import SaveButton from "@/app/components/saveButton";
import ReassignTable from "@/app/components/reassignTable";
import "@/app/css/admin.css";
import "@/app/css/logo+login.css";
import BackButton from "@/app/components/backButton";
import { useAlert } from "@/app/context/AlertContext";

import { deleteMentorById } from "@/actions/mentor";
import { deleteFreshmanById } from "@/actions/freshmen";

export default function EditFreshmenGroupUI({
  groupData,
  freshmenData: f,
  mentorData,
}: {
  groupData: any;
  freshmenData: any;
  mentorData: any;
}) {
  const { showAlert } = useAlert();

  const router = useRouter();
  const [groupId, setGroupId] = useState("");
  const [routeNum, setRouteNum] = useState(0);
  const [eventOrder, setEventOrder] = useState("");

  useEffect(() => {
    setGroupId(groupData.groupId?.toString() || "");
    setRouteNum(groupData.routeNum || 0);
    setEventOrder(
      groupData.eventOrder ? JSON.parse(groupData.eventOrder).join(", ") : "",
    );
  }, [groupData]);

  const contentBoxStyle = {
    border: "5px solid var(--primaryRed)",
    padding: "16px",
    margin: "15px 50px",
    width: "85%",
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
        <h1 className="admin-title">Edit Group - {groupId}</h1>
      </header>

      <BackButton href="/admin/all_groups" />
      <div style={contentBoxStyle}>
        <div className="edit-user-form">
          <div className="form-row">
            <label className="form-label">Group ID:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Group ID:"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Route:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Route:"
              value={routeNum}
              onChange={(e) => setRouteNum(Number(e.target.value))}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Event Order:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Event Order:"
              value={eventOrder}
              onChange={(e) => setEventOrder(e.target.value)}
            />
          </div>
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="d-flex justify-content-center"
          >
            <SaveButton>Save</SaveButton>
          </div>
          <div className="form-row">
            <label className="form-label">Mentor:</label>
          </div>
          <div>
            <ReassignTable
              headers={["ID", "First Name", "Last Name"]}
              data={mentorData.map((m: any) => [m.mentor_id, m.fname, m.lname])}
              visibleColumns={[0, 1, 2]}
              link="/admin/edit/reassign"
              deleteAction={async (id) => {
                const result = await deleteMentorById(Number(id));
                return { success: result.success };
              }}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Freshmen:</label>
          </div>
          <ReassignTable
            headers={["ID", "First Name", "Last Name"]}
            data={f.map((f: any) => [f.freshmenId, f.fName, f.lName])}
            visibleColumns={[0, 1, 2]}
            link="/admin/edit/reassign"
            deleteAction={async (id) => {
              const result = await deleteFreshmanById(Number(id));
              return { success: result.success };
            }}
          />
        </div>
      </div>
    </main>
  );
}
