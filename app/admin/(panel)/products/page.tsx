import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = [];
  let dbDown = false;
  try {
    products = await prisma.product.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });
  } catch {
    dbDown = true;
  }

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Products</h1>
          <p>Manage the consumer (B2C) and bulk (B2B) catalogue shown on the website.</p>
        </div>
        <Link href="/admin/products/new" className="abtn abtn-primary">
          + New product
        </Link>
      </div>

      {dbDown && (
        <div className="db-warn">
          ⚠ Could not reach the database. Set <strong>DATABASE_URL</strong> (NeonDB) and run{" "}
          <code>npm run setup</code>.
        </div>
      )}

      <div className="panel">
        {products.length === 0 && !dbDown ? (
          <div className="empty">
            No products yet. <Link href="/admin/products/new" style={{ color: "var(--chilli)", fontWeight: 600 }}>Create the first one →</Link>
          </div>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}></th>
                <th>Name</th>
                <th>Segment</th>
                <th>Sizes / formats</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="thumb" src={p.image} alt="" />
                    ) : (
                      <div className="thumb" />
                    )}
                  </td>
                  <td>
                    <div className="name">{p.name}</div>
                    <div style={{ color: "var(--muted)", fontSize: ".8rem" }}>/{p.slug}</div>
                  </td>
                  <td>
                    <span className={`badge-pill bp-${p.segment.toLowerCase()}`}>{p.segment}</span>
                  </td>
                  <td style={{ color: "var(--ink-2)", fontSize: ".85rem" }}>
                    {[...p.sizes, ...p.formats].join(", ") || "-"}
                  </td>
                  <td>
                    <span className={`badge-pill ${p.published ? "bp-on" : "bp-off"}`}>
                      {p.published ? "Published" : "Hidden"}
                    </span>
                  </td>
                  <td>
                    <div className="adm-actions" style={{ justifyContent: "flex-end" }}>
                      <Link href={`/admin/products/${p.id}`} className="abtn abtn-ghost abtn-sm">
                        Edit
                      </Link>
                      <DeleteProductButton id={p.id} name={p.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
