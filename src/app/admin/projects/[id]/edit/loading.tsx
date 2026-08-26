import React from "react";

export default function AdminEditProjectLoading() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-pulse" aria-busy="true" aria-label="Loading project for editing">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-60 sm:w-72 bg-zinc-800/80 rounded-xl" />
        <div className="h-4 w-64 sm:w-80 bg-zinc-800/40 rounded-lg" />
      </div>

      {/* Form Card Skeleton */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#0e0e14] border border-white/[0.08] space-y-8 shadow-xl">
        <div className="space-y-4">
          <div className="h-4 w-32 bg-zinc-800/60 rounded" />
          <div className="h-11 w-full bg-zinc-800/50 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="h-4 w-28 bg-zinc-800/60 rounded" />
            <div className="h-48 w-full bg-zinc-800/40 rounded-2xl" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-28 bg-zinc-800/60 rounded" />
            <div className="h-48 w-full bg-zinc-800/40 rounded-2xl" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-4 w-40 bg-zinc-800/60 rounded" />
          <div className="h-28 w-full bg-zinc-800/40 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
