"use server";

import { createClient } from "@/lib/supabase/server";
import { DbCategory } from "@/lib/db/types";
import { revalidatePath } from "next/cache";
import { verifyAdminAuth } from "@/lib/supabase/admin-auth";
import { DEFAULT_SEED_CATEGORIES } from "@/lib/db/categories";

function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
  );
}

export async function createCategoryAction(formData: {
  name: string;
  slug: string;
  description?: string;
  sort_order?: number;
  active?: boolean;
}): Promise<{ success: boolean; data?: DbCategory; error?: string }> {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthenticated) {
    return { success: false, error: auth.error || "Unauthorized" };
  }

  const cleanSlug = formData.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-");

  if (!isSupabaseConfigured()) {
    const newCategory: DbCategory = {
      id: "cat-" + Date.now(),
      name: formData.name.trim(),
      slug: cleanSlug,
      description: formData.description || null,
      active: formData.active ?? true,
      sort_order: formData.sort_order ?? 10,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    revalidatePath("/admin/categories");
    revalidatePath("/work");
    return { success: true, data: newCategory };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("portfolio_categories")
      .insert({
        name: formData.name.trim(),
        slug: cleanSlug,
        description: formData.description || null,
        sort_order: formData.sort_order ?? 0,
        active: formData.active ?? true,
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/categories");
    revalidatePath("/work");
    revalidatePath("/");
    return { success: true, data: data as DbCategory };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create category";
    return { success: false, error: message };
  }
}

export async function updateCategoryAction(
  id: string,
  formData: Partial<DbCategory>
): Promise<{ success: boolean; data?: DbCategory; error?: string }> {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthenticated) {
    return { success: false, error: auth.error || "Unauthorized" };
  }

  if (!isSupabaseConfigured()) {
    revalidatePath("/admin/categories");
    revalidatePath("/work");
    return { success: true };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("portfolio_categories")
      .update(formData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/categories");
    revalidatePath("/work");
    revalidatePath("/");
    return { success: true, data: data as DbCategory };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update category";
    return { success: false, error: message };
  }
}

export async function deleteCategoryAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthenticated) {
    return { success: false, error: auth.error || "Unauthorized" };
  }

  if (!isSupabaseConfigured()) {
    revalidatePath("/admin/categories");
    revalidatePath("/work");
    return { success: true };
  }

  try {
    const supabase = await createClient();
    
    // Check if any project is currently using this category
    const { count, error: countError } = await supabase
      .from("portfolio_projects")
      .select("*", { count: "exact", head: true })
      .eq("category_id", id);

    if (countError) {
      return { success: false, error: countError.message };
    }

    if (count && count > 0) {
      return {
        success: false,
        error: `Cannot delete category: ${count} project(s) are currently assigned to it. Reassign or delete those projects first.`,
      };
    }

    const { error } = await supabase.from("portfolio_categories").delete().eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/categories");
    revalidatePath("/work");
    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete category";
    return { success: false, error: message };
  }
}
