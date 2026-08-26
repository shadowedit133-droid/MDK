"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { ArrowUpRight, Award, UserCheck } from "lucide-react";

export default function UpworkSuccess() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Main Credibility Showcase Card */}
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-[#0e0e14] border border-white/[0.08] shadow-2xl overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-lime-400/[0.04] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20 text-[10px] sm:text-xs font-mono">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>VERIFIED PLATFORM TRACK RECORD</span>
              </div>

              <h2 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display leading-[1.12]">
                Proven on Upwork.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-lime-300">
                  Trusted Globally.
                </span>
              </h2>

              <p className="text-xs sm:text-base text-zinc-400 leading-relaxed max-w-xl">
                A track record built through successful client collaborations on Upwork. Delivering high-retention video edits with reliable milestone management and crystal-clear communication.
              </p>

              {/* Verified Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2 sm:pt-4">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-white/[0.06]">
                  <span className="text-[10px] sm:text-xs font-mono text-zinc-400 block mb-0.5">Status</span>
                  <span className="text-base sm:text-lg font-bold text-lime-400 font-display">Top Rated</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-white/[0.06]">
                  <span className="text-[10px] sm:text-xs font-mono text-zinc-400 block mb-0.5">Job Success</span>
                  <span className="text-base sm:text-lg font-bold text-white font-display">96%</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-white/[0.06]">
                  <span className="text-[10px] sm:text-xs font-mono text-zinc-400 block mb-0.5">Client Rating</span>
                  <span className="text-base sm:text-lg font-bold text-white font-display">5.0 / 5.0</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-white/[0.06]">
                  <span className="text-[10px] sm:text-xs font-mono text-zinc-400 block mb-0.5">Total Jobs</span>
                  <span className="text-base sm:text-lg font-bold text-white font-display">27 Jobs</span>
                </div>
              </div>

              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
                <a
                  href={profileData.upworkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-lime-400 hover:bg-lime-300 text-zinc-950 font-bold text-xs sm:text-sm transition-all duration-200 shadow-xl shadow-lime-400/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] min-h-[48px]"
                >
                  <span>View Verified Upwork Profile</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </a>

                <span className="text-[10px] sm:text-xs text-zinc-400 font-mono text-center sm:text-left">
                  Muhammad D. • Islamabad, Pakistan
                </span>
              </div>
            </div>

            {/* Right Column: Platform Credibility Box */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#14141c]/90 border border-white/[0.08] shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-lime-400/20 border border-lime-400/30 flex items-center justify-center text-lime-400 shrink-0">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Upwork Public Display</p>
                      <p className="text-[10px] sm:text-xs text-zinc-400 font-mono">Muhammad D.</p>
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono text-lime-400 px-2.5 py-1 rounded bg-lime-400/10 border border-lime-400/20">
                    Verified Profile
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-zinc-300">
                  <div className="flex items-center justify-between py-1 border-b border-white/[0.06]">
                    <span className="text-zinc-400">Experience</span>
                    <span className="font-semibold text-white">5+ Years Video Editing</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-white/[0.06]">
                    <span className="text-zinc-400">Public Feedback</span>
                    <span className="font-semibold text-white">5.0 Rating</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-white/[0.06]">
                    <span className="text-zinc-400">Specialization</span>
                    <span className="font-semibold text-lime-300 text-right">YouTube & Cash Cow</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-zinc-400">Pre-Contract Terms</span>
                    <span className="font-semibold text-zinc-300">Handled via Upwork</span>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-[10px] sm:text-xs text-zinc-400 leading-normal text-center italic">
                    &ldquo;For Upwork clients, project communication and hiring are handled through Upwork.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
