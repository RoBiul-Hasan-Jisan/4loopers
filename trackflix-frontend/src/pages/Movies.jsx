import React, { useState, useEffect } from "react";
import { FaStar, FaPlay, FaPlus } from "react-icons/fa";

const OMDB_API_KEY = "be28d8e8"; // Replace with your OMDb API Key

const Movies = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Avengers");
  const [sortType, setSortType] = useState("rating");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch 200 movies when searchTerm changes
  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchTerm.trim()) return;

      setLoading(true);
      setError(null);
      setMoviesData([]);

      try {
        let allSearchResults = [];

        // Fetch first 20 pages (200 movies)
        const searchPagePromises = [];
        for (let i = 1; i <= 20; i++) {
          searchPagePromises.push(
            fetch(
              `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(
                searchTerm
              )}&type=movie&page=${i}`
            ).then((res) => res.json())
          );
        }

        const pagesData = await Promise.all(searchPagePromises);

        for (const data of pagesData) {
          if (data.Response === "True") {
            allSearchResults.push(...data.Search);
          }
        }

        // Fetch detailed info for each
        const detailPromises = allSearchResults.map((movie) =>
          fetch(
            `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movie.imdbID}&plot=short`
          ).then((res) => res.json())
        );

        const fullMovies = await Promise.all(detailPromises);

        const formattedMovies = fullMovies
          .filter((movie) => movie.Response === "True")
          .map((movie) => ({
            id: movie.imdbID,
            title: movie.Title || "N/A",
            rating: parseFloat(movie.imdbRating) || 0,
            genres: movie.Genre ? movie.Genre.split(", ").map((g) => g.trim()) : [],
            releaseDate: movie.Released || "N/A",
            trailer: `https://www.youtube.com/results?search_query=${encodeURIComponent(
              movie.Title + " trailer"
            )}`,
            image:
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Image",
          }));

        setMoviesData(formattedMovies);
        setCurrentPage(1);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  const allGenres = Array.from(
    new Set(moviesData.flatMap((movie) => movie.genres))
  );

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
    setCurrentPage(1);
  };

  const filteredSortedMovies = moviesData
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

  const totalPages = Math.ceil(filteredSortedMovies.length / itemsPerPage);
  const paginatedMovies = filteredSortedMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="bg-black text-white min-h-screen px-6 py-10">
      <div className="mb-6 max-w-md">
        <input
          type="text"
          className="bg-zinc-800 text-white px-4 py-2 rounded w-full"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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
            <label key={genre} className="text-sm cursor-pointer select-none">
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

      {loading && <p>Loading movies...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform"
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

      {paginatedMovies.length > 0 && (
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
      )}
    </section>
  );
};

export default Movies;
