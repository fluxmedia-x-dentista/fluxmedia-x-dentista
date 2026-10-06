import Link from "next/link";

import { getContent } from "@/lib/content/get-content";
import { getRequestLocale } from "@/lib/locale";

export default async function NotFound() {
  const locale = getRequestLocale();
  const content = await getContent(locale);

  return (
    <main className="container-x flex min-h-screen flex-col items-center justify-center gap-5 py-24 text-center">
      <span className="font-display text-7xl font-extrabold grad-text">
        404
      </span>
      <h1 className="font-display text-2xl font-bold">
        {content.t("ui.notfound.title")}
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-muted">
        {content.t("ui.notfound.sub")}
      </p>
      <Link href="/" className="btn-brand">
        {content.t("ui.notfound.cta")}
      </Link>
    </main>
  );
}
