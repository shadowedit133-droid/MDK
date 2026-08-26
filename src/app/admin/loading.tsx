import React from "react";

export default function AdminDashboardLoading() {
  return (
    <div className="space-y-8 sm:space-y-10 animate-pulse" aria-busy="true" aria-label="Loading dashboard">
      {/* Header Banner Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="space-y-2">
          <div className="h-8 w-72 sm:w-96 bg-zinc-800/70 rounded-xl" />
          <div className="h-4 w-48 sm:w-80 bg-zinc-800/40 rounded-lg" />
        </div>
        <div className="h-10 w-40 bg-zinc-800/60 rounded-xl" />
      </div>

      {/* Metrics Cards Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 sm:gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`p-5 sm:p-6 rounded-2xl bg-[#0e0e14] border border-white/[0.08] space-y-3 ${
              i === 4 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="h-3 w-16 bg-zinc-800/60 rounded" />
              <div className="h-4 w-4 bg-zinc-800/60 rounded" />
            </div>
            <div className="h-8 w-12 bg-zinc-800/80 rounded-lg" />
            <div className="h-2.5 w-20 bg-zinc-800/40 rounded" />
          </div>
        ))}
      </div>

      {/* Recent Projects Table Skeleton */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0e14] border border-white/[0.08] space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-5 w-48 bg-zinc-800/80 rounded-lg" />
            <div className="h-3 w-64 bg-zinc-800/40 rounded" />
          </div>
          <div className="h-4 w-24 bg-zinc-800/50 rounded" />
        </div>

        <div className="space-y-3 pt-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="p-3.5 rounded-2xl bg-zinc-900/50 border border-white/[0.04] flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-14 h-9 rounded-lg bg-zinc-800/80 shrink-0" />
                <div className="space-y-1.5 min-w-0">
                  <div className="h-4 w-36 sm:w-56 bg-zinc-800/80 rounded" />
                  <div className="h-2.5 w-24 bg-zinc-800/40 rounded" />
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="h-5 w-16 bg-zinc-800/50 rounded-full hidden sm:block" />
                <div className="h-5 w-16 bg-zinc-800/50 rounded-full" />
                <div className="h-7 w-16 bg-zinc-800/60 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
