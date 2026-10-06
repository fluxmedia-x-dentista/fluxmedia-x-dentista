"use client";

import { useState } from "react";
import { Mail, MailOpen, Archive } from "lucide-react";

import {
  Badge,
  DeleteButton,
  EmptyState,
  Panel,
  api,
} from "@/components/admin/kit";
import { useToast } from "@/components/admin/toast";
import { formatAdminDateTime } from "@/lib/format";
import type { ContactMessage } from "@/lib/types";
import { cn } from "@/lib/utils";

const FILTERS: { value: "all" | ContactMessage["status"]; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "archived", label: "Archived" },
];

export function MessagesList({
  messages: initialMessages,
}: {
  messages: ContactMessage[];
}) {
  const toast = useToast();
  const [messages, setMessages] = useState(initialMessages);
  const [filter, setFilter] = useState<"all" | ContactMessage["status"]>("all");

  const visible = messages.filter(
    (message) => filter === "all" || message.status === filter,
  );

  async function setStatus(id: string, status: ContactMessage["status"]) {
    setMessages((current) =>
      current.map((message) =>
        message.id === id ? { ...message, status } : message,
      ),
    );
    try {
      await api(`/api/admin/contact_messages?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  async function remove(id: string) {
    try {
      await api(`/api/admin/contact_messages?id=${id}`, { method: "DELETE" });
      setMessages((current) => current.filter((message) => message.id !== id));
      toast.success("Message deleted");
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold">Messages</h1>
        <p className="mt-1.5 text-[13px] text-muted">
          Sent from the contact form. Orders are tracked separately in the
          orders sheet.
        </p>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setFilter(item.value)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors",
              filter === item.value
                ? "bg-brand text-white"
                : "bg-surface2 text-muted hover:text-ink",
            )}
          >
            {item.label}
            <span className="ms-1.5 opacity-70">
              {item.value === "all"
                ? messages.length
                : messages.filter((message) => message.status === item.value)
                    .length}
            </span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <EmptyState text="No messages in this view." />
      ) : (
        <div className="flex flex-col gap-3">
          {visible.map((message) => (
            <Panel key={message.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-[15px] font-bold">
                    {message.name}
                    {message.company ? (
                      <span className="ms-2 text-[12.5px] font-normal text-muted">
                        {message.company}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1 text-[12.5px] text-muted">
                    <a
                      href={`mailto:${message.email}`}
                      className="hover:text-sky"
                    >
                      {message.email}
                    </a>
                    {message.whatsapp ? (
                      <>
                        {" · "}
                        <a
                          href={`https://wa.me/${message.whatsapp.replace(/[^\d]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-sky"
                        >
                          {message.whatsapp}
                        </a>
                      </>
                    ) : null}
                    {" · "}
                    {formatAdminDateTime(message.created_at)}
                  </p>
                </div>
                <Badge
                  tone={
                    message.status === "new"
                      ? "amber"
                      : message.status === "read"
                        ? "blue"
                        : "neutral"
                  }
                >
                  {message.status}
                </Badge>
              </div>

              <p className="mt-4 whitespace-pre-wrap text-[13.5px] leading-relaxed">
                {message.message}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    void setStatus(
                      message.id,
                      message.status === "read" ? "new" : "read",
                    )
                  }
                  className="btn-ghost btn-sm"
                >
                  {message.status === "read" ? (
                    <Mail className="h-3.5 w-3.5" />
                  ) : (
                    <MailOpen className="h-3.5 w-3.5" />
                  )}
                  Mark as {message.status === "read" ? "unread" : "read"}
                </button>
                <button
                  type="button"
                  onClick={() => void setStatus(message.id, "archived")}
                  className="btn-ghost btn-sm"
                >
                  <Archive className="h-3.5 w-3.5" />
                  Archive
                </button>
                <DeleteButton
                  description="This message will be permanently deleted."
                  onConfirm={() => remove(message.id)}
                />
              </div>
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
}
