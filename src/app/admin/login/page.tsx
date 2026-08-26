"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Lock, ArrowRight, AlertCircle, Loader2, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-zinc-500 font-mono text-xs">Loading admin...</div>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/admin";
  const errorParam = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    errorParam === "unauthorized"
      ? "This account is not authorized to access the admin portal."
      : null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const supabase = createClient();
      const isSupabaseConfigured =
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

      if (!isSupabaseConfigured) {
        // Mock login in development/preview
        await new Promise((r) => setTimeout(r, 600));
        router.push(redirectPath);
        router.refresh();
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        router.push(redirectPath);
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      setErrorMessage(msg);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#0e0e14] border border-white/[0.08] shadow-2xl space-y-6">
        {/* Header Icon */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto text-lime-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white font-display">
              Portfolio Admin Portal
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Authenticate with your authorized administrator credentials
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@muhammaddaniyal.com"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-lime-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-lime-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-xl bg-lime-400 hover:bg-lime-300 disabled:opacity-50 text-zinc-950 font-bold text-xs sm:text-sm transition-all duration-200 shadow-xl shadow-lime-400/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Security Note */}
        <div className="pt-4 border-t border-white/[0.06] text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
            <ShieldCheck className="w-3.5 h-3.5 text-lime-400/70" />
            <span>Direct Supabase Session Security Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
