"use client";

import React, { useState } from "react";
import DeleteButton from "./deleteButton";
import SaveButton from "./saveButton";

export default function EditUserDropdown({
  sections = [],
}: {
  sections?: { title: string; content: React.ReactNode }[];
}) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const containerStyle = {
    border: "5px solid var(--primaryRed)",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    color: "var(--primaryBlue)",
    width: "90%",
    margin: "20px",
    backgroundColor: "white",
    overflow: "hidden",
  };

  const accordionHeaderStyle = {
    backgroundColor: "white",
    color: "var(--primaryBlue)",
    fontSize: "30px",
    borderTop: "3px solid var(--primaryRed)",
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
    border: "2px solid white",
    padding: "16px",
    margin: "10px 20px",
    height: "auto",
    color: "var(--textGrey)",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left" as const,
    overflow: "auto" as const,
  };

  const buttonRowStyle = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "16px",
    marginTop: "12px",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

      {sections.map((section, index) => {
        const isOpen = openIndices.includes(index);

        return (
          <div key={index}>
            <div
              style={accordionHeaderStyle}
              onClick={() => handleToggle(index)}
            >
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
                  {section.content}
                </div>

                <div style={buttonRowStyle}>
                  <div style={buttonContainerStyle}>
                    <DeleteButton>Delete</DeleteButton>
                  </div>
                  <div style={buttonContainerStyle}>
                    <SaveButton>Save</SaveButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}