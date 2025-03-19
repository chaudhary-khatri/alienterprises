"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Return a static class string for desktop links.
  const getLinkClasses = () => "transition-colors hover:text-yellow-500";

  return (
    <nav className="fixed w-full bg-teal-700 text-white shadow-md z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Ali Enterprises Logo" width={32} height={32} />
          <span className="text-2xl font-semibold">Ali Enterprises</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link href="#about" className={getLinkClasses()}>
            About
          </Link>
          <Link href="#products" className={getLinkClasses()}>
            Products
          </Link>
          <Link href="/terms" className={getLinkClasses()}>
            Terms &amp; Conditions
          </Link>
          <Link href="/contactus" className={getLinkClasses()}>
            Contact
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-teal-800 transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="px-4 py-4 flex flex-col space-y-2">
          <Link
            href="#about"
            className="block py-2 px-4 rounded border border-white hover:bg-teal-700 transition-colors hover:text-yellow-500"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            href="#products"
            className="block py-2 px-4 rounded border border-white hover:bg-teal-700 transition-colors hover:text-yellow-500"
            onClick={toggleMenu}
          >
            Products
          </Link>
          <Link
            href="/terms"
            className="block py-2 px-4 rounded border border-white hover:bg-teal-700 transition-colors hover:text-yellow-500"
            onClick={toggleMenu}
          >
            Terms &amp; Conditions
          </Link>
          <Link
            href="/contactus"
            className="block py-2 px-4 rounded border border-white hover:bg-teal-700 transition-colors hover:text-yellow-500"
            onClick={toggleMenu}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
