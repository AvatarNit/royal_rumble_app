"use client";

import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from "next/navigation";

export default function EditTable({
  headers,
  data,
  editLink,
  deleteLink,
  idIndex = 0,
  visibleColumns,
}: {
  headers: string[]; // Table Headers
  data: (string | number)[][]; // Table Data
  editLink: string; // Link shortcut for edit
  deleteLink: string; // Link shortcut for delete
  idIndex?: number; // Index of ID column in data rows
  visibleColumns: number[]; // Indices of columns to display
}) {
  const router = useRouter();

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

  const handleIconHover = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = "var(--primaryRed)";
  };

  const handleIconUnhover = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = "var(--primaryBlue)";
  };

  return (
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
            // Show data but only for visible columns
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
                  {/* edit */}
                  <i
                    className="bi bi-pencil"
                    style={iconStyle}
                    onMouseEnter={handleIconHover}
                    onMouseLeave={handleIconUnhover}
                    onClick={() => router.push(`${editLink}/${id}`)}
                  />

                  {/* delete */}
                  <i
                    className="bi bi-trash"
                    style={iconStyle}
                    onMouseEnter={handleIconHover}
                    onMouseLeave={handleIconUnhover}
                    onClick={() => router.push(`${deleteLink}/${id}`)}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
