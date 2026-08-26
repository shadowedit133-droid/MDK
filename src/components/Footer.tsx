import React from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-[#07070a] pt-14 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col space-y-8 sm:space-y-12">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 pb-8 sm:pb-10 border-b border-white/[0.06]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-2 group">
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/15 flex items-center justify-center font-bold text-xs text-lime-400 font-mono group-hover:border-lime-400/50 transition-colors shrink-0">
                M
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-lime-300 transition-colors font-display">
                {profileData.fullName}
              </h3>
            </Link>
            <p className="text-[11px] sm:text-xs text-zinc-400 font-mono">
              Professional Video Editor • Top Rated Upwork Talent
            </p>
          </div>

          {/* Quick Nav */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs font-medium">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors py-1">
              Home
            </Link>
            <Link href="/work" className="text-zinc-400 hover:text-white transition-colors py-1">
              Work
            </Link>
            <Link href="/services" className="text-zinc-400 hover:text-white transition-colors py-1">
              Services
            </Link>
            <Link href="/about" className="text-zinc-400 hover:text-white transition-colors py-1">
              About
            </Link>
            <Link href="/process" className="text-zinc-400 hover:text-white transition-colors py-1">
              Process
            </Link>
            <Link href="/reviews" className="text-zinc-400 hover:text-white transition-colors py-1">
              Reviews
            </Link>
            <a
              href={profileData.upworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime-400 hover:text-lime-300 flex items-center gap-1 font-bold py-1 ml-1"
            >
              <span>Upwork Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          </nav>
        </div>

        {/* Compliance Notice & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[10px] sm:text-[11px] text-zinc-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 shrink-0 inline-block" />
            <span>{profileData.complianceNotice}</span>
          </div>

          <div>
            <span>© {currentYear} {profileData.fullName}. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
