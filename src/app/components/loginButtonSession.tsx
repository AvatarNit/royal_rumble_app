"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/homepage.css";
import { useAlert } from "../context/AlertContext";

const DEV_MODE = process.env.DEV_MODE === "true";

export default function LoginButtonSession() {
  const { data: session } = useSession();
  const { showAlert } = useAlert();
  const router = useRouter();

  const handleClick = async () => {
    if (DEV_MODE) return; // do nothing in dev mode

    if (session) {
      // Log out
      await signOut({ redirect: false }); // prevent auto redirect
      showAlert("Successfully signed out", "success");
      router.push("/"); // navigate home after logout
    } else {
      // Go to your custom login page
      router.push("/login");
    }
  };

  return (
    <button className="profile-icon-button" onClick={handleClick}>
      <i className="bi bi-person-fill"></i>
    </button>
  );
}
