import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // for mobile toggle
  const [productMenu, setProductMenu] = useState(false); // dropdown control

  return (
    <div className="h-full bg-gray-900 text-gray-100 flex flex-col shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold tracking-wide text-white">
          Admin Panel
        </h2>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden focus:outline-none"
        >
          <i className="fa fa-bars text-xl text-gray-200"></i>
        </button>
      </div>

      {/* Sidebar Links */}
      <nav
        className={`flex-1 flex-col mt-2 space-y-1 px-4 md:flex ${
          open ? "flex" : "hidden"
        }`}
      >
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
        >
          <i className="fas fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>

        {/* Product Dropdown */}
        <div>
          <button
            onClick={() => setProductMenu(!productMenu)}
            className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <i className="fa fa-product-hunt"></i>
              <span>Products</span>
            </div>
            <i
              className={`fa fa-chevron-${
                productMenu ? "up" : "down"
              } text-sm text-gray-400`}
            ></i>
          </button>
          {productMenu && (
            <div className="ml-8 mt-2 space-y-1">
              <button
                onClick={() => navigate("/admin/products")}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-800 w-full text-left transition"
              >
                <i className="fa fa-shopping-basket text-gray-400"></i>
                <span>All Products</span>
              </button>
              <button
                onClick={() => navigate("/admin/products/create")}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-800 w-full text-left transition"
              >
                <i className="fa fa-plus text-gray-400"></i>
                <span>Create Product</span>
              </button>
            </div>
          )}
        </div>

        {/* Orders */}
        <Link
          to="/admin/orders"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
        >
          <i className="fa fa-shopping-basket"></i>
          <span>Orders</span>
        </Link>
      </nav>
    </div>
  );
}
