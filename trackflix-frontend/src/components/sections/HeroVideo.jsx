import React from "react";
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
  return (
    <section className="relative h-[100vh] w-[100vw] overflow-hidden text-white">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={currentMovie.video}
          autoPlay
          muted={isMuted}
          loop
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Controls */}
      <div className="absolute top-8 right-8 z-20 flex space-x-4 bg-black/60 rounded-full p-2 shadow-lg">
        <button
          onClick={togglePlayPause}
          className="text-white hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 rounded"
          aria-label={isPlaying ? "Pause video" : "Play video"}
          title={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <button
          onClick={toggleMute}
          className="text-white hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 rounded"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          title={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeMuteIcon /> : <VolumeUpIcon />}
        </button>
      </div>

      {/* Movie Title & Watch Button */}
      <div className="absolute bottom-8 left-8 z-10 text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          {currentMovie.title}
        </h1>
        <a
          href={currentMovie.netflixLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          Watch
        </a>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-10 transition"
        aria-label="Previous movie"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-10 transition"
        aria-label="Next movie"
      >
        &gt;
      </button>
    </section>
  );
};

export default HeroVideo;
