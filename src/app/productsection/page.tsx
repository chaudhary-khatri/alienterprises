"use client"; // Enables React hooks in this component

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import DesktopProductSlider from "./desktopproductsection/page";
import MobileProductSlider from "./mobileproductsection/page";

// Simplified product interface with only name and image.
interface SimpleProduct {
  name: string;
  image: string;
}

const ProductSection = () => {
  const [products, setProducts] = useState<SimpleProduct[]>([]);
  const [currentProduct, setCurrentProduct] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAutoSlidingPaused, setIsAutoSlidingPaused] = useState<boolean>(false);

  // Ref to store the timer that resumes auto sliding after manual interaction.
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch products data.
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/data/ProductsData.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Map each product to include only the name and the first valid image.
        const transformedProducts: SimpleProduct[] = data.map((product: any) => {
          const imageUrl =
            Array.isArray(product.images) && product.images[0]
              ? product.images[0]
              : "/machines/default.png"; // Fallback image if none available
          return {
            name: product.name,
            image: imageUrl,
          };
        });

        setProducts(transformedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Auto sliding effect: advances product every 10 seconds if auto sliding is active.
  useEffect(() => {
    if (!isAutoSlidingPaused && products.length > 0) {
      const timer = setTimeout(() => {
        setCurrentProduct((prev) => (prev + 1) % products.length);
      }, 10000); // 10 seconds
      return () => clearTimeout(timer);
    }
  }, [currentProduct, isAutoSlidingPaused, products.length]);

  // Cleanup resume timer on component unmount.
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  // Wrapper function to handle manual slide changes.
  const handleManualChange = (index: number) => {
    // Update the product index immediately.
    setCurrentProduct(index);
    // Pause auto sliding.
    setIsAutoSlidingPaused(true);
    // Clear any existing resume timer.
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    // Resume auto sliding after 15 seconds of inactivity.
    resumeTimerRef.current = setTimeout(() => {
      setIsAutoSlidingPaused(false);
    }, 15000); // 15 seconds
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-lg text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 rounded-lg"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <section id="products" className="bg-white flex flex-col py-2 lg:py-16">
        <motion.h1
          className="text-4xl font-bold text-center text-teal-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Products
        </motion.h1>

        <motion.div
          className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Desktop View (visible on large screens) */}
          <div className="hidden lg:block w-full">
            <DesktopProductSlider
              products={products}
              currentProduct={currentProduct}
              setCurrentProduct={handleManualChange}
            />
          </div>

          {/* Mobile View (visible on mobile screens) */}
          <div className="lg:hidden w-full">
            <MobileProductSlider
              products={products}
              currentProduct={currentProduct}
              setCurrentProduct={handleManualChange}
            />
          </div>
        </motion.div>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link href="/productsection/products">
            <button className="px-8 py-3 bg-teal-600 text-white text-lg font-semibold rounded-full shadow-xl hover:bg-teal-700 hover:shadow-2xl transition-all duration-300">
              Request a Quote
            </button>
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default ProductSection;
