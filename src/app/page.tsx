import MentorButtons from "./components/mentorButtons";
export default function Home() {
  return (
    <main style={{ textAlign: "center", paddingTop: "50px" }}>
      <h1>Welcome to My Next.js App!</h1>
      <p>This is my first page 🚀</p>
      <MentorButtons link="/about">Click Me!</MentorButtons>
    </main>
  );
}
