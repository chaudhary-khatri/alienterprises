"use client";

import React, { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "./herosection/page";
import ProductSection from "./productsection/page";
import AboutUsSection from "./aboutussection/page";
import TestimonialSection from "./testimonialsection/page";
import ServiceCenterSection from "./servicecentersection/page";
import FaqsSection from "./faqssection/page";
import { PhoneCall, MessageCircle } from "lucide-react";

// Dynamically import ChatBot and GrowthGraph with SSR disabled
const ChatBot = dynamic(() => import("@components/ChatBot/ChatBot"), {
  ssr: false,
  loading: () => <div className="p-4 text-center">Loading chat...</div>,
});

const GrowthGraph = dynamic(() => import("./growthgraphsection/page"), {
  ssr: false,
  loading: () => <div className="p-4 text-center">Loading graph...</div>,
});

// Motion variants for smooth animations
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

// Modern Divider Component using an SVG wave
const Divider = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="my-12"
  >
    <svg className="w-full h-6" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path fill="#e2e8f0" d="M0,256L1440,96L1440,320L0,320Z"></path>
    </svg>
  </motion.div>
);

const HomePage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* Hero Section */}
      <motion.div variants={sectionVariants}>
        <HeroSection />
      </motion.div>
      <Divider />

      {/* Product Section */}
      <motion.div variants={sectionVariants}>
        <ProductSection />
      </motion.div>
      <Divider />

      {/* About Us Section */}
      <motion.div variants={sectionVariants}>
        <AboutUsSection />
      </motion.div>
      <Divider />

      {/* Testimonial Section */}
      <motion.div variants={sectionVariants}>
        <TestimonialSection />
      </motion.div>
      <Divider />

      {/* Service Center Section */}
      <motion.div variants={sectionVariants}>
        <ServiceCenterSection />
      </motion.div>
      <Divider />

      {/* FAQ Section */}
      <motion.div variants={sectionVariants}>
        <FaqsSection />
      </motion.div>
      <Divider />

      {/* Year-on-Year Growth Section */}
      <motion.div variants={sectionVariants}>
        <Suspense fallback={<div className="p-4 text-center">Loading growth graph...</div>}>
          <GrowthGraph />
        </Suspense>
      </motion.div>
      <Divider />

      {/* ChatBot with AnimatePresence for smooth transitions */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            variants={sectionVariants}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="chatbot"
          >
            <Suspense fallback={<div className="p-4 text-center">Loading chat...</div>}>
              <ChatBot onClose={() => setIsChatOpen(false)} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Customer Support Buttons (only visible when ChatBot is closed) */}
      {!isChatOpen && (
        <motion.div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col space-y-3"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Call Support Button */}
          <motion.a
            href="tel:+919756300040"
            className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-teal-900 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
            aria-label="Call support"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PhoneCall className="w-6 h-6" />
            <span className="hidden sm:inline font-semibold text-lg">Call Support</span>
          </motion.a>

          {/* Chat Support Button */}
          <motion.button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
            aria-label="Open chat support"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="hidden sm:inline font-semibold text-lg">Chat Support</span>
          </motion.button>

          {/* WhatsApp Support Button using inline SVG */}
          <motion.a
            href="https://wa.me/919756300040?text=Hello%2C%20I%20need%20support"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
            aria-label="WhatsApp support"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.52 3.48A11.923 11.923 0 0012 0C5.373 0 0 5.373 0 12c0 2.123.555 4.136 1.605 5.928L0 24l6.208-1.635A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12 0-3.202-1.249-6.187-3.48-8.52zM12 21.452a9.41 9.41 0 01-4.764-1.312l-.342-.204-3.689.972.982-3.628-.223-.364A9.417 9.417 0 012.548 12c0-5.22 4.231-9.452 9.452-9.452 2.533 0 4.91.99 6.696 2.786A9.419 9.419 0 0121.452 12c0 5.22-4.231 9.452-9.452 9.452zm5.496-7.927c-.308-.154-1.824-.901-2.105-1.005-.28-.104-.485-.154-.69.154-.204.308-.788 1.005-.967 1.208-.18.203-.36.229-.668.083-.308-.154-1.303-.48-2.48-1.525-.916-.812-1.535-1.816-1.713-2.124-.18-.308-.02-.474.135-.627.138-.138.308-.36.462-.54.154-.18.205-.308.308-.513.103-.205.052-.384-.026-.538-.078-.154-.69-1.67-.95-2.288-.25-.602-.504-.521-.69-.53l-.59-.01c-.205 0-.54.077-.824.384-.284.308-1.08 1.055-1.08 2.573 0 1.518 1.105 2.98 1.26 3.185.155.205 2.177 3.33 5.275 4.66.738.318 1.312.507 1.76.647.738.233 1.408.2 1.94.121.593-.09 1.824-.744 2.083-1.46.26-.716.26-1.328.182-1.46-.078-.132-.28-.208-.588-.362z" />
            </svg>
            <span className="hidden sm:inline font-semibold text-lg">
              WhatsApp
            </span>
          </motion.a>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HomePage;
