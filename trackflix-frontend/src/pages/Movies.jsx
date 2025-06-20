import React, { useState, useEffect } from "react";
import MovieCard from "../components/MoviePages/MovieCard";
import GenreFilter from "../components/MoviePages/GenreFilter";
import Pagination from "../components/MoviePages/Pagination";

const Movie = () => {
  const [allMovies, setAllMovies] = useState([]); // Full movies data from backend
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("rating");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 50;

  // Fetch full movies once on mount
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/fullmovies")
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then((data) => {
        setAllMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch movies:", err);
        setError("Failed to load movies.");
        setLoading(false);
      });
  }, []);

  // Get all unique genres for filtering
  const allGenres = Array.from(
    new Set(allMovies.flatMap((movie) => movie.genres))
  );

  // Filter movies by search term (in title) and selected genres
  const filteredMovies = allMovies
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((movie) =>
      selectedGenres.length === 0
        ? true
        : selectedGenres.every((genre) => movie.genres.includes(genre))
    );

  // Sort filtered movies
  const sortedMovies = filteredMovies.sort((a, b) => {
    if (sortType === "rating") return b.rating - a.rating;
    if (sortType === "releaseDate")
      return new Date(b.releaseDate) - new Date(a.releaseDate);
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedMovies.length / itemsPerPage);
  const paginatedMovies = sortedMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Genre toggle function
  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
    setCurrentPage(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedGenres([]);
    setCurrentPage(1);
  };

  return (
    <section className="bg-black text-white min-h-screen px-4 sm:px-10 py-10 pt-28">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Sidebar */}
        <div className="w-full lg:w-1/4 space-y-6">
          {/* Search */}
          <div>
            <label className="block mb-2 text-sm font-semibold">
              Search Movies:
            </label>
            <input
              type="text"
              className="bg-zinc-800 text-white px-4 py-2 rounded w-full"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Sort Dropdown */}
          <div>
            <label className="block mb-2 text-sm font-semibold">Sort by:</label>
            <select
              className="bg-zinc-800 text-white px-4 py-2 rounded w-full"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="rating">Rating</option>
              <option value="releaseDate">Release Date</option>
            </select>
          </div>

          {/* Genre Filter */}
          <GenreFilter
            allGenres={allGenres}
            selectedGenres={selectedGenres}
            toggleGenre={toggleGenre}
            clearFilters={clearFilters}
          />
        </div>

        {/* Right Movie Grid */}
        <div className="flex-1">
          {loading && <p className="text-white mb-4">Loading movies...</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {!loading && !error && paginatedMovies.length === 0 && (
            <p className="text-gray-400">No movies found.</p>
          )}

          {!loading && !error && paginatedMovies.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Movie;
