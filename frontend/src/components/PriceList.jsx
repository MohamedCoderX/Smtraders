import React from "react";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import pdf from "../SMSivakasiCrackers.pdf";
import excel from "../SMCRACKERS.xlsx";

const PriceList = () => {
  // Replace with your actual file paths (public folder or server)
  const pdfFile = pdf;
  const excelFile = excel;

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-gray-50">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
        Price List
      </h1>
      <p className="text-gray-500 max-w-md mb-8">
        Download our latest product price list in PDF or Excel format.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-5">
        {/* PDF Button */}
        <a
          href={pdfFile}
          download
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
        >
          <FaFilePdf className="text-xl" />
          <span>Download PDF</span>
        </a>

        {/* Excel Button */}
        <a
          href={excelFile}
          download
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
        >
          <FaFileExcel className="text-xl" />
          <span>Download Excel</span>
        </a>
      </div>
    </div>
  );
};

export default PriceList;
