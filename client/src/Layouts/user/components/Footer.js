// Footer.js
import React from "react";

function Footer() {
  return (
    <footer className="bg-orange-200 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Logo and Description */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h1 className="text-2xl font-bold">Bookify</h1>
          <p className="text-sm text-gray-400">
            Your go-to app for managing and discovering books.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h2 className="font-semibold">Quick Links</h2>
          <ul className="text-gray-400 space-y-2">
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact and Social Media */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h2 className="font-semibold">Contact Us</h2>
          <p className="text-sm text-gray-400">info@bookify.com</p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" className="hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" className="hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Bookify. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
