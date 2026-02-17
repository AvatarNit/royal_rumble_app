"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Modal, Button } from "react-bootstrap";

interface ExportProps {
  headers: string[];
  data: any[][];
  fileName?: string;
  style?: React.CSSProperties;
}

export default function ExportToExcelButton({
  headers,
  data,
  fileName = "export",
  style,
}: ExportProps) {
  const [show, setShow] = useState(false);
  const [selectedCols, setSelectedCols] = useState<number[]>([]);

  const handleCheckboxChange = (index: number) => {
    setSelectedCols((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const handleExport = () => {
    if (selectedCols.length === 0) {
      alert("Please select at least one column.");
      return;
    }

    // Convert selected columns to JSON format
    const formattedData = data.map((row) => {
      const obj: Record<string, any> = {};
      selectedCols.forEach((colIndex) => {
        obj[headers[colIndex]] = row[colIndex];
      });
      return obj;
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8;",
    });

    saveAs(blob, `${fileName}.xlsx`);

    setShow(false);
  };

  return (
    <>
      <Button
        variant="success"
        onClick={() => setShow(true)}
        style={{ ...style }}
      >
        <i className="bi bi-box-arrow-up"></i> Export
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Columns to Export</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form className="manual-add-form">
            {headers.map((header, index) => (
              <div className="form-row checkbox-row" key={index}>
                <label className="checkbox-label">
                  <input
                    key={index}
                    type="checkbox"
                    className="checkbox-input"
                    checked={selectedCols.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  {header}
                </label>
              </div>
            ))}
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleExport}>
            Export
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
