"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

import { MLInput } from "@/components/admin/kit";
import type { ML, WorkflowStep } from "@/lib/types";

const EMPTY_ML: ML = { en: "", fr: "", ar: "" };

function RowFrame({
  index,
  onMove,
  onRemove,
  children,
}: {
  index: number;
  onMove: (direction: -1 | 1) => void;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line/15 bg-surface2/40 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
          {index + 1}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onMove(-1)}
            className="rounded-lg p-1.5 text-muted hover:bg-surface2 hover:text-ink"
            aria-label="Move up"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            className="rounded-lg p-1.5 text-muted hover:bg-surface2 hover:text-ink"
            aria-label="Move down"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="rounded-lg p-1.5 text-rose-300 hover:bg-rose-500/10"
            aria-label="Remove"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

function move<T>(items: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

/** Editor for a list of multilingual strings (benefits, specs…). */
export function MLListEditor({
  label,
  items,
  onChange,
  addLabel = "Add item",
}: {
  label: string;
  items: ML[];
  onChange: (items: ML[]) => void;
  addLabel?: string;
}) {
  return (
    <div>
      <span className="label">{label}</span>
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <RowFrame
            key={index}
            index={index}
            onMove={(direction) => onChange(move(items, index, direction))}
            onRemove={() => onChange(items.filter((_, i) => i !== index))}
          >
            <MLInput
              value={item}
              onChange={(value) => {
                const next = [...items];
                next[index] = value;
                onChange(next);
              }}
            />
          </RowFrame>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, EMPTY_ML])}
          className="btn-ghost btn-sm self-start"
        >
          <Plus className="h-3.5 w-3.5" />
          {addLabel}
        </button>
      </div>
    </div>
  );
}

/** Editor for the automation workflow steps. */
export function WorkflowEditor({
  steps,
  onChange,
}: {
  steps: WorkflowStep[];
  onChange: (steps: WorkflowStep[]) => void;
}) {
  return (
    <div>
      <span className="label">How it works (steps)</span>
      <div className="flex flex-col gap-2">
        {steps.map((step, index) => (
          <RowFrame
            key={index}
            index={index}
            onMove={(direction) => onChange(move(steps, index, direction))}
            onRemove={() => onChange(steps.filter((_, i) => i !== index))}
          >
            <div className="grid gap-3">
              <MLInput
                label="Step title"
                value={step.title}
                onChange={(title) => {
                  const next = [...steps];
                  next[index] = { ...next[index], title };
                  onChange(next);
                }}
              />
              <MLInput
                label="Step detail"
                multiline
                rows={2}
                value={step.detail}
                onChange={(detail) => {
                  const next = [...steps];
                  next[index] = { ...next[index], detail };
                  onChange(next);
                }}
              />
            </div>
          </RowFrame>
        ))}
        <button
          type="button"
          onClick={() =>
            onChange([...steps, { title: EMPTY_ML, detail: EMPTY_ML }])
          }
          className="btn-ghost btn-sm self-start"
        >
          <Plus className="h-3.5 w-3.5" />
          Add step
        </button>
      </div>
    </div>
  );
}

/** Comma separated list of plain strings (integrations, platforms). */
export function TagsEditor({
  label,
  items,
  onChange,
  hint,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <input
        className="input"
        value={items.join(", ")}
        onChange={(event) =>
          onChange(
            event.target.value
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),
          )
        }
      />
      <span className="mt-1 block text-[11.5px] text-muted">
        {hint ?? "Separate with commas."}
      </span>
    </label>
  );
}
