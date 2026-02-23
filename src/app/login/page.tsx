import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();

  // If already logged in, send them where they belong
  if (session?.user?.job) {
    switch (session.user.job) {
      case "FRESHMAN":
        redirect("/freshmen/home");

      case "ADMIN":
        redirect("/admin");

      case "GROUP LEADER":
        redirect("/mentor/group_leader");

      case "HALLWAY HOST":
        redirect("/mentor/hallway_host");

      case "UTILITY SQUAD":
        redirect("/mentor/utility_squad");

      case "SPIRIT SESSION":
        redirect("/mentor/spirit_session");
    }
  }

  // If not logged in, show Microsoft login button
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signIn("microsoft-entra-id");
        }}
      >
        <button type="submit">Sign in with Microsoft</button>
      </form>
    </div>
  );
}
