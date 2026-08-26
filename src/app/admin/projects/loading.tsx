import React from "react";

export default function AdminProjectsLoading() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-pulse" aria-busy="true" aria-label="Loading projects">
      {/* Header Banner Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="space-y-2">
          <div className="h-8 w-56 sm:w-80 bg-zinc-800/80 rounded-xl" />
          <div className="h-4 w-72 sm:w-96 bg-zinc-800/40 rounded-lg" />
        </div>
        <div className="h-10 w-36 bg-zinc-800/60 rounded-xl" />
      </div>

      {/* Filter Bar Skeleton */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0e0e14] border border-white/[0.08] space-y-4">
        <div className="h-10 w-full bg-zinc-800/50 rounded-xl" />
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-9 bg-zinc-800/40 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Projects Table Skeleton */}
      <div className="rounded-3xl bg-[#0e0e14] border border-white/[0.08] p-4 sm:p-6 shadow-xl space-y-4">
        <div className="h-4 w-32 bg-zinc-800/40 rounded px-2" />
        <div className="space-y-3 pt-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="p-3.5 rounded-2xl bg-zinc-900/40 border border-white/[0.04] flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-14 h-9 rounded-lg bg-zinc-800/70 shrink-0" />
                <div className="space-y-1.5 min-w-0">
                  <div className="h-4 w-40 sm:w-64 bg-zinc-800/80 rounded" />
                  <div className="h-2.5 w-28 bg-zinc-800/40 rounded" />
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="h-5 w-20 bg-zinc-800/50 rounded-full hidden md:block" />
                <div className="h-5 w-16 bg-zinc-800/50 rounded-full" />
                <div className="h-7 w-20 bg-zinc-800/60 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
