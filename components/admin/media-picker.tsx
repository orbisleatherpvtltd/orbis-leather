"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { uploadMedia, listMediaAssets } from "@/lib/actions/media";

type MediaAsset = Awaited<ReturnType<typeof listMediaAssets>>[number];

export function MediaPicker({
  name,
  label,
  defaultValue,
  value: controlledValue,
  onChange,
}: {
  name?: string;
  label: string;
  defaultValue?: string | null;
  value?: string;
  onChange?: (url: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const setValue = (next: string) => {
    if (controlledValue === undefined) setInternalValue(next);
    onChange?.(next);
  };
  const [assets, setAssets] = useState<MediaAsset[] | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [pending, startTransition] = useTransition();

  function openPicker() {
    setOpen(true);
    startTransition(async () => {
      const data = await listMediaAssets();
      setAssets(data);
    });
  }

  function handleUploadSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await uploadMedia({ status: "idle", message: "" }, formData);
      if (result.status === "success" && result.url) {
        setUploadError("");
        setValue(result.url);
        setOpen(false);
      } else {
        setUploadError(result.message);
      }
    });
  }

  return (
    <div>
      <p className="mb-2 block text-caption uppercase tracking-wide text-ink/60">{label}</p>
      {name && <input type="hidden" name={name} value={value} />}

      <div className="flex items-center gap-3">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md border border-ink/10 bg-zinc-50">
          {value ? (
            <Image src={value} alt="" width={80} height={80} className="h-full w-full object-cover" />
          ) : (
            <span className="text-caption text-ink/60">No image</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Button type="button" variant="outline" size="sm" onClick={openPicker}>
            {value ? "Change Image" : "Choose Image"}
          </Button>
          {value && (
            <button
              type="button"
              onClick={() => setValue("")}
              className="text-body-sm text-ink/60 hover:text-ink"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Media Library">
        <form action={handleUploadSubmit} className="mb-6 flex flex-col gap-3 border-b border-stone-200 pb-6">
          <input
            type="file"
            name="file"
            accept="image/jpeg,image/png,image/webp"
            required
            className="text-body-sm"
          />
          {uploadError && <p className="text-body-sm text-red-600">{uploadError}</p>}
          <Button type="submit" variant="secondary" size="sm" disabled={pending} className="w-fit">
            {pending ? "Uploading..." : "Upload New"}
          </Button>
        </form>

        {assets === null ? (
          <p className="text-body-sm text-ink/60">Loading...</p>
        ) : assets.length === 0 ? (
          <p className="text-body-sm text-ink/60">No uploaded images yet.</p>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {assets.map((asset) => (
              <button
                key={asset.id}
                type="button"
                onClick={() => {
                  setValue(asset.url);
                  setOpen(false);
                }}
                className="aspect-square overflow-hidden rounded-md border border-ink/10 transition-opacity hover:opacity-80"
              >
                <Image
                  src={asset.url}
                  alt={asset.altText ?? ""}
                  width={120}
                  height={120}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}
