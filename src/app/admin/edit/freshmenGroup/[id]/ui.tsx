"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";

import LogoButton from "@/app/components/logoButton";
import LoginButton from "@/app/components/loginButton";
import SaveButton from "@/app/components/saveButton";
import ReassignTable from "@/app/components/reassignTable";
import BackButton from "@/app/components/backButton";

import "@/app/css/admin.css";
import "@/app/css/logo+login.css";

import { useAlert } from "@/app/context/AlertContext";

import { deleteMentorById, reassignMentorGroup } from "@/actions/mentor";
import { deleteFreshmanById, reassignFreshmenGroup } from "@/actions/freshmen";
import { updateGroupByGroupId, getGroupIds } from "@/actions/group";

/* ---------------- TYPES ---------------- */

interface GroupData {
  groupId: string | number;
  routeNum: number | null;
  eventOrder: string | null;
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

/* ---------------- HELPERS ---------------- */

const normalizeEventOrder = (value: string | null): string => {
  if (!value) return "";

  if (value.trim().startsWith("[")) {
    try {
      return JSON.parse(value).join(",");
    } catch {
      return "";
    }
  }

  return value
    .split(",")
    .map((v) => v.trim())
    .join(",");
};

/* ---------------- COMPONENT ---------------- */

export default function EditFreshmenGroupUI({
  groupData,
  freshmenData: f,
  mentorData,
  orders,
}: {
  groupData: GroupData;
  freshmenData: FreshmanData[];
  mentorData: MentorData[];
  orders: string[][];
}) {
  const { showAlert } = useAlert();
  const router = useRouter();

  const [groupId, setGroupId] = useState("");
  const [routeNum, setRouteNum] = useState<string>("");
  const [eventOrder, setEventOrder] = useState("");
  const [possibleGroups, setPossibleGroups] = useState<
    Array<{ group_id: string; name?: string }>
  >([]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  /* ---------------- SYNC GROUP DATA ---------------- */

  useEffect(() => {
    if (!groupData) return;

    setGroupId(groupData.groupId.toString());
    setRouteNum(groupData.routeNum?.toString() || "");
    setEventOrder(normalizeEventOrder(groupData.eventOrder));
  }, [groupData]);

  /* ---------------- FETCH GROUP IDS ---------------- */

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

  /* ---------------- VALIDATE ---------------- */

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!groupId.trim()) newErrors.groupId = "Group ID is required.";
    if (!routeNum.toString().trim()) {
      newErrors.routeNum = "Route number is required.";
    } else if (
      !/^\d+$/.test(routeNum.toString()) ||
      parseInt(routeNum.toString()) <= 0
    ) {
      newErrors.routeNum = "Route must be a positive integer.";
    }
    if (!eventOrder) newErrors.eventOrder = "Please select an event order.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- SAVE ---------------- */

  const handleSave = async () => {
    if (!validate()) return;

    const result = await updateGroupByGroupId(
      groupData.groupId.toString(),
      groupId,
      eventOrder.split(","),
      Number(routeNum),
    );

    if (result.success) {
      showAlert(`Group ${result.groupId} updated!`, "success");
    } else {
      showAlert(`Failed to update group ${result.groupId}.`, "danger");
    }

    router.push("/admin/edit/freshmenGroup/" + groupId);
  };

  /* ---------------- UI ---------------- */
  const contentBoxStyle = {
    border: "5px solid var(--primaryRed)",
    padding: "16px",
    margin: "15px 50px",
    width: "85%",
    height: "auto",
    color: "var(--textBlack)",
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
          {/* GROUP ID */}
          <div className="form-row">
            <label className="form-label">Group ID:</label>
            <div>
              <input
                type="text"
                className={`form-input${errors.groupId ? " is-invalid" : ""}`}
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
              />
              {errors.groupId && (
                <div className="invalid-feedback d-block">{errors.groupId}</div>
              )}
            </div>
          </div>

          {/* ROUTE */}
          <div className="form-row">
            <label className="form-label">Route:</label>
            <div>
              <input
                type="number"
                className={`form-input${errors.routeNum ? " is-invalid" : ""}`}
                value={routeNum}
                onChange={(e) => setRouteNum(e.target.value)}
              />
              {errors.routeNum && (
                <div className="invalid-feedback d-block">
                  {errors.routeNum}
                </div>
              )}
            </div>
          </div>

          {/* EVENT ORDER */}
          <div className="form-row">
            <label className="form-label">Event Order:</label>
            <div>
              <select
                className={`form-input${errors.eventOrder ? " is-invalid" : ""}`}
                value={eventOrder}
                onChange={(e) => setEventOrder(e.target.value)}
              >
                <option value="" disabled>
                  Select Order
                </option>
                {orders.map((order, index) => {
                  const value = order.join(",");
                  return (
                    <option key={index} value={value}>
                      {order.join(", ")}
                    </option>
                  );
                })}
              </select>
              {errors.eventOrder && (
                <div className="invalid-feedback d-block">
                  {errors.eventOrder}
                </div>
              )}
            </div>
          </div>

          {/* SAVE */}
          <div className="d-flex justify-content-center">
            <SaveButton onClick={handleSave}>Save</SaveButton>
          </div>

          {/* MENTORS */}
          <div className="form-row">
            <label className="form-label">Mentor:</label>
          </div>

          <ReassignTable
            headers={["ID", "First Name", "Last Name"]}
            data={mentorData.map((m) => [m.mentor_id, m.fname, m.lname])}
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

          {/* FRESHMEN */}
          <div className="form-row">
            <label className="form-label">Freshmen:</label>
          </div>

          <ReassignTable
            headers={["ID", "First Name", "Last Name"]}
            data={f.map((f) => [f.freshmenId, f.fName, f.lName])}
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
