import { prisma } from "@/lib/prisma";
import CelebrationsManager, { type CelebrationPostData } from "@/components/admin/CelebrationsManager";

export const dynamic = "force-dynamic";

export default async function AdminCelebrationsPage() {
  let posts: CelebrationPostData[] = [];
  let dbError = false;

  try {
    const rows = await prisma.celebrationPost.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    posts = rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      celebrantName: r.celebrantName,
      role: r.role,
      company: r.company,
      date: r.date,
      category: r.category,
      quote: r.quote,
      bodyText: r.bodyText,
      images: r.images,
      badges: r.badges,
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
          <h1>Distributor Celebrations &amp; Trade Honors</h1>
          <p>Publish birthday honors, trade spotlights, and commercial milestone posts for key distributors.</p>
        </div>
      </div>

      {dbError && (
        <div className="alert alert-err" style={{ marginBottom: "20px" }}>
          Database connection issue. Unable to load celebration posts.
        </div>
      )}

      <div className="panel" style={{ padding: "clamp(20px,3vw,34px)" }}>
        <CelebrationsManager initialPosts={posts} />
      </div>
    </>
  );
}
