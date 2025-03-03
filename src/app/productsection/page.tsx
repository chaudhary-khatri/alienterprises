"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface Product {
  name: string;
  image: string;
  description?: string;
}

interface RawProduct {
  name: string;
  images: string[];
  description?: string;
  // Add other fields that exist in your JSON data
}

const ProductSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAutoSlidingPaused, setIsAutoSlidingPaused] = useState<boolean>(false);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Fetch products data (corrected file name case)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/data/productsData.json");
        if (!response.ok) throw new Error("Network response was not ok");
        const data: RawProduct[] = await response.json();

        const transformedProducts: Product[] = data.map((product) => ({
          name: product.name,
          image:
            product.images?.length > 0
              ? product.images[0]
              : "/machines/default.png",
          description: product.description || "",
        }));

        setProducts(transformedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Cleanup resume timer on unmount
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoSlidingPaused && products.length > 0) {
      const timer = setTimeout(() => {
        setCurrentProduct((prev) => (prev + 1) % products.length);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [currentProduct, isAutoSlidingPaused, products.length]);

  // Manual slide control (memoized)
  const handleManualChange = useCallback((index: number) => {
    setCurrentProduct(index);
    setIsAutoSlidingPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsAutoSlidingPaused(false), 15000);
  }, []);

  // Pause auto sliding on hover and resume after a delay
  const handleMouseEnter = () => {
    setIsAutoSlidingPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handleMouseLeave = () => {
    resumeTimerRef.current = setTimeout(() => {
      setIsAutoSlidingPaused(false);
    }, 5000);
  };

  // Keyboard navigation for the slider
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      handleManualChange((currentProduct - 1 + products.length) % products.length);
    } else if (event.key === "ArrowRight") {
      handleManualChange((currentProduct + 1) % products.length);
    }
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

        {/* Desktop View */}
        <div className="hidden lg:block w-full mt-8">
          <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
            <div
              className="w-full h-auto relative flex items-center justify-center overflow-hidden rounded-xl shadow-2xl"
              style={{ background: "linear-gradient(to right, #00bfae, #004d40)" }}
            >
              <div
                className="slider-container w-full h-full relative"
                ref={sliderRef}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                aria-label="Product Slider"
              >
                <div
                  className="slides flex h-full transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentProduct * 100}%)` }}
                >
                  {products.map((product, index) => (
                    <div
                      key={product.name}
                      className="slide w-full flex-shrink-0 flex items-center justify-center relative"
                      onClick={() => handleManualChange(index)}
                      aria-label={`Slide ${index + 1}: ${product.name}`}
                    >
                      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
                        <Image
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg shadow-md"
                          width={1280}
                          height={720}
                          quality={100}
                          loading="lazy"
                        />
                        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent opacity-90 rounded-b-xl"></div>
                      </div>
                      <div className="absolute bottom-4 left-0 w-full text-center p-4 text-white z-10">
                        <div className="bg-black bg-opacity-60 p-2 rounded-xl">
                          <h3 className="text-3xl font-semibold shadow-lg">{product.name}</h3>
                        </div>
                        {product.description && (
                          <p className="text-md shadow-lg">{product.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:w-1/4 w-full h-auto bg-gradient-to-b from-teal-500 to-teal-700 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-center mb-8">Product List</h3>
              <div className="space-y-6">
                {products.map((product, index) => (
                  <button
                    key={product.name}
                    onClick={() => handleManualChange(index)}
                    className={`w-full text-left px-6 py-4 rounded-lg font-medium transition-all duration-300 ${
                      currentProduct === index
                        ? "bg-yellow-400 text-teal-900 hover:bg-yellow-500"
                        : "bg-teal-800 text-white hover:bg-teal-600"
                    }`}
                    aria-label={`Select ${product.name}`}
                  >
                    {product.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden w-full mt-8">
          <div className="w-full flex flex-col bg-gray-300 rounded-xl shadow-lg overflow-hidden">
            <div className="flex-grow w-full">
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-xl">
                <Image
                  src={products[currentProduct]?.image || "/machines/default.png"}
                  alt={products[currentProduct]?.name || "Product image"}
                  className="w-full h-full object-cover rounded-t-xl"
                  width={1280}
                  height={720}
                  loading="lazy"
                />
              </div>
              <div className="text-center px-6 py-4">
                <h3 className="text-2xl font-bold bg-teal-600 rounded-xl px-2 py-2 text-gray-100 mb-2">
                  {products[currentProduct]?.name}
                </h3>
                {products[currentProduct]?.description && (
                  <p className="text-sm text-teal-600 mb-4">
                    {products[currentProduct].description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-center items-center space-x-6 px-4 py-6 bg-teal-500 rounded-b-xl">
              <button
                className="flex items-center bg-teal-600 text-white p-4 rounded-full shadow-xl transition-all hover:bg-teal-700"
                onClick={() =>
                  handleManualChange((currentProduct - 1 + products.length) % products.length)
                }
                aria-label="Previous Slide"
              >
                <i className="fas fa-chevron-left text-2xl mr-2"></i>
                <span className="text-lg font-semibold">Previous</span>
              </button>
              <div className="border-l-2 border-white h-10"></div>
              <button
                className="flex items-center bg-teal-600 text-white p-4 rounded-full shadow-xl transition-all hover:bg-teal-700"
                onClick={() => handleManualChange((currentProduct + 1) % products.length)}
                aria-label="Next Slide"
              >
                <span className="text-lg font-semibold mr-2">Next</span>
                <i className="fas fa-chevron-right text-2xl"></i>
              </button>
            </div>
          </div>
        </div>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link href="/productsection/products">
            <button className="px-8 py-3 bg-teal-600 text-white text-lg font-semibold rounded-full shadow-xl hover:bg-teal-700 transition-all">
              Request a Quote
            </button>
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default ProductSection;
