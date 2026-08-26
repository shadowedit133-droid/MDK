"use server";

import { createClient } from "@/lib/supabase/server";
import {
  DbProject,
  ProjectFormData,
} from "@/lib/db/types";
import { revalidatePath } from "next/cache";
import { verifyAdminAuth } from "@/lib/supabase/admin-auth";

function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
  );
}

export async function createProjectAction(
  formData: ProjectFormData
): Promise<{ success: boolean; data?: DbProject; error?: string }> {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthenticated) {
    return { success: false, error: auth.error || "Unauthorized" };
  }

  const cleanSlug = formData.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-");

  if (!isSupabaseConfigured()) {
    revalidateAllProjectPaths(cleanSlug);
    return {
      success: true,
      data: {
        id: "proj-" + Date.now(),
        title: formData.title,
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

    // 1. Insert Project Header
    const { data: projectData, error: projectError } = await supabase
      .from("portfolio_projects")
      .insert({
        title: formData.title.trim(),
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

    // 2. Insert Services
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

    // 3. Insert Deliverables
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

    // 4. Insert Approach
    const hasApproach =
      formData.approach.pacing_and_structure ||
      formData.approach.b_roll_and_visuals ||
      formData.approach.sound_and_color ||
      formData.approach.retention_tactics;

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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create project";
    return { success: false, error: message };
  }
}

export async function updateProjectAction(
  id: string,
  formData: ProjectFormData
): Promise<{ success: boolean; data?: DbProject; error?: string }> {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthenticated) {
    return { success: false, error: auth.error || "Unauthorized" };
  }

  const cleanSlug = formData.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-");

  if (!isSupabaseConfigured()) {
    revalidateAllProjectPaths(cleanSlug);
    return { success: true };
  }

  try {
    const supabase = await createClient();

    // Check slug uniqueness against other projects
    const { data: existingSlug } = await supabase
      .from("portfolio_projects")
      .select("id")
      .eq("slug", cleanSlug)
      .neq("id", id)
      .maybeSingle();

    if (existingSlug) {
      return {
        success: false,
        error: `Slug "${cleanSlug}" is already in use by another project. Please specify a unique slug.`,
      };
    }

    // 1. Update Project Header
    const { data: projectData, error: projectError } = await supabase
      .from("portfolio_projects")
      .update({
        title: formData.title.trim(),
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

    // 2. Refresh Services
    await supabase.from("project_services").delete().eq("project_id", id);
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

    // 3. Refresh Deliverables
    await supabase.from("project_deliverables").delete().eq("project_id", id);
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

    // 4. Update Approach
    const hasApproach =
      formData.approach.pacing_and_structure ||
      formData.approach.b_roll_and_visuals ||
      formData.approach.sound_and_color ||
      formData.approach.retention_tactics;

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

    revalidateAllProjectPaths(cleanSlug);
    return { success: true, data: projectData as DbProject };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update project";
    return { success: false, error: message };
  }
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

    // 2. Delete project row (child rows will cascade delete)
    const { error } = await supabase
      .from("portfolio_projects")
      .delete()
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    // 3. Clean up storage files asynchronously where safe
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
    return { success: false, error: message };
  }
}

function revalidateAllProjectPaths(slug?: string) {
  try {
    revalidatePath("/");
    revalidatePath("/work");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    revalidatePath("/sitemap.xml");
    if (slug) {
      revalidatePath(`/work/${slug}`);
    }
  } catch (err) {
    console.warn("Revalidation warning:", err);
  }
}
