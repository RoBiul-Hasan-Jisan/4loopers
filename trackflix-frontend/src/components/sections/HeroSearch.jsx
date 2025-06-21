import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Animation Variants
const logoVariant = {
  hidden: { opacity: 0, scale: 0.6, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", duration: 1.2, bounce: 0.4 },
  },
};

const textContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.6,
    },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60 },
  },
};

const formVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1.4, duration: 0.6 },
  },
};

// Custom hook to detect small screen or prefers-reduced-motion
function useReducedMotionOrSmallScreen() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 640px)"
    );
    const handler = () => setShouldReduceMotion(mediaQuery.matches);

    handler();
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return shouldReduceMotion;
}

const HeroSearch = () => {
  const reduceMotion = useReducedMotionOrSmallScreen();

  // Local state for search input
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/movies?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <motion.section
      className="relative h-screen bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-4 overflow-hidden"
      style={{ backgroundImage: "url('/images/hero1.jpg')" }}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 z-0 bg-black/50"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 4, ease: "easeOut" }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-4xl w-full text-center space-y-6"
        initial="hidden"
        animate="visible"
        variants={textContainer}
      >
        {/* Logo */}
        <motion.div className="flex justify-center" variants={logoVariant}>
          <motion.img
            src="/images/lo1.png"
            alt="Movie Logo"
            className="w-[240px] sm:w-[300px] md:w-[380px] lg:w-[450px] xl:w-[500px] object-contain mx-auto filter brightness-95 drop-shadow-lg"
            variants={logoVariant}
            animate={
              reduceMotion
                ? { opacity: 1, y: 0 }
                : {
                    y: [0, -10, 0],
                    opacity: [0.9, 1, 0.9],
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 3, repeat: Infinity },
                  }
            }
          />
        </motion.div>

        {/* Text */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold leading-tight"
          variants={textItem}
        >
          Keep your movie diary.
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-3xl font-semibold leading-snug"
          variants={textItem}
        >
          Craft your watchlist.
        </motion.h2>

        <motion.h3
          className="text-xl md:text-2xl text-gray-200 mb-6"
          variants={textItem}
        >
          Be the critic your friends trust.
        </motion.h3>

        {/* Search form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-2"
          variants={formVariant}
        >
          <motion.input
            type="text"
            placeholder="Search a movie"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 rounded-md text-black w-full sm:w-72 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
            whileFocus={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.button
            type="submit"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 transition-all rounded-md font-semibold shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Search
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.section>
  );
};

export default HeroSearch;
