"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");

  // Update active hash when window.location.hash changes.
  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Function to conditionally apply active styling.
  const getLinkClasses = (href: string) => {
    // For hash links:
    if (href.startsWith("#")) {
      return `transition-colors hover:text-yellow-500 ${
        activeHash === href ? "text-yellow-500 font-bold" : ""
      }`;
    }
    // For full page routes:
    return `transition-colors hover:text-yellow-500 ${
      pathname === href ? "text-yellow-500 font-bold" : ""
    }`;
  };

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
          <Link href="#about" className={getLinkClasses("#about")}>
            About
          </Link>
          <Link href="#products" className={getLinkClasses("#products")}>
            Products
          </Link>
          <Link href="/terms" className={getLinkClasses("/terms")}>
            Terms &amp; Conditions
          </Link>
          <Link href="/contactus" className={getLinkClasses("/contactus")}>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-teal-700 transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-4 py-2 flex flex-col space-y-2">
          <Link
            href="#about"
            className={`block py-2 ${getLinkClasses("#about")}`}
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            href="#products"
            className={`block py-2 ${getLinkClasses("#products")}`}
            onClick={toggleMenu}
          >
            Products
          </Link>
          <Link
            href="/terms"
            className={`block py-2 ${getLinkClasses("/terms")}`}
            onClick={toggleMenu}
          >
            Terms &amp; Conditions
          </Link>
          <Link
            href="/contactus"
            className={`block py-2 ${getLinkClasses("/contactus")}`}
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
