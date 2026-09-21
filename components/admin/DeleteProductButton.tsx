"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onDelete() {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setBusy(true);
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("Could not delete the product.");
      setBusy(false);
    }
  }

  return (
    <button className="abtn abtn-danger abtn-sm" onClick={onDelete} disabled={busy}>
      {busy ? "…" : "Delete"}
    </button>
  );
}
