import { createClient } from "@/lib/supabase/server";
import { DbCategory } from "./types";

export const DEFAULT_SEED_CATEGORIES: DbCategory[] = [
  {
    id: "cat-1",
    name: "YouTube",
    slug: "youtube",
    description: "Long-form narrative, essays, tech, and educational video editing.",
    active: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat-2",
    name: "Faceless / Cash Cow",
    slug: "faceless-cash-cow",
    description: "Automated stock footage assembly, kinetic typography, and sound design.",
    active: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat-3",
    name: "Shorts & Reels",
    slug: "shorts-reels",
    description: "Vertical 9:16 high-impact hooks and dynamic subtitle cutdowns.",
    active: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat-4",
    name: "Documentary",
    slug: "documentary",
    description: "Atmospheric pacing, archival photo animation, and score layering.",
    active: true,
    sort_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat-5",
    name: "Commercial",
    slug: "commercial",
    description: "Product commercials, rhythm-locked cuts, and kinetic branding.",
    active: true,
    sort_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat-6",
    name: "Motion Graphics",
    slug: "motion-graphics",
    description: "Vector animations, UI explainers, lower thirds, and titles.",
    active: true,
    sort_order: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
  );
}

export async function getActiveCategories(): Promise<DbCategory[]> {
  if (!isSupabaseConfigured()) {
    return DEFAULT_SEED_CATEGORIES;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("portfolio_categories")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_SEED_CATEGORIES;
    }

    return data as DbCategory[];
  } catch (err) {
    console.error("Error fetching active categories:", err);
    return DEFAULT_SEED_CATEGORIES;
  }
}

export async function getAllCategories(): Promise<DbCategory[]> {
  if (!isSupabaseConfigured()) {
    return DEFAULT_SEED_CATEGORIES;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("portfolio_categories")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_SEED_CATEGORIES;
    }

    return data as DbCategory[];
  } catch (err) {
    console.error("Error fetching all categories:", err);
    return DEFAULT_SEED_CATEGORIES;
  }
}
