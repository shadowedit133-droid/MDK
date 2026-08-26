"use client";

import React, { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, Film, CheckCircle2, AlertCircle, X, Loader2, Play } from "lucide-react";

interface VideoUploaderProps {
  currentUrl?: string | null;
  currentPath?: string | null;
  onUploadComplete: (url: string, path: string) => void;
  onRemove?: () => void;
}

export default function VideoUploader({
  currentUrl,
  currentPath,
  onUploadComplete,
  onRemove,
}: VideoUploaderProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(currentUrl || null);
  const [storagePath, setStoragePath] = useState<string | null>(currentPath || null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);

    // 1. Validate File Type
    const validTypes = ["video/mp4", "video/webm", "video/quicktime"];
    if (!validTypes.includes(file.type)) {
      setError("Invalid file format. Please upload MP4 or WebM video.");
      return;
    }

    // 2. Validate Size (max 500MB)
    const maxSize = 500 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File exceeds maximum allowed size (500MB).");
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
      const cleanName = sanitizedBase || `video_${Date.now()}.mp4`;
      const filePath = `uploads/${Date.now()}_${Math.random().toString(36).substring(2, 8)}_${cleanName}`;

      if (!isSupabaseConfigured) {
        // Local mock blob preview
        const mockUrl = URL.createObjectURL(file);
        for (let p = 20; p <= 100; p += 20) {
          await new Promise((r) => setTimeout(r, 100));
          setProgress(p);
        }
        setVideoUrl(mockUrl);
        setStoragePath(filePath);
        onUploadComplete(mockUrl, filePath);
        setIsUploading(false);
        return;
      }

      // Direct Upload to Supabase Storage Bucket
      const { data, error: uploadError } = await supabase.storage
        .from("portfolio-videos")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      setProgress(90);

      const { data: publicData } = supabase.storage
        .from("portfolio-videos")
        .getPublicUrl(data.path);

      const finalUrl = publicData.publicUrl;
      setProgress(100);
      setVideoUrl(finalUrl);
      setStoragePath(data.path);
      onUploadComplete(finalUrl, data.path);
    } catch (err: unknown) {
      console.error("Video upload error:", err);
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
    setVideoUrl(null);
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
        accept="video/mp4,video/webm,video/quicktime"
        className="hidden"
        onChange={handleChange}
      />

      {videoUrl ? (
        <div className="relative rounded-2xl overflow-hidden bg-black border border-white/10 aspect-video shadow-xl group">
          <video
            src={videoUrl}
            controls
            playsInline
            className="w-full h-full object-cover"
          />

          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-black/80 hover:bg-zinc-800 text-xs font-mono text-zinc-200 border border-white/10 transition-colors"
            >
              Replace Video
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 transition-colors"
              aria-label="Remove video"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono text-lime-400 flex items-center gap-1.5 pointer-events-none">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Video Ready for Deployment</span>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`p-8 sm:p-12 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
            dragActive
              ? "border-lime-400 bg-lime-400/[0.04]"
              : "border-white/10 hover:border-white/20 bg-[#0e0e14]"
          }`}
        >
          {isUploading ? (
            <div className="space-y-4 max-w-xs w-full">
              <div className="w-12 h-12 rounded-full bg-lime-400/10 border border-lime-400/20 flex items-center justify-center mx-auto text-lime-400 animate-spin">
                <Loader2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-1">
                  Uploading Direct to Storage...
                </p>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-lime-400 transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs font-mono text-zinc-400 mt-2">{progress}%</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto text-zinc-400">
                <Film className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Drag and drop portfolio video, or{" "}
                  <span className="text-lime-400 underline decoration-lime-400/40 underline-offset-4">
                    browse files
                  </span>
                </p>
                <p className="text-xs text-zinc-400 font-mono mt-1">
                  MP4 or WebM up to 500MB (Direct-to-storage stream)
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
