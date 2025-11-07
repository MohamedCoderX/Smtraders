import React, { useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addCartItem } from "../../actions/cartActions";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  // ✅ Increase Quantity
  const increaseQty = () => {
    if (product.stock === 0 || quantity >= product.stock) {
      return toast("Maximum stock reached!", { type: "warning" });
    }
    setQuantity((prevQty) => prevQty + 1);
  };

  // ✅ Decrease Quantity
  const decreaseQty = () => {
    if (quantity === 1) {
      return toast("Minimum quantity is 1", { type: "info" });
    }
    setQuantity((prevQty) => prevQty - 1);
  };

  // ✅ Add to Cart
  const handleAddToCart = () => {
    if (product.stock === 0) {
      return toast("This product is out of stock!", { type: "error" });
    }
    dispatch(addCartItem(product._id, quantity));
    toast("Added to cart!", { type: "success" });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden w-full max-w-xs mx-auto border border-gray-100">
      {/* 🧨 Product Image */}
      <div className="relative">
        <img
          src={product.images?.[0]?.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-44 object-cover hover:scale-105 transition-transform duration-300"
        />
        {product.originalPrice && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-semibold px-2 py-[2px] rounded-full shadow-sm">
            {Math.round(
              ((product.originalPrice - product.price) / product.originalPrice) * 100
            )}
            % OFF
          </span>
        )}
      </div>

      {/* 🧾 Product Info */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs line-clamp-2 mt-1">
          {product.description}
        </p>

        {/* 💰 Price */}
        <div className="flex items-center gap-2 mt-3">
          <p className="text-indigo-600 font-bold text-lg leading-none">
            ₹{product.price}
          </p>
          {product.originalPrice && (
            <p className="text-gray-400 line-through text-xs leading-none">
              ₹{product.originalPrice}
            </p>
          )}
        </div>

        {/* 🛒 Cart Section */}
        <div className="flex items-center justify-between mt-4">
          {/* Quantity Selector */}
          <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
            <button
              onClick={decreaseQty}
              className="p-1 text-gray-600 hover:text-indigo-600 transition"
            >
              <Minus size={14} />
            </button>
            <input
              type="text"
              readOnly
              value={quantity}
              className="w-6 text-center bg-transparent font-medium text-gray-700 text-sm"
            />
            <button
              onClick={increaseQty}
              className="p-1 text-gray-600 hover:text-indigo-600 transition"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex items-center gap-2 ${
              product.stock === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white text-sm font-medium px-3 py-1.5 rounded-full transition-all shadow-sm`}
          >
            <ShoppingCart size={14} />
            <span>{product.stock === 0 ? "Out" : "Add"}</span>
          </button>
        </div>

        {/* 🟢 Stock Status */}
        <p className="text-xs text-gray-600 mt-3">
          Status:{" "}
          <span
            className={`font-semibold ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Product;
