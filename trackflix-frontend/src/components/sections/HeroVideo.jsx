import React, { useEffect } from "react";
import PlayIcon from "../icons/PlayIcon";
import PauseIcon from "../icons/PauseIcon";
import VolumeMuteIcon from "../icons/VolumeMuteIcon";
import VolumeUpIcon from "../icons/VolumeUpIcon";

const HeroVideo = ({
  videoRef,
  currentMovie,
  isMuted,
  isPlaying,
  togglePlayPause,
  toggleMute,
  nextSlide,
  prevSlide,
}) => {
  const playPauseLabel = isPlaying ? "Pause video" : "Play video";
  const muteLabel = isMuted ? "Unmute video" : "Mute video";

  // Pause video when component unmounts
  useEffect(() => {
    return () => {
      if (videoRef?.current) {
        videoRef.current.pause();
      }
    };
  }, [videoRef]);

  // Pause/resume video on tab visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!videoRef?.current) return;

      if (document.hidden) {
        videoRef.current.pause();
      } else if (isPlaying) {
        videoRef.current.play().catch(() => {
          // handle promise rejection silently if autoplay blocked
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [videoRef, isPlaying]);

  // Keyboard handlers for accessibility on slide navigation
  const handleKeyDownPrev = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      prevSlide();
    }
  };

  const handleKeyDownNext = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      nextSlide();
    }
  };

  return (
    <section
      aria-label={`Featured movie trailer for ${currentMovie.title}`}
      className="relative h-screen w-full overflow-hidden text-white select-none"
    >
      {/* Background Video with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={currentMovie.video}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="auto"
          poster={currentMovie.poster} // optional fallback image
          aria-label={`Trailer video for ${currentMovie.title}`}
        >
          Sorry, your browser does not support embedded videos.
        </video>
        {/* Semi-transparent overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/70 pointer-events-none" />
      </div>

      {/* Playback Controls - Responsive & Accessible */}
      <nav
        aria-label="Video playback controls"
        className="absolute top-6 right-6 z-30 flex space-x-4 bg-black/70 rounded-full p-3 shadow-lg
          sm:p-4 sm:space-x-6
          md:p-5
          lg:p-6
          focus-within:ring-2 focus-within:ring-red-600"
      >
        <button
          onClick={togglePlayPause}
          className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
            text-white hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 rounded-full"
          aria-label={playPauseLabel}
          title={playPauseLabel}
          type="button"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <button
          onClick={toggleMute}
          className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
            text-white hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 rounded-full"
          aria-label={muteLabel}
          title={muteLabel}
          type="button"
        >
          {isMuted ? <VolumeMuteIcon /> : <VolumeUpIcon />}
        </button>
      </nav>

      {/* Movie Info and Watch Link - Responsive Text and Buttons */}
      <div
        className="absolute bottom-8 left-6 z-20 max-w-xs sm:max-w-md md:max-w-lg
          p-4 bg-black/50 rounded-lg
          sm:p-6
          md:p-8"
      >
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg"
          tabIndex={0}
        >
          {currentMovie.title}
        </h1>
        <a
          href={currentMovie.netflixLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-red-600 hover:bg-red-700 focus:bg-red-800
            text-white px-5 py-3 rounded-full font-semibold text-sm sm:text-base
            transition-colors duration-200 shadow-md focus:outline-none focus:ring-4 focus:ring-red-500"
          aria-label={`Watch ${currentMovie.title} on Netflix`}
        >
          Watch
        </a>
      </div>

      {/* Slide Navigation Buttons - large touch targets and keyboard accessible */}
      <button
        onClick={prevSlide}
        onKeyDown={handleKeyDownPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2
          bg-black/60 hover:bg-black/80 text-white p-4 rounded-full z-20
          focus:outline-none focus:ring-4 focus:ring-red-600
          transition
          sm:p-5"
        aria-label="Previous movie"
        type="button"
        tabIndex={0}
      >
        <span aria-hidden="true" className="text-2xl sm:text-3xl">
          &#10094;
        </span>
      </button>

      <button
        onClick={nextSlide}
        onKeyDown={handleKeyDownNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2
          bg-black/60 hover:bg-black/80 text-white p-4 rounded-full z-20
          focus:outline-none focus:ring-4 focus:ring-red-600
          transition
          sm:p-5"
        aria-label="Next movie"
        type="button"
        tabIndex={0}
      >
        <span aria-hidden="true" className="text-2xl sm:text-3xl">
          &#10095;
        </span>
      </button>
    </section>
  );
};

export default HeroVideo;
