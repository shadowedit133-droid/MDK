import React from "react";
import Link from "next/link";
import { getAllAdminProjects } from "@/lib/db/projects";
import { getAllCategories } from "@/lib/db/categories";
import { Plus, Film, Star, ExternalLink, Search, Filter } from "lucide-react";
import AdminProjectRowActions from "@/components/admin/AdminProjectRowActions";
import AdminProjectsFilterBar from "@/components/admin/AdminProjectsFilterBar";
import AdminNavButton from "@/components/admin/AdminNavButton";

interface AdminProjectsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    category?: string;
    featured?: string;
    sort?: string;
  }>;
}

export default async function AdminProjectsPage({
  searchParams,
}: AdminProjectsPageProps) {
  const params = await searchParams;
  const categories = await getAllCategories();

  const projects = await getAllAdminProjects({
    search: params.search,
    status: params.status,
    categoryId: params.category,
    featured: params.featured === "true" ? true : undefined,
    sort: params.sort,
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Portfolio Projects
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Browse, filter, edit, and organize all video projects in your portfolio catalog.
          </p>
        </div>

        <AdminNavButton
          href="/admin/projects/new"
          iconType="plus"
          pendingText="Opening Form..."
          className="w-fit"
        >
          New Project
        </AdminNavButton>
      </div>

      {/* Filter and Search Bar */}
      <AdminProjectsFilterBar categories={categories} />

      {/* Projects Table / Card Grid */}
      <div className="rounded-3xl bg-[#0e0e14] border border-white/[0.08] p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between px-2 text-xs font-mono text-zinc-400">
          <span>Showing {projects.length} project(s)</span>
        </div>

        {projects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06] text-zinc-400 font-mono">
                  <th className="py-3 px-3">Project Title & Slug</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Duration</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Featured</th>
                  <th className="py-3 px-3">Sort Order</th>
                  <th className="py-3 px-3">Updated</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-9 rounded-lg bg-zinc-900 border border-white/10 overflow-hidden shrink-0 relative">
                          {project.thumbnail_url ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={project.thumbnail_url}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-600">
                              <Film className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/admin/projects/${project.id}/edit`}
                            className="font-bold text-white hover:text-lime-300 transition-colors line-clamp-1"
                          >
                            {project.title}
                          </Link>
                          <span className="text-[10px] font-mono text-zinc-400 block truncate">
                            /{project.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full bg-zinc-900 border border-white/5 text-[10px] font-mono text-zinc-300">
                        {project.category?.name || "Uncategorized"}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap font-mono text-[10px] text-zinc-400">
                      {project.duration || "—"}
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium ${
                          project.status === "published"
                            ? "bg-lime-400/10 text-lime-400 border border-lime-400/20"
                            : "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            project.status === "published"
                              ? "bg-lime-400"
                              : "bg-amber-400"
                          }`}
                        />
                        <span className="capitalize">{project.status}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap">
                      {project.featured ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">
                          <Star className="w-3 h-3 fill-current" />
                          <span>Home</span>
                        </span>
                      ) : (
                        <span className="text-zinc-600 font-mono text-[10px]">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap font-mono text-zinc-400 text-xs">
                      #{project.sort_order}
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap font-mono text-zinc-400 text-[10px]">
                      {new Date(project.updated_at).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-3 text-right whitespace-nowrap">
                      <AdminProjectRowActions
                        id={project.id}
                        title={project.title}
                        slug={project.slug}
                        status={project.status}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 sm:p-12 text-center space-y-3">
            <p className="text-sm font-bold text-white">No matching projects found</p>
            <p className="text-xs text-zinc-400">
              Try adjusting your search criteria or add a new project.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
