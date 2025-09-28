import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
  useMemo,
  lazy,
  Suspense,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Cracker.css";
import { getProducts } from "../../actions/productActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../../Pages/Home/MetaData";
import Pagination from "react-js-pagination";
import Product from "../../Pages/products/Product";
import Loader from "../Loader";

// Lazy load heavy components
const Footer = lazy(() => import("../../components/footer/Footer"));
const Search = lazy(() => import("../search"));
const FloatingCard = lazy(() => import("../FloatingCard"));

// Simple Skeleton Loader for products
const ProductSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img" />
      <div className="skeleton-text" />
      <div className="skeleton-text short" />
    </div>
  );
};

const Cracker = () => {
  const dispatch = useDispatch();

  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");

  // ✅ Memoized static categories list
  const categories = useMemo(
    () => [
      "Sound crackers",
      "Twinkling star",
      "Flower pot",
      "Ground chakkara",
      "Bijli crackers",
      "Bomb",
      "Rockets",
      "Continue crackers",
      "Special wala",
      "Fancy show",
      "Sky shot rider",
      "Multi colour shot",
      "Branded sky shot",
      "Flying crackers",
      "Standard fountain",
      "Mega fountain",
      "Flash novalties",
      "Varities",
      "Colour matches",
      "Gift box",
      "Sparklers",
      "Peacock",
      "Pencil",
      "New Arrivals",
    ],
    []
  );

  // ✅ Debounced API call to prevent multiple fast requests
  useEffect(() => {
    const timer = setTimeout(() => {
      if (error) {
        toast.error(error);
      } else {
        dispatch(getProducts(null, category, currentPage));
      }
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [error, dispatch, currentPage, category]);

  // ✅ Optimized page change handler
  const setCurrentPageNo = useCallback((pageNo) => {
    setCurrentPage(pageNo);
  }, []);

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Link to="/Mycart">
          <FloatingCard />
        </Link>
      </Suspense>

      <MetaData title="Crackers" />

      <div className="cracker-display" id="cracker-display">
        <h2>All Type Of Crackers</h2>

        {/* 🔍 Search Bar */}
        <Suspense fallback={<Loader />}>
          <Search />
        </Suspense>

        <Fragment>
          {loading ? (
            // Show skeleton loader when fetching
            <div className="cracker-view skeleton-grid">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="cracker-display-list">
              {/* 📂 Category Filter - Desktop */}
              <div className="run">
                <h3>Browse Categories</h3>
                <div className="category">
                  <ul>
                    {categories.map((cat) => (
                      <li
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={category === cat ? "active-category" : ""}
                      >
                        {cat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 📂 Category Dropdown - Mobile */}
              <div className="ruin">
                <h3>Browse Categories</h3>
                <div className="category">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="category-select"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 🎇 Products List */}
              <div className="cracker-view">
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <Product
                      key={product._id}
                      product={{ ...product, imageLoading: "lazy" }}
                    />
                  ))
                ) : (
                  <p className="no-products">No products found</p>
                )}
              </div>
            </div>
          )}
        </Fragment>

        {/* 📑 Pagination */}
        {productsCount > resPerPage && (
          <div className="d-flex justify-content-center mt-5">
            <Pagination
              activePage={currentPage}
              onChange={(pageNo) => setCurrentPageNo(pageNo)}
              totalItemsCount={productsCount}
              itemsCountPerPage={resPerPage}
              nextPageText="Next"
              lastPageText="Last"
              firstPageText="First"
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default React.memo(Cracker);
