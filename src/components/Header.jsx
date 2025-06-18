import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header({ isLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow-lg fixed w-full z-40">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-yellow-400 font-extrabold text-2xl select-none"
          aria-label="TrackFlix Home"
        >
          TrackFlix
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center font-medium text-lg">
          <Link to="/" className="hover:text-yellow-400 transition duration-200">
            Home
          </Link>
          <Link to="/movie" className="hover:text-yellow-400 transition duration-200">
            Movie
          </Link>
          <Link to="/liveshow" className="hover:text-yellow-400 transition duration-200">
            Live Show
          </Link>

          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="hover:text-yellow-400 transition duration-200 text-xl"
              aria-label="Dashboard"
            >
              👨
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-yellow-400 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/signin"
                className="hover:text-yellow-400 transition duration-200"
              >
                Sign In
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Burger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {/* Hamburger icon with animation */}
            <svg
              className={`w-8 h-8 transition-transform duration-300 ${
                isMenuOpen ? "rotate-90" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <nav
          className="md:hidden mt-2 px-4 py-3 space-y-3 bg-gray-800 rounded-lg shadow-lg max-w-screen-xl mx-auto transition-opacity duration-300"
          aria-label="Mobile menu"
        >
          <Link to="/" className="block hover:text-yellow-400 text-lg font-medium">
            Home
          </Link>
          <Link to="/movie" className="block hover:text-yellow-400 text-lg font-medium">
            Movie
          </Link>
          <Link to="/liveshow" className="block hover:text-yellow-400 text-lg font-medium">
            Live Show
          </Link>

          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="block hover:text-yellow-400 text-xl font-semibold"
            >
              👨 Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="block hover:text-yellow-400 text-lg font-medium">
                Login
              </Link>
              <Link to="/signin" className="block hover:text-yellow-400 text-lg font-medium">
                Sign In
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
