"use client";

import { useCallback } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/homepage.css";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <button className="profile-icon-button">
      <a href="/login">
        <i className="bi bi-person-fill"></i>
      </a>
    </button>
  );
}
