"use client";

import { useState } from "react";

const VIDEO_ID = "FhQ9mS96xjU";

export default function HeroVideo() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="video-frame">
        <iframe
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`}
          title="Why So Many People Are MisInsured"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className="video-frame"
      onClick={() => setPlaying(true)}
      aria-label="Play video: Why So Many People Are MisInsured"
      style={{
        cursor: "pointer",
        border: "1px solid var(--line)",
        padding: 0,
        width: "100%",
        appearance: "none",
        WebkitAppearance: "none",
        backgroundImage: `url(https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="playbtn" />
      <div className="caption">Why So Many People Are MisInsured</div>
    </button>
  );
}
