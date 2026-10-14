"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Video,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Play,
  X,
  FileVideo,
  ExternalLink,
  Edit2,
} from "lucide-react";

interface BunnyVideoUploaderProps {
  videoId?: string;
  onVideoUploaded: (videoId: string, libraryId?: string) => void;
  lectureTitle?: string;
  courseTitle?: string;
  className?: string;
}

export const BunnyVideoUploader: React.FC<BunnyVideoUploaderProps> = ({
  videoId,
  onVideoUploaded,
  lectureTitle = "Lesson Video",
  className = "",
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{
    videoId: string;
    libraryId?: string;
    isDemo?: boolean;
    message?: string;
  } | null>(null);

  const [isManualMode, setIsManualMode] = useState(!videoId);
  const [manualInput, setManualInput] = useState(videoId || "");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [bunnyConfig, setBunnyConfig] = useState<{
    configured: boolean;
    libraryId?: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check Bunny configuration status on mount
  useEffect(() => {
    fetch("/api/bunny/config")
      .then((res) => res.json())
      .then((data) => {
        setBunnyConfig({
          configured: Boolean(data.configured),
          libraryId: data.libraryId,
        });
      })
      .catch(() => {
        // Silently handle
      });
  }, []);

  // Synchronize manual input with external videoId prop
  useEffect(() => {
    if (videoId) {
      setManualInput(videoId);
    }
  }, [videoId]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setErrorMessage(null);
      setSuccessInfo(null);
    }
  };

  const handleStartUpload = () => {
    if (!selectedFile) {
      setErrorMessage("Please select a video file first.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus("Starting upload to Bunny Stream...");
    setErrorMessage(null);
    setSuccessInfo(null);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", lectureTitle || selectedFile.name);

    // If admin has Bunny settings in session/local storage, include them
    try {
      const localSettings = localStorage.getItem("ili_admin_settings");
      if (localSettings) {
        const parsed = JSON.parse(localSettings);
        if (parsed.bunnyLibraryId) formData.append("libraryId", parsed.bunnyLibraryId);
        if (parsed.bunnyApiKey) formData.append("apiKey", parsed.bunnyApiKey);
      }
    } catch {
      // Local storage read failed, default to backend environment
    }

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 95); // Reserve 5% for server processing
        setUploadProgress(percent);
        setUploadStatus(`Uploading to Bunny Stream: ${percent}%`);
      }
    };

    xhr.onload = () => {
      setIsUploading(false);
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && data.success) {
          setUploadProgress(100);
          setUploadStatus("Upload completed successfully!");
          setSuccessInfo({
            videoId: data.videoId,
            libraryId: data.libraryId,
            isDemo: data.isDemo,
            message: data.message,
          });
          onVideoUploaded(data.videoId, data.libraryId);
          setSelectedFile(null);
        } else {
          setErrorMessage(data.error || `Upload failed with status code ${xhr.status}`);
        }
      } catch {
        setErrorMessage("Invalid server response received.");
      }
    };

    xhr.onerror = () => {
      setIsUploading(false);
      setErrorMessage("Network error during video upload. Please check connection.");
    };

    xhr.open("POST", "/api/bunny/upload");
    xhr.send(formData);
  };

  const handleSaveManual = () => {
    const trimmed = manualInput.trim();
    onVideoUploaded(trimmed);
    if (trimmed) {
      setSuccessInfo({
        videoId: trimmed,
        message: "Video GUID saved manually.",
      });
    }
  };

  const effectiveId = videoId || successInfo?.videoId;
  const currentLibraryId =
    bunnyConfig?.libraryId ||
    process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID ||
    "";

  return (
    <div className={`space-y-3 font-sans ${className}`}>
      {/* Upload Box Container */}
      <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-3">
        {/* Top Header */}
        <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <Video className="w-4 h-4 text-sky-500" />
            <span>Bunny Stream Video Delivery</span>
          </div>

          <div className="flex items-center gap-2">
            {bunnyConfig?.configured ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Bunny CDN Active
              </span>
            ) : (
              <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                Ready for Upload
              </span>
            )}

            <button
              type="button"
              onClick={() => setIsManualMode(!isManualMode)}
              className="text-[11px] font-semibold text-sky-600 hover:text-sky-700 cursor-pointer flex items-center gap-1"
            >
              {isManualMode ? "Use Direct File Upload" : "Enter GUID Manually"}
            </button>
          </div>
        </div>

        {/* Mode 1: Direct File Upload */}
        {!isManualMode && (
          <div className="space-y-3">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/webm,video/quicktime,video/x-matroska,video/avi"
              onChange={handleFileChange}
              className="hidden"
            />

            {!selectedFile && !isUploading && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-sky-200 hover:border-sky-400 bg-sky-50/40 hover:bg-sky-50/70 transition-all rounded-xl p-4 text-center cursor-pointer group"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-white shadow-2xs border border-sky-100 flex items-center justify-center text-sky-600 group-hover:scale-105 transition-transform">
                  <Upload className="w-5 h-5 text-sky-500" />
                </div>
                <p className="text-xs font-bold text-slate-800">
                  Click to select video from your computer
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Direct upload to Bunny Stream CDN (.mp4, .mov, .webm, .mkv)
                </p>
              </div>
            )}

            {/* Selected File Details & Upload Action */}
            {selectedFile && !isUploading && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <FileVideo className="w-4 h-4 text-sky-500 shrink-0" />
                    <span className="font-semibold text-slate-800 truncate">
                      {selectedFile.name}
                    </span>
                    <span className="text-[10px] text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                      {formatFileSize(selectedFile.size)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                    title="Remove file"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleStartUpload}
                    className="flex-1 py-2 px-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Directly to Bunny Stream</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="py-2 px-3 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium cursor-pointer"
                  >
                    Change File
                  </button>
                </div>
              </div>
            )}

            {/* Progress Bar during Upload */}
            {isUploading && (
              <div className="p-3.5 bg-sky-50/70 border border-sky-100 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-sky-900 flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 text-sky-600 animate-spin" />
                    <span>{uploadStatus}</span>
                  </span>
                  <span className="font-mono font-bold text-sky-600">
                    {uploadProgress}%
                  </span>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-500 transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>

                <p className="text-[10px] text-sky-700 leading-tight">
                  Uploading video directly to Bunny Stream cloud storage. Please do not close this window.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Mode 2: Manual GUID Input */}
        {isManualMode && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Paste Bunny Video GUID (e.g. 8d2f5a6b-3c4d-4e5f-a6b7-8c9d0e1f2a3b)"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={handleSaveManual}
                className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Apply GUID
              </button>
            </div>
            <p className="text-[10px] text-slate-400">
              Paste a video GUID already uploaded to your Bunny Stream video library.
            </p>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="leading-tight">{errorMessage}</div>
          </div>
        )}

        {/* Success / Current Video Badge */}
        {effectiveId && (
          <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 truncate">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="truncate">
                <span className="font-bold text-emerald-900">Bunny Video ID: </span>
                <span className="font-mono text-[11px] text-emerald-700 select-all">
                  {effectiveId}
                </span>
                {successInfo?.isDemo && (
                  <span className="ml-1.5 text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-sans font-bold">
                    Test Mode
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setShowPreviewModal(true)}
                className="px-2 py-1 bg-white hover:bg-emerald-100/60 border border-emerald-300 text-emerald-800 rounded-md text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                title="Preview video playback"
              >
                <Play className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                <span>Preview</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onVideoUploaded("");
                  setManualInput("");
                  setSuccessInfo(null);
                }}
                className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                title="Clear video"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Video Preview Modal */}
      {showPreviewModal && effectiveId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div className="bg-slate-900 rounded-2xl overflow-hidden max-w-2xl w-full border border-slate-800 shadow-2xl">
            <div className="p-3 bg-slate-950 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Video className="w-4 h-4 text-sky-400" />
                <span>Bunny Stream Player Preview — {lectureTitle}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video w-full bg-black flex items-center justify-center relative">
              {currentLibraryId ? (
                <iframe
                  src={`https://player.mediadelivery.net/embed/${currentLibraryId}/${effectiveId}?autoplay=true&preload=true`}
                  loading="lazy"
                  title="Video Player Preview"
                  className="w-full h-full border-0"
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                  allowFullScreen
                />
              ) : (
                <div className="p-6 text-center text-slate-300 space-y-2">
                  <p className="text-sm font-bold text-white">
                    Bunny Video GUID: <span className="font-mono text-sky-400">{effectiveId}</span>
                  </p>
                  <p className="text-xs text-slate-400">
                    To preview live video inside this iframe, set your Bunny Library ID in Institute Settings or .env.local.
                  </p>
                  <p className="text-xs font-mono text-slate-500">
                    Embed URL: https://player.mediadelivery.net/embed/&#123;library_id&#125;/{effectiveId}
                  </p>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-[11px]">GUID: {effectiveId}</span>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
