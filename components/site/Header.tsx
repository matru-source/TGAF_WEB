"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Brand from "./Brand";

type Leaf = { label: string; href: string };
type Item = { label: string; href?: string; children?: Leaf[] };

const NAV: Item[] = [
  { label: "Home", href: "/" },
  {
    label: "Company",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Awards & Recognition", href: "/awards" },
      { label: "Leadership", href: "/leadership" },
      { label: "Sustainability & ESG", href: "/sustainability" },
    ],
  },
  {
    label: "Capabilities",
    children: [
      { label: "Farm-to-Fork", href: "/farm-to-fork" },
      { label: "Manufacturing", href: "/manufacturing" },
      { label: "Quality & Certifications", href: "/quality" },
    ],
  },
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Careers", href: "/careers" },
  { label: "News", href: "/news" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
  }, [open]);
  useEffect(() => {
    setOpen(false);
    setOpenIdx(null);
  }, [pathname]);

  const activeLeaf = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const activeGroup = (children: Leaf[]) => children.some((c) => pathname.startsWith(c.href));

  return (
    <>
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <div className="container nav">
          <Brand />
          <nav className="nav-links" aria-label="Primary">
            {NAV.map((item, idx) =>
              item.children ? (
                <div
                  className={`nav-item has-dd${activeGroup(item.children) ? " active" : ""}${openIdx === idx ? " open" : ""}`}
                  key={item.label}
                  onMouseEnter={() => setOpenIdx(idx)}
                  onMouseLeave={() => setOpenIdx((v) => (v === idx ? null : v))}
                  onFocus={() => setOpenIdx(idx)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenIdx((v) => (v === idx ? null : v));
                  }}
                >
                  <button className="nav-trigger" aria-haspopup="true" aria-expanded={openIdx === idx}>
                    {item.label}
                    <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <div className="dd">
                    <div className="dd-inner">
                      {item.children.map((c) => (
                        <Link key={c.href} href={c.href} className={activeLeaf(c.href) ? "active" : ""}>
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href!} className={`nav-item${activeLeaf(item.href!) ? " active" : ""}`} aria-current={activeLeaf(item.href!) ? "page" : undefined}>
                  {item.label}
                </Link>
              ),
            )}
            <div className="nav-drawer-cta">
              <Link href="/contact" className="btn btn-primary">
                Get in touch <span className="arr">→</span>
              </Link>
              <span className="nav-drawer-note">Premium spices, farm to fork.</span>
            </div>
          </nav>
          <div className="nav-cta">
            <Link href="/contact" className="btn btn-primary">
              Get in touch <span className="arr">→</span>
            </Link>
            <button className="nav-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
              <span></span>
            </button>
          </div>
        </div>
      </header>
      <button
        className="nav-scrim"
        aria-hidden="true"
        tabIndex={-1}
        onClick={() => setOpen(false)}
      />
    </>
  );
}
