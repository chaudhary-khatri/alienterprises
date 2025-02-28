"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PhoneCall, Mail, MessageCircle } from "lucide-react";

const ContactUsPage = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-teal-50 to-white flex flex-col items-center justify-center px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold text-teal-800 mb-10 text-center">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-12">
        {/* Direct Call */}
        <Link
          href="tel:+919756300040"
          className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <PhoneCall className="w-12 h-12 text-teal-600 mb-4" />
          <span className="text-xl font-semibold">Call Us</span>
          <p className="text-gray-600 mt-2">+91 9756300040</p>
        </Link>

        {/* Email */}
        <Link
          href="mailto:alienterprises54@yahoo.com"
          className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <Mail className="w-12 h-12 text-teal-600 mb-4" />
          <span className="text-xl font-semibold">Email Us</span>
          <p className="text-gray-600 mt-2">alienterprises54@yahoo.com</p>
        </Link>

        {/* WhatsApp */}
        <Link
          href="https://wa.me/+919756300040"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <MessageCircle className="w-12 h-12 text-teal-600 mb-4" />
          <span className="text-xl font-semibold">WhatsApp</span>
          <p className="text-gray-600 mt-2">Chat with us</p>
        </Link>
      </div>

      {/* Google Form Integration */}
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-teal-800 mb-4 text-center">
          Send Us a Message
        </h2>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScljzoFT096fbd8XtHv9JZqkZ6Lsiqp3zNJPfI-NISZg_wtjg/viewform?embedded=true"
          className="w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Contact Form"
        >
          Loading…
        </iframe>
      </div>
    </motion.div>
  );
};

export default ContactUsPage;
