"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Testimonial = {
  name: string;
  image: string;
  quote: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    name: "John Doe",
    image: "/profile 1.png",
    quote:
      "Ali Enterprises provided us with the most efficient and reliable construction machines. Our projects are always ahead of schedule thanks to their top-notch equipment!",
    role: "CEO, XYZ Construction",
  },
  {
    name: "Jane Smith",
    image: "/profile 2.png",
    quote:
      "The quality and efficiency of Ali Enterprises' equipment have been incredible. We've been using their products for years, and the performance speaks for itself!",
    role: "Project Manager, ABC Builders",
  },
  {
    name: "Michael Lee",
    image: "/profile 3.png",
    quote:
      "Their equipment is second to none. We rely on Ali Enterprises for all of our construction needs, and they've consistently exceeded our expectations!",
    role: "Construction Supervisor, LMN Corp",
  },
  {
    name: "Sara Wilson",
    image: "/profile 4.png",
    quote:
      "Working with Ali Enterprises was a game changer for our business. Their machines have helped us increase productivity and complete projects ahead of schedule.",
    role: "Founder, Wilson Group",
  },
  {
    name: "David Brown",
    image: "/profile 5.png",
    quote:
      "Ali Enterprises has provided us with exceptional machinery. Their customer service and after-sales support are unmatched.",
    role: "Manager, Brown Construction",
  },
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically cycle testimonials every 5 seconds.
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // Variants for the fade animation.
  const testimonialVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <section
      id="testimonials"
      className="py-16 bg-gradient-to-b from-gray-200 via-white to-gray-100"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8 sm:mb-12">
          What Our Clients Say
        </h2>

        <div className="relative">
          <div className="min-h-[250px] sm:min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={testimonialVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.7 }}
                className="bg-white shadow-xl rounded-xl p-6 sm:p-8 text-center mx-auto max-w-full sm:max-w-2xl"
              >
                <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full mx-auto border-4 border-teal-500 mb-4 overflow-hidden">
                  <Image
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-700">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-xs sm:text-sm text-teal-600 font-medium mb-4">
                  {testimonials[currentIndex].role}
                </p>
                <p className="text-sm sm:text-base text-gray-600 italic">
                  &quot;{testimonials[currentIndex].quote}&quot;
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-teal-600 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-teal-700 transition-colors focus:outline-none"
            aria-label="Previous Testimonial"
          >
            &#8249;
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-teal-600 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-teal-700 transition-colors focus:outline-none"
            aria-label="Next Testimonial"
          >
            &#8250;
          </button>
        </div>

        {/* Slider Dots */}
        <div className="flex justify-center mt-4 sm:mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 mx-1 sm:mx-2 rounded-full transition-colors ${
                currentIndex === index
                  ? "bg-teal-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
