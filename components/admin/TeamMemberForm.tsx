"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type TeamMemberInitial = {
  id?: string;
  name?: string;
  role?: string;
  bio?: string;
  photo?: string | null;
  initials?: string | null;
  order?: number;
  published?: boolean;
};

export default function TeamMemberForm({ initial = {} }: { initial?: TeamMemberInitial }) {
  const router = useRouter();
  const editing = Boolean(initial.id);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photo, setPhoto] = useState(initial.photo || "");

  async function onUpload(files: FileList | null) {
    if (!files || !files.length) return;
    setError("");
    setUploading(true);
    const fd = new FormData();
    fd.append("files", files[0]);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) setError(json.error || "Upload failed.");
      else setPhoto(json.urls[0]);
    } catch {
      setError("Upload failed. Please try again.");
    }
    setUploading(false);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSaving(true);
    const fd = new FormData(e.currentTarget);

    const payload = {
      name: String(fd.get("name") || ""),
      role: String(fd.get("role") || ""),
      bio: String(fd.get("bio") || ""),
      photo,
      initials: String(fd.get("initials") || ""),
      order: Number(fd.get("order") || 0),
      published: fd.get("published") === "on",
    };

    try {
      const res = await fetch(editing ? `/api/admin/team/${initial.id}` : "/api/admin/team", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Could not save the team member.");
        setSaving(false);
        return;
      }
      router.push("/admin/team");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setSaving(false);
    }
  }

  return (
    <form className="aform" onSubmit={onSubmit}>
      {error && <div className="alert alert-err">{error}</div>}

      <div className="grid2">
        <div>
          <label htmlFor="name">Full name *</label>
          <input id="name" name="name" defaultValue={initial.name} required />
        </div>
        <div>
          <label htmlFor="role">Role / title *</label>
          <input id="role" name="role" defaultValue={initial.role} placeholder="Managing Director" required />
        </div>
      </div>

      <div>
        <label htmlFor="bio">Short bio *</label>
        <textarea id="bio" name="bio" defaultValue={initial.bio} required />
      </div>

      <div>
        <label htmlFor="photo">Photo</label>
        <input
          id="photo"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          disabled={uploading}
          onChange={(e) => {
            onUpload(e.target.files);
            e.target.value = "";
          }}
        />
        <div className="help">
          {uploading
            ? "Uploading…"
            : "Upload a headshot (JPG, PNG, WebP, AVIF · max 5 MB). Square or portrait works best - it is cropped to a square on the card. Without a photo the card shows the initials badge."}
        </div>
        {photo && (
          <div className="img-manager">
            <div className="img-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo} alt="Headshot preview" />
              <div className="img-tools">
                <button type="button" onClick={() => setPhoto("")}>Remove</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid3">
        <div>
          <label htmlFor="initials">Initials (optional)</label>
          <input id="initials" name="initials" defaultValue={initial.initials || ""} maxLength={2} placeholder="Auto from name" />
        </div>
        <div>
          <label htmlFor="order">Display order</label>
          <input id="order" name="order" type="number" defaultValue={initial.order ?? 0} />
        </div>
        <label className="check" style={{ alignSelf: "end", paddingBottom: 11 }}>
          <input type="checkbox" name="published" defaultChecked={initial.published ?? true} /> Published
        </label>
      </div>

      <div className="actions">
        <button className="abtn abtn-primary" type="submit" disabled={saving}>
          {saving ? "Saving…" : editing ? "Save changes" : "Add team member"}
        </button>
        <a href="/admin/team" className="abtn abtn-ghost">Cancel</a>
      </div>
    </form>
  );
}
