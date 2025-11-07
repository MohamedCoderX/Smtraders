import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseCartItemQty,
  increaseCartItemQty,
  removeItemFromCart,
} from "../../slices/cartSlice";

export default function Cart() {
  const { items } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQty = (item) => {
    if (item.stock === 0 || item.quantity >= item.stock) return;
    dispatch(increaseCartItemQty(item.product));
  };

  const decreaseQty = (item) => {
    if (item.quantity === 1) return;
    dispatch(decreaseCartItemQty(item.product));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  const totalAmount = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const totalUnits = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Fragment>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-gray-600">
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            Your Cart is Empty 🛒
          </h2>
          <Link
            to="/products"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
          {/* Header */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-10">
            Your Cart <span className="text-indigo-600">({items.length})</span>
          </h2>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* 🧺 Cart Items */}
            <div className="flex-1 space-y-6">
              {items.map((item) => (
                <div
                  key={item.product}
                  className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  {/* Image */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 sm:ml-4 text-center sm:text-left mt-4 sm:mt-0">
                    <h4 className="text-gray-800 font-medium text-base md:text-lg truncate">
                      {item.name}
                    </h4>
                    <p className="text-indigo-600 font-semibold mt-1">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* Quantity Control */}
                  <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 mt-4 sm:mt-0">
                    <button
                      className="p-2 text-gray-600 hover:text-indigo-600"
                      onClick={() => decreaseQty(item)}
                    >
                      –
                    </button>
                    <input
                      type="text"
                      readOnly
                      value={item.quantity}
                      className="w-8 text-center bg-transparent text-gray-800 font-medium text-sm"
                    />
                    <button
                      className="p-2 text-gray-600 hover:text-indigo-600"
                      onClick={() => increaseQty(item)}
                    >
                      +
                    </button>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => dispatch(removeItemFromCart(item.product))}
                    className="text-red-500 hover:text-red-600 text-lg mt-4 sm:mt-0"
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>

            {/* 💰 Summary */}
            <div className="lg:w-1/3 w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6 self-start">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Order Summary
              </h4>
              <hr className="mb-4" />
              <div className="space-y-3 text-gray-700 text-sm">
                <p className="flex justify-between">
                  <span>Subtotal (Units):</span>
                  <span className="font-medium">{totalUnits}</span>
                </p>
                <p className="flex justify-between">
                  <span>Estimated Total:</span>
                  <span className="font-medium">₹{totalAmount}</span>
                </p>
              </div>

              <hr className="my-4" />

              <button
                onClick={checkoutHandler}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-full transition-all duration-300"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="block text-center text-sm text-gray-500 mt-3 hover:text-indigo-600 transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
