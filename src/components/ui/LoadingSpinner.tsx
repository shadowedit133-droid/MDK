import React from "react";

interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

export default function LoadingSpinner({
  size = "sm",
  className = "",
  label,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    xs: "w-3 h-3 border-[1.5px]",
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      role="status"
      aria-live="polite"
    >
      <span
        className={`inline-block rounded-full border-current border-t-transparent animate-spin ${sizeClasses}`}
        aria-hidden="true"
      />
      {label && <span className="text-xs font-mono">{label}</span>}
      <span className="sr-only">{label || "Loading..."}</span>
    </span>
  );
}
