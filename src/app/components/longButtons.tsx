"use client";

import React from "react";
export default function LongButtons({
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
    backgroundColor: "#01539c",
    color: "white",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    border: "none",
    borderRadius: "14px",
    padding: "10px 40px",
    width: "160px",
    textAlign: "center" as const,
    cursor: "pointer",
    transition: "background-color 0.3s",
    margin: "10px",
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
