"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Plus, Trash2 } from "lucide-react";

import {
  DeleteButton,
  Input,
  MLInput,
  Panel,
  SaveBar,
  Toggle,
  api,
} from "@/components/admin/kit";
import { TagsEditor } from "@/components/admin/field-arrays";
import { useToast } from "@/components/admin/toast";
import type { ML, PackageFeature, SocialPackage } from "@/lib/types";
import { L, slugify } from "@/lib/utils";

const EMPTY_ML: ML = { en: "", fr: "", ar: "" };

type DraftFeature = PackageFeature & { isNew?: boolean };

const BLANK: SocialPackage = {
  id: "",
  slug: "",
  name: EMPTY_ML,
  title_en: "",
  description: EMPTY_ML,
  price_mad: null,
  billing_period: EMPTY_ML,
  badge: EMPTY_ML,
  popular: false,
  visible: true,
  sort_order: 99,
  posts_per_month: 0,
  reels_per_month: 0,
  stories_per_month: 0,
  platforms: [],
  features: [],
};

export function PackageEditor({
  package: pkg,
}: {
  package: SocialPackage | null;
}) {
  const router = useRouter();
  const toast = useToast();
  const isNew = !pkg;

  const [draft, setDraft] = useState<SocialPackage>(pkg ?? BLANK);
  const [features, setFeatures] = useState<DraftFeature[]>(
    (pkg?.features ?? []) as DraftFeature[],
  );
  const [removed, setRemoved] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  function set<K extends keyof SocialPackage>(key: K, value: SocialPackage[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setDirty(true);
  }

  async function save() {
    if (!draft.slug.trim()) {
      toast.error("A slug is required.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        slug: draft.slug.trim(),
        name: draft.name,
        title_en: draft.title_en || L(draft.name, "en"),
        description: draft.description,
        price_mad: draft.price_mad,
        billing_period: draft.billing_period,
        badge: draft.badge,
        popular: draft.popular,
        visible: draft.visible,
        sort_order: draft.sort_order,
        posts_per_month: draft.posts_per_month,
        reels_per_month: draft.reels_per_month,
        stories_per_month: draft.stories_per_month,
        platforms: draft.platforms,
      };

      let packageId = draft.id;

      if (isNew) {
        const result = await api<{ data: SocialPackage }>(
          "/api/admin/social_packages",
          { method: "POST", body: JSON.stringify(payload) },
        );
        packageId = result.data.id;
      } else {
        await api(`/api/admin/social_packages?id=${draft.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      }

      for (const id of removed) {
        await api(`/api/admin/package_features?id=${id}`, { method: "DELETE" });
      }

      for (const [index, feature] of features.entries()) {
        const featurePayload = {
          package_id: packageId,
          text: feature.text,
          sort_order: index + 1,
        };
        if (feature.isNew) {
          await api("/api/admin/package_features", {
            method: "POST",
            body: JSON.stringify(featurePayload),
          });
        } else {
          await api(`/api/admin/package_features?id=${feature.id}`, {
            method: "PATCH",
            body: JSON.stringify(featurePayload),
          });
        }
      }

      setRemoved([]);
      setDirty(false);
      toast.success(isNew ? "Package created" : "Saved and published");
      if (isNew) router.replace(`/admin/social/packages/${packageId}`);
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    await api(`/api/admin/social_packages?id=${draft.id}`, {
      method: "DELETE",
    });
    toast.success("Package deleted");
    router.replace("/admin/social/packages");
    router.refresh();
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold">
            {isNew ? "New package" : L(draft.name, "en") || "Package"}
          </h1>
          <p className="mt-1.5 text-[13px] text-muted">
            Monthly social media package shown on /social-media.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/social-media#packages"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost btn-sm"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View page
          </a>
          {!isNew ? (
            <DeleteButton
              description="This package will be removed from the website."
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
                label="Name"
                value={draft.name}
                onChange={(value) => {
                  setDraft((current) => ({
                    ...current,
                    name: value,
                    slug:
                      isNew && !current.slug ? slugify(value.en) : current.slug,
                    title_en: current.title_en || value.en,
                  }));
                  setDirty(true);
                }}
              />
              <MLInput
                label="Description"
                value={draft.description}
                multiline
                rows={3}
                onChange={(value) => set("description", value)}
              />
              <MLInput
                label="Badge (optional)"
                value={draft.badge}
                onChange={(value) => set("badge", value)}
              />
              <MLInput
                label="Billing period label"
                value={draft.billing_period}
                onChange={(value) => set("billing_period", value)}
                hint="Example: per month / par mois / شهريا"
              />
            </div>
          </Panel>

          <Panel
            title="Features"
            actions={
              <button
                type="button"
                onClick={() => {
                  setFeatures((current) => [
                    ...current,
                    {
                      id: `new-${Date.now()}`,
                      package_id: draft.id,
                      text: EMPTY_ML,
                      sort_order: current.length + 1,
                      isNew: true,
                    },
                  ]);
                  setDirty(true);
                }}
                className="btn-ghost btn-sm"
              >
                <Plus className="h-3.5 w-3.5" />
                Add feature
              </button>
            }
          >
            <div className="flex flex-col gap-3">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-start gap-2 rounded-xl border border-line/15 bg-surface2/40 p-3"
                >
                  <div className="flex-1">
                    <MLInput
                      value={feature.text}
                      onChange={(text) => {
                        setFeatures((current) =>
                          current.map((item) =>
                            item.id === feature.id ? { ...item, text } : item,
                          ),
                        );
                        setDirty(true);
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFeatures((current) =>
                        current.filter((item) => item.id !== feature.id),
                      );
                      if (!feature.isNew) {
                        setRemoved((current) => [...current, feature.id]);
                      }
                      setDirty(true);
                    }}
                    className="mt-6 rounded-lg p-2 text-rose-300 hover:bg-rose-500/10"
                    aria-label="Remove feature"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="flex flex-col gap-6">
          <Panel title="Publishing">
            <div className="flex flex-col gap-4">
              <Toggle
                label="Visible on the website"
                checked={draft.visible}
                onChange={(value) => set("visible", value)}
              />
              <Toggle
                label="Mark as most popular"
                checked={draft.popular}
                onChange={(value) => set("popular", value)}
              />
              <Input
                label="Price (DH / month)"
                type="number"
                value={draft.price_mad ?? ""}
                onChange={(value) =>
                  set("price_mad", value === "" ? null : Number(value))
                }
                hint="Leave empty to show “Price on WhatsApp”."
              />
              <Input
                label="Slug"
                value={draft.slug}
                onChange={(value) => set("slug", slugify(value))}
              />
              <Input
                label="Sort order"
                type="number"
                value={draft.sort_order}
                onChange={(value) => set("sort_order", Number(value))}
              />
            </div>
          </Panel>

          <Panel title="Monthly volume">
            <div className="grid grid-cols-3 gap-3">
              <Input
                label="Posts"
                type="number"
                value={draft.posts_per_month}
                onChange={(value) => set("posts_per_month", Number(value))}
              />
              <Input
                label="Reels"
                type="number"
                value={draft.reels_per_month}
                onChange={(value) => set("reels_per_month", Number(value))}
              />
              <Input
                label="Stories"
                type="number"
                value={draft.stories_per_month}
                onChange={(value) => set("stories_per_month", Number(value))}
              />
            </div>
            <div className="mt-4">
              <TagsEditor
                label="Platforms"
                items={draft.platforms}
                onChange={(items) => set("platforms", items)}
                hint="instagram, facebook, tiktok, linkedin…"
              />
            </div>
          </Panel>
        </div>
      </div>

      <SaveBar onSave={() => void save()} saving={saving} dirty={dirty} />
    </div>
  );
}
