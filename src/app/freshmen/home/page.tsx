import LogoButton from "../../components/logoButton";
import LoginButton from "../../components/loginButton";
import InfoBox from "../../components/infoBox";
import "../../css/freshmen.css";
import "../../css/logo+login.css";

export default function FreshmenHomepage() {

  return (
     <main className="freshmen-container">
      <LogoButton />
      <LoginButton />

      <header className="freshmen-header">
        <h1 className="freshmen-title">Welcome, Freshman Name!</h1>
        <h3 className="check-registration">You have successfully been registered for Royal Rumble.</h3>
      </header>

      <section className="freshmen-info-box">
        <InfoBox headerText="Event Information">
          <div  style={{
                        display: "flex",      
                        color: "var(--primaryBlue)",
                        fontWeight: "bold",
                        fontSize: "30px",
                        gap: "10px"       
          }}>
            <div>
              Group #:
            </div>
            <div style={{ color: "var(--textGrey)", fontWeight: "normal",}}>
              1
            </div>
          </div>
          <div style={{ color: "var(--primaryBlue)", fontWeight: "bold",
                        fontSize: "30px", margin: "20px 0px" }}>
            General Information:
          </div>
          <div style={{ color: "var(--textGrey)", fontWeight: "normal",
                        fontSize: "20px", margin: "5px 0px 10px" }}>
            General info about this group goes here.
          </div>
        </InfoBox>
      </section>
    </main>
  );
}
