"use client";

import React, { useState, useRef } from "react";
import {
  projectCategories,
  projectsData,
  ProjectCategory,
  ProjectItem,
} from "@/data/projects";
import { profileData } from "@/data/profile";
import { Film, Play, ArrowUpRight, Sparkles, Clock, Layers, ExternalLink } from "lucide-react";
import CaseStudyModal from "./CaseStudyModal";

export default function SelectedWork() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [selectedProjectForModal, setSelectedProjectForModal] =
    useState<ProjectItem | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Ambient Glow */}
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-lime-400 mb-4">
              <Film className="w-3.5 h-3.5" />
              <span>CURATED PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Selected Work
            </h2>
          </div>
          <p className="text-zinc-400 text-sm sm:text-base max-w-lg leading-relaxed">
            A selection of edits designed to capture attention, maintain viewer retention, and tell unforgettable stories across formats.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none no-scrollbar">
          {projectCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-lime-400 text-zinc-950 font-bold shadow-lg shadow-lime-400/20 scale-105"
                    : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-white/5 hover:border-white/15"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenCaseStudy={() => setSelectedProjectForModal(project)}
            />
          ))}
        </div>

        {/* Bottom Upwork Link Strip */}
        <div className="mt-16 p-6 rounded-2xl bg-zinc-900/40 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Have a specific editing style or reference in mind?
              </p>
              <p className="text-xs text-zinc-400">
                Share your footage and creative vision directly on Upwork.
              </p>
            </div>
          </div>

          <a
            href={profileData.upworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-lime-400 hover:bg-lime-300 text-zinc-950 text-xs font-bold transition-all shadow-lg shadow-lime-400/20 flex items-center gap-2 whitespace-nowrap"
          >
            <span>Start a Project on Upwork</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProjectForModal}
        onClose={() => setSelectedProjectForModal(null)}
      />
    </section>
  );
}

function ProjectCard({
  project,
  onOpenCaseStudy,
}: {
  project: ProjectItem;
  onOpenCaseStudy: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted or unsupported
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onOpenCaseStudy}
      className="group relative rounded-3xl overflow-hidden bg-[#111116] border border-white/10 hover:border-lime-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-lime-400/5 cursor-pointer flex flex-col justify-between"
    >
      {/* Media Viewport */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {project.videoPreviewUrl ? (
          <video
            ref={videoRef}
            src={project.videoPreviewUrl}
            muted
            loop
            playsInline
            preload="metadata"
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              isHovered ? "opacity-100" : "opacity-80"
            }`}
          />
        ) : (
          <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
            <Film className="w-10 h-10 text-zinc-700" />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-lime-400">
            {project.category}
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-300">
            <Clock className="w-3 h-3 text-zinc-400" />
            {project.duration}
          </span>
        </div>

        {/* Hover Play Prompt */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-lime-400 text-zinc-950 flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-zinc-300">
              Style: {project.editingStyle}
            </span>
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-lime-300 transition-colors line-clamp-2 mb-3">
            {project.title}
          </h3>

          <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed mb-4">
            {project.briefObjective}
          </p>
        </div>

        {/* Services Tags & Case Study Trigger */}
        <div>
          <div className="flex flex-wrap gap-1 mb-4">
            {project.servicesPerformed.slice(0, 2).map((srv) => (
              <span
                key={srv}
                className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-[10px] text-zinc-300"
              >
                {srv}
              </span>
            ))}
            {project.servicesPerformed.length > 2 && (
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-[10px] text-zinc-300">
                +{project.servicesPerformed.length - 2} more
              </span>
            )}
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-lime-400 transition-colors">
            <span>Read Case Study</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}
