import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllPublishedProjects } from "@/lib/db/projects";
import { profileData } from "@/data/profile";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Film,
  Layers,
  Compass,
  Volume2,
  Check,
} from "lucide-react";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Muhammad Daniyal Khan",
    };
  }

  const ogImages = project.thumbnail_url
    ? [
        {
          url: project.thumbnail_url,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ]
    : ["/og-image.jpg"];

  return {
    title: `${project.title} | Video Editing Case Study`,
    description:
      project.short_description ||
      project.overview ||
      `Case study and video post-production details for ${project.title}.`,
    alternates: {
      canonical: `https://muhammaddaniyal.com/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Case Study | Muhammad Daniyal Khan`,
      description:
        project.short_description ||
        project.overview ||
        `Video editing breakdown for ${project.title}.`,
      url: `https://muhammaddaniyal.com/work/${project.slug}`,
      images: ogImages,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getAllPublishedProjects(),
  ]);

  if (!project) {
    notFound();
  }

  // Find previous & next projects in published catalog
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex !== -1 && currentIndex < allProjects.length - 1;
  const prevProject = hasPrev ? allProjects[currentIndex - 1] : null;
  const nextProject = hasNext ? allProjects[currentIndex + 1] : null;

  const categoryName = project.category?.name || "Video Editing";
  const approach = project.approach;

  const hasPacing = Boolean(approach?.pacing_and_structure);
  const hasVisuals = Boolean(approach?.b_roll_and_visuals);
  const hasSound = Boolean(approach?.sound_and_color);
  const hasRetention = Boolean(approach?.retention_tactics);
  const hasAnyApproach = hasPacing || hasVisuals || hasSound || hasRetention;

  return (
    <main className="pt-28 sm:pt-36 pb-20 lg:pb-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10 sm:space-y-14">
        {/* Top Back Link */}
        <div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-lime-400 transition-colors py-2 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Selected Work</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="space-y-4 sm:space-y-5">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="px-3 py-1 rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20 text-xs font-mono">
              {categoryName}
            </span>
            {project.duration && (
              <span className="text-xs text-zinc-400 font-mono flex items-center gap-1.5 bg-zinc-900/60 px-3 py-1 rounded-full border border-white/[0.06]">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                Duration: {project.duration}
              </span>
            )}
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight font-display leading-[1.1] break-words">
            {project.title}
          </h1>

          {project.editing_style && (
            <p className="text-xs sm:text-sm font-mono text-lime-400/90">
              Editing Style:{" "}
              <span className="text-zinc-300 font-sans">{project.editing_style}</span>
            </p>
          )}
        </div>

        {/* Hero Video Media Player */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.12] bg-black aspect-video shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
          {project.video_url ? (
            <video
              src={project.video_url}
              poster={project.thumbnail_url || undefined}
              autoPlay
              loop
              muted
              playsInline
              controls
              preload="metadata"
              className="w-full h-full object-cover"
            />
          ) : project.thumbnail_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={project.thumbnail_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-500">
              <Film className="w-12 h-12 sm:w-16 sm:h-16 mb-2 text-zinc-700" />
              <span className="text-xs font-mono">Portfolio Video Media</span>
            </div>
          )}
        </div>

        {/* Overview & Deliverables Grid */}
        {(project.overview || (project.services && project.services.length > 0)) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-10 rounded-3xl bg-[#0e0e14] border border-white/[0.08]">
            {project.overview && (
              <div>
                <h2 className="text-xs font-mono text-lime-400 uppercase tracking-wider mb-2.5 sm:mb-3">
                  Project Overview & Brief
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {project.overview}
                </p>
              </div>
            )}

            {project.services && project.services.length > 0 && (
              <div>
                <h2 className="text-xs font-mono text-lime-400 uppercase tracking-wider mb-2.5 sm:mb-3">
                  Services Provided
                </h2>
                <ul className="space-y-2">
                  {project.services.map((srv) => (
                    <li
                      key={srv.id}
                      className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2.5"
                    >
                      <Check className="w-3.5 h-3.5 text-lime-400 shrink-0 mt-0.5" />
                      <span>{srv.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 01. The Challenge (conditionally rendered) */}
        {project.challenge && (
          <section className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>01. The Creative Challenge</span>
            </div>
            <div className="p-6 sm:p-10 rounded-3xl bg-[#0e0e14] border border-white/[0.08]">
              <p className="text-xs sm:text-base text-zinc-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>
          </section>
        )}

        {/* 02. Editing Approach & Craft (conditionally rendered) */}
        {hasAnyApproach && (
          <section className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-lime-400" />
              <span>02. Editing Approach & Execution</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {hasPacing && (
                <div className="p-6 sm:p-7 rounded-3xl bg-[#0e0e14] border border-white/[0.08] hover:border-lime-400/30 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-lime-400 mb-4">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-display">
                    Pacing & Narrative Structure
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {approach?.pacing_and_structure}
                  </p>
                </div>
              )}

              {hasVisuals && (
                <div className="p-6 sm:p-7 rounded-3xl bg-[#0e0e14] border border-white/[0.08] hover:border-sky-400/30 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-sky-400 mb-4">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-display">
                    B-Roll & Motion Graphics
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {approach?.b_roll_and_visuals}
                  </p>
                </div>
              )}

              {hasSound && (
                <div className="p-6 sm:p-7 rounded-3xl bg-[#0e0e14] border border-white/[0.08] hover:border-amber-400/30 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-amber-400 mb-4">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-display">
                    Sound Design & Color Science
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {approach?.sound_and_color}
                  </p>
                </div>
              )}

              {hasRetention && (
                <div className="p-6 sm:p-7 rounded-3xl bg-[#0e0e14] border border-white/[0.08] hover:border-emerald-400/30 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-emerald-400 mb-4">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-display">
                    Audience Retention Tactics
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {approach?.retention_tactics}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 03. Final Result & Deliverables (conditionally rendered) */}
        {(project.result_summary || (project.deliverables && project.deliverables.length > 0)) && (
          <section className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>03. Final Result & Deliverables</span>
            </div>

            <div className="p-6 sm:p-10 rounded-3xl bg-[#0e0e14] border border-white/[0.08] space-y-6">
              {project.result_summary && (
                <p className="text-xs sm:text-base text-zinc-300 leading-relaxed">
                  {project.result_summary}
                </p>
              )}

              {project.deliverables && project.deliverables.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {project.deliverables.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-zinc-900/80 border border-white/[0.06] flex items-center gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                      <span className="text-xs text-zinc-200">{item.item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Project Navigation Footer (Prev / Next) */}
        <div className="pt-8 sm:pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevProject ? (
            <Link
              href={`/work/${prevProject.slug}`}
              className="flex items-center gap-3 p-4 rounded-2xl bg-[#0e0e14] hover:bg-zinc-900 border border-white/[0.08] hover:border-lime-400/30 transition-all w-full sm:w-auto group min-h-[48px]"
            >
              <ArrowLeft className="w-4 h-4 text-lime-400 group-hover:-translate-x-1 transition-transform shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                  Previous Project
                </span>
                <span className="text-xs sm:text-sm font-bold text-white group-hover:text-lime-300 transition-colors line-clamp-1">
                  {prevProject.title}
                </span>
              </div>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextProject && (
            <Link
              href={`/work/${nextProject.slug}`}
              className="flex items-center justify-end gap-3 p-4 rounded-2xl bg-[#0e0e14] hover:bg-zinc-900 border border-white/[0.08] hover:border-lime-400/30 transition-all w-full sm:w-auto text-right group min-h-[48px]"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                  Next Project
                </span>
                <span className="text-xs sm:text-sm font-bold text-white group-hover:text-lime-300 transition-colors line-clamp-1">
                  {nextProject.title}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-lime-400 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          )}
        </div>

        {/* Global Upwork Project CTA Strip */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-zinc-900/90 via-[#121218] to-zinc-900/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-2xl">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">
              Ready to create a video in this format?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Work with Muhammad directly on Upwork with milestone protection and transparent timelines.
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
