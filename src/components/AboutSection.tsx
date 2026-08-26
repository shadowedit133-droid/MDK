"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { User, CheckCircle2, ArrowUpRight } from "lucide-react";

export default function AboutSection() {
  const { about, fullName, shortRole, stats } = profileData;

  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Column: Portrait & Credibility Pillar */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-8 sm:p-10 bg-[#0e0e14] border border-white/[0.08] overflow-hidden shadow-2xl space-y-6">
              {/* Monogram Representation */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-zinc-900 border border-white/15 flex items-center justify-center font-bold text-xl sm:text-2xl text-lime-400 font-mono shadow-inner">
                MDK
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 font-display">
                  {fullName}
                </h3>
                <p className="text-xs font-mono text-lime-400">
                  {shortRole} • 5+ Years Experience
                </p>
              </div>

              <div className="space-y-3 text-xs text-zinc-400 border-t border-white/[0.06] pt-4">
                <div className="flex items-center justify-between">
                  <span>Location</span>
                  <span className="text-zinc-200 font-medium truncate ml-2">Islamabad, Pakistan</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Marketplace</span>
                  <span className="text-zinc-200 font-medium">Upwork Top Rated</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Job Success</span>
                  <span className="text-lime-400 font-semibold">{stats.jobSuccessScore}% Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Rating</span>
                  <span className="text-zinc-200 font-medium">5.0 Rating</span>
                </div>
              </div>

              <a
                href={profileData.upworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-zinc-900 hover:bg-lime-400 text-zinc-200 hover:text-zinc-950 text-xs font-bold transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-lime-400 min-h-[46px]"
              >
                <span>View Full Upwork Profile</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Focus Areas */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-white/[0.08] text-xs font-mono text-lime-400">
              <User className="w-3.5 h-3.5" />
              <span>THE EDITOR&apos;S PHILOSOPHY</span>
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display leading-[1.12]">
              {about.heading}
            </h2>

            <div className="space-y-3.5 sm:space-y-4 text-zinc-300 text-xs sm:text-base leading-relaxed">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Focus Pillars */}
            <div className="pt-2 sm:pt-4">
              <h3 className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
                Core Specialization Areas:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {about.focusAreas.map((focus) => (
                  <div
                    key={focus}
                    className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#0e0e14] border border-white/[0.06] text-xs text-zinc-200 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                    <span>{focus}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
