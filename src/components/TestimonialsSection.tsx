"use client";

import React from "react";
import { testimonialsConfig } from "@/data/testimonials";
import { profileData } from "@/data/profile";
import { MessageSquare, ArrowUpRight } from "lucide-react";

export default function TestimonialsSection() {
  if (!testimonialsConfig.showTestimonialsCarousel) {
    return null;
  }

  const items = testimonialsConfig.items;

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-white/[0.08] text-xs font-mono text-lime-400 mb-3 sm:mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>CLIENT SATISFACTION</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
              {testimonialsConfig.sectionTitle}
            </h2>
          </div>
          <p className="text-zinc-400 text-xs sm:text-base max-w-md leading-relaxed">
            {testimonialsConfig.sectionSubtitle}
          </p>
        </div>

        {/* Content Box */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Real verified reviews when supplied */}
          </div>
        ) : (
          <div className="p-8 sm:p-14 rounded-3xl bg-[#0e0e14] border border-white/[0.08] text-center space-y-4 shadow-xl">
            <p className="text-zinc-300 text-sm sm:text-base font-mono">
              Verified client feedback will be added here.
            </p>
            <p className="text-zinc-400 text-xs max-w-md mx-auto">
              Muhammad maintains a 5.0 rating and 96% Job Success Score across 27 jobs on Upwork.
            </p>
            <div className="pt-2">
              <a
                href={profileData.upworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 hover:bg-lime-400 text-zinc-300 hover:text-zinc-950 text-xs font-bold transition-all border border-white/10"
              >
                <span>View Upwork Profile Feedback</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
