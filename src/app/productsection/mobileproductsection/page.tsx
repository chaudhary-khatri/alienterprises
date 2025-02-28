import React from "react";
import Image from "next/image";

const MobileProductSlider = ({ products, currentProduct, setCurrentProduct }) => {
  return (
    <div className="lg:hidden w-full flex flex-col bg-gray-300 rounded-xl shadow-lg overflow-hidden">
      <div className="flex-grow w-full">
        {/* Product Image */}
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-xl mb-4">
          <Image
            src={products[currentProduct].image}
            alt={products[currentProduct].name}
            className="w-full h-full object-cover rounded-t-xl shadow-md transition-all duration-300"
            width={1280}
            height={720}
          />
        </div>

        {/* Product Name and Description */}
        <div className="text-center px-6 py-4 h-15 overflow-hidden">
          <h3 className="text-2xl font-bold bg-teal-600 rounded-xl px-2 py-2 text-gray-100 mb-2">{products[currentProduct].name}</h3>
          <p className="text-sm text-teal-600 mb-4">{products[currentProduct].description}</p>
        </div>
      </div>

      {/* Product Slider (Previous and Next buttons with divider) */}
      <div className="flex flex-row justify-center items-center space-x-6 px-4 py-6 bg-teal-500 rounded-b-xl">
        {/* Previous Button */}
        <div
          className="flex items-center justify-center cursor-pointer bg-teal-600 text-white p-4 sm:px-6 sm:py-4 rounded-full shadow-xl transition-all duration-300 ease-in-out hover:bg-teal-700 transform hover:scale-110 focus:outline-none w-full sm:w-auto"
          onClick={() => setCurrentProduct((prev) => (prev - 1 + products.length) % products.length)}
        >
          <i className="fas fa-chevron-left text-2xl mr-2"></i> {/* Left Arrow Icon */}
          <span className="text-lg font-semibold">Previous</span>
        </div>

        {/* Divider */}
        <div className="border-l-2 border-white h-10"></div>

        {/* Next Button */}
        <div
          className="flex items-center justify-center cursor-pointer bg-teal-600 text-white p-4 sm:px-6 sm:py-4 rounded-full shadow-xl transition-all duration-300 ease-in-out hover:bg-teal-700 transform hover:scale-110 focus:outline-none w-full sm:w-auto"
          onClick={() => setCurrentProduct((prev) => (prev + 1) % products.length)}
        >
          <span className="text-lg font-semibold mr-2">Next</span>
          <i className="fas fa-chevron-right text-2xl"></i>
        </div>
      </div>
    </div>
  );
};

export default MobileProductSlider;
