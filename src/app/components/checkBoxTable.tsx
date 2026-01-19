"use client";

import React, { useState } from "react";

export default function CheckBoxTable({
  headers,
  data,
}: {
  headers: string[];
  data: string[][];

}) {
  const [checked, setChecked] = useState(data.map(() => false));

  const handleCheck = (index: number) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

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

  const headerRowStyle: React.CSSProperties = {
    backgroundColor: "var(--primaryBlue)",
    color: "white",
  };

  const headerCellStyle: React.CSSProperties = {
    backgroundColor: "var(--primaryBlue)",
    color: "white",
    fontWeight: "bold",
    textAlign: "center" as const,
    verticalAlign: "middle" as const,
    padding: "12px",
    border: "2px solid var(--primaryBlue)",
  };

  const firstHeaderCellStyle: React.CSSProperties = {
    ...headerCellStyle,
    backgroundColor: "var(--primaryBlue)",
    color: "#var(--primaryBlue)",
  };

  const cellStyle: React.CSSProperties = {
    backgroundColor: "white",
    color: "var(--textGrey)",
    textAlign: "center" as const,
    verticalAlign: "middle" as const,
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
        <tr style={headerRowStyle}>
          <th style={firstHeaderCellStyle}></th>
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
                checked={checked[rowIndex]}
                onChange={() => handleCheck(rowIndex)}
                style={checkboxStyle}
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
