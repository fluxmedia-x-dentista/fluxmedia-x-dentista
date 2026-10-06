"use client";

import { useState } from "react";
import { ChevronDown, Eye, EyeOff, Loader2 } from "lucide-react";

import { api } from "@/components/admin/kit";
import { useToast } from "@/components/admin/toast";
import type { HomeSection } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Reorder and hide the home page sections. */
export function HomeSectionsEditor({
  sections: initialSections,
}: {
  sections: HomeSection[];
}) {
  const toast = useToast();
  const [sections, setSections] = useState(initialSections);
  const [saving, setSaving] = useState(false);

  async function persist(next: HomeSection[]) {
    setSections(next);
    setSaving(true);
    try {
      for (const section of next) {
        await api(`/api/admin/home_sections?id=${section.key}`, {
          method: "PATCH",
          body: JSON.stringify({
            sort_order: section.sort_order,
            visible: section.visible,
          }),
        });
      }
      toast.success("Home layout updated");
    } catch (error) {
      toast.error((error as Error).message);
      setSections(initialSections);
    } finally {
      setSaving(false);
    }
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= sections.length) return;
    const next = [...sections];
    [next[index], next[target]] = [next[target], next[index]];
    void persist(
      next.map((section, position) => ({
        ...section,
        sort_order: position + 1,
      })),
    );
  }

  function toggle(key: string) {
    void persist(
      sections.map((section) =>
        section.key === key
          ? { ...section, visible: !section.visible }
          : section,
      ),
    );
  }

  return (
    <section className="card mb-6 p-5">
      <header className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-[15px] font-bold">
            Sections & order
          </h2>
          <p className="mt-1 text-[12.5px] text-muted">
            Drag-free reordering: move a section up or down, or hide it from the
            home page. Changes publish immediately.
          </p>
        </div>
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted" />
        ) : null}
      </header>

      <ul className="flex flex-col gap-2">
        {sections.map((section, index) => (
          <li
            key={section.key}
            className={cn(
              "flex items-center gap-3 rounded-xl border border-line/15 bg-surface2/40 px-3 py-2.5",
              !section.visible && "opacity-55",
            )}
          >
            <span className="w-6 text-center font-mono text-[11px] text-muted">
              {index + 1}
            </span>
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => move(index, -1)}
                className="text-muted hover:text-ink"
                aria-label={`Move ${section.label} up`}
              >
                <ChevronDown className="h-3.5 w-3.5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                className="text-muted hover:text-ink"
                aria-label={`Move ${section.label} down`}
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
            <span className="flex-1 text-[13.5px] font-medium">
              {section.label}
            </span>
            <span className="font-mono text-[11px] text-muted">
              {section.key}
            </span>
            <button
              type="button"
              onClick={() => toggle(section.key)}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold text-muted transition-colors hover:bg-surface2 hover:text-ink"
            >
              {section.visible ? (
                <>
                  <Eye className="h-3.5 w-3.5" />
                  Visible
                </>
              ) : (
                <>
                  <EyeOff className="h-3.5 w-3.5" />
                  Hidden
                </>
              )}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
