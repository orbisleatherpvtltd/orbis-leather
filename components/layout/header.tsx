"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLinks } from "@/components/layout/nav-links";
import { Logo } from "@/components/logo/logo";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";
import { requestQuoteHref, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      <motion.div
        animate={{
          boxShadow: scrolled
            ? "0 12px 30px -12px rgba(38, 7, 1, 0.18)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          "border-b bg-paper/90 backdrop-blur-xl transition-colors duration-300",
          scrolled ? "border-stone-200" : "border-transparent",
        )}
      >
        <Container>
          <motion.div
            animate={{ height: scrolled ? 68 : 80 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center justify-between gap-6"
          >
            <Link href="/" aria-label={siteConfig.name} className="shrink-0">
              <Logo layout="horizontal" />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-1 rounded-full border border-stone-200/70 bg-stone-50/60 p-1 lg:flex">
              <NavLinks linkClassName="rounded-full px-4 py-2 text-caption font-medium uppercase tracking-wide text-ink/70 transition-colors duration-200 hover:bg-ink hover:text-paper" />
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={siteConfig.whatsapp.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Chat on WhatsApp"
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-ink transition-all duration-200 hover:scale-105 hover:border-ink hover:text-leather sm:inline-flex"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <ButtonLink href={requestQuoteHref} size="sm" className="hidden sm:inline-flex">
                Request Quote
              </ButtonLink>
              <MobileNav />
            </div>
          </motion.div>
        </Container>
      </motion.div>
    </header>
  );
}
