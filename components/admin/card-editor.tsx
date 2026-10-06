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
  Select,
  SimpleImageField,
  Toggle,
  api,
} from "@/components/admin/kit";
import { MLListEditor } from "@/components/admin/field-arrays";
import { useToast } from "@/components/admin/toast";
import type { CardPriceTier, CardProduct, CardType, ML } from "@/lib/types";
import { L, slugify } from "@/lib/utils";

const EMPTY_ML: ML = { en: "", fr: "", ar: "" };

const FINISHES: CardProduct["finish"][] = [
  "matte",
  "glossy",
  "soft-touch",
  "metal",
  "wood",
  "pvc",
];

type DraftTier = CardPriceTier & { isNew?: boolean };

const BLANK: CardProduct = {
  id: "",
  slug: "",
  type: "regular",
  title: EMPTY_ML,
  title_en: "",
  description: EMPTY_ML,
  specs: [],
  finish: "matte",
  popular: false,
  visible: true,
  sort_order: 99,
  image_url: null,
  tiers: [],
};

function defaultTiers(type: CardType): DraftTier[] {
  const quantities = type === "nfc" ? [1] : [100, 200, 500];
  return quantities.map((quantity, index) => ({
    id: `new-${quantity}-${index}`,
    card_id: "",
    quantity,
    price_mad: null,
    enabled: true,
    sort_order: index + 1,
    isNew: true,
  }));
}

export function CardEditor({ card }: { card: CardProduct | null }) {
  const router = useRouter();
  const toast = useToast();
  const isNew = !card;

  const [draft, setDraft] = useState<CardProduct>(card ?? BLANK);
  const [tiers, setTiers] = useState<DraftTier[]>(
    card ? (card.tiers as DraftTier[]) : defaultTiers("regular"),
  );
  const [removedTiers, setRemovedTiers] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  function set<K extends keyof CardProduct>(key: K, value: CardProduct[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setDirty(true);
  }

  function setType(type: CardType) {
    set("type", type);
    if (isNew) setTiers(defaultTiers(type));
  }

  function updateTier(id: string, patch: Partial<DraftTier>) {
    setTiers((current) =>
      current.map((tier) => (tier.id === id ? { ...tier, ...patch } : tier)),
    );
    setDirty(true);
  }

  function removeTier(tier: DraftTier) {
    setTiers((current) => current.filter((item) => item.id !== tier.id));
    if (!tier.isNew) setRemovedTiers((current) => [...current, tier.id]);
    setDirty(true);
  }

  function addTier() {
    setTiers((current) => [
      ...current,
      {
        id: `new-${Date.now()}`,
        card_id: draft.id,
        quantity: draft.type === "nfc" ? 1 : 100,
        price_mad: null,
        enabled: true,
        sort_order: current.length + 1,
        isNew: true,
      },
    ]);
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
        type: draft.type,
        title: draft.title,
        title_en: draft.title_en || L(draft.title, "en"),
        description: draft.description,
        specs: draft.specs,
        finish: draft.finish,
        popular: draft.popular,
        visible: draft.visible,
        sort_order: draft.sort_order,
        image_url: draft.image_url,
      };

      let cardId = draft.id;

      if (isNew) {
        const result = await api<{ data: CardProduct }>(
          "/api/admin/card_products",
          { method: "POST", body: JSON.stringify(payload) },
        );
        cardId = result.data.id;
      } else {
        await api(`/api/admin/card_products?id=${draft.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      }

      for (const tierId of removedTiers) {
        await api(`/api/admin/card_price_tiers?id=${tierId}`, {
          method: "DELETE",
        });
      }

      for (const [index, tier] of tiers.entries()) {
        const tierPayload = {
          card_id: cardId,
          quantity: tier.quantity,
          price_mad: tier.price_mad,
          enabled: tier.enabled,
          sort_order: index + 1,
        };
        if (tier.isNew) {
          await api("/api/admin/card_price_tiers", {
            method: "POST",
            body: JSON.stringify(tierPayload),
          });
        } else {
          await api(`/api/admin/card_price_tiers?id=${tier.id}`, {
            method: "PATCH",
            body: JSON.stringify(tierPayload),
          });
        }
      }

      setRemovedTiers([]);
      setDirty(false);
      toast.success(isNew ? "Card created" : "Saved and published");

      if (isNew) router.replace(`/admin/cards/${cardId}`);
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    await api(`/api/admin/card_products?id=${draft.id}`, { method: "DELETE" });
    toast.success("Card deleted");
    router.replace("/admin/cards");
    router.refresh();
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold">
            {isNew ? "New card" : L(draft.title, "en") || "Card"}
          </h1>
          <p className="mt-1.5 text-[13px] text-muted">
            DENTISTA product shown on the /cards page.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`/cards?type=${draft.type}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost btn-sm"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View page
          </a>
          {!isNew ? (
            <DeleteButton
              description="This card and its price tiers will be removed from the website."
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
                  setDraft((current) => ({
                    ...current,
                    title: value,
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
              <MLListEditor
                label="Specs"
                items={draft.specs}
                onChange={(items) => set("specs", items)}
                addLabel="Add spec"
              />
            </div>
          </Panel>

          <Panel
            title="Price tiers"
            sub="Leave a price empty to show “Price on WhatsApp” on the website."
            actions={
              <button
                type="button"
                onClick={addTier}
                className="btn-ghost btn-sm"
              >
                <Plus className="h-3.5 w-3.5" />
                Add tier
              </button>
            }
          >
            <div className="flex flex-col gap-3">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="grid items-end gap-3 rounded-xl border border-line/15 bg-surface2/40 p-3 sm:grid-cols-[1fr_1fr_auto_auto]"
                >
                  <Input
                    label="Quantity"
                    type="number"
                    value={tier.quantity}
                    onChange={(value) =>
                      updateTier(tier.id, { quantity: Number(value) })
                    }
                  />
                  <Input
                    label="Price (DH)"
                    type="number"
                    value={tier.price_mad ?? ""}
                    onChange={(value) =>
                      updateTier(tier.id, {
                        price_mad: value === "" ? null : Number(value),
                      })
                    }
                  />
                  <div className="pb-1">
                    <Toggle
                      label="Enabled"
                      checked={tier.enabled}
                      onChange={(value) =>
                        updateTier(tier.id, { enabled: value })
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTier(tier)}
                    className="mb-1 rounded-lg p-2 text-rose-300 hover:bg-rose-500/10"
                    aria-label="Remove tier"
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
                label="Mark as popular"
                checked={draft.popular}
                onChange={(value) => set("popular", value)}
              />
              <Select
                label="Card type"
                value={draft.type}
                onChange={(value) => setType(value as CardType)}
                options={[
                  { value: "regular", label: "Regular (100 / 200 / 500)" },
                  { value: "nfc", label: "NFC (single card)" },
                ]}
              />
              <Select
                label="Finish"
                value={draft.finish}
                onChange={(value) =>
                  set("finish", value as CardProduct["finish"])
                }
                options={FINISHES.map((finish) => ({
                  value: finish,
                  label: finish,
                }))}
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
              <Input
                label="English reference title"
                value={draft.title_en}
                onChange={(value) => set("title_en", value)}
                hint="Used in the WhatsApp machine block."
              />
            </div>
          </Panel>

          <Panel title="Photo (optional)">
            <SimpleImageField
              value={draft.image_url}
              onChange={(value) => set("image_url", value)}
              hint="Leave empty to use the generated card mockup."
            />
          </Panel>
        </div>
      </div>

      <SaveBar onSave={() => void save()} saving={saving} dirty={dirty} />
    </div>
  );
}
