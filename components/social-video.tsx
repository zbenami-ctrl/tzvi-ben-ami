"use client";

import { useState } from "react";
import type { BlogVideo } from "@/lib/blog-videos";

// A chosen TikTok / Instagram / YouTube video: shows the cover, loads the player only when tapped.
export function SocialVideo({ video, playLabel }: { video: BlogVideo; playLabel: string }) {
  const [playing, setPlaying] = useState(!video.thumbnail);

  return (
    <figure className={`social-video${video.vertical ? " is-vertical" : ""}`}>
      <div className="social-video-frame">
        {playing ? (
          <iframe
            src={video.embed}
            title={video.title ?? playLabel}
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label={video.title ? `${playLabel}: ${video.title}` : playLabel}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={video.thumbnail} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
            <span className="video-play" aria-hidden="true" />
          </button>
        )}
      </div>
      {video.title && <figcaption dir="auto">{video.title}</figcaption>}
    </figure>
  );
}
