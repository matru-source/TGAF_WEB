"use client";
import { useEffect, useRef } from "react";
import { PROCESS_STEPS } from "@/lib/data";

/**
 * Scroll-driven farm-to-fork storyline. A vertical connecting line fills as the
 * section scrolls through the viewport; each numbered node "activates" and its
 * copy slides in as the fill reaches it. Falls back to a fully-revealed static
 * state when reduced motion is preferred or IntersectionObserver is unavailable.
 */
export default function JourneyTimeline() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const steps = Array.from(root.querySelectorAll<HTMLElement>(".jt-step"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      root.style.setProperty("--fill", "100%");
      steps.forEach((s) => s.classList.add("is-active"));
      return;
    }

    let raf = 0;
    const clamp = (n: number, a: number, b: number) => Math.min(Math.max(n, a), b);

    const update = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const activation = vh * 0.62;
      const frac = clamp((activation - rect.top) / rect.height, 0, 1);
      root.style.setProperty("--fill", `${(frac * 100).toFixed(2)}%`);
      steps.forEach((s) => {
        const node = s.querySelector(".jt-node");
        if (!node) return;
        const r = node.getBoundingClientRect();
        s.classList.toggle("is-active", r.top + r.height / 2 <= activation);
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="journey" ref={ref}>
      <div className="journey-line" aria-hidden="true">
        <span className="journey-line-fill" />
      </div>
      <ol className="jt-steps">
        {PROCESS_STEPS.map((s, i) => (
          <li className="jt-step" key={s.title}>
            <div className="jt-node" aria-hidden="true">
              <span className="jt-num">{`0${i + 1}`}</span>
            </div>
            <div className="jt-content">
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
