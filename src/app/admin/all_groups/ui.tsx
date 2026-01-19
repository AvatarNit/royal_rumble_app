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
import { deleteGroupByGroupId } from "@/actions/group";

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
      {/* --- CHECKBOXES FOR GROUP VISIBILITY --- */}
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
        <AddButton
          onClick={() => router.push("/admin/add/student")}
          style={{ fontSize: "21px", justifyContent: "flex-start" }}
        >
          Add Student
          <i
            className="bi bi-plus-circle"
            style={{ marginLeft: "30px", fontSize: "30px" }}
          ></i>
        </AddButton>
        {displayFreshmenGroup ? (
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
        ) : (
          <AddButton
            onClick={() => router.push("/admin/add/hallway_group")}
            style={{ fontSize: "21px", justifyContent: "flex-end" }}
          >
            Add Hallway
            <i
              className="bi bi-plus-circle"
              style={{ marginLeft: "30px", fontSize: "30px" }}
            ></i>
          </AddButton>
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
              title: `Group ${group.group_id} [${group.mentors
                .map((mentor) => mentor.name)
                .join(", ")}]`,
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
      ) : !displayFreshmenGroup ? (
        <ViewDropdown
          header={`Hallway Group ${
            hallwayGroups[Number(selectedGroupId)].hallwayStopId
          }`}
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
                  <InfoTable
                    headers={["Mentor Name", "Student ID"]}
                    data={group.mentors.map((m) => [m.name, m.mentor_id])}
                  />
                </section>
              ),
              sectionId: group.hallwayStopId,
            }))}
        />
      ) : null}
    </main>
  );
}
