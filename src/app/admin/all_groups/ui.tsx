"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../components/logoButton";
import LoginButton from "../../components/loginButton";
import ViewDropdown from "../../components/viewDropdown";
import InfoTable from "../../components/infoTable";
import AddButton from "../../components/addButton";
import "../../css/admin.css";
import "../../css/logo+login.css";
import {
  addHallway,
  deleteGroupByGroupId,
  deleteHallwayByStopId,
} from "@/actions/group";
import { Button, Modal } from "react-bootstrap";
import { useAlert } from "@/app/context/AlertContext";

interface FreshmenGroup {
  group_id: string;
  route_num: number;
  event_order: string;
  freshmen: Array<{ freshman_id: string; name: string }>;
  mentors: Array<{ mentor_id: string; name: string }>;
}
interface HallwayGroup {
  hallwayStopId: number;
  location: string;
  mentors: Array<{ mentor_id: string; name: string }>;
}

export default function AdminAllGroups({
  freshmenGroups,
  hallwayGroups,
}: {
  freshmenGroups: FreshmenGroup[];
  hallwayGroups: HallwayGroup[];
}) {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push("/admin");
  };

  const [displayFreshmenGroup, setDisplayFreshmenGroup] = useState(true);
  const [selectedGroupId, setSelectedGroupId] = useState("");

  const [newHallway, setNewHallway] = useState("");
  const [showHallwayModal, setShowHallwayModal] = useState(false);

  const { showAlert } = useAlert();

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title" style={{ marginBottom: "30px" }}>
          All Group Information
        </h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>

      {/* Group Dropdown */}
      <div className="search-container" style={{ marginLeft: "15%" }}>
        <div className="search-row">
          <div className="form-row">
            <select
              className="form-select"
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
            >
              <option value="">All Groups</option>
              {displayFreshmenGroup &&
                freshmenGroups.map((group) => (
                  <option key={group.group_id} value={group.group_id}>
                    {group.group_id}
                  </option>
                ))}
              {!displayFreshmenGroup &&
                hallwayGroups.map((group) => (
                  <option
                    key={group.hallwayStopId}
                    value={group.hallwayStopId - 1}
                  >
                    {group.location}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
      {/* --- Group/Hallway Radio Buttons --- */}
      <div style={{ width: "85%", marginTop: "20px" }}>
        <div className="form-container" style={{ margin: "0px" }}>
          <form className="manual-add-form">
            <div className="form-row checkbox-row">
              <label className="checkbox-label">
                <input
                  type="radio"
                  name="groupType"
                  className="checkbox-input"
                  checked={displayFreshmenGroup}
                  onChange={() => {
                    setDisplayFreshmenGroup(true);
                    setSelectedGroupId("");
                  }}
                />
                Freshmen Groups
              </label>
              <label className="checkbox-label">
                <input
                  type="radio"
                  name="groupType"
                  value="hallway"
                  className="checkbox-input"
                  checked={!displayFreshmenGroup}
                  onChange={() => {
                    setDisplayFreshmenGroup(false);
                    setSelectedGroupId("");
                  }}
                />
                Hallway Groups
              </label>
            </div>
          </form>
        </div>
      </div>

      <div
        style={{
          width: "87%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
          fontSize: "15px",
        }}
      >
        {/* Add Buttons */}
        {displayFreshmenGroup ? (
          <>
            <AddButton
              onClick={() => router.push("/admin/add/freshman")}
              style={{
                fontSize: "21px",
                justifyContent: "flex-start",
                width: "270px",
              }}
            >
              Add Freshman
              <i
                className="bi bi-plus-circle"
                style={{ marginLeft: "30px", fontSize: "30px" }}
              ></i>
            </AddButton>
            <AddButton
              onClick={() => router.push("/admin/add/freshmen_group")}
              style={{ fontSize: "21px", justifyContent: "flex-end" }}
            >
              Add Group
              <i
                className="bi bi-plus-circle"
                style={{ marginLeft: "30px", fontSize: "30px" }}
              ></i>
            </AddButton>
          </>
        ) : (
          <>
            <AddButton
              onClick={() => router.push("/admin/add/mentor")}
              style={{
                fontSize: "21px",
                justifyContent: "flex-start",
                width: "270px",
              }}
            >
              Add Mentor
              <i
                className="bi bi-plus-circle"
                style={{ marginLeft: "30px", fontSize: "30px" }}
              ></i>
            </AddButton>
            <AddButton
              onClick={() => setShowHallwayModal(true)}
              style={{ fontSize: "21px", justifyContent: "flex-end" }}
            >
              Add Hallway
              <i
                className="bi bi-plus-circle"
                style={{ marginLeft: "30px", fontSize: "30px" }}
              ></i>
            </AddButton>
          </>
        )}
      </div>
      {displayFreshmenGroup ? (
        <ViewDropdown
          header={`Freshmen Group ${selectedGroupId}`}
          editLink={`/admin/edit/freshmenGroup`}
          sections={freshmenGroups
            .filter(
              (group) =>
                selectedGroupId === "" || group.group_id === selectedGroupId,
            )
            .map((group) => ({
              title: `Group ${group.group_id}${
                group.group_id !== "Unassigned"
                  ? ` [${group.mentors.map((mentor) => mentor.name).join(", ")}]`
                  : ""
              }`,
              content: (
                <section>
                  <div className="info-pairs">
                    <div className="info-pair">
                      <div className="info-label">Route #:</div>
                      <div className="info-value">{group.route_num}</div>
                    </div>
                    <div className="info-pair">
                      <div className="info-label">Event Order:</div>
                      <div className="info-value">{group.event_order}</div>
                    </div>
                  </div>

                  <label className="info-label" style={{ marginTop: "30px" }}>
                    Mentors:
                  </label>
                  <InfoTable
                    headers={["Mentor Name", "Student ID"]}
                    data={group.mentors.map((m) => [m.name, m.mentor_id])}
                  />

                  <label className="info-label" style={{ marginTop: "30px" }}>
                    Freshmen:
                  </label>
                  <InfoTable
                    headers={["Freshman Name", "Student ID"]}
                    data={group.freshmen.map((f) => [f.name, f.freshman_id])}
                  />
                </section>
              ),
              sectionId: group.group_id,
            }))}
          deleteAction={async (id) => {
            const result = await deleteGroupByGroupId(id.toString());
            return { success: result.success };
          }}
        />
      ) : !displayFreshmenGroup && hallwayGroups.length > 0 ? (
        <ViewDropdown
          header={`Hallways`}
          editLink="/admin/edit/hallwayGroup"
          sections={hallwayGroups
            .filter(
              (group) =>
                selectedGroupId === "" ||
                group.hallwayStopId === Number(selectedGroupId) + 1,
            )
            .map((group) => ({
              title: `${group.location}`,
              content: (
                <section>
                  <div className="info-pairs">
                    <div
                      className="info-pair"
                      style={{ marginBottom: "50px", marginTop: "30px" }}
                    >
                      <div className="info-label">Location:</div>
                      <div className="info-value">{group.location}</div>
                    </div>
                  </div>

                  <label className="info-label" style={{ marginTop: "30px" }}>
                    Mentors:
                  </label>
                  <div style={{ width: "100%" }}>
                    <InfoTable
                      headers={["Mentor Name", "Student ID"]}
                      data={group.mentors.map((m) => [m.name, m.mentor_id])}
                    />
                  </div>
                </section>
              ),
              sectionId: group.hallwayStopId,
            }))}
          deleteAction={async (id) => {
            const result = await deleteHallwayByStopId(Number(id));
            return { success: result.success };
          }}
        />
      ) : null}

      {/* -------- Add Hallway Modal -------- */}

      <Modal show={showHallwayModal} onHide={() => setShowHallwayModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Hallway</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-row">
            <label className="form-label">New Hallway:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Hallway Name"
              onChange={(e) => setNewHallway(e.target.value)}
            ></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowHallwayModal(false);
              setNewHallway("");
            }}
            style = {{ 
              backgroundColor: "var(--primaryRed)",
              color: "white",
              fontFamily: "Poppins, sans-serif",
              border: "5px solid transparent",
              borderRadius: "10px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "var(--primaryRed)";
              e.currentTarget.style.borderColor = "var(--primaryRed)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--primaryRed)";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.borderColor = "transparent";
            }}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={async () => {
              const result = await addHallway(newHallway);

              if (result?.success) {
                showAlert(
                  `Successfully added hallway with ID ${newHallway}`,
                  "success",
                );
              } else {
                showAlert(
                  `Failed to add hallway with ID ${newHallway}`,
                  "danger",
                );
              }

              setNewHallway("");
              setShowHallwayModal(false);
              router.refresh();
            }}
            style = {{ 
              backgroundColor: "var(--primaryBlue)",
              color: "white",
              fontFamily: "Poppins, sans-serif",
              border: "5px solid transparent",
              borderRadius: "10px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "var(--primaryBlue)";
              e.currentTarget.style.borderColor = "var(--primaryBlue)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--primaryBlue)";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.borderColor = "transparent";
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}
