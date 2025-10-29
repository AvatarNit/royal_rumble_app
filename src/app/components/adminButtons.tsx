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
    backgroundColor: "#01539c",
    color: "white",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    border: "5px solid transparent",
    borderRadius: "14px",
    padding: "40px 20px",
    width: "200px",
    height: "120px",
    textAlign: "center" as const,
    cursor: "pointer",
    transition: "background-color 0.3s",
    margin: "10px",
  };

  const buttonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.backgroundColor = "white";
      e.currentTarget.style.color = "#01539c";
      e.currentTarget.style.borderColor = "#01539c";
    };
  
  const buttonUnhover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "#01539c";
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
