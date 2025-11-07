import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const FloatingCard = () => {
  const { items } = useSelector((state) => state.cartState);
  const navigate = useNavigate();

  const totalAmount = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const goToCart = () => {
    if (totalAmount > 0) {
      navigate("/Mycart");
    }
  };

  return (
    <div
      onClick={goToCart}
      className={`fixed top-20 right-6 z-50 flex items-center justify-center 
        rounded-full shadow-lg cursor-pointer transition-all duration-300 
        ${totalAmount > 0 ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400"} 
        p-3 md:p-4 hover:scale-110`}
    >
      <ShoppingCart className="text-white w-4 h-4 md:w-5 md:h-5" />
      {totalAmount > 0 && (
        <span
          className="absolute -top-2 -right-2 bg-red-500 text-white 
                     text-xs font-semibold px-2 py-1 rounded-full 
                     shadow-md animate-bounce"
        >
          ₹{totalAmount}
        </span>
      )}
    </div>
  );
};

export default FloatingCard;
