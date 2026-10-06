"use client";

import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";

import {
  ImageField,
  Input,
  ListEditor,
  MLInput,
  Panel,
  SaveBar,
  Toggle,
  api,
} from "@/components/admin/kit";
import { useToast } from "@/components/admin/toast";
import type {
  ContentEntry,
  ContentImage,
  ContentLink,
  ContentListItem,
  ContentValue,
  ML,
} from "@/lib/types";
import { cn } from "@/lib/utils";

export type ContentEditorSection = {
  section: string;
  entries: ContentEntry[];
};

const EMPTY_ML: ML = { en: "", fr: "", ar: "" };

function Field({
  entry,
  value,
  onChange,
}: {
  entry: ContentEntry;
  value: ContentValue;
  onChange: (value: ContentValue) => void;
}) {
  switch (entry.kind) {
    case "text":
      return (
        <MLInput
          label={entry.label}
          hint={entry.help}
          value={value as ML}
          onChange={onChange}
        />
      );
    case "textarea":
    case "richtext":
      return (
        <MLInput
          label={entry.label}
          hint={
            entry.help ??
            (entry.kind === "richtext"
              ? "Markdown: ## heading, - list item, **bold**, [link](https://…)"
              : undefined)
          }
          value={value as ML}
          multiline
          rows={entry.kind === "richtext" ? 14 : 3}
          onChange={onChange}
        />
      );
    case "image":
      return (
        <ImageField
          label={entry.label}
          value={value as ContentImage}
          withOverlay
          onChange={onChange}
        />
      );
    case "link": {
      const link = (value as ContentLink) ?? { href: "", label: EMPTY_ML };
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          <MLInput
            label={`${entry.label} — label`}
            value={link.label}
            onChange={(label) => onChange({ ...link, label })}
          />
          <Input
            label={`${entry.label} — URL`}
            value={link.href}
            onChange={(href) => onChange({ ...link, href })}
          />
        </div>
      );
    }
    case "bool":
      return (
        <Toggle
          label={entry.label}
          hint={entry.help}
          checked={Boolean(value)}
          onChange={onChange}
        />
      );
    case "number":
      return (
        <Input
          label={entry.label}
          hint={entry.help}
          type="number"
          value={typeof value === "number" ? value : 0}
          onChange={(next) => onChange(Number(next))}
        />
      );
    case "list":
      return (
        <div>
          <span className="label">{entry.label}</span>
          {entry.help ? (
            <p className="-mt-1 mb-3 text-[11.5px] text-muted">{entry.help}</p>
          ) : null}
          <ListEditor
            items={(value as ContentListItem[]) ?? []}
            onChange={(items) => onChange(items)}
            fields={["title", "text", "extra"]}
          />
        </div>
      );
    default:
      return null;
  }
}

export function ContentEditor({
  title,
  sub,
  sections,
  initialValues,
  previewHref,
  children,
}: {
  title: string;
  sub?: string;
  sections: ContentEditorSection[];
  initialValues: Record<string, ContentValue>;
  previewHref?: string;
  children?: React.ReactNode;
}) {
  const toast = useToast();
  const [values, setValues] = useState(initialValues);
  const [dirty, setDirty] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [active, setActive] = useState(sections[0]?.section ?? "");

  const activeSection = useMemo(
    () => sections.find((section) => section.section === active) ?? sections[0],
    [sections, active],
  );

  function update(key: string, value: ContentValue) {
    setValues((current) => ({ ...current, [key]: value }));
    setDirty((current) => new Set(current).add(key));
  }

  async function save() {
    if (dirty.size === 0) {
      toast.push("Nothing to save");
      return;
    }
    setSaving(true);
    try {
      for (const key of dirty) {
        const entry = sections
          .flatMap((section) => section.entries)
          .find((item) => item.key === key);
        await api("/api/admin/site_content", {
          method: "POST",
          body: JSON.stringify({
            key,
            kind: entry?.kind ?? "text",
            value: values[key],
          }),
        });
      }
      setDirty(new Set());
      toast.success("Saved and published");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold">{title}</h1>
          {sub ? <p className="mt-1.5 text-[13px] text-muted">{sub}</p> : null}
        </div>
        {previewHref ? (
          <a
            href={previewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost btn-sm"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View page
          </a>
        ) : null}
      </div>

      {children}

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="lg:sticky lg:top-20 lg:self-start">
          <ul className="flex flex-wrap gap-1.5 lg:flex-col">
            {sections.map((section) => {
              const count = section.entries.filter((entry) =>
                dirty.has(entry.key),
              ).length;
              return (
                <li key={section.section}>
                  <button
                    type="button"
                    onClick={() => setActive(section.section)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-start text-[13px] transition-colors",
                      active === section.section
                        ? "bg-surface2 font-semibold text-ink"
                        : "text-muted hover:bg-surface2/60 hover:text-ink",
                    )}
                  >
                    <span className="flex-1">{section.section}</span>
                    {count > 0 ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-sky" />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-col gap-5">
          {activeSection ? (
            <Panel title={activeSection.section}>
              <div className="flex flex-col gap-6">
                {activeSection.entries.map((entry) => (
                  <div key={entry.key}>
                    <Field
                      entry={entry}
                      value={values[entry.key] ?? entry.default}
                      onChange={(value) => update(entry.key, value)}
                    />
                    <p className="mt-1.5 font-mono text-[10.5px] text-muted/70">
                      {entry.key}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>
          ) : null}
        </div>
      </div>

      <SaveBar
        onSave={() => void save()}
        saving={saving}
        dirty={dirty.size > 0}
        note={
          dirty.size > 0
            ? `${dirty.size} field${dirty.size === 1 ? "" : "s"} changed — the website updates right after saving.`
            : "All changes saved. The website updates immediately after each save."
        }
      />
    </div>
  );
}
