"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/homepage.css";
import { useAlert } from "../context/AlertContext";

const DEV_MODE = process.env.DEV_MODE === "true";

export default function LoginButtonSession() {
  if (!DEV_MODE) {
    const { data: session } = useSession();
    const { showAlert } = useAlert();
    const router = useRouter();

    const handleClick = async () => {
      if (session) {
        await signOut({ callbackUrl: "/" });
        showAlert(`Successfully signed out`, "success");
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
  return (
    <button className="profile-icon-button">
      <i className="bi bi-person-fill"></i>
    </button>
  );
}
