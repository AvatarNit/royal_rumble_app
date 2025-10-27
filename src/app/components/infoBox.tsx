"use client";

import React from "react";

export default function InfoBox({
  headerText,
  contentText,
}: {
  headerText: string;
  contentText: string;
}) {
    const containerStyle = {
    width: "700px",
    margin: "20px",
  };

  const headerStyle = {
    backgroundColor: "#01539c",
    color: "white",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    fontSize: "24px",
    padding: "0 20px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  };

  const contentStyle = {
    backgroundColor: "white",
    border: "3px solid #d10f41",
    color: "#01539c",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "10px 20px",
    textAlign: "left" as const, 
    height: "300px",
    display: "flex",
    justifyContent: "flex-start",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>{headerText}</div>
      <div style={contentStyle}>{contentText}</div>
    </div>
  );
}
