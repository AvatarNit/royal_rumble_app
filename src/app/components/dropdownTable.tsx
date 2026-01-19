"use client";

import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAlert } from "@/app/context/AlertContext";

interface DropdownTableProps {
  headers: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  idIndex?: number;
  visibleColumns: number[];
}

export default function DropdownTable({
  headers,
  data,
  visibleColumns,
}: DropdownTableProps) {

  const colCount = visibleColumns.length + 1;

  const groupNumbers = [1, 2, 3, 4, 5];

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


  return (
    <div>
      <table style={tableContainerStyle}>
        <colgroup>
          {Array.from({ length: colCount }).map((_, i) => (
            <col
              key={i}
              style={{
                width: i === colCount - 1 ? "20%" : `${80 / (colCount - 1)}%`,
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
                    <select
                        style={{
                            width: "100%",
                            padding: "6px 8px",
                            fontSize: "16px",
                            fontFamily: "Poppins, sans-serif",
                            border: "2px solid var(--primaryBlue)",
                            borderRadius: "4px",
                            backgroundColor: "white",
                            color: "var(--textGrey)",
                            cursor: "pointer",
                        }}
                        >
                        <option value="" >
                            Select Group
                        </option>

                        {groupNumbers.map((group) => (
                            <option key={group} value={group}>
                                 {group}
                            </option>
                        ))}
                        </select>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
