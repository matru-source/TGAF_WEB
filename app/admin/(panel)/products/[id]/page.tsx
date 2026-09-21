import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  let product;
  try {
    product = await prisma.product.findUnique({ where: { id: params.id } });
  } catch {
    product = null;
  }
  if (!product) notFound();

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Edit product</h1>
          <p>{product.name}</p>
        </div>
      </div>
      <div className="panel" style={{ padding: "clamp(20px,3vw,34px)" }}>
        <ProductForm
          initial={{
            id: product.id,
            name: product.name,
            slug: product.slug,
            segment: product.segment,
            accent: product.accent,
            tagline: product.tagline,
            description: product.description,
            image: product.image,
            images: product.images,
            sizes: product.sizes,
            formats: product.formats,
            costPositioning: product.costPositioning,
            marketCategory: product.marketCategory,
            colour: product.colour,
            asta: product.asta,
            scoville: product.scoville,
            usage: product.usage,
            featured: product.featured,
            published: product.published,
            order: product.order,
          }}
        />
      </div>
    </>
  );
}
