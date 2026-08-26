"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profileData } from "@/data/profile";
import { ArrowUpRight, Menu, X, CheckCircle2 } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Process", href: "/process" },
    { name: "Reviews", href: "/reviews" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        <div
          className={`max-w-7xl mx-auto rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-[#0b0b10]/90 backdrop-blur-xl border border-white/[0.12] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] py-2.5 px-4 sm:px-6"
              : "bg-[#0e0e14]/70 backdrop-blur-md border border-white/[0.08] py-3 sm:py-3.5 px-4 sm:px-6"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo & Identity */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-lime-400 rounded-full min-w-0"
              aria-label="Muhammad Daniyal Khan — Home"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-950 border border-white/15 flex items-center justify-center font-bold text-xs tracking-wider text-white shadow-inner group-hover:border-lime-400/60 transition-colors shrink-0">
                <span className="text-lime-400 font-mono">M</span>DK
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-bold text-xs sm:text-sm tracking-tight text-white group-hover:text-lime-300 transition-colors truncate font-display">
                  {profileData.fullName}
                </span>
                <span className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-lime-400/10 text-lime-400 border border-lime-400/20 shrink-0">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  Top Rated
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/[0.06]">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-lime-400 text-zinc-950 font-bold shadow-md shadow-lime-400/20"
                        : "text-zinc-300 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action: Upwork Primary CTA + Mobile Hamburger */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <div className="hidden 2xl:flex items-center gap-2 text-[11px] font-mono text-zinc-400 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 inline-block animate-pulse" />
                <span>Available on Upwork</span>
              </div>

              {/* Upwork CTA button */}
              <a
                href={profileData.upworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-lime-400 hover:bg-lime-300 text-zinc-950 text-xs font-bold px-4 py-2 rounded-full transition-all duration-200 shadow-md shadow-lime-400/15 hover:shadow-lime-400/25 hover:scale-[1.02] active:scale-[0.98] min-h-[38px]"
              >
                <span>Hire on Upwork</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </a>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-400 min-w-[40px] min-h-[40px] flex items-center justify-center transition-colors"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Modal */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl overflow-y-auto overscroll-contain animate-in fade-in duration-200"
          aria-modal="true"
          role="dialog"
          aria-label="Mobile navigation"
        >
          {/* Top Close Bar */}
          <div className="absolute top-4 right-4 z-30">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-full bg-zinc-900/90 border border-white/15 text-zinc-300 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="min-h-[100dvh] flex flex-col justify-between p-5 pt-20 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] max-w-sm mx-auto w-full">
            {/* Top Nav Section */}
            <div className="flex flex-col space-y-5 w-full pt-2">
              {/* Status Pill */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-lime-400 inline-block animate-pulse" />
                  <span className="text-xs text-zinc-300 font-medium">
                    Available for selected projects
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-lime-400/10 text-lime-400 border border-lime-400/20 font-mono">
                  Top Rated
                </span>
              </div>

              {/* Nav Route Links with Large Touch Targets */}
              <nav className="flex flex-col space-y-2" aria-label="Mobile site links">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-2xl text-base font-semibold transition-all flex items-center justify-between min-h-[48px] ${
                        isActive
                          ? "bg-lime-400 text-zinc-950 font-bold shadow-lg shadow-lime-400/20"
                          : "text-zinc-200 hover:text-white hover:bg-white/5 active:bg-white/10"
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive ? (
                        <span className="w-2 h-2 rounded-full bg-zinc-950" />
                      ) : (
                        <span className="text-xs font-mono text-zinc-500">→</span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Drawer Actions — Pure Native Anchor Navigation */}
            <div className="w-full pt-6 pb-2 space-y-3">
              <a
                href={profileData.upworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-300 active:bg-lime-500 text-zinc-950 text-sm font-bold py-4 rounded-2xl shadow-xl shadow-lime-400/25 transition-all min-h-[52px] cursor-pointer"
              >
                <span>Hire Me on Upwork</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <p className="text-center text-[11px] text-zinc-400 leading-normal">
                {profileData.complianceNotice}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


