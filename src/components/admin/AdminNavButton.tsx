"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, ArrowRight } from "lucide-react";

interface AdminNavButtonProps {
  href: string;
  children: React.ReactNode;
  iconType?: "plus" | "arrow" | "none";
  pendingText?: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "danger";
  title?: string;
}

export default function AdminNavButton({
  href,
  children,
  iconType = "plus",
  pendingText = "Opening...",
  className = "",
  variant = "primary",
  title,
}: AdminNavButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isPending || isNavigating) return;

    setIsNavigating(true);
    startTransition(() => {
      router.push(href);
    });
  };

  const isLoading = isPending || isNavigating;

  let baseStyles =
    "inline-flex items-center justify-center gap-2 font-bold text-xs sm:text-sm transition-all rounded-xl disabled:opacity-60 cursor-pointer select-none ";

  if (variant === "primary") {
    baseStyles +=
      "bg-lime-400 hover:bg-lime-300 text-zinc-950 shadow-lg shadow-lime-400/20 px-5 py-2.5 ";
  } else if (variant === "secondary") {
    baseStyles +=
      "bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10 px-4 py-2 ";
  } else if (variant === "outline") {
    baseStyles +=
      "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 px-3.5 py-1.5 ";
  } else if (variant === "danger") {
    baseStyles +=
      "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3.5 py-1.5 ";
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      aria-busy={isLoading}
      title={title}
      className={`${baseStyles} ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin shrink-0" />
          <span>{pendingText}</span>
        </>
      ) : (
        <>
          {iconType === "plus" && (
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 stroke-[2.5]" />
          )}
          {iconType === "arrow" && (
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 stroke-[2.5]" />
          )}
          <span>{children}</span>
        </>
      )}
    </button>
  );
}
