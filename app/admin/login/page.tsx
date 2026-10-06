import { Suspense } from "react";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/login-form";
import { SetupScreen } from "@/components/admin/setup-screen";
import { Logo } from "@/components/logo";
import { getAdminSession } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (!isSupabaseConfigured()) return <SetupScreen />;

  const session = await getAdminSession();
  if (session) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo size={38} href="/" />
        </div>
        <div className="card p-6">
          <h1 className="font-display text-xl font-extrabold">Admin sign in</h1>
          <p className="mb-6 mt-1.5 text-[13px] text-muted">
            Use the Supabase account that is listed in the admin users table.
          </p>
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
        <p className="mt-6 text-center text-[12px] text-muted">
          Lost access? Create the user in Supabase → Authentication, then add a
          row in <code className="text-sky">admin_users</code>.
        </p>
      </div>
    </div>
  );
}
