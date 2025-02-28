"use client"; // Enables React hooks like useState in this component

import React from "react";
import Image from "next/image"; // Ensure this import is included

const DesktopProductSlider = ({ products, currentProduct, setCurrentProduct }: any) => {
  // Handle product click to change the current product
  const handleProductClick = (index: number) => {
    setCurrentProduct(index);
  };

  return (
    <div className="container mx-auto px-2 rounded-lg">
      <section className="bg-white flex flex-col py-2 lg:py-6">
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Desktop view - Product Slideshow */}
          <div className="lg:block w-full h-auto relative flex items-center justify-center overflow-hidden rounded-xl shadow-2xl" style={{ background: "linear-gradient(to right, #00bfae, #004d40)" }}>
            <div className="slider-container w-full h-full relative">
              <div className="slides flex h-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentProduct * 100}%)` }}>
                {products.map((product, index) => (
                  <div key={index} className="slide w-full flex-shrink-0 flex items-center justify-center relative" onClick={() => handleProductClick(index)}>
                    <div className="relative w-full sm:w-96 lg:w-full aspect-[16/9] overflow-hidden rounded-xl">
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg shadow-md transition-all duration-300"
                        width={1280}
                        height={720}
                        quality={100} // Ensures image is of the highest quality
                      />
                      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent opacity-90 rounded-b-xl"></div>
                    </div>
                    <div className="absolute bottom-4 left-0 w-full text-center p-4 text-white z-10">
                      <div className="bg-black bg-opacity-60 p-2 rounded-xl">
                        <h3 className="text-3xl font-semibold shadow-lg">{product.name}</h3>
                      </div>
                      <p className="text-md shadow-lg">{product.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop view - Product List with images */}
          <div className="lg:block lg:w-1/4 w-full h-auto bg-gradient-to-b from-teal-500 to-teal-700 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hidden lg:block">
            <h3 className="text-2xl font-semibold text-center mb-8">Product List</h3>
            <div className="space-y-6">
              {products.map((product, index) => (
                <button
                  key={index}
                  onClick={() => handleProductClick(index)}
                  className={`w-full text-left px-6 py-4 rounded-lg font-medium transition-all duration-300 ease-in-out ${
                    currentProduct === index
                      ? "bg-yellow-400 text-teal-900 hover:bg-yellow-500 shadow-md"
                      : "bg-teal-800 text-white hover:bg-teal-600"
                  }`}
                >
                  {product.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesktopProductSlider;
