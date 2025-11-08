import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import { Menu, X, User, LayoutDashboard, LogOut } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="../images/Logo-1.png"
            alt="logo"
            className="h-10 w-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
          <li className="hover:text-indigo-600 cursor-pointer" onClick={() => navigate("/")}>Home</li>
          <li className="hover:text-indigo-600 cursor-pointer" onClick={() => navigate("/products")}>Products</li>
          <li className="hover:text-indigo-600 cursor-pointer" onClick={() => navigate("/About")}>About Us</li>
          <li className="hover:text-indigo-600 cursor-pointer" onClick={() => navigate("/contact")}>Contact Us</li>
          <li className="hover:text-indigo-600 cursor-pointer" onClick={() => navigate("/combo")}>Combo Packs</li>
          <li className="hover:text-indigo-600 cursor-pointer" onClick={() => navigate("/Price")}>Price List</li>
        </ul>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {isAuthenticated && user.role === "admin" && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-all"
              >
                <User className="w-4 h-4" />
                <span>{user.name}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => {
                      navigate("/admin/dashboard");
                      setDropdownOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </button>
                  <button
                    onClick={logoutHandler}
                    className="flex items-center w-full px-4 py-2 hover:bg-red-100 text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
          <ul className="flex flex-col items-start px-6 py-4 space-y-3 text-gray-700 font-medium">
            <li className="hover:text-indigo-600 cursor-pointer" onClick={() => navigate("/")}>Home</li>
            <li className="hover:text-indigo-600 cursor-pointer" onClick={() => navigate("/products")}>Products</li>
            <li className="hover:text-indigo-600 cursor-pointer" onClick={() => navigate("/About")}>About Us</li>
            <li className="hover:text-indigo-600 cursor-pointer" onClick={() => navigate("/contact")}>Contact Us</li>
            <li className="hover:text-indigo-600 cursor-pointer" onClick={() => navigate("/combo")}>Combo Packs</li>
            <li className="hover:text-indigo-600 cursor-pointer" onClick={() => navigate("/Price")}>Price List</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
