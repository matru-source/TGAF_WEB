"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Global progressive-enhancement effects for the public site:
 * scroll-reveal animations and animated number counters.
 * Re-runs on every route change so newly mounted pages are scanned.
 * Renders nothing.
 */
export default function SiteEffects() {
  const pathname = usePathname();
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));

    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("in"));
      counters.forEach((el) => {
        const t = Number(el.dataset.count || "0");
        const noComma = el.dataset.noComma === "true";
        el.textContent = (noComma ? String(t) : t.toLocaleString("en-US")) + (el.dataset.suffix || "");
      });
      return;
    }

    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            revealIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    reveals.forEach((el) => revealIO.observe(el));

    const animate = (el: HTMLElement) => {
      const target = Number(el.dataset.count || "0");
      const suffix = el.dataset.suffix || "";
      const noComma = el.dataset.noComma === "true";
      const fmt = (n: number) => (noComma ? String(n) : n.toLocaleString("en-US"));
      const dur = 1500;
      let start: number | null = null;
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const tick = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        el.textContent = fmt(Math.round(target * ease(p))) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = fmt(target) + suffix;
      };
      requestAnimationFrame(tick);
    };

    const countIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate(e.target as HTMLElement);
            countIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 },
    );
    counters.forEach((el) => countIO.observe(el));

    return () => {
      revealIO.disconnect();
      countIO.disconnect();
    };
  }, [pathname]);

  return null;
}
