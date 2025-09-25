import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Footer Main */}
      <div className="footer-full">
        {/* Logo + Menu */}
        <div className="logoss">
          <div className="logosimg">
            <img
              src="../images/logo.png"
              alt="SM Crackers logo"
              loading="lazy"
            />
          </div>

          <ul className="menu">
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/products")}>Products</li>
            <li onClick={() => navigate("/about")}>About Us</li>
            <li onClick={() => navigate("/contact")}>Contact Us</li>
            <li onClick={() => navigate("/terms")}>Terms & Conditions</li>
            <li onClick={() => navigate("/privacy")}>Privacy Policy</li>
          </ul>

          <h3>Serving Customers Since 2015</h3>
        </div>

        {/* Contact Info */}
        <div className="contact">
          <h2>Contact Us</h2>
          <div className="contact_s1">
            <a href="#">
              <i className="fa fa-map-marker" aria-hidden="true"></i>
            </a>
            <p>
              4/175/A Sattur to Sivakasi Road <br />
              Veerapandiyapuram <br />
              Near Toll Gate, Sattur - 626203
            </p>
          </div>

          <div className="contact_s1">
            <a href="tel:+918903359989">
              <i className="fa fa-mobile" aria-hidden="true"></i>
            </a>
            <p>+91 8903359989</p>
          </div>

          <div className="contact_s1">
            <a href="mailto:smpyropark.2019@gmail.com">
              <i className="fa fa-envelope-o" aria-hidden="true"></i>
            </a>
            <p>smpyropark.2019@gmail.com</p>
          </div>
        </div>

        {/* About Company */}
        <div className="abtcom">
          <h2>About the Company</h2>
          <p>
            At SM Crackers, customer satisfaction and safety are our top
            priorities. Our online store lets you browse and order crackers
            securely, with easy payments and reliable delivery.
          </p>

          <div className="about_icon">
            <a href="https://www.instagram.com/sm_crackers_sivakasi/">
              <i className="fa fa-facebook"></i>
            </a>
            
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright">
        &copy; {new Date().getFullYear()} SM Crackers. All Rights Reserved. |{" "}
        <span>&hearts;</span> Made with Love in Sattur
      </div>
    </div>
  );
};

export default Footer;
