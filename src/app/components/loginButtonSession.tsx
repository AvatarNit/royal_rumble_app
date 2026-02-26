"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/homepage.css";
import { useAlert } from "../context/AlertContext";

const DEV_MODE = process.env.DEV_MODE === "true";
const TENANT_ID = process.env.AUTH_MICROSOFT_ENTRA_TENANT_ID;

export default function LoginButtonSession() {
  const { data: session } = useSession();
  const router = useRouter();
  const { showAlert } = useAlert();

  const handleClick = () => {
    if (DEV_MODE) return; // do nothing in dev

    if (session) {
      // Full Microsoft logout
      if (!TENANT_ID) {
        console.error("Missing Azure TENANT_ID for logout");
        return;
      }

      // Optional: show alert before redirect (won’t persist after reload)
      showAlert("Signing out...", "info");

      // Redirect to Microsoft logout endpoint
      const logoutUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/logout?post_logout_redirect_uri=${window.location.origin}`;
      window.location.href = logoutUrl;
    } else {
      // Not logged in → go to your custom login page
      router.push("/login");
    }
  };

  return (
    <button className="profile-icon-button" onClick={handleClick}>
      <i className="bi bi-person-fill"></i>
    </button>
  );
}
