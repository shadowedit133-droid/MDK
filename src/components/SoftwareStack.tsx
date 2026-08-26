"use client";

import React from "react";
import { softwareStack } from "@/data/skills";
import { Cpu } from "lucide-react";

export default function SoftwareStack() {
  return (
    <section id="tools" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative bg-zinc-950/40 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-white/[0.08] text-xs font-mono text-lime-400 mb-3 sm:mb-4">
              <Cpu className="w-3.5 h-3.5" />
              <span>TECHNICAL ARSENAL</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
              Software & Creative Stack
            </h2>
          </div>
          <p className="text-zinc-400 text-xs sm:text-base max-w-md leading-relaxed">
            Non-linear editing and motion graphics tools utilized for high-standard video deliverables.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl">
          {softwareStack.map((tool) => (
            <div
              key={tool.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#0e0e14] border border-white/[0.08] hover:border-lime-400/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Header Icon + Code */}
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center font-mono font-bold text-lg sm:text-xl text-lime-400 group-hover:scale-105 group-hover:border-lime-400/50 transition-all shadow-inner">
                    {tool.shortCode}
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono text-zinc-300 uppercase px-3 py-1 rounded-full bg-zinc-900 border border-white/[0.06]">
                    {tool.category}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-lime-300 transition-colors font-display">
                  {tool.name}
                </h3>
                <p className="text-xs font-mono text-lime-400/90 mb-3">
                  {tool.roleInWorkflow}
                </p>

                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  {tool.tagline}
                </p>
              </div>

              {/* Tool Capabilities */}
              <div className="pt-4 border-t border-white/[0.06]">
                <div className="flex flex-wrap gap-1.5">
                  {tool.features.map((feat) => (
                    <span
                      key={feat}
                      className="text-[10px] font-mono text-zinc-300 bg-zinc-900/80 px-2.5 py-1 rounded-md border border-white/[0.06]"
                    >
                      {feat}
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
