"use client";
import { useState } from "react";

/**
 * Renders a certification logo image. If the file is missing or fails to load,
 * it falls back to a styled text badge so the section never looks broken.
 */
export default function CertLogo({ src, abbr, full }: { src?: string; abbr: string; full: string }) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="cert-logo"
        src={src}
        alt={full}
        title={full}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className="cert-fallback">
      <div className="abbr">{abbr}</div>
      <div className="full">{full}</div>
    </div>
  );
}
