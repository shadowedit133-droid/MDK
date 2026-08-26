import React from "react";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { Sliders, ArrowRight, Check } from "lucide-react";

export default function ServicesPreview() {
  const topServices = servicesData.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative bg-zinc-950/40 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-white/[0.08] text-xs font-mono text-lime-400 mb-3 sm:mb-4">
              <Sliders className="w-3.5 h-3.5" />
              <span>POST-PRODUCTION SERVICES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
              Editing Built Around Attention
            </h2>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-lime-400 hover:text-lime-300 transition-colors group min-h-[40px]"
          >
            <span>Explore All Services ({servicesData.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Top Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {topServices.map((service, idx) => (
            <div
              key={service.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#0e0e14] border border-white/[0.08] hover:border-lime-400/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-lime-400 bg-lime-400/10 px-3 py-1 rounded-full border border-lime-400/20">
                    {service.tag}
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-zinc-600 font-bold">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-lime-300 transition-colors mb-2 font-display">
                  {service.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                <ul className="space-y-2.5 mb-6 pt-4 border-t border-white/[0.06]">
                  {service.deliverables.slice(0, 3).map((del) => (
                    <li
                      key={del}
                      className="text-xs text-zinc-300 flex items-center gap-2"
                    >
                      <Check className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/services"
                className="pt-4 border-t border-white/[0.06] text-xs font-bold text-zinc-400 group-hover:text-lime-400 transition-colors flex items-center justify-between min-h-[36px]"
              >
                <span>View Full Package</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#111116] hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 text-xs sm:text-sm font-bold transition-all hover:scale-105 shadow-xl min-h-[48px]"
          >
            <span>Explore All 7 Editing Packages</span>
            <ArrowRight className="w-4 h-4 text-lime-400" />
          </Link>
        </div>
      </div>
    </section>
  );
}
