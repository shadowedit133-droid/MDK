export interface ExperienceMilestone {
  period: string;
  stageTitle: string;
  focusArea: string;
  summary: string;
  skillsDeveloped: string[];
}

export const experienceData: ExperienceMilestone[] = [
  {
    period: "Year 1 — Foundation",
    stageTitle: "Professional Video Editing",
    focusArea: "Timeline Mechanics & Cutting Mastery",
    summary:
      "Established core editing fundamentals, timeline organization, multi-camera synchronization, and precision pacing across diverse video styles.",
    skillsDeveloped: ["Adobe Premiere Pro", "Rough Cut Assembly", "Dialogue Pacing", "Audio Syncing"],
  },
  {
    period: "Year 2 — Retention",
    stageTitle: "YouTube Long-Form Content",
    focusArea: "Audience Retention & Visual Flow",
    summary:
      "Deep-dived into YouTube audience behavior, mastering hook creation, pattern interrupts, and narrative pacing to boost average percentage viewed.",
    skillsDeveloped: ["Audience Retention Engineering", "B-Roll Storytelling", "Sound Effects Layering", "Intro Hooks"],
  },
  {
    period: "Year 3 — Scaled Production",
    stageTitle: "Faceless & Cash Cow Production",
    focusArea: "High-Volume Stock & Narrative Visualization",
    summary:
      "Specialized in transforming voiceovers into compelling visual journeys using curated stock footage, kinetic typography, and motion infographics.",
    skillsDeveloped: ["Kinetic Typography", "Stock Curation", "Visual Metaphors", "Infographic Design"],
  },
  {
    period: "Year 4 — Fast Pacing",
    stageTitle: "Short-Form & Viral Storytelling",
    focusArea: "Vertical 9:16 Video Mechanics",
    summary:
      "Adapted editing techniques for TikTok, Reels, and YouTube Shorts, engineering sub-second visual triggers and animated dynamic subtitles.",
    skillsDeveloped: ["Dynamic Subtitles", "Fast-Paced Cuts", "9:16 Visual Composition", "Mobile Sound Mixing"],
  },
  {
    period: "Year 5+ — Full Suite",
    stageTitle: "Advanced Motion & International Upwork Projects",
    focusArea: "End-to-End Post-Production & Global Collaboration",
    summary:
      "Delivering full-suite post-production (editing, motion graphics, sound design) to international clients with a verified Top Rated Upwork track record.",
    skillsDeveloped: ["Adobe After Effects", "Motion Graphics", "Audio Layering", "Client Milestone Management"],
  },
];
