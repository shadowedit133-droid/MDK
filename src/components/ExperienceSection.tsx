"use client";

import React from "react";
import { experienceData } from "@/data/experience";
import { History } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-white/[0.08] text-xs font-mono text-lime-400 mb-3 sm:mb-4">
              <History className="w-3.5 h-3.5" />
              <span>CAREER EVOLUTION</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
              5+ Years Behind the Timeline
            </h2>
          </div>
          <p className="text-zinc-400 text-xs sm:text-base max-w-md leading-relaxed">
            A continuous journey of mastering video craft, pacing psychology, and full-spectrum post-production workflows.
          </p>
        </div>

        {/* Milestone Vertical Cards */}
        <div className="relative border-l-2 border-zinc-800/80 ml-3 sm:ml-6 pl-5 sm:pl-10 space-y-6 sm:space-y-8">
          {experienceData.map((milestone) => (
            <div
              key={milestone.stageTitle}
              className="relative group transition-all"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[27px] sm:-left-[47px] top-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-zinc-950 border-2 border-zinc-700 group-hover:border-lime-400 flex items-center justify-center transition-colors">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-zinc-500 group-hover:bg-lime-400 transition-colors" />
              </div>

              {/* Milestone Box */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0e14] border border-white/[0.08] hover:border-lime-400/30 transition-all duration-300 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <span className="text-[11px] sm:text-xs font-mono text-lime-400 font-bold uppercase tracking-wider">
                    {milestone.period}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-zinc-300 bg-zinc-900 px-3 py-1 rounded-full border border-white/[0.06] w-fit">
                    Focus: {milestone.focusArea}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-lime-300 transition-colors font-display">
                  {milestone.stageTitle}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {milestone.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                  {milestone.skillsDeveloped.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] sm:text-xs font-mono text-zinc-300 bg-zinc-900/80 px-2.5 py-1 rounded-md border border-white/[0.06]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
