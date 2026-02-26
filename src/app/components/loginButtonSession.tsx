"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/homepage.css";
import { useAlert } from "../context/AlertContext";

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === "true"; // also client-accessible
const TENANT_ID = process.env.NEXT_PUBLIC_MICROSOFT_ENTRA_TENANT_ID;

export default function LoginButtonSession() {
  const { data: session } = useSession();
  const router = useRouter();
  const { showAlert } = useAlert();

  const handleClick = () => {
    if (DEV_MODE) return;

    if (session) {
      if (!TENANT_ID) {
        console.error("Missing Azure TENANT_ID for logout");
        return;
      }

      showAlert("Signing out...", "info");

      const logoutUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/logout?post_logout_redirect_uri=${window.location.origin}`;
      window.location.href = logoutUrl;
    } else {
      router.push("/login");
    }
  };

  return (
    <button className="profile-icon-button" onClick={handleClick}>
      <i className="bi bi-person-fill"></i>
    </button>
  );
}
