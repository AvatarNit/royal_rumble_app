"use client";

import { useCallback } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/homepage.css";

export default function LoginButton() {
  const handleMicrosoftLogin = useCallback(() => {
    console.log("Microsoft login triggered!");
    // TODO: Integrate NextAuth Microsoft login here
  }, []);

  return (
    <button className="profile-icon-button" onClick={handleMicrosoftLogin}>
      <i className="bi bi-person-fill"></i>
    </button>
  );
}
