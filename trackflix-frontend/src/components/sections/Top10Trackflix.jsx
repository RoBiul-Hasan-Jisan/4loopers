import React, { useRef, useState, useEffect } from "react";
import { FaPlus, FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Top10Trackflix = () => {
  const scrollRef = useRef(null);
  const [top10, setTop10] = useState([]);

  // Fetch top10 data from backend
  useEffect(() => {
    fetch("http://localhost:5000/top10") // make sure your server is running!
      .then((res) => res.json())
      .then((data) => setTop10(data))
      .catch((err) => console.error("Failed to fetch top10:", err));
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      aria-labelledby="top10-title"
      className="bg-gradient-to-b from-zinc-900 to-black text-white px-4 sm:px-6 py-10 sm:py-14"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <header className="text-center mb-8 sm:mb-10">
          <h2
            id="top10-title"
            className="text-2xl sm:text-4xl font-extrabold text-yellow-400"
          >
            🎬 Top 10 on Trackflix This Week
          </h2>
          <p className="mt-2 text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            The hottest shows and movies everyone's watching
          </p>
        </header>

        {/* Mobile slider */}
        <div className="sm:hidden relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-zinc-800 bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-2 z-10"
          >
            <FaChevronLeft />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-snap-x mandatory px-4"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {top10.map(({ id, img, title, rank, rating, year, trailer }) => (
              <article
                key={id}
                className="flex-none w-[70%] min-w-[220px] max-w-xs relative rounded-xl overflow-hidden bg-zinc-800 hover:shadow-xl transition-shadow duration-300 flex flex-col scroll-snap-align-start"
              >
                <div className="aspect-[2/3] bg-black overflow-hidden">
                  <img
                    src={img}
                    alt={title}
                    className="object-cover w-full h-full"
                    onError={(e) => (e.target.src = "/fallback.jpg")}
                  />
                </div>

                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="text-base font-semibold text-white mb-1 truncate" title={title}>
                    {title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-300 mb-2">
                    <time>{year}</time>
                    <span className="bg-yellow-400 text-black font-bold px-2 py-0.5 rounded">
                      ⭐ {rating}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-auto text-xs">
                    <a
                      href={trailer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1 border border-white px-2 py-1 rounded hover:bg-white hover:text-black transition"
                    >
                      <FaPlay className="text-xs" />
                      Trailer
                    </a>
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center gap-1 border border-white px-2 py-1 rounded hover:bg-white hover:text-black transition"
                    >
                      <FaPlus className="text-xs" />
                      Watchlist
                    </button>
                  </div>
                </div>

                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                  #{rank}
                </div>
              </article>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-zinc-800 bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-2 z-10"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Desktop grid */}
        <div className="hidden sm:grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {top10.map(({ id, img, title, rank, rating, year, trailer }) => (
            <article
              key={id}
              className="relative rounded-xl overflow-hidden bg-zinc-800 hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              <div className="w-full aspect-[2/3] bg-black overflow-hidden">
                <img
                  src={img}
                  alt={title}
                  className="object-cover w-full h-full"
                  onError={(e) => (e.target.src = "/fallback.jpg")}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-white mb-1 truncate" title={title}>
                  {title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
                  <time dateTime={year}>{year}</time>
                  <span className="bg-yellow-400 text-black font-bold px-2 py-0.5 rounded">
                    ⭐ {rating}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-auto text-sm">
                  <a
                    href={trailer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition"
                  >
                    <FaPlay className="text-xs" />
                    Trailer
                  </a>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition"
                  >
                    <FaPlus className="text-xs" />
                    Watchlist
                  </button>
                </div>
              </div>
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                #{rank}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Top10Trackflix;
