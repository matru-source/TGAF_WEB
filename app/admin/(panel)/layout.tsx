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
            <div className="who">{user.name}</div>
            <div>{user.email}</div>
            <LogoutButton />
          </div>
        </aside>
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}
