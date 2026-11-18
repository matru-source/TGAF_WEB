import { prisma } from "@/lib/prisma";
import GalleryManager, { type GalleryItemData } from "@/components/admin/GalleryManager";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  let items: GalleryItemData[] = [];
  let dbError = false;

  try {
    const rows = await prisma.galleryItem.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    items = rows.map((r) => ({
      id: r.id,
      title: r.title,
      category: r.category,
      image: r.image,
      caption: r.caption,
      location: r.location,
      tag: r.tag,
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
          <h1>Gallery Photos</h1>
          <p>Add, edit, replace and reorder authentic operational photos displayed on the /gallery page.</p>
        </div>
      </div>

      {dbError && (
        <div className="alert alert-err" style={{ marginBottom: "20px" }}>
          Database connection issue. Unable to load gallery items.
        </div>
      )}

      <div className="panel" style={{ padding: "clamp(20px,3vw,34px)" }}>
        <GalleryManager initialItems={items} />
      </div>
    </>
  );
}
