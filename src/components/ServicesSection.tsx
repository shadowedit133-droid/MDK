import React from "react";
import { servicesData } from "@/data/services";
import { profileData } from "@/data/profile";
import { ArrowUpRight, Check, Sparkles, Sliders, PlaySquare, Video, Film, Eye, Award } from "lucide-react";

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-zinc-950/40">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-lime-400 mb-4">
              <Sliders className="w-3.5 h-3.5" />
              <span>EDITING CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Editing Built Around Attention
            </h2>
          </div>
          <p className="text-zinc-400 text-sm sm:text-base max-w-lg leading-relaxed">
            Every format demands a unique visual rhythm. Explore the specialized services engineered for maximum retention, clarity, and brand prestige.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, idx) => (
            <div
              key={service.id}
              className="relative rounded-3xl p-7 bg-[#111116] border border-white/10 hover:border-lime-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-lime-400/5 group flex flex-col justify-between"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-lime-400 bg-lime-400/10 px-3 py-1 rounded-full border border-lime-400/20">
                    {service.tag}
                  </span>
                  <span className="text-xs font-mono text-zinc-600">
                    0{idx + 1}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-lime-300 transition-colors">
                  {service.title}
                </h3>

                {/* Short & Full Description */}
                <p className="text-xs font-medium text-zinc-300 mb-3">
                  {service.shortDesc}
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  {service.fullDesc}
                </p>

                {/* Key Deliverables */}
                <div className="mb-6 pt-4 border-t border-white/5">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-3">
                    Deliverables & Craft:
                  </span>
                  <ul className="space-y-2">
                    {service.deliverables.map((del) => (
                      <li
                        key={del}
                        className="text-xs text-zinc-300 flex items-start gap-2"
                      >
                        <Check className="w-3.5 h-3.5 text-lime-400 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Best For & CTA */}
              <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                <p className="text-[11px] text-zinc-400">
                  <span className="text-zinc-400 font-semibold">Best for: </span>
                  {service.bestFor}
                </p>

                <a
                  href={profileData.upworkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-2 py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-lime-400 text-zinc-300 hover:text-zinc-950 text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 border border-white/5 hover:border-lime-400"
                >
                  <span>Order via Upwork</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
