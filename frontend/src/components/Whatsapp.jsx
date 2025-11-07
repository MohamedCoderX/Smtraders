import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Whatsapp = () => {
  return (
    <a
      href="https://wa.me/+918903359989"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 
                 bg-green-500 text-white 
                 p-2 rounded-full shadow-lg 
                 hover:bg-green-600 hover:scale-110 
                 transition-all duration-300 
                 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
    </a>
  );
};

export default Whatsapp;
