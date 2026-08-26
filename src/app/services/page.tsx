import React from "react";
import { Metadata } from "next";
import { servicesData } from "@/data/services";
import { profileData } from "@/data/profile";
import { ArrowUpRight, Check, Sliders } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Video Editing Services | Muhammad Daniyal Khan",
  description:
    "Explore Muhammad Daniyal Khan's video editing services: High-retention YouTube editing, faceless Cash Cow videos, vertical Shorts/Reels, documentary storytelling, motion graphics, and post-production finishing.",
  alternates: {
    canonical: "https://muhammaddaniyal.com/services",
  },
  openGraph: {
    title: "Video Editing Services | Muhammad Daniyal Khan",
    description:
      "Engineered for attention: YouTube, Cash Cow, Shorts, Documentary, Motion Graphics & Commercials.",
    url: "https://muhammaddaniyal.com/services",
  },
};

export default function ServicesPage() {
  return (
    <main className="pt-28 sm:pt-36 pb-20 lg:pb-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Header Banner */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-white/[0.08] text-xs font-mono text-lime-400 mb-3 sm:mb-4">
            <Sliders className="w-3.5 h-3.5" />
            <span>FULL SUITE POST-PRODUCTION</span>
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-display mb-3 sm:mb-4 leading-[1.1]">
            Editing Built Around Attention
          </h1>
          <p className="text-xs sm:text-base md:text-lg text-zinc-400 leading-relaxed">
            Every platform and format has a distinctive rhythm. Discover specialized post-production services engineered to hold viewer attention, reinforce brand authority, and elevate your visual assets.
          </p>
        </div>

        {/* Expanded Services List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {servicesData.map((service, idx) => (
            <div
              key={service.id}
              className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#0e0e14] border border-white/[0.08] hover:border-lime-400/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-lime-400 bg-lime-400/10 px-3 py-1 rounded-full border border-lime-400/20">
                    {service.tag}
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-zinc-600 font-bold">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-lime-300 transition-colors mb-2 font-display">
                    {service.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-zinc-300 mb-2 sm:mb-3">
                    {service.shortDesc}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {service.fullDesc}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="pt-3 sm:pt-4 border-t border-white/[0.06] space-y-2 sm:space-y-3">
                  <span className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                    What&apos;s Included in This Package:
                  </span>
                  <ul className="space-y-2">
                    {service.deliverables.map((del) => (
                      <li
                        key={del}
                        className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2 sm:gap-2.5"
                      >
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-lime-400 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer with Upwork CTA */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/[0.06] space-y-3 sm:space-y-4">
                <p className="text-[11px] sm:text-xs text-zinc-400">
                  <span className="font-semibold text-zinc-300">Ideal For: </span>
                  {service.bestFor}
                </p>

                <a
                  href={profileData.upworkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-zinc-900/90 hover:bg-lime-400 text-zinc-200 hover:text-zinc-950 text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 border border-white/10 hover:border-lime-400 shadow-md min-h-[46px]"
                >
                  <span>Discuss Your Project on Upwork</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Global Compliance Assurance Strip */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#111116] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-2xl">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-white font-display">
              Upwork Contract & Communication Workflow
            </h3>
            <p className="text-xs text-zinc-400">
              Projects initiated through Upwork follow the platform&apos;s contract and communication workflow.
            </p>
          </div>

          <a
            href={profileData.upworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-lime-400 hover:bg-lime-300 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-xl shadow-lime-400/20 flex items-center justify-center gap-2 whitespace-nowrap min-h-[48px] hover:scale-105"
          >
            <span>Hire Muhammad on Upwork</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </main>
  );
}
