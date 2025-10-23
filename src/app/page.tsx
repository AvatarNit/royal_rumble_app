import MentorButtons from "./components/mentorButtons";
import AdminButtons from "./components/adminButtons";
import LongButtons from "./components/longButtons";
import RedButtons from "./components/redButtons";
export default function Home() {
  return (
    <main style={{ textAlign: "center", paddingTop: "50px" }}>
      <h1>Welcome to My Next.js App!</h1>
      <p>This is my first page 🚀</p>
      <MentorButtons link="/about">Click Me!</MentorButtons>
      <RedButtons link="/about">Click Me!</RedButtons>
      <LongButtons link="/about">Click Me!</LongButtons>
      <AdminButtons link="/about">Click Me!</AdminButtons>
    </main>
  );
}
