"use client";

import { useState, useTransition } from "react";
import { Modal } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DeleteButton({
  action,
  confirmText,
  label = "Delete",
}: {
  action: () => Promise<void>;
  confirmText: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-body-sm text-ink/60 hover:text-red-600"
      >
        {label}
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Confirm Delete">
        <p className="text-body text-ink/70">{confirmText}</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                await action();
                setOpen(false);
              })
            }
          >
            {pending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
