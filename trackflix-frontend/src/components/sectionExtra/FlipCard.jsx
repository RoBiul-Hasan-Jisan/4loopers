import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FlipCard = ({ item, isFlipped, onFlip, isLoggedIn }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const embedUrl = item.trailerLink
    ? item.trailerLink.replace("watch?v=", "embed/")
    : null;

  const handleWatchlistClick = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      alert(`Added "${item.title}" to your watchlist!`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onFlip(item.id);
    }
  };

  // Close modal on ESC key
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape" && showTrailer) {
        setShowTrailer(false);
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [showTrailer]);

  // Focus trap inside modal
  useEffect(() => {
    if (showTrailer && modalRef.current) {
      modalRef.current.focus();
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showTrailer]);

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
        {/* Front Side */}
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

        {/* Back Side */}
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

          <div className="flex items-center justify-between pt-3 border-t border-zinc-700 mt-4 w-full">
            {embedUrl ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTrailer(true);
                }}
                className="flex items-center gap-2 text-blue-400 hover:underline text-sm"
                aria-label={`Watch trailer for ${item.title}`}
              >
                <FaPlay className="text-sm" />
                Trailer
              </button>
            ) : (
              <span className="text-gray-500 text-sm">No trailer</span>
            )}

            <button
              onClick={handleWatchlistClick}
              className="flex items-center gap-2 text-green-400 hover:underline text-sm"
              aria-label={`Add ${item.title} to watchlist`}
            >
              <FaPlus className="text-sm" />
              Watchlist
            </button>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm p-6 animate-fadeIn"
          onClick={() => setShowTrailer(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="trailer-title"
        >
          <div
            className="relative w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden outline-none"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
            ref={modalRef}
          >
            {/* Close button */}
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-3 right-3 text-white bg-zinc-800 bg-opacity-70 rounded-full p-2 hover:bg-red-600 transition-colors"
              aria-label="Close trailer"
            >
              ×
            </button>

            {/* Trailer iframe */}
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-b-xl"
                src={embedUrl + "?autoplay=1&controls=1&modestbranding=1"}
                title={`${item.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                frameBorder="0"
              />
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default FlipCard;
