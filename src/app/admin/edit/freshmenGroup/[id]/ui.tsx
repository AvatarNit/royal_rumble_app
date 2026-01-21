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

import { deleteMentorById, reassignMentorGroup } from "@/actions/mentor";
import { deleteFreshmanById, reassignFreshmenGroup } from "@/actions/freshmen";
import { updateGroupByGroupId, getGroupIds } from "@/actions/group";

interface GroupData {
  groupId: string | number;
  routeNum: number;
  eventOrder?: string;
}

interface MentorData {
  mentor_id: string | number;
  fname: string;
  lname: string;
}

interface FreshmanData {
  freshmenId: string | number;
  fName: string;
  lName: string;
}

export default function EditFreshmenGroupUI({
  groupData,
  freshmenData: f,
  mentorData,
}: {
  groupData: GroupData;
  freshmenData: FreshmanData[];
  mentorData: MentorData[];
}) {
  const { showAlert } = useAlert();

  const router = useRouter();
  const [groupId, setGroupId] = useState("");
  const [routeNum, setRouteNum] = useState(0);
  const [eventOrder, setEventOrder] = useState("");
  const [possibleGroups, setPossibleGroups] = useState<
    { group_id: string; name?: string }[]
  >([]);

  useEffect(() => {
    setGroupId(groupData.groupId?.toString() || "");
    setRouteNum(groupData.routeNum || 0);
    setEventOrder(
      groupData.eventOrder ? JSON.parse(groupData.eventOrder).join(", ") : "",
    );
  }, [groupData]);

  useEffect(() => {
    const fetchGroups = async () => {
      const groups = await getGroupIds();
      setPossibleGroups(
        groups.map((g: any) => ({
          group_id: g.groupId,
          name: g.name,
        })),
      );
    };
    fetchGroups();
  }, []);

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

  const handleSave = async (e: React.FormEvent) => {
    const result = await updateGroupByGroupId(
      groupData.groupId.toString(),
      groupId,
      eventOrder.split(","),
      routeNum,
    );
    if (result.success) {
      showAlert(`Group ${result.groupId} updated!`, "success");
    } else {
      showAlert(`Failed to update group ${result.groupId}.`, "danger");
    }
    router.push("/admin/edit/freshmenGroup/" + groupId);
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
                const result = await reassignMentorGroup(
                  Number(id),
                  newGroupId.toString(),
                );
                return { success: result.success };
              }}
              currentGroupId={groupId}
              possibleGroups={possibleGroups}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Freshmen:</label>
          </div>
          <ReassignTable
            headers={["ID", "First Name", "Last Name"]}
            data={f.map((f: any) => [f.freshmenId, f.fName, f.lName])}
            visibleColumns={[0, 1, 2]}
            deleteAction={async (id) => {
              const result = await deleteFreshmanById(Number(id));
              return { success: result.success };
            }}
            reassignAction={async (id, newGroupId) => {
              const result = await reassignFreshmenGroup(
                Number(id),
                newGroupId.toString(),
              );
              return { success: result.success };
            }}
            currentGroupId={groupId}
            possibleGroups={possibleGroups}
          />
        </div>
      </div>
    </main>
  );
}
