"use client";

import { useState } from "react";
import { buttonClasses } from "./ui/Button";
import { Icon } from "./ui/Icon";

// Click-to-load facade: Google Maps (~500 KB of third-party JS) only loads on request.
export function MapEmbed({ src, title, loadLabel, note }: { src: string; title: string; loadLabel: string; note: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-pine-100 ring-1 ring-ink-900/5">
      {loaded ? (
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <Icon name="mapPin" size={36} className="text-pine-800" />
          <button type="button" onClick={() => setLoaded(true)} className={buttonClasses("primary", "md")}>
            {loadLabel}
          </button>
          <p className="max-w-xs text-sm text-ink-600">{note}</p>
        </div>
      )}
    </div>
  );
}
