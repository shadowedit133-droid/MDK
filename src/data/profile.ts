export interface UpworkStats {
  yearsExperience: string;
  totalJobs: number;
  jobSuccessScore: number;
  clientRating: number;
  totalReviews: number;
  statusBadge: string;
}

export interface ProfileData {
  fullName: string;
  upworkDisplayName: string;
  professionalTitle: string;
  shortRole: string;
  location: string;
  upworkUrl: string;
  availabilityStatus: string;
  heroHeadline: {
    line1: string;
    line2: string;
  };
  heroSubheadline: string;
  complianceNotice: string;
  stats: UpworkStats;
  about: {
    heading: string;
    paragraphs: string[];
    focusAreas: string[];
  };
}

export const profileData: ProfileData = {
  fullName: "Muhammad Daniyal Khan",
  upworkDisplayName: "Muhammad D.",
  professionalTitle: "Video Editor | Cash Cow Editor | YouTube Video Editing Expert | Top 10",
  shortRole: "Professional Video Editor",
  location: "Islamabad, Pakistan",
  upworkUrl: "https://www.upwork.com/freelancers/muhammadd278?mp_source=share",
  availabilityStatus: "Available for selected projects through Upwork",
  heroHeadline: {
    line1: "Stories Aren't Just Edited.",
    line2: "They're Engineered to Be Watched.",
  },
  heroSubheadline:
    "I'm Muhammad Daniyal Khan, a professional video editor with 5+ years of experience specializing in high-retention YouTube videos, faceless content, short-form edits, and cinematic storytelling.",
  complianceNotice:
    "For Upwork clients, project communication and hiring are handled through Upwork.",
  stats: {
    yearsExperience: "5+",
    totalJobs: 27,
    jobSuccessScore: 96,
    clientRating: 5.0,
    totalReviews: 12,
    statusBadge: "Top Rated",
  },
  about: {
    heading: "Editing Is Where Raw Footage Becomes a Story.",
    paragraphs: [
      "Muhammad Daniyal Khan is a professional video editor with more than five years of experience transforming raw footage into engaging visual stories that hold viewer attention.",
      "His editing craft focuses on pacing, narrative structure, B-roll selection, sound design, and motion graphics across YouTube long-form, faceless Cash Cow content, and vertical shorts.",
      "Working with creators and clients via Upwork, Muhammad combines technical editing in Premiere Pro and After Effects with platform awareness to ensure videos meet solid production standards.",
    ],
    focusAreas: [
      "Narrative Structuring & Pacing",
      "Audience Retention Workflows",
      "B-Roll Curation & Visual Flow",
      "Motion Graphics & Lower Thirds",
      "Sound Design & Audio Balancing",
      "Color Correction & Grading",
    ],
  },
};
