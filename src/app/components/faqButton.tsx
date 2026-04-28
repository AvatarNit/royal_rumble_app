"use client";

import React from "react";
export default function GeneralButtons({
  children,
  link = "#",
}: {
  children: React.ReactNode;
  link?: string;
}) {

  const containerStyle = {
    backgroundColor: "white",
    border: "8px solid var(--primaryBlue)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--primaryBlue)",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    fontSize: "40px",
    width: "900px",
    height: "150px",
    position: "relative" as const,
    textAlign: "center" as const,
    textDecoration: "none",
    marginTop: "100px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const redLineStyle = {
    position: "absolute" as const,
    top: "10%",
    bottom: "10%",
    width: "10px",
    backgroundColor: "var(--primaryRed)",
  };

  const leftLineStyle = { ...redLineStyle, left: "10px" };
  const rightLineStyle = { ...redLineStyle, right: "10px" };

  const buttonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "var(--primaryBlue)";
    e.currentTarget.style.color = "white";
    e.currentTarget.style.borderColor = "var(--primaryBlue)";
  };

  const buttonUnhover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "white";
    e.currentTarget.style.color = "var(--primaryBlue)";
    e.currentTarget.style.borderColor = "var(--primaryBlue)";
  };

  return (
    <button
      style={containerStyle}
      onClick={() => {
        if (link) {
          window.location.href = link;
        }
      }}
      onMouseEnter={buttonHover}
      onMouseLeave={buttonUnhover}
    >
      <div style={leftLineStyle}></div>
      <div style={rightLineStyle}></div>
      {children}
    </button>
  );
}
