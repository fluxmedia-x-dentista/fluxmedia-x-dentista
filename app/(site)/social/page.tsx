import type { Metadata } from "next";

import { SocialLinksGrid } from "@/components/social-links";
import { Reveal, SectionHead } from "@/components/ui";
import { getContent } from "@/lib/content/get-content";
import { getSocialLinks } from "@/lib/data/site";
import { getRequestLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent(getRequestLocale());
  return {
    title: content.t("social.links.title"),
    description: content.t("social.links.sub"),
  };
}

export default async function SocialPage() {
  const locale = getRequestLocale();
  const [content, links] = await Promise.all([
    getContent(locale),
    getSocialLinks(),
  ]);

  return (
    <section className="container-x pb-24 pt-28 sm:pt-32">
      <Reveal>
        <SectionHead
          title={content.t("social.links.title")}
          sub={content.t("social.links.sub")}
        />
      </Reveal>
      <div className="mt-12">
        <SocialLinksGrid links={links} locale={locale} />
      </div>
    </section>
  );
}
