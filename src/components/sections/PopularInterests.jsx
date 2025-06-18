import React from "react";

const interests = [
  { id: 1, name: "Superheroes", img: "/images/superheroes.jpg" },
  { id: 2, name: "Sci-Fi", img: "/images/scifi.jpg" },
  { id: 3, name: "Crime Drama", img: "/images/crime_drama.jpg" },
  { id: 4, name: "Romance", img: "/images/romance.jpg" },
  { id: 5, name: "Comedy", img: "/images/comedy.jpg" },
];

const PopularInterests = () => (
  <section className="px-6 py-8 bg-gray-900 text-white">
    <h2 className="text-3xl font-bold mb-6">Popular Interests</h2>
    <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
      {interests.map((item) => (
        <div key={item.id} className="min-w-[140px] rounded cursor-pointer hover:scale-105 transition-transform text-center">
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-28 object-cover rounded"
          />
          <p className="mt-2 font-medium">{item.name}</p>
        </div>
      ))}
    </div>
  </section>
);

export default PopularInterests;
