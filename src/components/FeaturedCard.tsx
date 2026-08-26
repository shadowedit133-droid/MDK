"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { FullProjectWithRelations } from "@/lib/db/types";
import { Film, Play, ArrowRight, Clock } from "lucide-react";

export default function FeaturedCard({
  project,
}: {
  project: FullProjectWithRelations;
}) {
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

        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-transparent to-black/40 pointer-events-none" />

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

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-lime-400 text-zinc-950 flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
        <div>
          {project.editing_style && (
            <span className="text-[10px] sm:text-xs font-mono text-zinc-400 block mb-1">
              Style: {project.editing_style}
            </span>
          )}
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-lime-300 transition-colors line-clamp-2 mb-2 font-display">
            {project.title}
          </h3>
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
            <span>Read Case Study</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
