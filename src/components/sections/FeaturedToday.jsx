import React from "react";

const featuredItems = [
  { id: 1, title: "The Batman", img: "/images/batman.jpg" },
  { id: 2, title: "Stranger Things", img: "/images/stranger_things.jpg" },
  { id: 3, title: "The Witcher", img: "/images/witcher.jpg" },
  { id: 4, title: "Inception", img: "/images/inception.jpg" },
];

const FeaturedToday = () => (
  <section className="px-6 py-8 bg-gray-900 text-white">
    <h2 className="text-3xl font-bold mb-6">Featured Today</h2>
    <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
      {featuredItems.map((item) => (
        <div key={item.id} className="min-w-[150px] rounded overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform">
          <img src={item.img} alt={item.title} className="w-full h-36 object-cover" />
          <h3 className="p-2 font-semibold">{item.title}</h3>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturedToday;
