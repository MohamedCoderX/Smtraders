import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './FloatingCard.css'; // Create this CSS file below

const FloatingCard = () => {
  const { items } = useSelector((state) => state.cartState);
  const navigate = useNavigate();

  const totalAmount = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const goToCart = () => {
    if (totalAmount > 0) {
      navigate('/Mycart');
    }
  };

  return (
    <div className="floating-cart" onClick={goToCart}>
      <i className="fa fa-shopping-cart cart-icon" />
      {totalAmount > 0 && (
        <span className="cart-amount">₹{totalAmount}</span>
      )}
    </div>
  );
};

export default FloatingCard;
