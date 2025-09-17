import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { adminOrders as adminOrdersAction } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdminProducts } from "../../actions/productActions";
import { fetchUsers } from "../../slices/UserSlice"; // Import the fetchUsers action

export default function Dashboard() {
  const dispatch = useDispatch();
  let outOfStock = 0;

  const { products = [] } = useSelector((state) => state.productsState);
  const { adminOrders = [] } = useSelector((state) => state.orderState);
  const { users = [] } = useSelector((state) => state.userState); // Access users from Redux state

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
    dispatch(adminOrdersAction);
    dispatch(fetchUsers); // Fetch users when the component mounts
  }, [dispatch]);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Dashboard</h1>
        <div className="row pr-4">
          {/* Total Amount */}
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-primary o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Total Amount<br />₹{totalAmount}
                </div>
              </div>
            </div>
          </div>

          {/* Total Users */}
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-success o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Total Users<br />{users.length}
                </div>
              </div>
            </div>
          </div>

          {/* Out of Stock */}
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-danger o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Out of Stock<br />{outOfStock}
                </div>
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-warning o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Total Orders<br />{adminOrders.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}