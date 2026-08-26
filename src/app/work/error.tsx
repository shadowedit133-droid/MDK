"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function WorkError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Work catalog error:", error);
  }, [error]);

  return (
    <main className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full p-8 rounded-3xl bg-[#0e0e14] border border-white/10 text-center space-y-5 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mx-auto text-amber-400">
          <AlertCircle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            Portfolio Catalog Offline
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            We were unable to load the portfolio projects at this time. Please check your internet connection or try reloading.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-lime-400 hover:bg-lime-300 text-zinc-950 text-xs font-bold transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Projects</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-xs font-bold transition-all"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
