import React from "react";
import { notFound } from "next/navigation";
import { getAdminProjectById } from "@/lib/db/projects";
import { getAllCategories } from "@/lib/db/categories";
import ProjectForm from "@/components/admin/ProjectForm";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;
  const [project, categories] = await Promise.all([
    getAdminProjectById(id),
    getAllCategories(),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
          Edit Portfolio Project
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Modify video metadata, replace media files, or adjust publishing and featured status.
        </p>
      </div>

      <ProjectForm
        initialData={project}
        categories={categories}
        isEditing={true}
      />
    </div>
  );
}
