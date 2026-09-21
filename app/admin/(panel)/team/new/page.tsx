import TeamMemberForm from "@/components/admin/TeamMemberForm";

export const dynamic = "force-dynamic";

export default function NewTeamMemberPage() {
  return (
    <>
      <div className="admin-head">
        <div>
          <h1>New team member</h1>
          <p>Add a person to the Leadership page.</p>
        </div>
      </div>
      <div className="panel" style={{ padding: "clamp(20px,3vw,34px)" }}>
        <TeamMemberForm />
      </div>
    </>
  );
}
