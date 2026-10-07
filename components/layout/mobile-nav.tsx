"use client";

import { useState } from "react";
import { Drawer } from "@/components/ui/dialog";
import { NavLinks } from "@/components/layout/nav-links";
import { MenuIcon, WhatsAppIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { requestQuoteHref, siteConfig } from "@/lib/site-config";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="inline-flex h-10 w-10 items-center justify-center text-ink lg:hidden"
      >
        <MenuIcon aria-hidden="true" className="h-6 w-6" />
      </button>

      <Drawer open={open} onClose={() => setOpen(false)} title={siteConfig.shortName}>
        <nav aria-label="Primary" className="flex flex-col">
          <NavLinks
            linkClassName="border-b border-stone-100 py-4 text-body-lg font-medium text-ink transition-colors hover:text-leather"
            onNavigate={() => setOpen(false)}
          />
        </nav>

        <div className="mt-8 flex flex-col gap-4">
          <ButtonLink href={requestQuoteHref} onClick={() => setOpen(false)} className="w-full">
            Request Quote
          </ButtonLink>
          <a
            href={siteConfig.whatsapp.href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center gap-2 border border-stone-200 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </Drawer>
    </>
  );
}
