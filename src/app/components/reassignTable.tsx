"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Modal, Button } from "react-bootstrap";
import SaveButton from "@/app/components/saveButton";
import { useAlert } from "@/app/context/AlertContext";

interface ReassignTableProps {
  headers: string[];
  data: any[];
  deleteAction?: (id: string | number) => Promise<{ success: boolean }>;
  idIndex?: number;
  visibleColumns: number[];
  reassignAction?: (
    id: string | number,
    newGroupId: string | number,
  ) => Promise<{ success: boolean }>;
  currentGroupId: string | number;
  possibleGroups: Array<{ group_id: string; name?: string }>;
}
export default function ReassignTable({
  headers,
  data,
  deleteAction,
  idIndex = 0,
  visibleColumns,
  reassignAction,
  currentGroupId,
  possibleGroups,
}: ReassignTableProps) {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [deleteModalID, setDeleteModalID] = useState<null | string | number>(
    null,
  );
  const [reassignModalID, setReassignModalID] = useState<
    null | string | number
  >(null);
  const [newGroupId, setNewGroupId] = useState<string | number>("");

  useEffect(() => {
    if (reassignModalID !== null) {
      setNewGroupId(currentGroupId);
    }
  }, [reassignModalID, currentGroupId]);

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
                    <SaveButton
                      onClick={() => setReassignModalID(id)}
                      style={{
                        width: "120px",
                        fontSize: "16px",
                        padding: "10px",
                      }}
                    >
                      Reassign
                    </SaveButton>

                    {/* delete */}
                    <i
                      className="bi bi-trash"
                      style={iconStyle}
                      onMouseEnter={hover}
                      onMouseLeave={unhover}
                      onClick={() => setDeleteModalID(id)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* -------- Delete Modal-------- */}
      <Modal show={deleteModalID !== null} onHide={() => setDeleteModalID(null)}>
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
            onClick={() => setDeleteModalID(null)} 
          />
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this item (ID: {deleteModalID})?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModalID(null)}
                  style={buttonStyle}
                  onMouseEnter={buttonHover}
                  onMouseLeave={buttonUnhover2}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              if (deleteAction && deleteModalID !== null) {
                const result = await deleteAction(deleteModalID);

                if (result?.success) {
                  showAlert(
                    `Successfully deleted item with ID ${deleteModalID}`,
                    "success",
                  );
                } else {
                  showAlert(
                    `Failed to delete item with ID ${deleteModalID}`,
                    "danger",
                  );
                }

                setDeleteModalID(null);
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
      {/* -------- Reassign Modal -------- */}
      <Modal show={reassignModalID !== null} onHide={() => setReassignModalID(null)}>
        <Modal.Header
          style={{ backgroundColor: "var(--primaryBlue)", color: "white",
            fontFamily: "Poppins, sans-serif", fontWeight: "bold",
            fontSize: "15px", justifyContent:"space-between"}}
        >
          <Modal.Title style={{ color: "white",fontFamily: "Poppins, sans-serif",
                                fontWeight: "bold", fontSize: "20px" }}>
            Reassign Student
          </Modal.Title>
          <i className="bi bi-x-lg" data-bs-dismiss="modal" 
            style={{fontSize:"22px", cursor: "pointer"}}
            onClick={() => setReassignModalID(null)} 
          />
        </Modal.Header>
        <Modal.Body>
          <label className="form-label" 
                 style = {{fontSize: "23px", fontWeight: "bold", width: "100%", marginBottom: "40px"}}
          >
            What do you want to reassign {reassignModalID} to?
          </label>
          <div className="form-row">
            <label className="form-label"
                   style = {{fontSize: "23px", fontWeight: "bold", width: "100%",
                   marginBottom: "20px"}}>
              New Group:
            </label>
          </div>
          <select
            className = "form-select"
            value = {newGroupId}
            style = {{marginBottom: "40px"}}
            onChange={(e) => setNewGroupId(e.target.value)}
          >
            <option value="unassigned">Unassigned</option>
            {possibleGroups.map((group) => (
              <option key={group.group_id} value={group.group_id}>
                {group.name ? group.name : group.group_id}
              </option>
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setReassignModalID(null)}
                  style={buttonStyle}
                  onMouseEnter={buttonHover}
                  onMouseLeave={buttonUnhover}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              if (reassignAction && reassignModalID !== null) {
                const result = await reassignAction(
                  reassignModalID,
                  newGroupId,
                );

                if (result?.success) {
                  showAlert(
                    `Successfully reassigned item with ID ${reassignModalID}`,
                    "success",
                  );
                } else {
                  showAlert(
                    `Failed to reassign item with ID ${reassignModalID}`,
                    "danger",
                  );
                }

                setReassignModalID(null);
                // location.reload();
                router.refresh();
              }
            }}
            style={buttonStyle2}
                  onMouseEnter={buttonHover}
                  onMouseLeave={buttonUnhover}
          >
            Reassign
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
