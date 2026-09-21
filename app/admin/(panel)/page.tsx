import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function loadStats() {
  try {
    const [products, published, enquiries, newEnquiries, recent] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { published: true } }),
      prisma.enquiry.count(),
      prisma.enquiry.count({ where: { status: "NEW" } }),
      prisma.enquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);
    return { ok: true as const, products, published, enquiries, newEnquiries, recent };
  } catch {
    return { ok: false as const };
  }
}

export default async function Dashboard() {
  const s = await loadStats();

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your catalogue and enquiries.</p>
        </div>
        <Link href="/admin/products/new" className="abtn abtn-primary">
          + New product
        </Link>
      </div>

      {!s.ok && (
        <div className="db-warn">
          ⚠ Could not reach the database. Set a valid <strong>DATABASE_URL</strong> (NeonDB) in{" "}
          <code>.env</code>, then run <code>npm run setup</code>.
        </div>
      )}

      {s.ok && (
        <>
          <div className="kpi-row">
            <div className="kpi-card">
              <div className="n">{s.products}</div>
              <div className="l">Total products</div>
            </div>
            <div className="kpi-card">
              <div className="n">{s.published}</div>
              <div className="l">Published</div>
            </div>
            <div className="kpi-card">
              <div className="n">{s.enquiries}</div>
              <div className="l">Total enquiries</div>
            </div>
            <div className="kpi-card">
              <div className="n">{s.newEnquiries}</div>
              <div className="l">New / unread</div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <h2>Recent enquiries</h2>
              <Link href="/admin/enquiries" className="abtn abtn-ghost abtn-sm">
                View all
              </Link>
            </div>
            {s.recent.length === 0 ? (
              <div className="empty">No enquiries yet.</div>
            ) : (
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Interest</th>
                    <th>Status</th>
                    <th>Received</th>
                  </tr>
                </thead>
                <tbody>
                  {s.recent.map((e) => (
                    <tr key={e.id}>
                      <td>
                        <div className="name">{e.name}</div>
                        <div style={{ color: "var(--muted)", fontSize: ".82rem" }}>{e.email}</div>
                      </td>
                      <td>{e.interest || e.type}</td>
                      <td>
                        <span className={`badge-pill bp-${e.status === "NEW" ? "new" : e.status === "IN_PROGRESS" ? "prog" : "closed"}`}>
                          {e.status.replace("_", " ")}
                        </span>
                      </td>
                      <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </>
  );
}
