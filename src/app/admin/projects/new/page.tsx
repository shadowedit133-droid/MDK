import React from "react";
import { getAllCategories } from "@/lib/db/categories";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function NewProjectPage() {
  const categories = await getAllCategories();

  return (
    <div className="space-y-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
          Create New Portfolio Project
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Upload video files, thumbnail posters, specify deliverables, and publish to the public portfolio.
        </p>
      </div>

      <ProjectForm categories={categories} />
    </div>
  );
}
