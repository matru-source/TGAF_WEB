"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  ["Dashboard", "/admin"],
  ["Products", "/admin/products"],
  ["Team", "/admin/team"],
  ["Enquiries", "/admin/enquiries"],
  ["Settings", "/admin/settings"],
];

export default function AdminNav() {
  const path = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? path === "/admin" : path.startsWith(href);
  return (
    <nav className="admin-nav">
      {ITEMS.map(([label, href]) => (
        <Link key={href} href={href} className={isActive(href) ? "active" : ""}>
          {label}
        </Link>
      ))}
      <Link href="/" target="_blank">
        View site ↗
      </Link>
    </nav>
  );
}
