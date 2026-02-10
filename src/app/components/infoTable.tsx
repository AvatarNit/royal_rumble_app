"use client";

import React from "react";

export default function Table({
  headers,
  data,
}: {
  headers: string[];
  data: (string | number)[][];
}) {
  const tableStyle: React.CSSProperties = {
    borderCollapse: "collapse" as const,
    width: "85%",
    height: "300px",
    maxWidth: "85%",
    margin: "20px auto",
    border: "4px solid var(--primaryBlue)",
    fontFamily: "Poppins, sans-serif",
    tableLayout: "fixed" as const,
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
    <table style={tableStyle}>
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
