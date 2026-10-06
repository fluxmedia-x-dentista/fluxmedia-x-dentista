"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { Copy, Loader2, Upload } from "lucide-react";

import { DeleteButton, EmptyState, api } from "@/components/admin/kit";
import { useToast } from "@/components/admin/toast";
import { formatAdminDateTime } from "@/lib/format";
import type { MediaAsset } from "@/lib/types";

function prettySize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MediaLibrary({ assets: initial }: { assets: MediaAsset[] }) {
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [assets, setAssets] = useState(initial);
  const [uploading, setUploading] = useState(false);

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      for (const file of files) {
        const form = new FormData();
        form.append("file", file);
        const result = await api<{ asset: MediaAsset }>(
          "/api/admin/media/upload",
          { method: "POST", body: form },
        );
        if (result.asset) setAssets((current) => [result.asset, ...current]);
      }
      toast.success(
        `${files.length} file${files.length === 1 ? "" : "s"} uploaded`,
      );
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function remove(asset: MediaAsset) {
    try {
      await api(`/api/admin/media_assets?id=${asset.id}`, { method: "DELETE" });
      setAssets((current) => current.filter((item) => item.id !== asset.id));
      toast.success("Removed from the library");
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold">Media</h1>
          <p className="mt-1.5 text-[13px] text-muted">
            Images used across the website. PNG, JPG, WebP, SVG or GIF, up to 5
            MB each.
          </p>
        </div>
        <div>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
            onChange={upload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="btn-brand btn-sm"
          >
            {uploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Upload className="h-3.5 w-3.5" />
            )}
            Upload images
          </button>
        </div>
      </div>

      {assets.length === 0 ? (
        <EmptyState text="No uploads yet. Images uploaded from any editor appear here too." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {assets.map((asset) => (
            <figure key={asset.id} className="card overflow-hidden">
              <div className="aspect-video bg-surface2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset.url}
                  alt={asset.alt ?? ""}
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="p-3">
                <p className="truncate text-[12.5px] font-medium">
                  {asset.path.split("/").pop()}
                </p>
                <p className="mt-0.5 text-[11.5px] text-muted">
                  {prettySize(asset.size)} ·{" "}
                  {formatAdminDateTime(asset.created_at)}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={async () => {
                      await navigator.clipboard.writeText(asset.url);
                      toast.success("URL copied");
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[12px] font-semibold text-muted hover:bg-surface2 hover:text-ink"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy URL
                  </button>
                  <DeleteButton
                    label=""
                    description="The image stays in storage but is removed from the library list."
                    onConfirm={() => remove(asset)}
                  />
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
