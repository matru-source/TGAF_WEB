import { getStats } from "@/lib/queries";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const stats = await getStats();
  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Site settings</h1>
          <p>Edit the traction statistics shown in the homepage stats strip.</p>
        </div>
      </div>
      <div className="panel" style={{ padding: "clamp(20px,3vw,34px)" }}>
        <SettingsForm stats={stats.map((s) => ({ key: s.key, label: s.label, value: s.value }))} />
      </div>
    </>
  );
}
