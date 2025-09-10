import React from "react";
import { FiDownload } from "react-icons/fi";
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
      <FiDownload  onClick={handleDownload}
        className="download-icon"
        title="Download Price List"/>
    </div>
  );
};

export default Download;
