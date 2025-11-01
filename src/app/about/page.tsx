import LogoButton from "../components/logoButton";
import LoginButton from "../components/loginButton";
import InfoBox from "../components/infoBox";
import "../css/about.css";
import "../css/logo+login.css";

export default function AboutPage() {

  return (
     <main className="about-container">
      <LogoButton />
      <LoginButton />

      <header className="about-header">
        <h1 className="about-title">What is Royal Rumble?</h1>
      </header>

      <section className="about-info-box">
         <InfoBox headerText="Things to Know">
          <div style={{ color: "var(--textGrey)", fontWeight: "normal", fontSize: "16px" }}>
            Royal Rumble is Hamilton Southeastern's freshman orientation
            event. The goal of this event is to introduce incoming students to the
            school layout and spirit.
          </div>
        </InfoBox>
      </section>
    </main>
  );
}
