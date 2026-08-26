"use client";

import React, { useState } from "react";
import { faqsData } from "@/data/faq";
import { profileData } from "@/data/profile";
import { HelpCircle, ChevronDown, ArrowUpRight, MessageCircle } from "lucide-react";

export default function FaqSection() {
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-types-of-videos");

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-zinc-950/40">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-lime-400 mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>COMMONLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Everything you need to know about working with Muhammad through Upwork, project preparation, and delivery timelines.
          </p>
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-4 mb-12">
          {faqsData.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-[#14141c] border-lime-400/30 shadow-lg"
                    : "bg-[#111116] border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center bg-zinc-900 border border-white/10 text-zinc-300 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-lime-400 border-lime-400/40" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-zinc-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                    <p className="mb-4">{faq.answer}</p>

                    {faq.id === "faq-how-to-hire" && (
                      <div className="pt-2">
                        <a
                          href={profileData.upworkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-lime-400 hover:bg-lime-300 text-zinc-950 text-xs font-bold transition-all shadow-md shadow-lime-400/20"
                        >
                          <span>Hire Muhammad on Upwork</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Direct CTA */}
        <div className="p-8 rounded-3xl bg-zinc-900/60 border border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="text-base font-bold text-white mb-1">
              Have a project question not answered here?
            </h3>
            <p className="text-xs text-zinc-400">
              Reach out through Muhammad&apos;s verified Upwork profile.
            </p>
          </div>

          <a
            href={profileData.upworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-lime-400 hover:bg-lime-300 text-zinc-950 text-xs font-bold transition-all shadow-lg shadow-lime-400/20 flex items-center gap-2 whitespace-nowrap"
          >
            <span>Ask on Upwork</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
