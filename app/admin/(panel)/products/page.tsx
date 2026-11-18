import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductsTable from "@/components/admin/ProductsTable";

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

      <ProductsTable initialProducts={products} />
    </>
  );
}
