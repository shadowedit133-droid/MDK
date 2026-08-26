"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Check if the device is a touch/mobile device
    const checkTouch = () => {
      const hasTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(hasTouch);
    };

    checkTouch();

    if (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button" ||
          target.classList.contains("cursor-pointer");
        setIsPointer(!!isClickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  // Completely disabled on mobile/touch devices
  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer ambient subtle ring with smooth follow */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ${
            isPointer
              ? "w-9 h-9 bg-lime-400/15 border border-lime-400/50 scale-125"
              : "w-5 h-5 bg-white/[0.04] border border-white/20 scale-100"
          }`}
        />
      </div>

      {/* Center pinpoint with instant 1:1 precision */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-150 ${
            isPointer
              ? "w-1.5 h-1.5 bg-lime-400"
              : "w-1 h-1 bg-white/90"
          }`}
        />
      </div>
    </>
  );
}
