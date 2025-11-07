import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../actions/productActions";
import Product from "../../Pages/products/Product";

const Crackerdisplay = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector((state) => state.productsState);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) toast.error(error);
    dispatch(getProducts(null));
  }, [dispatch, error]);

  return (
    <section className="py-2 px-6 sm:px-10 bg-gradient-to-b from-white via-indigo-50/50 to-white">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight">
          Explore Our Crackers
        </h2>
        <div className="w-24 h-[3px] bg-indigo-600 mx-auto mt-2 rounded-full"></div>
        <p className="text-gray-600 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed">
          Discover all types of crackers — from night fireworks to kids’ favorites — 
          handpicked to make every celebration sparkle with joy.
        </p>
      </div>

      {/* Product Grid */}
      <Fragment>
        <div
          className="grid gap-8 sm:gap-10 
                     grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                     place-items-center max-w-7xl mx-auto"
        >
          {products &&
            products.map((product) => (
              <div
                key={product._id}
                className="transition-transform duration-300 hover:-translate-y-1"
              >
                <Product product={product} />
              </div>
            ))}
        </div>
      </Fragment>

      {/* View All Button */}
      <div className="flex justify-center mt-14">
        <button
          onClick={() => navigate("/products")}
          className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white 
                     font-medium text-sm rounded-full shadow-md hover:shadow-lg 
                     transition-all duration-300 hover:scale-105"
        >
          View All Crackers
        </button>
      </div>
    </section>
  );
};

export default Crackerdisplay;
