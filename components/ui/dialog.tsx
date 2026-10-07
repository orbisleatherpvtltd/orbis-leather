"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CloseIcon } from "@/components/icons";

function useSyncedDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === ref.current) onClose();
  }

  return { ref, handleBackdropClick };
}

const dialogBase =
  "backdrop:bg-ink/50 backdrop:transition-colors backdrop:duration-300 starting:backdrop:bg-ink/0 opacity-100 starting:opacity-0 transition-all duration-200 p-0 border-0 bg-transparent";

type DialogChromeProps = {
  title?: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
};

function DialogChrome({ title, onClose, children, className }: DialogChromeProps) {
  return (
    <div className={cn("relative flex h-full flex-col bg-paper", className)}>
      <div className="flex items-center justify-between gap-4 border-b border-stone-200 px-6 py-5">
        <span className="text-h4 font-bold text-ink">{title}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="text-ink/60 transition-colors hover:text-ink"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
    </div>
  );
}

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const { ref, handleBackdropClick } = useSyncedDialog(open, onClose);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={onClose}
      onClick={handleBackdropClick}
      className={cn(dialogBase, "m-auto w-full max-w-lg scale-100 starting:scale-95", className)}
    >
      <DialogChrome title={title} onClose={onClose}>
        {children}
      </DialogChrome>
    </dialog>
  );
}

export type DrawerProps = ModalProps & {
  side?: "left" | "right";
};

export function Drawer({ open, onClose, title, children, side = "right", className }: DrawerProps) {
  const { ref, handleBackdropClick } = useSyncedDialog(open, onClose);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={onClose}
      onClick={handleBackdropClick}
      className={cn(
        dialogBase,
        "m-0 h-dvh max-h-none w-full max-w-sm translate-x-0",
        side === "right" ? "right-0 starting:translate-x-4" : "left-0 starting:-translate-x-4",
        className,
      )}
    >
      <DialogChrome title={title} onClose={onClose} className="h-dvh">
        {children}
      </DialogChrome>
    </dialog>
  );
}
