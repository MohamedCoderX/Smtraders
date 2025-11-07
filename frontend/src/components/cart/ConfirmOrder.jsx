import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../../Pages/Home/MetaData";

export default function ConfirmOrder() {
  const { shippingInfo, items: cartItems } = useSelector((state) => state.cartState);
  const { user } = useSelector((state) => state.authState);
  const navigate = useNavigate();

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxPrice = Number(0.05 * itemsPrice).toFixed(2);
  const totalPrice = (Number(itemsPrice) + Number(taxPrice)).toFixed(2);

  const processPayment = () => {
    const data = { itemsPrice, taxPrice, totalPrice };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />
      <CheckoutSteps shipping confirmOrder />

      <section className="min-h-screen bg-gradient-to-b from-white via-indigo-50/30 to-white py-10 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Side - Shipping Info & Items */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
            {/* Shipping Info */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                Shipping Information
              </h3>
              <p className="text-gray-700">
                <span className="font-medium text-gray-800">Name:</span> {shippingInfo.name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-gray-800">Phone:</span> {shippingInfo.phoneNo}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-gray-800">Address:</span>{" "}
                {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode},{" "}
                {shippingInfo.state}
              </p>
            </div>

            {/* Cart Items */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                Your Cart Items
              </h3>
              <div className="space-y-5">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded-md bg-gray-50 border"
                      />
                      <h4 className="text-gray-800 font-medium capitalize">{item.name}</h4>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base">
                      {item.quantity} × ₹{item.price}{" "}
                      <span className="font-semibold text-gray-900 ml-1">
                        = ₹{item.quantity * item.price}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Summary */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 h-fit">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              Order Summary
            </h3>
            <div className="space-y-3 text-gray-700">
              <p className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium text-gray-900">₹{itemsPrice}</span>
              </p>
              <p className="flex justify-between">
                <span>Tax (5%):</span>
                <span className="font-medium text-gray-900">₹{taxPrice}</span>
              </p>
              <hr className="my-3" />
              <p className="flex justify-between text-lg font-semibold text-gray-900">
                <span>Total:</span>
                <span>₹{totalPrice}</span>
              </p>
            </div>

            <button
              onClick={processPayment}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-md"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
