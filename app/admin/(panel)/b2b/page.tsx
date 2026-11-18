import { prisma } from "@/lib/prisma";
import B2BManager, { type B2BPartnerData } from "@/components/admin/B2BManager";

export const dynamic = "force-dynamic";

export default async function AdminB2BPage() {
  let partners: B2BPartnerData[] = [];
  let dbError = false;

  try {
    const rows = await prisma.b2BPartner.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    partners = rows.map((r) => ({
      id: r.id,
      name: r.name,
      logo: r.logo,
      category: r.category,
      order: r.order,
      published: r.published,
    }));
  } catch (err) {
    dbError = true;
  }

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>B2B Corporate Partners &amp; Client Logos</h1>
          <p>Add, edit, replace and manage client partner brand logos displayed on the /products#b2b showcase.</p>
        </div>
      </div>

      {dbError && (
        <div className="alert alert-err" style={{ marginBottom: "20px" }}>
          Database connection issue. Unable to load B2B partner logos.
        </div>
      )}

      <div className="panel" style={{ padding: "clamp(20px,3vw,34px)" }}>
        <B2BManager initialPartners={partners} />
      </div>
    </>
  );
}
