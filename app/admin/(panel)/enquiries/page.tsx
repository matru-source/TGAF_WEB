import { prisma } from "@/lib/prisma";
import EnquiryStatusSelect from "@/components/admin/EnquiryStatusSelect";

export const dynamic = "force-dynamic";

export default async function EnquiriesPage() {
  let items: Awaited<ReturnType<typeof prisma.enquiry.findMany>> = [];
  let dbDown = false;
  try {
    items = await prisma.enquiry.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    dbDown = true;
  }

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Enquiries</h1>
          <p>Leads captured from the website contact form.</p>
        </div>
      </div>

      {dbDown && (
        <div className="db-warn">
          ⚠ Could not reach the database. Set <strong>DATABASE_URL</strong> (NeonDB) and run{" "}
          <code>npm run setup</code>.
        </div>
      )}

      <div className="panel">
        {items.length === 0 && !dbDown ? (
          <div className="empty">No enquiries yet. Submissions from the website will appear here.</div>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>Contact</th>
                <th>Interest</th>
                <th>Message</th>
                <th>Received</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((e) => (
                <tr key={e.id}>
                  <td>
                    <div className="name">{e.name}</div>
                    <div style={{ color: "var(--muted)", fontSize: ".8rem" }}>
                      <a href={`mailto:${e.email}`} style={{ color: "var(--chilli)" }}>{e.email}</a>
                    </div>
                    {e.company && <div style={{ color: "var(--muted)", fontSize: ".8rem" }}>{e.company}</div>}
                  </td>
                  <td>{e.interest || e.type}</td>
                  <td style={{ maxWidth: 360, color: "var(--ink-2)", fontSize: ".86rem" }}>{e.message}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{new Date(e.createdAt).toLocaleString()}</td>
                  <td>
                    <EnquiryStatusSelect id={e.id} status={e.status} />
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
