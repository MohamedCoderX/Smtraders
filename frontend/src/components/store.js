import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import productsReducer from "../slices/productsSlice"
import authReducer from "../slices/authslice"
import cartReducer from '../slices/cartSlice'
import productReducer from '../slices/productSlice'
import orderReducer from '../slices/orderSlice'
import userReducers from '../slices/UserSlice'

const reducer = combineReducers({
  productsState:productsReducer,
  authState:authReducer,
  cartState:cartReducer,
  productState:productReducer,
orderState:orderReducer,
userState:userReducers,
})

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(thunk),
})

export default store;