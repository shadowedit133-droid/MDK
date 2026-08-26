export interface ProcessStep {
  stepNumber: string;
  title: string;
  tagline: string;
  description: string;
  details: string[];
}

export const processSteps: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Understand",
    tagline: "Vision & Asset Ingestion",
    description:
      "Review provided raw footage, scripts, brand guidelines, target audience psychology, and key objectives on Upwork.",
    details: [
      "Footage logging & sync verification",
      "Goal & retention target alignment",
      "Creative brief & reference review",
    ],
  },
  {
    stepNumber: "02",
    title: "Structure",
    tagline: "Narrative Arc & Assembly",
    description:
      "Construct the foundational radio edit or rough cut, establishing the emotional arc and eliminating dead air.",
    details: [
      "A-Roll cutdown & pacing foundation",
      "Hook selection & story structuring",
      "Chapter marker planning",
    ],
  },
  {
    stepNumber: "03",
    title: "Edit",
    tagline: "Visual Pacing & B-Roll",
    description:
      "Infuse dynamic visual interest with curated B-roll, kinetic typography, callouts, and pattern interrupts.",
    details: [
      "Multi-cam & B-roll cutting",
      "Motion graphics & animated elements",
      "Speed ramps & cinematic transitions",
    ],
  },
  {
    stepNumber: "04",
    title: "Polish",
    tagline: "Sound Design & Color Grade",
    description:
      "Elevate the edit to broadcast quality with multi-track sound effects, score mixing, dialogue mastering, and color grading.",
    details: [
      "Foley, SFX, and atmospheric layering",
      "Dialogue clarity & loudness normalization",
      "Cinematic color correction & grading",
    ],
  },
  {
    stepNumber: "05",
    title: "Review",
    tagline: "Client Feedback & Refinement",
    description:
      "Share a private review link for timestamped notes. Implement revisions swiftly within the agreed project scope.",
    details: [
      "Frame-accurate note review",
      "Fast revision turnaround",
      "Visual consistency check",
    ],
  },
  {
    stepNumber: "06",
    title: "Deliver",
    tagline: "Optimized Final Master",
    description:
      "Export high-bitrate masters, clean subtitle files, and project archives formatted perfectly for distribution.",
    details: [
      "Platform-optimized encoding (ProRes/H.264/H.265)",
      "SRT / burned-in subtitle options",
      "Milestone completion on Upwork",
    ],
  },
];
