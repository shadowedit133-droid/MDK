import React from "react";
import { Metadata } from "next";
import { profileData } from "@/data/profile";
import { testimonialsConfig } from "@/data/testimonials";
import {
  Star,
  MessageSquare,
  Award,
  CheckCircle,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Client Reviews | Muhammad Daniyal Khan",
  description:
    "Verified client ratings and feedback for Muhammad Daniyal Khan on Upwork. Top Rated video editor with 96% Job Success and a 5.0/5.0 average client rating across 27 jobs.",
  alternates: {
    canonical: "https://muhammaddaniyal.com/reviews",
  },
  openGraph: {
    title: "Client Reviews & Upwork Ratings | Muhammad Daniyal Khan",
    description: "96% Job Success • 5.0 Rating • 27 Upwork Jobs.",
    url: "https://muhammaddaniyal.com/reviews",
  },
};

export default function ReviewsPage() {
  const { stats } = profileData;
  const items = testimonialsConfig.items;

  return (
    <main className="pt-28 sm:pt-36 pb-20 lg:pb-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-white/[0.08] text-xs font-mono text-lime-400 mb-3 sm:mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>VERIFIED PERFORMANCE</span>
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-display mb-3 sm:mb-4 leading-[1.1]">
            Client Feedback & Reputation
          </h1>
          <p className="text-xs sm:text-base md:text-lg text-zinc-400 leading-relaxed">
            Real feedback and verified ratings from international clients and creators on Upwork. Every project reflects transparent collaboration, clear communication, and reliable editing standards.
          </p>
        </div>

        {/* Verified Credibility Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
          <div className="p-5 sm:p-6 rounded-3xl bg-[#0e0e14] border border-white/[0.08] space-y-1 sm:space-y-2">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[10px] sm:text-xs font-mono">Platform Tier</span>
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-lime-400" />
            </div>
            <p className="text-xl sm:text-3xl font-extrabold text-lime-400 font-display truncate">
              {stats.statusBadge}
            </p>
            <p className="text-[10px] sm:text-xs text-zinc-400 truncate">Upwork Top Rated</p>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-[#0e0e14] border border-white/[0.08] space-y-1 sm:space-y-2">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[10px] sm:text-xs font-mono">Job Success</span>
              <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-lime-400" />
            </div>
            <p className="text-xl sm:text-3xl font-extrabold text-white font-display">
              {stats.jobSuccessScore}%
            </p>
            <p className="text-[10px] sm:text-xs text-zinc-400 truncate">Verified Score</p>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-[#0e0e14] border border-white/[0.08] space-y-1 sm:space-y-2">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[10px] sm:text-xs font-mono">Avg Rating</span>
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-current" />
            </div>
            <p className="text-xl sm:text-3xl font-extrabold text-white font-display">
              {stats.clientRating.toFixed(1)} / 5
            </p>
            <p className="text-[10px] sm:text-xs text-zinc-400 truncate">Verified Rating</p>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-[#0e0e14] border border-white/[0.08] space-y-1 sm:space-y-2">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[10px] sm:text-xs font-mono">Total Jobs</span>
              <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
            </div>
            <p className="text-xl sm:text-3xl font-extrabold text-white font-display">
              {stats.totalJobs} Jobs
            </p>
            <p className="text-[10px] sm:text-xs text-zinc-400 truncate">Upwork Platform</p>
          </div>
        </div>

        {/* Reviews Showcase */}
        <div>
          <div className="flex items-center justify-between mb-6 sm:mb-8 pb-4 border-b border-white/[0.06]">
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              Publicly Verified Reviews
            </h2>
            <span className="text-[10px] sm:text-xs font-mono text-zinc-400">
              Upwork Profile
            </span>
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {items.map((review) => (
                <div
                  key={review.id}
                  className="p-6 sm:p-8 rounded-3xl bg-[#0e0e14] border border-white/[0.08] hover:border-lime-400/30 transition-all duration-300 flex flex-col justify-between group shadow-xl space-y-5"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex text-amber-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-mono text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded border border-lime-400/20">
                        Verified Job
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                      &ldquo;{review.reviewText}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <div className="min-w-0">
                      <p className="font-bold text-white truncate">
                        {review.clientIdentifier}
                      </p>
                      <p className="text-[10px] sm:text-xs text-zinc-400 font-mono truncate">
                        {review.projectScope}
                      </p>
                    </div>
                    {review.country && (
                      <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-md border border-white/[0.06] shrink-0 ml-2">
                        {review.country}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 sm:p-12 rounded-3xl bg-[#0e0e14] border border-white/[0.08] text-center space-y-4 shadow-xl">
              <p className="text-zinc-300 text-sm sm:text-base font-mono">
                Verified client feedback will be added here.
              </p>
              <p className="text-zinc-500 text-xs max-w-md mx-auto">
                Individual verified client reviews can be viewed directly on Muhammad&apos;s public Upwork profile.
              </p>
            </div>
          )}
        </div>

        {/* View on Upwork CTA Strip */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#111116] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-2xl">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">
              Review Muhammad&apos;s Full Upwork History
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Inspect verified client feedback and contract history on the official Upwork profile.
            </p>
          </div>

          <a
            href={profileData.upworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-lime-400 hover:bg-lime-300 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-xl shadow-lime-400/20 flex items-center justify-center gap-2 whitespace-nowrap hover:scale-105 min-h-[48px]"
          >
            <span>View Verified Upwork Profile</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </main>
  );
}
