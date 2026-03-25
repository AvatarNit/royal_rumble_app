"use client";
import { useState } from "react";

import React from "react";
import SaveButton from "./saveButton";
import AddButton from "./addButton";

export default function ModalStyle({
  children,
  title = "Modal Title",
  saveAction = () => {},
  addBtnText = "",
  btnText = "",
}: {
  children: React.ReactNode;
  title?: string;
  btnText?: string;
  saveAction?: () => void;
  addBtnText?: string;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <AddButton
        onClick={() => setShowModal(true)}
        style={{ fontSize: "21px", justifyContent: "flex-end" }}
      >
        {btnText || ""}
        <i
          className="bi bi-question-circle"
          style={{ marginLeft: "30px", fontSize: "30px" }}
        />
      </AddButton>
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              border: "5px solid var(--primaryBlue)",
              fontFamily: "Poppins, sans-serif",
              backgroundColor: "white",
              overflow: "hidden",
              width: "75%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* header */}
            <div
              style={{
                backgroundColor: "var(--primaryBlue)",
                color: "white",
                padding: "20px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              <span>{title}</span>
              <i
                className="bi bi-x-lg"
                style={{ cursor: "pointer", fontSize: "22px" }}
                onClick={() => setShowModal(false)}
              />
            </div>

            {/* Content */}
            <div style={{ padding: "16px" }}>
              <div
                style={{
                  border: "5px solid var(--primaryRed)",
                  padding: "16px",
                  margin: "15px 30px",
                  backgroundColor: "white",
                  color: "var(--textBlack)",
                }}
              >
                {children}
              </div>

              {/* Footer buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  padding: "0 30px 10px",
                  gap: "8px",
                }}
              >
                <SaveButton
                  onClick={() => {
                    setShowModal(false);
                  }}
                  style={{
                    width: "150px",
                    fontSize: "20px",
                    height: "55px",
                    backgroundColor: "var(--primaryRed)",
                  }}
                >
                  Cancel
                </SaveButton>
                {addBtnText != "" && saveAction && (
                  <SaveButton
                    onClick={() => {
                      saveAction();
                      setShowModal(false);
                    }}
                    style={{ width: "150px", fontSize: "20px", height: "55px" }}
                  >
                    {addBtnText}
                  </SaveButton>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
