"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { useI18n } from "@/components/providers";
import type { Faq } from "@/lib/types";
import { cn, L } from "@/lib/utils";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  const { locale } = useI18n();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {faqs.map((faq) => {
        const open = openId === faq.id;
        return (
          <div
            key={faq.id}
            className={cn(
              "card overflow-hidden transition-colors",
              open && "border-sky/30",
            )}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : faq.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
            >
              <span className="text-[14.5px] font-semibold">
                {L(faq.question, locale)}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-muted transition-transform",
                  open && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-[13.5px] leading-relaxed text-muted">
                  {L(faq.answer, locale)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
