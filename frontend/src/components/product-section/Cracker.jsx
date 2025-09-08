import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Cracker.css";
import Footer from "../../components/footer/Footer";
import { getProducts } from "../../actions/productActions";
import Loader from "../Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../../Pages/Home/MetaData";
import Pagination from "react-js-pagination";
import Product from "../../Pages/products/Product";
import Search from "../search";

const Cracker = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");

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
    "Sparklers",
    "Peacock",
    "Pencil",
    "Others"
  ];

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error);
    } else {
      dispatch(getProducts(null, category, currentPage));
    }
  }, [error, dispatch, currentPage, category]);

  return (
    <div>
      <MetaData title={"Crackers"} />
      <div className="cracker-display" id="cracker-diplay">
        <h2>All Type Of Crackers</h2>

        {/* 🔍 Search Bar */}
        <Search />

        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <div className="cracker-display-list">
              {/* 📂 Category Filter */}
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

              {/* 📂 Category Dropdown (for mobile) */}
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
                {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
            </div>
          )}
        </Fragment>

        {/* 📑 Pagination */}
        {productsCount > 0 && productsCount > resPerPage ? (
          <div className="d-flex justify-content-center mt-5">
            <Pagination
              activePage={currentPage}
              onChange={(pageNo) => setCurrentPageNo(pageNo)}
              totalItemsCount={productsCount}
              itemsCountPerPage={resPerPage}
              nextPageText={"Next"}
              lastPageText={"Last"}
              firstPageText={"First"}
              itemClass={"page-item"}
              linkClass={"page-link"}
            />
          </div>
        ) : null}
      </div>

      <Footer />
    </div>
  );
};

export default Cracker;
