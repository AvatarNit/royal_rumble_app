"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/homepage.css";
import { auth } from "@/auth";

export default async function LoginButton() {
  const session = await auth();
  const router = useRouter();

  const handleClick = async () => {
    if (session) {
      await signOut({ callbackUrl: "/" }); // log out if logged in
    } else {
      router.push("/login"); // go to login page if not logged in
    }
  };

  return (
    <button className="profile-icon-button" onClick={handleClick}>
      <i className="bi bi-person-fill"></i>
    </button>
  );
}
