"use client";

import React, { useState } from "react";
import { AlertCircle, Video, Loader2 } from "lucide-react";

interface BunnyPlayerProps {
  videoId?: string;
  videoUrl?: string;
  lessonTitle: string;
  courseTitle?: string;
  duration?: string;
}

export const BunnyPlayer: React.FC<BunnyPlayerProps> = ({
  videoId,
  videoUrl,
  lessonTitle,
  courseTitle,
  duration,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Read official Bunny Stream Library ID from public environment
  const libraryId = process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID || "";

  // Determine effective video ID: either explicit bunnyVideoId or extracted from videoUrl if formatted as embed
  let effectiveVideoId = videoId;
  if (!effectiveVideoId && videoUrl) {
    const match = videoUrl.match(/embed\/\d+\/([a-zA-Z0-9-]+)/);
    if (match) {
      effectiveVideoId = match[1];
    }
  }

  // Determine official documented Bunny Stream embed URL
  let embedUrl: string | null = null;
  if (videoUrl && (videoUrl.includes("player.mediadelivery.net/embed/") || videoUrl.includes("iframe.mediadelivery.net/embed/"))) {
    embedUrl = videoUrl;
  } else if (libraryId && effectiveVideoId) {
    embedUrl = `https://player.mediadelivery.net/embed/${libraryId}/${effectiveVideoId}?autoplay=false&preload=true`;
  }

  const isConfigured = Boolean(embedUrl);

  return (
    <div className="relative w-full aspect-video bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center">
      {isConfigured && embedUrl && !hasError ? (
        <>
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950 text-slate-300">
              <Loader2 className="w-8 h-8 text-sky-500 animate-spin mb-3" />
              <p className="text-xs font-medium">Connecting to Bunny Stream CDN...</p>
              <p className="text-[11px] text-slate-400 mt-1">{lessonTitle}</p>
            </div>
          )}

          <iframe
            src={embedUrl}
            loading="lazy"
            title={`${lessonTitle} - Video Player`}
            className="w-full h-full border-0 absolute inset-0"
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        </>
      ) : (
        /* Honest, clean placeholder state when video is not connected */
        <div className="w-full h-full p-6 sm:p-10 flex flex-col items-center justify-center text-center select-none bg-gradient-to-b from-slate-900 to-slate-950 font-sans">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700/80 flex items-center justify-center mb-4 shadow-lg">
            <Video className="w-8 h-8 text-sky-400" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20 text-xs font-semibold mb-3">
            <AlertCircle className="w-3.5 h-3.5 text-sky-400" />
            <span>Demo lesson — video not connected</span>
          </span>

          <h3 className="text-xl sm:text-2xl font-bold text-white max-w-lg mb-2">
            {lessonTitle}
          </h3>

          {courseTitle && (
            <p className="text-xs text-slate-400 mb-4">
              {courseTitle} {duration && <>&bull; Estimated duration: <span className="font-mono text-slate-300">{duration}</span></>}
            </p>
          )}

          <div className="max-w-md bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-left text-xs text-slate-300 space-y-2 mt-2">
            <div className="flex items-center justify-between text-[11px] text-sky-400 font-semibold border-b border-slate-800 pb-1.5">
              <span>Bunny Stream CDN Integration</span>
              <span className="text-slate-400">docs.bunny.net/stream</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Official player embeds via <code className="text-sky-300 bg-black/40 px-1 py-0.5 rounded font-mono">https://player.mediadelivery.net/embed/&#123;library_id&#125;/&#123;video_id&#125;</code>.
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              To enable video playback, configure <code className="text-white font-mono">NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID</code> in your <code className="text-white font-mono">.env.local</code> and attach video IDs in the admin curriculum manager.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
