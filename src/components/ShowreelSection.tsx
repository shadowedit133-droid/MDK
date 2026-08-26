"use client";

import React, { useState, useRef } from "react";
import { showreelData } from "@/data/projects";
import { Play, Pause, Volume2, VolumeX, Maximize2, Film } from "lucide-react";

export default function ShowreelSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section id="showreel" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-white/[0.08] text-xs font-mono text-lime-400 mb-3 sm:mb-4">
              <Film className="w-3.5 h-3.5" />
              <span>SELECTED SHOWREEL</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
              {showreelData.title}
            </h2>
          </div>
          <p className="text-zinc-400 text-xs sm:text-base max-w-md leading-relaxed">
            {showreelData.subtitle}
          </p>
        </div>

        {/* Cinematic Video Player Container */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.12] bg-zinc-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] group aspect-video">
          <video
            ref={videoRef}
            src={showreelData.videoUrl}
            poster={showreelData.posterImage}
            playsInline
            muted={isMuted}
            loop
            onClick={togglePlay}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-cover cursor-pointer"
          />

          {/* Unplayed Overlay & Big Play Button */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-all hover:bg-black/30"
            >
              <div className="flex flex-col items-center gap-3.5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-lime-400 text-zinc-950 flex items-center justify-center shadow-2xl shadow-lime-400/40 transform transition-transform hover:scale-110 active:scale-95">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
                </div>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/90 bg-black/70 px-4 py-1.5 rounded-full border border-white/10 shadow-lg">
                  Play Showreel ({showreelData.duration})
                </span>
              </div>
            </div>
          )}

          {/* Custom Player Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={togglePlay}
                className="p-2 sm:p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-2 sm:p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="text-[10px] sm:text-xs font-mono text-zinc-300 hidden md:inline-block">
                Pacing • Sound • Motion
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleFullscreen}
                className="p-2 sm:p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
                aria-label="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
