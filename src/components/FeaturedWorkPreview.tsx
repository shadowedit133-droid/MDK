import React from "react";
import Link from "next/link";
import { getFeaturedPublishedProjects } from "@/lib/db/projects";
import { Film, ArrowRight } from "lucide-react";
import FeaturedCard from "./FeaturedCard";

export default async function FeaturedWorkPreview() {
  const featured = await getFeaturedPublishedProjects(3);

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-white/[0.08] text-xs font-mono text-lime-400 mb-3 sm:mb-4">
              <Film className="w-3.5 h-3.5" />
              <span>FEATURED HIGHLIGHTS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
              Selected Work
            </h2>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-lime-400 hover:text-lime-300 transition-colors group min-h-[40px]"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Featured Projects Grid */}
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {featured.map((project) => (
              <FeaturedCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="p-10 sm:p-14 rounded-3xl bg-[#0e0e14] border border-white/[0.08] text-center space-y-4 shadow-xl">
            <Film className="w-10 h-10 text-zinc-600 mx-auto" />
            <div className="max-w-md mx-auto space-y-1.5">
              <p className="text-white text-base font-bold font-display">
                Curating Featured Projects
              </p>
              <p className="text-xs sm:text-sm text-zinc-400">
                New featured video case studies will appear here as they are published.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 hover:bg-lime-400 text-zinc-300 hover:text-zinc-950 text-xs font-bold transition-all border border-white/10"
              >
                <span>Browse Full Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Bottom CTA to /work */}
        {featured.length > 0 && (
          <div className="mt-12 sm:mt-16 text-center">
            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-[#111116] hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 text-xs sm:text-sm font-bold transition-all hover:scale-105 shadow-xl min-h-[48px]"
            >
              <span>Explore All Categories & Edits</span>
              <ArrowRight className="w-4 h-4 text-lime-400" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
