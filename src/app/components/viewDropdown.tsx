"use client";

import React, { useState } from "react";

export default function ViewDropdown({
  sections = [
    { title: "Mentor 1", content: "view user details here." },
    { title: "Mentor 2", content: "example text" },
    { title: "Mentor 3", content: "example text" },
  ],
}: {
  sections?: { title: string; content: string }[];
}) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const containerStyle = {
    border: "5px solid #01539c",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    color: "#01539c",
    width: "800px",
    margin: "20px auto",
    backgroundColor: "white",
    overflow: "hidden",
  };

  const headerStyle = {
    backgroundColor: "#01539c",
    color: "white",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const accordionHeaderStyle = {
    backgroundColor: "white",
    color: "#01539c",
    fontSize: "18px",
    borderTop: "2px solid #01539c",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
  };

  const contentWrapperStyle = {
    padding: "16px",
    backgroundColor: "white",
    borderTop: "none",
  };

  const contentBoxStyle = {
    border: "2px solid #d10f41",
    padding: "16px",
    marginBottom: "16px",
    height: "200px",
    color: "#8a8d8f",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left" as const,
    overflow: "auto" as const,
  };

  const arrowBase = {
    border: "solid gray",
    borderWidth: "0 3px 3px 0",
    display: "inline-block",
    padding: "5px",
    transition: "transform 0.2s",
  };

  const handleToggle = (index: number) => {
    setOpenIndices((prevOpen) =>
      prevOpen.includes(index)
        ? prevOpen.filter((i) => i !== index)
        : [...prevOpen, index]
    );
  };

  return (
    <div style={containerStyle}>
      {/* Top blue header */}
      <div style={headerStyle}>
        <span>View Mentors</span>
      </div>

      {/* Accordion Sections */}
      {sections.map((section, index) => {
        const isOpen = openIndices.includes(index);

        return (
          <div key={index}>
            <div style={accordionHeaderStyle} onClick={() => handleToggle(index)}>
              <span>{section.title}</span>
              <i
                style={{
                  ...arrowBase,
                  transform: isOpen ? "rotate(-135deg)" : "rotate(45deg)",
                }}
              ></i>
            </div>

            {isOpen && (
              <div style={contentWrapperStyle}>
                <div style={contentBoxStyle}>
                  <p>{section.content}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
