import Link from "next/link";
import { prisma } from "@/lib/prisma";
import TeamTable from "@/components/admin/TeamTable";

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
          <p>Manage the executive organogram and operations team displayed on the About / Leadership page.</p>
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

      <TeamTable initialMembers={members} />
    </>
  );
}
