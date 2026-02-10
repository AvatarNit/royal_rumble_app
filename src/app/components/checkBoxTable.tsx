"use client";
import React from "react";

interface CheckBoxTableProps {
  headers: string[];
  data: string[][];
  status: boolean[];
  rowIds: number[];
  onStatusChange?: (mentorId: number, newStatus: boolean) => void;
}

export default function CheckBoxTable({
  headers,
  data,
  status,
  rowIds,
  onStatusChange,
}: CheckBoxTableProps) {
  const tableStyle: React.CSSProperties = {
    borderCollapse: "collapse",
    width: "85%",
    height: "300px",
    maxWidth: "85%",
    margin: "20px auto",
    border: "4px solid var(--primaryBlue)",
    fontFamily: "Poppins, sans-serif",
    tableLayout: "fixed",
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
    padding: "12px",
    border: "2px solid var(--primaryBlue)",
  };

  const checkboxStyle: React.CSSProperties = {
    width: "35px",
    height: "35px",
    cursor: "pointer",
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={headerCellStyle}></th>
          {headers.map((header, i) => (
            <th key={i} style={headerCellStyle}>
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td style={cellStyle}>
              <input
                type="checkbox"
                checked={status[rowIndex] ?? false}
                onChange={(e) =>
                  onStatusChange?.(rowIds[rowIndex], e.target.checked)
                }
                style={checkboxStyle}
                {...(!onStatusChange && { disabled: true })}
              />
            </td>

            {row.map((cell, colIndex) => (
              <td key={colIndex} style={cellStyle}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
