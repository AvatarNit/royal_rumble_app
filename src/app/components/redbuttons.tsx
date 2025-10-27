"use client";

import React from "react";
export default function RedButtons({
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
    backgroundColor: "#d10f41",
    color: "white",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    border: "none",
    borderRadius: "14px",
    padding: "40px 20px",
    width: "160px",
    height: "80px",
    textAlign: "center" as const,
    cursor: "pointer",
    transition: "all 0.3s ease",
    margin: "10px",
  };

  const buttonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "white";
    e.currentTarget.style.color = "#d10f41";
    e.currentTarget.style.border = "5px solid #d10f41";
  };

  const buttonUnhover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "#d10f41";
    e.currentTarget.style.color = "white";
    e.currentTarget.style.border = "none";
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => buttonHover(e)}
      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
        buttonUnhover(e)
      }
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
