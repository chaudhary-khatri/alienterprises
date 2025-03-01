"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ZoomIn, ZoomOut } from "lucide-react"; // Removed ArrowUp and List

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  specs: {
    [category: string]: string[];
  };
}

const SKELETON_ITEMS = 3;
const GOOGLE_FORM_URL =
  process.env.NEXT_PUBLIC_GOOGLE_FORM_URL ||
  "https://docs.google.com/forms/d/e/...";

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const controller = new AbortController();
      const { signal } = controller;

      const response = await fetch("/data/productsData.json", { signal });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      // Cast the response data as Product[]
      const data: Product[] = await response.json();
      // Validate product data with price fallback
      const validatedData = data.map((product) => ({
        ...product,
        price: typeof product.price === "number" ? product.price : 0,
        images:
          product.images?.length > 0 ? product.images : ["/default-image.jpg"],
      }));
      setProducts(validatedData);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      console.error("Error fetching products:", err);
      setError(err instanceof Error ? err.message : "Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleBookNow = (product: Product) => {
    void product;
    window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
  };
    

  if (loading) return <SkeletonLoader count={SKELETON_ITEMS} />;
  if (error) return <ErrorState error={error} onRetry={fetchProducts} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
        Our <span className="text-teal-600">Machinery</span>
      </h1>

      <div className="grid grid-cols-1 gap-12">
        {products.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <div className="text-gray-500 text-xl mb-4">
              🚜 No products available
            </div>
            <button
              onClick={fetchProducts}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Refresh listings
            </button>
          </div>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBookNow={handleBookNow}
            />
          ))
        )}
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/productsection/products"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          prefetch
        >
          Explore Full Product Range
          <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

const ProductCard = ({
  product,
  onBookNow,
}: {
  product: Product;
  onBookNow: (product: Product) => void;
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [zoom, setZoom] = useState(1);

  const images =
    product.images?.length > 0 ? product.images : ["/default-image.jpg"];
  const hasMultipleImages = images.length > 1;

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom((prev) => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom((prev) => Math.max(prev / 1.2, 1));
  };

  return (
    <div className="group rounded-2xl border border-gray-300 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-out">
      <div className="flex flex-col lg:flex-row">
        <div className="relative lg:w-1/2 xl:w-2/5 h-72 lg:h-96 rounded-lg border bg-gray-100">
          <div className="relative h-full w-full rounded-xl overflow-hidden">
            <Image
              src={images[activeImageIndex]}
              alt={`${product.name} - Image ${activeImageIndex + 1}`}
              layout="fill"
              objectFit="contain"
              quality={100}
              className={`transition-opacity transition-transform duration-500 ${
                isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoadingComplete={() => setIsImageLoaded(true)}
              style={{
                transform: `scale(${isImageLoaded ? zoom : zoom * 0.95})`,
              }}
            />

            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
              <button
                onClick={handleZoomIn}
                aria-label="Zoom in"
                className="bg-white/80 p-2 rounded-full shadow-sm hover:bg-white transition-colors"
              >
                <ZoomIn size={20} />
              </button>
              <button
                onClick={handleZoomOut}
                aria-label="Zoom out"
                className="bg-white/80 p-2 rounded-full shadow-sm hover:bg-white transition-colors"
              >
                <ZoomOut size={20} />
              </button>
            </div>

            {/* Image Navigation Buttons */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsImageLoaded(false);
                    setActiveImageIndex(
                      (prev) => (prev > 0 ? prev - 1 : images.length - 1)
                    );
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-sm hover:bg-white transition-colors"
                  aria-label="Previous image"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsImageLoaded(false);
                    setActiveImageIndex(
                      (prev) => (prev < images.length - 1 ? prev + 1 : 0)
                    );
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-sm hover:bg-white transition-colors"
                  aria-label="Next image"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>

          {hasMultipleImages && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsImageLoaded(false);
                    setActiveImageIndex(index);
                  }}
                  className={`w-12 h-12 rounded-lg border-2 overflow-hidden transition-all ${
                    index === activeImageIndex
                      ? "border-teal-500 scale-110"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={1080}
                    height={720}
                    className="object-cover h-full w-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-8 lg:p-10 flex flex-col flex-1 lg:w-1/2 xl:w-3/5">
          <h2 className="text-3xl font-extrabold rounded-lg text-teal-900 mb-4">
            {product.name}
          </h2>

          <div className="mb-6 bg-teal-50/50 p-4 rounded-lg border border-teal-100">
            <div className="flex items-center gap-3">
              <span className="text-lg font-medium text-teal-800">
                Excl. GST:
              </span>
              <span className="text-2xl font-bold text-teal-700">
                ₹{(product.price ?? 0).toLocaleString()}
              </span>
            </div>
          </div>

          <p className="text-gray-600 mb-4 border px-2 py-1 rounded-lg text-md leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-6 mb-8 flex-1">
            {Object.entries(product.specs).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-md font-semibold text-teal-800 mb-3 border-b border-gray-200 pb-2">
                  {category}
                </h3>
                <ul className="space-y-2.5">
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center text-gray-700 text-md"
                    >
                      <svg
                        className="w-4 h-4 text-teal-500 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <button
            onClick={() => onBookNow(product)}
            className="mt-auto w-full lg:w-3/4 xl:w-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 px-8 py-4 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            aria-label={`Book now for ${product.name}`}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

const SkeletonLoader = ({ count }: { count: number }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center animate-pulse">
      <span className="text-gray-300">Our</span>{" "}
      <span className="text-gray-300">Machinery</span>
    </h1>
    <div className="grid grid-cols-1 gap-12">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-xl overflow-hidden animate-pulse"
        >
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 xl:w-2/5 h-72 lg:h-96 bg-gray-200 relative">
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-12 h-12 bg-gray-300 rounded-lg" />
                ))}
              </div>
            </div>
            <div className="p-8 lg:p-10 flex flex-col flex-1 lg:w-1/2 xl:w-3/5">
              <div className="h-9 bg-gray-200 rounded-full w-3/4 mb-6" />
              <div className="h-24 bg-gray-200 rounded-xl mb-6" />
              <div className="h-5 bg-gray-200 rounded w-full mb-4" />
              <div className="h-5 bg-gray-200 rounded w-5/6 mb-4" />
              <div className="h-5 bg-gray-200 rounded w-2/3 mb-8" />
              <div className="space-y-6 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
                    {[1, 2].map((j) => (
                      <div
                        key={j}
                        className="h-4 bg-gray-200 rounded w-3/4 ml-4 my-2"
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="h-14 bg-gray-200 rounded-xl w-1/2 mt-auto" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ErrorState = ({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) => (
  <div className="min-h-screen flex items-center justify-center p-6">
    <div className="text-center max-w-2xl">
      <div className="text-6xl mb-6">🚨</div>
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Oops! Something went wrong
      </h2>
      <p className="text-gray-600 mb-8 text-lg">{error}</p>
      <button
        onClick={onRetry}
        className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors duration-300 transform hover:scale-105"
      >
        Try Again
      </button>
    </div>
  </div>
);
