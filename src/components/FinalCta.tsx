"use client";

import React from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { ArrowUpRight, Film, Sparkles } from "lucide-react";

export default function FinalCta() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Deep Subtle Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[680px] lg:w-[1000px] h-[300px] sm:h-[400px] bg-lime-500/[0.04] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl p-8 sm:p-14 lg:p-20 bg-[#0e0e14] border border-white/[0.08] text-center shadow-2xl overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20 text-[10px] sm:text-xs font-mono mb-6 sm:mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              <span>READY TO ELEVATE YOUR VIDEO PRODUCTION?</span>
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight font-display mb-4 sm:mb-6 leading-[1.1]">
              Have Footage.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-300 to-lime-300">
                Let&apos;s Turn It Into Something Worth Watching.
              </span>
            </h2>

            <p className="text-xs sm:text-base md:text-lg text-zinc-400 mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
              Start your project with Muhammad through Upwork for safe milestone management, clear timelines, and broadcast-quality storytelling.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md mx-auto sm:max-w-none">
              <a
                href={profileData.upworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-lime-400 hover:bg-lime-300 text-zinc-950 font-extrabold text-xs sm:text-sm transition-all duration-200 shadow-xl shadow-lime-400/25 flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98] min-h-[48px]"
              >
                <span>Hire Me on Upwork</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <Link
                href="/work"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 min-h-[48px] hover:scale-[1.03] active:scale-[0.98]"
              >
                <Film className="w-4 h-4 text-zinc-400" />
                <span>View Selected Work</span>
              </Link>
            </div>

            <p className="mt-8 text-[10px] sm:text-xs text-zinc-400 font-mono">
              {profileData.complianceNotice}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
