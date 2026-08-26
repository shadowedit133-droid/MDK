"use server";

import { createClient } from "@/lib/supabase/server";
import {
  DbProject,
  ProjectFormData,
  ProjectCardItem,
  PaginatedResult,
} from "@/lib/db/types";
import { getPaginatedPublishedProjects } from "@/lib/db/projects";
import { revalidatePath, revalidateTag } from "next/cache";
import { verifyAdminAuth } from "@/lib/supabase/admin-auth";

function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
  );
}

// ==============================================================================
// PUBLIC PAGINATION SERVER ACTION (Next 12 items on demand)
// ==============================================================================

export async function fetchMoreProjectsAction(options: {
  categorySlug?: string;
  page: number;
  pageSize?: number;
}): Promise<PaginatedResult<ProjectCardItem>> {
  return getPaginatedPublishedProjects({
    categorySlug: options.categorySlug,
    page: options.page,
    pageSize: options.pageSize || 12,
  });
}

// ==============================================================================
// ATOMIC CMS MUTATION ACTIONS (Transactional via PostgreSQL RPC)
// ==============================================================================

export async function createProjectAction(
  formData: ProjectFormData
): Promise<{ success: boolean; data?: DbProject; error?: string }> {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthenticated) {
    return { success: false, error: auth.error || "Unauthorized" };
  }

  // 1. Validate and sanitize inputs
  const cleanTitle = (formData.title || "").trim();
  if (!cleanTitle) {
    return { success: false, error: "Project title is required." };
  }

  const cleanSlug = (formData.slug || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!cleanSlug) {
    return { success: false, error: "A valid unique slug is required." };
  }

  if (!isSupabaseConfigured()) {
    revalidateAllProjectPaths(cleanSlug);
    return {
      success: true,
      data: {
        id: "proj-" + Date.now(),
        title: cleanTitle,
        slug: cleanSlug,
        short_description: formData.short_description || null,
        overview: formData.overview || null,
        category_id: formData.category_id || null,
        video_url: formData.video_url || null,
        video_storage_path: formData.video_storage_path || null,
        thumbnail_url: formData.thumbnail_url || null,
        thumbnail_storage_path: formData.thumbnail_storage_path || null,
        duration: formData.duration || null,
        editing_style: formData.editing_style || null,
        challenge: formData.challenge || null,
        result_summary: formData.result_summary || null,
        status: formData.status,
        featured: formData.featured,
        sort_order: formData.sort_order ?? 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: formData.status === "published" ? new Date().toISOString() : null,
      },
    };
  }

  try {
    const supabase = await createClient();

    // Try executing atomic transactional RPC first
    const { data: rpcResult, error: rpcError } = await supabase.rpc(
      "save_project_atomic",
      {
        p_project_id: null,
        p_title: cleanTitle,
        p_slug: cleanSlug,
        p_short_description: formData.short_description || null,
        p_overview: formData.overview || null,
        p_category_id: formData.category_id || null,
        p_video_url: formData.video_url || null,
        p_video_storage_path: formData.video_storage_path || null,
        p_thumbnail_url: formData.thumbnail_url || null,
        p_thumbnail_storage_path: formData.thumbnail_storage_path || null,
        p_duration: formData.duration || null,
        p_editing_style: formData.editing_style || null,
        p_challenge: formData.challenge || null,
        p_result_summary: formData.result_summary || null,
        p_status: formData.status,
        p_featured: formData.featured,
        p_sort_order: formData.sort_order ?? 0,
        p_services: formData.services || [],
        p_deliverables: formData.deliverables || [],
        p_approach: formData.approach || {},
      }
    );

    if (rpcError) {
      // If RPC is missing in local environment, execute safe sequential fallback
      if (rpcError.message.includes("function") && rpcError.message.includes("does not exist")) {
        return createProjectFallback(supabase, cleanTitle, cleanSlug, formData);
      }
      return { success: false, error: rpcError.message };
    }

    revalidateAllProjectPaths(cleanSlug);
    return {
      success: true,
      data: {
        id: rpcResult?.id || "proj-" + Date.now(),
        title: cleanTitle,
        slug: cleanSlug,
        short_description: formData.short_description || null,
        overview: formData.overview || null,
        category_id: formData.category_id || null,
        video_url: formData.video_url || null,
        video_storage_path: formData.video_storage_path || null,
        thumbnail_url: formData.thumbnail_url || null,
        thumbnail_storage_path: formData.thumbnail_storage_path || null,
        duration: formData.duration || null,
        editing_style: formData.editing_style || null,
        challenge: formData.challenge || null,
        result_summary: formData.result_summary || null,
        status: formData.status,
        featured: formData.featured,
        sort_order: formData.sort_order ?? 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: formData.status === "published" ? new Date().toISOString() : null,
      },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create project";
    console.error("createProjectAction error:", message);
    return { success: false, error: message };
  }
}

async function createProjectFallback(
  supabase: any,
  cleanTitle: string,
  cleanSlug: string,
  formData: ProjectFormData
) {
  // Check slug uniqueness
  const { data: existingSlug } = await supabase
    .from("portfolio_projects")
    .select("id")
    .eq("slug", cleanSlug)
    .maybeSingle();

  if (existingSlug) {
    return {
      success: false,
      error: `Slug "${cleanSlug}" is already in use. Please specify a unique slug.`,
    };
  }

  const { data: projectData, error: projectError } = await supabase
    .from("portfolio_projects")
    .insert({
      title: cleanTitle,
      slug: cleanSlug,
      short_description: formData.short_description || null,
      overview: formData.overview || null,
      category_id: formData.category_id || null,
      video_url: formData.video_url || null,
      video_storage_path: formData.video_storage_path || null,
      thumbnail_url: formData.thumbnail_url || null,
      thumbnail_storage_path: formData.thumbnail_storage_path || null,
      duration: formData.duration || null,
      editing_style: formData.editing_style || null,
      challenge: formData.challenge || null,
      result_summary: formData.result_summary || null,
      status: formData.status,
      featured: formData.featured,
      sort_order: formData.sort_order ?? 0,
      published_at: formData.status === "published" ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (projectError || !projectData) {
    return { success: false, error: projectError?.message || "Failed to create project" };
  }

  const projectId = projectData.id;

  if (formData.services && formData.services.length > 0) {
    const servicesToInsert = formData.services
      .filter((s) => s.trim().length > 0)
      .map((name, idx) => ({
        project_id: projectId,
        name: name.trim(),
        sort_order: idx,
      }));
    if (servicesToInsert.length > 0) {
      await supabase.from("project_services").insert(servicesToInsert);
    }
  }

  if (formData.deliverables && formData.deliverables.length > 0) {
    const deliverablesToInsert = formData.deliverables
      .filter((d) => d.trim().length > 0)
      .map((item, idx) => ({
        project_id: projectId,
        item: item.trim(),
        sort_order: idx,
      }));
    if (deliverablesToInsert.length > 0) {
      await supabase.from("project_deliverables").insert(deliverablesToInsert);
    }
  }

  const hasApproach =
    formData.approach &&
    (formData.approach.pacing_and_structure ||
      formData.approach.b_roll_and_visuals ||
      formData.approach.sound_and_color ||
      formData.approach.retention_tactics);

  if (hasApproach) {
    await supabase.from("project_approach").insert({
      project_id: projectId,
      pacing_and_structure: formData.approach.pacing_and_structure || null,
      b_roll_and_visuals: formData.approach.b_roll_and_visuals || null,
      sound_and_color: formData.approach.sound_and_color || null,
      retention_tactics: formData.approach.retention_tactics || null,
    });
  }

  revalidateAllProjectPaths(cleanSlug);
  return { success: true, data: projectData as DbProject };
}

export async function updateProjectAction(
  id: string,
  formData: ProjectFormData
): Promise<{ success: boolean; data?: DbProject; error?: string }> {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthenticated) {
    return { success: false, error: auth.error || "Unauthorized" };
  }

  const cleanTitle = (formData.title || "").trim();
  if (!cleanTitle) {
    return { success: false, error: "Project title is required." };
  }

  const cleanSlug = (formData.slug || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!cleanSlug) {
    return { success: false, error: "A valid unique slug is required." };
  }

  if (!isSupabaseConfigured()) {
    revalidateAllProjectPaths(cleanSlug);
    return { success: true };
  }

  try {
    const supabase = await createClient();

    // 1. Fetch current project to obtain old media paths
    const { data: currentProject } = await supabase
      .from("portfolio_projects")
      .select("id, slug, video_storage_path, thumbnail_storage_path")
      .eq("id", id)
      .maybeSingle();

    if (!currentProject) {
      return { success: false, error: "Project not found." };
    }

    const oldVideoPath = currentProject.video_storage_path;
    const oldThumbnailPath = currentProject.thumbnail_storage_path;
    const oldSlug = currentProject.slug;

    // 2. Execute Atomic Transaction via RPC
    const { data: rpcResult, error: rpcError } = await supabase.rpc(
      "save_project_atomic",
      {
        p_project_id: id,
        p_title: cleanTitle,
        p_slug: cleanSlug,
        p_short_description: formData.short_description || null,
        p_overview: formData.overview || null,
        p_category_id: formData.category_id || null,
        p_video_url: formData.video_url || null,
        p_video_storage_path: formData.video_storage_path || null,
        p_thumbnail_url: formData.thumbnail_url || null,
        p_thumbnail_storage_path: formData.thumbnail_storage_path || null,
        p_duration: formData.duration || null,
        p_editing_style: formData.editing_style || null,
        p_challenge: formData.challenge || null,
        p_result_summary: formData.result_summary || null,
        p_status: formData.status,
        p_featured: formData.featured,
        p_sort_order: formData.sort_order ?? 0,
        p_services: formData.services || [],
        p_deliverables: formData.deliverables || [],
        p_approach: formData.approach || {},
      }
    );

    if (rpcError) {
      if (rpcError.message.includes("function") && rpcError.message.includes("does not exist")) {
        return updateProjectFallback(
          supabase,
          id,
          cleanTitle,
          cleanSlug,
          formData,
          oldVideoPath,
          oldThumbnailPath,
          oldSlug
        );
      }
      return { success: false, error: rpcError.message };
    }

    // 3. Media Replacement Cleanup (Only after DB transaction commits)
    if (
      formData.video_storage_path &&
      oldVideoPath &&
      formData.video_storage_path !== oldVideoPath
    ) {
      try {
        await supabase.storage
          .from("portfolio-videos")
          .remove([oldVideoPath]);
      } catch (storageErr) {
        console.warn("Storage cleanup warning for replaced video:", storageErr);
      }
    }

    if (
      formData.thumbnail_storage_path &&
      oldThumbnailPath &&
      formData.thumbnail_storage_path !== oldThumbnailPath
    ) {
      try {
        await supabase.storage
          .from("portfolio-thumbnails")
          .remove([oldThumbnailPath]);
      } catch (storageErr) {
        console.warn("Storage cleanup warning for replaced thumbnail:", storageErr);
      }
    }

    revalidateAllProjectPaths(cleanSlug, oldSlug);
    return {
      success: true,
      data: {
        id: rpcResult?.id || id,
        title: cleanTitle,
        slug: cleanSlug,
        short_description: formData.short_description || null,
        overview: formData.overview || null,
        category_id: formData.category_id || null,
        video_url: formData.video_url || null,
        video_storage_path: formData.video_storage_path || null,
        thumbnail_url: formData.thumbnail_url || null,
        thumbnail_storage_path: formData.thumbnail_storage_path || null,
        duration: formData.duration || null,
        editing_style: formData.editing_style || null,
        challenge: formData.challenge || null,
        result_summary: formData.result_summary || null,
        status: formData.status,
        featured: formData.featured,
        sort_order: formData.sort_order ?? 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: formData.status === "published" ? new Date().toISOString() : null,
      },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update project";
    console.error("updateProjectAction error:", message);
    return { success: false, error: message };
  }
}

async function updateProjectFallback(
  supabase: any,
  id: string,
  cleanTitle: string,
  cleanSlug: string,
  formData: ProjectFormData,
  oldVideoPath: string | null,
  oldThumbnailPath: string | null,
  oldSlug: string
) {
  const { data: projectData, error: projectError } = await supabase
    .from("portfolio_projects")
    .update({
      title: cleanTitle,
      slug: cleanSlug,
      short_description: formData.short_description || null,
      overview: formData.overview || null,
      category_id: formData.category_id || null,
      video_url: formData.video_url || null,
      video_storage_path: formData.video_storage_path || null,
      thumbnail_url: formData.thumbnail_url || null,
      thumbnail_storage_path: formData.thumbnail_storage_path || null,
      duration: formData.duration || null,
      editing_style: formData.editing_style || null,
      challenge: formData.challenge || null,
      result_summary: formData.result_summary || null,
      status: formData.status,
      featured: formData.featured,
      sort_order: formData.sort_order ?? 0,
      published_at: formData.status === "published" ? new Date().toISOString() : null,
    })
    .eq("id", id)
    .select()
    .single();

  if (projectError || !projectData) {
    return { success: false, error: projectError?.message || "Failed to update project" };
  }

  await Promise.all([
    supabase.from("project_services").delete().eq("project_id", id),
    supabase.from("project_deliverables").delete().eq("project_id", id),
  ]);

  if (formData.services && formData.services.length > 0) {
    const servicesToInsert = formData.services
      .filter((s) => s.trim().length > 0)
      .map((name, idx) => ({
        project_id: id,
        name: name.trim(),
        sort_order: idx,
      }));
    if (servicesToInsert.length > 0) {
      await supabase.from("project_services").insert(servicesToInsert);
    }
  }

  if (formData.deliverables && formData.deliverables.length > 0) {
    const deliverablesToInsert = formData.deliverables
      .filter((d) => d.trim().length > 0)
      .map((item, idx) => ({
        project_id: id,
        item: item.trim(),
        sort_order: idx,
      }));
    if (deliverablesToInsert.length > 0) {
      await supabase.from("project_deliverables").insert(deliverablesToInsert);
    }
  }

  const hasApproach =
    formData.approach &&
    (formData.approach.pacing_and_structure ||
      formData.approach.b_roll_and_visuals ||
      formData.approach.sound_and_color ||
      formData.approach.retention_tactics);

  if (hasApproach) {
    await supabase.from("project_approach").upsert(
      {
        project_id: id,
        pacing_and_structure: formData.approach.pacing_and_structure || null,
        b_roll_and_visuals: formData.approach.b_roll_and_visuals || null,
        sound_and_color: formData.approach.sound_and_color || null,
        retention_tactics: formData.approach.retention_tactics || null,
      },
      { onConflict: "project_id" }
    );
  } else {
    await supabase.from("project_approach").delete().eq("project_id", id);
  }

  if (
    formData.video_storage_path &&
    oldVideoPath &&
    formData.video_storage_path !== oldVideoPath
  ) {
    try {
      await supabase.storage.from("portfolio-videos").remove([oldVideoPath]);
    } catch (storageErr) {
      console.warn("Storage cleanup warning for replaced video:", storageErr);
    }
  }

  if (
    formData.thumbnail_storage_path &&
    oldThumbnailPath &&
    formData.thumbnail_storage_path !== oldThumbnailPath
  ) {
    try {
      await supabase.storage.from("portfolio-thumbnails").remove([oldThumbnailPath]);
    } catch (storageErr) {
      console.warn("Storage cleanup warning for replaced thumbnail:", storageErr);
    }
  }

  revalidateAllProjectPaths(cleanSlug, oldSlug);
  return { success: true, data: projectData as DbProject };
}

export async function deleteProjectAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthenticated) {
    return { success: false, error: auth.error || "Unauthorized" };
  }

  if (!isSupabaseConfigured()) {
    revalidateAllProjectPaths();
    return { success: true };
  }

  try {
    const supabase = await createClient();

    // 1. Fetch project to identify storage paths to remove
    const { data: project } = await supabase
      .from("portfolio_projects")
      .select("slug, video_storage_path, thumbnail_storage_path")
      .eq("id", id)
      .maybeSingle();

    // 2. Delete project row from DB (child relations cascade-deleted automatically)
    const { error } = await supabase
      .from("portfolio_projects")
      .delete()
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    // 3. Clean up storage files asynchronously with structured logging
    if (project?.video_storage_path) {
      try {
        await supabase.storage
          .from("portfolio-videos")
          .remove([project.video_storage_path]);
      } catch (storageErr) {
        console.warn("Storage cleanup warning (video):", storageErr);
      }
    }

    if (project?.thumbnail_storage_path) {
      try {
        await supabase.storage
          .from("portfolio-thumbnails")
          .remove([project.thumbnail_storage_path]);
      } catch (storageErr) {
        console.warn("Storage cleanup warning (thumbnail):", storageErr);
      }
    }

    if (project?.slug) {
      revalidateAllProjectPaths(project.slug);
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete project";
    console.error("deleteProjectAction error:", message);
    return { success: false, error: message };
  }
}

function revalidateAllProjectPaths(slug?: string, oldSlug?: string) {
  try {
    revalidatePath("/");
    revalidatePath("/work");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    revalidatePath("/sitemap.xml");
    if (slug) {
      revalidatePath(`/work/${slug}`);
    }
    if (oldSlug && oldSlug !== slug) {
      revalidatePath(`/work/${oldSlug}`);
    }
  } catch (err) {
    console.warn("Revalidation warning:", err);
  }
}
