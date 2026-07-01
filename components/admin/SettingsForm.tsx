"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Stat = { key: string; label: string; value: number };

export default function SettingsForm({ stats }: { stats: Stat[] }) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(stats.map((s) => [s.key, String(s.value)])),
  );
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    const settings: Record<string, string> = {};
    for (const s of stats) settings[`stat:${s.key}`] = values[s.key] ?? "0";
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings }),
    });
    if (res.ok) {
      setStatus("ok");
      setMsg("Saved. The homepage will reflect these on next load.");
      router.refresh();
    } else {
      const j = await res.json().catch(() => ({}));
      setStatus("err");
      setMsg(j.error || "Could not save settings.");
    }
  }

  return (
    <form className="aform" onSubmit={onSubmit}>
      {status === "ok" && <div className="alert alert-ok">{msg}</div>}
      {status === "err" && <div className="alert alert-err">{msg}</div>}
      <div className="grid3">
        {stats.map((s) => (
          <div key={s.key}>
            <label htmlFor={s.key}>{s.label}</label>
            <input
              id={s.key}
              type="number"
              value={values[s.key] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [s.key]: e.target.value }))}
            />
          </div>
        ))}
      </div>
      <div className="actions">
        <button className="abtn abtn-primary" type="submit" disabled={status === "saving"}>
          {status === "saving" ? "Saving…" : "Save settings"}
        </button>
      </div>
    </form>
  );
}
