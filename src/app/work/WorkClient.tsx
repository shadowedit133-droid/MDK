"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { FullProjectWithRelations, DbCategory } from "@/lib/db/types";
import { profileData } from "@/data/profile";
import { Film, Play, ArrowUpRight, Clock, Sparkles } from "lucide-react";

interface WorkClientProps {
  initialProjects: FullProjectWithRelations[];
  categories: DbCategory[];
}

export default function WorkClient({
  initialProjects,
  categories,
}: WorkClientProps) {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>("all");

  const filteredProjects =
    activeCategorySlug === "all"
      ? initialProjects
      : initialProjects.filter(
          (p) => p.category && p.category.slug === activeCategorySlug
        );

  return (
    <div>
      {/* Category Filter Tabs with Horizontal Touch Scrolling */}
      {categories.length > 0 && (
        <div className="relative mb-10 sm:mb-14">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar flex-nowrap -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => setActiveCategorySlug("all")}
              className={`px-4 py-2.5 rounded-full text-xs font-mono font-medium whitespace-nowrap transition-all duration-200 cursor-pointer min-h-[42px] flex items-center shrink-0 ${
                activeCategorySlug === "all"
                  ? "bg-lime-400 text-zinc-950 font-bold shadow-lg shadow-lime-400/20"
                  : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-white/[0.06] hover:border-white/15"
              }`}
            >
              All Projects ({initialProjects.length})
            </button>

            {categories.map((category) => {
              const isActive = activeCategorySlug === category.slug;
              const count = initialProjects.filter(
                (p) => p.category?.slug === category.slug
              ).length;

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategorySlug(category.slug)}
                  className={`px-4 py-2.5 rounded-full text-xs font-mono font-medium whitespace-nowrap transition-all duration-200 cursor-pointer min-h-[42px] flex items-center shrink-0 ${
                    isActive
                      ? "bg-lime-400 text-zinc-950 font-bold shadow-lg shadow-lime-400/20"
                      : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-white/[0.06] hover:border-white/15"
                  }`}
                >
                  <span>{category.name}</span>
                  {count > 0 && (
                    <span className="ml-1.5 opacity-60 text-[10px]">({count})</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Projects Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <WorkProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="p-12 sm:p-20 rounded-3xl bg-[#0e0e14] border border-white/[0.08] text-center space-y-4 shadow-xl">
          <Film className="w-12 h-12 text-zinc-600 mx-auto" />
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-lg font-bold text-white font-display">
              No Projects in this Category Yet
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              New project case studies are uploaded and published regularly. You can also explore Muhammad&apos;s verified client track record directly on Upwork.
            </p>
          </div>
          <div className="pt-3">
            <a
              href={profileData.upworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-lime-400 hover:bg-lime-300 text-zinc-950 text-xs font-bold transition-all shadow-lg shadow-lime-400/20"
            >
              <span>View Muhammad&apos;s Upwork Profile</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* Upwork CTA Strip */}
      <div className="mt-14 sm:mt-20 p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-zinc-900/90 via-[#121218] to-zinc-900/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-1 font-display">
              Looking for a tailored editing format?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Discuss your project scope and timelines directly with Muhammad on Upwork.
            </p>
          </div>
        </div>

        <a
          href={profileData.upworkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-full bg-lime-400 hover:bg-lime-300 text-zinc-950 text-xs sm:text-sm font-bold transition-all shadow-lg shadow-lime-400/20 flex items-center justify-center gap-2 whitespace-nowrap min-h-[46px] hover:scale-105"
        >
          <span>Hire on Upwork</span>
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
        </a>
      </div>
    </div>
  );
}

function WorkProjectCard({ project }: { project: FullProjectWithRelations }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const categoryName = project.category?.name || "Video Editing";
  const displayImage = project.thumbnail_url;

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0e0e14] border border-white/[0.08] hover:border-lime-400/40 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] flex flex-col justify-between"
    >
      {/* Video / Thumbnail Viewport */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {project.video_url ? (
          <video
            ref={videoRef}
            src={project.video_url}
            poster={displayImage || undefined}
            muted
            loop
            playsInline
            preload="metadata"
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              isHovered ? "opacity-100" : "opacity-85"
            }`}
          />
        ) : displayImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={displayImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
            <Film className="w-10 h-10 text-zinc-700" />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-transparent to-black/40 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none gap-2">
          <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-mono text-lime-400 truncate">
            {categoryName}
          </span>
          {project.duration && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-mono text-zinc-300 shrink-0">
              <Clock className="w-3 h-3 text-zinc-400" />
              {project.duration}
            </span>
          )}
        </div>

        {/* Play Icon Indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-lime-400 text-zinc-950 flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Info Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
        <div>
          {project.editing_style && (
            <span className="text-[10px] sm:text-xs font-mono text-zinc-400 block mb-1">
              Style: {project.editing_style}
            </span>
          )}

          <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-lime-300 transition-colors line-clamp-2 mb-2 font-display">
            {project.title}
          </h2>

          {project.short_description && (
            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
              {project.short_description}
            </p>
          )}
        </div>

        <div>
          {project.services && project.services.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.services.slice(0, 2).map((srv) => (
                <span
                  key={srv.id}
                  className="px-2 py-0.5 rounded-md bg-zinc-900 border border-white/5 text-[10px] font-mono text-zinc-300"
                >
                  {srv.name}
                </span>
              ))}
              {project.services.length > 2 && (
                <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-white/5 text-[10px] font-mono text-zinc-400">
                  +{project.services.length - 2} more
                </span>
              )}
            </div>
          )}

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold text-zinc-400 group-hover:text-lime-400 transition-colors min-h-[32px]">
            <span>View Full Case Study</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
