"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Input,
  MLInput,
  Panel,
  SaveBar,
  Select,
  api,
} from "@/components/admin/kit";
import { useToast } from "@/components/admin/toast";
import type { Locale, SiteSettings } from "@/lib/types";

export function SettingsForm({
  settings,
  canEdit,
}: {
  settings: SiteSettings;
  canEdit: boolean;
}) {
  const router = useRouter();
  const toast = useToast();
  const [draft, setDraft] = useState(settings);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setDirty(true);
  }

  async function save() {
    setSaving(true);
    try {
      await api(`/api/admin/site_settings?id=${draft.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          site_name: draft.site_name,
          tagline: draft.tagline,
          contact_email: draft.contact_email,
          whatsapp_number: draft.whatsapp_number.replace(/[^\d]/g, ""),
          address: draft.address,
          footer_note: draft.footer_note,
          default_locale: draft.default_locale,
        }),
      });
      setDirty(false);
      toast.success("Settings saved");
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold">Settings</h1>
        <p className="mt-1.5 text-[13px] text-muted">
          Global values used across the website, including the WhatsApp number
          every order button opens.
        </p>
      </div>

      {!canEdit ? (
        <p className="mb-6 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-[12.5px] text-amber-200">
          Your role is editor, so these settings are read only. Ask an owner to
          change them.
        </p>
      ) : null}

      <fieldset disabled={!canEdit} className="grid gap-6 lg:grid-cols-2">
        <Panel title="Brand">
          <div className="flex flex-col gap-4">
            <Input
              label="Site name"
              value={draft.site_name}
              onChange={(value) => set("site_name", value)}
            />
            <MLInput
              label="Tagline"
              value={draft.tagline}
              onChange={(value) => set("tagline", value)}
            />
            <MLInput
              label="Footer note"
              value={draft.footer_note}
              multiline
              rows={2}
              onChange={(value) => set("footer_note", value)}
            />
            <Select
              label="Default language"
              value={draft.default_locale}
              onChange={(value) => set("default_locale", value as Locale)}
              options={[
                { value: "en", label: "English" },
                { value: "fr", label: "Français" },
                { value: "ar", label: "العربية" },
              ]}
            />
          </div>
        </Panel>

        <Panel title="Contact">
          <div className="flex flex-col gap-4">
            <Input
              label="WhatsApp number"
              value={draft.whatsapp_number}
              onChange={(value) => set("whatsapp_number", value)}
              hint="Digits only with the country code, for example 212639803872. Every order button uses it."
            />
            <Input
              label="Contact email"
              type="email"
              value={draft.contact_email}
              onChange={(value) => set("contact_email", value)}
            />
            <MLInput
              label="Address"
              value={draft.address}
              multiline
              rows={2}
              onChange={(value) => set("address", value)}
            />
          </div>
        </Panel>
      </fieldset>

      {canEdit ? (
        <SaveBar onSave={() => void save()} saving={saving} dirty={dirty} />
      ) : null}
    </div>
  );
}
