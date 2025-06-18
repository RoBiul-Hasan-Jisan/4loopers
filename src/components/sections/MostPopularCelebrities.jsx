import React from "react";

const celebrities = [
  { id: 1, name: "Robert Downey Jr.", img: "/images/rdj.jpg" },
  { id: 2, name: "Scarlett Johansson", img: "/images/scarlett.jpg" },
  { id: 3, name: "Chris Hemsworth", img: "/images/chris_h.jpg" },
  { id: 4, name: "Gal Gadot", img: "/images/gal_gadot.jpg" },
  { id: 5, name: "Zendaya", img: "/images/zendaya.jpg" },
];

const MostPopularCelebrities = () => (
  <section className="px-6 py-8 bg-gray-800 text-white">
    <h2 className="text-3xl font-bold mb-6">Most Popular Celebrities</h2>
    <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
      {celebrities.map((celeb) => (
        <div key={celeb.id} className="min-w-[120px] text-center cursor-pointer hover:scale-105 transition-transform">
          <img
            src={celeb.img}
            alt={celeb.name}
            className="w-24 h-24 rounded-full mx-auto object-cover shadow-md"
          />
          <p className="mt-2 font-medium">{celeb.name}</p>
        </div>
      ))}
    </div>
  </section>
);

export default MostPopularCelebrities;
