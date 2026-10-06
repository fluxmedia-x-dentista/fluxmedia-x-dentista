import { ArrowIcon, PlatformGlyph } from "@/components/ui";
import type { Locale, SocialLink } from "@/lib/types";
import { L } from "@/lib/utils";

export function SocialLinksGrid({
  links,
  locale,
}: {
  links: SocialLink[];
  locale: Locale;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card group flex flex-col gap-3 p-5 transition-all hover:-translate-y-1 hover:border-sky/40"
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky/15 text-sky">
            <PlatformGlyph id={link.platform} />
          </span>
          <div>
            <h3 className="font-display text-[15px] font-bold">{link.name}</h3>
            <p className="text-[12.5px] text-muted">{link.username}</p>
          </div>
          <p className="text-[13px] leading-relaxed text-muted">
            {L(link.description, locale)}
          </p>
          <span className="mt-auto inline-flex items-center gap-2 pt-2 text-[13px] font-semibold text-sky">
            Open
            <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </a>
      ))}
    </div>
  );
}
