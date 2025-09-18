import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RegisterPopup.css";
import { useDispatch } from "react-redux";
import { register } from "../actions/userAction";

const RegisterComp = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    // Show the popup every 10 seconds if the user is not registered
    const interval = setInterval(() => {
      if (!isRegistered) {
        setShowPopup(true);
      }
    }, 10000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [isRegistered]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  dispatch(register(formData));
    setIsRegistered(true);
    setShowPopup(false);
  };

  return (
    showPopup && (
      <div className="popup-overlay">
        <div className="popup-content">
          <h2>Submit Your Data our team will contact you shortly</h2>
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
              />
            </div>
            <div>
              <label>City:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
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