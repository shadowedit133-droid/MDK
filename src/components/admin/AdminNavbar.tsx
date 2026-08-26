"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Film,
  Layers,
  ExternalLink,
  LogOut,
  Plus,
} from "lucide-react";

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, don't show admin links
  if (pathname === "/admin/login") {
    return null;
  }

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: Film },
    { name: "Categories", href: "/admin/categories", icon: Layers },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0c0c12]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-6 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/15 flex items-center justify-center font-bold text-xs text-lime-400 font-mono shadow-inner group-hover:border-lime-400/50 transition-colors">
              M
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-sm text-white block leading-tight font-display">
                MDK Admin CMS
              </span>
              <span className="text-[10px] font-mono text-zinc-400 block">
                Portfolio Management
              </span>
            </div>
          </Link>

          {/* Nav Items */}
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-lime-400/10 text-lime-400 border border-lime-400/20 font-bold"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions: Add Project, View Live Site, Logout */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-zinc-950 font-bold text-xs transition-transform shadow-md shadow-lime-400/15 hover:scale-105"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span className="hidden sm:inline">New Project</span>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs transition-colors"
            title="View Live Portfolio"
          >
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden md:inline">Public Site</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-zinc-900/60 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 border border-white/10 hover:border-red-500/20 text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
