"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Modal, Button } from "react-bootstrap";
import { useAlert } from "@/app/context/AlertContext";
import ExportToExcelButton from "./ExportToExcelButton";

interface EditTableProps {
  headers: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  editLink: string;
  deleteAction: (id: string | number) => Promise<{ success: boolean }>;
  idIndex?: number;
  visibleColumns: number[];
  fileName?: string;
}

export default function EditTable({
  headers,
  data,
  editLink,
  deleteAction,
  idIndex = 0,
  visibleColumns,
  fileName,
}: EditTableProps) {
  const router = useRouter();
  const { showAlert } = useAlert();

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
    color: "var(--textBlack)",
    textAlign: "left",
    padding: "12px",
    border: "2px solid var(--primaryBlue)",
    whiteSpace: "normal",
    overflowWrap: "break-word",
    wordBreak: "normal",
    fontSize: "20px",
    lineHeight: "1.3",
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

   const buttonStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--primaryBlue)",
      color: "white",
      fontFamily: "Poppins, sans-serif",
      fontWeight: "bold",
      fontSize: "15px",
      border: "5px solid transparent",
      borderRadius: "14px",
      padding: "5px 5px",
      textAlign: "center" as const,
      cursor: "pointer",
      transition: "background-color 0.3s",
      width: "100px"
    };
  
    const buttonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.backgroundColor = "white";
      e.currentTarget.style.color = "var(--primaryBlue)";
      e.currentTarget.style.borderColor = "var(--primaryBlue)";
    };
  
    const buttonUnhover = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.backgroundColor = "var(--primaryBlue)";
      e.currentTarget.style.color = "white";
      e.currentTarget.style.borderColor = "transparent";
    };
  
    const buttonStyle2 = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--primaryRed)",
      color: "white",
      fontFamily: "Poppins, sans-serif",
      fontWeight: "bold",
      fontSize: "15px",
      border: "5px solid transparent",
      borderRadius: "14px",
      padding: "5px 5px",
      textAlign: "center" as const,
      cursor: "pointer",
      transition: "background-color 0.3s",
      width: "100px"
    };
  
    const buttonHover2 = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.backgroundColor = "white";
      e.currentTarget.style.color = "var(--primaryRed)";
      e.currentTarget.style.borderColor = "var(--primaryRed)";
    };
  
    const buttonUnhover2 = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.backgroundColor = "var(--primaryRed)";
      e.currentTarget.style.color = "white";
      e.currentTarget.style.borderColor = "transparent";
    };

  return (
    <div>
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
            <th style={headerCellStyle}>
              {fileName ? (
                <ExportToExcelButton
                  headers={headers}
                  data={data}
                  fileName={fileName}
                />
              ) : (
                ""
              )}
            </th>
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
                    {/* delete */}
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
        <Modal.Header
          style={{ backgroundColor: "var(--primaryBlue)", color: "white",
            fontFamily: "Poppins, sans-serif", fontWeight: "bold",
            fontSize: "15px", justifyContent:"space-between"}}
        >
          <Modal.Title style={{ color: "white",fontFamily: "Poppins, sans-serif",
                                fontWeight: "bold", fontSize: "20px" }}>
            Delete Row
          </Modal.Title>
          <i className="bi bi-x-lg" data-bs-dismiss="modal" 
            style={{fontSize:"22px", cursor: "pointer"}}
            onClick={() => setModalID(null)} 
          />
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this item (ID: {modalID})?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalID(null)}
                  style={buttonStyle}
                  onMouseEnter={buttonHover}
                  onMouseLeave={buttonUnhover2}>
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
                    "success",
                  );
                } else {
                  showAlert(
                    `Failed to delete item with ID ${modalID}`,
                    "danger",
                  );
                }

                setModalID(null);
                // location.reload();
                router.refresh();
              }
            }}
            style={buttonStyle2}
                  onMouseEnter={buttonHover2}
                  onMouseLeave={buttonUnhover2}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
