"use client";

import React, { useState, useEffect, useRef } from "react";
import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [autoSlide, setAutoSlide] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const interactionTimer = useRef<NodeJS.Timeout | null>(null);
  const autoResumeTimer = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    { 
      type: "video", 
      src: "/videos/Intro.mov",
      thumbnail: "/videos/Intro.jpg",
      alt: "Company Introduction Video"
    },
    { 
      type: "image", 
      src: "/Launching Soon.png", 
      alt: "New Product Launch" 
    },
    { 
      type: "image", 
      src: "/Discount.png", 
      alt: "Special Discount Offer" 
    },
    {
      type: "text",
      title: "Special Offer: Get 20% Off!",
      description: "Limited time offer on our best-selling products.",
    },
  ];

  // Handle slide changes and video state
  useEffect(() => {
    const currentSlideIsVideo = slides[currentSlide].type === 'video';
    if (!currentSlideIsVideo && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [currentSlide, slides]);

  // Auto-slide functionality
  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [autoSlide, slides.length]);

  // Reset interaction timers
  const resetInteractionTimer = () => {
    setAutoSlide(false);
    if (autoResumeTimer.current) clearTimeout(autoResumeTimer.current);
    autoResumeTimer.current = setTimeout(() => {
      setAutoSlide(true);
    }, 18000);
  };

  // Video control functions
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setShowControls(true);
        if (interactionTimer.current) clearTimeout(interactionTimer.current);
        interactionTimer.current = setTimeout(() => setShowControls(false), 3000);
      }
      setIsPlaying(!isPlaying);
    }
    resetInteractionTimer();
  };

  // Control visibility timeout
  const handleVideoInteraction = () => {
    setShowControls(true);
    if (interactionTimer.current) clearTimeout(interactionTimer.current);
    interactionTimer.current = setTimeout(() => setShowControls(false), 3000);
  };

  return (
    <section className="hero bg-gray-200 text-white flex flex-col lg:flex-row items-center lg:items-end justify-center px-4 py-8 lg:py-16 relative">
      {/* Slideshow Container */}
      <div className="w-full lg:w-2/3 max-w-[1280px] lg:h-[720px] relative flex items-center justify-center bg-teal-800 overflow-hidden rounded-xl shadow-lg">
        <div className="slider-container w-full h-full relative">
          <div
            className="slides flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="slide w-full flex-shrink-0 flex items-center justify-center"
                onClick={resetInteractionTimer}
                role="button"
                tabIndex={0}
              >
                {slide.type === "video" && (
                  <div 
                    className="w-full h-full relative aspect-[16/9] cursor-pointer"
                    onClick={handleVideoInteraction}
                  >
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      src={slide.src}
                      loop
                      muted
                      playsInline
                      controls={false}
                    />
                    {/* Video Thumbnail */}
                    {!isPlaying && (
                      <div className="absolute inset-0 w-full h-full">
                        <Image
                          src={slide.thumbnail}
                          alt={slide.alt}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>
                    )}
                    {/* Play/Pause Controls */}
                    {showControls && (
                      <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleVideo();
                        }}
                      >
                        {isPlaying ? (
                          <PauseCircleIcon className="w-16 h-16 text-teal-800 bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110" />
                        ) : (
                          <PlayCircleIcon className="w-16 h-16 text-teal-900 bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110" />
                        )}
                      </div>
                    )}
                  </div>
                )}

                {slide.type === "image" && (
                  <div className="w-full h-full relative aspect-[16/9]">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                )}

                {slide.type === "text" && (
                  <div className="text-center bg-teal-900 bg-opacity-75 p-8 rounded-lg shadow-lg mx-4">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-lg sm:text-xl font-light">
                      {slide.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <button
            onClick={() => {
              setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
              resetInteractionTimer();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-800 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-colors"
            aria-label="Previous slide"
          >
            &#x3c;
          </button>
          <button
            onClick={() => {
              setCurrentSlide((prev) => (prev + 1) % slides.length);
              resetInteractionTimer();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-800 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-colors"
            aria-label="Next slide"
          >
            &#x3e;
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  resetInteractionTimer();
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? "bg-white" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="w-full lg:w-1/3 lg:h-[720px] flex flex-col justify-center items-center text-center p-8 bg-gradient-to-b from-teal-600 to-teal-900 shadow-lg rounded-xl mt-4 lg:mt-0 lg:ml-4">
        <div className="relative w-48 h-48 lg:w-64 lg:h-64 mb-8 rounded-full overflow-hidden border-4 border-white shadow-2xl">
          <Image
            src="/Owner/OwnerProfile.jpg"
            alt="Founder"
            fill
            className="object-cover"
            priority
          />
        </div>

        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
          Hasan Ali
        </h2>
        <p className="text-lg lg:text-xl text-amber-300 font-medium mb-6">
          Managing Director
        </p>

        <address className="text-base lg:text-lg text-gray-200 not-italic mb-6">
          Near Nahariya Dharam Kanta<br />
          Budhana Road Khatauli<br />
          251201 Uttar Pradesh
        </address>

        <a
          href="/contact"
          className="inline-block px-8 py-3 bg-amber-400 text-teal-900 font-semibold rounded-full shadow-md hover:bg-amber-300 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
};

HeroSection.displayName = "HeroSection";

export default HeroSection;