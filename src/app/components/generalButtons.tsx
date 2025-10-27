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
    border: "10px solid #01539c",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#01539c",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    fontSize: "24px",
    padding: "40px 20px",
    width: "300px",
    height: "200px",
    position: "relative" as const,
    textAlign: "center" as const,
    textDecoration: "none",
  };

  const redLineStyle = {
    position: "absolute" as const,
    top: "10%",
    bottom: "10%",
    width: "10px",
    backgroundColor: "#d10f41",
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
