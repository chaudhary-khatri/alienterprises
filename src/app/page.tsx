"use client";

import React, { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "./heroSection/page";
import ProductSection from "./productsection/page";
import AboutUsSection from "./aboutussection/page";
import TestimonialSection from "./testimonialSection/page";
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
            href="tel:+1234567890"
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
        </motion.div>
      )}
    </motion.div>
  );
};

export default HomePage;
