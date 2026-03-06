"use client";

import { useEffect, useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/homepage.css";
import { useAlert } from "../context/AlertContext";

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === "true";
const TENANT_ID = process.env.NEXT_PUBLIC_MICROSOFT_ENTRA_TENANT_ID;

const JOB_ROUTES: Record<string, string> = {
  FRESHMAN: "/freshmen/home",
  ADMIN: "/admin",
  "GROUP LEADER": "/mentor/group_leader",
  "HALLWAY HOST": "/mentor/hallway_host",
  "UTILITY SQUAD": "/mentor/utility_squad",
  "SPIRIT SESSION": "/mentor/spirit_session",
};

export default function LoginButtonSession() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { showAlert } = useAlert();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hasRedirected = useRef(false);

  // Redirect once after login
  useEffect(() => {
    if (status === "loading") return;
    if (
      status === "authenticated" &&
      session?.user?.job &&
      !hasRedirected.current
    ) {
      const route = JOB_ROUTES[session.user.job];
      if (route) {
        hasRedirected.current = true;
        router.push(route);
      }
    }
  }, [status, session]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen)
      document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [dropdownOpen]);

  const handleLogout = () => {
    if (!TENANT_ID) {
      console.error("Missing Azure TENANT_ID for logout");
      return;
    }
    setDropdownOpen(false);
    showAlert("Signing out...", "info");
    const logoutUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/logout?post_logout_redirect_uri=${window.location.origin}`;
    window.open(logoutUrl, "_blank");
    router.push("/");
  };

  const handleClick = () => {
    if (DEV_MODE) return;

    if (session) {
      setDropdownOpen((prev) => !prev);
    } else {
      signIn("microsoft-entra-id");
    }
  };

  if (session) {
    return (
      <div
        ref={dropdownRef}
        style={{ position: "fixed", top: "20px", right: "20px", zIndex: 100 }}
      >
        <button
          className="profile-icon-button"
          onClick={handleClick}
          style={{ position: "static" }}
        >
          <i className="bi bi-person-fill"></i>
        </button>
        <ul
          className={`dropdown-menu dropdown-menu-end${dropdownOpen ? " show" : ""}`}
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            marginTop: "0.25rem",
          }}
        >
          <li>
            <button
              className="dropdown-item text-danger"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-2"></i>Log Out
            </button>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <button className="profile-icon-button" onClick={handleClick}>
      <i className="bi bi-person-fill"></i>
    </button>
  );
}
