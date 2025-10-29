"use client";

import React from "react";

export default function Table({
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
    margin: "20px auto",
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

  return (
    <table style={tableContainerStyle}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} style={headerCellStyle}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} style={cellStyle}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
