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

  return (
    <button
      style={containerStyle}
      onClick={() => {
        if (link) {
          window.location.href = link;
        }
      }}
    >
      <div style={leftLineStyle}></div>
      <div style={rightLineStyle}></div>
      {children}
    </button>
  );
}
