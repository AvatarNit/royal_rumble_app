"use client";

import React from "react";

export default function DeleteButton({
  children,
  link = "#",
}: {
  children: React.ReactNode;
  link?: string;
}) {
  const buttonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--primaryRed)",
    color: "white",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    border: "5px solid transparent",
    borderRadius: "14px",
    padding: "20px 20px",
    width: "100px",
    height: "40px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    margin: "10px",
    boxSizing: "border-box",
  };

  const buttonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "white";
    e.currentTarget.style.color = "var(--primaryRed)";
    e.currentTarget.style.borderColor = "var(--primaryRed)";
  };

  const buttonUnhover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "var(--primaryRed)";
    e.currentTarget.style.color = "white";
    e.currentTarget.style.borderColor = "transparent";
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={buttonHover}
      onMouseLeave={buttonUnhover}
      onClick={() => {
        if (link) {
          window.location.href = link;
        }
      }}
    >
      {children}
    </button>
  );
}
