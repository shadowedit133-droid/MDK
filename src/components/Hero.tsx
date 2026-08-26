"use client";

import React from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { ArrowUpRight, Play, Film } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Deep Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[680px] lg:w-[1000px] h-[300px] sm:h-[450px] bg-lime-500/[0.04] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center flex flex-col items-center z-10 w-full">
        {/* Top Credibility Tag */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-white/[0.08] text-[10px] sm:text-xs font-mono tracking-widest text-zinc-300 mb-6 sm:mb-8 backdrop-blur-md shadow-xl shadow-black/50">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400"></span>
          </span>
          <span className="text-lime-400 font-bold uppercase tracking-wider">TOP RATED VIDEO EDITOR</span>
          <span className="text-zinc-600 hidden xs:inline">•</span>
          <span className="text-zinc-400 hidden xs:inline uppercase tracking-wider">5+ YEARS EXP</span>
        </div>

        {/* Massive Editorial Headline */}
        <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight text-white mb-4 sm:mb-6 leading-[1.08] max-w-4xl font-display">
          <span>{profileData.heroHeadline.line1}</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-300 to-lime-300">
            {profileData.heroHeadline.line2}
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-xs sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal px-2">
          {profileData.heroSubheadline}
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md sm:max-w-none mb-8 sm:mb-10">
          <a
            href={profileData.upworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-lime-400 hover:bg-lime-300 text-zinc-950 font-extrabold text-xs sm:text-sm transition-all duration-200 shadow-xl shadow-lime-400/20 flex items-center justify-center gap-2 min-h-[48px] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Hire Me on Upwork</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>

          <Link
            href="/work"
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 min-h-[48px] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>View Selected Work</span>
            <Film className="w-4 h-4 text-zinc-400" />
          </Link>
        </div>

        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs text-zinc-400 bg-zinc-900/50 px-4 py-1.5 sm:py-2 rounded-full border border-white/[0.06] backdrop-blur-sm max-w-full truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 inline-block" />
          <span className="truncate">{profileData.availabilityStatus}</span>
        </div>
      </div>

      {/* Hero Showcase Video Cinema Card */}
      <div className="mt-10 sm:mt-14 w-full max-w-5xl mx-auto z-10">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.12] bg-zinc-950/90 shadow-[0_20px_50px_rgba(0,0,0,0.9)] aspect-[16/10] sm:aspect-[21/9] group">
          {/* Ambient Video Player */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-opacity duration-700"
            src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-and-data-31913-large.mp4"
            poster="/images/showreel-poster.jpg"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080b] via-transparent to-black/50 pointer-events-none" />

          {/* Quick Play Trigger Bar */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-8 pointer-events-none">
            <div className="flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-mono text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                <span>SHOWREEL PREVIEW</span>
              </div>
            </div>

            <div className="flex items-end justify-between gap-4 pointer-events-auto">
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-lime-400 font-mono tracking-wider uppercase mb-0.5 sm:mb-1 truncate">
                  Post-Production Craft
                </p>
                <h2 className="text-base sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight line-clamp-1 font-display">
                  Pacing, Sound & Motion
                </h2>
              </div>

              <Link
                href="/work"
                className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-lime-400 hover:bg-lime-300 text-zinc-950 font-bold text-xs shadow-lg transition-transform shrink-0 min-h-[38px] hover:scale-105"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Explore Work</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
