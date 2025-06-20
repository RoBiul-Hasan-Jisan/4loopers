
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const FanFavourites = () => {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedCard, setFlippedCard] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);

  // New state for data
  const [fanFavorites, setFanFavorites] = useState([]);

  const scrollByValue = 240;

  // Fetch fanFavorites data on component mount
  useEffect(() => {
    fetch("http://localhost:5000/fan-favorites")  // Your backend API
      .then((res) => res.json())
      .then((data) => setFanFavorites(data))
      .catch((err) => console.error("Failed to fetch fan favorites:", err));
  }, []);

  // All your existing scrolling, flipping, and rendering logic below
  // Just replace `fanFavorites` from import to this fetched state

  const scrollLeft = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: -scrollByValue, behavior: "smooth" });
    setAutoRotate(false);
  };

  const scrollRight = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: scrollByValue, behavior: "smooth" });
    setAutoRotate(false);
  };

  const scrollToIndex = (index) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollTo({
      left: scrollByValue * index,
      behavior: "smooth",
    });
    setActiveIndex(index);
    setAutoRotate(false);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      setFlippedCard(index === flippedCard ? null : index);
    }
  };

  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      if (!sliderRef.current) return;
      const currentScroll = sliderRef.current.scrollLeft;
      sliderRef.current.scrollBy({ left: scrollByValue, behavior: "smooth" });
      setActiveIndex((prev) => (prev + 1) % fanFavorites.length);
      if (
        currentScroll + sliderRef.current.offsetWidth >=
        sliderRef.current.scrollWidth
      ) {
        setTimeout(() => {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
          setActiveIndex(0);
        }, 500);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [autoRotate, fanFavorites.length]);

  return (
    <section
      className="relative bg-gradient-to-b from-zinc-900 to-black text-white py-6"
      aria-label="Fan Favourites"
    >
      {/* Heading */}
      <motion.h2
        className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2 text-left pl-6 group"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-yellow-400 text-2xl">🎬</span>
        <span className="text-yellow-400">Fan Favorites</span>
        <span className="text-yellow-400 transition-transform duration-300 group-hover:translate-x-1">
          &gt;
        </span>
      </motion.h2>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        aria-label="Scroll left"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-60 p-2 hover:bg-opacity-80 rounded"
      >
        ◀
      </button>
      <button
        onClick={scrollRight}
        aria-label="Scroll right"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-60 p-2 hover:bg-opacity-80 rounded"
      >
        ▶
      </button>

      {/* Cards */}
      <div
        ref={sliderRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-6"
        style={{ scrollBehavior: "smooth" }}
      >
        {fanFavorites.map((item, index) => {
          const isFlipped = flippedCard === index;

          return (
            <div
              key={item.id}
              tabIndex={0}
              role="button"
              aria-pressed={isFlipped}
              onClick={() => setFlippedCard(isFlipped ? null : index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="relative flex-shrink-0 w-[140px] sm:w-[180px] md:w-[200px] lg:w-[220px] h-[280px] sm:h-[300px] md:h-[340px]"
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="relative w-full h-full cursor-pointer rounded-lg shadow-lg"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Front Face */}
                <div
                  className="absolute w-full h-full rounded-lg overflow-hidden bg-zinc-800"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <img
                    src={item.img}
                    alt={`Movie poster of ${item.title}`}
                    loading="lazy"
                    onError={(e) => (e.target.src = "/fallback.jpg")}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <div className="absolute bottom-0 w-full bg-black bg-opacity-70 text-white text-center py-2 text-sm px-2">
                    {item.title}
                  </div>
                </div>

                {/* Back Face */}
                <div
                  className="absolute w-full h-full rounded-lg bg-zinc-900 p-4 flex flex-col justify-center items-center text-sm text-center"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-yellow-400 mt-1 text-md">
                    ⭐ {item.rating}/10
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mt-3 text-xs text-gray-300">
                    {item.genres.map((genre, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-700 px-3 py-1 rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <button className="mt-5 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition">
                    + Watchlist
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Get More Recommendations Button */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => {
            // Example: navigation or modal trigger
            // navigate("/recommendations");
            console.log("Navigate to recommendations...");
          }}
          className="inline-flex items-center gap-2 px-6 py-3 border border-yellow-500 text-yellow-400 font-semibold rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300 group text-sm sm:text-base"
        >
          Get More Recommendations
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-3">
        {fanFavorites.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-4 h-4 rounded-full focus:outline-none transition-colors duration-300 ${
              idx === activeIndex ? "bg-yellow-400" : "bg-gray-600"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default FanFavourites;
