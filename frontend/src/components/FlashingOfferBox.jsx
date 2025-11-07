import React from "react";

const FlashingOfferBox = () => {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
      <div
        className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold 
                   text-sm md:text-base px-2 py-2 rounded-r-xl shadow-lg cursor-pointer 
                   hover:scale-105 transition-transform duration-300 animate-pulse-glow
                   flex flex-col items-center justify-center"
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(359deg)",
          transformOrigin: "center",
        }}
      >
        <span className="text-lg md:text-xl font-bold animate-flash mb-1">
          90% OFF
        </span>
        <span className="text-xs md:text-sm font-semibold text-center">
          Min ₹3000
        </span>
      </div>
    </div>
  );
};

export default FlashingOfferBox;
