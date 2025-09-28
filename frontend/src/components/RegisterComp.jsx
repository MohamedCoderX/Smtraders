import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import { useLocation } from "react-router-dom";
import "./RegisterPopup.css";

const RegisterComp = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.authState); // ✅ Same as Navbar

  useEffect(() => {
    if (!location.pathname.includes("/admin") && !isAuthenticated) {
      const interval = setInterval(() => {
        if (!isRegistered) {
          setShowPopup(true);
        }
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [isRegistered, location.pathname, isAuthenticated]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
    setIsRegistered(true);
    setShowPopup(false);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  // ✅ Don’t render anything if logged in
  if (isAuthenticated) return null;

  return (
    showPopup && (
      <div className="popup-overlay">
        <div className="popup-content">
          <button className="close-button" onClick={handleClose}>
            &times;
          </button>
          <h2>Submit Your Data, our team will contact you shortly</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  );
};

export default RegisterComp;
