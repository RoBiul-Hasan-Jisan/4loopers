import { FaStar, FaPlay, FaPlus } from "react-icons/fa";

const MovieCard = ({ movie }) => (
  <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl">
    {/* ✅ Image Wrapper */}
    <div className="relative w-full h-[350px] bg-zinc-800 overflow-hidden">
      <img
        src={movie.image}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>

    {/* Card Content */}
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-semibold text-white truncate">{movie.title}</h2>

      <div className="flex items-center gap-2 text-yellow-400 text-sm">
        <FaStar className="text-base" />
        <span>{movie.rating}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {movie.genres.map((genre, idx) => (
          <span
            key={idx}
            className="text-xs bg-zinc-700 px-3 py-1 rounded-full text-white"
          >
            {genre}
          </span>
        ))}
      </div>

      <p className="text-sm text-zinc-400">Release: {movie.releaseDate}</p>

      <div className="flex items-center gap-4 pt-2 border-t border-zinc-800 mt-3">
        <a
          href={movie.trailer}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-blue-400 hover:underline text-sm"
        >
          <FaPlay className="text-sm" />
          Trailer
        </a>
        <button className="flex items-center gap-1 text-green-400 hover:underline text-sm">
          <FaPlus className="text-sm" />
          Watchlist
        </button>
      </div>
    </div>
  </div>
);

export default MovieCard;
