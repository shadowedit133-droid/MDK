import React from "react";

export default function CaseStudyLoading() {
  return (
    <main
      className="pt-28 sm:pt-36 pb-20 lg:pb-28 px-4 sm:px-6 lg:px-8"
      aria-busy="true"
      aria-label="Loading case study details"
    >
      <div className="max-w-5xl mx-auto space-y-10 sm:space-y-14 animate-pulse">
        {/* Back Link Skeleton */}
        <div className="h-5 w-32 bg-zinc-900 rounded-lg" />

        {/* Title and Category Header Skeleton */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="h-6 w-24 bg-zinc-900 rounded-full" />
            <div className="h-6 w-28 bg-zinc-900 rounded-full" />
          </div>
          <div className="h-10 sm:h-16 w-3/4 bg-zinc-900 rounded-2xl" />
          <div className="h-5 w-44 bg-zinc-900/60 rounded-lg" />
        </div>

        {/* Main Video Viewport Skeleton */}
        <div className="aspect-video w-full rounded-2xl sm:rounded-3xl bg-[#0e0e14] border border-white/[0.08] flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/5" />
        </div>

        {/* 2-Column Overview & Services Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-10 rounded-3xl bg-[#0e0e14] border border-white/[0.08]">
          <div className="space-y-3">
            <div className="h-4 w-32 bg-zinc-900 rounded-md" />
            <div className="h-4 w-full bg-zinc-900/60 rounded-md" />
            <div className="h-4 w-5/6 bg-zinc-900/60 rounded-md" />
            <div className="h-4 w-4/6 bg-zinc-900/60 rounded-md" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-32 bg-zinc-900 rounded-md" />
            <div className="h-8 w-40 bg-zinc-900/60 rounded-xl" />
            <div className="h-8 w-48 bg-zinc-900/60 rounded-xl" />
          </div>
        </div>

        {/* Approach 4-Card Grid Skeleton */}
        <div className="space-y-6">
          <div className="h-6 w-48 bg-zinc-900 rounded-lg" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#0e0e14] border border-white/[0.08] space-y-3"
              >
                <div className="h-5 w-36 bg-zinc-900 rounded-md" />
                <div className="h-4 w-full bg-zinc-900/60 rounded-md" />
                <div className="h-4 w-3/4 bg-zinc-900/60 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
