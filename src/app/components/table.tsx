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
    border: "4px solid #01539c",
    fontFamily: "Poppins, sans-serif",
  };

  const headerCellStyle = {
    backgroundColor: "#01539c",
    color: "white",
    fontWeight: "bold",
    textAlign: "center" as const,
    verticalAlign: "middle" as const,
    padding: "12px",
    border: "2px solid #01539c",
  };

  const cellStyle = {
    backgroundColor: "white",
    color: "#8a8d8f",
    textAlign: "center" as const,
    verticalAlign: "middle" as const,
    padding: "12px",
    border: "2px solid #01539c",
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
