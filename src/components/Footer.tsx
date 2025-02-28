"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-700 text-white py-12">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start">
            <Image src="/logo.svg" alt="Ali Enterprises Logo" width={64} height={64} className="mb-4" />
            <h2 className="text-xl font-semibold mb-2">Ali Enterprises</h2>
            <p className="text-sm text-gray-200 text-center md:text-left">
              GIVING SMARTNESS TO YOUR BUSINESS
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-200 hover:text-yellow-500">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-200 hover:text-yellow-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#products" className="text-gray-200 hover:text-yellow-500">
                  Products
                </Link>
              </li>

              <li>
                <Link href="/terms" className="hover:text-yellow-500">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/contactus" className="text-gray-200 hover:text-yellow-500">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="text-center md:text-left">
            <h3 className="text-lg mb-4">
              <a
                href="mailto:alienterprises54@yahoo.com"
                className="text-white hover:text-gray-300 transition-colors duration-200 no-underline"
              >
                alienterprises54@yahoo.com
              </a>
            </h3>
          </div>



          {/* Social Media Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="https://www.facebook.com/profile.php?id=100077459363321" className="text-white hover:text-yellow-500 transition-colors" aria-label="Facebook">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </Link>
              <Link href="https://www.instagram.com/alienterprises" className="text-white hover:text-yellow-500 transition-colors" aria-label="Instagram">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
              <Link href="https://www.linkedin.com/in/ali-enterprises-manufacturer-of-clay-bricks-making-machine-835276230/" className="text-white hover:text-yellow-500 transition-colors" aria-label="LinkedIn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
              <Link href="https://x.com/ALIENTE74076863" className="text-white hover:text-yellow-500 transition-colors" aria-label="Twitter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </Link>
              <Link
                href="https://www.youtube.com/@alienterprises7509"
                className="text-white hover:text-red-500 transition-colors"
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.5 6.2c-.3-1.2-1.3-2.1-2.5-2.4C18.5 3.2 12 3.2 12 3.2s-6.5 0-9 0.6c-1.2.3-2.2 1.2-2.5 2.4C0 8 0 12 0 12s0 4 .5 5.8c.3 1.2 1.3 2.1 2.5 2.4 2.5.6 9 .6 9 .6s6.5 0 9-.6c1.2-.3 2.2-1.2 2.5-2.4.5-1.8.5-5.8.5-5.8s0-4-.5-5.8zM9.6 15.5V8.5l6.4 3.5-6.4 3.5z" />
                </svg>
              </Link>

            </div>
          </div>
        </div>

        {/* Copyright & Credits */}
        <div className="border-t border-teal-600 pt-6 text-center">
          <p className="text-sm text-gray-200">&copy; 2025 Ali Enterprises. All rights reserved.</p>
          <p className="text-sm text-gray-200 mt-2">
            Developed by{" "}
            <Link
              href="https://www.instagram.com/alphabitai"
              className="text-yellow-500 hover:text-yellow-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alphabinet.com
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
