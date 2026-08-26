"use client";

import React, { useEffect, useRef, useState } from "react";
import { profileData } from "@/data/profile";
import { Award, Briefcase, Star, CheckCircle, Clock } from "lucide-react";

export default function TrustBar() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: "5+",
      label: "Years Experience",
      detail: "Video Editing",
      icon: Clock,
      highlight: false,
    },
    {
      value: "27",
      label: "Upwork Jobs",
      detail: "Total Platform Jobs",
      icon: Briefcase,
      highlight: false,
    },
    {
      value: "96%",
      label: "Job Success",
      detail: "Verified Score",
      icon: CheckCircle,
      highlight: true,
    },
    {
      value: "5.0",
      label: "Client Rating",
      detail: "Verified Score",
      icon: Star,
      highlight: false,
    },
    {
      value: "Top Rated",
      label: "Upwork Talent",
      detail: "Top Tier Freelancer",
      icon: Award,
      highlight: true,
      colSpanMobile: true,
    },
  ];

  return (
    <section
      id="trust"
      ref={sectionRef}
      className="py-10 sm:py-14 border-y border-white/[0.06] bg-[#09090d]/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`relative flex flex-col p-4 sm:p-5 lg:p-6 rounded-2xl bg-[#111116]/80 border border-white/[0.06] transition-all duration-300 hover:border-white/15 hover:bg-[#14141c] group ${
                  stat.colSpanMobile ? "col-span-2 sm:col-span-1" : "col-span-1"
                } ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-zinc-400 truncate">
                    {stat.label}
                  </span>
                  <Icon
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                      stat.highlight ? "text-lime-400" : "text-zinc-500"
                    } shrink-0`}
                  />
                </div>

                <div className="flex items-baseline gap-1 mb-1">
                  <span
                    className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display ${
                      stat.highlight
                        ? "text-lime-400"
                        : "text-white"
                    }`}
                  >
                    {stat.value}
                  </span>
                </div>

                <p className="text-[11px] sm:text-xs text-zinc-400 font-medium truncate">
                  {stat.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Upwork Verified Notice */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left pt-5 border-t border-white/[0.06] text-[11px] sm:text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 shrink-0 inline-block" />
            <span>All stats verified directly from Muhammad&apos;s public Upwork profile.</span>
          </div>

          <a
            href={profileData.upworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-zinc-300 hover:text-lime-400 transition-colors font-mono text-[11px] py-1"
          >
            <span>Verify on Upwork Profile ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
