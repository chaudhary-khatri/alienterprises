"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer,
  memo
} from "react";
import Image from "next/image";
import Player from "@vimeo/player";

// --- Constants --- //
const AUTO_SLIDE_INTERVAL = 10000;
const AUTO_RESUME_TIMEOUT = 18000;
const SWIPE_THRESHOLD = 50;

// --- Type Definitions --- //
type VideoSlide = {
  type: "video";
  src: string;        // Vimeo video ID
  hash?: string;      // Optional hash for private videos
  thumbnail: string;
  alt: string;
};

type ImageSlide = {
  type: "image";
  src: string;
  alt: string;
};

type TextSlide = {
  type: "text";
  title: string;
  description: string;
};

type Slide = VideoSlide | ImageSlide | TextSlide;

type SliderState = {
  currentSlide: number;
  isTransitioning: boolean;
};

type Action =
  | { type: "GO_TO"; payload: number }
  | { type: "NEXT"; total: number }
  | { type: "PREV"; total: number }
  | { type: "END_TRANSITION" };

// --- Slides Configuration --- //
const slides: Slide[] = [
  {
    type: "video",
    src: "1061541347",
    hash: "0cc9da38b8", // Provided hash from your Vimeo link
    thumbnail: "/videos/Intro.jpg",
    alt: "Intro",
  },
  {
    type: "image",
    src: "/Launching Soon.png",
    alt: "New Product Launch",
  },
  {
    type: "image",
    src: "/Discount.png",
    alt: "Special Discount Offer",
  },
  {
    type: "text",
    title: "Special Offer: Get 20% Off!",
    description: "Limited time offer on our best-selling products.",
  },
];

// --- Reducer for State Management --- //
function sliderReducer(state: SliderState, action: Action): SliderState {
  switch (action.type) {
    case "GO_TO":
      return { ...state, currentSlide: action.payload, isTransitioning: true };
    case "NEXT":
      return {
        ...state,
        currentSlide: (state.currentSlide + 1) % action.total,
        isTransitioning: true,
      };
    case "PREV":
      return {
        ...state,
        currentSlide: (state.currentSlide - 1 + action.total) % action.total,
        isTransitioning: true,
      };
    case "END_TRANSITION":
      return { ...state, isTransitioning: false };
    default:
      return state;
  }
}

// --- Vimeo Slide with Play/Pause, Auto-Slide Control, and Overlay Icon --- //
type VimeoSlideContentProps = {
  slide: VideoSlide;
  onVideoStatusChange?: (isPlaying: boolean) => void;
};

const VimeoSlideContent = ({ slide, onVideoStatusChange }: VimeoSlideContentProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  // videoStarted is false initially so that thumbnail is shown
  const [videoStarted, setVideoStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerInstanceRef = useRef<Player | null>(null);

  // Load video when visible.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          setIsLoaded(true);
        }
      },
      { rootMargin: "200px" }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [isLoaded]);

  // Initialize the Vimeo Player when video is started.
  useEffect(() => {
    if (isLoaded && videoStarted && iframeRef.current) {
      if (!playerInstanceRef.current) {
        playerInstanceRef.current = new Player(iframeRef.current);
        playerInstanceRef.current.on("play", () => {
          setIsPlaying(true);
          if (onVideoStatusChange) {
            onVideoStatusChange(true);
          }
        });
        playerInstanceRef.current.on("pause", () => {
          setIsPlaying(false);
          if (onVideoStatusChange) {
            onVideoStatusChange(false);
          }
        });
      }
    }
    return () => {
      if (playerInstanceRef.current) {
        playerInstanceRef.current.unload().catch(() => {});
        playerInstanceRef.current = null;
      }
    };
  }, [isLoaded, videoStarted, onVideoStatusChange]);

  // Toggle play/pause when clicked.
  const togglePlayPause = useCallback(() => {
    if (!videoStarted) {
      setVideoStarted(true);
      // Allow iframe to render before starting playback.
      setTimeout(() => {
        if (playerInstanceRef.current) {
          playerInstanceRef.current.play();
        }
      }, 100);
    } else {
      if (playerInstanceRef.current) {
        if (isPlaying) {
          playerInstanceRef.current.pause();
        } else {
          playerInstanceRef.current.play();
        }
      }
    }
  }, [videoStarted, isPlaying]);

  // Build the embed URL without autoplay so the video stays paused.
  const queryParams = slide.hash
    ? `?h=${slide.hash}&muted=1&loop=1`
    : `?muted=1&loop=1`;

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative aspect-[4/3] lg:aspect-video"
      onClick={togglePlayPause}
    >
      {(!videoStarted || !isLoaded) && (
        <Image
          src={slide.thumbnail}
          alt={slide.alt}
          fill
          className="object-cover"
          priority
        />
      )}
      {isLoaded && (
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${slide.src}${queryParams}`}
          className="w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      )}
      {/* Overlay Icon */}
      {(!videoStarted || !isPlaying) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlayPause();
            }}
            className="bg-black bg-opacity-50 rounded-full p-3"
          >
            <svg
              className="w-12 h-12 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

VimeoSlideContent.displayName = "VimeoSlideContent";

const ImageSlideContent = memo(({ slide }: { slide: ImageSlide }) => (
  <div className="w-full h-full relative aspect-[4/3] lg:aspect-video">
    <Image
      src={slide.src}
      alt={slide.alt}
      fill
      className="object-cover"
      loading="lazy"
      decoding="async"
    />
  </div>
));
ImageSlideContent.displayName = "ImageSlideContent";

const TextSlideContent = memo(({ slide }: { slide: TextSlide }) => (
  <div className="text-center bg-teal-900/75 p-8 rounded-lg shadow-lg mx-4 backdrop-blur-sm">
    <h1 className="text-2xl sm:text-3xl font-bold mb-4">{slide.title}</h1>
    <p className="text-lg sm:text-xl font-light">{slide.description}</p>
  </div>
));
TextSlideContent.displayName = "TextSlideContent";

type SlideContentProps = {
  slide: Slide;
  onVideoStatusChange?: (isPlaying: boolean) => void;
};

const SlideContent = ({ slide, onVideoStatusChange }: SlideContentProps) => {
  switch (slide.type) {
    case "video":
      return <VimeoSlideContent slide={slide} onVideoStatusChange={onVideoStatusChange} />;
    case "image":
      return <ImageSlideContent slide={slide} />;
    case "text":
      return <TextSlideContent slide={slide} />;
    default:
      return null;
  }
};

SlideContent.displayName = "SlideContent";

// --- Touch Handling Hook --- //
const useTouchSwiping = (
  onSwipeLeft: () => void,
  onSwipeRight: () => void
) => {
  const touchStartX = useRef(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
        if (deltaX > 0) {
          onSwipeRight();
        } else {
          onSwipeLeft();
        }
      }
    },
    [onSwipeLeft, onSwipeRight]
  );

  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchEnd, handleTouchStart]);
};

// --- Navigation Controls --- //
const NavigationControls = ({
  onSlideChange,
}: {
  onSlideChange: (direction: "prev" | "next") => void;
}) => (
  <>
    <button
      onClick={() => onSlideChange("prev")}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-800 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
      aria-label="Previous slide"
    >
      &larr;
    </button>
    <button
      onClick={() => onSlideChange("next")}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-800 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
      aria-label="Next slide"
    >
      &rarr;
    </button>
  </>
);
NavigationControls.displayName = "NavigationControls";

// --- Slide Indicators --- //
const SlideIndicators = ({
  count,
  current,
  onChange,
}: {
  count: number;
  current: number;
  onChange: (index: number) => void;
}) => (
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
    {Array.from({ length: count }).map((_, index) => (
      <button
        key={index}
        onClick={() => onChange(index)}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          current === index ? "bg-white scale-125" : "bg-gray-300/80"
        }`}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
);
SlideIndicators.displayName = "SlideIndicators";

// --- Founder Section --- //
const FounderSection = () => (
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
    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">Hasan Ali</h2>
    <p className="text-lg lg:text-xl text-amber-300 font-medium mb-6">
      Managing Director
    </p>
    <address className="text-base lg:text-lg text-gray-200 not-italic mb-6">
      Near Nahariya Dharam Kanta
      <br />
      Budhana Road Khatauli
      <br />
      251201 Uttar Pradesh
    </address>
    <a
      href="/contactus"
      className="inline-block px-8 py-3 bg-amber-400 text-teal-900 font-semibold rounded-full shadow-md hover:bg-amber-300 transition-colors"
    >
      Contact Us
    </a>
  </div>
);
FounderSection.displayName = "FounderSection";

// --- Main Hero Component --- //
const HeroSection = () => {
  const [state, dispatch] = useReducer(sliderReducer, {
    currentSlide: 0,
    isTransitioning: false,
  });
  const [autoSlide, setAutoSlide] = useState(true);

  // Disable auto-slide when a video is playing.
  const handleVideoStatusChange = useCallback((isPlaying: boolean) => {
    setAutoSlide(!isPlaying);
  }, []);

  const resetInteractionTimer = useCallback(() => {
    setAutoSlide(false);
    setTimeout(() => {
      setAutoSlide(true);
    }, AUTO_RESUME_TIMEOUT);
  }, []);

  const handleSlideChange = useCallback(
    (direction: "prev" | "next" | number) => {
      if (typeof direction === "number") {
        dispatch({ type: "GO_TO", payload: direction });
      } else {
        dispatch({
          type: direction === "next" ? "NEXT" : "PREV",
          total: slides.length,
        });
      }
      resetInteractionTimer();
    },
    [resetInteractionTimer]
  );

  useTouchSwiping(
    () => handleSlideChange("next"),
    () => handleSlideChange("prev")
  );

  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(() => {
        dispatch({ type: "NEXT", total: slides.length });
      }, AUTO_SLIDE_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [autoSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handleSlideChange("prev");
      }
      if (e.key === "ArrowRight") {
        handleSlideChange("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSlideChange]);

  return (
    <section className="hero bg-gray-200 text-white flex flex-col lg:flex-row items-center justify-center px-4 py-8 lg:py-16 relative">
      <div className="w-full lg:w-2/3 max-w-[1280px] lg:h-[720px] relative flex items-center justify-center bg-teal-800 overflow-hidden rounded-xl shadow-lg">
        <div className="slider-container w-full h-full relative">
          <div
            className="slides flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${state.currentSlide * 100}%)` }}
            onTransitionEnd={() => dispatch({ type: "END_TRANSITION" })}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="slide w-full flex-shrink-0 flex items-center justify-center"
                role="group"
                aria-label={`Slide ${index + 1} of ${slides.length}`}
                aria-hidden={state.currentSlide !== index}
              >
                <SlideContent
                  slide={slide}
                  onVideoStatusChange={
                    slide.type === "video" ? handleVideoStatusChange : undefined
                  }
                />
              </div>
            ))}
          </div>

          <NavigationControls onSlideChange={handleSlideChange} />
          <SlideIndicators
            count={slides.length}
            current={state.currentSlide}
            onChange={handleSlideChange}
          />
        </div>
      </div>

      <FounderSection />
    </section>
  );
};

HeroSection.displayName = "HeroSection";

export default HeroSection;
