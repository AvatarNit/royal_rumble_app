import LogoButton from "../components/logoButton";
import LoginButton from "../components/loginButton";
import ViewDropdown from "../components/viewDropdown";
import { getFAQContent } from "@/src/actions/other";
import "../css/about.css";
import "../css/logo+login.css";

export default async function FAQPage() {
  const faqData = await getFAQContent();

  return (
    <main className="about-container">
      <LogoButton />
      <LoginButton />

      <header className="about-header">
        <h1 className="about-title">Frequently Asked Questions</h1>
      </header>

      <ViewDropdown
        header="Questions and Answers"
        sections={faqData.map((item) => ({
          title: item.question,
          sectionId: `q${item.id}`,
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
                {item.answer}
              </div>
            </section>
          ),
        }))}
      />
    </main>
  );
}
