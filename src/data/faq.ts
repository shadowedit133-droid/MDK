export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const faqsData: FaqItem[] = [
  {
    id: "faq-types-of-videos",
    question: "What types of videos do you edit?",
    answer:
      "I specialize in high-retention YouTube long-form videos, faceless Cash Cow content, vertical Shorts and Instagram Reels, cinematic mini-documentaries, motion graphics explainers, and commercial promotional edits.",
    category: "Services",
  },
  {
    id: "faq-youtube-long-form",
    question: "Do you edit long-form YouTube videos?",
    answer:
      "Yes. Long-form YouTube content is one of my primary specialties. I focus extensively on hook structure in the first 30 seconds, narrative pacing, pattern interrupts, relevant B-roll insertion, and multi-layered sound design to keep audience retention curves high.",
    category: "YouTube",
  },
  {
    id: "faq-faceless-cash-cow",
    question: "Can you edit faceless / Cash Cow videos?",
    answer:
      "Absolutely. I produce faceless videos from scripts and voiceovers, sourcing royalty-free footage, kinetic typography, animated data callouts, sound effects, and color grading that align with YouTube monetization standards.",
    category: "Faceless",
  },
  {
    id: "faq-shorts-reels",
    question: "Do you edit Shorts and Reels?",
    answer:
      "Yes. I edit fast-paced vertical 9:16 videos optimized for TikTok, Instagram Reels, and YouTube Shorts, including animated word-by-word subtitles, sound effects, zooms, and hook extraction.",
    category: "Short-Form",
  },
  {
    id: "faq-files-needed",
    question: "What files do you need to start?",
    answer:
      "To get started on your project, you can provide raw video files (or cloud download links via Google Drive, Dropbox, or OneDrive), audio voiceovers, scripts, brand assets (logos, fonts), and any stylistic references or example videos you admire.",
    category: "Workflow",
  },
  {
    id: "faq-revisions-handled",
    question: "How are revisions handled?",
    answer:
      "Revisions are structured and collaborative. You can review drafts through a private video link with timestamped notes. Revisions within the agreed project scope are implemented promptly to ensure the final master meets your exact vision.",
    category: "Workflow",
  },
  {
    id: "faq-how-to-hire",
    question: "How can I hire you?",
    answer:
      "You can view Muhammad's verified Upwork profile and initiate a direct proposal, invite, or contract through Upwork. For Upwork clients, all project communication, contracts, and milestones are handled securely through Upwork.",
    category: "Hiring",
  },
];
