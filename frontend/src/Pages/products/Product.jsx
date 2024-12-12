// import React from 'react'
// import Crackerdisplay from '../../components/cracker/Crackerdisplay'
// import Header  from '../../components/Header/Header'
// import Navbar from '../../components/Navbar/Navbar'
// const Product = () => {
//   return (
//     <div>
//  <Header/>
// <Crackerdisplay/>
// </div>
//   )
// }

import { useState } from "react";
import { addCartItem } from "../../actions/cartActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import './product.css'
export default function Product({ product }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    if (product.stock === 0 || quantity >= product.stock) {
      return toast("Maximum stock reached!", { type: "warning" });
    }
    setQuantity((prevQty) => prevQty + 1);
  };

  const decreaseQty = () => {
    if (quantity === 1) {
      return toast("Minimum quantity is 1", { type: "info" });
    }
    setQuantity((prevQty) => prevQty - 1);
  };

  const handleAddToCart = () => {
    if (product.stock === 0) {
      return toast("This product is out of stock!", { type: "error" });
    }
    dispatch(addCartItem(product._id, quantity));
    toast("Cart Item Added!", { type: "success" });
  };

  return (
    <div className="cracker-list-item">
      <div className="cracker-img">
        <img src={product.images[0]?.image} alt="Product" />
      </div>
      <div className="cracker-item-info">
        <div className="cracker-review">
          <p>{product.name}</p>
          <p id="product_id">Product #{product._id}</p>
        </div>
        <p className="cracker-item-desc">{product.description}</p>
        <p className="cracker-item-price">&#x20B9;{product.price}</p>
        <div className="cart">
          <div className="adding">
            <span className="btn minus" onClick={decreaseQty}>
              -
            </span>
            <input type="number" className="count" value={quantity} readOnly />
            <span className="btn plus" onClick={increaseQty}>
              +
            </span>
          </div>
          <div className="add">
            <button
              disabled={product.stock === 0}
              onClick={handleAddToCart}
              className={product.stock === 0 ? "btn-disabled" : ""}
            >
              <i className="fa-solid fa-cart-shopping"></i> Add To Cart
            </button>
          </div>
        </div>
        <p>
          Status:{" "}
          <span
            className={product.stock > 0 ? "greenColor" : "redColor"}
            id="stock_status"
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </p>
      </div>
    </div>
  );
}
