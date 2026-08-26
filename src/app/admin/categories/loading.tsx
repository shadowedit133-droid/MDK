import React from "react";

export default function AdminCategoriesLoading() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-pulse" aria-busy="true" aria-label="Loading categories">
      {/* Header Banner Skeleton */}
      <div className="pb-6 border-b border-white/[0.08] space-y-2">
        <div className="h-8 w-60 sm:w-80 bg-zinc-800/80 rounded-xl" />
        <div className="h-4 w-72 sm:w-96 bg-zinc-800/40 rounded-lg" />
      </div>

      {/* Categories Card Skeleton */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0e14] border border-white/[0.08] space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="h-5 w-40 bg-zinc-800/80 rounded-lg" />
          <div className="h-9 w-32 bg-zinc-800/60 rounded-xl" />
        </div>

        <div className="space-y-3 pt-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-zinc-900/50 border border-white/[0.04] flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5 min-w-0">
                <div className="h-4 w-32 sm:w-48 bg-zinc-800/80 rounded" />
                <div className="h-3 w-48 sm:w-72 bg-zinc-800/40 rounded" />
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="h-6 w-16 bg-zinc-800/50 rounded-full" />
                <div className="h-7 w-16 bg-zinc-800/60 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
