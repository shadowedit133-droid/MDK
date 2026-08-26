import React from "react";
import Link from "next/link";
import { getAllAdminProjects } from "@/lib/db/projects";
import { getAllCategories } from "@/lib/db/categories";
import { Film, Star, ChevronLeft, ChevronRight } from "lucide-react";
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
    page?: string;
  }>;
}

export default async function AdminProjectsPage({
  searchParams,
}: AdminProjectsPageProps) {
  const params = await searchParams;
  const categories = await getAllCategories();
  const currentPage = Math.max(1, Number(params.page) || 1);

  const { data: projects, total, page, totalPages, pageSize } = await getAllAdminProjects({
    search: params.search,
    status: params.status,
    categoryId: params.category,
    featured: params.featured === "true" ? true : undefined,
    sort: params.sort,
    page: currentPage,
    pageSize: 15,
  });

  // Build pagination URLs helper
  const createPageUrl = (targetPage: number) => {
    const query = new URLSearchParams();
    if (params.search) query.set("search", params.search);
    if (params.status) query.set("status", params.status);
    if (params.category) query.set("category", params.category);
    if (params.featured) query.set("featured", params.featured);
    if (params.sort) query.set("sort", params.sort);
    query.set("page", String(targetPage));
    return `/admin/projects?${query.toString()}`;
  };

  const startRecord = (page - 1) * pageSize + 1;
  const endRecord = Math.min(page * pageSize, total);

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
          <span>
            {total > 0
              ? `Showing ${startRecord}–${endRecord} of ${total} project(s)`
              : "Showing 0 projects"}
          </span>
          {totalPages > 1 && (
            <span>
              Page {page} of {totalPages}
            </span>
          )}
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
                      {new Date(project.created_at).toLocaleDateString()}
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

        {/* Scalable Server Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
            <Link
              href={createPageUrl(page - 1)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border border-white/10 transition-colors ${
                page <= 1
                  ? "pointer-events-none opacity-40 text-zinc-500 bg-zinc-900/40"
                  : "text-zinc-300 hover:text-white hover:bg-white/5 bg-zinc-900"
              }`}
              aria-disabled={page <= 1}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </Link>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                // Show first, last, and pages close to current
                if (
                  p === 1 ||
                  p === totalPages ||
                  (p >= page - 1 && p <= page + 1)
                ) {
                  const isActive = p === page;
                  return (
                    <Link
                      key={p}
                      href={createPageUrl(p)}
                      className={`w-8 h-8 rounded-lg text-xs font-mono font-medium flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-lime-400 text-zinc-950 font-bold shadow-md shadow-lime-400/20"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {p}
                    </Link>
                  );
                }
                if (p === page - 2 || p === page + 2) {
                  return (
                    <span key={p} className="text-zinc-600 font-mono text-xs px-1">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <Link
              href={createPageUrl(page + 1)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border border-white/10 transition-colors ${
                page >= totalPages
                  ? "pointer-events-none opacity-40 text-zinc-500 bg-zinc-900/40"
                  : "text-zinc-300 hover:text-white hover:bg-white/5 bg-zinc-900"
              }`}
              aria-disabled={page >= totalPages}
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
