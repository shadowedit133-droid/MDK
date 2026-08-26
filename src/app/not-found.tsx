import React from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { ArrowLeft, ArrowUpRight, Film } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-20">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center mx-auto text-lime-400">
          <Film className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-lime-400 uppercase tracking-wider">
            404 • Page Not Found
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Lost on the Timeline?
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            The page or project case study you requested could not be found. It may have been moved, unpublished, or renamed.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-lime-400 hover:bg-lime-300 text-zinc-950 text-xs font-bold transition-all shadow-lg shadow-lime-400/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/work"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white text-xs font-bold transition-all"
          >
            <span>Browse Portfolio</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
