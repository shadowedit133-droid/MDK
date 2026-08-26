"use client";

import React, { useEffect } from "react";
import { ProjectItem } from "@/data/projects";
import { profileData } from "@/data/profile";
import { X, ArrowUpRight, CheckCircle2, Film, Layers, Sparkles, Clock, Compass, ShieldAlert } from "lucide-react";

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-[#101015] border border-white/15 rounded-3xl shadow-2xl shadow-black/90 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#14141c]">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20 text-xs font-mono">
              {project.category}
            </span>
            <span className="text-xs text-zinc-400 font-mono hidden sm:inline-block">
              Duration: {project.duration}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Title & Style */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 font-display">
              {project.title}
            </h3>
            <p className="text-sm font-mono text-zinc-400 flex items-center gap-2">
              <span className="text-lime-400 font-semibold">Editing Style:</span>
              <span>{project.editingStyle}</span>
            </p>
          </div>

          {/* Video Player / Preview Area */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video">
            {project.videoPreviewUrl ? (
              <video
                src={project.videoPreviewUrl}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-500">
                <Film className="w-12 h-12 mb-2 text-zinc-700" />
                <span className="text-xs font-mono">Preview Media Active</span>
              </div>
            )}

            {project.isPlaceholder && (
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded border border-white/10 text-[10px] font-mono text-zinc-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>CASE STUDY DEMONSTRATION</span>
              </div>
            )}
          </div>

          {/* Project Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-[#14141b] border border-white/5">
            <div>
              <h4 className="text-xs font-mono text-lime-400 uppercase tracking-wider mb-2">
                Project Objective
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {project.briefObjective}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-mono text-lime-400 uppercase tracking-wider mb-2">
                Services Performed
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.servicesPerformed.map((srv) => (
                  <span
                    key={srv}
                    className="px-2.5 py-1 rounded bg-black/40 border border-white/10 text-xs text-zinc-300"
                  >
                    {srv}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Case Study Section: Challenge */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>01. The Challenge</span>
            </div>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed bg-zinc-900/40 p-5 rounded-2xl border border-white/5">
              {project.caseStudy.challenge}
            </p>
          </div>

          {/* Case Study Section: Editing Approach */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-lime-400" />
              <span>02. Editing Approach & Craft</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5">
                <h5 className="text-xs font-semibold text-white mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-lime-400" />
                  <span>Pacing & Narrative Structure</span>
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {project.caseStudy.approach.pacingAndStructure}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5">
                <h5 className="text-xs font-semibold text-white mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  <span>B-Roll & Visual Enhancements</span>
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {project.caseStudy.approach.bRollAndVisuals}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5">
                <h5 className="text-xs font-semibold text-white mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sound Design & Color Grade</span>
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {project.caseStudy.approach.soundAndColor}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5">
                <h5 className="text-xs font-semibold text-white mb-1.5 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Audience Retention Tactics</span>
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {project.caseStudy.approach.retentionTactics}
                </p>
              </div>
            </div>
          </div>

          {/* Case Study Section: Final Result */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>03. Final Result & Impact</span>
            </div>
            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-white/5">
              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                {project.caseStudy.result}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.caseStudy.keyHighlights.map((hl) => (
                  <span
                    key={hl}
                    className="inline-flex items-center gap-1.5 text-xs text-lime-400 bg-lime-400/10 px-3 py-1 rounded-full border border-lime-400/20 font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{hl}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 bg-[#14141c] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-400 text-center sm:text-left">
            <span>Want a similar edit for your project?</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors"
            >
              Close Case Study
            </button>
            <a
              href={profileData.upworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-lime-400 hover:bg-lime-300 text-zinc-950 text-xs font-bold transition-all shadow-lg shadow-lime-400/20 flex items-center justify-center gap-1.5"
            >
              <span>Discuss on Upwork</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
