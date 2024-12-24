import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Remove JWT token from local storage
    localStorage.removeItem("token");
    // Perform any additional logout logic here

    // Navigate to the login page
    navigate("/login");
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogoClick = () => {
    navigate("/events");
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src="eventhub.png"
            alt="Logo"
            className="h-8 cursor-pointer"
            onClick={handleLogoClick}
          />
          {!isAuthPage && (
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/add-event"
                className="text-gray-600 hover:text-gray-800"
              >
                Create Event
              </Link>
              <Link
                to="/analytics"
                className="text-gray-600 hover:text-gray-800"
              >
                Analytics
              </Link>
            </div>
          )}
        </div>
        {!isAuthPage && (
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800 flex items-center"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                ></path>
              </svg>
              <span className="ml-2">Logout</span>
            </button>
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-600 hover:text-gray-800"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        )}
      </div>
      {!isAuthPage && isMobileMenuOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <Link
            to="/add-event"
            className="block text-gray-600 hover:text-gray-800"
          >
            Create Event
          </Link>
          <Link
            to="/analytics"
            className="block text-gray-600 hover:text-gray-800"
          >
            Analytics
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
