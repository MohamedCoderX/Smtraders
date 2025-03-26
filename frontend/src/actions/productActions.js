import axios from "axios";
import {
  adminProductsFail,
  adminProductsRequest,
  adminProductsSuccess,
  productsFail,
  productsRequest,
  productsSucess,
} from "../slices/productsSlice";
import {
  deleteProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  newProductFail,
  newProductRequest,
  newProductSuccess,
} from "../slices/productSlice";

// Load API Base URL from environment
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// ✅ GET ALL PRODUCTS (WITH FILTERS)
export const getProducts = (keyword, category, currentPage) => async (dispatch) => {
  try {
    dispatch(productsRequest());
    
    let link = `${API_BASE_URL}/products?page=${currentPage}`;
    
    if (keyword) {
      link += `&keyword=${keyword}`;
    }
    if (category) {
      link += `&category=${category}`;
    }

    const { data } = await axios.get(link);
    dispatch(productsSucess(data));
  } catch (error) {
    dispatch(productsFail(error.response?.data?.message || "Failed to load products"));
  }
};

// ✅ GET ALL ADMIN PRODUCTS
export const getAdminProducts = async (dispatch) => {
  try {
    dispatch(adminProductsRequest());
    
    const { data } = await axios.get(`${API_BASE_URL}/admin/products`,{
        withCredentials: true, // ✅ Ensure cookies are sent
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` // ✅ Send token in header
        },
    });
    dispatch(adminProductsSuccess(data));
  } catch (error) {
    dispatch(adminProductsFail(error.response?.data?.message || "Failed to load admin products"));
  }
};

// ✅ CREATE NEW PRODUCT
export const createNewProduct = (productData) => async (dispatch) => {
  try {
    dispatch(newProductRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    console.log("Sending FormData:", productData); // Debugging

    const { data } = await axios.post(`${API_BASE_URL}/admin/product/new`, productData, config);

    dispatch(newProductSuccess(data));
  } catch (error) {
    dispatch(newProductFail(error.response?.data?.message || "Failed to create product"));
    console.error("Product creation error:", error.response?.data);
  }
};

// ✅ DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());

    await axios.delete(`${API_BASE_URL}/admin/product/${id}`);
    
    dispatch(deleteProductSuccess());
  } catch (error) {
    dispatch(deleteProductFail(error.response?.data?.message || "Failed to delete product"));
  }
};
