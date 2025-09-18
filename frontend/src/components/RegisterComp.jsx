import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RegisterPopup.css";
import { useDispatch } from "react-redux";
import { register } from "../actions/userAction";
import { useLocation } from "react-router-dom"; // Import useLocation to check the current route

const RegisterComp = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current route

  useEffect(() => {
    // Show the popup every 10 seconds if the user is not registered and not on the admin dashboard
    if (!location.pathname.includes("/admin")) {
      const interval = setInterval(() => {
        if (!isRegistered) {
          setShowPopup(true);
        }
      }, 10000);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [isRegistered, location.pathname]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(formData));
    setIsRegistered(true);
    setShowPopup(false);
  };

  const handleClose = () => {
    setShowPopup(false); // Close the popup when the Close button is clicked
  };

  return (
    showPopup && (
      <div className="popup-overlay">
        <div className="popup-content">
          <button className="close-button" onClick={handleClose}>
            &times; {/* Close icon */}
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