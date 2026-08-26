export type ProjectCategory =
  | "All"
  | "YouTube"
  | "Faceless / Cash Cow"
  | "Shorts & Reels"
  | "Documentary"
  | "Commercial"
  | "Motion Graphics";

export interface CaseStudy {
  challenge: string;
  approach: {
    pacingAndStructure: string;
    bRollAndVisuals: string;
    soundAndColor: string;
    retentionTactics: string;
  };
  result: string;
  keyHighlights: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "YouTube" | "Faceless / Cash Cow" | "Shorts & Reels" | "Documentary" | "Commercial" | "Motion Graphics";
  editingStyle: string;
  duration: string;
  clientBadge?: string;
  briefObjective: string;
  servicesPerformed: string[];
  thumbnail: string;
  videoPreviewUrl?: string; // Optional short looped preview
  videoUrl?: string; // Full embed / player URL
  isPlaceholder: boolean;
  caseStudy: CaseStudy;
}

export const projectCategories: ProjectCategory[] = [
  "All",
  "YouTube",
  "Faceless / Cash Cow",
  "Shorts & Reels",
  "Documentary",
  "Commercial",
  "Motion Graphics",
];

export const projectsData: ProjectItem[] = [
  {
    id: "cash-cow-finance-mastery",
    title: "Faceless Finance & Educational Breakdown",
    category: "Faceless / Cash Cow",
    editingStyle: "Visual Storytelling & Kinetic Typography",
    duration: "11:45",
    briefObjective:
      "Transform an educational script and voiceover into a clear visual breakdown with kinetic text callouts and relevant B-roll.",
    servicesPerformed: [
      "Footage Curation",
      "Motion Graphics & Text Elements",
      "Sound Design",
      "Pacing & Retention Structure",
    ],
    thumbnail: "/images/projects/project-cashcow-1.jpg",
    videoPreviewUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-and-data-31913-large.mp4",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    isPlaceholder: true,
    caseStudy: {
      challenge:
        "Presenting a multi-topic financial script with high information density without losing viewer engagement during technical segments.",
      approach: {
        pacingAndStructure:
          "Divided the script into distinct visual segments, applying visual shifts every few seconds with kinetic text callouts and split comparisons.",
        bRollAndVisuals:
          "Curated thematic stock footage and overlaid custom motion graphics and chart animations created in After Effects.",
        soundAndColor:
          "Layered background audio with subtle sound effects and color-graded footage for a cohesive look.",
        retentionTactics:
          "Structured chapter openings with visual previews to maintain curiosity across segments.",
      },
      result:
        "Portfolio demonstration illustrating pacing, kinetic text integration, and structured information flow for educational finance content.",
      keyHighlights: [
        "Custom motion graphic elements",
        "Multi-track sound design layering",
        "Structured segment transitions",
      ],
    },
  },
  {
    id: "youtube-tech-deep-dive",
    title: "Tech Review & Long-Form Product Analysis",
    category: "YouTube",
    editingStyle: "Clean Review Aesthetic & Studio B-Roll",
    duration: "14:20",
    briefObjective:
      "Edit a hardware review with clean A-roll pacing, crisp macro B-roll transitions, and lower thirds.",
    servicesPerformed: [
      "A-Roll Pacing & Cutdown",
      "Color Correction & Matching",
      "Custom Lower Thirds",
      "Audio Balancing",
    ],
    thumbnail: "/images/projects/project-youtube-tech.jpg",
    videoPreviewUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-green-screen-41527-large.mp4",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    isPlaceholder: true,
    caseStudy: {
      challenge:
        "Balancing lengthy spoken segments with visual variety and clear product demonstrations.",
      approach: {
        pacingAndStructure:
          "Tightened conversational pauses and smoothed jump-cuts using audio overlaps.",
        bRollAndVisuals:
          "Integrated product b-roll with smooth transitions and minimalist text callouts.",
        soundAndColor:
          "Balanced dialogue audio levels and adjusted multi-camera color temperatures for consistency.",
        retentionTactics:
          "Added spec comparison graphics at key discussion points to summarize takeaways.",
      },
      result:
        "Portfolio demonstration highlighting A-roll tightening, audio balancing, and product review editing workflows.",
      keyHighlights: [
        "Timeline synchronization",
        "Clean audio balancing",
        "Minimalist lower-thirds package",
      ],
    },
  },
  {
    id: "viral-shorts-mastery-pack",
    title: "Vertical Short-Form Video Editing",
    category: "Shorts & Reels",
    editingStyle: "Fast-Paced Mobile Cuts & Captions",
    duration: "0:52",
    briefObjective:
      "Format and edit spoken content into engaging vertical videos with animated subtitles and sound effects.",
    servicesPerformed: [
      "Vertical Re-framing (9:16)",
      "Dynamic Subtitles",
      "B-Roll Overlays",
      "Sound FX Integration",
    ],
    thumbnail: "/images/projects/project-shorts-1.jpg",
    videoPreviewUrl: "https://assets.mixkit.co/videos/preview/mixkit-urban-city-street-with-neon-lights-at-night-42217-large.mp4",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    isPlaceholder: true,
    caseStudy: {
      challenge:
        "Formatting landscape footage into vertical framing while maintaining narrative clarity and visual energy.",
      approach: {
        pacingAndStructure:
          "Positioned the key hook within the opening seconds and trimmed pauses to maintain continuous momentum.",
        bRollAndVisuals:
          "Added contextual cutaways, animated keyword highlights, and mobile-optimized graphics.",
        soundAndColor:
          "Added punctuation sound effects synchronized to animated text reveals.",
        retentionTactics:
          "Used subtle framing zooms to emphasize key conversational points.",
      },
      result:
        "Portfolio demonstration of vertical re-framing (9:16), animated caption styling, and mobile pacing techniques.",
      keyHighlights: [
        "Custom-styled subtitle animations",
        "9:16 mobile framing optimization",
        "Rhythmic sound effect placement",
      ],
    },
  },
  {
    id: "documentary-untold-story",
    title: "Documentary-Style Storytelling Demonstration",
    category: "Documentary",
    editingStyle: "Atmospheric & Cinematic Soundscapes",
    duration: "18:30",
    briefObjective:
      "Craft an immersive historical documentary piece with deliberate pacing, photo animation, and sound design.",
    servicesPerformed: [
      "Archival Photo 2.5D Animation",
      "Narrative Arc Structuring",
      "Score & Sound Mixing",
      "Color Grading",
    ],
    thumbnail: "/images/projects/project-doc-1.jpg",
    videoPreviewUrl: "https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-modern-skyscrapers-in-a-city-43180-large.mp4",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    isPlaceholder: true,
    caseStudy: {
      challenge:
        "Working with static archival still imagery and building visual depth without losing narrative pacing.",
      approach: {
        pacingAndStructure:
          "Structured the narrative into distinct thematic chapters with space for musical transitions.",
        bRollAndVisuals:
          "Layered archival stills with depth separation and subtle camera motion in After Effects.",
        soundAndColor:
          "Combined orchestral cues with atmospheric sound layers and warm color tones.",
        retentionTactics:
          "Utilized chapter title cards to transition smoothly between historical eras.",
      },
      result:
        "Portfolio demonstration of documentary pacing, archival photo animation, and atmospheric audio mixing.",
      keyHighlights: [
        "Archival photo motion techniques",
        "Multi-layer audio mixing",
        "Consistent documentary color palette",
      ],
    },
  },
  {
    id: "commercial-brand-launch",
    title: "Product Commercial Demonstration",
    category: "Commercial",
    editingStyle: "Rhythm-Locked Editing & Motion Branding",
    duration: "0:45",
    briefObjective:
      "Edit a 45-second product commercial synchronized to musical rhythm with clean motion titles.",
    servicesPerformed: [
      "Rhythm-Locked Editing",
      "Product Visual Compositing",
      "Kinetic Branding Elements",
      "Audio Mixing",
    ],
    thumbnail: "/images/projects/project-comm-1.jpg",
    videoPreviewUrl: "https://assets.mixkit.co/videos/preview/mixkit-studio-shot-of-dj-headphones-on-a-stand-42410-large.mp4",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    isPlaceholder: true,
    caseStudy: {
      challenge:
        "Delivering product feature highlights concisely within a 45-second commercial structure.",
      approach: {
        pacingAndStructure:
          "Cut video transitions and title cards to the rhythm and beats of the music track.",
        bRollAndVisuals:
          "Combined product footage with clean graphic overlays and title typography.",
        soundAndColor:
          "Layered tactile sound effects with background music for crisp audio impact.",
        retentionTactics:
          "Structured a quick feature progression leading directly to the closing call to action.",
      },
      result:
        "Portfolio demonstration of commercial rhythm editing, audio-visual synchronization, and branding elements.",
      keyHighlights: [
        "Beat-synchronized cutting",
        "Multi-aspect ratio formatting",
        "Clean motion title integration",
      ],
    },
  },
  {
    id: "motion-graphics-showcase",
    title: "Explainer & Motion Graphics Demonstration",
    category: "Motion Graphics",
    editingStyle: "Motion Design & UI Elements",
    duration: "1:30",
    briefObjective:
      "Animate a software explainer demonstrating workflow concepts through clean graphics and typography.",
    servicesPerformed: [
      "Motion Graphics Animation",
      "UI Animation Elements",
      "Sound FX Placement",
      "Typography Animation",
    ],
    thumbnail: "/images/projects/project-motion-1.jpg",
    videoPreviewUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-digital-data-processing-screen-31911-large.mp4",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    isPlaceholder: true,
    caseStudy: {
      challenge:
        "Explaining abstract software concepts through clear, easily understandable animated graphics.",
      approach: {
        pacingAndStructure:
          "Followed a structured sequence moving from problem context to solution visualization.",
        bRollAndVisuals:
          "Created vector layout animations with smooth easing curves in After Effects.",
        soundAndColor:
          "Added interface sound cues to complement on-screen animations.",
        retentionTactics:
          "Maintained smooth visual continuity across transitions between concepts.",
      },
      result:
        "Portfolio demonstration of vector animation, UI motion design, and explainer structuring.",
      keyHighlights: [
        "Vector motion graphics animation",
        "UI component movement systems",
        "Cohesive color and typography styling",
      ],
    },
  },
];

export const showreelData = {
  title: "Editing Portfolio Reel",
  subtitle:
    "A showcase of Muhammad's editing, pacing, motion design, and visual storytelling across formats.",
  posterImage: "/images/showreel-poster.jpg",
  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-green-screen-41527-large.mp4",
  duration: "1:00",
};
