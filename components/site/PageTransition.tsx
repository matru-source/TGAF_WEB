"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const MIN_VISIBLE_MS = 620;

/**
 * Full-screen branded loader shown while navigating between pages: the logo
 * spins inside a circular ring. Triggered the instant an internal link is
 * clicked (before the route has actually changed) and cleared once the new
 * route has mounted, with a minimum display time so it never just flickers.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const shownAt = useRef<number | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Left-click only, no modifier keys (those open new tabs / windows).
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      // Same path (ignoring hash) = not a real navigation.
      if (url.pathname === window.location.pathname) return;

      shownAt.current = Date.now();
      setActive(true);
    };
    // Capture phase: runs BEFORE next/link's React onClick calls preventDefault,
    // otherwise the bubble-phase listener would see defaultPrevented and bail.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (hideTimer.current) clearTimeout(hideTimer.current);
    const elapsed = shownAt.current ? Date.now() - shownAt.current : MIN_VISIBLE_MS;
    const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0);
    hideTimer.current = setTimeout(() => setActive(false), remaining);
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [pathname]);

  return (
    <div className={`page-transition${active ? " active" : ""}`} aria-hidden={!active}>
      <div className="pt-ring">
        <div className="pt-logo-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo.png" alt="" className="pt-logo" />
        </div>
      </div>
    </div>
  );
}
