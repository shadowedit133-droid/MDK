import React from "react";

export default function WorkLoading() {
  return (
    <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8" aria-busy="true" aria-label="Loading portfolio catalog">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Skeleton */}
        <div className="space-y-4 max-w-3xl animate-pulse">
          <div className="h-6 w-48 bg-zinc-900 rounded-full" />
          <div className="h-12 sm:h-16 w-3/4 bg-zinc-900 rounded-2xl" />
          <div className="h-5 w-full bg-zinc-900/60 rounded-xl" />
        </div>

        {/* Category Pill Skeletons */}
        <div className="flex gap-2 overflow-hidden animate-pulse">
          <div className="h-10 w-28 bg-zinc-900 rounded-full" />
          <div className="h-10 w-24 bg-zinc-900/60 rounded-full" />
          <div className="h-10 w-36 bg-zinc-900/60 rounded-full" />
          <div className="h-10 w-32 bg-zinc-900/60 rounded-full" />
        </div>

        {/* 6 Grid Cards Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl bg-[#0e0e14] border border-white/[0.06] overflow-hidden space-y-4 p-5 animate-pulse"
            >
              <div className="aspect-video w-full bg-zinc-900/80 rounded-2xl" />
              <div className="space-y-2">
                <div className="h-4 w-20 bg-zinc-900 rounded-md" />
                <div className="h-6 w-3/4 bg-zinc-900 rounded-md" />
                <div className="h-4 w-full bg-zinc-900/60 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
