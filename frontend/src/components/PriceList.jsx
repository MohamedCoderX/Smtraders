import React from "react";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import "./PriceList.css"; // external CSS

const PriceList = () => {
  return (
    <div className="price-section">
      {/* Heading */}
      <h1 className="price-title">🎆 Price List 🎇</h1>
      <p className="price-subtitle">
        Download our latest Diwali crackers price list in PDF or Excel format.
      </p>

      {/* Buttons */}
      <div className="price-buttons">
        {/* PDF Button */}
        <a
          href="/files/SMSivakasiCrackers.pdf"
          download
          className="btn btn-pdf"
        >
          <FaFilePdf className="btn-icon" />
          <span>Download PDF</span>
        </a>

        {/* Excel Button */}
        <a
          href="/files/SMCRACKERS.xlsx"
          download
          className="btn btn-excel"
        >
          <FaFileExcel className="btn-icon" />
          <span>Download Excel</span>
        </a>
      </div>
    </div>
  );
};

export default PriceList;
