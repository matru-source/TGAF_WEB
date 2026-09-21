import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TeamMemberForm from "@/components/admin/TeamMemberForm";

export const dynamic = "force-dynamic";

export default async function EditTeamMemberPage({ params }: { params: { id: string } }) {
  let member;
  try {
    member = await prisma.teamMember.findUnique({ where: { id: params.id } });
  } catch {
    member = null;
  }
  if (!member) notFound();

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Edit team member</h1>
          <p>{member.name}</p>
        </div>
      </div>
      <div className="panel" style={{ padding: "clamp(20px,3vw,34px)" }}>
        <TeamMemberForm
          initial={{
            id: member.id,
            name: member.name,
            role: member.role,
            bio: member.bio,
            photo: member.photo,
            initials: member.initials,
            order: member.order,
            published: member.published,
          }}
        />
      </div>
    </>
  );
}
