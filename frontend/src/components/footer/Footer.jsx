import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, Mail, Heart } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* --- Logo + Links --- */}
        <div>
          <div className="flex flex-col items-start space-y-4">
            <img
              src="../images/logo.png"
              alt="SM Crackers logo"
              loading="lazy"
              className="h-14 w-auto cursor-pointer"
              onClick={() => navigate("/")}
            />

            <ul className="flex flex-wrap gap-3 text-sm font-medium">
              <li
                onClick={() => navigate("/")}
                className="hover:text-indigo-400 cursor-pointer"
              >
                Home
              </li>
              <li>|</li>
              <li
                onClick={() => navigate("/products")}
                className="hover:text-indigo-400 cursor-pointer"
              >
                Products
              </li>
              <li>|</li>
              <li
                onClick={() => navigate("/About")}
                className="hover:text-indigo-400 cursor-pointer"
              >
                About Us
              </li>
              <li>|</li>
              <li
                onClick={() => navigate("/contact")}
                className="hover:text-indigo-400 cursor-pointer"
              >
                Contact
              </li>
              <li>|</li>
              <li
                onClick={() => navigate("/terms")}
                className="hover:text-indigo-400 cursor-pointer"
              >
                Terms
              </li>
            </ul>

            <p className="text-sm text-gray-400">
              © SM Crackers 2015 — All rights reserved
            </p>
          </div>
        </div>

        {/* --- Contact Info --- */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Contact Us
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="text-indigo-400 w-5 h-5 mt-1" />
              <p>
                4/175/A Sattur to Sivakasi Road
                <br />
                Veerapandiyapuram
                <br />
                Near Toll Gate, Sattur - 626203
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-indigo-400 w-5 h-5" />
              <a href="tel:+918903359989" className="hover:text-indigo-400">
                +91 89033 59989
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-indigo-400 w-5 h-5" />
              <a
                href="mailto:smpyropark.2019@gmail.com"
                className="hover:text-indigo-400"
              >
                smpyropark.2019@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* --- About --- */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            About the Company
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            At SM Crackers, customer satisfaction and safety are our top
            priorities. Our online store lets you browse, choose, and order
            crackers with ease, ensuring secure payments and reliable delivery.
          </p>
        </div>
      </div>

      {/* --- Divider --- */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} SM Crackers, Sattur — Made with{" "}
        <Heart className="inline w-4 h-4 text-red-500 mx-1 animate-pulse" /> by
        <span className="text-indigo-400 font-medium"> Team SM</span>
      </div>
    </footer>
  );
};

export default Footer;
