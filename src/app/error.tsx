"use client";

import { useEffect } from "react";
import LogoButton from "./components/logoButton";
import LoginButton from "./components/loginButton";
import BackButton from "./components/backButton";
import "./css/admin.css";
import "./css/logo+login.css";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          marginTop: "120px",
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
          500
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
          Something Went Wrong
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
          An unexpected error occurred. Please try again — if the problem
          persists, contact an administrator.
        </p>

        {error?.message && (
          <div
            style={{
              marginTop: "10px",
              backgroundColor: "#f8f8f8",
              border: "3px solid var(--primaryRed)",
              borderRadius: "8px",
              padding: "16px 24px",
              maxWidth: "600px",
              width: "100%",
              textAlign: "left",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "var(--primaryRed)",
                margin: "0 0 6px 0",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Error Details
            </p>
            <p
              style={{
                fontSize: "16px",
                color: "var(--textBlack)",
                fontFamily: "monospace",
                margin: 0,
                wordBreak: "break-word",
              }}
            >
              {error.message}
            </p>
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          <BackButton href="/" />
        </div>
      </div>
    </main>
  );
}
