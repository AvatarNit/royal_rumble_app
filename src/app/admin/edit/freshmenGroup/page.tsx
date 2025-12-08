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

export default function EditFreshmenGroup({

  params,
}: {
  params: { id: string };

}) {
  const groupId = Number(params.id);
  const { showAlert } = useAlert();

  const router = useRouter();
  const [route, setRoute] = useState("");
  const [eventOrder, setEventOrder] = useState("");
  const [recentStop, setRecentStop] = useState("");

  //   Load mentor data
  /*
  useEffect(() => {
    const loadGroup = async () => {
      const group = await getGroupById(groupId);
      setRoute(group.route ?? "");
      setEventOrder(group.eventOrder ?? "");
      setRecentStop(group.recentStop ?? "");
    };
    loadFGroup();
  }, [groupId]);

  const handleSave = async () => {
    await updateGroupByID(groupId, {
      route: route,
      event_order: eventOrder,
      recent_stop: recentStop,
    });
    showAlert(`Group ${groupId} updated successfully!`, "success");
    router.push("/admin/all_groups"); // redirect after save
  }; */
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
        <h1 className="admin-title">
          Edit Group - {groupId}
        </h1>
      </header>

      <BackButton href="/admin/all_groups" />
      <div style={contentBoxStyle}>
        <div className="edit-user-form">
          <div className="form-row">
            <label className="form-label">Route:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Route:"
              /*
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              */
            />
          </div>
          <div className="form-row">
            <label className="form-label">Event Order:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Event Order:"
              /*
              value={eventOrder}
              onChange={(e) => setEventOrder(e.target.value)}
              */
            />
          </div>
          <div className="form-row">
            <label className="form-label">Recent Stop:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Recent Stop:"
              /*
              value={recentStop}
              onChange={(e) => setRecentStop(e.target.value)}
              */
            />
          </div>
          <div className="form-row">
            <label className="form-label">Mentor:</label>
          </div>
          <div>
            <ReassignTable
              headers={["First Name", "Last Name"]}
              data={[
                [1, "fname", "lName"],
                [1, "fName", "lName"],
                [1, "fName", "lName"]
              ]}
              visibleColumns={[1, 2]}
              link="/admin/edit/reassign"
            />
          </div>
          <div className="form-row">
            <label className="form-label">Freshmen:</label>
          </div>
          <ReassignTable
              headers={["First Name", "Last Name"]}
              data={[
                [1, "fname", "lName"],
                [1, "fName", "lName"],
                [1, "fName", "lName"]
              ]}
              visibleColumns={[1, 2]}
              link="/admin/edit/reassign"
              />
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