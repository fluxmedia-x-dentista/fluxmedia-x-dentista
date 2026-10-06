import type { Metadata } from "next";

import { Markdown } from "@/components/markdown";
import { getContent } from "@/lib/content/get-content";
import { getRequestLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent(getRequestLocale());
  return { title: content.t("privacy.title") };
}

export default async function PrivacyPage() {
  const content = await getContent(getRequestLocale());

  return (
    <article className="container-x max-w-3xl pb-24 pt-28 sm:pt-32">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
        {content.t("privacy.title")}
      </h1>
      <div className="mt-8">
        <Markdown source={content.t("privacy.body")} />
      </div>
    </article>
  );
}
