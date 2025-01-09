import React from "react";

import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";

const Header = ({ toggleChat }) => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold hover:text-blue-300 transition-colors duration-200">
          St.Louis REInvestors
        </h1>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <a
                href="/"
                className="hover:text-blue-300 text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-120"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-blue-300 text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-120"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-blue-300 text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-120"
              >
                Contact
              </a>
            </li>
            <li>
              <button
                onClick={toggleChat}
                className="p-2 rounded-full hover:bg-blue-700 transition-all duration-200 hover:scale-110 active:scale-125"
              >
                <ChatBubbleOvalLeftIcon className="h-6 w-6 hover:text-blue-300" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
