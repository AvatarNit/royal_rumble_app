"use client";

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
  const { data: session } = useSession();
  const router = useRouter();
  const { showAlert } = useAlert();

  const handleClick = () => {
    if (DEV_MODE) return;

    if (session) {
      // --- Sign out ---
      if (!TENANT_ID) {
        console.error("Missing Azure TENANT_ID for logout");
        return;
      }

      showAlert("Signing out...", "info");

      const logoutUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/logout?post_logout_redirect_uri=${window.location.origin}`;
      window.open(logoutUrl, "_blank");
      router.push("/");
    } else {
      // --- Sign in: trigger Microsoft login directly ---
      const job = session ? (session as any)?.user?.job : null;
      console.log("User job:", job);

      if (job && JOB_ROUTES[job]) {
        console.log(`Redirecting to ${JOB_ROUTES[job]} for job: ${job}`);
        router.push(JOB_ROUTES[job]);
      } else {
        signIn("microsoft-entra-id");
      }
    }
  };

  return (
    <button className="profile-icon-button" onClick={handleClick}>
      <i className="bi bi-person-fill"></i>
    </button>
  );
}
