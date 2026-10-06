"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ClipboardCopy,
  Download,
  MessageCircle,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";

import {
  Badge,
  Input,
  Modal,
  Select,
  Table,
  api,
} from "@/components/admin/kit";
import {
  OrderDrawer,
  PAYMENT_OPTIONS,
  STATUS_OPTIONS,
  statusTone,
} from "@/components/admin/order-drawer";
import { useToast } from "@/components/admin/toast";
import { formatAdminDateTime, formatPriceMAD } from "@/lib/format";
import { createBrowserSupabase } from "@/lib/supabase/browser";
import type {
  Order,
  OrderStatus,
  PaymentStatus,
  ReplyTemplate,
  ServiceType,
} from "@/lib/types";
import { cn } from "@/lib/utils";

const TABS: { value: "all" | ServiceType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "card", label: "Cards" },
  { value: "automation", label: "Automation" },
  { value: "social_media", label: "Social" },
  { value: "general", label: "General" },
];

const SERVICE_LABEL: Record<ServiceType, string> = {
  automation: "Automation",
  social_media: "Social",
  card: "Card",
  general: "General",
};

const EXPORT_COLUMNS: { key: keyof Order; header: string }[] = [
  { key: "order_no", header: "Order #" },
  { key: "created_at", header: "Date" },
  { key: "service_type", header: "Service type" },
  { key: "item_title", header: "Item" },
  { key: "quantity", header: "Qty" },
  { key: "total_price_mad", header: "Total (DH)" },
  { key: "client_name", header: "Client name" },
  { key: "client_phone", header: "Phone" },
  { key: "status", header: "Status" },
  { key: "payment_status", header: "Payment" },
];

const EMPTY_MANUAL = {
  service_type: "card" as ServiceType,
  item_title: "",
  quantity: "",
  total_price_mad: "",
  client_name: "",
  client_phone: "",
  city: "",
  notes: "",
};

export function OrdersSheet({
  initialOrders,
  templates,
  canDelete,
}: {
  initialOrders: Order[];
  templates: ReplyTemplate[];
  canDelete: boolean;
}) {
  const toast = useToast();
  const router = useRouter();
  const params = useSearchParams();

  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [tab, setTab] = useState<"all" | ServiceType>(
    (params.get("type") as ServiceType | null) ?? "all",
  );
  const [status, setStatus] = useState("all");
  const [payment, setPayment] = useState("all");
  const [query, setQuery] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [openId, setOpenId] = useState<string | null>(params.get("order"));
  const [addOpen, setAddOpen] = useState(false);
  const [manual, setManual] = useState(EMPTY_MANUAL);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const result = await api<{ data: Order[] }>(
        "/api/admin/orders?limit=1000",
      );
      setOrders(result.data ?? []);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setRefreshing(false);
    }
  }, [toast]);

  /* Realtime: new clicks appear without reloading the page. */
  useEffect(() => {
    const supabase = createBrowserSupabase();
    if (!supabase) return;

    const channel = supabase
      .channel("orders-sheet")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload) => {
          setOrders((current) => {
            if (payload.eventType === "DELETE") {
              return current.filter((order) => order.id !== payload.old.id);
            }
            const row = payload.new as Order;
            const index = current.findIndex((order) => order.id === row.id);
            if (index === -1) return [row, ...current];
            const next = [...current];
            next[index] = { ...next[index], ...row };
            return next;
          });
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return orders.filter((order) => {
      if (tab !== "all" && order.service_type !== tab) return false;
      if (status !== "all" && order.status !== status) return false;
      if (payment !== "all" && order.payment_status !== payment) return false;
      if (from && order.created_at < from) return false;
      if (to && order.created_at > `${to}T23:59:59`) return false;
      if (!term) return true;
      return [
        order.order_no,
        order.item_title,
        order.client_name,
        order.client_phone,
        order.business_name,
        order.city,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term));
    });
  }, [orders, tab, status, payment, query, from, to]);

  const open = orders.find((order) => order.id === openId) ?? null;

  const patch = useCallback(
    async (id: string, changes: Partial<Order>) => {
      setOrders((current) =>
        current.map((order) =>
          order.id === id ? { ...order, ...changes } : order,
        ),
      );
      try {
        await api(`/api/admin/orders?id=${id}`, {
          method: "PATCH",
          body: JSON.stringify(changes),
        });
      } catch (error) {
        toast.error((error as Error).message);
        await refresh();
      }
    },
    [refresh, toast],
  );

  async function remove(id: string) {
    try {
      await api(`/api/admin/orders?id=${id}`, { method: "DELETE" });
      setOrders((current) => current.filter((order) => order.id !== id));
      toast.success("Order deleted");
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  async function createManual() {
    try {
      const payload = {
        service_type: manual.service_type,
        item_title: manual.item_title || null,
        item_ref: "",
        quantity: manual.quantity ? Number(manual.quantity) : null,
        total_price_mad: manual.total_price_mad
          ? Number(manual.total_price_mad)
          : null,
        client_name: manual.client_name || null,
        client_phone: manual.client_phone || null,
        city: manual.city || null,
        notes: manual.notes || null,
        status: "in_conversation" as OrderStatus,
        payment_status: "unpaid" as PaymentStatus,
        source: "manual" as const,
        locale: "en" as const,
      };
      const result = await api<{ data: Order }>("/api/admin/orders", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setOrders((current) => [result.data, ...current]);
      setManual(EMPTY_MANUAL);
      setAddOpen(false);
      toast.success("Order added");
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  function copyTsv() {
    const lines = [
      EXPORT_COLUMNS.map((column) => column.header).join("\t"),
      ...filtered.map((order) =>
        EXPORT_COLUMNS.map((column) => {
          const value = order[column.key];
          return value === null || value === undefined ? "" : String(value);
        }).join("\t"),
      ),
    ];
    void navigator.clipboard.writeText(lines.join("\n"));
    toast.success(`${filtered.length} rows copied as TSV`);
  }

  const exportHref = useMemo(() => {
    const search = new URLSearchParams();
    if (tab !== "all") search.set("type", tab);
    if (status !== "all") search.set("status", status);
    if (payment !== "all") search.set("payment", payment);
    if (from) search.set("from", from);
    if (to) search.set("to", to);
    if (query.trim()) search.set("q", query.trim());
    const suffix = search.toString();
    return `/api/admin/orders/export${suffix ? `?${suffix}` : ""}`;
  }, [tab, status, payment, from, to, query]);

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: orders.length };
    for (const order of orders) {
      result[order.service_type] = (result[order.service_type] ?? 0) + 1;
    }
    return result;
  }, [orders]);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold">Orders</h1>
          <p className="mt-1.5 text-[13px] text-muted">
            One row per WhatsApp order click. Repeat clicks from the same
            visitor are merged.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => void refresh()}
            className="btn-ghost btn-sm"
          >
            <RefreshCw
              className={cn("h-3.5 w-3.5", refreshing && "animate-spin")}
            />
            Refresh
          </button>
          <button type="button" onClick={copyTsv} className="btn-ghost btn-sm">
            <ClipboardCopy className="h-3.5 w-3.5" />
            Copy TSV
          </button>
          <a href={exportHref} className="btn-ghost btn-sm">
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </a>
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="btn-brand btn-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            Add order
          </button>
        </div>
      </div>

      <div className="card mb-5 p-4">
        <div className="flex flex-wrap gap-2">
          {TABS.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                setTab(item.value);
                const search = new URLSearchParams(params.toString());
                if (item.value === "all") search.delete("type");
                else search.set("type", item.value);
                router.replace(
                  `/admin/orders${search.toString() ? `?${search}` : ""}`,
                  { scroll: false },
                );
              }}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors",
                tab === item.value
                  ? "bg-brand text-white"
                  : "bg-surface2 text-muted hover:text-ink",
              )}
            >
              {item.label}
              <span className="ms-1.5 opacity-70">
                {counts[item.value] ?? 0}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <label className="relative block xl:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-[34px] h-4 w-4 text-muted" />
            <span className="label">Search</span>
            <input
              className="input !ps-9"
              placeholder="Order #, item, client, phone…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <Select
            label="Status"
            value={status}
            onChange={setStatus}
            options={[
              { value: "all", label: "All statuses" },
              ...STATUS_OPTIONS,
            ]}
          />
          <Select
            label="Payment"
            value={payment}
            onChange={setPayment}
            options={[
              { value: "all", label: "All payments" },
              ...PAYMENT_OPTIONS,
            ]}
          />
          <div className="grid grid-cols-2 gap-2">
            <Input label="From" type="date" value={from} onChange={setFrom} />
            <Input label="To" type="date" value={to} onChange={setTo} />
          </div>
        </div>
      </div>

      <div className="card p-2">
        <Table
          head={[
            "Order",
            "Date",
            "Type",
            "Item",
            "Qty",
            "Total",
            "Client",
            "Phone",
            "Status",
            "Payment",
            "",
          ]}
        >
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={11} className="px-3 py-10 text-center text-muted">
                No orders match these filters.
              </td>
            </tr>
          ) : (
            filtered.map((order) => {
              const phone = (order.client_phone ?? "").replace(/[^\d]/g, "");
              return (
                <tr
                  key={order.id}
                  className="align-middle hover:bg-surface2/40"
                >
                  <td className="whitespace-nowrap px-3 py-2">
                    <button
                      type="button"
                      onClick={() => setOpenId(order.id)}
                      className="font-mono text-[12px] hover:text-sky"
                    >
                      {order.order_no}
                    </button>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-[12px] text-muted">
                    {formatAdminDateTime(order.created_at)}
                  </td>
                  <td className="px-3 py-2">
                    <Badge
                      tone={
                        order.service_type === "card"
                          ? "dentista"
                          : order.service_type === "automation"
                            ? "violet"
                            : order.service_type === "social_media"
                              ? "blue"
                              : "neutral"
                      }
                    >
                      {SERVICE_LABEL[order.service_type]}
                    </Badge>
                  </td>
                  <td className="max-w-[200px] truncate px-3 py-2">
                    {order.item_title ?? "—"}
                    {order.card_type ? (
                      <span className="ms-1.5 text-[11px] uppercase text-muted">
                        {order.card_type}
                      </span>
                    ) : null}
                  </td>
                  <td className="px-3 py-2">{order.quantity ?? "—"}</td>
                  <td className="whitespace-nowrap px-3 py-2">
                    {order.total_price_mad === null
                      ? "—"
                      : formatPriceMAD(order.total_price_mad, "en")}
                  </td>
                  <td className="px-3 py-2">
                    <input
                      className="w-32 rounded-lg border border-transparent bg-transparent px-2 py-1 text-[12.5px] outline-none transition-colors hover:border-line/20 focus:border-sky/50 focus:bg-surface2"
                      defaultValue={order.client_name ?? ""}
                      placeholder="—"
                      onBlur={(event) => {
                        const value = event.target.value.trim();
                        if (value !== (order.client_name ?? "")) {
                          void patch(order.id, { client_name: value || null });
                        }
                      }}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      className="w-32 rounded-lg border border-transparent bg-transparent px-2 py-1 font-mono text-[12px] outline-none transition-colors hover:border-line/20 focus:border-sky/50 focus:bg-surface2"
                      defaultValue={order.client_phone ?? ""}
                      placeholder="—"
                      onBlur={(event) => {
                        const value = event.target.value.trim();
                        if (value !== (order.client_phone ?? "")) {
                          void patch(order.id, { client_phone: value || null });
                        }
                      }}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <select
                      value={order.status}
                      onChange={(event) =>
                        void patch(order.id, {
                          status: event.target.value as OrderStatus,
                        })
                      }
                      className="rounded-lg border border-line/20 bg-surface2 px-2 py-1 text-[12px] outline-none"
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <select
                      value={order.payment_status}
                      onChange={(event) =>
                        void patch(order.id, {
                          payment_status: event.target.value as PaymentStatus,
                        })
                      }
                      className="rounded-lg border border-line/20 bg-surface2 px-2 py-1 text-[12px] outline-none"
                    >
                      {PAYMENT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-end">
                    <div className="flex items-center justify-end gap-1">
                      {phone ? (
                        <a
                          href={`https://wa.me/${phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-1.5 text-emerald-300 hover:bg-emerald-500/10"
                          aria-label="Open WhatsApp"
                          title="Open WhatsApp"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                        </a>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => setOpenId(order.id)}
                        className="rounded-lg px-2 py-1 text-[12px] font-semibold text-muted hover:bg-surface2 hover:text-ink"
                      >
                        Open
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </Table>
      </div>

      <p className="mt-3 text-[12px] text-muted">
        Showing {filtered.length} of {orders.length} orders. Status badges:{" "}
        <Badge tone={statusTone("click")}>click</Badge> is a visitor who opened
        WhatsApp but has not replied yet.
      </p>

      {open ? (
        <OrderDrawer
          order={open}
          templates={templates}
          canDelete={canDelete}
          onClose={() => setOpenId(null)}
          onPatch={(changes) => patch(open.id, changes)}
          onDelete={() => remove(open.id)}
        />
      ) : null}

      {addOpen ? (
        <Modal
          title="Add an order manually"
          onClose={() => setAddOpen(false)}
          wide
          footer={
            <>
              <button
                type="button"
                className="btn-ghost btn-sm"
                onClick={() => setAddOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-brand btn-sm"
                onClick={() => void createManual()}
              >
                Create order
              </button>
            </>
          }
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Select
              label="Service type"
              value={manual.service_type}
              onChange={(value) =>
                setManual({ ...manual, service_type: value as ServiceType })
              }
              options={[
                { value: "card", label: "Card" },
                { value: "automation", label: "Automation" },
                { value: "social_media", label: "Social media" },
                { value: "general", label: "General" },
              ]}
            />
            <Input
              label="Item"
              value={manual.item_title}
              onChange={(value) => setManual({ ...manual, item_title: value })}
            />
            <Input
              label="Quantity"
              type="number"
              value={manual.quantity}
              onChange={(value) => setManual({ ...manual, quantity: value })}
            />
            <Input
              label="Total (DH)"
              type="number"
              value={manual.total_price_mad}
              onChange={(value) =>
                setManual({ ...manual, total_price_mad: value })
              }
            />
            <Input
              label="Client name"
              value={manual.client_name}
              onChange={(value) => setManual({ ...manual, client_name: value })}
            />
            <Input
              label="Phone"
              value={manual.client_phone}
              onChange={(value) =>
                setManual({ ...manual, client_phone: value })
              }
              hint="With country code, e.g. 212639803872"
            />
            <Input
              label="City"
              value={manual.city}
              onChange={(value) => setManual({ ...manual, city: value })}
            />
            <Input
              label="Notes"
              value={manual.notes}
              onChange={(value) => setManual({ ...manual, notes: value })}
            />
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
