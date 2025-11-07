import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { adminOrders as adminOrdersAction } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdminProducts } from "../../actions/productActions";
import { getUsers } from "../../actions/userAction";

export default function Dashboard() {
  const dispatch = useDispatch();
  let outOfStock = 0;
  const { products = [] } = useSelector((state) => state.productsState);
  const { users = [] } = useSelector((state) => state.userState);
  const { adminOrders = [] } = useSelector((state) => state.orderState);

  if (products.length > 0) {
    products.forEach((product) => {
      if (product.stock === 0) {
        outOfStock = outOfStock + 1;
      }
    });
  }

  let totalAmount = 0;
  if (adminOrders.length > 0) {
    adminOrders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  }

  useEffect(() => {
    dispatch(getAdminProducts);
    dispatch(getUsers);
    dispatch(adminOrdersAction);
  }, [dispatch]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 bg-white border-r shadow-md">
        <Sidebar />
      </div>

      {/* Dashboard Content */}
      <div className="w-full md:w-4/5 p-6 md:p-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center md:text-left">
          Dashboard
        </h1>

        {/* Total Amount */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-2xl shadow-md p-6 mb-8 text-center">
          <h2 className="text-lg font-medium tracking-wide">Total Amount</h2>
          <p className="text-3xl font-bold mt-2">₹{totalAmount.toFixed(2)}</p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Products */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-md p-6 hover:scale-105 transition-transform">
            <h3 className="text-lg font-semibold text-center mb-2">Products</h3>
            <p className="text-3xl font-bold text-center">{products.length}</p>
            <Link
              to="/admin/products"
              className="block mt-4 text-center text-sm underline hover:text-green-100"
            >
              View Details →
            </Link>
          </div>

          {/* Orders */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl shadow-md p-6 hover:scale-105 transition-transform">
            <h3 className="text-lg font-semibold text-center mb-2">Orders</h3>
            <p className="text-3xl font-bold text-center">{adminOrders.length}</p>
            <Link
              to="/admin/orders"
              className="block mt-4 text-center text-sm underline hover:text-red-100"
            >
              View Details →
            </Link>
          </div>

          {/* Users */}
          <div className="bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-2xl shadow-md p-6 hover:scale-105 transition-transform">
            <h3 className="text-lg font-semibold text-center mb-2">Users</h3>
            <p className="text-3xl font-bold text-center">{users.length}</p>
            <Link
              to="/admin/users"
              className="block mt-4 text-center text-sm underline hover:text-sky-100"
            >
              View Details →
            </Link>
          </div>

          {/* Out of Stock */}
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white rounded-2xl shadow-md p-6 hover:scale-105 transition-transform">
            <h3 className="text-lg font-semibold text-center mb-2">
              Out of Stock
            </h3>
            <p className="text-3xl font-bold text-center">{outOfStock}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
