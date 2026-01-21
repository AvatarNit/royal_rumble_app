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
    color: "var(--textGrey)",
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
      <Modal
        show={deleteModalID !== null}
        onHide={() => setDeleteModalID(null)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this item (ID: {deleteModalID})?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModalID(null)}>
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
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* -------- Reassign Modal -------- */}
      <Modal
        show={reassignModalID !== null}
        onHide={() => setReassignModalID(null)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reassign Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          What do you want to reassign {reassignModalID} to?
          <div className="form-row">
            <label className="form-label">New Group:</label>
            <select
              className="form-select"
              value={newGroupId}
              onChange={(e) => setNewGroupId(e.target.value)}
            >
              <option value="">All Groups</option>
              {possibleGroups.map((group) => (
                <option key={group.group_id} value={group.group_id}>
                  {group.name ? group.name : group.group_id}
                </option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setReassignModalID(null)}>
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
          >
            Reassign
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
