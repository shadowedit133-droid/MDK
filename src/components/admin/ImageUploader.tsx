"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Upload, ImageIcon, CheckCircle2, AlertCircle, X, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  currentUrl?: string | null;
  currentPath?: string | null;
  onUploadComplete: (url: string, path: string) => void;
  onRemove?: () => void;
}

export default function ImageUploader({
  currentUrl,
  currentPath,
  onUploadComplete,
  onRemove,
}: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(currentUrl || null);
  const [storagePath, setStoragePath] = useState<string | null>(currentPath || null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);

    // 1. Validate File Type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Invalid image format. Please upload JPG, PNG, or WebP.");
      return;
    }

    // 2. Validate Size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("Image file exceeds maximum allowed size (10MB).");
      return;
    }

    setIsUploading(true);
    setProgress(10);

    try {
      const supabase = createClient();
      const isSupabaseConfigured =
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

      const sanitizedBase = file.name
        .replace(/^[.\s]+/, "")
        .replace(/[^a-zA-Z0-9.-]/g, "_");
      const cleanName = sanitizedBase || `thumb_${Date.now()}.jpg`;
      const filePath = `thumbnails/${Date.now()}_${Math.random().toString(36).substring(2, 8)}_${cleanName}`;

      if (!isSupabaseConfigured) {
        // Local mock blob preview
        const mockUrl = URL.createObjectURL(file);
        for (let p = 20; p <= 100; p += 20) {
          await new Promise((r) => setTimeout(r, 80));
          setProgress(p);
        }
        setImageUrl(mockUrl);
        setStoragePath(filePath);
        onUploadComplete(mockUrl, filePath);
        setIsUploading(false);
        return;
      }

      // Direct Upload to Supabase Storage Bucket
      const { data, error: uploadError } = await supabase.storage
        .from("portfolio-thumbnails")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      setProgress(90);

      const { data: publicData } = supabase.storage
        .from("portfolio-thumbnails")
        .getPublicUrl(data.path);

      const finalUrl = publicData.publicUrl;
      setProgress(100);
      setImageUrl(finalUrl);
      setStoragePath(data.path);
      onUploadComplete(finalUrl, data.path);
    } catch (err: unknown) {
      console.error("Image upload error:", err);
      const msg = err instanceof Error ? err.message : "Upload failed. Check storage credentials.";
      setError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setImageUrl(null);
    setStoragePath(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (onRemove) onRemove();
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleChange}
      />

      {imageUrl ? (
        <div className="relative rounded-2xl overflow-hidden bg-black border border-white/10 aspect-video shadow-xl group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Project thumbnail poster"
            className="w-full h-full object-cover"
          />

          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-black/80 hover:bg-zinc-800 text-xs font-mono text-zinc-200 border border-white/10 transition-colors"
            >
              Replace Image
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 transition-colors"
              aria-label="Remove thumbnail"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono text-lime-400 flex items-center gap-1.5 pointer-events-none">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Poster Thumbnail Active</span>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`p-6 sm:p-10 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
            dragActive
              ? "border-lime-400 bg-lime-400/[0.04]"
              : "border-white/10 hover:border-white/20 bg-[#0e0e14]"
          }`}
        >
          {isUploading ? (
            <div className="space-y-4 max-w-xs w-full">
              <div className="w-10 h-10 rounded-full bg-lime-400/10 border border-lime-400/20 flex items-center justify-center mx-auto text-lime-400 animate-spin">
                <Loader2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white mb-1">
                  Uploading Poster Thumbnail...
                </p>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-lime-400 transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-[10px] font-mono text-zinc-400 mt-2">{progress}%</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto text-zinc-400">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  Drop thumbnail or{" "}
                  <span className="text-lime-400 underline decoration-lime-400/40 underline-offset-4">
                    browse
                  </span>
                </p>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                  16:9 Recommended (JPG, PNG, WebP up to 10MB)
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
