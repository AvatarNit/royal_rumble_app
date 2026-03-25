import LogoButton from "./components/logoButton";
import LoginButton from "./components/loginButton";
import BackButton from "./components/backButton";
import "./css/admin.css";
import "./css/logo+login.css";

export default function NotFound() {
  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <div style={{ marginTop: "20px" }}>
        <BackButton href="/" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          marginTop: "1%",
          gap: "20px",
          fontFamily: "Poppins, sans-serif",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "120px",
            fontWeight: "bold",
            color: "var(--primaryBlue)",
            lineHeight: 1,
            margin: 0,
          }}
        >
          404
        </h1>

        <div
          style={{
            width: "80px",
            height: "6px",
            backgroundColor: "var(--primaryRed)",
            borderRadius: "3px",
          }}
        />

        <h2
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "var(--primaryBlue)",
            margin: 0,
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            fontSize: "20px",
            color: "var(--textBlack)",
            fontWeight: "normal",
            maxWidth: "500px",
            margin: 0,
          }}
        >
          The page you are looking for does not exist or may have been moved.
        </p>
      </div>
    </main>
  );
}
