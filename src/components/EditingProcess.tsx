"use client";

import React from "react";
import { processSteps } from "@/data/process";
import { CheckCircle2, GitBranch, ArrowRight } from "lucide-react";

export default function EditingProcess() {
  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-zinc-950/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-lime-400 mb-4">
              <GitBranch className="w-3.5 h-3.5" />
              <span>THE WORKFLOW</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Six-Step Editing Blueprint
            </h2>
          </div>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md leading-relaxed">
            From raw camera files or script ingestion to the polished final broadcast master, every phase is organized for speed and precision.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="relative p-7 rounded-3xl bg-[#111116] border border-white/10 hover:border-lime-400/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-extrabold font-mono text-lime-400">
                    {step.stepNumber}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-300 uppercase px-2.5 py-1 rounded bg-zinc-900 border border-white/5">
                    {step.tagline}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-lime-300 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed mb-5">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <ul className="space-y-1.5">
                  {step.details.map((detail) => (
                    <li
                      key={detail}
                      className="text-xs text-zinc-300 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-lime-400/80" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
