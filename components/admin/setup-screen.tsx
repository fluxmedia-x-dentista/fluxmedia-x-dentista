import { Database, KeyRound, Terminal } from "lucide-react";

import { Logo } from "@/components/logo";

const STEPS = [
  {
    icon: Database,
    title: "Create a Supabase project",
    text: "Go to supabase.com, create a project, then open the SQL editor and run supabase/schema.sql followed by supabase/policies.sql.",
  },
  {
    icon: KeyRound,
    title: "Add the environment variables",
    text: "Copy .env.example to .env.local and fill NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY from Project settings → API.",
  },
  {
    icon: Terminal,
    title: "Seed the content",
    text: "Run npm run db:seed to insert every page text, automation, package, card and FAQ. Then restart the dev server and reload this page.",
  },
];

/** Shown instead of the admin when Supabase keys are missing. */
export function SetupScreen() {
  return (
    <div
      dir="ltr"
      className="flex min-h-screen items-center justify-center p-6"
    >
      <div className="w-full max-w-xl">
        <Logo size={38} href="/" />
        <h1 className="mt-7 font-display text-2xl font-extrabold">
          Connect Supabase
        </h1>
        <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
          The admin needs a Supabase project before it can load. The public
          website keeps working with the bundled starter content until then.
        </p>

        <ol className="mt-8 space-y-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="card flex gap-4 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-sky">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h2 className="font-display text-[14.5px] font-bold">
                    {index + 1}. {step.title}
                  </h2>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">
                    {step.text}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-6 text-[12.5px] text-muted">
          Full instructions, including how to change the WhatsApp number, are in
          the project README.
        </p>
      </div>
    </div>
  );
}
