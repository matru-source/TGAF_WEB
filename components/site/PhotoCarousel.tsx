"use client";
import { useEffect, useState } from "react";

/**
 * Automatic cross-fading photo carousel for editorial image slots.
 * Sizing (height / aspect-ratio / shadow) comes from the parent's CSS so each
 * slot keeps its own proportions - see `.journey-figure .pcar` etc.
 */
export default function PhotoCarousel({
  images,
  alt,
  interval = 5000,
}: {
  images: string[];
  alt: string;
  interval?: number;
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % count), interval);
    return () => clearInterval(t);
  }, [count, paused, interval]);

  return (
    <div
      className="pcar"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, n) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={n === i ? alt : ""}
          aria-hidden={n !== i}
          loading={n === 0 ? "eager" : "lazy"}
          className={n === i ? "is-active" : ""}
        />
      ))}

      {count > 1 && (
        <div className="pcar-dots">
          {images.map((src, n) => (
            <button
              key={src}
              type="button"
              className={n === i ? "on" : ""}
              aria-label={`Show photo ${n + 1} of ${count}`}
              aria-current={n === i}
              onClick={() => setI(n)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
