"use client";

import { useAlert } from "../context/AlertContext";

export default function AlertMessage() {
  const { alert, clearAlert } = useAlert();

  if (!alert) return null;

  return (
    <div
      className={`alert alert-${alert.type} alert-dismissible fade show`}
      role="alert"
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        minWidth: "300px",
        zIndex: 9999,
        textAlign: "center",
      }}
    >
      {alert.message}

      <button type="button" className="btn-close" onClick={clearAlert}></button>
    </div>
  );
}
