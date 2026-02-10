"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import AddButton from "../../../components/addButton";
import "../../../css/admin.css";
import "../../../css/logo+login.css";
import { addCustomGroup } from "../../../../actions/group";
import { useAlert } from "@/app/context/AlertContext";

export default function AdminAddFreshmenGroupPage(props: {
  orders: string[][];
}) {
  const router = useRouter();
  const { showAlert } = useAlert();
  const handleLogoClick = () => {
    router.push("/admin/all_groups");
  };

  const [groupName, setGroupName] = useState("");
  const [eventOrder, setEventOrder] = useState("");
  const [routeNumber, setRouteNumber] = useState(1);

  const handleAddGroup = async () => {
    if (!groupName || !eventOrder || !routeNumber) {
      alert("Please fill in all fields.");
      return;
    }

    const result = await addCustomGroup(
      groupName,
      eventOrder.split(", "),
      routeNumber,
    );
    showAlert(`Group ${result[0].groupId} added successfully!`, "success");
    router.push("/admin/all_groups");
  };

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Add New Group</h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>

      <section className="add-form">
        <div className="edit-user-form">
          <div className="form-row">
            <label className="form-label">Group Name:</label>
            <input
              type="text"
              className="form-input"
              placeholder="ex. ENL: Spaish"
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Event Order:</label>
            <select
              className="form-input"
              value={eventOrder}
              onChange={(e) => setEventOrder(e.target.value)}
            >
              <option value="" disabled>
                Select Order
              </option>
              {props.orders.map((order, index) => (
                <option key={index} value={order}>
                  {order.join(", ")}
                </option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Route #:</label>
            <input
              type="number"
              className="form-input"
              onChange={(e) => setRouteNumber(parseInt(e.target.value))}
            />
          </div>
        </div>
      </section>
      <div className="add-button-align">
        <AddButton onClick={handleAddGroup}>
          Add
          <i
            className="bi bi-plus-circle"
            style={{ marginLeft: "30px", fontSize: "30px" }}
          ></i>
        </AddButton>
      </div>
    </main>
  );
}
