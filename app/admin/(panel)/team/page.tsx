import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteTeamMemberButton from "@/components/admin/DeleteTeamMemberButton";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  let members: Awaited<ReturnType<typeof prisma.teamMember.findMany>> = [];
  let dbDown = false;
  try {
    members = await prisma.teamMember.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });
  } catch {
    dbDown = true;
  }

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Team</h1>
          <p>Manage the &ldquo;Meet the team&rdquo; cards on the Leadership page.</p>
        </div>
        <Link href="/admin/team/new" className="abtn abtn-primary">
          + New member
        </Link>
      </div>

      {dbDown && (
        <div className="db-warn">
          ⚠ Could not reach the database. Set <strong>DATABASE_URL</strong> (NeonDB) and run{" "}
          <code>npm run setup</code>.
        </div>
      )}

      <div className="panel">
        {members.length === 0 && !dbDown ? (
          <div className="empty">
            No team members yet.{" "}
            <Link href="/admin/team/new" style={{ color: "var(--chilli)", fontWeight: 600 }}>
              Add the first one →
            </Link>
          </div>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}></th>
                <th>Name</th>
                <th>Role</th>
                <th>Order</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id}>
                  <td>
                    {m.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="thumb thumb-round" src={m.photo} alt="" />
                    ) : (
                      <div className="thumb thumb-round thumb-initials">{m.initials}</div>
                    )}
                  </td>
                  <td>
                    <div className="name">{m.name}</div>
                  </td>
                  <td style={{ color: "var(--ink-2)", fontSize: ".85rem" }}>{m.role}</td>
                  <td style={{ color: "var(--ink-2)", fontSize: ".85rem" }}>{m.order}</td>
                  <td>
                    <span className={`badge-pill ${m.published ? "bp-on" : "bp-off"}`}>
                      {m.published ? "Published" : "Hidden"}
                    </span>
                  </td>
                  <td>
                    <div className="adm-actions" style={{ justifyContent: "flex-end" }}>
                      <Link href={`/admin/team/${m.id}`} className="abtn abtn-ghost abtn-sm">
                        Edit
                      </Link>
                      <DeleteTeamMemberButton id={m.id} name={m.name} />
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
