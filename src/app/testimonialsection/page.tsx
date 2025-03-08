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
    name: "Param Hassan Dubey",
    image: "/profile 1.png",
    quote:
      "The brick making machine from Ali Enterprises has transformed our operations. It’s reliable and has boosted our production tremendously. I’m really pleased with the quality and support.",
    role: "MD",
  },
  {
    name: "Pramod",
    image: "/profile 2.png",
    quote:
      "Ali Enterprises' brick machine is a real game changer. It runs smoothly, slashes production time, and the service is excellent.",
    role: "Owner",
  },
  {
    name: "Ajay Shah",
    image: "/profile 3.png",
    quote:
      "We installed their brick making machine last year and it consistently delivers high-quality bricks. The machine is robust and maintenance is hassle-free.",
    role: "MD",
  },
  {
    name: "Pintu Singh",
    image: "/profile 4.png",
    quote:
      "The brick making equipment is very efficient—it produces top-notch bricks and saves us loads of time. I truly appreciate the friendly, professional service.",
    role: "Owner",
  },
  {
    name: "Server Ahmed",
    image: "/profile 5.png",
    quote:
      "Our production has improved immensely with the brick making machine from Ali Enterprises. It’s dependable and the after-sales support is commendable.",
    role: "MD",
  },
  {
    name: "Adil Khan",
    image: "/profile 6.png",
    quote:
      "I am very satisfied with the brick making machine. It delivers consistent performance, and the team at Ali Enterprises is always ready to help.",
    role: "Owner",
  },
  {
    name: "Dipu Singh",
    image: "/profile 7.png",
    quote:
      "The machine has made our brick production much easier and more efficient. Its durability and performance are truly impressive.",
    role: "MD",
  },
  {
    name: "Rajesh Singh",
    image: "/profile 8.png",
    quote:
      "Ali Enterprises offers a brick making machine that stands out in quality and efficiency. It has streamlined our operations, and the support is top-notch.",
    role: "Owner",
  },
  {
    name: "Rajesh Kumar",
    image: "/profile 9.png",
    quote:
      "The brick machine is reliable and has significantly improved our productivity. I would highly recommend Ali Enterprises for quality equipment.",
    role: "MD",
  },
  {
    name: "Ashish Singh",
    image: "/profile 10.png",
    quote:
      "We’ve been using the brick making machine from Ali Enterprises for a while now and it never disappoints. Its performance is excellent.",
    role: "Owner",
  },
  {
    name: "Servicing",
    image: "/profile 11.png",
    quote:
      "The efficiency of the brick making machine is impressive. It has reduced downtime and increased output. Great service and support all around.",
    role: "MD",
  },
  {
    name: "Suryakant",
    image: "/profile 12.png",
    quote:
      "Our brick production has become much more consistent thanks to this machine. It’s efficient and the support team is very responsive.",
    role: "Owner",
  },
  {
    name: "ID rish",
    image: "/profile 13.png",
    quote:
      "The machine has enhanced our brick making process. It’s easy to operate and maintain, and the quality of bricks is superb.",
    role: "MD",
  },
  {
    name: "Ankit Singh",
    image: "/profile 14.png",
    quote:
      "I highly recommend the brick making machine from Ali Enterprises. It’s a solid investment that has boosted our production efficiency.",
    role: "Owner",
  },
  {
    name: "Sudarshan single",
    image: "/profile 15.png",
    quote:
      "This brick making machine is very effective. It runs smoothly and has significantly increased our production rate. I’m very pleased with the results.",
    role: "MD",
  },
  {
    name: "Balwant Singh",
    image: "/profile 16.png",
    quote:
      "I am impressed with the quality of the brick machine. It has boosted our output and the service from Ali Enterprises is commendable.",
    role: "Owner",
  },
  {
    name: "Anil Kumar",
    image: "/profile 17.png",
    quote:
      "The brick making machine is reliable and performs exceptionally well. It has reduced our workload and increased efficiency across the board.",
    role: "MD",
  },
  {
    name: "Harpal Pannu",
    image: "/profile 18.png",
    quote:
      "I am very happy with the brick making machine from Ali Enterprises. It is user-friendly and delivers consistent, high-quality bricks every time.",
    role: "Owner",
  },
  {
    name: "Kuldeep Singh",
    image: "/profile 19.png",
    quote:
      "The machine has completely transformed our brick production process. It is robust, efficient, and the support from the team is excellent.",
    role: "MD",
  },
  {
    name: "Manoj Kumar",
    image: "/profile 20.png",
    quote:
      "Ali Enterprises' brick making machine is top-notch. It has made our operations smoother and more productive, and the service is excellent.",
    role: "Owner",
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
