import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header({ isLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white px-4 py-3 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-yellow-400 font-bold text-xl">IMDb Clone</Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/movie" className="hover:text-yellow-400">Movie</Link>
          <Link to="/liveshow" className="hover:text-yellow-400">Live Show</Link>

          {isLoggedIn ? (
            <Link to="/dashboard" className="hover:text-yellow-400 text-xl">👨</Link>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-400">Login</Link>
              <Link to="/signin" className="hover:text-yellow-400">Sign In</Link>
            </>
          )}
        </nav>

        {/* Mobile Burger */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none text-2xl">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 px-2 space-y-2">
          <Link to="/" className="block hover:text-yellow-400">Home</Link>
          <Link to="/movie" className="block hover:text-yellow-400">Movie</Link>
          <Link to="/liveshow" className="block hover:text-yellow-400">Live Show</Link>

          {isLoggedIn ? (
            <Link to="/dashboard" className="block hover:text-yellow-400 text-xl">👨 Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="block hover:text-yellow-400">Login</Link>
              <Link to="/signin" className="block hover:text-yellow-400">Sign In</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
