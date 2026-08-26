"use client";

import React, { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, Film, CheckCircle2, AlertCircle, X, Loader2, Play, RefreshCw } from "lucide-react";

interface VideoUploaderProps {
  currentUrl?: string | null;
  currentPath?: string | null;
  onUploadComplete: (url: string, path: string) => void;
  onRemove?: () => void;
  onUploadingStateChange?: (isUploading: boolean) => void;
}

export default function VideoUploader({
  currentUrl,
  currentPath,
  onUploadComplete,
  onRemove,
  onUploadingStateChange,
}: VideoUploaderProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(currentUrl || null);
  const [storagePath, setStoragePath] = useState<string | null>(currentPath || null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState<string>("Preparing video stream...");
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

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
    if (onUploadingStateChange) onUploadingStateChange(true);
    setProgress(10);
    setUploadStage("Preparing video file...");

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

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
        setUploadStage("Streaming video direct to storage...");
        for (let p = 20; p <= 90; p += 20) {
          if (abortController.signal.aborted) throw new Error("Upload cancelled");
          await new Promise((r) => setTimeout(r, 90));
          setProgress(p);
        }
        setUploadStage("Finalizing video asset...");
        await new Promise((r) => setTimeout(r, 60));
        setProgress(100);
        setVideoUrl(mockUrl);
        setStoragePath(filePath);
        onUploadComplete(mockUrl, filePath);
        setIsUploading(false);
        if (onUploadingStateChange) onUploadingStateChange(false);
        return;
      }

      // Direct Upload to Supabase Storage Bucket with Retry Resilience
      setUploadStage("Uploading video direct to Supabase Storage...");
      setProgress(35);

      let attempts = 0;
      let uploadSuccess = false;
      let uploadData: any = null;
      let lastError: any = null;

      while (attempts < 3 && !uploadSuccess) {
        attempts++;
        if (abortController.signal.aborted) throw new Error("Upload cancelled");

        try {
          const { data, error: uploadError } = await supabase.storage
            .from("portfolio-videos")
            .upload(filePath, file, {
              cacheControl: "3600",
              upsert: true,
            });

          if (uploadError) {
            lastError = uploadError;
            if (attempts < 3) {
              setUploadStage(`Network retry (${attempts}/3)...`);
              await new Promise((r) => setTimeout(r, 1000 * attempts));
            }
          } else {
            uploadSuccess = true;
            uploadData = data;
          }
        } catch (netErr) {
          lastError = netErr;
          if (attempts < 3) {
            setUploadStage(`Network retry (${attempts}/3)...`);
            await new Promise((r) => setTimeout(r, 1000 * attempts));
          }
        }
      }

      if (!uploadSuccess || !uploadData) {
        throw new Error(lastError?.message || "Upload failed after 3 retry attempts.");
      }

      setUploadStage("Retrieving public video stream URL...");
      setProgress(90);

      const { data: publicData } = supabase.storage
        .from("portfolio-videos")
        .getPublicUrl(uploadData.path);

      const finalUrl = publicData.publicUrl;
      setProgress(100);
      setVideoUrl(finalUrl);
      setStoragePath(uploadData.path);
      onUploadComplete(finalUrl, uploadData.path);
    } catch (err: unknown) {
      if (abortController.signal.aborted) {
        setError("Upload cancelled.");
      } else {
        console.error("Video upload error:", err);
        const msg = err instanceof Error ? err.message : "Upload failed. Check storage credentials.";
        setError(msg);
      }
    } finally {
      setIsUploading(false);
      abortControllerRef.current = null;
      if (onUploadingStateChange) onUploadingStateChange(false);
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
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
            <div className="space-y-4 max-w-xs w-full" aria-live="polite" aria-busy="true">
              <div className="w-12 h-12 rounded-full bg-lime-400/10 border border-lime-400/20 flex items-center justify-center mx-auto text-lime-400 animate-spin">
                <Loader2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-1">
                  {uploadStage}
                </p>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-lime-400 transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mt-2">
                  <span>{progress}%</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancel();
                    }}
                    className="text-red-400 hover:text-red-300 underline"
                  >
                    Cancel
                  </button>
                </div>
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
                  MP4 or WebM up to 500MB (Direct-to-storage stream with retry)
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
