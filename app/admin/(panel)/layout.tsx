import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import Brand from "@/components/site/Brand";
import AdminNav from "@/components/admin/AdminNav";
import LogoutButton from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="admin-body">
      <div className="admin-shell">
        <aside className="admin-side">
          <Brand variant="invert" />
          <AdminNav />
          <div className="foot">
            <div className="who" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
              <span>{user.name}</span>
              <span
                style={{
                  fontSize: "0.7rem",
                  padding: "2px 8px",
                  borderRadius: "999px",
                  background: user.role === "ADMIN" ? "#DC2626" : "#4B5563",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                }}
              >
                {user.role}
              </span>
            </div>
            <div>{user.email}</div>
            <LogoutButton />
          </div>
        </aside>
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}
