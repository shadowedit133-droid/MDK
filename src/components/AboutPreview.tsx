import React from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { User, ArrowRight, GitBranch } from "lucide-react";

export default function AboutPreview() {
  const { fullName, shortRole, stats, about } = profileData;

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Monogram Card */}
          <div className="lg:col-span-5">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0e0e14] border border-white/[0.08] space-y-6 shadow-2xl relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/15 flex items-center justify-center font-bold text-xl text-lime-400 font-mono shadow-inner">
                MDK
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white font-display">
                  {fullName}
                </h3>
                <p className="text-xs font-mono text-lime-400 mt-0.5">
                  {shortRole} • Top Rated on Upwork
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/[0.06] text-xs text-zinc-300">
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/[0.06]">
                  <span className="text-[10px] sm:text-xs font-mono text-zinc-400 block mb-0.5">Experience</span>
                  <span className="font-bold text-white text-sm">5+ Years</span>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/[0.06]">
                  <span className="text-[10px] sm:text-xs font-mono text-zinc-400 block mb-0.5">Upwork Score</span>
                  <span className="font-bold text-lime-400 text-sm">{stats.jobSuccessScore}% JSS</span>
                </div>
              </div>

              <Link
                href="/about"
                className="w-full py-3.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 border border-white/10"
              >
                <span>Full Bio & Milestone Timeline</span>
                <ArrowRight className="w-4 h-4 text-lime-400" />
              </Link>
            </div>
          </div>

          {/* Right Column: Brief Story & Route Links */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-white/[0.08] text-xs font-mono text-lime-400">
              <User className="w-3.5 h-3.5" />
              <span>ABOUT THE EDITOR</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display leading-[1.12]">
              Editing Is Where Raw Footage Becomes a Story.
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {about.paragraphs[0]}
            </p>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {about.paragraphs[1]}
            </p>

            {/* CTAs to /about and /process */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="px-7 py-3.5 rounded-full bg-lime-400 hover:bg-lime-300 text-zinc-950 text-xs sm:text-sm font-bold transition-all shadow-lg shadow-lime-400/20 flex items-center gap-2 hover:scale-105"
              >
                <span>About Muhammad</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/process"
                className="px-7 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs sm:text-sm font-bold transition-all flex items-center gap-2 hover:scale-105"
              >
                <GitBranch className="w-3.5 h-3.5 text-lime-400" />
                <span>View Editing Process</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
