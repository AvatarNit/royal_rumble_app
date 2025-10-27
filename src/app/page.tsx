import MentorButtons from "./components/mentorButtons";
import AdminButtons from "./components/adminButtons";
import LongButtons from "./components/longButtons";
import RedButtons from "./components/redButtons";
import GeneralButtons from "./components/generalButtons";
import InfoBox from "./components/infoBox";
import Table from "./components/table";
export default function Home() {
  return (
    <main style={{ textAlign: "center", paddingTop: "50px" }}>
      <h1>Welcome to My Next.js App!</h1>
      <p>This is my first page 🚀</p>
      <MentorButtons link="/about">Mentor button</MentorButtons>
      <RedButtons link="/about">Red button</RedButtons>
      <LongButtons link="/about">Long button</LongButtons>
      <AdminButtons link="/about">Admin home button</AdminButtons>
      <GeneralButtons link="/about">Main page button</GeneralButtons>
      <InfoBox headerText="Subheading" contentText="This is the content of the info box." />
      <Table
        headers={["Header 1", "Header 2", "Header 3"]}
        data={[
          ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
          ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"],
          ["Row 3 Col 1", "Row 3 Col 2", "Row 3 Col 3"],
        ]}
      />
    </main>
  );
}
