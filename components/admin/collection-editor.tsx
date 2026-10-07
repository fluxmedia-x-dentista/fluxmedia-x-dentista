"use client";

import { useState } from "react";
import { ChevronDown, Loader2, Plus } from "lucide-react";

import {
  DeleteButton,
  EmptyState,
  Input,
  MLInput,
  SaveBar,
  Select,
  Toggle,
  api,
} from "@/components/admin/kit";
import { useToast } from "@/components/admin/toast";
import type { ML } from "@/lib/types";
import { cn } from "@/lib/utils";

export type CollectionField = {
  name: string;
  label: string;
  type: "text" | "number" | "url" | "ml" | "mlarea" | "bool" | "select";
  options?: { value: string; label: string }[];
  hint?: string;
  full?: boolean;
};

export type CollectionRow = Record<string, unknown> & { id: string };

const TEMP_PREFIX = "new-";

/**
 * Generic list editor for the small database-backed collections
 * (categories, navigation, footer links, FAQs, services, templates…).
 * Rows are expandable cards with Save-all at the bottom.
 */
export function CollectionEditor({
  resource,
  title,
  sub,
  fields,
  rows: initialRows,
  defaults,
  rowTitleField,
  rowTitleLocale,
  rowBadgeField,
  sortable = true,
  addLabel = "Add row",
  compact = false,
}: {
  resource: string;
  title: string;
  sub?: string;
  fields: CollectionField[];
  rows: CollectionRow[];
  defaults: Record<string, unknown>;
  rowTitleField?: string;
  rowTitleLocale?: "en" | "fr" | "ar";
  rowBadgeField?: string;
  sortable?: boolean;
  addLabel?: string;
  /** Renders as an embedded block (h2 + inline save) instead of a full page. */
  compact?: boolean;
}) {
  const toast = useToast();
  const [rows, setRows] = useState<CollectionRow[]>(initialRows);
  const [dirty, setDirty] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function getRowTitle(row: CollectionRow) {
    if (!rowTitleField) return "";

    const value = row[rowTitleField];

    if (value && typeof value === "object") {
      const localized = value as Record<string, unknown>;
      const locale = rowTitleLocale ?? "en";

      return String(
        localized[locale] ??
          localized.en ??
          localized.fr ??
          localized.ar ??
          "",
      );
    }

    return String(value ?? "");
  }

  function getRowBadge(row: CollectionRow) {
    if (!rowBadgeField) return null;

    const value = row[rowBadgeField];

    if (value === null || value === undefined || value === "") {
      return null;
    }

    return String(value);
  }

  function markDirty(id: string) {
    setDirty((current) => new Set(current).add(id));
  }

  function update(id: string, name: string, value: unknown) {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, [name]: value } : row)),
    );
    markDirty(id);
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= rows.length) return;
    const next = [...rows];
    [next[index], next[target]] = [next[target], next[index]];
    const reordered = next.map((row, position) => ({
      ...row,
      sort_order: position + 1,
    }));
    setRows(reordered);
    setDirty(new Set(reordered.map((row) => row.id)));
  }

  function addRow() {
    const id = `${TEMP_PREFIX}${Date.now()}`;
    const row: CollectionRow = {
      ...defaults,
      id,
      sort_order: rows.length + 1,
    };
    setRows((current) => [...current, row]);
    markDirty(id);
    setOpen(id);
  }

  async function remove(row: CollectionRow) {
    if (row.id.startsWith(TEMP_PREFIX)) {
      setRows((current) => current.filter((item) => item.id !== row.id));
      return;
    }
    try {
      await api(`/api/admin/${resource}?id=${row.id}`, { method: "DELETE" });
      setRows((current) => current.filter((item) => item.id !== row.id));
      toast.success("Deleted");
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  async function save() {
    if (dirty.size === 0) {
      toast.push("Nothing to save");
      return;
    }
    setSaving(true);
    try {
      const updated: CollectionRow[] = [...rows];

      for (const id of dirty) {
        const index = updated.findIndex((row) => row.id === id);
        if (index === -1) continue;
        const row = updated[index];
        const payload: Record<string, unknown> = {};
        for (const field of fields) payload[field.name] = row[field.name];
        if (sortable) payload.sort_order = row.sort_order;

        if (id.startsWith(TEMP_PREFIX)) {
          const result = await api<{ data: CollectionRow }>(
            `/api/admin/${resource}`,
            { method: "POST", body: JSON.stringify(payload) },
          );
          updated[index] = result.data;
        } else {
          await api(`/api/admin/${resource}?id=${id}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
          });
        }
      }

      setRows(updated);
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
          {compact ? (
            <h2 className="font-display text-lg font-bold">{title}</h2>
          ) : (
            <h1 className="font-display text-2xl font-extrabold">{title}</h1>
          )}
          {sub ? <p className="mt-1.5 text-[13px] text-muted">{sub}</p> : null}
        </div>
        <button type="button" onClick={addRow} className="btn-brand btn-sm">
          <Plus className="h-3.5 w-3.5" />
          {addLabel}
        </button>
      </div>

      {rows.length === 0 ? (
        <EmptyState text="Nothing here yet. Use the button above to add the first row." />
      ) : (
        <ul className="flex flex-col gap-3">
          {rows.map((row, index) => {
            const expanded = open === row.id;
            const badge = getRowBadge(row);
            return (
              <li key={row.id} className="card overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3">
                  {sortable ? (
                    <div className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => move(index, -1)}
                        className="text-muted hover:text-ink"
                        aria-label="Move up"
                      >
                        <ChevronDown className="h-3.5 w-3.5 rotate-180" />
                      </button>
                      <button
                        type="button"
                        onClick={() => move(index, 1)}
                        className="text-muted hover:text-ink"
                        aria-label="Move down"
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : row.id)}
                    className="flex flex-1 items-center gap-2 text-start"
                  >
                    <span className="font-display text-[14px] font-bold">
                      {getRowTitle(row) || "Untitled"}
                    </span>
                    {badge ? (
                      <span className="rounded-full bg-surface2 px-2 py-0.5 text-[11px] text-muted">
                        {badge}
                      </span>
                    ) : null}
                    {dirty.has(row.id) ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-sky" />
                    ) : null}
                  </button>

                  <DeleteButton
                    label=""
                    description={`"${getRowTitle(row) || "Untitled"}" will be removed from the website.`}
                    onConfirm={() => remove(row)}
                  />

                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : row.id)}
                    className="rounded-lg p-1.5 text-muted hover:bg-surface2 hover:text-ink"
                    aria-label={expanded ? "Collapse" : "Expand"}
                    aria-expanded={expanded}
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        expanded && "rotate-180",
                      )}
                    />
                  </button>
                </div>

                {expanded ? (
                  <div className="grid gap-4 border-t border-line/10 bg-surface2/30 p-4 sm:grid-cols-2">
                    {fields.map((field) => {
                      const value = row[field.name];
                      const wrapper = field.full || field.type === "mlarea";
                      return (
                        <div
                          key={field.name}
                          className={wrapper ? "sm:col-span-2" : undefined}
                        >
                          {field.type === "ml" || field.type === "mlarea" ? (
                            <MLInput
                              label={field.label}
                              hint={field.hint}
                              value={value as ML}
                              multiline={field.type === "mlarea"}
                              rows={3}
                              onChange={(next) =>
                                update(row.id, field.name, next)
                              }
                            />
                          ) : field.type === "bool" ? (
                            <Toggle
                              label={field.label}
                              hint={field.hint}
                              checked={Boolean(value)}
                              onChange={(next) =>
                                update(row.id, field.name, next)
                              }
                            />
                          ) : field.type === "select" ? (
                            <Select
                              label={field.label}
                              value={String(value ?? "")}
                              onChange={(next) =>
                                update(row.id, field.name, next)
                              }
                              options={field.options ?? []}
                            />
                          ) : (
                            <Input
                              label={field.label}
                              hint={field.hint}
                              type={field.type === "number" ? "number" : "text"}
                              value={
                                value === null || value === undefined
                                  ? ""
                                  : (value as string | number)
                              }
                              onChange={(next) =>
                                update(
                                  row.id,
                                  field.name,
                                  field.type === "number"
                                    ? next === ""
                                      ? null
                                      : Number(next)
                                    : next,
                                )
                              }
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}

      {compact ? (
        <div className="mt-4 flex items-center justify-end gap-3">
          <p className="text-[12px] text-muted">
            {dirty.size > 0
              ? `${dirty.size} row${dirty.size === 1 ? "" : "s"} changed.`
              : "All changes saved."}
          </p>
          <button
            type="button"
            onClick={() => void save()}
            disabled={saving}
            className="btn-brand btn-sm"
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
            Save
          </button>
        </div>
      ) : (
        <SaveBar
          onSave={() => void save()}
          saving={saving}
          dirty={dirty.size > 0}
          note={
            dirty.size > 0
              ? `${dirty.size} row${dirty.size === 1 ? "" : "s"} changed.`
              : "All changes saved."
          }
        />
      )}
    </div>
  );
}