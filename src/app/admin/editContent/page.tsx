import EditableContentBox from "../../components/editableContentBox";
import LogoButton from "../../components/logoButton";
import LoginButton from "../../components/loginButton";
import BackButton from "@/app/components/backButton";
import "../../css/admin.css";
import "../../css/logo+login.css";

export default function AdminFAQPage() {
  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Content Editor</h1>
      </header>

      <BackButton href="/admin/admin" />

      <EditableContentBox
        title="Freshmen More Details Text"
        contentKey="freshmen_more_details"
      />
      <EditableContentBox title="FAQ Content" contentKey="faq" />
      <EditableContentBox
        title="Spirit Session More Details Text"
        contentKey="spirit_session_more_details"
      />
      <EditableContentBox
        title="Utility Squad More Details Text"
        contentKey="utility_squad_more_details"
      />
      <EditableContentBox
        title="Hallway Host More Details Text"
        contentKey="hallway_host_more_details"
      />
      <EditableContentBox
        title="Group Leader More Details Text"
        contentKey="group_leader_more_details"
      />

    </main>
  );
}
