import axios from "axios";
import { 
    adminOrdersFail, adminOrdersRequest, adminOrdersSuccess, 
    createOrderFail, createOrderRequest, createOrderSuccess, 
    deleteOrderFail, deleteOrderRequest, deleteOrderSuccess 
} from "../slices/orderSlice";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL ; // Adjust port if needed

export const adminOrders = () => async (dispatch) => {
    try {
        dispatch(adminOrdersRequest());
        const { data } = await axios.get(`${API_BASE_URL}/admin/orders`);
        dispatch(adminOrdersSuccess(data));
    } catch (error) {
        dispatch(adminOrdersFail(error.response?.data?.message || "Server Error"));
        console.error("Admin Orders Error:", error);
    }
};

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch(createOrderRequest());
        const { data } = await axios.post(`${API_BASE_URL}/order/new`, order, {
            headers: { "Content-Type": "application/json" }
        });
        dispatch(createOrderSuccess(data));
    } catch (error) {
        dispatch(createOrderFail(error.response?.data?.message || "Order Creation Failed"));
        console.error("Create Order Error:", error);
    }
};

export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch(deleteOrderRequest());
        await axios.delete(`${API_BASE_URL}/admin/order/${id}`);
        dispatch(deleteOrderSuccess(id)); // Optionally pass ID for immediate UI update
    } catch (error) {
        dispatch(deleteOrderFail(error.response?.data?.message || "Order Deletion Failed"));
        console.error("Delete Order Error:", error);
    }
};
