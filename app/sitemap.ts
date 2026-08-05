import type { MetadataRoute } from "next";
import { NEWS } from "@/lib/data";

const BASE = "https://tgagrifarms.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "", "/about", "/leadership", "/sustainability", "/farm-to-fork",
    "/manufacturing", "/quality", "/products", "/careers", "/news",
    "/presence", "/contact",
  ];
  const pages: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${BASE}${r}`,
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
  const news: MetadataRoute.Sitemap = NEWS.map((n) => ({
    url: `${BASE}/news/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));
  return [...pages, ...news];
}
