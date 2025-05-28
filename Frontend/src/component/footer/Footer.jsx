import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold">YourBrand</h2>
          <p className="text-gray-400 mt-2">Empowering your journey with quality services.</p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-blue-500">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-sky-400">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-700">
              <FaLinkedinIn size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-red-500">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p className="text-gray-400">Email: support@yourbrand.com</p>
          <p className="text-gray-400">Phone: +123 456 7890</p>
          <p className="text-gray-400">Address: 123 Street, City, Country</p>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Subscribe</h3>
          <p className="text-gray-400 mb-3">Stay updated with our latest news.</p>
          <div className="flex items-center">
            <input type="email" placeholder="Enter your email" className="p-2 rounded-l bg-gray-800 text-white border border-gray-700 focus:outline-none w-full" />
            <button className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 text-center border-t border-gray-700 pt-4 text-gray-400">
        © {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
