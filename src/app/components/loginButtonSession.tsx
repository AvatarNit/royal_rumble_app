"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/homepage.css";
import { useAlert } from "../context/AlertContext";

export default function LoginButtonSession() {
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
