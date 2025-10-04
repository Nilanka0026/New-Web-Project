import React from "react";
import { Link } from "react-router";
import { ShoppingCart, User } from "lucide-react"; // ✅ Added User icon

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left side: Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600"
              style={{ fontFamily: "'Bingo', sans-serif" }} // Apply Bingo font
            >
              N -Tech
            </Link>
          </div>

          {/* Right side: Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">
              Contact Us
            </Link>

            

            {/* Login Link */}
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>

            {/* User Icon */}
            <Link to="/profile" className="text-gray-700 hover:text-blue-600 flex items-center">
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="text-gray-700 hover:text-blue-600 flex items-center">
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
