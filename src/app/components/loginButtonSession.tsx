"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/homepage.css";
import { useEffect } from "react";
import { useAlert } from "../context/AlertContext";

const DEV_MODE = process.env.DEV_MODE === "true";

export default function LoginButtonSession() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showAlert } = useAlert();

  // Show post-logout alert if redirected with ?signedOut=true
  useEffect(() => {
    if (searchParams.get("signedOut")) {
      showAlert("Successfully signed out", "success");
    }
  }, [searchParams, showAlert]);

  const handleClick = async () => {
    if (DEV_MODE) return; // do nothing in dev mode

    if (session) {
      // Full logout: clears NextAuth + Microsoft Entra session
      // Redirects to /?signedOut=true so we can show an alert after reload
      await signOut({ redirect: true, callbackUrl: "/?signedOut=true" });
    } else {
      // Go to your custom login page for special logic
      router.push("/login");
    }
  };

  return (
    <button className="profile-icon-button" onClick={handleClick}>
      <i className="bi bi-person-fill"></i>
    </button>
  );
}
