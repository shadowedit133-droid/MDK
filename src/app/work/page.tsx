import React from "react";
import { Metadata } from "next";
import { getAllPublishedProjects } from "@/lib/db/projects";
import { getActiveCategories } from "@/lib/db/categories";
import WorkClient from "./WorkClient";

export const metadata: Metadata = {
  title: "Video Editing Portfolio | Muhammad Daniyal Khan",
  description:
    "Explore the complete video editing portfolio of Muhammad Daniyal Khan. Featuring high-retention YouTube long-form videos, faceless Cash Cow content, vertical Shorts, and cinematic documentaries.",
  alternates: {
    canonical: "https://muhammaddaniyal.com/work",
  },
  openGraph: {
    title: "Video Editing Portfolio | Muhammad Daniyal Khan",
    description:
      "Explore high-retention YouTube, faceless Cash Cow, vertical reels, and documentary edits.",
    url: "https://muhammaddaniyal.com/work",
  },
};

export default async function WorkPage() {
  const [projects, categories] = await Promise.all([
    getAllPublishedProjects(),
    getActiveCategories(),
  ]);

  return (
    <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Hero Header */}
        <div className="mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-white/[0.08] text-xs font-mono text-lime-400 mb-3 sm:mb-4">
            <span>COMPLETE PORTFOLIO CATALOG</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-display mb-4">
            Selected Work
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            A comprehensive showcase of edits engineered to captivate audiences, maintain viewer attention, and deliver clear stories across platforms.
          </p>
        </div>

        {/* Interactive Filterable Work Client */}
        <WorkClient initialProjects={projects} categories={categories} />
      </div>
    </main>
  );
}
