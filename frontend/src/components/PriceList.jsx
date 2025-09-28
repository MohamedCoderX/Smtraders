import React from "react";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import "./PriceList.css"; // external CSS
import Footer from "./footer/Footer";
import pdf from "../SMSivakasiCrackers.pdf"
import xcl from "../SMCRACKERS.xlsx"
const PriceList = () => {
  return (
    <div>
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
          href={pdf}
          download
          className="btn-price btn-pdf"
        >
          <FaFilePdf className="btn-icon" />
          <span>Download PDF</span>
        </a>

        {/* Excel Button */}
        <a
          href={xcl}
          download
          className="btn-price btn-excel"
        >
          <FaFileExcel className="btn-icon" />
          <span>Download Excel</span>
        </a>
      </div>
    </div>
<Footer/>
    </div>
  );
};

export default PriceList;
