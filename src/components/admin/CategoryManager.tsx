"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DbCategory } from "@/lib/db/types";
import {
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
} from "@/lib/actions/categories";
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Layers,
  ArrowUpDown,
} from "lucide-react";

interface CategoryManagerProps {
  initialCategories: DbCategory[];
}

export default function CategoryManager({
  initialCategories,
}: CategoryManagerProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<DbCategory[]>(initialCategories);

  // New Category Form State
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newSortOrder, setNewSortOrder] = useState(categories.length + 1);

  // Editing State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editSortOrder, setEditSortOrder] = useState(0);

  // Action status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (val: string) => {
    setNewName(val);
    setNewSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    );
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await createCategoryAction({
        name: newName,
        slug: newSlug,
        description: newDescription,
        sort_order: Number(newSortOrder) || 0,
      });

      if (!res.success) {
        setError(res.error || "Failed to create category");
        setIsSubmitting(false);
        return;
      }

      setIsAdding(false);
      setNewName("");
      setNewSlug("");
      setNewDescription("");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error creating category");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartEdit = (category: DbCategory) => {
    setEditingId(category.id);
    setEditName(category.name);
    setEditSlug(category.slug);
    setEditDescription(category.description || "");
    setEditSortOrder(category.sort_order);
    setError(null);
  };

  const handleSaveEdit = async (id: string) => {
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await updateCategoryAction(id, {
        name: editName.trim(),
        slug: editSlug.trim().toLowerCase(),
        description: editDescription.trim() || null,
        sort_order: Number(editSortOrder) || 0,
      });

      if (!res.success) {
        setError(res.error || "Failed to update category");
        setIsSubmitting(false);
        return;
      }

      setEditingId(null);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error updating category");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (category: DbCategory) => {
    setError(null);
    try {
      const res = await updateCategoryAction(category.id, {
        active: !category.active,
      });
      if (!res.success) {
        setError(res.error || "Failed to update status");
        return;
      }
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error updating status");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) {
      return;
    }

    setError(null);
    try {
      const res = await deleteCategoryAction(id);
      if (!res.success) {
        setError(res.error || "Failed to delete category");
        return;
      }
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error deleting category");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-400">
          Categories dynamically power the filter tabs on Muhammad&apos;s public Selected Work page.
        </p>

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-zinc-950 font-bold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Category</span>
          </button>
        )}
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Add New Category Panel */}
      {isAdding && (
        <form
          onSubmit={handleCreate}
          className="p-6 rounded-3xl bg-[#0e0e14] border border-lime-400/30 shadow-xl space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <Layers className="w-4 h-4 text-lime-400" />
              <span>Create New Category</span>
            </h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="p-1 rounded-lg text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-zinc-300 mb-1 uppercase">
                Category Name *
              </label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. 3D & VFX"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-lime-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-300 mb-1 uppercase">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                placeholder="3d-vfx"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-lime-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-300 mb-1 uppercase">
                Sort Order (#)
              </label>
              <input
                type="number"
                value={newSortOrder}
                onChange={(e) => setNewSortOrder(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-lime-400"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-[10px] font-mono text-zinc-300 mb-1 uppercase">
                Description (Optional)
              </label>
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Brief category scope or description..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-lime-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-zinc-950 text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5 stroke-[3]" />}
              <span>Save Category</span>
            </button>
          </div>
        </form>
      )}

      {/* Categories Table */}
      <div className="rounded-3xl bg-[#0e0e14] border border-white/[0.08] p-4 sm:p-6 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/[0.06] text-zinc-400 font-mono">
                <th className="py-3 px-3">Category Name</th>
                <th className="py-3 px-3">Slug</th>
                <th className="py-3 px-3">Description</th>
                <th className="py-3 px-3">Order</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {initialCategories.map((cat) => {
                const isEditing = editingId === cat.id;

                if (isEditing) {
                  return (
                    <tr key={cat.id} className="bg-white/[0.04]">
                      <td className="py-3 px-3">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-white text-xs"
                        />
                      </td>
                      <td className="py-3 px-3">
                        <input
                          type="text"
                          value={editSlug}
                          onChange={(e) => setEditSlug(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-white text-xs font-mono"
                        />
                      </td>
                      <td className="py-3 px-3">
                        <input
                          type="text"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-white text-xs"
                        />
                      </td>
                      <td className="py-3 px-3">
                        <input
                          type="number"
                          value={editSortOrder}
                          onChange={(e) => setEditSortOrder(Number(e.target.value))}
                          className="w-16 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-white text-xs font-mono"
                        />
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[10px] font-mono text-zinc-400">Editing</span>
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleSaveEdit(cat.id)}
                            disabled={isSubmitting}
                            className="p-1.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-zinc-950 transition-colors"
                            title="Save"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr
                    key={cat.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="py-3.5 px-3 font-bold text-white">
                      {cat.name}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-zinc-400 text-[11px]">
                      {cat.slug}
                    </td>
                    <td className="py-3.5 px-3 text-zinc-400 max-w-xs truncate">
                      {cat.description || "—"}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-zinc-300 text-[11px]">
                      #{cat.sort_order}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(cat)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                          cat.active
                            ? "bg-lime-400/10 text-lime-400 border border-lime-400/20 hover:bg-lime-400/20"
                            : "bg-zinc-800 text-zinc-400 border border-white/10 hover:bg-zinc-700"
                        }`}
                        title="Click to toggle active status"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            cat.active ? "bg-lime-400" : "bg-zinc-500"
                          }`}
                        />
                        <span>{cat.active ? "Active" : "Disabled"}</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-3 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleStartEdit(cat)}
                          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-lime-300 border border-white/5 transition-colors cursor-pointer"
                          title="Edit Category"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id, cat.name)}
                          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-white/5 transition-colors cursor-pointer"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
