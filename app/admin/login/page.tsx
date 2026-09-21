import { Suspense } from "react";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Admin sign-in · Goodearth Foods" };

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="login-wrap">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}
