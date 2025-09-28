import React, { Fragment, useEffect } from "react";
import "./cracker.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../actions/productActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "../../Pages/products/Product";

// Skeleton Loader for Product Cards
const ProductSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img" />
      <div className="skeleton-text" />
      <div className="skeleton-text short" />
    </div>
  );
};

const Crackerdisplay = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, error, loading } = useSelector(
    (state) => state.productsState
  );

  // Fetch products on mount
  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
    dispatch(getProducts(null));
  }, [dispatch, error]);

  return (
    <div>
      <div className="cracker-display" id="cracker-display">
        <h2>All Type Of Crackers</h2>

        <Fragment>
          <div className="cracker-display-list">
            {loading ? (
              // Show skeletons when loading
              Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            ) : (
              products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))
            )}
          </div>
        </Fragment>

        <div className="view-all">
          <button onClick={() => navigate("/products")}>
            View All Crackers
          </button>
        </div>
      </div>
    </div>
  );
};

export default Crackerdisplay;
