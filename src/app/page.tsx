import MentorButtons from "./components/mentorButtons";
import AdminButtons from "./components/adminButtons";
import LongButtons from "./components/longButtons";
import DeleteButton from "./components/deleteButton";
import SaveButtons from "./components/saveButton";
import GeneralButtons from "./components/generalButtons";
import InfoBox from "./components/infoBox";
import InfoTable from "./components/infoTable";
import CheckBoxTable from "./components/checkBoxTable";
import EditTable from "./components/editTable";
import EditUserDropdown from "./components/editUserDropdown";
import ViewDropdown from "./components/viewDropdown";

export default function Home() {
  return (
    <main style={{ textAlign: "center", paddingTop: "50px" }}>
      <h1>Welcome to My Next.js App!</h1>
      <p>This is my first page 🚀</p>
      <MentorButtons link="/about">Mentor button</MentorButtons>
      <DeleteButton link="/about">delete button</DeleteButton>
      <LongButtons link="/about">Long button</LongButtons>
      <AdminButtons link="/about">Admin home button</AdminButtons>
      <SaveButtons link="/about">Save button</SaveButtons>
      <GeneralButtons link="/about">Main page button</GeneralButtons>
      <InfoBox headerText="Subheading" contentText="This is the content of the info box." />
      <EditUserDropdown
        sections={[
          {
            title: "Mentor 1",
            content: "edit user details here.",
          },
          {
            title: "Mentor 2",
            content: "edit user details here.",
          },
          {
            title: "Mentor 3",
            content: "edit user details here.",
          },
        ]}
      />
      <ViewDropdown
        sections={[
          {
            title: "Mentor 1",
            content: "view user details here.",
          },
          {
            title: "Mentor 2",
            content: "view user details here.",
          },
          {
            title: "Mentor 3",
            content: "view user details here.",
          },
        ]}
      />
      <InfoTable
        headers={["Header 1", "Header 2", "Header 3"]}
        data={[
          ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
          ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"],
          ["Row 3 Col 1", "Row 3 Col 2", "Row 3 Col 3"],
        ]}
      />
      <CheckBoxTable
        headers={["Student Name"]}
        data={[
          ["Student 1 "],
          ["Student 2"],
          ["Student 3"],
        ]}
      />
      <EditTable
        headers={["Student Name"]}
        data={[
          ["Student 1"],
          ["Student 2"],
          ["Student 3"],
        ]}
      />
    </main>
  );
}
