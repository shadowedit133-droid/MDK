import React from "react";
import { getAllCategories } from "@/lib/db/categories";
import CategoryManager from "@/components/admin/CategoryManager";

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="pb-6 border-b border-white/[0.08]">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          Portfolio Categories
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Create, edit, organize, and activate the editing formats available on your portfolio.
        </p>
      </div>

      <CategoryManager initialCategories={categories} />
    </div>
  );
}
