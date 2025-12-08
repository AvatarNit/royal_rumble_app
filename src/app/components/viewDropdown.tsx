"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Modal, Button } from "react-bootstrap";
import { useAlert } from "@/app/context/AlertContext";
import { View } from "drizzle-orm";

interface ViewDropdownProps {
  editLink: string;
  deleteAction?: (id: string | number) => Promise<{ success: boolean }>;
  idIndex?: number;
  header?: string;
  sections?: { title: string; content: React.ReactNode }[]; 
}

export default function ViewDropdown({ 
  header,
  sections = [],
  editLink,
  deleteAction,
  idIndex = 0,
}: ViewDropdownProps) {
  const router = useRouter();
  const { showAlert } = useAlert();

  const [openIndices, setOpenIndices] = useState<number[]>([]);
  const [modalID, setModalID] = useState<null | string | number>(null);

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
    padding: "20px 16px",
    display: "flex",
    alignItems: "center",
    fontSize: "24px",
    justifyContent: "space-between",
  };

  const accordionHeaderStyle = {
    backgroundColor: "white",
    color: "var(--primaryBlue)",
    fontSize: "30px",
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
    border: "5px solid var(--primaryRed)",
    padding: "16px",
    margin: "15px 50px",
    height: "auto",
    color: "var(--textGrey)",
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

  const iconStyle: React.CSSProperties = {
    fontSize: "40px",
    color: "var(--primaryBlue)",
    cursor: "pointer",
    margin: "0px 3px",
    transition: "color 0.3s",
  };
  
  const hover = (e: React.MouseEvent<HTMLElement>) =>
    (e.currentTarget.style.color = "var(--primaryRed)");
  const unhover = (e: React.MouseEvent<HTMLElement>) =>
    (e.currentTarget.style.color = "var(--primaryBlue)");

  const iconContainer: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 12,
    margin: "20px 60px 10px 10px"
  };

  return (
    <div style={containerStyle}>
      {/* Top blue header */}
      {header && <div style={headerStyle}>{header}</div>}

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
              <div>
                <div
                    style={iconContainer}
                  >
                    <i
                      className="bi bi-pencil"
                      style={iconStyle}
                      onMouseEnter={hover}
                      onMouseLeave={unhover}
                      onClick={() => router.push(`${editLink}`)}
                    />
                    {/* delete */}
                    <i
                      className="bi bi-trash"
                      style={iconStyle}
                      onMouseEnter={hover}
                      onMouseLeave={unhover}
                      onClick={() => setModalID(index)}
                    />
                  </div>
                <div style={contentWrapperStyle}>
                  <div style={contentBoxStyle}>
                    <p>{section.content}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* -------- Modal OUTSIDE map (only one) -------- */}
      <Modal show={modalID !== null} onHide={() => setModalID(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this item (ID: {modalID})?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalID(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              if (deleteAction && modalID !== null) {
                const result = await deleteAction(modalID);

                if (result?.success) {
                  showAlert(
                    `Successfully deleted item with ID ${modalID}`,
                    "success"
                  );
                } else {
                  showAlert(
                    `Failed to delete item with ID ${modalID}`,
                    "danger"
                  );
                }

                setModalID(null);
                // location.reload();
                router.refresh();
              }
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}
