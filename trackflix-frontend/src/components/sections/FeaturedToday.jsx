import React, { useState, useRef, useEffect } from "react";
import { FaArrowRight, FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ITEM_WIDTH = 256;
const GAP = 24;

const FlipCard = ({ item, isFlipped, onFlip }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onFlip(item.id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
      onClick={() => onFlip(item.id)}
      onKeyDown={handleKeyDown}
      className="w-64 h-96 relative cursor-pointer perspective flex-shrink-0"
      style={{ perspective: "1000px" }}
    >
      <div
        className="w-full h-full rounded-xl shadow-lg transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          position: "relative",
        }}
      >
        {/* Front */}
        <div
          className="absolute w-full h-full rounded-xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => (e.target.src = "/fallback.jpg")}
          />
        </div>

        {/* Back */}
        <div
          className="absolute w-full h-full bg-zinc-800 text-white rounded-xl p-4 flex flex-col justify-center items-center shadow-xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h3 className="text-lg font-bold mb-2 text-center">{item.title}</h3>
          <p className="text-sm text-gray-300 mb-1">⭐ {item.rating}</p>
          <p className="text-sm text-gray-300 mb-2">{item.genres.join(", ")}</p>
          <a
            href={item.trailerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 mb-2 rounded-full text-sm flex items-center gap-2 transition"
          >
            <FaPlay /> Watch Trailer
          </a>
          <button
            type="button"
            className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-full text-sm"
            onClick={(e) => {
              e.stopPropagation();
              alert(`Added "${item.title}" to your watchlist!`);
            }}
          >
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

const FeaturedToday = () => {
  const [flippedCard, setFlippedCard] = useState(null);
  const [featuredItems, setFeaturedItems] = useState([]);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const handleFlip = (id) => {
    setFlippedCard((prev) => (prev === id ? null : id));
  };

  const scrollByOffset = (offset) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const scrollLeft = () => scrollByOffset(-(ITEM_WIDTH + GAP));
  const scrollRight = () => scrollByOffset(ITEM_WIDTH + GAP);

  // Fetch data from backend
  useEffect(() => {
    fetch("http://localhost:5000/featured-today")
      .then((res) => res.json())
      .then((data) => setFeaturedItems(data))
      .catch((err) => console.error("Failed to fetch featured items:", err));
  }, []);

  // Touch support
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };

    const onTouchMove = (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    };

    const onTouchEnd = () => {
      if (!isDragging) return;
      const diff = startX - currentX;
      if (diff > 30) scrollRight();
      else if (diff < -30) scrollLeft();
      isDragging = false;
    };

    slider.addEventListener("touchstart", onTouchStart);
    slider.addEventListener("touchmove", onTouchMove);
    slider.addEventListener("touchend", onTouchEnd);

    return () => {
      slider.removeEventListener("touchstart", onTouchStart);
      slider.removeEventListener("touchmove", onTouchMove);
      slider.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <section className="bg-gradient-to-b from-zinc-900 to-black text-white px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400">
            🌟 Featured Today
          </h2>
          <p className="mt-2 text-gray-300 text-sm md:text-base">
            Explore hand-picked blockbuster favorites
          </p>
        </header>

        <div className="relative">
          <button
            aria-label="Scroll Left"
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-yellow-400 rounded-full p-2 z-10"
          >
            <FaChevronLeft size={20} />
          </button>

          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide px-10"
            style={{ scrollPaddingLeft: "40px", scrollPaddingRight: "40px" }}
          >
            {featuredItems.map((item) => (
              <div key={item.id} className="snap-center">
                <FlipCard
                  item={item}
                  isFlipped={flippedCard === item.id}
                  onFlip={handleFlip}
                />
              </div>
            ))}
          </div>

          <button
            aria-label="Scroll Right"
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-yellow-400 rounded-full p-2 z-10"
          >
            <FaChevronRight size={20} />
          </button>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/recommendations")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-full font-medium flex items-center justify-center gap-2 transition duration-300"
          >
            Get More Recommendations <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedToday;
