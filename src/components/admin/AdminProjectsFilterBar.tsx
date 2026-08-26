"use client";

import React, { useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { DbCategory } from "@/lib/db/types";
import { Search, Filter, RotateCcw, Loader2 } from "lucide-react";

interface AdminProjectsFilterBarProps {
  categories: DbCategory[];
}

export default function AdminProjectsFilterBar({
  categories,
}: AdminProjectsFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "all");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [featured, setFeatured] = useState(searchParams.get("featured") || "all");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");

  const applyFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, val]) => {
      if (val === "all" || !val) {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({ search });
  };

  const handleReset = () => {
    setSearch("");
    setStatus("all");
    setCategory("all");
    setFeatured("all");
    setSort("newest");
    startTransition(() => {
      router.push(pathname);
    });
  };

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl bg-[#0e0e14] border border-white/[0.08] space-y-3 sm:space-y-4 transition-opacity ${
        isPending ? "opacity-75" : ""
      }`}
      aria-busy={isPending}
    >
      <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-grow">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by project title, slug, or keywords..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-lime-400 transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-lime-400" />
              <span>Filtering...</span>
            </>
          ) : (
            <span>Search</span>
          )}
        </button>
      </form>

      {/* Filter Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 text-xs">
        <div>
          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              applyFilters({ status: e.target.value });
            }}
            className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-200 focus:outline-none focus:border-lime-400"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              applyFilters({ category: e.target.value });
            }}
            className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-200 focus:outline-none focus:border-lime-400"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Featured</label>
          <select
            value={featured}
            onChange={(e) => {
              setFeatured(e.target.value);
              applyFilters({ featured: e.target.value });
            }}
            className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-200 focus:outline-none focus:border-lime-400"
          >
            <option value="all">All Work</option>
            <option value="true">Featured (Home)</option>
            <option value="false">Standard Catalog</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Sort By</label>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              applyFilters({ sort: e.target.value });
            }}
            className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-200 focus:outline-none focus:border-lime-400"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="order">Sort Order (#)</option>
          </select>
        </div>

        <div className="col-span-2 sm:col-span-1 flex items-end">
          <button
            type="button"
            onClick={handleReset}
            className="w-full px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 text-xs font-mono transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
