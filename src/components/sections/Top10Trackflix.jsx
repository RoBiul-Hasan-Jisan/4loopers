import React from "react";

// Sample Top 10 data (replace with your real data)
const top10 = [
  {
    id: 1,
    title: "Avengers: Endgame",
    img: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    rank: 1,
  },
  {
    id: 2,
    title: "Stranger Things",
    img: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
    rank: 2,
  },
  {
    id: 3,
    title: "Wednesday",
    img: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    rank: 3,
  },
  {
    id: 5,
    title: "Loki",
    img: "https://image.tmdb.org/t/p/w500/voHUmluYmKyleFkTu3lOXQG702u.jpg",
    rank: 4,
  },
  {
    id: 8,
    title: "Breaking Bad",
    img: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    rank: 5,
  },
  {
    id: 9,
    title: "Squid Game",
    img: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
    rank: 6,
  },
  {
    id: 10,
    title: "Peaky Blinders",
    img: "https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg",
    rank: 7,
  },
  {
    id: 11,
    title: "Game of Thrones",
    img: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
    rank: 8,
  },
  {
    id: 12,
    title: "The Mandalorian",
    img: "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
    rank: 9,
  },
  {
    id: 13,
    title: "Dark",
    img: "https://image.tmdb.org/t/p/w500/8yZAx7tlKRZIg7pJfaPhl00yHIQ.jpg",
    rank: 10,
  },
];

const Top10Trackflix = () => (
  <section
    className="px-6 py-8 bg-gradient-to-b from-zinc-900 to-black text-white"
    aria-label="Top 10 Trackflix This Week"
  >
    <h2 className="text-2xl md:text-3xl font-extrabold mb-6 flex items-center gap-3 select-none">
      <span
        role="img"
        aria-label="Movie clapperboard"
        className="text-yellow-400 text-3xl"
      >
        🎬
      </span>
      <span className="text-yellow-400 tracking-wide">
        Top 10 on Trackflix This Week
      </span>
      <span
        aria-hidden="true"
        className="text-yellow-400 text-xl font-bold transform transition-transform duration-300 group-hover:translate-x-1"
      >
        &gt;
      </span>
    </h2>

    <div
      className="flex space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-gray-700"
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Top 10 movies carousel"
    >
      {top10.map(({ id, img, title, rank }) => (
        <article
          key={id}
          className="min-w-[150px] md:min-w-[180px] rounded-lg shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300 relative focus:outline-yellow-400"
          role="group"
          aria-labelledby={`title-${id}`}
          tabIndex={-1}
        >
          <img
            src={img}
            alt={`Poster of ${title}`}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback.jpg";
            }}
            className="w-full h-44 md:h-52 object-cover rounded-t-lg"
          />
          <div className="absolute top-3 left-3 bg-red-600 px-3 py-1 rounded-full text-white font-bold text-sm shadow-lg select-none">
            #{rank}
          </div>
          <h3
            id={`title-${id}`}
            className="bg-black bg-opacity-70 text-center text-sm md:text-base font-semibold py-2 rounded-b-lg truncate px-2"
            title={title}
          >
            {title}
          </h3>
        </article>
      ))}
    </div>
  </section>
);

export default Top10Trackflix;
