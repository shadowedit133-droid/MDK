"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteProjectAction } from "@/lib/actions/projects";
import { Edit, Trash2, ExternalLink, Loader2, AlertTriangle, X } from "lucide-react";

interface AdminProjectRowActionsProps {
  id: string;
  title: string;
  slug: string;
  status: string;
}

export default function AdminProjectRowActions({
  id,
  title,
  slug,
  status,
}: AdminProjectRowActionsProps) {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      const res = await deleteProjectAction(id);
      if (!res.success) {
        setError(res.error || "Failed to delete project");
        setIsDeleting(false);
        return;
      }
      setShowDeleteModal(false);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error deleting project");
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="inline-flex items-center gap-1.5">
        {status === "published" && (
          <Link
            href={`/work/${slug}`}
            target="_blank"
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5 transition-colors"
            title="View Public Page"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        )}

        <Link
          href={`/admin/projects/${id}/edit`}
          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-lime-300 border border-white/5 transition-colors"
          title="Edit Project"
        >
          <Edit className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 border border-white/5 transition-colors cursor-pointer"
          title="Delete Project"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#121218] border border-white/10 p-6 sm:p-8 rounded-3xl max-w-md w-full shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-2 rounded-full text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white font-display">
                Delete Project?
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Are you sure you want to delete <span className="text-white font-bold">&ldquo;{title}&rdquo;</span>? This will permanently delete the project record and associated video/thumbnail assets from storage.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {error}
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold transition-colors border border-white/10"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Confirm Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
