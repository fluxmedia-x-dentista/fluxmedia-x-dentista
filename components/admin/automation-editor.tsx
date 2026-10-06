"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";

import {
  DeleteButton,
  Input,
  MLInput,
  Panel,
  SaveBar,
  Select,
  SimpleImageField,
  Toggle,
  api,
} from "@/components/admin/kit";
import {
  MLListEditor,
  TagsEditor,
  WorkflowEditor,
} from "@/components/admin/field-arrays";
import { useToast } from "@/components/admin/toast";
import type { Automation, Category, ML, WorkflowStep } from "@/lib/types";
import { L, slugify } from "@/lib/utils";

const EMPTY_ML: ML = { en: "", fr: "", ar: "" };

const BLANK: Automation = {
  id: "",
  slug: "",
  title: EMPTY_ML,
  title_en: "",
  short: EMPTY_ML,
  description: EMPTY_ML,
  category_slug: "messaging",
  icon: "bot",
  thumbnail_url: null,
  benefits: [],
  workflow: [],
  integrations: [],
  sort_order: 99,
  active: true,
};

export function AutomationEditor({
  automation,
  categories,
}: {
  automation: Automation | null;
  categories: Category[];
}) {
  const router = useRouter();
  const toast = useToast();
  const [draft, setDraft] = useState<Automation>(automation ?? BLANK);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const isNew = !automation;

  function set<K extends keyof Automation>(key: K, value: Automation[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setDirty(true);
  }

  async function save() {
    if (!draft.slug.trim()) {
      toast.error("A slug is required (it becomes the page URL).");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        slug: draft.slug.trim(),
        title: draft.title,
        title_en: draft.title_en || L(draft.title, "en"),
        short: draft.short,
        description: draft.description,
        category_slug: draft.category_slug,
        icon: draft.icon,
        thumbnail_url: draft.thumbnail_url,
        benefits: draft.benefits,
        workflow: draft.workflow,
        integrations: draft.integrations,
        sort_order: draft.sort_order,
        active: draft.active,
      };

      if (isNew) {
        const result = await api<{ data: Automation }>(
          "/api/admin/automations",
          {
            method: "POST",
            body: JSON.stringify(payload),
          },
        );
        toast.success("Automation created");
        setDirty(false);
        router.replace(`/admin/automations/${result.data.id}`);
        router.refresh();
      } else {
        await api(`/api/admin/automations?id=${draft.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
        toast.success("Saved and published");
        setDirty(false);
        router.refresh();
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    await api(`/api/admin/automations?id=${draft.id}`, { method: "DELETE" });
    toast.success("Automation deleted");
    router.replace("/admin/automations");
    router.refresh();
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold">
            {isNew ? "New automation" : L(draft.title, "en") || "Automation"}
          </h1>
          <p className="mt-1.5 text-[13px] text-muted">
            Shown on /automations and on its own detail page.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isNew ? (
            <a
              href={`/automations/${draft.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost btn-sm"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View
            </a>
          ) : null}
          {!isNew ? (
            <DeleteButton
              description="The automation and its detail page will be removed from the website."
              onConfirm={remove}
            />
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div className="flex flex-col gap-6">
          <Panel title="Content">
            <div className="flex flex-col gap-5">
              <MLInput
                label="Title"
                value={draft.title}
                onChange={(value) => {
                  set("title", value);
                  if (isNew && !draft.slug) {
                    setDraft((current) => ({
                      ...current,
                      title: value,
                      slug: slugify(value.en),
                      title_en: value.en,
                    }));
                  }
                }}
              />
              <MLInput
                label="Short description (card)"
                value={draft.short}
                multiline
                rows={2}
                onChange={(value) => set("short", value)}
              />
              <MLInput
                label="Full description (detail page)"
                value={draft.description}
                multiline
                rows={5}
                onChange={(value) => set("description", value)}
              />
            </div>
          </Panel>

          <Panel title="Benefits" sub="Shown as a grid on the detail page.">
            <MLListEditor
              label=""
              items={draft.benefits}
              onChange={(items) => set("benefits", items)}
              addLabel="Add benefit"
            />
          </Panel>

          <Panel title="Workflow">
            <WorkflowEditor
              steps={draft.workflow}
              onChange={(steps: WorkflowStep[]) => set("workflow", steps)}
            />
          </Panel>
        </div>

        <div className="flex flex-col gap-6">
          <Panel title="Publishing">
            <div className="flex flex-col gap-4">
              <Toggle
                label="Visible on the website"
                checked={draft.active}
                onChange={(value) => set("active", value)}
              />
              <Input
                label="Slug"
                value={draft.slug}
                onChange={(value) => set("slug", slugify(value))}
                hint={`/automations/${draft.slug || "…"}`}
              />
              <Select
                label="Category"
                value={draft.category_slug}
                onChange={(value) => set("category_slug", value)}
                options={categories.map((category) => ({
                  value: category.slug,
                  label: L(category.name, "en"),
                }))}
              />
              <Input
                label="Sort order"
                type="number"
                value={draft.sort_order}
                onChange={(value) => set("sort_order", Number(value))}
              />
              <Input
                label="Icon (lucide name)"
                value={draft.icon}
                onChange={(value) => set("icon", value)}
                hint="bot, workflow, mail, headset, calendar…"
              />
              <Input
                label="English reference title"
                value={draft.title_en}
                onChange={(value) => set("title_en", value)}
                hint="Used inside the WhatsApp machine block (ITEM_TITLE)."
              />
            </div>
          </Panel>

          <Panel title="Thumbnail">
            <SimpleImageField
              value={draft.thumbnail_url}
              onChange={(value) => set("thumbnail_url", value)}
              hint="1200×675 works best. Upload a new one to replace the bundled artwork."
            />
          </Panel>

          <Panel title="Integrations">
            <TagsEditor
              label=""
              items={draft.integrations}
              onChange={(items) => set("integrations", items)}
              hint="Instagram, Make, Google Sheets…"
            />
          </Panel>
        </div>
      </div>

      <SaveBar onSave={() => void save()} saving={saving} dirty={dirty} />
    </div>
  );
}
