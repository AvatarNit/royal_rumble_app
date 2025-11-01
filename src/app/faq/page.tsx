import LogoButton from "../components/logoButton";
import LoginButton from "../components/loginButton";
import InfoBox from "../components/infoBox";
import "../css/about.css";
import "../css/logo+login.css";

export default function FAQPage() {

  return (
     <main className="about-container">
      <LogoButton />
      <LoginButton />

      <header className="about-header">
        <h1 className="about-title">Frequently Asked Questions</h1>
      </header>

      <section className="about-info-box">
        <InfoBox headerText="Question 1">
          <div style={{ color: "var(--textGrey)", fontWeight: "normal", fontSize: "16px" }}>
            Answer to question 1 goes here.
          </div>
        </InfoBox>
      </section>
      <section className="about-info-box">
        <InfoBox headerText="Question 2">
          <div style={{ color: "var(--textGrey)", fontWeight: "normal", fontSize: "16px" }}>
            Answer to question 2 goes here.
          </div>
        </InfoBox>
      </section>
      <section className="about-info-box">
        <InfoBox headerText="Question 3">
          <div style={{ color: "var(--textGrey)", fontWeight: "normal", fontSize: "16px" }}>
            Answer to question 3 goes here.
          </div>
        </InfoBox>
      </section>
    </main>
  );
}
