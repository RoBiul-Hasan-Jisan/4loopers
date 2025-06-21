import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <h2 className="text-white text-lg font-semibold">Trackflix</h2>
            <p className="mt-2">
              Discover movies, shows, and trailers. Your ultimate movie tracker.
            </p>
            <p className="mt-4">
              <Link
                to="/new-to-movies"
                className="inline-block text-blue-400 hover:underline hover:text-white"
              >
                New to movies? Start your journey here.
              </Link>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-white"><FaFacebook /></a>
              <a href="#" aria-label="Twitter" className="hover:text-white"><FaTwitter /></a>
              <a href="#" aria-label="Instagram" className="hover:text-white"><FaInstagram /></a>
              <a href="#" aria-label="YouTube" className="hover:text-white"><FaYoutube /></a>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs">
          &copy; {new Date().getFullYear()} Trackflix. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
