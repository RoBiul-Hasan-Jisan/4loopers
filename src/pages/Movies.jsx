import React, { useState } from "react";
import { FaStar, FaPlay, FaPlus } from "react-icons/fa";
import { moviesData } from "../data/fullmovies";

const allGenres = Array.from(
  new Set(moviesData.flatMap((movie) => movie.genres))
);

const Movies = () => {
  const [sortType, setSortType] = useState("rating");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const sortedMovies = [...moviesData]
    .filter((movie) =>
      selectedGenres.length === 0
        ? true
        : selectedGenres.every((genre) => movie.genres.includes(genre))
    )
    .sort((a, b) => {
      if (sortType === "rating") return b.rating - a.rating;
      if (sortType === "releaseDate")
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      return 0;
    });

  const totalPages = Math.ceil(sortedMovies.length / itemsPerPage);
  const paginatedMovies = sortedMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="bg-black text-white min-h-screen px-6 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">All Movies</h1>
        <select
          className="bg-zinc-800 text-white px-4 py-2 rounded"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="rating">Sort by Rating</option>
          <option value="releaseDate">Sort by Release Date</option>
        </select>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Filter by Genre:</h2>
        <div className="flex flex-wrap gap-2">
          {allGenres.map((genre) => (
            <label key={genre} className="text-sm">
              <input
                type="checkbox"
                className="mr-1 accent-blue-500"
                checked={selectedGenres.includes(genre)}
                onChange={() => toggleGenre(genre)}
              />
              {genre}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:scale-105 transition"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-[300px] object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <div className="flex items-center gap-2 text-yellow-400">
                <FaStar className="text-sm" />
                <span>{movie.rating}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {movie.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="text-xs bg-zinc-700 text-white px-2 py-1 rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <p className="text-sm text-zinc-400">
                Release: {movie.releaseDate}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <a
                  href={movie.trailer}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-blue-400 hover:underline text-sm"
                >
                  <FaPlay /> Trailer
                </a>
                <button className="flex items-center gap-1 text-green-400 hover:underline text-sm">
                  <FaPlus /> Watchlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10 gap-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="bg-zinc-800 px-4 py-2 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-white font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-zinc-800 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Movies;