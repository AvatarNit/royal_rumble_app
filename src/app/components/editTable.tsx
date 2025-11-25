"use client";

import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function EditTable({
  headers,
  data,
}: {
  headers: string[];
  data: (string | number)[][];
}) {
 
  const colCount = headers.length + 1;

  const tableContainerStyle: React.CSSProperties = {
    borderCollapse: "collapse",
    width: "100%",
    height: "300px",
    maxWidth: "100%",
    margin: "20px auto 40px auto",
    border: "4px solid var(--primaryBlue)",
    fontFamily: "Poppins, sans-serif",
    tableLayout: "fixed",
  };

  const headerCellStyle: React.CSSProperties = {
    backgroundColor: "var(--primaryBlue)",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    verticalAlign: "middle",
    padding: "12px",
    border: "2px solid var(--primaryBlue)",
  };

  const cellStyle: React.CSSProperties = {
    backgroundColor: "white",
    color: "var(--textGrey)",
    textAlign: "center",
    verticalAlign: "middle",
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

  const dataColumns = Math.max(1, headers.length);

  return (
    <table style={tableContainerStyle}>
      <colgroup>
        {Array.from({ length: colCount }).map((_, i) => (
          <col
            key={i}
            style={{
              width:
                i === colCount - 1
                  ? "15%"
                  : `${85 / (colCount - 1)}%`,
            }}
          />
        ))}
      </colgroup>

      <thead>
        <tr>
          {Array.from({ length: dataColumns }).map((_, i) => (
            <th key={i} style={headerCellStyle}>
              {headers[i] ?? ""}
            </th>
          ))}
          <th style={headerCellStyle}> </th>
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: dataColumns }).map((_, ci) => (
              <td key={ci} style={cellStyle} title={String(row[ci] ?? "")}>
                {row[ci] ?? ""}
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
                  onMouseEnter={handleIconHover}
                  onMouseLeave={handleIconUnhover}
                />
                <i
                  className="bi bi-trash"
                  style={iconStyle}
                  onMouseEnter={handleIconHover}
                  onMouseLeave={handleIconUnhover}
                  onClick={() => console.log("Delete clicked for row", rowIndex)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
