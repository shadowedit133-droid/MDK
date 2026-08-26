import React from "react";
import { Metadata } from "next";
import { profileData } from "@/data/profile";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SoftwareStack from "@/components/SoftwareStack";
import WhyWorkWithMe from "@/components/WhyWorkWithMe";
import UpworkSuccess from "@/components/UpworkSuccess";

export const metadata: Metadata = {
  title: "About Muhammad Daniyal Khan | Video Editor",
  description:
    "Learn more about Muhammad Daniyal Khan, a professional video editor with 5+ years of experience in YouTube long-form, Cash Cow content, and cinematic storytelling. Top Rated on Upwork.",
  alternates: {
    canonical: "https://muhammaddaniyal.com/about",
  },
  openGraph: {
    title: "About Muhammad Daniyal Khan | Professional Video Editor",
    description:
      "5+ years behind the timeline. Top Rated video editor specializing in YouTube retention and cinematic storytelling.",
    url: "https://muhammaddaniyal.com/about",
  },
};

export default function AboutPage() {
  return (
    <main className="pt-28 sm:pt-36 pb-20 lg:pb-28 space-y-4">
      {/* Bio Narrative & Philosophy */}
      <AboutSection />

      {/* 5+ Years Behind the Timeline Milestone Progression */}
      <ExperienceSection />

      {/* Software & Creative Stack */}
      <SoftwareStack />

      {/* Why Work With Me Value Props */}
      <WhyWorkWithMe />

      {/* Verified Upwork Credibility Card */}
      <UpworkSuccess />
    </main>
  );
}
