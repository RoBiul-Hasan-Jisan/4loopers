import React from "react";

const HeroSearch = ({ searchTerm, setSearchTerm, handleSubmit }) => {
  return (
    <section
      className="relative h-screen bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-4"
      style={{ backgroundImage: "url('/images/hero1.jpg')" }}
    >
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">Keep your movie diary.</h1>
        <h2 className="text-2xl md:text-3xl font-semibold leading-tight">Craft your watchlist.</h2>
        <h3 className="text-xl md:text-2xl mb-6">Be the critic your friends trust.</h3>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <input
            type="text"
            placeholder="Search a movie"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-md text-black w-full sm:w-64"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-red-600 hover:bg-red-700 transition rounded-md font-semibold"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSearch;
