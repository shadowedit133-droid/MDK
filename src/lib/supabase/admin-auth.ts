import { createClient } from "@/lib/supabase/server";

export interface AdminAuthResult {
  isAuthenticated: boolean;
  userId?: string;
  email?: string;
  error?: string;
}

export async function verifyAdminAuth(): Promise<AdminAuthResult> {
  const isSupabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

  // In unconfigured demo mode, allow mock access for preview
  if (!isSupabaseConfigured) {
    return {
      isAuthenticated: true,
      userId: "demo-admin",
      email: "demo-admin@muhammaddaniyal.com",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      isAuthenticated: false,
      error: error?.message || "Not authenticated",
    };
  }

  // Check trusted app_metadata role (cannot be modified by client)
  const appRole = user.app_metadata?.role;
  if (appRole !== "admin") {
    return {
      isAuthenticated: false,
      error: "Forbidden: Admin privileges required in app_metadata",
    };
  }

  const adminEmails = process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase())
    : [];

  if (adminEmails.length > 0 && user.email) {
    const isAllowed = adminEmails.includes(user.email.toLowerCase());
    if (!isAllowed) {
      return {
        isAuthenticated: false,
        error: "Unauthorized email address",
      };
    }
  }

  return {
    isAuthenticated: true,
    userId: user.id,
    email: user.email,
  };
}
