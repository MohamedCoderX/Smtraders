import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../components/product-section/Cracker.css";
import Footer from "../../components/footer/Footer";
import { getProducts } from "../../actions/productActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../../Pages/Home/MetaData";
import Pagination from "react-js-pagination";
import Product from "../../Pages/products/Product";
import Loader from "../../components/Loader";
import Search from "../../components/search";
import "./product.css";
import { useParams } from "react-router-dom";

const ProductSearch = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );
  
  const { keyword } = useParams(); // Get search keyword from URL
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else {
      dispatch(getProducts(keyword, category, currentPage));
    }
  }, [error, dispatch, keyword, category, currentPage]);

  const categories = [
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
  ];

  return (
    <div>
      <MetaData title={"Crackers"} />
      <div className="cracker-display" id="cracker-display">
        <h2>All Type Of Crackers</h2>

        {/* Show message if searched */}
        {keyword && (
          <div className="d-flex justify-content-center align-items-center m-1">
            <h6 className="text-center border p-1 border-success">
              Showing results for "{keyword}"
            </h6>
            <button
              className="btn btn-danger ms-3"
              onClick={() => window.location.href = "/products"}
            >
              Clear Search
            </button>
          </div>
        )}

        <Search />

        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <div className="cracker-display-list">
              <div className="run">
                <h3>Browse Categories</h3>
                <div className="category">
                  <ul>
                    {categories.map((cat) => (
                      <li key={cat} onClick={() => setCategory(cat)}>
                        {cat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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

              <div className="cracker-view">
                {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
            </div>
          )}

          {/* Pagination */}
          {productsCount > 0 && productsCount > resPerPage && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={"Next"}
                lastPageText={"Last"}
                firstPageText={"First"}
                itemClass={"page-item"}
                linkClass={"page-link"}
              />
            </div>
          )}
        </Fragment>
      </div>

      <Footer />
    </div>
  );
};

export default ProductSearch;
