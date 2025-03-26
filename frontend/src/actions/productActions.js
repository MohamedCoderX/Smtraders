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

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true, // ✅ Send cookies for authentication
});

// ✅ GET ALL ADMIN PRODUCTS (With Authentication)
export const getAdminProducts = async (dispatch) => {
  try {
    dispatch(adminProductsRequest());

    const { data } = await axiosInstance.get(`/admin/products`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    dispatch(adminProductsSuccess(data));
  } catch (error) {
    dispatch(adminProductsFail(error.response?.data?.message || "Failed to load admin products"));
  }
};

// ✅ CREATE NEW PRODUCT (With Authentication)
export const createNewProduct = (productData) => async (dispatch) => {
  try {
    dispatch(newProductRequest());

    const config = { 
      headers: { 
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}` // ✅ Send token
      }
    };

    const { data } = await axiosInstance.post(`/admin/product/new`, productData, config);

    dispatch(newProductSuccess(data));
  } catch (error) {
    dispatch(newProductFail(error.response?.data?.message || "Failed to create product"));
    console.error("Product creation error:", error.response?.data);
  }
};

// ✅ DELETE PRODUCT (With Authentication)
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());

    await axiosInstance.delete(`/admin/product/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } // ✅ Send token
    });
    
    dispatch(deleteProductSuccess());
  } catch (error) {
    dispatch(deleteProductFail(error.response?.data?.message || "Failed to delete product"));
  }
};