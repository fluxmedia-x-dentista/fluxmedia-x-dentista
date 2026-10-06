"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import {
  ArrowDown,
  ArrowUp,
  Image as ImageIcon,
  Loader2,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import { useToast } from "@/components/admin/toast";
import {
  LOCALES,
  type ContentImage,
  type ContentListItem,
  type Locale,
  type ML,
} from "@/lib/types";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Fetch helper                                                               */
/* -------------------------------------------------------------------------- */

export async function api<T = unknown>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      ...(init?.body && !(init.body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  const text = await response.text();
  const json = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(json?.error ?? `Request failed (${response.status})`);
  }
  return json as T;
}

/* -------------------------------------------------------------------------- */
/* Layout primitives                                                          */
/* -------------------------------------------------------------------------- */

export function PageHeader({
  title,
  sub,
  actions,
}: {
  title: string;
  sub?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-extrabold">{title}</h1>
        {sub ? <p className="mt-1.5 text-[13px] text-muted">{sub}</p> : null}
      </div>
      {actions ? (
        <div className="flex items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}

export function Panel({
  title,
  sub,
  actions,
  children,
  className,
}: {
  title?: string;
  sub?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("card p-5", className)}>
      {title ? (
        <header className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-[15px] font-bold">{title}</h2>
            {sub ? (
              <p className="mt-1 text-[12.5px] text-muted">{sub}</p>
            ) : null}
          </div>
          {actions}
        </header>
      ) : null}
      {children}
    </section>
  );
}

export function DemoBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-300">
      Demo data
    </span>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <p className="rounded-xl border border-dashed border-line/20 px-4 py-8 text-center text-[13px] text-muted">
      {text}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* Inputs                                                                     */
/* -------------------------------------------------------------------------- */

export function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  hint,
  disabled,
}: {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      {label ? <span className="label">{label}</span> : null}
      <input
        type={type}
        value={value ?? ""}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="input"
      />
      {hint ? (
        <span className="mt-1 block text-[11.5px] text-muted">{hint}</span>
      ) : null}
    </label>
  );
}

export function Textarea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      {label ? <span className="label">{label}</span> : null}
      <textarea
        rows={rows}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        className="input resize-y"
      />
    </label>
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      {label ? <span className="label">{label}</span> : null}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="input"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <div>
        <p className="text-[13px] font-medium">{label}</p>
        {hint ? <p className="text-[11.5px] text-muted">{hint}</p> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-brand" : "bg-surface2 ring-1 ring-line/20",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all",
            checked ? "left-[22px]" : "left-0.5",
          )}
        />
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Multilingual input with EN / FR / AR tabs                                  */
/* -------------------------------------------------------------------------- */

const EMPTY_ML: ML = { en: "", fr: "", ar: "" };

export function MLInput({
  label,
  value,
  onChange,
  multiline = false,
  rows = 4,
  hint,
}: {
  label?: string;
  value: ML | null | undefined;
  onChange: (value: ML) => void;
  multiline?: boolean;
  rows?: number;
  hint?: string;
}) {
  const [tab, setTab] = useState<Locale>("en");
  const current = value ?? EMPTY_ML;

  const update = (locale: Locale, text: string) =>
    onChange({ ...EMPTY_ML, ...current, [locale]: text });

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        {label ? <span className="label mb-0">{label}</span> : <span />}
        <div className="inline-flex rounded-full border border-line/20 bg-surface2/60 p-0.5">
          {LOCALES.map((locale) => {
            const filled = Boolean(current[locale]?.trim());
            return (
              <button
                key={locale}
                type="button"
                onClick={() => setTab(locale)}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase transition-colors",
                  tab === locale
                    ? "bg-brand text-white"
                    : "text-muted hover:text-ink",
                )}
              >
                {locale}
                {!filled ? <span aria-hidden="true">·</span> : null}
              </button>
            );
          })}
        </div>
      </div>

      {multiline ? (
        <textarea
          dir={tab === "ar" ? "rtl" : "ltr"}
          rows={rows}
          value={current[tab] ?? ""}
          onChange={(event) => update(tab, event.target.value)}
          className="input resize-y"
        />
      ) : (
        <input
          dir={tab === "ar" ? "rtl" : "ltr"}
          value={current[tab] ?? ""}
          onChange={(event) => update(tab, event.target.value)}
          className="input"
        />
      )}
      {hint ? (
        <span className="mt-1 block text-[11.5px] text-muted">{hint}</span>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Image field (upload to Supabase Storage / pick from the media library)      */
/* -------------------------------------------------------------------------- */

type MediaAssetRow = { id: string; url: string; alt: string | null };

export function ImageField({
  label,
  value,
  onChange,
  withOverlay = false,
}: {
  label?: string;
  value: ContentImage | null | undefined;
  onChange: (value: ContentImage) => void;
  withOverlay?: boolean;
}) {
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [assets, setAssets] = useState<MediaAssetRow[]>([]);

  const current: ContentImage = value ?? {
    url: "",
    alt: EMPTY_ML,
    overlay: 55,
  };

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const result = await api<{ url: string }>("/api/admin/media/upload", {
        method: "POST",
        body: form,
      });
      onChange({ ...current, url: result.url });
      toast.success("Image uploaded");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function openLibrary() {
    setLibraryOpen(true);
    try {
      const result = await api<{ data: MediaAssetRow[] }>(
        "/api/admin/media_assets?limit=60",
      );
      setAssets(result.data ?? []);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <div>
      {label ? <span className="label">{label}</span> : null}

      <div className="flex gap-4">
        <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-xl border border-line/20 bg-surface2">
          {current.url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={current.url}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-muted">
              <ImageIcon className="h-5 w-5" />
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
            onChange={upload}
            className="hidden"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="btn-ghost btn-sm"
            >
              {uploading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Upload className="h-3.5 w-3.5" />
              )}
              Upload
            </button>
            <button
              type="button"
              onClick={openLibrary}
              className="btn-ghost btn-sm"
            >
              <ImageIcon className="h-3.5 w-3.5" />
              Library
            </button>
            {current.url ? (
              <button
                type="button"
                onClick={() => onChange({ ...current, url: "" })}
                className="btn-ghost btn-sm text-rose-300"
              >
                <X className="h-3.5 w-3.5" />
                Remove
              </button>
            ) : null}
          </div>

          <Input
            label="Image URL"
            value={current.url}
            onChange={(url) => onChange({ ...current, url })}
            placeholder="/images/backgrounds/home.svg"
          />
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <MLInput
          label="Alt text"
          value={current.alt}
          onChange={(alt) => onChange({ ...current, alt })}
        />
        {withOverlay ? (
          <label className="block">
            <span className="label">Overlay strength ({current.overlay}%)</span>
            <input
              type="range"
              min={0}
              max={100}
              value={current.overlay}
              onChange={(event) =>
                onChange({ ...current, overlay: Number(event.target.value) })
              }
              className="w-full accent-[#2F5BFB]"
            />
          </label>
        ) : null}
      </div>

      {libraryOpen ? (
        <Modal title="Media library" onClose={() => setLibraryOpen(false)}>
          {assets.length === 0 ? (
            <EmptyState text="No uploads yet." />
          ) : (
            <div className="grid max-h-[60vh] grid-cols-3 gap-3 overflow-y-auto">
              {assets.map((asset) => (
                <button
                  key={asset.id}
                  type="button"
                  onClick={() => {
                    onChange({ ...current, url: asset.url });
                    setLibraryOpen(false);
                  }}
                  className="overflow-hidden rounded-xl border border-line/20 transition-colors hover:border-sky/50"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset.url}
                    alt={asset.alt ?? ""}
                    className="aspect-video w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </Modal>
      ) : null}
    </div>
  );
}

/** Single-URL image field for plain `*_url` columns (no alt / overlay). */
export function SimpleImageField({
  label,
  value,
  onChange,
  hint,
}: {
  label?: string;
  value: string | null;
  onChange: (value: string | null) => void;
  hint?: string;
}) {
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const result = await api<{ url: string }>("/api/admin/media/upload", {
        method: "POST",
        body: form,
      });
      onChange(result.url);
      toast.success("Image uploaded");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      {label ? <span className="label">{label}</span> : null}
      <div className="flex gap-4">
        <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border border-line/20 bg-surface2">
          {value ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-muted">
              <ImageIcon className="h-5 w-5" />
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
            onChange={upload}
            className="hidden"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="btn-ghost btn-sm"
            >
              {uploading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Upload className="h-3.5 w-3.5" />
              )}
              Upload
            </button>
            {value ? (
              <button
                type="button"
                onClick={() => onChange(null)}
                className="btn-ghost btn-sm text-rose-300"
              >
                <X className="h-3.5 w-3.5" />
                Remove
              </button>
            ) : null}
          </div>
          <input
            className="input"
            value={value ?? ""}
            placeholder="/images/automations/example.svg"
            onChange={(event) => onChange(event.target.value || null)}
          />
          {hint ? (
            <span className="text-[11.5px] text-muted">{hint}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* List editor                                                                */
/* -------------------------------------------------------------------------- */

export function ListEditor({
  items,
  onChange,
  fields = ["title", "text"],
  labels = { title: "Title", text: "Text", extra: "Extra" },
  addLabel = "Add row",
}: {
  items: ContentListItem[];
  onChange: (items: ContentListItem[]) => void;
  fields?: ("title" | "text" | "extra")[];
  labels?: { title?: string; text?: string; extra?: string };
  addLabel?: string;
}) {
  const update = (index: number, patch: Partial<ContentListItem>) => {
    const next = [...items];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <div
          key={item.id ?? index}
          className="rounded-xl border border-line/15 bg-surface2/40 p-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
              Row {index + 1}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                className="rounded-lg p-1.5 text-muted hover:bg-surface2 hover:text-ink"
                aria-label="Move up"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                className="rounded-lg p-1.5 text-muted hover:bg-surface2 hover:text-ink"
                aria-label="Move down"
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onChange(items.filter((_, i) => i !== index))}
                className="rounded-lg p-1.5 text-rose-300 hover:bg-rose-500/10"
                aria-label="Remove row"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="grid gap-3">
            {fields.includes("title") ? (
              <MLInput
                label={labels.title}
                value={item.title}
                onChange={(title) => update(index, { title })}
              />
            ) : null}
            {fields.includes("text") ? (
              <MLInput
                label={labels.text}
                value={item.text}
                multiline
                rows={2}
                onChange={(text) => update(index, { text })}
              />
            ) : null}
            {fields.includes("extra") ? (
              <MLInput
                label={labels.extra}
                value={item.extra}
                onChange={(extra) => update(index, { extra })}
              />
            ) : null}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          onChange([
            ...items,
            {
              id: `row-${Date.now()}`,
              title: EMPTY_ML,
              text: EMPTY_ML,
              extra: EMPTY_ML,
            },
          ])
        }
        className="btn-ghost btn-sm self-start"
      >
        <Plus className="h-3.5 w-3.5" />
        {addLabel}
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Table, badges, modal, save bar                                             */
/* -------------------------------------------------------------------------- */

export function Table({
  head,
  children,
}: {
  head: ReactNode[];
  children: ReactNode;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[620px] text-start text-[13px]">
        <thead>
          <tr className="border-b border-line/15 text-[11px] uppercase tracking-wider text-muted">
            {head.map((cell, index) => (
              <th key={index} className="px-3 py-2.5 text-start font-semibold">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line/10">{children}</tbody>
      </table>
    </div>
  );
}

const BADGE_TONES: Record<string, string> = {
  neutral: "border-line/25 bg-surface2 text-muted",
  blue: "border-sky/30 bg-sky/10 text-sky",
  violet: "border-violet/40 bg-violet/15 text-violet",
  green: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
  amber: "border-amber-400/30 bg-amber-500/10 text-amber-300",
  rose: "border-rose-400/30 bg-rose-500/10 text-rose-300",
  dentista: "border-dentista/40 bg-dentista/10 text-dentista",
};

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: keyof typeof BADGE_TONES;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
        BADGE_TONES[tone] ?? BADGE_TONES.neutral,
      )}
    >
      {children}
    </span>
  );
}

export function Modal({
  title,
  children,
  onClose,
  footer,
  wide = false,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "relative w-full rounded-2xl border border-line/20 bg-surface p-5 shadow-card",
          wide ? "max-w-3xl" : "max-w-lg",
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-[15px] font-bold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted hover:bg-surface2 hover:text-ink"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
        {footer ? (
          <div className="mt-5 flex justify-end gap-2">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}

export function DeleteButton({
  onConfirm,
  label = "Delete",
  description = "This cannot be undone.",
}: {
  onConfirm: () => Promise<void> | void;
  label?: string;
  description?: string;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold text-rose-300 transition-colors hover:bg-rose-500/10"
      >
        <Trash2 className="h-3.5 w-3.5" />
        {label}
      </button>

      {open ? (
        <Modal
          title="Are you sure?"
          onClose={() => setOpen(false)}
          footer={
            <>
              <button
                type="button"
                className="btn-ghost btn-sm"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={busy}
                className="btn btn-sm bg-rose-500 text-white hover:brightness-110"
                onClick={async () => {
                  setBusy(true);
                  try {
                    await onConfirm();
                    setOpen(false);
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                Delete
              </button>
            </>
          }
        >
          <p className="text-[13px] text-muted">{description}</p>
        </Modal>
      ) : null}
    </>
  );
}

export function SaveBar({
  onSave,
  onCancel,
  saving,
  dirty,
  note,
}: {
  onSave: () => void;
  onCancel?: () => void;
  saving?: boolean;
  dirty?: boolean;
  note?: string;
}) {
  return (
    <div className="sticky bottom-0 z-20 -mx-4 mt-8 border-t border-line/15 bg-bg/85 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[12px] text-muted">
          {note ?? (dirty ? "You have unsaved changes." : "All changes saved.")}
        </p>
        <div className="flex items-center gap-2">
          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="btn-ghost btn-sm"
            >
              Cancel
            </button>
          ) : null}
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="btn-brand btn-sm"
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
