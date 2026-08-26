"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  DbCategory,
  FullProjectWithRelations,
  ProjectFormData,
  ProjectStatus,
} from "@/lib/db/types";
import { createProjectAction, updateProjectAction } from "@/lib/actions/projects";
import VideoUploader from "./VideoUploader";
import ImageUploader from "./ImageUploader";
import {
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Plus,
  Trash2,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface ProjectFormProps {
  initialData?: FullProjectWithRelations | null;
  categories: DbCategory[];
  isEditing?: boolean;
}

const COMMON_SERVICES = [
  "Footage Curation",
  "Pacing & Story Arc",
  "Motion Graphics",
  "Sound Design",
  "Color Correction & Grading",
  "Dynamic Subtitles",
  "B-Roll Integration",
  "Archival 2.5D Animation",
  "Rhythm & Beat-Locked Editing",
  "Monetization-Safe Assembly",
];

export default function ProjectForm({
  initialData,
  categories,
  isEditing = false,
}: ProjectFormProps) {
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [shortDescription, setShortDescription] = useState(
    initialData?.short_description || ""
  );
  const [overview, setOverview] = useState(initialData?.overview || "");
  const [categoryId, setCategoryId] = useState(
    initialData?.category_id || (categories[0]?.id ?? "")
  );
  const [videoUrl, setVideoUrl] = useState(initialData?.video_url || "");
  const [videoStoragePath, setVideoStoragePath] = useState(
    initialData?.video_storage_path || ""
  );
  const [thumbnailUrl, setThumbnailUrl] = useState(
    initialData?.thumbnail_url || ""
  );
  const [thumbnailStoragePath, setThumbnailStoragePath] = useState(
    initialData?.thumbnail_storage_path || ""
  );
  const [duration, setDuration] = useState(initialData?.duration || "");
  const [editingStyle, setEditingStyle] = useState(
    initialData?.editing_style || ""
  );
  const [status, setStatus] = useState<ProjectStatus>(
    initialData?.status || "draft"
  );
  const [featured, setFeatured] = useState(initialData?.featured ?? false);
  const [sortOrder, setSortOrder] = useState(initialData?.sort_order ?? 0);

  // Case Study State
  const [challenge, setChallenge] = useState(initialData?.challenge || "");
  const [pacingAndStructure, setPacingAndStructure] = useState(
    initialData?.approach?.pacing_and_structure || ""
  );
  const [bRollAndVisuals, setBRollAndVisuals] = useState(
    initialData?.approach?.b_roll_and_visuals || ""
  );
  const [soundAndColor, setSoundAndColor] = useState(
    initialData?.approach?.sound_and_color || ""
  );
  const [retentionTactics, setRetentionTactics] = useState(
    initialData?.approach?.retention_tactics || ""
  );
  const [resultSummary, setResultSummary] = useState(
    initialData?.result_summary || ""
  );

  // Services State
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialData?.services.map((s) => s.name) || [
      "Footage Curation",
      "Motion Graphics",
      "Sound Design",
    ]
  );
  const [customServiceInput, setCustomServiceInput] = useState("");

  // Deliverables State
  const [deliverables, setDeliverables] = useState<string[]>(
    initialData?.deliverables.map((d) => d.item) || [
      "Full Master Video Edit",
      "Sound Design & Audio Mix",
      "Color Correction & Grading",
    ]
  );
  const [newDeliverableInput, setNewDeliverableInput] = useState("");

  // Action status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Auto-generate slug from title if new
  useEffect(() => {
    if (!isEditing && title) {
      const generated = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generated);
    }
  }, [title, isEditing]);

  const handleToggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const handleAddCustomService = () => {
    if (customServiceInput.trim() && !selectedServices.includes(customServiceInput.trim())) {
      setSelectedServices((prev) => [...prev, customServiceInput.trim()]);
      setCustomServiceInput("");
    }
  };

  const handleAddDeliverable = () => {
    if (newDeliverableInput.trim()) {
      setDeliverables((prev) => [...prev, newDeliverableInput.trim()]);
      setNewDeliverableInput("");
    }
  };

  const handleRemoveDeliverable = (index: number) => {
    setDeliverables((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!title.trim()) {
      setError("Project title is required.");
      setIsSubmitting(false);
      return;
    }

    if (!slug.trim()) {
      setError("Project slug is required.");
      setIsSubmitting(false);
      return;
    }

    const payload: ProjectFormData = {
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      short_description: shortDescription.trim(),
      overview: overview.trim(),
      category_id: categoryId,
      video_url: videoUrl,
      video_storage_path: videoStoragePath,
      thumbnail_url: thumbnailUrl,
      thumbnail_storage_path: thumbnailStoragePath,
      duration: duration.trim(),
      editing_style: editingStyle.trim(),
      challenge: challenge.trim(),
      result_summary: resultSummary.trim(),
      status,
      featured,
      sort_order: Number(sortOrder) || 0,
      services: selectedServices,
      deliverables: deliverables.filter((d) => d.trim().length > 0),
      approach: {
        pacing_and_structure: pacingAndStructure.trim(),
        b_roll_and_visuals: bRollAndVisuals.trim(),
        sound_and_color: soundAndColor.trim(),
        retention_tactics: retentionTactics.trim(),
      },
    };

    try {
      let res;
      if (isEditing && initialData?.id) {
        res = await updateProjectAction(initialData.id, payload);
      } else {
        res = await createProjectAction(payload);
      }

      if (!res.success) {
        setError(res.error || "Failed to save project.");
        setIsSubmitting(false);
        return;
      }

      setSuccess(true);
      router.push("/admin/projects");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {/* Top Back & Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 disabled:opacity-50 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-lime-400/20 flex items-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Project...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEditing ? "Update Project" : "Create Project"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 1. BASIC INFORMATION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0e14] border border-white/[0.08] space-y-5 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono text-lime-400 uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-lime-400" />
          <span>01. Basic Information</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="sm:col-span-2">
            <label className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Faceless Finance & Wealth Breakdown"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-lime-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase">
              Slug (URL Identifier) *
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="faceless-finance-breakdown"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-lime-400 transition-colors"
            />
            <span className="text-[10px] font-mono text-zinc-400 mt-1 block">
              Public Route: /work/{slug || "slug-preview"}
            </span>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase">
              Primary Category *
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-lime-400 transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase">
              Short Description (Card Summary)
            </label>
            <textarea
              rows={2}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Brief summary displayed on project cards across the website..."
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-lime-400 transition-colors resize-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase">
              Full Overview / Objective
            </label>
            <textarea
              rows={3}
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              placeholder="Detailed description of the project brief, client goals, and creative scope..."
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-lime-400 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 2. MEDIA UPLOAD (DIRECT-TO-STORAGE) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0e14] border border-white/[0.08] space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono text-lime-400 uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-lime-400" />
          <span>02. Video & Poster Thumbnail Media</span>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-2 uppercase">
              Portfolio Video File (Direct to Storage)
            </label>
            <VideoUploader
              currentUrl={videoUrl}
              currentPath={videoStoragePath}
              onUploadComplete={(url, path) => {
                setVideoUrl(url);
                setVideoStoragePath(path);
              }}
              onRemove={() => {
                setVideoUrl("");
                setVideoStoragePath("");
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-2 uppercase">
              Poster Thumbnail (Card Preview & OpenGraph)
            </label>
            <ImageUploader
              currentUrl={thumbnailUrl}
              currentPath={thumbnailStoragePath}
              onUploadComplete={(url, path) => {
                setThumbnailUrl(url);
                setThumbnailStoragePath(path);
              }}
              onRemove={() => {
                setThumbnailUrl("");
                setThumbnailStoragePath("");
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. PROJECT METRICS & SERVICES */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0e14] border border-white/[0.08] space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono text-lime-400 uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-lime-400" />
          <span>03. Specifications & Services Performed</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase">
              Video Duration (Optional)
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 11:45 or 0:52"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-lime-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase">
              Editing Style (Optional)
            </label>
            <input
              type="text"
              value={editingStyle}
              onChange={(e) => setEditingStyle(e.target.value)}
              placeholder="e.g. High-Retention Visual Storytelling"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-lime-400 transition-colors"
            />
          </div>
        </div>

        {/* Services Selectable Chips */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-mono text-zinc-300 uppercase">
            Services Performed (Click to toggle)
          </label>
          <div className="flex flex-wrap gap-2">
            {COMMON_SERVICES.map((srv) => {
              const isSelected = selectedServices.includes(srv);
              return (
                <button
                  key={srv}
                  type="button"
                  onClick={() => handleToggleService(srv)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    isSelected
                      ? "bg-lime-400 text-zinc-950 font-bold shadow-md shadow-lime-400/20"
                      : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
                  }`}
                >
                  {srv}
                </button>
              );
            })}
          </div>

          {/* Add custom service */}
          <div className="flex gap-2 pt-2">
            <input
              type="text"
              value={customServiceInput}
              onChange={(e) => setCustomServiceInput(e.target.value)}
              placeholder="Add custom service tag..."
              className="flex-grow px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-lime-400"
            />
            <button
              type="button"
              onClick={handleAddCustomService}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white transition-colors cursor-pointer"
            >
              Add Tag
            </button>
          </div>
        </div>
      </div>

      {/* 4. CASE STUDY DEEP DIVE (OPTIONAL) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0e14] border border-white/[0.08] space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono text-lime-400 uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-lime-400" />
          <span>04. Case Study Details (Optional)</span>
        </div>
        <p className="text-xs text-zinc-400">
          Empty case-study fields will be automatically hidden on the public page without leaving empty layout blocks.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase">
              The Creative Challenge
            </label>
            <textarea
              rows={3}
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              placeholder="What obstacle or specific goal was addressed in this edit?"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-lime-400 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase">
                Pacing & Structure Approach
              </label>
              <textarea
                rows={3}
                value={pacingAndStructure}
                onChange={(e) => setPacingAndStructure(e.target.value)}
                placeholder="Rhythm, pauses, hook timing..."
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-lime-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase">
                B-Roll & Visual Flow
              </label>
              <textarea
                rows={3}
                value={bRollAndVisuals}
                onChange={(e) => setBRollAndVisuals(e.target.value)}
                placeholder="Stock curation, typography overlays, motion graphics..."
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-lime-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase">
                Sound Design & Color Science
              </label>
              <textarea
                rows={3}
                value={soundAndColor}
                onChange={(e) => setSoundAndColor(e.target.value)}
                placeholder="SFX layering, dialogue leveling, color grade..."
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-lime-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase">
                Audience Retention Tactics
              </label>
              <textarea
                rows={3}
                value={retentionTactics}
                onChange={(e) => setRetentionTactics(e.target.value)}
                placeholder="Pattern interrupts, open loops, zoom accents..."
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-lime-400 transition-colors"
              />
            </div>
          </div>

          {/* Repeatable Deliverables List */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-mono text-zinc-300 uppercase">
              Project Deliverables List
            </label>
            <div className="space-y-2">
              {deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 shrink-0" />
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const updated = [...deliverables];
                      updated[idx] = e.target.value;
                      setDeliverables(updated);
                    }}
                    className="flex-grow px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-lime-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveDeliverable(idx)}
                    className="p-2 rounded-lg bg-zinc-900 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-white/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newDeliverableInput}
                onChange={(e) => setNewDeliverableInput(e.target.value)}
                placeholder="Add another deliverable item..."
                className="flex-grow px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-lime-400"
              />
              <button
                type="button"
                onClick={handleAddDeliverable}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase">
              Final Result & Impact Summary (Truthful/Neutral)
            </label>
            <textarea
              rows={2}
              value={resultSummary}
              onChange={(e) => setResultSummary(e.target.value)}
              placeholder="e.g. Delivered full timeline edit, optimized 9:16 cutdowns, and clean master exports..."
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-lime-400 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 5. PUBLISHING CONTROLS & VISIBILITY */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0e14] border border-white/[0.08] space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono text-lime-400 uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-lime-400" />
          <span>05. Publishing & Placement</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase">
              Status *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-sm font-bold focus:outline-none focus:border-lime-400 transition-colors"
            >
              <option value="draft">Draft (Private / Hidden)</option>
              <option value="published">Published (Public)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase">
              Feature on Homepage?
            </label>
            <select
              value={featured ? "true" : "false"}
              onChange={(e) => setFeatured(e.target.value === "true")}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-lime-400 transition-colors"
            >
              <option value="false">No — Standard Catalog Only</option>
              <option value="true">Yes — Show on Homepage</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase">
              Sort Order (#)
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-lime-400 transition-colors"
            />
            <span className="text-[10px] font-mono text-zinc-400 mt-1 block">
              Lower numbers appear first
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action Row */}
      <div className="flex items-center justify-end gap-4 pt-4 pb-12">
        <Link
          href="/admin/projects"
          className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold transition-colors border border-white/10"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3.5 rounded-xl bg-lime-400 hover:bg-lime-300 disabled:opacity-50 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-xl shadow-lime-400/20 flex items-center gap-2 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{isEditing ? "Save & Update Project" : "Publish / Save Project"}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
