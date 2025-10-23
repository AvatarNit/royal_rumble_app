"use client";

import React from "react";
export default function MentorButtons({
  children,
  link = "#",
}: {
  children: React.ReactNode;
  link?: string;
}) {
  const buttonStyle = {
    backgroundColor: "#01539c",
    color: "white",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    border: "none",
    borderRadius: "14px",
    padding: "40px 20px",
    width: "160px",
    textAlign: "center" as const,
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const buttonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "#d10f41";
  };

  const buttonUnhover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "#01539c";
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
