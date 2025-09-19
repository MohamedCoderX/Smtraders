import axios from "axios";
import { 
    adminOrdersFail, adminOrdersRequest, adminOrdersSuccess, 
    createOrderFail, createOrderRequest, createOrderSuccess, 
    deleteOrderFail, deleteOrderRequest, deleteOrderSuccess,
    updateOrderFail, updateOrderRequest, updateOrderSuccess
} from "../slices/orderSlice";

 // Adjust port if needed
 const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
export const adminOrders = async (dispatch) => {
    try {
        dispatch(adminOrdersRequest());
        const { data } = await axios.get(`${frontendUrl}/admin/orders`,{
            withCredentials:true });
        dispatch(adminOrdersSuccess(data));
    } catch (error) {
        dispatch(adminOrdersFail(error.response?.data?.message || "Server Error"));
        console.error("Admin Orders Error:", error);
    }
};

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch(createOrderRequest());
        const { data } = await axios.post(`${frontendUrl}/order/new`, order);
        dispatch(createOrderSuccess(data));
    } catch (error) {
        dispatch(createOrderFail(error.response?.data?.message || "Order Creation Failed"));
        console.error("Create Order Error:", error);
    }
};

export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch(deleteOrderRequest());
        await axios.delete(`${frontendUrl}/admin/order/${id}`,{withCredentials:true});
        dispatch(deleteOrderSuccess(id)); // Optionally pass ID for immediate UI update
    } catch (error) {
        dispatch(deleteOrderFail(error.response?.data?.message || "Order Deletion Failed"));
        console.error("Delete Order Error:", error);
    }
};

export const updateOrder = (id, orderData) => async (dispatch) => {
    try {
      dispatch(updateOrderRequest());
      const { data } = await axios.put(`${frontendUrl}/admin/order/${id}`, orderData,{
        withCredentials: true,
      });
      dispatch(updateOrderSuccess(data));
    } catch (error) {
      dispatch(updateOrderFail(error.response.data.message));
    }
  };
  