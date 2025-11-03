"use client";

import React from "react";
export default function AdminButtons({
  children,
  link = "#",
}: {
  children: React.ReactNode;
  link?: string;
}) {
  const buttonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--primaryBlue)",
    color: "white",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    fontSize: "2rem",
    border: "10px solid transparent",
    borderRadius: "14px",
    padding: "40px 20px",
    width: "240px",
    height: "160px",
    textAlign: "center" as const,
    cursor: "pointer",
    transition: "background-color 0.3s",
    margin: "5px 20px"
  };

  const buttonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "white";
    e.currentTarget.style.color = "var(--primaryBlue)";
    e.currentTarget.style.borderColor = "var(--primaryBlue)";
  };

  const buttonUnhover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "var(--primaryBlue)";
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
