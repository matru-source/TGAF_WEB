"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EnquiryStatusSelect({
  id,
  status,
}: {
  id: string;
  status: "NEW" | "IN_PROGRESS" | "CLOSED";
}) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [busy, setBusy] = useState(false);

  async function update(next: string) {
    setBusy(true);
    const prev = value;
    setValue(next as typeof value);
    const res = await fetch(`/api/admin/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setBusy(false);
    if (!res.ok) {
      setValue(prev);
      alert("Could not update status.");
    } else {
      router.refresh();
    }
  }

  return (
    <select
      value={value}
      disabled={busy}
      onChange={(e) => update(e.target.value)}
      style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid var(--line-strong)", background: "var(--cream)", fontSize: ".82rem", fontWeight: 600 }}
    >
      <option value="NEW">New</option>
      <option value="IN_PROGRESS">In progress</option>
      <option value="CLOSED">Closed</option>
    </select>
  );
}
