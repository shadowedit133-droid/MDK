import { createClient } from "@/lib/supabase/server";
import {
  DbProject,
  FullProjectWithRelations,
  ProjectCardItem,
  PaginatedResult,
} from "./types";
import { verifyAdminAuth } from "@/lib/supabase/admin-auth";
import { DEFAULT_SEED_CATEGORIES } from "./categories";

function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
  );
}

// In-memory mock store for preview environments
let memoryProjects: FullProjectWithRelations[] = [];

// Base card fields selection to prevent fetching heavy case-study relations on cards/tables
const PROJECT_CARD_FIELDS = `
  id,
  title,
  slug,
  short_description,
  category_id,
  video_url,
  thumbnail_url,
  duration,
  editing_style,
  status,
  featured,
  sort_order,
  created_at,
  published_at,
  category:portfolio_categories(id, name, slug)
`;

// ==============================================================================
// PUBLIC QUERIES (Filtered by status = 'published')
// ==============================================================================

export async function getFeaturedPublishedProjects(
  limit = 3
): Promise<ProjectCardItem[]> {
  if (!isSupabaseConfigured()) {
    return memoryProjects
      .filter((p) => p.status === "published" && p.featured)
      .slice(0, limit);
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select(PROJECT_CARD_FIELDS)
      .eq("status", "published")
      .eq("featured", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error || !data) {
      console.error("Error fetching featured projects:", error?.message || error);
      return [];
    }

    return data as unknown as ProjectCardItem[];
  } catch (err) {
    console.error("Error in getFeaturedPublishedProjects:", err);
    return [];
  }
}

export async function getPaginatedPublishedProjects(options?: {
  categorySlug?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<ProjectCardItem>> {
  const page = Math.max(1, Number(options?.page) || 1);
  const pageSize = Math.max(1, Math.min(50, Number(options?.pageSize) || 12));
  const categorySlug = options?.categorySlug;

  if (!isSupabaseConfigured()) {
    let list = memoryProjects.filter((p) => p.status === "published");
    if (categorySlug && categorySlug !== "all") {
      list = list.filter((p) => p.category?.slug === categorySlug);
    }
    list.sort((a, b) => a.sort_order - b.sort_order);
    const total = list.length;
    const totalPages = Math.ceil(total / pageSize) || 1;
    const data = list.slice((page - 1) * pageSize, page * pageSize) as unknown as ProjectCardItem[];
    return { data, total, page, pageSize, totalPages };
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from("portfolio_projects")
      .select(PROJECT_CARD_FIELDS, { count: "exact" })
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    // Category filter in SQL
    if (categorySlug && categorySlug !== "all") {
      const { data: categoryData } = await supabase
        .from("portfolio_categories")
        .select("id")
        .eq("slug", categorySlug)
        .maybeSingle();

      if (categoryData?.id) {
        query = query.eq("category_id", categoryData.id);
      } else {
        return { data: [], total: 0, page, pageSize, totalPages: 0 };
      }
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;
    if (error || !data) {
      console.error("Error in getPaginatedPublishedProjects:", error?.message || error);
      return { data: [], total: 0, page, pageSize, totalPages: 0 };
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize) || 1;

    return {
      data: data as unknown as ProjectCardItem[],
      total,
      page,
      pageSize,
      totalPages,
    };
  } catch (err) {
    console.error("Error in getPaginatedPublishedProjects:", err);
    return { data: [], total: 0, page, pageSize, totalPages: 0 };
  }
}

export async function getAllPublishedProjects(
  categorySlug?: string
): Promise<ProjectCardItem[]> {
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
      .select(PROJECT_CARD_FIELDS)
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    // Filter directly at the database level if categorySlug is provided
    if (categorySlug && categorySlug !== "all") {
      const { data: categoryData } = await supabase
        .from("portfolio_categories")
        .select("id")
        .eq("slug", categorySlug)
        .maybeSingle();

      if (categoryData?.id) {
        query = query.eq("category_id", categoryData.id);
      }
    }

    const { data, error } = await query;

    if (error || !data) {
      console.error("Error fetching published projects:", error?.message || error);
      return [];
    }

    return data as unknown as ProjectCardItem[];
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
          id,
          title,
          slug,
          status,
          featured,
          thumbnail_url,
          created_at,
          category:portfolio_categories(id, name, slug)
        `)
        .order("created_at", { ascending: false }),
      supabase
        .from("portfolio_categories")
        .select("id", { count: "exact", head: true }),
    ]);

    const projects = (projectsRes.data || []) as unknown as DbProject[];
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
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<ProjectCardItem>> {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthenticated) {
    return {
      data: [],
      total: 0,
      page: 1,
      pageSize: 20,
      totalPages: 0,
    };
  }

  const page = Math.max(1, Number(filters?.page) || 1);
  const pageSize = Math.max(1, Math.min(100, Number(filters?.pageSize) || 20));

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

    list.sort((a, b) => {
      if (filters?.sort === "oldest") {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      if (filters?.sort === "order") {
        return a.sort_order - b.sort_order;
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    const total = list.length;
    const totalPages = Math.ceil(total / pageSize) || 1;
    const paginated = list.slice((page - 1) * pageSize, page * pageSize);

    return {
      data: paginated as unknown as ProjectCardItem[],
      total,
      page,
      pageSize,
      totalPages,
    };
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from("portfolio_projects")
      .select(PROJECT_CARD_FIELDS, { count: "exact" });

    // Status filter
    if (filters?.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }

    // Category filter
    if (filters?.categoryId && filters.categoryId !== "all") {
      query = query.eq("category_id", filters.categoryId);
    }

    // Featured filter
    if (filters?.featured !== undefined) {
      query = query.eq("featured", filters.featured);
    }

    // SQL-level sanitized search (eliminates in-memory filtering of full DB)
    if (filters?.search && filters.search.trim().length > 0) {
      const sanitized = filters.search.trim().replace(/[%_]/g, "");
      if (sanitized.length > 0) {
        query = query.or(
          `title.ilike.%${sanitized}%,slug.ilike.%${sanitized}%,short_description.ilike.%${sanitized}%`
        );
      }
    }

    // Sorting
    if (filters?.sort === "oldest") {
      query = query.order("created_at", { ascending: true });
    } else if (filters?.sort === "order") {
      query = query.order("sort_order", { ascending: true });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    // Database Pagination Range
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;
    if (error || !data) {
      console.error("Error in getAllAdminProjects:", error?.message || error);
      return {
        data: [],
        total: 0,
        page,
        pageSize,
        totalPages: 0,
      };
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize) || 1;

    return {
      data: data as unknown as ProjectCardItem[],
      total,
      page,
      pageSize,
      totalPages,
    };
  } catch (err) {
    console.error("Error in getAllAdminProjects:", err);
    return {
      data: [],
      total: 0,
      page,
      pageSize,
      totalPages: 0,
    };
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
