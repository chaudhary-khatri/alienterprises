"use client";

import React from "react";
import { motion } from "framer-motion";

const AboutUsSection = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-12 sm:py-16 bg-gray-200 text-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Introduction */}
        <motion.div variants={childVariants} className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-teal-700 inline-block border-b-4 border-teal-600">
            About Ali Enterprises
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Based in Uttar Pradesh, Ali Enterprises is a leading manufacturer of high-quality brick-making machines. We provide reliable machinery solutions and comprehensive aftersales services that power the construction industry.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          variants={containerVariants}
        >
          <motion.div
            variants={childVariants}
            whileHover={{ scale: 1.02 }}
            className="p-6 sm:p-8 bg-white rounded-lg shadow-lg border border-gray-300"
          >
            <h3 className="text-lg sm:text-xl font-bold text-teal-600 border-b-2 border-teal-600 pb-2">
              Our Mission
            </h3>
            <p className="mt-4 text-base sm:text-lg text-gray-700">
              To manufacture top-tier brick-making machines and offer exceptional aftersales support, enhancing productivity and supporting the growth of the construction industry.
            </p>
          </motion.div>
          <motion.div
            variants={childVariants}
            whileHover={{ scale: 1.02 }}
            className="p-6 sm:p-8 bg-white rounded-lg shadow-lg border border-gray-300"
          >
            <h3 className="text-lg sm:text-xl font-bold text-teal-600 border-b-2 border-teal-600 pb-2">
              Our Vision
            </h3>
            <p className="mt-2 text-base sm:text-lg text-gray-700">
              To be recognized as a leading innovator in the brick-making industry, providing advanced, durable machinery and exceptional customer service for a sustainable future in construction.
            </p>
          </motion.div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          variants={childVariants}
          whileHover={{ scale: 1.02 }}
          className="mt-12"
        >
          <div className="p-6 sm:p-8 bg-white rounded-lg shadow-2xl border border-gray-300">
            <h3 className="text-lg sm:text-xl text-teal-700 font-bold border-b-2 border-teal-600 pb-2">
              Why Choose Us?
            </h3>
            <p className="mt-4 text-base sm:text-lg">
              Our commitment to quality, innovation, and customer satisfaction has made us the preferred partner for businesses across the construction sector. We ensure that our machinery and services meet the highest standards, helping our clients build with confidence.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutUsSection;
