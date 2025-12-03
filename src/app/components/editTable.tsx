"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Modal, Button } from "react-bootstrap";

interface EditTableProps {
  headers: string[];
  data: any[];
  editLink: string;
  deleteAction: (id: string | number) => Promise<{ success: boolean }>;
  idIndex?: number;
  visibleColumns: number[];
}

export default function EditTable({
  headers,
  data,
  editLink,
  deleteAction,
  idIndex = 0,
  visibleColumns,
}: EditTableProps) {
  const router = useRouter();

  // ✔ One modal state instead of a hook per row
  const [modalID, setModalID] = useState<null | string | number>(null);

  const colCount = visibleColumns.length + 1;

  const tableContainerStyle: React.CSSProperties = {
    borderCollapse: "collapse",
    width: "100%",
    height: "300px",
    border: "4px solid var(--primaryBlue)",
    fontFamily: "Poppins, sans-serif",
  };

  const headerCellStyle: React.CSSProperties = {
    backgroundColor: "var(--primaryBlue)",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: "12px",
    border: "2px solid var(--primaryBlue)",
  };

  const cellStyle: React.CSSProperties = {
    backgroundColor: "white",
    color: "var(--textGrey)",
    textAlign: "center",
    padding: "20px 4px",
    border: "2px solid var(--primaryBlue)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
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

  return (
    <>
      <table style={tableContainerStyle}>
        <colgroup>
          {Array.from({ length: colCount }).map((_, i) => (
            <col
              key={i}
              style={{
                width: i === colCount - 1 ? "15%" : `${85 / (colCount - 1)}%`,
              }}
            />
          ))}
        </colgroup>

        <thead>
          <tr>
            {visibleColumns.map((colIndex) => (
              <th key={colIndex} style={headerCellStyle}>
                {headers[colIndex]}
              </th>
            ))}
            <th style={headerCellStyle}></th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => {
            const id = row[idIndex];

            return (
              <tr key={rowIndex}>
                {visibleColumns.map((ci) => (
                  <td key={ci} style={cellStyle} title={String(row[ci] ?? "")}>
                    {row[ci]}
                  </td>
                ))}

                <td style={cellStyle}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <i
                      className="bi bi-pencil"
                      style={iconStyle}
                      onMouseEnter={hover}
                      onMouseLeave={unhover}
                      onClick={() => router.push(`${editLink}/${id}`)}
                    />

                    <i
                      className="bi bi-trash"
                      style={iconStyle}
                      onMouseEnter={hover}
                      onMouseLeave={unhover}
                      onClick={() => setModalID(id)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* -------- Modal OUTSIDE map (only one) -------- */}
      <Modal show={modalID !== null} onHide={() => setModalID(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Row</Modal.Title>
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
                  alert(`Successfully deleted item with ID ${modalID}`);
                }

                setModalID(null);
                location.reload();
              }
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
