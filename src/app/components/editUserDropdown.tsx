"use client";

import React, { useState } from "react";
import DeleteButton from "./deleteButton";
import SaveButton from "./saveButton";

export default function EditUserDropdown({
  sections = [
    { title: "Mentor 1", content: "edit user details here." },
    { title: "Mentor 2", content: "example text" },
    { title: "Mentor 3", content: "example text" },
  ],
}: {
  sections?: { title: string; content: string }[];
}) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const containerStyle = {
    border: "5px solid var(--primaryBlue)",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    color: "var(--primaryBlue)",
    width: "85%",
    margin: "20px auto",
    backgroundColor: "white",
    overflow: "hidden",
  };

  const headerStyle = {
    backgroundColor: "var(--primaryBlue)",
    color: "white",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const accordionHeaderStyle = {
    backgroundColor: "white",
    color: "var(--primaryBlue)",
    fontSize: "18px",
    borderTop: "2px solid var(--primaryBlue)",
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
    border: "2px solid var(--primaryRed)",
    padding: "16px",
    marginBottom: "16px",
    height: "200px",
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
      <div style={headerStyle}>
        <span>Edit Admin</span>
      </div>

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
                  <p>{section.content}</p>
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