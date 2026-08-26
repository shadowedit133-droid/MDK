import React from "react";
import { whyWorkWithMeData } from "@/data/whyWorkWithMe";
import { Compass, Zap, Eye, LayoutGrid, ShieldCheck, RefreshCw, Sparkles } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Compass,
  Zap,
  Eye,
  LayoutGrid,
  ShieldCheck,
  RefreshCw,
};

export default function WhyWorkWithMe() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-white/[0.08] text-xs font-mono text-lime-400 mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STANDARDS & ADVANTAGES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display mb-3 sm:mb-4">
            Why Work With Muhammad
          </h2>
          <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">
            High production quality isn&apos;t accidental. It is the result of disciplined storytelling, technical precision, and client-centric workflows.
          </p>
        </div>

        {/* 6 Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {whyWorkWithMeData.map((item) => {
            const Icon = iconMap[item.iconName] || Sparkles;
            return (
              <div
                key={item.id}
                className="p-6 sm:p-8 rounded-3xl bg-[#0e0e14] border border-white/[0.08] hover:border-lime-400/30 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-lime-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-xs font-mono text-zinc-600 font-bold">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-lime-300 transition-colors font-display">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-[10px] sm:text-xs font-mono text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400/60" />
                  <span>Quality Assurance Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
