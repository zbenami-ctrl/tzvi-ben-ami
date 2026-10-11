"use client";

import { useState } from "react";

// Shows the YouTube thumbnail and loads the player only when tapped, so a page
// with many videos stays light.
export function VideoTestimonial({ id, name, playLabel }: { id: string; name?: string; playLabel: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="video-card">
      <div className="video-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={name ?? playLabel}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label={name ? `${playLabel}: ${name}` : playLabel}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" />
            <span className="video-play" aria-hidden="true" />
          </button>
        )}
      </div>
      {name && <figcaption>{name}</figcaption>}
    </figure>
  );
}
