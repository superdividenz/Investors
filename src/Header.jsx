import React, { useState } from "react";
import { ChatBubbleOvalLeftIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom"; // Import Link for routing

const Header = ({ toggleChat }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-black text-white p-4 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Header Text */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            STL RE-Investor
          </h1>
        </div>

        {/* Hamburger Menu (Mobile Only) */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-full hover:bg-gray-800 transition-all duration-200 hover:scale-110 active:scale-125"
        >
          <Bars3Icon className="h-6 w-6 hover:text-gray-300" />
        </button>

        {/* Navigation (Desktop) */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 items-center">
            <li>
              <Link
                to="/"
                className="hover:text-gray-300 text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-120"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-gray-300 text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-120"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-gray-300 text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-120"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/real-estate-data"
                className="hover:text-gray-300 text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-120"
              >
                Data
              </Link>
            </li>
            <li>
              <button
                onClick={toggleChat}
                className="p-2 rounded-full hover:bg-gray-800 transition-all duration-200 hover:scale-110 active:scale-125"
              >
                <ChatBubbleOvalLeftIcon className="h-6 w-6 hover:text-gray-300" />
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu (Dropdown) */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 right-4 bg-black rounded-lg shadow-lg p-4">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="hover:text-gray-300 text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-120"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-gray-300 text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-120"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-gray-300 text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-120"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/real-estate-data"
                  className="hover:text-gray-300 text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-120"
                >
                  Data
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
