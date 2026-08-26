export interface ToolStackItem {
  id: string;
  name: string;
  shortCode: string;
  category: "NLE & Editing" | "Motion & VFX";
  roleInWorkflow: string;
  tagline: string;
  features: string[];
}

export const softwareStack: ToolStackItem[] = [
  {
    id: "premiere-pro",
    name: "Adobe Premiere Pro",
    shortCode: "Pr",
    category: "NLE & Editing",
    roleInWorkflow: "Primary Non-Linear Editing & Assembly",
    tagline: "Multicam editing, pacing refinement, and timeline assembly.",
    features: ["Multi-Camera Editing", "Timeline Assembly", "Proxy Workflows", "Audio Synchronization"],
  },
  {
    id: "after-effects",
    name: "Adobe After Effects",
    shortCode: "Ae",
    category: "Motion & VFX",
    roleInWorkflow: "Motion Graphics & Visual Elements",
    tagline: "Kinetic typography, lower thirds, callouts, and motion design.",
    features: ["Kinetic Typography", "Motion Graphics", "Visual Compositing", "Custom Transitions"],
  },
];

