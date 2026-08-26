import React from "react";
import Link from "next/link";
import { getDashboardStats } from "@/lib/db/projects";
import {
  Film,
  CheckCircle2,
  FileEdit,
  Star,
  Layers,
  Plus,
  ArrowUpRight,
  Clock,
  ExternalLink,
} from "lucide-react";
import AdminProjectRowActions from "@/components/admin/AdminProjectRowActions";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Portfolio Management Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage your video portfolio, case studies, and categories across Muhammad&apos;s site.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="px-5 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-lime-400/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Project</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 sm:gap-4">
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0e0e14] border border-white/[0.08] space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[10px] sm:text-xs font-mono">Total Projects</span>
            <Film className="w-4 h-4 text-zinc-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {stats.totalProjects}
          </p>
          <p className="text-[10px] text-zinc-500 font-mono">All Records</p>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-[#0e0e14] border border-white/[0.08] space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[10px] sm:text-xs font-mono">Published</span>
            <CheckCircle2 className="w-4 h-4 text-lime-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-lime-400 font-display">
            {stats.publishedCount}
          </p>
          <p className="text-[10px] text-zinc-500 font-mono">Live on Website</p>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-[#0e0e14] border border-white/[0.08] space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[10px] sm:text-xs font-mono">Drafts</span>
            <FileEdit className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display">
            {stats.draftCount}
          </p>
          <p className="text-[10px] text-zinc-500 font-mono">Hidden Privately</p>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-[#0e0e14] border border-white/[0.08] space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[10px] sm:text-xs font-mono">Featured</span>
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-yellow-400 font-display">
            {stats.featuredCount}
          </p>
          <p className="text-[10px] text-zinc-500 font-mono">Homepage Showcased</p>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-[#0e0e14] border border-white/[0.08] space-y-1 sm:space-y-2 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[10px] sm:text-xs font-mono">Categories</span>
            <Layers className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-display">
            {stats.categoriesCount}
          </p>
          <p className="text-[10px] text-zinc-500 font-mono">Active Formats</p>
        </div>
      </div>

      {/* Recent Projects Table Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0e14] border border-white/[0.08] space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              Recent Portfolio Projects
            </h2>
            <p className="text-xs text-zinc-400">
              Latest projects added to the portfolio management system
            </p>
          </div>

          <Link
            href="/admin/projects"
            className="text-xs font-bold text-lime-400 hover:text-lime-300 flex items-center gap-1 transition-colors"
          >
            <span>View All ({stats.totalProjects})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {stats.recentProjects.length > 0 ? (
          <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06] text-zinc-400 font-mono">
                  <th className="py-3 px-3">Project</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Featured</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {stats.recentProjects.map((project: any) => (
                  <tr
                    key={project.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 rounded-lg bg-zinc-900 border border-white/10 overflow-hidden shrink-0 relative">
                          {project.thumbnail_url ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={project.thumbnail_url}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-600">
                              <Film className="w-3.5 h-3.5" />
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
          <div className="p-8 sm:p-12 rounded-2xl bg-zinc-900/30 border border-white/[0.04] text-center space-y-4">
            <Film className="w-8 h-8 text-zinc-600 mx-auto" />
            <div>
              <p className="text-sm font-bold text-white">No projects found yet</p>
              <p className="text-xs text-zinc-400 mt-1">
                Upload your first video edit to start showcasing your work.
              </p>
            </div>
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lime-400 text-zinc-950 text-xs font-bold shadow-md hover:bg-lime-300 transition-colors"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add First Project</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
