"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

import { useI18n } from "@/components/providers";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const { t } = useI18n();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          whatsapp: String(data.get("whatsapp") ?? ""),
          company: String(data.get("company") ?? ""),
          message: String(data.get("message") ?? ""),
          // Honeypot: real users never fill this hidden field.
          website: String(data.get("website") ?? ""),
        }),
      });

      if (!response.ok) throw new Error("request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="contact-name">
            {t("contact.form.name", "Name")}
          </label>
          <input
            id="contact-name"
            name="name"
            required
            maxLength={120}
            className="input"
            autoComplete="name"
          />
        </div>
        <div>
          <label className="label" htmlFor="contact-email">
            {t("contact.form.email", "Email")}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={160}
            className="input"
            autoComplete="email"
          />
        </div>
        <div>
          <label className="label" htmlFor="contact-whatsapp">
            {t("contact.form.whatsapp", "WhatsApp number")}
          </label>
          <input
            id="contact-whatsapp"
            name="whatsapp"
            className="input"
            inputMode="tel"
            autoComplete="tel"
            placeholder="06 00 00 00 00"
          />
        </div>
        <div>
          <label className="label" htmlFor="contact-company">
            {t("contact.form.company", "Business name")}
          </label>
          <input
            id="contact-company"
            name="company"
            maxLength={160}
            className="input"
            autoComplete="organization"
          />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="contact-message">
          {t("contact.form.message", "Your message")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={2000}
          className="input resize-y"
        />
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex={-1} />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-brand self-start"
      >
        {status === "sending" ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : null}
        {t("contact.form.submit", "Send message")}
      </button>

      <p aria-live="polite" className="min-h-[20px] text-[13px]">
        {status === "sent" ? (
          <span className="text-emerald-400">
            {t("contact.form.success", "Thank you — your message is with us.")}
          </span>
        ) : null}
        {status === "error" ? (
          <span className="text-rose-400">
            {t("contact.form.error", "Something went wrong.")}
          </span>
        ) : null}
      </p>
    </form>
  );
}
