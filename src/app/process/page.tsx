import React from "react";
import { Metadata } from "next";
import { processSteps } from "@/data/process";
import { profileData } from "@/data/profile";
import {
  GitBranch,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  FileCheck,
  Film,
  Layers,
  Volume2,
  RefreshCw,
  Send,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Video Editing Process | Muhammad Daniyal Khan",
  description:
    "Discover Muhammad Daniyal Khan's six-step post-production workflow: Understand, Structure, Edit, Polish, Review, and Deliver. Engineered for speed, clear communication, and high production quality.",
  alternates: {
    canonical: "https://muhammaddaniyal.com/process",
  },
  openGraph: {
    title: "Video Editing Process & Workflow | Muhammad Daniyal Khan",
    description:
      "A disciplined 6-stage blueprint from raw footage ingestion to broadcast master delivery.",
    url: "https://muhammaddaniyal.com/process",
  },
};

const stageIcons = [FileCheck, Film, Layers, Volume2, RefreshCw, Send];

export default function ProcessPage() {
  return (
    <main className="pt-28 sm:pt-36 pb-20 lg:pb-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-white/[0.08] text-xs font-mono text-lime-400 mb-3 sm:mb-4">
            <GitBranch className="w-3.5 h-3.5" />
            <span>DISCIPLINED METHODOLOGY</span>
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-display mb-3 sm:mb-4 leading-[1.1]">
            Six-Stage Editing Blueprint
          </h1>
          <p className="text-xs sm:text-base md:text-lg text-zinc-400 leading-relaxed">
            Predictable excellence requires a structured workflow. From initial brief ingestion to high-bitrate export, each stage ensures speed, narrative clarity, and frame-accurate precision.
          </p>
        </div>

        {/* Detailed Stages Vertical Timeline */}
        <div className="space-y-6 sm:space-y-8 relative">
          {processSteps.map((step, idx) => {
            const Icon = stageIcons[idx] || Sparkles;
            return (
              <div
                key={step.stepNumber}
                className="p-6 sm:p-10 md:p-12 rounded-3xl bg-[#0e0e14] border border-white/[0.08] hover:border-lime-400/40 transition-all duration-300 shadow-xl space-y-5 sm:space-y-6 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-lime-400 font-mono font-extrabold text-lg sm:text-xl group-hover:scale-105 transition-transform shadow-inner shrink-0">
                      {step.stepNumber}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-wider block truncate">
                        Phase {step.stepNumber} • {step.tagline}
                      </span>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white group-hover:text-lime-300 transition-colors font-display truncate">
                        {step.title}
                      </h2>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/[0.06] flex items-center justify-center text-zinc-400 group-hover:text-lime-400 transition-colors shrink-0 self-start sm:self-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Stage Description */}
                <p className="text-xs sm:text-base text-zinc-300 leading-relaxed">
                  {step.description}
                </p>

                {/* In-depth details checklist */}
                <div className="pt-2">
                  <h3 className="text-[10px] sm:text-xs font-mono text-lime-400 uppercase tracking-wider mb-3">
                    Key Milestones in This Phase:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    {step.details.map((detail) => (
                      <div
                        key={detail}
                        className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/[0.06] text-xs text-zinc-300 flex items-center gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                        <span className="leading-snug">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Upwork CTA Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-zinc-900 via-[#14141c] to-zinc-900 border border-lime-400/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-2xl font-bold text-white font-display">
              Ready to begin Step 01 with Muhammad?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Submit your project brief and raw assets through Upwork.
            </p>
          </div>

          <a
            href={profileData.upworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-lime-400 hover:bg-lime-300 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-xl shadow-lime-400/20 flex items-center justify-center gap-2 whitespace-nowrap hover:scale-105 min-h-[48px]"
          >
            <span>Start a Project on Upwork</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </main>
  );
}
