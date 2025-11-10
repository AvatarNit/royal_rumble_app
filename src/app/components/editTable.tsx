"use client";

import React from "react";
import ReassignButton from "./reassignButton";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function CheckBoxTable({
  headers,
  data,
}: {
  headers: string[];
  data: (string | number)[][];
}) {
  const tableContainerStyle = {
    borderCollapse: "collapse" as const,
    width: "100%",
    height: "300px",
    maxWidth: "800px",
    margin: "20px auto 40px auto",
    border: "4px solid var(--primaryBlue)",
    fontFamily: "Poppins, sans-serif",
  };

  const headerCellStyle = {
    backgroundColor: "var(--primaryBlue)",
    color: "white",
    fontWeight: "bold",
    textAlign: "center" as const,
    verticalAlign: "middle" as const,
    padding: "12px",
    border: "2px solid var(--primaryBlue)",
  };

  const cellStyle = {
    backgroundColor: "white",
    color: "var(--textGrey)",
    textAlign: "center" as const,
    verticalAlign: "middle" as const,
    padding: "12px",
    border: "2px solid var(--primaryBlue)",
  };

  const iconStyle = {
    fontSize: "40px",
    color: "var(--primaryBlue)",
    cursor: "pointer",
    marginLeft: "10px",
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
        <col style={{ width: "70%" }} />
        <col style={{ width: "30%" }} />
      </colgroup>

      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} style={headerCellStyle}>
              {header}
            </th>
          ))}
          <th style={headerCellStyle}> </th>
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td style={cellStyle}>{row[0]}</td>
            <td style={cellStyle}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ReassignButton />
                <i
                  className="bi bi-trash"
                  style={iconStyle}
                  onMouseEnter={handleIconHover}
                  onMouseLeave={handleIconUnhover}
                  onClick={() => console.log("Delete clicked for", row[0])}
                ></i>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
