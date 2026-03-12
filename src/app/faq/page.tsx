import LogoButton from "../components/logoButton";
import LoginButton from "../components/loginButton";
import EditableContent from "../components/EditableContent";
import InfoBox from "../components/infoBox";
import ViewDropdown from "../components/viewDropdown";
import "../css/about.css";
import "../css/logo+login.css";

export default function FAQPage(){

  return (
    <main className="about-container">
      <LogoButton />
      <LoginButton />

      <header className="about-header">
        <h1 className="about-title">Frequently Asked Questions</h1>
      </header>

      <EditableContent contentKey="faq" />

      <ViewDropdown
        header="Questions and Answers"
        sections={[
          {
            title: "Question 1",
            sectionId: "q1",
            content: (
              <section className="about-info-box">
                <div
                  style={{
                    display: "flex",
                    color: "var(--textBlack)",
                    fontWeight: "normal",
                    fontSize: "20px",
                  }}
                >
                  Answer to question 1 goes here.
                </div>
              </section>
            ),
          },
          {
            title: "Question 2",
            sectionId: "q2",
            content: (
              <section className="about-info-box">
                <div
                  style={{
                    display: "flex",
                    color: "var(--textBlack)",
                    fontWeight: "normal",
                    fontSize: "20px",
                  }}
                >
                  Answer to question 2 goes here.
                </div>
              </section>
            ),
          },
          {
            title: "Question 3",
            sectionId: "q3",
            content: (
              <section className="about-info-box">
                <div
                  style={{
                    display: "flex",
                    color: "var(--textBlack)",
                    fontWeight: "normal",
                    fontSize: "20px",
                  }}
                >
                  Answer to question 3 goes here.
                </div>
              </section>
            ),
          },
        ]}
      />
    </main>
  );
}
