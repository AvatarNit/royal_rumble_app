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
    </div>
  );
}
