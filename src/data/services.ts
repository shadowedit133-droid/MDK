export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  bestFor: string;
  tag: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "youtube-long-form",
    title: "YouTube Video Editing",
    shortDesc: "Long-form videos engineered for storytelling, clarity, and viewer retention.",
    fullDesc:
      "Comprehensive editing for creators and educators looking to structure clear narratives, hold audience attention through complex topics, and build a dedicated channel audience.",
    deliverables: [
      "Dynamic Hook & Intro Structuring",
      "Pacing & Pause Elimination",
      "Contextual B-Roll & Footage Curation",
      "Custom Lower Thirds & Callouts",
      "Multi-Track Sound Design & Mastering",
    ],
    bestFor: "Tech reviews, educational channels, commentaries, vlogs, and essays",
    tag: "Long Form",
  },
  {
    id: "faceless-cash-cow",
    title: "Faceless / Cash Cow Videos",
    shortDesc:
      "Professional stock footage, B-roll, pacing, graphics, sound design, and narrative visualization.",
    fullDesc:
      "Complete visual assembly for automated YouTube channels. Transforming voiceovers and scripts into visual presentations using stock assets, kinetic typography, and motion graphics.",
    deliverables: [
      "Curated Royalty-Free B-Roll",
      "Kinetic Text & Graphic Overlays",
      "Thematic Color Grading & Moods",
      "Sound FX & Music Rhythm Sync",
      "Monetization-Safe Assembly",
    ],
    bestFor: "Finance, luxury, tech, history, motivation, and informational channels",
    tag: "Faceless Media",
  },
  {
    id: "shorts-reels-tiktok",
    title: "Shorts & Reels Editing",
    shortDesc: "Fast-paced vertical content formatted for short-form viewing behavior.",
    fullDesc:
      "Engaging vertical videos tailored for TikTok, Instagram Reels, and YouTube Shorts. Engineered with clean hooks and dynamic caption styling.",
    deliverables: [
      "Intro Hook Formatting",
      "Animated Word-by-Word Subtitles",
      "Visual Cutaways & Zooms",
      "Sound Effects & Audio Sync",
      "9:16 Mobile Optimized Framing",
    ],
    bestFor: "Personal brands, podcasters, business founders, and creators",
    tag: "Vertical Video",
  },
  {
    id: "documentary-editing",
    title: "Documentary Editing",
    shortDesc: "Story-driven editing with purposeful pacing and cinematic visual treatment.",
    fullDesc:
      "Deliberate visual pacing for deep narrative storytelling. Treating archival assets, interview soundbites, and music scores with cinematic focus and emotional depth.",
    deliverables: [
      "Narrative & Thematic Arc Building",
      "2.5D Photo Animation (Parallax)",
      "Score Layering & Ducking",
      "Documentary Color Grading",
      "Archival Asset Enhancement",
    ],
    bestFor: "Mini-documentaries, investigative stories, brand histories, and case films",
    tag: "Documentary",
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics",
    shortDesc: "Titles, callouts, infographics, lower thirds, and branded visual elements.",
    fullDesc:
      "Custom vector animation and typographic systems crafted in After Effects to visually explain data, enhance brand identity, and elevate overall production value.",
    deliverables: [
      "Animated Charts & Infographics",
      "Branded Intros & Title Sequences",
      "Kinetic Typography Sequences",
      "Custom Transitions & Elements",
      "UI App Screen Animations",
    ],
    bestFor: "Software explainers, presentations, data visualizations, and brand packages",
    tag: "Motion Design",
  },
  {
    id: "commercial-promotional",
    title: "Commercial & Promotional Editing",
    shortDesc: "Promotional videos designed around products, businesses, and campaigns.",
    fullDesc:
      "Commercial cutdowns focused on product features, clarity, and brand aesthetic for digital advertising campaigns and product releases.",
    deliverables: [
      "Rhythm & Beat-Locked Cutting",
      "Product Feature Highlighting",
      "Call-to-Action Sequences",
      "Multi-Aspect Ratio Exports (16:9, 9:16, 1:1)",
      "Audio Leveling & Compliance",
    ],
    bestFor: "E-commerce brands, products, campaign launches, and video ads",
    tag: "Commercial",
  },
  {
    id: "post-production",
    title: "Post-Production Finishing",
    shortDesc: "Color correction, sound design, subtitles, transitions, and final delivery optimization.",
    fullDesc:
      "Technical finishing for existing assemblies or finalized rough cuts requiring color adjustments, audio balancing, and export optimization.",
    deliverables: [
      "Rec.709 Color Correction & Grading",
      "Audio Noise Reduction & Balancing",
      "Dialogue Leveling & Mastering",
      "Accurate Subtitles / SRT Generation",
      "High-Bitrate Master Delivery",
    ],
    bestFor: "Filmmakers, creators with rough cuts, and production teams",
    tag: "Finishing",
  },
];
