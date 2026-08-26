import React from "react";
import { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ShowreelSection from "@/components/ShowreelSection";
import FeaturedWorkPreview from "@/components/FeaturedWorkPreview";
import ServicesPreview from "@/components/ServicesPreview";
import AboutPreview from "@/components/AboutPreview";
import UpworkSuccess from "@/components/UpworkSuccess";
import FinalCta from "@/components/FinalCta";
import { profileData } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profileData.fullName} | Professional Video Editor`,
  description: profileData.heroSubheadline,
  alternates: {
    canonical: "https://muhammaddaniyal.com",
  },
};

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      {/* 01 — Hero Introduction */}
      <Hero />

      {/* 02 — Verified Credibility Bar */}
      <TrustBar />

      {/* 03 — Featured Showreel */}
      <ShowreelSection />

      {/* 04 — Featured Selected Work Preview (3 projects with CTA to /work) */}
      <FeaturedWorkPreview />

      {/* 05 — Services Preview (3 packages with CTA to /services) */}
      <ServicesPreview />

      {/* 06 — About & Process Preview (with CTAs to /about and /process) */}
      <AboutPreview />

      {/* 07 — Verified Upwork Track Record */}
      <UpworkSuccess />

      {/* 08 — High-Impact Final CTA */}
      <FinalCta />
    </main>
  );
}
