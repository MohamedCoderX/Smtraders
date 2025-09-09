import React from "react";
import { FaDownload } from "react-icons/fa";
import pdf from "../SMSivakasiCrackers.pdf"
import "./Download.css";

const Download = () => {
  const handleDownload = () => {
    const pdfUrl = pdf; 
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Price-List.pdf"; 
    link.click();
  };

  return (
    <div>
      <span
        onClick={handleDownload}
        className="download-icon"
        
      >
DOWNLOAD PRICE-LIST
        </span>
    </div>
  );
};

export default Download;
