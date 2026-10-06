import Link from "next/link";

/**
 * Shown on the public site when Supabase is not configured yet. The site keeps
 * working from the bundled seed content so it can be previewed, but nothing is
 * editable until the database is connected.
 */
export function SetupNotice() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-amber-400/30 bg-amber-500/10 backdrop-blur-xl">
      <div className="container-x flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-[12.5px] text-amber-200">
        <strong className="font-semibold">Preview mode</strong>
        <span className="text-amber-200/80">
          Supabase is not connected — content comes from the bundled seed data
          and nothing can be saved.
        </span>
        <Link
          href="/admin"
          className="font-semibold underline underline-offset-4"
        >
          Connect Supabase
        </Link>
      </div>
    </div>
  );
}
