"use client";

import { useCallback } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/homepage.css";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  const handleMicrosoftLogin = async () => {
    await signIn("microsoft-entra-id");
  };

  return (
    <button className="profile-icon-button" onClick={handleMicrosoftLogin}>
      <i className="bi bi-person-fill"></i>
    </button>
  );
}
