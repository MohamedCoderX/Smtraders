import axios from "axios";
import { addCartItemRequest, addCartItemSuccess } from "../slices/cartSlice";

const frontendUrl = process.env.REACT_APP_FRONTEND_URL;; // Adjust if needed

export const addCartItem = (id, quantity) => async (dispatch) => {
    try {
        dispatch(addCartItemRequest());

        const { data } = await axios.get(`${frontendUrl}/product/${id}`,{withCredentials:true});
        
        if (!data?.Product) throw new Error("Product not found in response");

        const item = {
            product: data.Product._id,
            name: data.Product.name,
            price: data.Product.price,
            image: data.Product.images?.[0]?.image || "/default-product.jpg", // Fallback image
            stock: data.Product.stock,
            quantity,
        };

        dispatch(addCartItemSuccess(item));
    } catch (error) {
        console.error("Error adding to cart:", error.response?.data?.message || error.message);
    }
};
