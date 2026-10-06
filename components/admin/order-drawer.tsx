"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Copy, Loader2, MessageCircle, Plus, X } from "lucide-react";

import {
  Badge,
  DeleteButton,
  Input,
  Select,
  api,
} from "@/components/admin/kit";
import { useToast } from "@/components/admin/toast";
import { formatAdminDateTime, formatPriceMAD } from "@/lib/format";
import type {
  Locale,
  Order,
  OrderEvent,
  OrderStatus,
  PaymentStatus,
  ReplyTemplate,
} from "@/lib/types";
import { L, cn } from "@/lib/utils";

export const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "click", label: "Click" },
  { value: "in_conversation", label: "In conversation" },
  { value: "confirmed", label: "Confirmed" },
  { value: "in_progress", label: "In progress" },
  { value: "delivered", label: "Delivered" },
  { value: "completed", label: "Completed" },
  { value: "no_response", label: "No response" },
  { value: "cancelled", label: "Cancelled" },
];

export const PAYMENT_OPTIONS: { value: PaymentStatus; label: string }[] = [
  { value: "unpaid", label: "Unpaid" },
  { value: "deposit_paid", label: "Deposit paid" },
  { value: "paid", label: "Paid" },
];

export function statusTone(status: OrderStatus) {
  switch (status) {
    case "completed":
    case "delivered":
      return "green" as const;
    case "cancelled":
    case "no_response":
      return "rose" as const;
    case "click":
      return "amber" as const;
    case "confirmed":
    case "in_progress":
      return "blue" as const;
    default:
      return "neutral" as const;
  }
}

function applyTemplate(body: string, order: Order, locale: Locale): string {
  return body
    .replace(/\{client_name\}/g, order.client_name || "")
    .replace(/\{item\}/g, order.item_title || "")
    .replace(/\{qty\}/g, order.quantity ? String(order.quantity) : "")
    .replace(
      /\{price\}/g,
      order.total_price_mad === null
        ? ""
        : (formatPriceMAD(order.total_price_mad, locale) ?? ""),
    )
    .replace(/\{order_no\}/g, order.order_no)
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

export function OrderDrawer({
  order,
  templates,
  canDelete,
  onClose,
  onPatch,
  onDelete,
}: {
  order: Order;
  templates: ReplyTemplate[];
  canDelete: boolean;
  onClose: () => void;
  onPatch: (patch: Partial<Order>) => Promise<void>;
  onDelete: () => Promise<void>;
}) {
  const toast = useToast();
  const [events, setEvents] = useState<OrderEvent[]>([]);
  const [note, setNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [templateKey, setTemplateKey] = useState("");
  const [message, setMessage] = useState("");

  const locale = order.locale ?? "en";

  const loadEvents = useCallback(async () => {
    try {
      const result = await api<{ data: OrderEvent[] }>(
        `/api/admin/order_events?order_id=${order.id}&limit=100`,
      );
      setEvents(result.data ?? []);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, [order.id, toast]);

  useEffect(() => {
    void loadEvents();
  }, [loadEvents]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const relevantTemplates = useMemo(
    () =>
      templates.filter(
        (template) =>
          template.active &&
          (template.service_type === order.service_type ||
            template.service_type === "general"),
      ),
    [templates, order.service_type],
  );

  async function addNote() {
    if (!note.trim()) return;
    setSavingNote(true);
    try {
      await api("/api/admin/order_events", {
        method: "POST",
        body: JSON.stringify({
          order_id: order.id,
          kind: "note",
          text: note.trim(),
          actor: "admin",
        }),
      });
      setNote("");
      await loadEvents();
      toast.success("Note added");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSavingNote(false);
    }
  }

  const phone = (order.client_phone ?? "").replace(/[^\d]/g, "");
  const waHref = phone
    ? `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ""}`
    : null;

  return (
    <div className="fixed inset-0 z-[60]" dir="ltr">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Order ${order.order_no}`}
        className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col border-l border-line/15 bg-surface shadow-card"
      >
        <header className="flex items-start justify-between gap-3 border-b border-line/10 px-5 py-4">
          <div>
            <p className="font-mono text-[12px] text-muted">{order.order_no}</p>
            <h2 className="font-display text-lg font-bold">
              {order.item_title ?? "Order"}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge tone={statusTone(order.status)}>
                {order.status.replace(/_/g, " ")}
              </Badge>
              <Badge
                tone={order.payment_status === "paid" ? "green" : "neutral"}
              >
                {order.payment_status.replace(/_/g, " ")}
              </Badge>
              <Badge tone="neutral">{order.locale.toUpperCase()}</Badge>
              {order.click_count > 1 ? (
                <Badge tone="violet">{order.click_count} clicks</Badge>
              ) : null}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted hover:bg-surface2 hover:text-ink"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <section className="grid gap-3 sm:grid-cols-2">
            <Select
              label="Status"
              value={order.status}
              onChange={(value) =>
                void onPatch({ status: value as OrderStatus })
              }
              options={STATUS_OPTIONS}
            />
            <Select
              label="Payment"
              value={order.payment_status}
              onChange={(value) =>
                void onPatch({ payment_status: value as PaymentStatus })
              }
              options={PAYMENT_OPTIONS}
            />
            <Input
              label="Client name"
              value={order.client_name ?? ""}
              onChange={(value) => void onPatch({ client_name: value })}
            />
            <Input
              label="Phone"
              value={order.client_phone ?? ""}
              onChange={(value) => void onPatch({ client_phone: value })}
              hint="Digits only, with country code: 2126…"
            />
            <Input
              label="Business"
              value={order.business_name ?? ""}
              onChange={(value) => void onPatch({ business_name: value })}
            />
            <Input
              label="City"
              value={order.city ?? ""}
              onChange={(value) => void onPatch({ city: value })}
            />
            <Input
              label="Delivery date"
              type="date"
              value={order.delivery_date ?? ""}
              onChange={(value) =>
                void onPatch({ delivery_date: value || null })
              }
            />
            <Input
              label="Assigned to"
              value={order.assigned_to ?? ""}
              onChange={(value) => void onPatch({ assigned_to: value })}
            />
          </section>

          <section className="mt-5 rounded-xl border border-line/15 bg-surface2/40 p-4 text-[12.5px]">
            <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Service</dt>
                <dd>{order.service_type.replace(/_/g, " ")}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Reference</dt>
                <dd className="font-mono text-[11.5px]">
                  {order.item_ref || "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Card type</dt>
                <dd>{order.card_type ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Quantity</dt>
                <dd>{order.quantity ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Unit price</dt>
                <dd>
                  {order.unit_price_mad === null
                    ? "—"
                    : formatPriceMAD(order.unit_price_mad, "en")}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Total</dt>
                <dd>
                  {order.total_price_mad === null
                    ? "—"
                    : formatPriceMAD(order.total_price_mad, "en")}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Source</dt>
                <dd>{order.source.replace(/_/g, " ")}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Created</dt>
                <dd>{formatAdminDateTime(order.created_at)}</dd>
              </div>
            </dl>
          </section>

          <section className="mt-5">
            <label className="label">Internal notes</label>
            <textarea
              rows={3}
              className="input resize-y"
              value={order.notes ?? ""}
              onChange={(event) => void onPatch({ notes: event.target.value })}
            />
          </section>

          <section className="mt-6">
            <h3 className="mb-3 font-display text-[14px] font-bold">
              Reply on WhatsApp
            </h3>
            <div className="grid gap-3">
              <Select
                label="Template"
                value={templateKey}
                onChange={(value) => {
                  setTemplateKey(value);
                  const template = relevantTemplates.find(
                    (item) => item.key === value,
                  );
                  setMessage(
                    template
                      ? applyTemplate(L(template.body, locale), order, locale)
                      : "",
                  );
                }}
                options={[
                  { value: "", label: "Write from scratch" },
                  ...relevantTemplates.map((template) => ({
                    value: template.key,
                    label: template.name,
                  })),
                ]}
              />
              <label className="block">
                <span className="label">Message</span>
                <textarea
                  rows={5}
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  className="input resize-y"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </label>
              <div className="flex flex-wrap gap-2">
                <a
                  href={waHref ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!waHref}
                  className={cn(
                    "btn btn-sm bg-[#25D366] text-[#05240f]",
                    !waHref && "pointer-events-none opacity-50",
                  )}
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Open WhatsApp
                </a>
                <button
                  type="button"
                  className="btn-ghost btn-sm"
                  onClick={async () => {
                    await navigator.clipboard.writeText(message);
                    toast.success("Message copied");
                  }}
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy message
                </button>
              </div>
              {!waHref ? (
                <p className="text-[12px] text-muted">
                  Add the client phone number to enable the WhatsApp button.
                </p>
              ) : null}
            </div>
          </section>

          <section className="mt-6">
            <h3 className="mb-3 font-display text-[14px] font-bold">
              Timeline
            </h3>
            <div className="flex gap-2">
              <input
                className="input"
                placeholder="Add a note…"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") void addNote();
                }}
              />
              <button
                type="button"
                onClick={() => void addNote()}
                disabled={savingNote}
                className="btn-ghost btn-sm shrink-0"
              >
                {savingNote ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Plus className="h-3.5 w-3.5" />
                )}
                Add
              </button>
            </div>

            <ol className="mt-4 space-y-3 border-s border-line/15 ps-4">
              {events.length === 0 ? (
                <li className="text-[12.5px] text-muted">No events yet.</li>
              ) : (
                events.map((event) => (
                  <li key={event.id} className="relative">
                    <span className="absolute -start-[21px] top-1.5 h-2 w-2 rounded-full bg-brand" />
                    <p className="text-[13px]">{event.text}</p>
                    <p className="mt-0.5 text-[11.5px] text-muted">
                      {formatAdminDateTime(event.created_at)}
                      {event.actor ? ` · ${event.actor}` : ""}
                    </p>
                  </li>
                ))
              )}
            </ol>
          </section>
        </div>

        {canDelete ? (
          <footer className="border-t border-line/10 px-5 py-3">
            <DeleteButton
              label="Delete order"
              description="The order row and its timeline will be removed permanently."
              onConfirm={async () => {
                await onDelete();
                onClose();
              }}
            />
          </footer>
        ) : null}
      </aside>
    </div>
  );
}
