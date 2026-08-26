import { createClient } from "@/lib/supabase/server";
import {
  DbProject,
  FullProjectWithRelations,
} from "./types";
import { verifyAdminAuth } from "@/lib/supabase/admin-auth";
import { DEFAULT_SEED_CATEGORIES } from "./categories";

function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
  );
}

// In-memory mock store
let memoryProjects: FullProjectWithRelations[] = [];

// ==============================================================================
// PUBLIC QUERIES (Filtered by status = 'published')
// ==============================================================================

export async function getFeaturedPublishedProjects(
  limit = 3
): Promise<FullProjectWithRelations[]> {
  if (!isSupabaseConfigured()) {
    return memoryProjects
      .filter((p) => p.status === "published" && p.featured)
      .slice(0, limit);
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select(`
        *,
        category:portfolio_categories(*),
        services:project_services(*),
        deliverables:project_deliverables(*),
        approach:project_approach(*)
      `)
      .eq("status", "published")
      .eq("featured", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error || !data) {
      console.error("Error fetching featured projects:", error);
      return [];
    }

    return (data as any[]).map(formatProjectWithRelations);
  } catch (err) {
    console.error("Error in getFeaturedPublishedProjects:", err);
    return [];
  }
}

export async function getAllPublishedProjects(
  categorySlug?: string
): Promise<FullProjectWithRelations[]> {
  if (!isSupabaseConfigured()) {
    let list = memoryProjects.filter((p) => p.status === "published");
    if (categorySlug && categorySlug !== "all") {
      list = list.filter((p) => p.category?.slug === categorySlug);
    }
    return list.sort((a, b) => a.sort_order - b.sort_order);
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from("portfolio_projects")
      .select(`
        *,
        category:portfolio_categories(*),
        services:project_services(*),
        deliverables:project_deliverables(*),
        approach:project_approach(*)
      `)
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error || !data) {
      console.error("Error fetching published projects:", error);
      return [];
    }

    let formatted = (data as any[]).map(formatProjectWithRelations);

    if (categorySlug && categorySlug !== "all") {
      formatted = formatted.filter(
        (p) => p.category && p.category.slug === categorySlug
      );
    }

    return formatted;
  } catch (err) {
    console.error("Error in getAllPublishedProjects:", err);
    return [];
  }
}

export async function getProjectBySlug(
  slug: string
): Promise<FullProjectWithRelations | null> {
  if (!isSupabaseConfigured()) {
    const found = memoryProjects.find(
      (p) => p.slug === slug && p.status === "published"
    );
    return found || null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select(`
        *,
        category:portfolio_categories(*),
        services:project_services(*),
        deliverables:project_deliverables(*),
        approach:project_approach(*)
      `)
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return formatProjectWithRelations(data);
  } catch (err) {
    console.error("Error in getProjectBySlug:", err);
    return null;
  }
}

// ==============================================================================
// ADMIN QUERIES
// ==============================================================================

export async function getDashboardStats() {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthenticated) {
    return {
      totalProjects: 0,
      publishedCount: 0,
      draftCount: 0,
      featuredCount: 0,
      categoriesCount: 0,
      recentProjects: [],
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      totalProjects: memoryProjects.length,
      publishedCount: memoryProjects.filter((p) => p.status === "published").length,
      draftCount: memoryProjects.filter((p) => p.status === "draft").length,
      featuredCount: memoryProjects.filter((p) => p.featured).length,
      categoriesCount: DEFAULT_SEED_CATEGORIES.length,
      recentProjects: memoryProjects.slice(0, 5),
    };
  }

  try {
    const supabase = await createClient();
    const [projectsRes, categoriesRes] = await Promise.all([
      supabase
        .from("portfolio_projects")
        .select(`
          *,
          category:portfolio_categories(id, name, slug)
        `)
        .order("created_at", { ascending: false }),
      supabase
        .from("portfolio_categories")
        .select("id", { count: "exact", head: true }),
    ]);

    const projects = (projectsRes.data || []) as DbProject[];
    const totalProjects = projects.length;
    const publishedCount = projects.filter((p) => p.status === "published").length;
    const draftCount = projects.filter((p) => p.status === "draft").length;
    const featuredCount = projects.filter((p) => p.featured).length;
    const categoriesCount = categoriesRes.count || 0;

    return {
      totalProjects,
      publishedCount,
      draftCount,
      featuredCount,
      categoriesCount,
      recentProjects: projects.slice(0, 5),
    };
  } catch (err) {
    console.error("Error in getDashboardStats:", err);
    return {
      totalProjects: 0,
      publishedCount: 0,
      draftCount: 0,
      featuredCount: 0,
      categoriesCount: 0,
      recentProjects: [],
    };
  }
}

export async function getAllAdminProjects(filters?: {
  status?: string;
  categoryId?: string;
  search?: string;
  featured?: boolean;
  sort?: string;
}): Promise<FullProjectWithRelations[]> {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthenticated) {
    return [];
  }

  if (!isSupabaseConfigured()) {
    let list = [...memoryProjects];
    if (filters?.status && filters.status !== "all") {
      list = list.filter((p) => p.status === filters.status);
    }
    if (filters?.categoryId && filters.categoryId !== "all") {
      list = list.filter((p) => p.category_id === filters.categoryId);
    }
    if (filters?.featured !== undefined) {
      list = list.filter((p) => p.featured === filters.featured);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          (p.short_description && p.short_description.toLowerCase().includes(q))
      );
    }
    return list.sort((a, b) => {
      if (filters?.sort === "oldest") {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      if (filters?.sort === "order") {
        return a.sort_order - b.sort_order;
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from("portfolio_projects")
      .select(`
        *,
        category:portfolio_categories(*),
        services:project_services(*),
        deliverables:project_deliverables(*),
        approach:project_approach(*)
      `);

    if (filters?.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }
    if (filters?.categoryId && filters.categoryId !== "all") {
      query = query.eq("category_id", filters.categoryId);
    }
    if (filters?.featured !== undefined) {
      query = query.eq("featured", filters.featured);
    }

    if (filters?.sort === "oldest") {
      query = query.order("created_at", { ascending: true });
    } else if (filters?.sort === "order") {
      query = query.order("sort_order", { ascending: true });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    const { data, error } = await query;
    if (error || !data) {
      return [];
    }

    let results = (data as any[]).map(formatProjectWithRelations);

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          (p.short_description && p.short_description.toLowerCase().includes(q))
      );
    }

    return results;
  } catch (err) {
    console.error("Error in getAllAdminProjects:", err);
    return [];
  }
}

export async function getAdminProjectById(
  id: string
): Promise<FullProjectWithRelations | null> {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthenticated) {
    return null;
  }

  if (!isSupabaseConfigured()) {
    return memoryProjects.find((p) => p.id === id) || null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select(`
        *,
        category:portfolio_categories(*),
        services:project_services(*),
        deliverables:project_deliverables(*),
        approach:project_approach(*)
      `)
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return formatProjectWithRelations(data);
  } catch (err) {
    console.error("Error in getAdminProjectById:", err);
    return null;
  }
}

function formatProjectWithRelations(row: any): FullProjectWithRelations {
  return {
    ...row,
    services: Array.isArray(row.services)
      ? row.services.sort((a: any, b: any) => a.sort_order - b.sort_order)
      : [],
    deliverables: Array.isArray(row.deliverables)
      ? row.deliverables.sort((a: any, b: any) => a.sort_order - b.sort_order)
      : [],
    approach: row.approach
      ? Array.isArray(row.approach)
        ? row.approach[0] || null
        : row.approach
      : null,
  };
}
