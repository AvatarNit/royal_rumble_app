import EditableContentBox from "../../components/editableContentBox";

export default function AdminFAQPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>Admin Content Editor</h1>

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
    </div>
  );
}
