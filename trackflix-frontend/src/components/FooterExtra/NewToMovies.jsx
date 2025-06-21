import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as FaIcons from "react-icons/fa";
import { genres } from "../../data/footernewtomovies";

const ICON_COLOR_CLASSES = {
  FaHeart: "text-pink-400",
  FaLaughBeam: "text-yellow-300",
  FaRobot: "text-blue-400",
  FaBomb: "text-red-500",
  FaGhost: "text-gray-900",
  FaMagic: "text-purple-500",
  FaBook: "text-green-400",
  FaGlobe: "text-teal-400",
  FaDragon: "text-orange-400",
  FaTheaterMasks: "text-indigo-500",
};

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.25, duration: 0.8, ease: "easeOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const titleVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const iconPulseVariants = {
  pulse: {
    scale: [1, 1.15, 1],
    transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
  },
};

const NewToMovies = () => {
  return (
    <div
      className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-100"
      aria-label="Movie genres scroll sections"
    >
      {genres.map((genre) => (
        <AnimatedGenreSection key={genre.title} genre={genre} />
      ))}
    </div>
  );
};

const AnimatedGenreSection = ({ genre }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      setBgLoaded(true);
    }
  }, [controls, inView]);

  const IconComponent = FaIcons[genre.iconName];
  const titleId = `${genre.title.toLowerCase().replace(/\s+/g, "-")}-title`;

  return (
    <section
      ref={ref}
      className="snap-start relative w-screen h-screen flex flex-col items-center justify-center px-6 sm:px-12 md:px-20 lg:px-32 text-center"
      style={{
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: bgLoaded
          ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${genre.bgImage})`
          : "none",
        transition: "background-image 1.5s ease-in-out",
      }}
      aria-labelledby={titleId}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 pointer-events-none"></div>

      <motion.div
        aria-hidden="true"
        variants={iconPulseVariants}
        animate="pulse"
        whileHover={{ scale: 1.2 }}
        className={`relative z-10 mb-8 ${
          ICON_COLOR_CLASSES[genre.iconName] ?? "text-white"
        } text-8xl sm:text-9xl md:text-[10rem] drop-shadow-lg`}
      >
        {IconComponent && <IconComponent />}
      </motion.div>

      <motion.h2
        id={titleId}
        variants={titleVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10 font-extrabold text-white tracking-wide leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
        style={{ letterSpacing: "0.1em" }}
        whileHover={{ color: "#ff4081" }}
      >
        {genre.title}
        <motion.span
          layoutId="underline"
          className="block h-1 w-full max-w-xs mx-auto bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 rounded-full mt-4 shadow-lg"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </motion.h2>

      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10 mt-10 max-w-xl mx-auto text-white text-lg sm:text-xl space-y-5 list-none leading-relaxed drop-shadow-md"
      >
        {genre.lines.map((line, i) => (
          <motion.li
            key={i}
            variants={itemVariants}
            transition={{ delay: i * 0.1 }}
            className="select-text"
          >
            {line}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
};

export default NewToMovies;
